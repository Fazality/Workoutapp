import { PlannedWorkout, Workout } from "../types";

interface State {
  plannedWorkoutData: PlannedWorkout[];
  allExercises: Workout[];
  activeDate: string | null;
  showWorkoutInfo: boolean;
  showPlanPrompt: boolean;
  workoutData: Workout | null;
}

export const initialState: State = {
  plannedWorkoutData: [],
  allExercises: [],
  activeDate: null,
  showWorkoutInfo: false,
  showPlanPrompt: false,
  workoutData: null,
};

type Action =
  | { type: "SET_PLANNED_WORKOUTS"; payload: PlannedWorkout[] }
  | { type: "SET_ALL_EXERCISES"; payload: Workout[] }
  | { type: "SET_ACTIVE_DATE"; payload: string | null }
  | { type: "TOGGLE_WORKOUT_INFO"; payload: boolean }
  | { type: "TOGGLE_PLAN_PROMPT"; payload: boolean }
  | { type: "SET_WORKOUT_DATA"; payload: Workout | null };

export const workoutReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PLANNED_WORKOUTS":
      return { ...state, plannedWorkoutData: action.payload };
    case "SET_ALL_EXERCISES":
      return { ...state, allExercises: action.payload };
    case "SET_ACTIVE_DATE":
      return { ...state, activeDate: action.payload };
    case "TOGGLE_WORKOUT_INFO":
      return { ...state, showWorkoutInfo: action.payload };
    case "TOGGLE_PLAN_PROMPT":
      return { ...state, showPlanPrompt: action.payload };
    case "SET_WORKOUT_DATA":
      return { ...state, workoutData: action.payload };
    default:
      return state;
  }
};
