import { FaEnvelope } from "react-icons/fa";
import styles from "./SignUpComplete.module.css";
import { Link } from "react-router-dom";

export default function SignUpComplete() {
   return (
      <div className={styles.container}>
         <h1 className={styles.thankYou}>Thank You!</h1>
         <FaEnvelope className={styles.messageIcon} />
         <h2 className={styles.title}>Sign Up Complete</h2>
         <p className={styles.subtitle}>
            You should receive an email confirmation shortly.
         </p>
         <Link className={styles.returnLink} to="/">Return Home</Link>
      </div>
   );
}
