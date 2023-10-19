export type User = {
    ID: number;
    username: string;
    password: string;
    RoleID: number;
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
    UserID: number;
}


export type Role = {
    ID: number;
    Role: string;
}


export type PlannedWorkout = {
    ID: number;
    WorkoutID: number;
    date: Date;
}


