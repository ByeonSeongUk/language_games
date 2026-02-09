import styles from './ResultScreen.module.css';
import Button from '../common/Button';
import { QuestionResult, GameConfig } from '../../data/types';

interface ResultScreenProps {
  results: QuestionResult[];
  config: GameConfig | null;
  onPlayAgain: () => void;
  onChangeSettings: () => void;
  onHome: () => void;
}

export default function ResultScreen({
  results,
  config,
  onPlayAgain,
  onChangeSettings,
  onHome,
}: ResultScreenProps) {
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
          <h3 className={styles.missedTitle}>Review Missed Characters</h3>
          <div className={styles.missedGrid}>
            {missed.map((r, i) => (
              <div key={i} className={styles.missedItem}>
                <span className={styles.missedChar}>
                  {r.question.character.character}
                </span>
                <span className={styles.missedAnswer}>
                  {r.question.character.romaji}
                </span>
                <span className={styles.missedWrong}>
                  yours: {r.userAnswer}
                </span>
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
