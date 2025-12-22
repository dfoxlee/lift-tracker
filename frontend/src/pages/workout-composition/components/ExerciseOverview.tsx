import { FaStepForward, FaTrash } from "react-icons/fa";
import type { ExerciseType } from "../../../types/exercise.types";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { useMemo, type ChangeEvent } from "react";
import { useWorkoutStore } from "../../../stores/workout.stores";

import styles from "./ExerciseOverview.module.css";

interface ExerciseOverviewProps {
   exercise: ExerciseType;
}

export default function ExerciseOverview({ exercise }: ExerciseOverviewProps) {
   // stores
   const workout = useWorkoutStore((state) => state.workout);
   const setWorkout = useWorkoutStore((state) => state.setWorkout);
   const setCurrentExerciseOrder = useWorkoutStore(
      (state) => state.setCurrentExerciseOrder
   );
   const toggleViewWorkoutMode = useWorkoutStore(
      (state) => state.toggleViewWorkoutMode
   );

   // memoized values
   const totalWeight = useMemo(() => {
      return exercise.exerciseSets.reduce(
         (total, set) => total + parseFloat(set.weight.toString()),
         0
      );
   }, [exercise.exerciseSets]);

   // handlers
   const handleSkipToExerciseClick = () => {
      setCurrentExerciseOrder(exercise.exerciseOrder);
      toggleViewWorkoutMode();
   };

   const handleDeleteExerciseClick = () => {
      const updatedWorkout = {
         ...workout,
         exercises: workout?.exercises
            ?.filter((e) => e.exerciseOrder !== exercise.exerciseOrder)
            .map((e, index) => ({
               ...e,
               exerciseOrder: index + 1,
            })),
      };

      setWorkout(updatedWorkout);
   };

   const handleExerciseNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      const updatedExercise = {
         ...exercise,
         exerciseName: event.target.value,
      };

      const updatedWorkout = {
         ...workout,
         exercises: workout?.exercises?.map((e) =>
            e.exerciseOrder === exercise.exerciseOrder ? updatedExercise : e
         ),
      };

      setWorkout(updatedWorkout);
   };

   return (
      <div className={styles.container}>
         <div className={styles.exerciseInfoWrapper}>
            <input
               className={styles.exerciseNameInput}
               type="text"
               value={exercise.exerciseName}
               placeholder={`Exercise ${exercise.exerciseOrder}`}
               onChange={handleExerciseNameChange}
            />
            <span className={styles.sets}>{`${
               exercise.exerciseSets.length
            } Set${exercise.exerciseSets.length !== 1 ? "s" : ""}`}</span>
            <span
               className={styles.totalWeight}
            >{`Total Weight: ${totalWeight}`}</span>
         </div>
         <div className={styles.optionBtnsWrapper}>
            <StandardIconBtn
               Icon={FaStepForward}
               onClick={handleSkipToExerciseClick}
            />
            <StandardIconBtn
               Icon={FaTrash}
               onClick={handleDeleteExerciseClick}
               styleType="warning"
            />
         </div>
      </div>
   );
}
