export type User = {
    ID: number;
    username: string;
    password: string;
    Role_ID: number;
}


export type CatalogExercise = {
    ID: number;
    name: string;
    type: number
    description: string;
    difficulty: number;
}


export type Exercise = {
    WorkoutID: number;
    ExerciseID: number;
    sets: number;
    reps: number;
    weight: number;
    minutes: number;
    rank: number;
}


export type Workout = {
    ID: number;
    name: string;
    UsserID: number;
}


export type Role = {
    ID: number;
    Role: string;
}


export type PlannedWorkout = {
    id: number;
    workoud_id: number;
    date: Date;
}


