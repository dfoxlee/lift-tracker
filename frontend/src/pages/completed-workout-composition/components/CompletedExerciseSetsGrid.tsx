import { Fragment, useMemo } from "react";
import { FaCheck, FaForwardStep } from "react-icons/fa6";
import { formatCompletedExerciseSet } from "../../../utils/formatting.utils";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { useCompletedWorkoutStore } from "../../../stores/completed-workout.stores";
import RepsWeightInput from "./RepsWeightInput";

import styles from "./CompletedExerciseSetsGrid.module.css";
import { FaStickyNote } from "react-icons/fa";
import { useModalsStore } from "../../../stores/modals.stores";
import { useTimerStore } from "../../../stores/timer.stores";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function CompletedExerciseSetsGrid() {
   // stores
   const completedWorkout = useCompletedWorkoutStore(
      (state) => state.completedWorkout
   );
   const setCompletedWorkout = useCompletedWorkoutStore(
      (state) => state.setCompletedWorkout
   );
   const currentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.currentCompletedExerciseOrder
   );
   const currentCompletedExerciseSetOrder = useCompletedWorkoutStore(
      (state) => state.currentCompletedExerciseSetOrder
   );
   const setCurrentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.setCurrentCompletedExerciseOrder
   );
   const setCurrentCompletedExerciseSetOrder = useCompletedWorkoutStore(
      (state) => state.setCurrentCompletedExerciseSetOrder
   );
   const setIsWorkoutCompleted = useCompletedWorkoutStore(
      (state) => state.setIsWorkoutCompleted
   );
   const currentCompletedExerciseSetNotesOrder = useModalsStore(
      (state) => state.currentCompletedExerciseSetNotesOrder
   );
   const setCurrentCompletedExerciseSetNotesOrder = useModalsStore(
      (state) => state.setCurrentCompletedExerciseSetNotesOrder
   );
   const setTimerEvent = useTimerStore((state) => state.setTimerEvent);
   const resetTimer = useTimerStore((state) => state.resetTimer);
   const completeWorkout = useTimerStore((state) => state.completeWorkout);

   // hooks
   const params = useParams();

   // constants
   const { completedWorkoutId } = params;

   // handlers
   const handleCompleteExerciseSetClick = (setOrder: number) => {
      const currentExercise = completedWorkout?.completedExercises?.find(
         (e) => e.completedExerciseOrder === currentCompletedExerciseOrder
      );

      if (!currentExercise) return;

      const currentExerciseSet = currentExercise.completedExerciseSets.find(
         (s) => s.completedExerciseSetOrder === setOrder
      );

      if (!currentExerciseSet) return;

      const updatedExerciseSet = {
         ...currentExerciseSet,
         isCompleted: !currentExerciseSet.isCompleted,
      };

      const updatedCompletedExercises =
         completedWorkout!.completedExercises?.map((e) => {
            if (e.completedExerciseOrder === currentCompletedExerciseOrder) {
               return {
                  ...e,
                  completedExerciseSets: e.completedExerciseSets.map((s) =>
                     s.completedExerciseSetOrder === setOrder
                        ? updatedExerciseSet
                        : s
                  ),
               };
            }
            return e;
         });

      const updatedCompletedWorkout = {
         ...completedWorkout!,
         completedExercises: updatedCompletedExercises,
      };

      setCompletedWorkout(updatedCompletedWorkout);

      const maxSetOrder = currentExercise.completedExerciseSets.length;

      if (setOrder < maxSetOrder) {
         setCurrentCompletedExerciseSetOrder(setOrder + 1);
         setTimerEvent("Set Completed");
         resetTimer();
      } else {
         // move to next exercise
         const maxExerciseOrder = completedWorkout!.completedExercises?.length;

         if (!maxExerciseOrder) return;

         if (currentCompletedExerciseOrder < maxExerciseOrder) {
            setCurrentCompletedExerciseSetOrder(1);
            setCurrentCompletedExerciseOrder(currentCompletedExerciseOrder + 1);

            setTimerEvent("Exercise Completed");
            return resetTimer();
         }

         if (updatedExerciseSet.isCompleted) {
            setIsWorkoutCompleted(true);
            toast.success("Workout completed!");
            return completeWorkout();
         }
      }
   };

   const handleSkipToExerciseSetClick = (setOrder: number) => {
      setCurrentCompletedExerciseSetOrder(setOrder);
   };

   // memoized values
   const currentCompletedExercise = useMemo(
      () =>
         completedWorkout?.completedExercises?.find(
            (e) => e.completedExerciseOrder === currentCompletedExerciseOrder
         ),
      [completedWorkout, currentCompletedExerciseOrder]
   );

   // handlers
   const handleNotesClick = (setOrder: number) => {
      if (currentCompletedExerciseSetNotesOrder) {
         return setCurrentCompletedExerciseSetNotesOrder(null);
      }

      setCurrentCompletedExerciseSetNotesOrder(setOrder);
   };

   return (
      <div className={styles.gridContainer}>
         <h3 className={styles.setHeaders}>sets</h3>
         <h3 className={styles.setHeaders}>output</h3>
         <h3 className={styles.setHeaders}>options</h3>
         {currentCompletedExercise?.completedExerciseSets.map((set) => (
            <Fragment key={set.completedExerciseSetOrder}>
               <span>{set.completedExerciseSetOrder}</span>
               {(set.completedExerciseSetOrder ===
                  currentCompletedExerciseSetOrder &&
                  !set.isCompleted) ||
               completedWorkoutId ? (
                  <RepsWeightInput
                     completedExerciseOrder={
                        currentCompletedExercise.completedExerciseOrder
                     }
                     completedExerciseSetOrder={set.completedExerciseSetOrder}
                     reps={set.completedReps}
                     weight={set.completedWeight}
                     weightUnitId={set.completedWeightUnitId}
                  />
               ) : (
                  <span>{formatCompletedExerciseSet(set)}</span>
               )}
               <div className={styles.optionBtnsWrapper}>
                  {!completedWorkoutId && (
                     <StandardIconBtn
                        Icon={FaForwardStep}
                        onClick={() =>
                           handleSkipToExerciseSetClick(
                              set.completedExerciseSetOrder
                           )
                        }
                        disabled={
                           set.completedExerciseSetOrder ===
                           currentCompletedExerciseSetOrder
                        }
                     />
                  )}
                  <StandardIconBtn
                     Icon={FaStickyNote}
                     onClick={() =>
                        handleNotesClick(set.completedExerciseSetOrder)
                     }
                     styleType={set.completedExerciseSetNotes ? "info" : "grey"}
                  />
                  <StandardIconBtn
                     Icon={FaCheck}
                     styleType={set.isCompleted ? "standard" : "grey"}
                     onClick={() =>
                        handleCompleteExerciseSetClick(
                           set.completedExerciseSetOrder
                        )
                     }
                  />
               </div>
            </Fragment>
         ))}
      </div>
   );
}
