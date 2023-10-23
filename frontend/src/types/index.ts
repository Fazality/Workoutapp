export interface Exercise {
  ExerciseID: number;
  sets: number;
  reps: number;
  weight: number;
  minutes: string;
  rank: number;
  ExerciseName: string;
  type: number;
  description: string;
  difficulty: number;
}

export interface Workout {
  WorkoutID: number;
  WorkoutName: string;
  date: string;
  exercises: Exercise[];
}

export interface PlannedWorkout {
  WorkoutID: number;
  date: string;
  PlannedWorkoutID: number | undefined;
}
