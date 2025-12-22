import type { WorkoutType } from "../types/workout.types";

const baseUrl =
   import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_LOCAL_URL;

export const fetchCreateWorkout = async (
   workout: WorkoutType,
   token: string
) => {
   const response = await fetch(`${baseUrl}/workouts`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ workout }),
   });

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create workout");
   }

   return response.json();
};

export const fetchGetWorkouts = async (token: string) => {
   const response = await fetch(`${baseUrl}/workouts`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch workouts");
   }

   return response.json();
};

export const fetchGetWorkout = async (
   workoutId: number | string,
   token: string
) => {
   const response = await fetch(`${baseUrl}/workouts/${workoutId}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch workout");
   }

   return response.json();
};

export const fetchUpdateWorkout = async (
   workout: WorkoutType,
   token: string
) => {
   const response = await fetch(`${baseUrl}/workouts`, {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ workout }),
   });

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update workout");
   }

   return response.json();
};

export const fetchDeleteWorkout = async (
   workoutId: number | string,
   token: string
) => {
   const response = await fetch(`${baseUrl}/workouts/${workoutId}`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete workout");
   }

   return response.json();
};
