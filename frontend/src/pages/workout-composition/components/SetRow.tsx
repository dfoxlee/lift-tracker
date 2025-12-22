import { FaTrash } from "react-icons/fa";
import styles from "./SetRow.module.css";
import StandardIconBtn from "../../shared/StandardIconBtn";
import type { ExerciseSetType } from "../../../types/exercise-set.types";
import type { ExerciseType } from "../../../types/exercise.types";
import { weightUnits } from "../../../constants/ref-codes";
import { useState, useEffect, type ChangeEvent } from "react";
import { useWorkoutStore } from "../../../stores/workout.stores";

interface SetRowProps {
   set: ExerciseSetType;
   updateReps: (updatedReps: number, setOrder: number) => void;
   updateWeight: (updatedWeight: number, setOrder: number) => void;
   handleDeleteSetClick: (setOrder: number) => void;
   currentExercise: ExerciseType;
}

export default function SetRow({
   set,
   updateReps,
   updateWeight,
   handleDeleteSetClick,
   currentExercise,
}: SetRowProps) {
   // stores
   const currentExerciseOrder = useWorkoutStore(
      (state) => state.currentExerciseOrder
   );

   // states
   const [currentRepsInput, setCurrentRepsInput] = useState<number | "">(
      set.reps
   );
   const [currentWeightInput, setCurrentWeightInput] = useState<number | "">(
      set.weight
   );

   // effects
   useEffect(() => {
      if (set.reps !== currentRepsInput) {
         setCurrentRepsInput(set.reps);
      }

      if (set.weight !== currentWeightInput) {
         setCurrentWeightInput(set.weight);
      }
   }, [currentExerciseOrder]);

   // handlers
   const handleRepsChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newRepsInput = e.target.value;

      if (newRepsInput === "") {
         setCurrentRepsInput("");
         return;
      }

      if (isNaN(parseInt(newRepsInput, 10))) {
         return;
      }

      const newReps = parseInt(e.target.value, 10);

      setCurrentRepsInput(newReps);
   };

   const handleRepsFocus = () => {
      setCurrentRepsInput((prev) => (prev === 0 ? "" : prev));
   };

   const handleRepsBlur = () => {
      const newReps = currentRepsInput === "" ? 0 : currentRepsInput;

      updateReps(newReps, set.exerciseSetOrder);
      setCurrentRepsInput(newReps);
   };

   const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newWeightInput = e.target.value;

      if (newWeightInput === "") {
         setCurrentWeightInput("");
         return;
      }

      if (isNaN(parseFloat(newWeightInput))) {
         return;
      }

      const newWeight = parseFloat(newWeightInput);

      setCurrentWeightInput(newWeight);
   };

   const handleWeightFocus = () => {
      setCurrentWeightInput((prev) => (prev === 0 ? "" : prev));
   };

   const handleWeightBlur = () => {
      const newWeight = currentWeightInput === "" ? 0 : currentWeightInput;

      updateWeight(newWeight, set.exerciseSetOrder);
      setCurrentWeightInput(newWeight);
   };

   return (
      <>
         <span className={styles.setOrder}>{set.exerciseSetOrder}</span>
         <div className={styles.inputsWrapper}>
            <div className={styles.inputWrapper}>
               <input
                  className={styles.repsInput}
                  type="number"
                  inputMode="numeric"
                  name="reps"
                  id={`reps-${set.exerciseSetOrder}`}
                  value={currentRepsInput}
                  onChange={handleRepsChange}
                  onFocus={handleRepsFocus}
                  onBlur={handleRepsBlur}
               />
               <label
                  className={styles.repsLabel}
                  htmlFor={`reps-${set.exerciseSetOrder}`}
               >
                  reps
               </label>
            </div>
            <div className={styles.inputWrapper}>
               <input
                  className={styles.weightInput}
                  type="number"
                  inputMode="decimal"
                  name="weight"
                  id={`weight-${set.exerciseSetOrder}`}
                  value={currentWeightInput}
                  onChange={handleWeightChange}
                  onFocus={handleWeightFocus}
                  onBlur={handleWeightBlur}
               />
               <label
                  className={styles.weightUnitLabel}
                  htmlFor={`weight-${set.exerciseSetOrder}`}
               >
                  {
                     weightUnits.find(
                        (unit) => unit.refCodeId === set.weightUnitId
                     )?.refCodeName
                  }
               </label>
            </div>
         </div>
         <div className={styles.optionBtnsWrapper}>
            <StandardIconBtn
               Icon={FaTrash}
               onClick={() => handleDeleteSetClick(set.exerciseSetOrder)}
               disabled={currentExercise.exerciseSets.length <= 1}
               styleType="warning"
            />
         </div>
      </>
   );
}
