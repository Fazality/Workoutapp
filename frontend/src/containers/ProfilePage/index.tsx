import * as React from "react";
import { PickerSelectionState } from "@mui/x-date-pickers/internals";
import {
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
  Paper,
  Box
} from "@mui/material";
import NavigationBar from "../navigationBar";
import Calendar from "./Calendar";
import WorkoutInfo from "./WorkoutInfo";
import PlanWorkoutPrompt from "./PlanWorkoutPrompt";
import { Workout, PlannedWorkout } from "./types";
import { useWorkoutContext } from "../../context/WorkoutContext";

const defaultTheme = createTheme();

type UsePlannedWorkoutsReturnType = [
  PlannedWorkout[],
  React.Dispatch<React.SetStateAction<PlannedWorkout[]>>
];

function usePlannedWorkouts(addPlannedWorkout): UsePlannedWorkoutsReturnType {
  const [plannedWorkoutData, setPlannedWorkoutData] = React.useState<PlannedWorkout[]>([]);

  React.useEffect(() => {
    fetch("http://localhost:4001/api/workout/planned", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setPlannedWorkoutData(data))
      .catch((error) => console.error("Error fetching planned workouts ", error));
  }, [addPlannedWorkout]);

  return [plannedWorkoutData, setPlannedWorkoutData];
}

function useExercises() {
  const [allExercises, setAllExercises] = React.useState<Workout[]>([]);

  React.useEffect(() => {
    fetch("http://localhost:4001/api/workout/exercises", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setAllExercises(data))
      .catch((error) => console.error("Error fetching all exercises ", error));
  }, []);

  return allExercises;
}



export default function ProfilePage() {
   const {
     workoutData,
     setWorkoutData,
     showWorkoutInfo,
     setShowWorkoutInfo,
     addPlannedWorkout,
     plannedWorkouts,
   } = useWorkoutContext();
   

  const [activeDate, setActiveDate] = React.useState<String | null>(null);
  const [showPlanPrompt, setShowPlanPrompt] = React.useState<boolean>(false);

  const [plannedWorkoutData, setPlannedWorkoutData] = usePlannedWorkouts(addPlannedWorkout);

  const allExercises = useExercises();

  React.useEffect(() => {
    if (allExercises.length === 0)
    console.error("Error fetching next workout, allExercises is empty");
    const currentDate = new Date();
    const date = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000).toISOString().split("T")[0];
    console.log(date);
    fetch("http://localhost:4001/api/workout/next", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ date }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.WorkoutID) return;

        const nextWorkout = allExercises.find(
          (workout: Workout) => workout.WorkoutID === data.WorkoutID
        );

        if (nextWorkout) {
          setActiveDate(data.date);
          setWorkoutData(nextWorkout);
          setShowWorkoutInfo(true);
        } else console.error("Next workout not found");
      })
      .catch((error) => console.error("Error fetching next workout ", error));
  }, [allExercises]);

  const handleDateClick = (
    dateObj: Date | null,
    selectionState?: PickerSelectionState
  ) => {
    if (!dateObj) return;
    const localISOTime = new Date(
      dateObj.getTime() - dateObj.getTimezoneOffset() * 60000 ).toISOString().split("T")[0];
    setActiveDate(localISOTime);

    const foundWorkout = plannedWorkoutData.find( (workout) => workout.date === localISOTime );

    if (foundWorkout) {
      const workoutExercises = allExercises.find( (workout: Workout) => workout.WorkoutID === foundWorkout.WorkoutID );
      if (workoutExercises) {
        setShowPlanPrompt(false);
        setWorkoutData(workoutExercises);
      }
      setShowWorkoutInfo(true);
    } else {
      setShowWorkoutInfo(false);
      setWorkoutData(null);
      setShowPlanPrompt(true);
    }
  };

  React.useEffect(() => {
    const foundWorkout = plannedWorkoutData.find( (workout) => workout.date === activeDate );
    if (foundWorkout) {
      const workoutExercises = allExercises.find(
        (workout: Workout) => workout.WorkoutID === foundWorkout.WorkoutID
      );
      if (workoutExercises) {
        setShowPlanPrompt(false);
        setWorkoutData(workoutExercises);
        setShowWorkoutInfo(true);
      } else { console.error("Workout exercises not found for planned workout");
      }
    } else {
      setShowWorkoutInfo(false);
      setWorkoutData(null);
      setShowPlanPrompt(true);
    }
  }, [plannedWorkoutData, activeDate, allExercises]);
  const plannedDates = plannedWorkoutData.map((workout) => workout.date);
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <NavigationBar />

      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" flexDirection="row" mt={2} width="100%">
          <Box flexGrow={1} p={2}>
            {showWorkoutInfo ? (
              <WorkoutInfo workoutDate={activeDate ?? ""} />
            ) : showPlanPrompt && activeDate ? (
              <PlanWorkoutPrompt date={activeDate} />
            ) : (
              <Typography component={Paper} variant="h5">
                Click on a date to see workout information
              </Typography>
            )}
          </Box>
          <Box p={2}>
            <Calendar
              onDateSelect={handleDateClick}
              plannedDates={plannedDates}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
