import { Link } from "react-router-dom";
import Workouts from "./components/Workouts";
import { useWorkoutStore } from "../../stores/workout.stores";
import ViewWorkoutModal from "./components/ViewWorkoutModal";
import DeleteWorkoutModal from "./components/DeleteWorkoutModal";
import CompletedWorkouts from "./components/CompletedWorkouts";
import { useCompletedWorkoutStore } from "../../stores/completed-workout.stores";
import ViewCompletedWorkoutModal from "./components/ViewCompletedWorkoutModal";
import DeleteCompletedWorkoutModal from "./components/DeleteCompletedWorkoutModal";
import CompletedExerciseHistory from "./components/CompletedExerciseHistory";

import styles from "./Home.module.css";
import StandardIconBtn from "../shared/StandardIconBtn";
import { FaCog } from "react-icons/fa";
import SettingsSidebar from "./components/SettingsSidebar";
import { useState } from "react";

export default function Home() {
   // stores
   const viewWorkoutId = useWorkoutStore((state) => state.viewWorkoutId);
   const viewCompletedWorkoutId = useCompletedWorkoutStore(
      (state) => state.viewCompletedWorkoutId
   );
   const deleteWorkoutId = useWorkoutStore((state) => state.deleteWorkoutId);
   const deleteCompletedWorkoutId = useCompletedWorkoutStore(
      (state) => state.deleteCompletedWorkoutId
   );

   // states
   const [settingsSidebarOpen, setSettingsSidebarOpen] = useState(false);

   // handlers
   const toggleSettingsSidebar = () => {
      setSettingsSidebarOpen((prev) => !prev);
   };

   const handleSettingsClick = () => {
      toggleSettingsSidebar();
   };

   return (
      <div className={styles.container}>
         {viewWorkoutId && <ViewWorkoutModal />}
         {viewCompletedWorkoutId && <ViewCompletedWorkoutModal />}
         {deleteWorkoutId && <DeleteWorkoutModal />}
         {deleteCompletedWorkoutId && <DeleteCompletedWorkoutModal />}
         {settingsSidebarOpen && (
            <SettingsSidebar onClose={handleSettingsClick} />
         )}
         <div className={styles.settingsBtnWrapper}>
            <StandardIconBtn Icon={FaCog} onClick={handleSettingsClick} />
         </div>
         <h1 className={styles.title}>LiftTracker</h1>
         <div className={styles.linkWrapper}>
            <Link
               to="/home/workout/composition"
               className={styles.createWorkoutLink}
            >
               Create Workout
            </Link>
         </div>
         <Workouts />
         <CompletedWorkouts />
         <CompletedExerciseHistory />
      </div>
   );
}
