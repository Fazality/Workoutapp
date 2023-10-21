import { NextFunction, Request, Response } from "express";
import * as workoutService from "../services/workout-service";
import * as genericService from "../services/generic-service";


export const createNewWorkout =
    () => (req : Request, res : Response, next : NextFunction) => {
        const id = req.session.ID;
        if (!id) { throw new Error("No user logged in");}

        const data = JSON.parse(req.body)

        const result = genericService.createEntity('Workout',{name : data.WorkoutName, UserID : id})


        console.log(req.body)
    }

export const getAllPlannedWorkoutsController =
  () => (req: Request, res: Response<any>, next: NextFunction) => {
    const id = req.session.ID;
    if (!id) { throw new Error("No user logged in"); }

    const foundWorkoutExercises = workoutService.getAllPlannedWorkouts(id);

    console.log(foundWorkoutExercises);
    
    try {
      return res.json(foundWorkoutExercises);
    } catch (error) {
      next(error);
    }
  };

export const getNextWorkoutController = () => (req: Request, res: Response<any>, next: NextFunction) => {
    const id = req.session.ID;
    
    if (!id) { throw new Error("No user logged in"); }

    const foundWorkoutExercises = workoutService.getNextWorkout(id);

    console.log(foundWorkoutExercises);
    
    try {
      return res.json(foundWorkoutExercises);
    } catch (error) {
      next(error);
    }
  };


export const getPlannedWorkoutsController = () => ( req: Request,  res: Response<any>,  next: NextFunction ) => {
  const id = req.session.ID;
  if (!id) {
    throw new Error("No user logged in");
  }

  const foundWorkouts = workoutService.getPlannedWorkouts(id);
  console.log(foundWorkouts);

  try {
    return res.json(foundWorkouts);
  } catch (error) {
    next(error);
  }
};