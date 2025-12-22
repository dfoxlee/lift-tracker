import { useState, type ChangeEvent } from "react";
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import { weightUnits } from "../../../constants/ref-codes";
import { useCompletedWorkoutStore } from "../../../stores/completed-workout.stores";

import styles from "./RepsWeightInput.module.css";
import StandardIconBtn from "../../shared/StandardIconBtn";
import StandardBtn from "../../shared/StandardBtn";
import { toast } from "react-toastify";

export default function RepsWeightInput({
   completedExerciseOrder,
   completedExerciseSetOrder,
   reps,
   weight,
   weightUnitId,
}: {
   completedExerciseOrder: number;
   completedExerciseSetOrder: number;
   reps: number;
   weight: number;
   weightUnitId: number;
}) {
   // states
   const [currentRepsInput, setCurrentRepsInput] = useState<number | "">(reps);
   const [currentWeightInput, setCurrentWeightInput] = useState<number | "">(
      weight
   );

   // stores
   const completedWorkout = useCompletedWorkoutStore(
      (state) => state.completedWorkout
   );
   const setCompletedWorkout = useCompletedWorkoutStore(
      (state) => state.setCompletedWorkout
   );

   // handlers
   const handleRepsFocus = () => {
      setCurrentRepsInput((prev) => (prev === 0 ? "" : prev));
   };

   const handleRepsChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newReps = parseInt(e.target.value, 10);

      setCurrentRepsInput(newReps);
   };

   const handleRepsBlur = () => {
      const currentExercise = completedWorkout?.completedExercises?.find(
         (e) => e.completedExerciseOrder === completedExerciseOrder
      );

      if (!currentExercise) return;

      const currentExerciseSet = currentExercise.completedExerciseSets.find(
         (s) => s.completedExerciseSetOrder === completedExerciseSetOrder
      );

      if (!currentExerciseSet) return;

      const updatedExerciseSet = {
         ...currentExerciseSet,
         completedReps: currentRepsInput as number,
      };

      const updatedCompletedExercises =
         completedWorkout!.completedExercises?.map((e) => {
            if (e.completedExerciseOrder === completedExerciseOrder) {
               return {
                  ...e,
                  completedExerciseSets: e.completedExerciseSets.map((s) =>
                     s.completedExerciseSetOrder === completedExerciseSetOrder
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
   };

   const handleWeightFocus = () => {
      setCurrentWeightInput((prev) => (prev === 0 ? "" : prev));
   };

   const handleWeightBlur = () => {
      setCurrentWeightInput((prev) => (!prev ? 0 : prev));

      const currentExercise = completedWorkout?.completedExercises?.find(
         (e) => e.completedExerciseOrder === completedExerciseOrder
      );

      if (!currentExercise) return;

      const currentExerciseSet = currentExercise.completedExerciseSets.find(
         (s) => s.completedExerciseSetOrder === completedExerciseSetOrder
      );

      if (!currentExerciseSet) return;

      const updatedExerciseSet = {
         ...currentExerciseSet,
         completedWeight: currentWeightInput as number,
      };

      const updatedCompletedExercises =
         completedWorkout!.completedExercises?.map((e) => {
            if (e.completedExerciseOrder === completedExerciseOrder) {
               return {
                  ...e,
                  completedExerciseSets: e.completedExerciseSets.map((s) =>
                     s.completedExerciseSetOrder === completedExerciseSetOrder
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
   };

   const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newWeight = parseFloat(e.target.value);

      setCurrentWeightInput(newWeight);
   };

   const handleRepsIncrement = () => {
      const newReps = parseInt(currentRepsInput.toString()) + 1;

      setCurrentRepsInput(newReps);
      const currentExercise = completedWorkout?.completedExercises?.find(
         (e) => e.completedExerciseOrder === completedExerciseOrder
      );

      if (!currentExercise) return;
      const currentExerciseSet = currentExercise.completedExerciseSets.find(
         (s) => s.completedExerciseSetOrder === completedExerciseSetOrder
      );

      if (!currentExerciseSet) return;

      const updatedExerciseSet = {
         ...currentExerciseSet,
         completedReps: newReps,
      };

      const updatedCompletedExercises =
         completedWorkout!.completedExercises?.map((e) => {
            if (e.completedExerciseOrder === completedExerciseOrder) {
               return {
                  ...e,
                  completedExerciseSets: e.completedExerciseSets.map((s) =>
                     s.completedExerciseSetOrder === completedExerciseSetOrder
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
   };

   const handleRepsDecrement = () => {
      const newReps = parseInt(currentRepsInput.toString()) - 1;

      if (newReps < 0) return toast.error("Reps cannot be negative");

      setCurrentRepsInput(newReps);

      const currentExercise = completedWorkout?.completedExercises?.find(
         (e) => e.completedExerciseOrder === completedExerciseOrder
      );

      if (!currentExercise) return;
      const currentExerciseSet = currentExercise.completedExerciseSets.find(
         (s) => s.completedExerciseSetOrder === completedExerciseSetOrder
      );

      if (!currentExerciseSet) return;

      const updatedExerciseSet = {
         ...currentExerciseSet,
         completedReps: newReps,
      };

      const updatedCompletedExercises =
         completedWorkout!.completedExercises?.map((e) => {
            if (e.completedExerciseOrder === completedExerciseOrder) {
               return {
                  ...e,
                  completedExerciseSets: e.completedExerciseSets.map((s) =>
                     s.completedExerciseSetOrder === completedExerciseSetOrder
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
   };

   const handleWeightIncrement = (increment: number) => {
      const newWeight = parseFloat(currentWeightInput.toString()) + increment;

      setCurrentWeightInput(newWeight);

      const currentExercise = completedWorkout?.completedExercises?.find(
         (e) => e.completedExerciseOrder === completedExerciseOrder
      );

      if (!currentExercise) return;
      const currentExerciseSet = currentExercise.completedExerciseSets.find(
         (s) => s.completedExerciseSetOrder === completedExerciseSetOrder
      );

      if (!currentExerciseSet) return;

      const updatedExerciseSet = {
         ...currentExerciseSet,
         completedWeight: newWeight,
      };

      const updatedCompletedExercises =
         completedWorkout!.completedExercises?.map((e) => {
            if (e.completedExerciseOrder === completedExerciseOrder) {
               return {
                  ...e,
                  completedExerciseSets: e.completedExerciseSets.map((s) =>
                     s.completedExerciseSetOrder === completedExerciseSetOrder
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
   };

   const handleWeightDecrement = (decrement: number) => {
      const newWeight = parseFloat(currentWeightInput.toString()) - decrement;

      if (newWeight < 0) return toast.error("Weight cannot be negative");

      setCurrentWeightInput(newWeight);

      const currentExercise = completedWorkout?.completedExercises?.find(
         (e) => e.completedExerciseOrder === completedExerciseOrder
      );

      if (!currentExercise) return;
      const currentExerciseSet = currentExercise.completedExerciseSets.find(
         (s) => s.completedExerciseSetOrder === completedExerciseSetOrder
      );

      if (!currentExerciseSet) return;

      const updatedExerciseSet = {
         ...currentExerciseSet,
         completedWeight: newWeight,
      };

      const updatedCompletedExercises =
         completedWorkout!.completedExercises?.map((e) => {
            if (e.completedExerciseOrder === completedExerciseOrder) {
               return {
                  ...e,
                  completedExerciseSets: e.completedExerciseSets.map((s) =>
                     s.completedExerciseSetOrder === completedExerciseSetOrder
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
   };

   return (
      <div className={styles.container}>
         <div className={styles.inputWrapper}>
            <StandardIconBtn Icon={FaChevronUp} onClick={handleRepsIncrement} />
            <input
               className={styles.repsInput}
               type="number"
               inputMode="numeric"
               value={currentRepsInput}
               onFocus={handleRepsFocus}
               onChange={handleRepsChange}
               onBlur={handleRepsBlur}
            />
            <StandardIconBtn
               Icon={FaChevronDown}
               onClick={handleRepsDecrement}
            />
         </div>
         <FaTimes className={styles.separator} />
         <div className={styles.inputWrapper}>
            <div className={styles.weightIncrementWrapper}>
               <StandardBtn
                  text="0.5"
                  styleType="success"
                  onClick={() => handleWeightIncrement(0.5)}
               />
               <StandardBtn
                  text="1"
                  styleType="success"
                  onClick={() => handleWeightIncrement(1)}
               />
               <StandardBtn
                  text="5"
                  styleType="success"
                  onClick={() => handleWeightIncrement(5)}
               />
            </div>
            <input
               className={styles.weightInput}
               type="number"
               inputMode="decimal"
               value={currentWeightInput}
               onFocus={handleWeightFocus}
               onChange={handleWeightChange}
               onBlur={handleWeightBlur}
            />
            <div className={styles.weightDecrementWrapper}>
               <StandardBtn
                  text="0.5"
                  styleType="warning"
                  onClick={() => handleWeightDecrement(0.5)}
               />
               <StandardBtn
                  text="1"
                  styleType="warning"
                  onClick={() => handleWeightDecrement(1)}
               />
               <StandardBtn
                  text="5"
                  styleType="warning"
                  onClick={() => handleWeightDecrement(5)}
               />
            </div>
         </div>
         <label className={styles.repsLabel} htmlFor="reps">
            reps
         </label>
         <div></div>
         <label className={styles.weightLabel} htmlFor="weight">
            {weightUnits.find((u) => u.refCodeId === weightUnitId)
               ?.refCodeName ?? "weight"}
         </label>
      </div>
   );
}
