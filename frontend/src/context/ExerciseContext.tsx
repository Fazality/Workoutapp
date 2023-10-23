import React, { createContext, useContext, useState, useEffect } from "react";

interface ExerciseContextProps {
  exercises: any[];
}

const ExerciseContext = createContext<ExerciseContextProps | undefined>(
  undefined
);

export const ExerciseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4001/api/exercise", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setExercises(data);
      })
      .catch((error) => {
        console.error("Error fetching exercises:", error);
      });  
  }, []);

  return (
    <ExerciseContext.Provider value={{ exercises }}>
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExerciseContext = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error(
      "useExerciseContext must be used within an ExerciseProvider"
    );
  }
  return context;
};
