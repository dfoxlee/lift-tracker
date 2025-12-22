import { FaChevronLeft, FaChevronRight, FaStickyNote } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";
import styles from "./Details.module.css";
import { useCompletedWorkoutStore } from "../../../stores/completed-workout.stores";
import CompletedExerciseSetsGrid from "./CompletedExerciseSetsGrid";
import { useModalsStore } from "../../../stores/modals.stores";
import { useMemo } from "react";

export default function Details() {
   const completedWorkout = useCompletedWorkoutStore(
      (state) => state.completedWorkout
   );
   const currentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.currentCompletedExerciseOrder
   );
   const setCurrentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.setCurrentCompletedExerciseOrder
   );
   const setCurrentCompletedExerciseSetOrder = useCompletedWorkoutStore(
      (state) => state.setCurrentCompletedExerciseSetOrder
   );
   const currentCompletedExerciseNotesOrder = useModalsStore(
      (state) => state.currentCompletedExerciseNotesOrder
   );
   const setCurrentCompletedExerciseNotesOrder = useModalsStore(
      (state) => state.setCurrentCompletedExerciseNotesOrder
   );

   // memoized values
   const currentCompletedExercise = useMemo(() => {
      return (
         completedWorkout?.completedExercises?.find(
            (exercise) =>
               exercise.completedExerciseOrder === currentCompletedExerciseOrder
         ) || null
      );
   }, [completedWorkout, currentCompletedExerciseOrder]);

   // handlers
   const handlePrevExerciseClick = () => {
      if (currentCompletedExerciseOrder > 1) {
         setCurrentCompletedExerciseSetOrder(1);
         setCurrentCompletedExerciseOrder(currentCompletedExerciseOrder - 1);
      }
   };

   const handleNextExerciseClick = () => {
      if (
         completedWorkout?.completedExercises &&
         currentCompletedExerciseOrder <
            completedWorkout.completedExercises.length
      ) {
         setCurrentCompletedExerciseSetOrder(1);
         setCurrentCompletedExerciseOrder(currentCompletedExerciseOrder + 1);
      }
   };

   const handleNoteClick = () => {
      if (currentCompletedExerciseNotesOrder) {
         return setCurrentCompletedExerciseNotesOrder(null);
      }

      setCurrentCompletedExerciseNotesOrder(currentCompletedExerciseOrder);
   };

   const handleExerciseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedExerciseName = e.target.value;
      const selectedExercise = completedWorkout?.completedExercises?.find(
         (exercise) => exercise.completedExerciseName === selectedExerciseName
      );

      if (selectedExercise) {
         setCurrentCompletedExerciseOrder(
            selectedExercise.completedExerciseOrder
         );
      }
   };

   return (
      <>
         <div className={styles.exerciseNavRow}>
            <h4
               className={styles.exerciseSelectLabel}
            >{`Exercise ${currentCompletedExerciseOrder} / ${completedWorkout?.completedExercises?.length}`}</h4>
            <StandardIconBtn
               Icon={FaStickyNote}
               onClick={handleNoteClick}
               styleType={
                  currentCompletedExercise?.completedExerciseNotes
                     ? "info"
                     : "grey"
               }
            />
         </div>
         <div className={styles.exerciseNavRow}>
            <StandardIconBtn
               styleType="info"
               Icon={FaChevronLeft}
               onClick={handlePrevExerciseClick}
               disabled={currentCompletedExerciseOrder === 1}
            />
            <select
               className={styles.exerciseSelect}
               name="exercise-select"
               id="exercise-select"
               value={
                  completedWorkout?.completedExercises?.find(
                     (e) =>
                        e.completedExerciseOrder ===
                        currentCompletedExerciseOrder
                  )?.completedExerciseName
               }
               onChange={handleExerciseChange}
            >
               {completedWorkout?.completedExercises?.map((e) => (
                  <option
                     key={`${e.completedExerciseOrder} ${e.completedExerciseName}`}
                  >
                     {e.completedExerciseName}
                  </option>
               ))}
            </select>
            <StandardIconBtn
               Icon={FaChevronRight}
               onClick={handleNextExerciseClick}
               styleType="info"
               disabled={
                  currentCompletedExerciseOrder ===
                  completedWorkout?.completedExercises?.length
               }
            />
         </div>
         <CompletedExerciseSetsGrid />
      </>
   );
}
