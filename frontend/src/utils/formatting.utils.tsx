import type { CompletedExerciseSetType } from "../types/completed-exercise-set.types";
import type { ExerciseSetType } from "../types/exercise-set.types";

export const formatErrorMessage = (error: unknown): string => {
   if (error instanceof Error) {
      return error.message;
   }

   if (typeof error === "object" && error !== null && "message" in error) {
      const message = (error as { message: unknown }).message;

      if (typeof message === "string") {
         return message;
      }
   }

   if (typeof error === "string") {
      return error;
   }

   if (typeof error === "object" && error !== null) {
      return JSON.stringify(error);
   }

   return String(error);
};

export const formatExerciseSet = (exerciseSet: ExerciseSetType) => {
   let output = "";

   if (exerciseSet.reps > 0) {
      output += `${exerciseSet.reps}`;
   }

   if (exerciseSet.weight > 0) {
      if (output.length > 0) {
         output += " x ";
      }

      output += `${exerciseSet.weight} lbs`;
   }

   if (output === "") {
      return "N/A";
   }

   return output;
};

export const formatCompletedExerciseSet = (
   completedExerciseSet: CompletedExerciseSetType
) => {
   let output = "";

   if (completedExerciseSet.completedReps > 0) {
      output += `${completedExerciseSet.completedReps}`;
   }

   if (completedExerciseSet.completedWeight > 0) {
      if (output.length > 0) {
         output += " x ";
      }
      output += `${completedExerciseSet.completedWeight} lbs`;
   }

   return output;
};

export const formatTimer = (totalSeconds: number): string => {
   const hours = Math.floor(totalSeconds / 3600);
   const minutes = Math.floor((totalSeconds % 3600) / 60);
   const seconds = totalSeconds % 60;

   const hoursStr = hours > 0 ? String(hours).padStart(2, "0") + ":" : "";
   const minutesStr = String(minutes).padStart(2, "0") + ":";
   const secondsStr = String(seconds).padStart(2, "0");

   return hoursStr + minutesStr + secondsStr;
};
