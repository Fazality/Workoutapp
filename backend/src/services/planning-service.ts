import Database from "better-sqlite3";
import { ValidationError } from "../middleware/errors";
import { getEntityById, createEntity} from "./generic-service";
const db = new Database('./db1.sqlite');

type PlannedWorkout = {
    WorkoutID: number;
    date: Date;
};

export const createPlannedWorkout = (data: PlannedWorkout, userID: Number) => {
  if (!data)
    throw new ValidationError(["Error"], "{createPlannedWorkout} - No data.");
  if(getEntityById("Workout", data.WorkoutID) === undefined) throw new ValidationError(["Error"], "Workout does not exist.");
  
  const newPlan = getEntityById("PlannedWorkout", Number(createEntity("PlannedWorkout", data).lastInsertRowid)));

  /* const newPlan = db.prepare(`INSERT INTO PlannedWorkout (WorkoutID, date) VALUES (?, ?);`).run(data.WorkoutID, data.date); */
  
  /* const lastInserted = Number(newPlan.lastInsertRowid);
  getEntityById("PlannedWorkout", lastInserted); */
  return newPlan;
};
