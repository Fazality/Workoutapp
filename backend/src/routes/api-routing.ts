import {Router} from 'express';
import * as genericController from '../controllers/generic-controller';
import * as workoutController from "../controllers/workout-controller";
import * as planningController from "../controllers/planning-controller";

const router:Router = Router();
export default router;

router.route("/workout/next").post(workoutController.getNextWorkoutController());
router.route("/workout/planned/distinct").get(workoutController.getDistinctPlannedWorkoutsController());

router.route("/workout/planned").get(workoutController.getAllPlannedWorkoutsController());
router.route("/workout/exercises").get(workoutController.getWorkoutExercisesController());

router.route('/workout/plan').post(planningController.createPlannedWorkoutController());

router.route('/user').post(genericController.createEntityController('User'));
router.route('/user/:id').get(genericController.getEntityByIdController('User'));
router.route('/user').get(genericController.getAllEntitiesController('User'));
router.route('/user/:id').put(genericController.updateEntityController('User'));
router.route('/user/:id').delete(genericController.deleteEntityController('User'));

router.route('/exercise').post(genericController.createEntityController('CatalogExercise'));
router.route('/exercise/:id').get(genericController.getEntityByIdController('CatalogExercise'));
router.route('/exercise').get(genericController.getAllEntitiesController('CatalogExercise'));
router.route('/exercise/:id').put(genericController.updateEntityController('CatalogExercise'));
router.route('/exercise/:id').delete(genericController.deleteEntityController('CatalogExercise'));

router.route('/workout').post(genericController.createEntityController('Workout'));
router.route('/workout/:id').get(genericController.getEntityByIdController('Workout'));
router.route('/workout').get(genericController.getAllEntitiesController('Workout'));
router.route('/workout/:id').put(genericController.updateEntityController('Workout'));
router.route('/workout/:id').delete(genericController.deleteEntityController('Workout'));

router.route("/planned").post(genericController.createEntityController("PlannedWorkout"));
router.route("/planned/:id").get(genericController.getEntityByIdController("PlannedWorkout"));
router.route("/planned").get(genericController.getAllEntitiesController("PlannedWorkout"));
router.route("/planned/:id").put(genericController.updateEntityController("PlannedWorkout"));
router.route("/planned/:id").delete(genericController.deleteEntityController("PlannedWorkout"));


/* It uses a calendar component that returns the date you click on. 

I want to show the workout that is scheduled the day that gets clicked on and the exercises that the user have put in the workout. 

The workouts that are planned are retrieved by calling the backend API with fetch using: 
router.route("/workout/planned/:id").get(workoutController.getAllPlannedWorkoutsController());
 and it will return the data like this:


[
	{
		"WorkoutID": 3,
		"name": "Leg twist challange",
		"date": "2023-11-13",
		"UserID": 2,
		"PlannedWorkoutID": 2
	},
	{
		"WorkoutID": 4,
		"name": "EXTREME Leg twist challange",
		"date": "2023-11-14",
		"UserID": 2,
		"PlannedWorkoutID": 3
	}
]

And the information about the workout and the exercises are retrieved by calling the backend API with fetch using:
router.route("/workout/exercises").get(workoutController.getWorkoutExercisesController());

[
	{
		"WorkoutID": 2,
		"WorkoutName": "Extreme Workout",
		"exercises": [
			{
				"ExerciseID": 3,
				"sets": 0,
				"reps": 0,
				"weight": 0,
				"minutes": "10:00",
				"rank": 0,
				"ExerciseName": "Treadmill Jog",
				"type": 0,
				"description": "A light jog on the treadmill to strenghten you cardio.",
				"difficulty": 1
			},
			{
				"ExerciseID": 2,
				"sets": 2,
				"reps": 20,
				"weight": 0,
				"minutes": "",
				"rank": 1,
				"ExerciseName": "Sit-up",
				"type": 1,
				"description": "A sit-up is an abdominal exercise where you lie on your back, bend your knees, and lift your upper body toward your knees to work your abdominal muscles.",
				"difficulty": 1
			}
		]
	},
    "WorkoutID": 3, ...
     
    */