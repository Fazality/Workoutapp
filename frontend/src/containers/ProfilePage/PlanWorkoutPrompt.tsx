import React from "react";
import { Paper, Typography, List, ListItem, ListItemText, ListItemButton, ListItemAvatar, Avatar, IconButton, Chip, Divider, } from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useWorkoutContext } from "../../context/WorkoutContext";
import { Workout } from "../../types";


interface PlanWorkoutPromptProps {
  date: String;
}

const PlanWorkoutPrompt: React.FC<PlanWorkoutPromptProps> = ({ date }) => {
  const { addPlannedWorkout, workoutData } = useWorkoutContext();
  const [workouts, setWorkouts] = React.useState<Workout[]>([]);

  React.useEffect(() => {
    fetch("http://localhost:4001/api/workout/exercises", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setWorkouts(data))
      .catch((error) => console.error("Error fetching all workouts ", error));
  }, []);

  const handleAddWorkout = (workout: Workout, date) => {
    fetch("http://localhost:4001/api/workout/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        WorkoutID: workout.WorkoutID,
        date: date,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.type === "success") {
          addPlannedWorkout({
            WorkoutID: data.WorkoutID,
            date: date,
            PlannedWorkoutID: data.PlannedWorkoutID,
          });
        } else {
          console.error("Error planning the workout", data.error);
        }
      })
      .catch((error) => console.error("Error planning the workout", error));
  };
  
  return (
    <>
      <Typography variant="h6">
        No workout planned for {date}. Choose one from below:
      </Typography>
      <Paper>
        <List>
          {workouts.map((workout, index) => (
            <div key={workout.WorkoutID}>
              <ListItem>
                <ListItemText
                  primary={workout.WorkoutName}
                  primaryTypographyProps={{ variant: "h5" }}
                />
                <Chip
                  label="Plan"
                  color="primary"
                  onClick={() => handleAddWorkout(workout, date)}
                  icon={<AddCircleIcon />}
                />
              </ListItem>
              <List component="div" disablePadding>
                {workout.exercises.map((exercise) => (
                  <ListItem key={exercise.ExerciseID}>
                    <ListItemAvatar>
                      <Avatar
                        src={`/ExerciseCatalog/${exercise.ExerciseID}.png`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={exercise.ExerciseName}
                      secondary={`
                    ${exercise.weight ? `Weight: ${exercise.weight}  ` : ""}
                    ${exercise.reps ? `Reps: ${exercise.reps}  ` : ""}
                    ${exercise.sets ? `Sets: ${exercise.sets}  ` : ""}
                    ${exercise.minutes ? `${exercise.minutes} minutes` : ""}
                `}
                    />{" "}
                  </ListItem>
                ))}
              </List>
              {index !== workouts.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </Paper>
    </>
  );
};


export default PlanWorkoutPrompt;