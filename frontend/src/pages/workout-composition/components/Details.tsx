import { useMemo, type ChangeEvent } from "react";
import { useWorkoutStore } from "../../../stores/workout.stores";
import { weightUnits } from "../../../constants/ref-codes";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { FaChevronLeft, FaChevronRight, FaPlus, FaTrash } from "react-icons/fa";
import StandardBtn from "../../shared/StandardBtn";
import SetRow from "./SetRow";

import styles from "./Details.module.css";

export default function Details() {
   // stores
   const workout = useWorkoutStore((state) => state.workout);
   const setWorkout = useWorkoutStore((state) => state.setWorkout);
   const currentExerciseOrder = useWorkoutStore(
      (state) => state.currentExerciseOrder
   );
   const setCurrentExerciseOrder = useWorkoutStore(
      (state) => state.setCurrentExerciseOrder
   );

   // memoized values
   const currentExercise = useMemo(() => {
      return workout?.exercises?.find(
         (exercise) => exercise.exerciseOrder === currentExerciseOrder
      );
   }, [workout.exercises, currentExerciseOrder]);

   // handlers
   const handleDeleteSetClick = (setOrder: number) => {
      console.log("Delete set clicked", setOrder);
      if (!currentExercise) return;

      const updatedExerciseSets = currentExercise?.exerciseSets.filter(
         (set) => set.exerciseSetOrder !== setOrder
      );

      const renumberedExerciseSets = updatedExerciseSets.map((set, index) => ({
         ...set,
         exerciseSetOrder: index + 1,
      }));

      const updatedExercise = {
         ...currentExercise,
         exerciseSets: renumberedExerciseSets,
      };

      const updatedExercises = workout?.exercises?.map((exercise) =>
         exercise.exerciseOrder === currentExerciseOrder
            ? updatedExercise
            : exercise
      );

      const updatedWorkout = {
         ...workout,
         exercises: updatedExercises,
      };

      setWorkout(updatedWorkout);
   };

   const handleAddSetClick = () => {
      if (!currentExercise) return;

      const latestSet =
         currentExercise.exerciseSets[currentExercise.exerciseSets.length - 1];

      const newSetOrder = currentExercise.exerciseSets.length + 1 || 1;

      const newSet = {
         exerciseSetOrder: newSetOrder,
         reps: latestSet.reps || 0,
         weight: latestSet.weight || 0,
         weightUnitId: latestSet.weightUnitId || weightUnits[0].refCodeId,
      };

      const updatedExerciseSets = [
         ...(currentExercise.exerciseSets || []),
         newSet,
      ];

      const updatedExercise = {
         ...currentExercise,
         exerciseSets: updatedExerciseSets,
      };

      const updatedExercises = workout?.exercises?.map((exercise) =>
         exercise.exerciseOrder === currentExerciseOrder
            ? updatedExercise
            : exercise
      );

      const updatedWorkout = {
         ...workout,
         exercises: updatedExercises,
      };

      setWorkout(updatedWorkout);
   };

   const handleExerciseChange = (event: ChangeEvent<HTMLSelectElement>) => {
      if (!event.target.value) return;

      if (event.target.value === "add-exercise") {
         handleAddExerciseClick();
         return;
      }

      const selectedExerciseOrder = Number(event.target.value);

      setCurrentExerciseOrder(selectedExerciseOrder);
   };

   const handleDeleteExerciseClick = () => {
      const updatedExercises = workout?.exercises?.filter(
         (exercise) => exercise.exerciseOrder !== currentExerciseOrder
      );

      const renumberedExercises = updatedExercises?.map((exercise, index) => ({
         ...exercise,
         exerciseOrder: index + 1,
      }));

      const updatedWorkout = {
         ...workout,
         exercises: renumberedExercises,
      };

      setWorkout(updatedWorkout);

      const updatedCurrentExerciseOrder =
         workout.exercises &&
         workout.exercises.length > 1 &&
         currentExerciseOrder - 1 >= 1
            ? currentExerciseOrder - 1
            : 1;

      setCurrentExerciseOrder(updatedCurrentExerciseOrder);
   };

   const handleAddExerciseClick = () => {
      const currentExerciseOrder = currentExercise?.exerciseOrder || 1;

      const newExercise = {
         exerciseOrder: currentExerciseOrder + 1,
         exerciseName: "",
         exerciseSets: [
            {
               exerciseSetOrder: 1,
               reps: 0,
               weight: 0,
               weightUnitId: weightUnits[0].refCodeId,
            },
         ],
      };

      const updatedExercises = [
         ...(workout?.exercises?.slice(0, currentExerciseOrder) || []),
         newExercise,
         ...(workout?.exercises?.slice(currentExerciseOrder) || []),
      ];

      const reorderedExercises = updatedExercises.map((e, idx) => ({
         ...e,
         exerciseOrder: idx + 1,
      }));

      const updatedWorkout = {
         ...workout,
         exercises: reorderedExercises,
      };

      setWorkout(updatedWorkout);
      setCurrentExerciseOrder(newExercise.exerciseOrder);
   };

   const handleExerciseInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!currentExercise) return;

      const updatedExercise = {
         ...currentExercise,
         exerciseName: event.target.value,
      };

      const updatedExercises = workout?.exercises?.map((exercise) =>
         exercise.exerciseOrder === currentExerciseOrder
            ? updatedExercise
            : exercise
      );

      const updatedWorkout = {
         ...workout,
         exercises: updatedExercises,
      };

      setWorkout(updatedWorkout);
   };

   const handlePreviousExerciseClick = () => {
      if (currentExerciseOrder <= 1) return;

      setCurrentExerciseOrder(currentExerciseOrder - 1);
   };

   const handleNextExerciseClick = () => {
      if (workout.exercises && currentExerciseOrder >= workout.exercises.length)
         return;

      setCurrentExerciseOrder(currentExerciseOrder + 1);
   };

   const updateReps = (updateReps: number, setOrder: number) => {
      if (!currentExercise) return;

      const currentSet = currentExercise?.exerciseSets.find(
         (set) => set.exerciseSetOrder === setOrder
      );

      if (!currentSet) return;

      const updatedSet = {
         ...currentSet,
         reps: updateReps,
      };

      const updatedExerciseSets = currentExercise.exerciseSets.map((set) =>
         set.exerciseSetOrder === setOrder ? updatedSet : set
      );

      const updatedExercise = {
         ...currentExercise,
         exerciseSets: updatedExerciseSets,
      };

      const updatedExercises = workout?.exercises?.map((exercise) =>
         exercise.exerciseOrder === currentExerciseOrder
            ? updatedExercise
            : exercise
      );

      const updatedWorkout = {
         ...workout,
         exercises: updatedExercises,
      };

      setWorkout(updatedWorkout);
   };

   const updateWeight = (updatedWeight: number, setOrder: number) => {
      if (!currentExercise) return;

      const currentSet = currentExercise?.exerciseSets.find(
         (set) => set.exerciseSetOrder === setOrder
      );

      if (!currentSet) return;

      const updatedSet = {
         ...currentSet,
         weight: updatedWeight,
      };

      const updatedExerciseSets = currentExercise.exerciseSets.map((set) =>
         set.exerciseSetOrder === setOrder ? updatedSet : set
      );

      const updatedExercise = {
         ...currentExercise,
         exerciseSets: updatedExerciseSets,
      };

      const updatedExercises = workout?.exercises?.map((exercise) =>
         exercise.exerciseOrder === currentExerciseOrder
            ? updatedExercise
            : exercise
      );

      const updatedWorkout = {
         ...workout,
         exercises: updatedExercises,
      };

      setWorkout(updatedWorkout);
   };

   return (
      <div className={styles.container}>
         <div className={styles.exerciseOptionBtnsWrapper}>
            <StandardIconBtn
               Icon={FaChevronLeft}
               disabled={currentExerciseOrder <= 1}
               onClick={handlePreviousExerciseClick}
            />
            <StandardBtn
               LeftIcon={FaTrash}
               text="Exercise"
               onClick={handleDeleteExerciseClick}
               disabled={workout?.exercises && workout?.exercises?.length <= 1}
               styleType="warning"
            />
            <StandardBtn
               LeftIcon={FaPlus}
               text="Exercise"
               onClick={handleAddExerciseClick}
               filled={false}
            />
            <StandardIconBtn
               Icon={FaChevronRight}
               disabled={
                  workout?.exercises &&
                  currentExerciseOrder >= workout?.exercises?.length
               }
               onClick={handleNextExerciseClick}
            />
         </div>
         <div className={styles.exerciseNavigationWrapper}>
            <h3
               className={styles.currentExercise}
            >{`Exercise ${currentExerciseOrder} / ${workout?.exercises?.length}`}</h3>
            <select
               className={styles.exerciseSelector}
               name="exercise-selector"
               id="exercise-selector"
               value={""}
               onChange={handleExerciseChange}
            >
               <option value="">Change Exercise...</option>
               {workout?.exercises?.map((exercise) => (
                  <option
                     key={exercise.exerciseOrder}
                     value={exercise.exerciseOrder}
                  >
                     {exercise.exerciseName.length
                        ? `${exercise.exerciseOrder}. ${exercise.exerciseName}`
                        : `Exercise ${exercise.exerciseOrder}`}
                  </option>
               ))}
               <option value="add-exercise">+ Add Exercise</option>
            </select>
         </div>
         <input
            className={styles.exerciseNameInput}
            type="text"
            placeholder="Exercise Name"
            value={currentExercise?.exerciseName || ""}
            onChange={handleExerciseInputChange}
         />
         <div className={styles.setsGridWrapper}>
            <h3 className={styles.setsGridHeader}>set</h3>
            <h3 className={styles.setsGridHeader}>output</h3>
            <h3 className={styles.setsGridHeader}>options</h3>
            {currentExercise?.exerciseSets.map((set) => (
               <SetRow
                  key={set.exerciseSetOrder}
                  set={set}
                  updateReps={updateReps}
                  updateWeight={updateWeight}
                  handleDeleteSetClick={handleDeleteSetClick}
                  currentExercise={currentExercise}
               />
            ))}
         </div>
         <div className={styles.addSetBtnWrapper}>
            <StandardBtn
               LeftIcon={FaPlus}
               text="Set"
               onClick={handleAddSetClick}
            />
         </div>
      </div>
   );
}
