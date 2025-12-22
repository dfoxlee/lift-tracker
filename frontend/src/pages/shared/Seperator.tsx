import { FaDumbbell } from "react-icons/fa";

import styles from "./Seperator.module.css";

export default function Seperator() {
   return (
      <div className={styles.container}>
         <div className={styles.seperatorLine}></div>
         <FaDumbbell className={styles.seperatorIcon} />
         <div className={styles.seperatorLine}></div>
      </div>
   );
}
