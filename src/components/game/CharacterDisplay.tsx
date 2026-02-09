import styles from './CharacterDisplay.module.css';
import { CharacterType } from '../../data/types';

interface CharacterDisplayProps {
  character: string;
  type: CharacterType;
  charType?: 'hiragana' | 'katakana';
}

const TYPE_LABELS: Record<string, string> = {
  hiragana: 'Hiragana',
  katakana: 'Katakana',
};

export default function CharacterDisplay({ character, type, charType }: CharacterDisplayProps) {
  const label = charType ? TYPE_LABELS[charType] : TYPE_LABELS[type] || 'Kana';

  return (
    <div className={styles.wrapper}>
      <span className={styles.typeLabel}>{label}</span>
      <span className={styles.character}>{character}</span>
    </div>
  );
}
