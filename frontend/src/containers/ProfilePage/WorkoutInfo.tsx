import React from "react";
import { Box, Typography, Paper, Checkbox, Divider, List, ListItem, ListItemText, Chip, Avatar, ListItemAvatar } from "@mui/material";
import TodayIcon from '@mui/icons-material/Today';
import EventIcon from "@mui/icons-material/Event";
import { useWorkoutContext } from "../../context/WorkoutContext"; // Import the context hook

interface WorkoutInfoProps {
  workoutDate? : String;
}

const WorkoutInfo: React.FC<WorkoutInfoProps> = ({ workoutDate }) => {
  const [selectedExercises, setSelectedExercises] = React.useState<number[]>([]);
  const { workoutData } = useWorkoutContext();



  const handleToggle = (exerciseID: number) => {
    const currentIndex = selectedExercises.indexOf(exerciseID);
    const newSelectedExercises = [...selectedExercises];

    if (currentIndex === -1) {
      newSelectedExercises.push(exerciseID);
    } else {
      newSelectedExercises.splice(currentIndex, 1);
    }

    setSelectedExercises(newSelectedExercises);
  };

  if (!workoutData) return null;

  return (
    <div>
      <Paper elevation={8} variant="outlined">
        <Box
          display="flex"
          justifyContent="space-between"
          alignContent={"baseline"}
          my={1}
          mx={2}
        >
          <Typography variant="h5">{workoutData.WorkoutName ?? ""}</Typography>
          {workoutDate === new Date().toISOString().split("T")[0] ? (
            <Chip icon={<TodayIcon />} label="Today" />
          ) : (
            <Chip icon={<EventIcon />} label={workoutDate} />
          )}
        </Box>
        <Divider />
        <List>
          {workoutData.exercises.map((exercise) => (
            <ListItem key={exercise.ExerciseID}>
              <ListItemAvatar>
                <Avatar src={`/ExerciseCatalog/${exercise.ExerciseID}.png`} />
              </ListItemAvatar>
              <ListItemText
                primary={exercise.ExerciseName}
                secondary={`
                    ${exercise.weight ? `Weight: ${exercise.weight}  ` : ""}
                    ${exercise.reps ? `Reps: ${exercise.reps}  ` : ""}
                    ${exercise.sets ? `Sets: ${exercise.sets}  ` : ""}
                    ${exercise.minutes ? `${exercise.minutes} minutes` : ""}
                `}
              />
              <Checkbox
                checked={selectedExercises.indexOf(exercise.ExerciseID) !== -1}
                onChange={() => handleToggle(exercise.ExerciseID)}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default WorkoutInfo;