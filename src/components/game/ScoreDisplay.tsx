import styles from './ScoreDisplay.module.css';

interface ScoreDisplayProps {
  correct: number;
  total: number;
  streak: number;
  accuracy: number;
}

export default function ScoreDisplay({ correct, total, streak, accuracy }: ScoreDisplayProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.stat}>
        <span className={styles.value}>{correct}/{total}</span>
        <span className={styles.label}>Score</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.value}>{accuracy}%</span>
        <span className={styles.label}>Accuracy</span>
      </div>
      {streak > 1 && (
        <div className={`${styles.stat} ${styles.streakStat}`}>
          <span className={styles.streakValue}>{streak}</span>
          <span className={styles.label}>Streak</span>
        </div>
      )}
    </div>
  );
}
