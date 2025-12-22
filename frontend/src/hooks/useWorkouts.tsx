import { useEffect } from "react";
import { useWorkoutStore } from "../stores/workout.stores";
import { formatErrorMessage } from "../utils/formatting.utils";
import { toast } from "react-toastify";
import { fetchGetWorkouts } from "../services/workouts.services";
import { useAuthStore } from "../stores/auth.stores";

export const useWorkouts = () => {
   // stores
   const workouts = useWorkoutStore((state) => state.workouts);
   const setWorkouts = useWorkoutStore((state) => state.setWorkouts);
   const isLoading = useWorkoutStore((state) => state.isLoading);
   const setIsLoading = useWorkoutStore((state) => state.setIsLoading);
   const token = useAuthStore((state) => state.token);

   // effect functions
   const getWorkouts = async () => {
      try {
         setIsLoading(true);

         const response = await fetchGetWorkouts(token!);

         setWorkouts(response.workouts);
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
         getWorkouts();
      }
   }, [token]);

   return { workouts, getWorkouts, isLoading };
};
