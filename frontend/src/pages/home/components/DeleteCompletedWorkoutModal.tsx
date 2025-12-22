import { toast } from "react-toastify";
import { useCompletedWorkoutStore } from "../../../stores/completed-workout.stores";
import { formatErrorMessage } from "../../../utils/formatting.utils";
import StandardBtn from "../../shared/StandardBtn";
import styles from "./DeleteCompletedWorkoutModal.module.css";
import Loading from "../../shared/Loading";
import { fetchDeleteCompletedWorkout } from "../../../services/completed-workout.services";
import { useAuthStore } from "../../../stores/auth.stores";
import { useState } from "react";
import { useCompletedWorkouts } from "../../../hooks/useCompletedWorkouts";
import { useCompletedExerciseHistory } from "../../../hooks/useCompletedExerciseHistory";

export default function DeleteCompletedWorkoutModal() {
   // states
   const [isLoading, setIsLoading] = useState(false);

   // stores
   const deleteCompletedworkoutId = useCompletedWorkoutStore(
      (state) => state.deleteCompletedWorkoutId
   );
   const setDeleteCompletedWorkoutId = useCompletedWorkoutStore(
      (state) => state.setDeleteCompletedWorkoutId
   );
   const token = useAuthStore((state) => state.token);

   // hooks
   const { getCompletedWorkouts } = useCompletedWorkouts();
   const { getCompletedExerciseHistory } = useCompletedExerciseHistory();

   // handlers
   const handleCancelClick = () => {
      setDeleteCompletedWorkoutId(null);
   };

   const handleDeleteClick = async () => {
      try {
         setIsLoading(true);

         await fetchDeleteCompletedWorkout(deleteCompletedworkoutId!, token!);

         await getCompletedWorkouts();
         await getCompletedExerciseHistory();
      } catch (error) {
         console.error(error);

         const message = formatErrorMessage(error);

         toast.error(message);
      } finally {
         setIsLoading(false);
      }
      setDeleteCompletedWorkoutId(null);
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <h3 className={styles.confirmationText}>
               Are you sure you want to delete the workout?
            </h3>
            {isLoading ? (
               <Loading variant="dots" size="large" />
            ) : (
               <div className={styles.btnsWrapper}>
                  <StandardBtn text="Cancel" onClick={handleCancelClick} />
                  <StandardBtn text="Delete" onClick={handleDeleteClick} />
               </div>
            )}
         </div>
      </div>
   );
}
