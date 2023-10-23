import Database from 'better-sqlite3';
const db = new Database('./db1.sqlite');

type WorkoutWithExercises = {
    PlannedWorkoutID: number;
    WorkoutID: number;
    date: Date;
    WorkoutName: string;
    UserID: number;
    ExerciseID: number;
    sets: number;
    reps: number;
    weight: number;
    minutes: number;
    rank: number;
    ExerciseName: string;
    type: number;
    description: string;
    difficulty: number;
};

type WorkoutData = {
    PlannedWorkoutID: number;
    WorkoutID: number;
    date: Date;
    WorkoutName: string;
    UserID: number;
    exercises: {
        ExerciseID: number;
        sets: number;
        reps: number;
        weight: number;
        minutes: number;
        rank: number;
        ExerciseName: string;
        type: number;
        description: string;
        difficulty: number;
    }[];
};



export const getAllPlannedWorkouts = (id: number) => {
  return db
    .prepare(
      `SELECT w.ID as WorkoutID, w.name, pw.date, w.UserID as UserID, pw.ID AS PlannedWorkoutID
                                            FROM PlannedWorkout pw
                                            INNER JOIN Workout w ON pw.WorkoutID = w.ID
                                            WHERE w.UserID = ? 
                                            ORDER BY pw.date ASC;`
    )
    .all(id);
};

export const getNextWorkout = (id: number, date: string) => {
  return db
    .prepare(
      `SELECT w.ID as WorkoutID, w.name, pw.date, w.UserID as UserID, pw.ID AS PlannedWorkoutID
       FROM PlannedWorkout pw
       INNER JOIN Workout w ON pw.WorkoutID = w.ID
       WHERE w.UserID = ? AND pw.date >= ?
       ORDER BY pw.date ASC
       LIMIT 1;`
    )
    .get(id, date);
};

export const getDistinctPlannedWorkouts = (userID: number): WorkoutData[] => {

    const workouts: WorkoutWithExercises[] = db.prepare(`
        SELECT 
            PlannedWorkout.ID as PlannedWorkoutID,
            PlannedWorkout.WorkoutID,
            PlannedWorkout.date,
            Workout.name as WorkoutName,
            Workout.UserID,
            Exercise.WorkoutID,
            Exercise.ExerciseID,
            Exercise.sets,
            Exercise.reps,
            Exercise.weight,
            Exercise.minutes,
            Exercise.rank,
            CatalogExercise.name as ExerciseName,
            CatalogExercise.type,
            CatalogExercise.description,
            CatalogExercise.difficulty
        FROM PlannedWorkout
        JOIN Workout ON PlannedWorkout.WorkoutID = Workout.ID
        LEFT JOIN Exercise ON Workout.ID = Exercise.WorkoutID
        LEFT JOIN CatalogExercise ON Exercise.ExerciseID = CatalogExercise.ID
        WHERE Workout.UserID = ?
        GROUP BY PlannedWorkout.WorkoutID, Exercise.ExerciseID
        ORDER BY PlannedWorkout.WorkoutID, Exercise.rank
    `).all(userID) as WorkoutWithExercises[];

    // Grouping exercises by workout
    const groupedWorkouts: { [key: number]: WorkoutData } = {};
    workouts.forEach(workout => {
        if (!groupedWorkouts[workout.WorkoutID]) {
            groupedWorkouts[workout.WorkoutID] = {
                PlannedWorkoutID: workout.PlannedWorkoutID,
                WorkoutID: workout.WorkoutID,
                date: workout.date,
                WorkoutName: workout.WorkoutName,
                UserID: workout.UserID,
                exercises: []
            };
        }
        groupedWorkouts[workout.WorkoutID].exercises.push({
            ExerciseID: workout.ExerciseID,
            sets: workout.sets,
            reps: workout.reps,
            weight: workout.weight,
            minutes: workout.minutes,
            rank: workout.rank,
            ExerciseName: workout.ExerciseName,
            type: workout.type,
            description: workout.description,
            difficulty: workout.difficulty
        });
    });
    return Object.values(groupedWorkouts) as WorkoutData[];
}


type UserWorkoutWithExercises = {
    WorkoutID: number;
    WorkoutName: string;
    ExerciseID: number;
    sets: number;
    reps: number;
    weight: number;
    minutes: number;
    rank: number;
    ExerciseName: string;
    type: number;
    description: string;
    difficulty: number;
};

type UserWorkoutData = {
    WorkoutID: number;
    WorkoutName: string;
    exercises: {
        ExerciseID: number;
        sets: number;
        reps: number;
        weight: number;
        minutes: number;
        rank: number;
        ExerciseName: string;
        type: number;
        description: string;
        difficulty: number;
    }[];
};


export function getWorkoutExercises(userID: number): UserWorkoutData[] {
    const workouts: UserWorkoutWithExercises[] = db.prepare(`
        SELECT 
            Workout.ID as WorkoutID,
            Workout.name as WorkoutName,
            Exercise.ExerciseID,
            Exercise.sets,
            Exercise.reps,
            Exercise.weight,
            Exercise.minutes,
            Exercise.rank,
            CatalogExercise.name as ExerciseName,
            CatalogExercise.type,
            CatalogExercise.description,
            CatalogExercise.difficulty
        FROM Workout
        LEFT JOIN Exercise ON Workout.ID = Exercise.WorkoutID
        LEFT JOIN CatalogExercise ON Exercise.ExerciseID = CatalogExercise.ID
        WHERE Workout.UserID = ?
        ORDER BY Workout.ID, Exercise.rank
    `).all(userID) as UserWorkoutWithExercises[];

    const groupedWorkouts: { [key: number]: UserWorkoutData } = {};
    workouts.forEach(workout => {
        if (!groupedWorkouts[workout.WorkoutID]) {
            groupedWorkouts[workout.WorkoutID] = {
                WorkoutID: workout.WorkoutID,
                WorkoutName: workout.WorkoutName,
                exercises: []
            };
        }
        if (workout.ExerciseID) {
            groupedWorkouts[workout.WorkoutID].exercises.push({
                ExerciseID: workout.ExerciseID,
                sets: workout.sets,
                reps: workout.reps,
                weight: workout.weight,
                minutes: workout.minutes,
                rank: workout.rank,
                ExerciseName: workout.ExerciseName,
                type: workout.type,
                description: workout.description,
                difficulty: workout.difficulty
            });
        }
    });
    return Object.values(groupedWorkouts) as UserWorkoutData[];
}