import { FaForwardStep } from "react-icons/fa6";
import type { CompletedExerciseType } from "../../../types/completed-exercise.types";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { useCompletedWorkoutStore } from "../../../stores/completed-workout.stores";

import styles from "./CompletedExercise.module.css";
import { use, useMemo } from "react";

export default function CompletedExercise({
   completedExercise,
}: {
   completedExercise: CompletedExerciseType;
}) {
   // stores
   const setCurrentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.setCurrentCompletedExerciseOrder
   );
   const setWorkoutViewType = useCompletedWorkoutStore(
      (state) => state.setWorkoutViewType
   );

   // memoized values
   const totalWeightMoved = useMemo(
      () =>
         completedExercise.completedExerciseSets.reduce(
            (total, set) =>
               total +
               (set.isCompleted
                  ? parseFloat(set.completedWeight.toString()) || 0
                  : 0),
            0
         ),
      [completedExercise]
   );

   const setsCompleted = useMemo(
      () =>
         completedExercise.completedExerciseSets.filter(
            (set) => set.isCompleted
         ).length,
      [completedExercise]
   );

   // handlers
   const handleAdvanceExerciseClick = () => {
      setCurrentCompletedExerciseOrder(
         completedExercise.completedExerciseOrder
      );

      setWorkoutViewType("details");
   };

   return (
      <div className={styles.container}>
         <div className={styles.exerciseInfoWrapper}>
            <h3 className={styles.completedExerciseName}>{completedExercise.completedExerciseName}</h3>
            <span>{`Sets Completed: ${setsCompleted} / ${completedExercise.completedExerciseSets.length}`}</span>
            <span>{`Total Weight Moved: ${totalWeightMoved} lbs`}</span>
         </div>
         <StandardIconBtn
            Icon={FaForwardStep}
            onClick={handleAdvanceExerciseClick}
         />
      </div>
   );
}
