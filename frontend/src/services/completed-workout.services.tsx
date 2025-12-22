import type { CompletedWorkoutType } from "../types/completed-workout.types";

const baseUrl =
   import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_LOCAL_URL;

export const fetchGetNewCompletedWorkout = async (
   workoutId: number | string,
   token: string
) => {
   const response = await fetch(
      `${baseUrl}/completed-workouts/new/${workoutId}`,
      {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      }
   );

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch new completed workout");
   }

   return response.json();
};

export const fetchCompletedWorkouts = async (token: string) => {
   const response = await fetch(`${baseUrl}/completed-workouts`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch completed workouts");
   }

   return response.json();
};

export const fetchCompletedWorkoutById = async (
   completedWorkoutId: number | string,
   token: string
) => {
   const response = await fetch(
      `${baseUrl}/completed-workouts/${completedWorkoutId}`,
      {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      }
   );

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch completed workout by ID");
   }

   return response.json();
};

export const fetchCreateCompletedWorkout = async (
   completedWorkout: CompletedWorkoutType,
   token: string
) => {
   const response = await fetch(`${baseUrl}/completed-workouts`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completedWorkout }),
   });

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create completed workout");
   }

   return response.json();
};

export const fetchUpdateCompletedWorkout = async (
   completedWorkout: CompletedWorkoutType,
   token: string
) => {
   const response = await fetch(`${baseUrl}/completed-workouts`, {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completedWorkout }),
   });

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update completed workout");
   }

   return response.json();
};

export const fetchDeleteCompletedWorkout = async (
   completedWorkoutId: number | string,
   token: string
) => {
   const response = await fetch(
      `${baseUrl}/completed-workouts/${completedWorkoutId}`,
      {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      }
   );

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete completed workout");
   }

   return response.json();
};
