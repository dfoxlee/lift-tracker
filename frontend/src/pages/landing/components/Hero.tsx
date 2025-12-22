import styles from "./Hero.module.css";

export default function Hero() {
   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <h2 className={styles.heroTitle}>Unlock Your Strongest Self</h2>
            <p className={styles.heroSubtext}>
               Join our community that only wants a simple, yet insightful
               workout tracker.
            </p>
         </div>
      </div>
   );
}
