import { useEffect, useState } from "react";
import { useCompletedWorkoutStore } from "../stores/completed-workout.stores";
import { useAuthStore } from "../stores/auth.stores";
import { toast } from "react-toastify";
import { formatErrorMessage } from "../utils/formatting.utils";
import { fetchCompletedWorkouts } from "../services/completed-workout.services";

export const useCompletedWorkouts = () => {
   // stores
   const completedWorkouts = useCompletedWorkoutStore(
      (state) => state.completedWorkouts
   );
   const setCompletedWorkouts = useCompletedWorkoutStore(
      (state) => state.setCompletedWorkouts
   );
   const token = useAuthStore((state) => state.token);

   // states
   const [isLoading, setIsLoading] = useState(false);

   const getCompletedWorkouts = async () => {
      try {
         setIsLoading(true);

         const response = await fetchCompletedWorkouts(token!);

         setCompletedWorkouts(response.completedWorkouts);
      } catch (error) {
         console.error(error);

         const message = formatErrorMessage(error);

         toast.error(message);
      } finally {
         setIsLoading(false);
      }
   };

   // effects
   useEffect(() => {
      if (token) {
         getCompletedWorkouts();
      }
   }, [token]);

   return {
      completedWorkouts,
      isLoading,
      getCompletedWorkouts,
   };
};
