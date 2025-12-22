import styles from './Loading.module.css';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'spinner' | 'dots' | 'pulse';
  fullScreen?: boolean;
  message?: string;
}

const Loading = ({ 
  size = 'medium', 
  variant = 'spinner',
  fullScreen = false,
  message 
}: LoadingProps) => {
  const containerClass = fullScreen 
    ? `${styles.container} ${styles.fullScreen}` 
    : styles.container;

  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return (
          <div className={`${styles.spinner} ${styles[size]}`}>
            <div className={styles.spinnerRing}></div>
          </div>
        );
      
      case 'dots':
        return (
          <div className={`${styles.dots} ${styles[size]}`}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        );
      
      case 'pulse':
        return (
          <div className={`${styles.pulse} ${styles[size]}`}>
            <div className={styles.pulseRing}></div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={containerClass}>
      {renderLoader()}
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Loading;
