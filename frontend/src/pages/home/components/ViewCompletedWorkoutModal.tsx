import { Fragment, useEffect, useState } from "react";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useCompletedWorkoutStore } from "../../../stores/completed-workout.stores";
import { useAuthStore } from "../../../stores/auth.stores";
import { fetchCompletedWorkoutById } from "../../../services/completed-workout.services";
import { toast } from "react-toastify";
import {
   formatCompletedExerciseSet,
   formatErrorMessage,
} from "../../../utils/formatting.utils";
import type { CompletedWorkoutType } from "../../../types/completed-workout.types";
import Loading from "../../shared/Loading";

import styles from "./ViewCompletedWorkoutModal.module.css";

export default function ViewCompletedWorkoutModal() {
   // stores
   const viewCompletedWorkoutId = useCompletedWorkoutStore(
      (state) => state.viewCompletedWorkoutId
   );
   const setViewCompletedWorkoutId = useCompletedWorkoutStore(
      (state) => state.setViewCompletedWorkoutId
   );
   const completedWorkoutId = useCompletedWorkoutStore(
      (state) => state.viewCompletedWorkoutId
   );
   const token = useAuthStore((state) => state.token);

   // states
   const [isLoading, setIsLoading] = useState(false);
   const [completedWorkout, setCompletedWorkout] =
      useState<CompletedWorkoutType | null>(null);

   // effect functions
   const getCompletedWorkout = async () => {
      try {
         setIsLoading(true);

         const response = await fetchCompletedWorkoutById(
            viewCompletedWorkoutId!,
            token!
         );

         setCompletedWorkout(response.completedWorkout);
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
      if (!completedWorkoutId || !token) return;

      getCompletedWorkout();
   }, [completedWorkoutId, token]);

   // handlers
   const handleCloseClick = () => {
      setViewCompletedWorkoutId(null);
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            {isLoading ? (
               <Loading size="large" variant="dots" />
            ) : (
               <>
                  <StandardIconBtn Icon={FaTimes} onClick={handleCloseClick} />
                  <h3 className={styles.workoutName}>
                     {completedWorkout?.completedWorkoutName}
                  </h3>
                  <span className={styles.completedDate}>
                     {completedWorkout?.completedDate
                        ? new Date(
                             completedWorkout.completedDate
                          ).toLocaleDateString("en-US")
                        : ""}
                  </span>
                  <div className={styles.exercisesWrapper}>
                     {completedWorkout?.completedExercises?.map(
                        (exercise, index) => (
                           <div key={index} className={styles.exerciseCard}>
                              <h4 className={styles.exerciseName}>
                                 {`${exercise.completedExerciseOrder}. ${exercise.completedExerciseName}`}
                              </h4>
                              {exercise.completedExerciseNotes && (
                                 <p className={styles.exerciseNotes}>
                                    {`Notes: ${exercise.completedExerciseNotes}`}
                                 </p>
                              )}
                              <div className={styles.exerciseSetsGrid}>
                                 <h5 className={styles.setTitle}>set</h5>
                                 <h5 className={styles.setTitle}>output</h5>
                                 <h5 className={styles.setTitle}>completed</h5>
                                 <h5 className={styles.setTitle}>notes</h5>
                                 {exercise.completedExerciseSets.map((set) => (
                                    <Fragment
                                       key={set.completedExerciseSetOrder}
                                    >
                                       <span className={styles.setInfo}>
                                          {set.completedExerciseSetOrder}
                                       </span>
                                       <span className={styles.setInfo}>
                                          {formatCompletedExerciseSet(set)}
                                       </span>
                                       <div className={styles.checkWrapper}>
                                          {set.isCompleted ? (
                                             <FaCheck
                                                className={styles.completedIcon}
                                             />
                                          ) : (
                                             <FaCheck
                                                className={
                                                   styles.notCompletedIcon
                                                }
                                             />
                                          )}
                                       </div>
                                       <span className={styles.setInfo}>
                                          {set.completedExerciseSetNotes || "-"}
                                       </span>
                                    </Fragment>
                                 ))}
                              </div>
                           </div>
                        )
                     )}
                  </div>
               </>
            )}
         </div>
      </div>
   );
}
