// WorkoutContext.tsx

import React from "react";

import { createContext, useContext, useState } from "react";
import { Workout, PlannedWorkout } from "../types";

interface WorkoutContextType {
  workoutData: Workout | null;
  setWorkoutData: React.Dispatch<React.SetStateAction<Workout | null>>;
  showWorkoutInfo: boolean;
  setShowWorkoutInfo: React.Dispatch<React.SetStateAction<boolean>>;
  plannedWorkouts: PlannedWorkout[]; // Add planned workouts state
  addPlannedWorkout: (workout: PlannedWorkout) => void; // Add the method type
}

export const WorkoutContext = createContext<WorkoutContextType | undefined>(
  undefined
);

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkoutContext must be used within a WorkoutProvider");
  }
  return context;
};

interface WorkoutProviderProps {
  children: React.ReactNode;
}

export const WorkoutProvider: React.FC<WorkoutProviderProps> = ({ children }) => {
  const [workoutData, setWorkoutData] = useState<Workout | null>(null);
  const [showWorkoutInfo, setShowWorkoutInfo] = useState<boolean>(false);
  const [plannedWorkouts, setPlannedWorkouts] = useState<PlannedWorkout[]>([]);

  const addPlannedWorkout = (workout: PlannedWorkout) => {
    setPlannedWorkouts((prevWorkouts) => [...prevWorkouts, workout]);
  };

  return (
    <WorkoutContext.Provider
      value={{
        workoutData,
        setWorkoutData,
        showWorkoutInfo,
        setShowWorkoutInfo,
        plannedWorkouts,
        addPlannedWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
