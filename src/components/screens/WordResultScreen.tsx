import styles from './WordResultScreen.module.css';
import Button from '../common/Button';
import { WordQuestionResult, WordGameConfig } from '../../data/types';

interface WordResultScreenProps {
  results: WordQuestionResult[];
  config: WordGameConfig | null;
  onPlayAgain: () => void;
  onChangeSettings: () => void;
  onHome: () => void;
}

export default function WordResultScreen({
  results,
  config,
  onPlayAgain,
  onChangeSettings,
  onHome,
}: WordResultScreenProps) {
  const correct = results.filter(r => r.isCorrect).length;
  const total = results.length;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const missed = results.filter(r => !r.isCorrect);

  const getGrade = () => {
    if (accuracy === 100) return { label: 'Perfect!', color: 'var(--accent-yellow)' };
    if (accuracy >= 90) return { label: 'Excellent!', color: 'var(--accent-green)' };
    if (accuracy >= 70) return { label: 'Good', color: 'var(--accent-cyan)' };
    if (accuracy >= 50) return { label: 'Keep Practicing', color: 'var(--accent-orange)' };
    return { label: 'Try Again', color: 'var(--accent-red)' };
  };

  const grade = getGrade();

  return (
    <div className={styles.container}>
      <div className={styles.gradeSection}>
        <h2 className={styles.grade} style={{ color: grade.color }}>
          {grade.label}
        </h2>
        <div className={styles.accuracyRing}>
          <span className={styles.accuracyValue}>{accuracy}%</span>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue} style={{ color: 'var(--accent-green)' }}>
            {correct}
          </span>
          <span className={styles.statLabel}>Correct</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue} style={{ color: 'var(--accent-red)' }}>
            {total - correct}
          </span>
          <span className={styles.statLabel}>Wrong</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{total}</span>
          <span className={styles.statLabel}>Total</span>
        </div>
      </div>

      {missed.length > 0 && (
        <div className={styles.missedSection}>
          <h3 className={styles.missedTitle}>Review Missed Words</h3>
          <div className={styles.missedList}>
            {missed.map((r, i) => (
              <div key={i} className={styles.missedItem}>
                <div className={styles.missedWord}>
                  <span className={styles.expression}>{r.question.word.expression}</span>
                  <span className={styles.reading}>{r.question.word.reading}</span>
                </div>
                <div className={styles.missedMeaning}>{r.question.word.meaning}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.actions}>
        <Button onClick={onPlayAgain}>Play Again</Button>
        <Button variant="secondary" onClick={onChangeSettings}>Change Settings</Button>
        <Button variant="ghost" onClick={onHome}>Home</Button>
      </div>
    </div>
  );
}
