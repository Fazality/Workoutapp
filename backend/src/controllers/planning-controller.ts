import { createPlannedWorkout } from '../services/planning-service';
import { Request, Response, NextFunction } from 'express';
import { PlannedWorkout } from '../model/schemas';
export const createPlannedWorkoutController = () => (req: Request, res: Response<any>, next: NextFunction) => {
    const id = req.session.ID;
    if (!id) throw new Error('No user logged in');
    console.log(req.body);
    try {
        const entity = createPlannedWorkout(req.body, id);
        return res.json({type: 'success', PlannedWorkout: entity});
    } catch (error) {
        next(error);
    }

};
