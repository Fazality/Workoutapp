import { NextFunction, Request, Response } from "express";
import * as workoutService from "../services/workout-service";


export const getAllPlannedWorkoutsController = () => (req: Request, res: Response<any>, next: NextFunction) => {
    
  const id = req.session.ID;
  if (!id) throw new Error("No user logged in");
  
  const foundWorkoutExercises = workoutService.getAllPlannedWorkouts(id);
    
  try {
    return res.json(foundWorkoutExercises);
  } catch (error) {
    next(error);
  }
};

export const getNextWorkoutController = () => (req: Request, res: Response<any>, next: NextFunction) => {
  const id = req.session.ID;
  console.log(id);
  if (!id)  throw new Error("No user logged in"); 

  const { date } = req.body;
  console.log(date);
  if (!date) {
    return res.status(400).json({ error: "Date is required" });
  }
  const foundWorkoutExercises = workoutService.getNextWorkout(id, date);

  console.log(foundWorkoutExercises);
    
  try {
    return res.json(foundWorkoutExercises);
  } catch (error) {
    next(error);
  }
};
export const getDistinctPlannedWorkoutsController = () => ( req: Request,  res: Response<any>,  next: NextFunction ) => {
  const id = req.session.ID;
  if (!id) {
    throw new Error("No user logged in");
  }

  const foundWorkouts = workoutService.getDistinctPlannedWorkouts(id);
  console.log(foundWorkouts);

  try {
    return res.json(foundWorkouts);
  } catch (error) {
    next(error);
  }
};


export const getWorkoutExercisesController = () => (req: Request, res: Response<any>, next: NextFunction) => {
  const id = req.session.ID;
  if (!id) {
    throw new Error("No user logged in");
  }
  const foundWorkoutExercises = workoutService.getWorkoutExercises(id);

  try {
    return res.json(foundWorkoutExercises);
  } catch (error) {
    next(error);
  }
}


