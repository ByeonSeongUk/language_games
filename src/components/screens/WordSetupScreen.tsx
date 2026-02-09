import { useState } from 'react';
import styles from './WordSetupScreen.module.css';
import ToggleGroup from '../common/ToggleGroup';
import Button from '../common/Button';
import { JLPTLevel, WordGameMode, WordGameConfig, MeaningLanguage } from '../../data/types';
import { getWordCount, availableLevels, comingSoonLevels } from '../../data/words';

interface WordSetupScreenProps {
  onStartGame: (config: WordGameConfig) => void;
}

const MODE_OPTIONS = [
  { value: 'meaningToWord', label: 'Meaning → Word' },
  { value: 'wordToMeaning', label: 'Word → Meaning' },
];

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'ko', label: '한국어' },
];

const QUESTION_COUNT_OPTIONS = [
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '30', label: '30' },
  { value: '50', label: '50' },
];

export default function WordSetupScreen({ onStartGame }: WordSetupScreenProps) {
  const [selectedLevels, setSelectedLevels] = useState<JLPTLevel[]>(['N5']);
  const [gameMode, setGameMode] = useState<WordGameMode>('meaningToWord');
  const [language, setLanguage] = useState<MeaningLanguage>('en');
  const [questionCount, setQuestionCount] = useState<string>('20');

  const totalWords = selectedLevels.reduce((sum, level) => sum + getWordCount(level), 0);

  const toggleLevel = (level: JLPTLevel) => {
    if (selectedLevels.includes(level)) {
      if (selectedLevels.length > 1) {
        setSelectedLevels(selectedLevels.filter(l => l !== level));
      }
    } else {
      setSelectedLevels([...selectedLevels, level]);
    }
  };

  const handleStart = () => {
    onStartGame({
      levels: selectedLevels,
      gameMode,
      questionCount: parseInt(questionCount),
      language,
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Word Game Settings</h2>

      <section className={styles.section}>
        <span className={styles.sectionLabel}>JLPT Level</span>
        <div className={styles.levelGrid}>
          {comingSoonLevels.map(level => (
            <button
              key={level}
              className={`${styles.levelButton} ${styles.disabled}`}
              disabled
            >
              <span className={styles.levelName}>{level}</span>
              <span className={styles.comingSoon}>Coming Soon</span>
            </button>
          ))}
          {availableLevels.map(level => (
            <button
              key={level}
              className={`${styles.levelButton} ${selectedLevels.includes(level) ? styles.selected : ''}`}
              onClick={() => toggleLevel(level)}
            >
              <span className={styles.levelName}>{level}</span>
              <span className={styles.wordCount}>{getWordCount(level)} words</span>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <ToggleGroup
          label="Language"
          options={LANGUAGE_OPTIONS}
          value={language}
          onChange={(v) => setLanguage(v as MeaningLanguage)}
        />
      </section>

      <section className={styles.section}>
        <ToggleGroup
          label="Game Mode"
          options={MODE_OPTIONS}
          value={gameMode}
          onChange={(v) => setGameMode(v as WordGameMode)}
        />
      </section>

      <section className={styles.section}>
        <ToggleGroup
          label="Questions"
          options={QUESTION_COUNT_OPTIONS}
          value={questionCount}
          onChange={setQuestionCount}
        />
      </section>

      <div className={styles.footer}>
        <span className={styles.charCount}>
          {totalWords} words available
        </span>
        <Button
          onClick={handleStart}
          disabled={selectedLevels.length === 0}
        >
          Start Game
        </Button>
      </div>
    </div>
  );
}
