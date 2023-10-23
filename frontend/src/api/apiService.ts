const BASE_URL = "http://localhost:4001/api";
import { Workout, PlannedWorkout } from "../types";


export const fetchPlannedWorkouts = async (): Promise<PlannedWorkout[]> => {
  const response = await fetch(`${BASE_URL}/workout/planned`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching planned workouts");
  }

  return response.json();
};


export const fetchAllExercises = async (): Promise<Workout[]> => {
  const response = await fetch(`${BASE_URL}/workout/exercises`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching all exercises");
  }

  return response.json();
};