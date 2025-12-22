import { toast } from "react-toastify";
import { useWorkoutStore } from "../../../stores/workout.stores";
import { formatErrorMessage } from "../../../utils/formatting.utils";
import StandardBtn from "../../shared/StandardBtn";
import styles from "./DeleteWorkoutModal.module.css";
import { fetchDeleteWorkout } from "../../../services/workouts.services";
import { useAuthStore } from "../../../stores/auth.stores";
import { useWorkouts } from "../../../hooks/useWorkouts";

export default function DeleteWorkoutModal() {
   const { getWorkouts } = useWorkouts();
   // stores
   const deleteWorkoutId = useWorkoutStore((state) => state.deleteWorkoutId);
   const setDeleteWorkoutId = useWorkoutStore(
      (state) => state.setDeleteWorkoutId
   );
   const token = useAuthStore((state) => state.token);

   // handlers
   const handleCancelClick = () => {
      setDeleteWorkoutId(null);
   };

   const handleDeleteClick = async () => {
      try {
         await fetchDeleteWorkout(deleteWorkoutId!, token!);

         await getWorkouts();

         setDeleteWorkoutId(null);
      } catch (error) {
         console.error(error);

         const message = formatErrorMessage(error);

         toast.error(message);
      }
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <h3 className={styles.confirmationText}>
               Are you sure you want to delete the workout?
            </h3>
            <div className={styles.btnsWrapper}>
               <StandardBtn text="Cancel" onClick={handleCancelClick} />
               <StandardBtn text="Delete" onClick={handleDeleteClick} />
            </div>
         </div>
      </div>
   );
}
