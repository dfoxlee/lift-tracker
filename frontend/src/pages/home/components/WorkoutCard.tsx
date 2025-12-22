import { FaGlasses, FaPencilAlt, FaRunning, FaTrash } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";
import styles from "./WorkoutCard.module.css";

interface WorkoutCardProps {
   workoutId: number;
   workoutName: string;
   completedDate?: Date | string | null;
   onView: (workoutId: number) => void;
   onStart?: (workoutId: number) => void;
   onEdit: (workoutId: number) => void;
   onDelete: (workoutId: number) => void;
}

export default function WorkoutCard({
   workoutId,
   workoutName,
   completedDate,
   onView,
   onStart,
   onEdit,
   onDelete,
}: WorkoutCardProps) {
   return (
      <div className={styles.container}>
         <div className={styles.infoWrapper}>
            <h3 className={styles.workoutName}>{workoutName}</h3>
            {completedDate && (
               <span className={styles.completedDate}>
                  {new Date(completedDate).toLocaleDateString()}
               </span>
            )}
         </div>
         <div className={styles.btnsWrapper}>
            {onStart && (
               <StandardIconBtn
                  Icon={FaRunning}
                  onClick={() => onStart(workoutId)}
                  styleType="success"
               />
            )}
            <StandardIconBtn
               Icon={FaGlasses}
               onClick={() => onView(workoutId)}
               styleType="info"
            />
            <StandardIconBtn
               Icon={FaPencilAlt}
               onClick={() => onEdit(workoutId)}
            />
            <StandardIconBtn
               Icon={FaTrash}
               onClick={() => onDelete(workoutId)}
               styleType="warning"
            />
         </div>
      </div>
   );
}
