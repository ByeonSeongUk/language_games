import { useEffect } from 'react';
import styles from './FeedbackOverlay.module.css';
import { FeedbackState } from '../../data/types';

interface FeedbackOverlayProps {
  state: FeedbackState;
  correctAnswer: string;
  onComplete: () => void;
}

export default function FeedbackOverlay({ state, correctAnswer, onComplete }: FeedbackOverlayProps) {
  useEffect(() => {
    if (state === 'idle') return;
    // Only auto-advance for correct answers
    if (state === 'correct') {
      const timer = setTimeout(onComplete, 700);
      return () => clearTimeout(timer);
    }
  }, [state, onComplete]);

  if (state === 'idle') return null;

  return (
    <div className={`${styles.overlay} ${styles[state]}`}>
      {state === 'correct' ? (
        <span className={styles.correctText}>Correct!</span>
      ) : (
        <div className={styles.wrongContent}>
          <span className={styles.wrongText}>Wrong!</span>
          <span className={styles.answer}>
            Answer: <strong>{correctAnswer}</strong>
          </span>
          <button className={styles.nextButton} onClick={onComplete}>
            다음 →
          </button>
        </div>
      )}
    </div>
  );
}
