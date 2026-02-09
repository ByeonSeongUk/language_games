import { useState, useRef, useEffect } from 'react';
import styles from './TypingMode.module.css';
import { FeedbackState } from '../../data/types';

interface TypingModeProps {
  onSubmit: (answer: string) => void;
  feedbackState: FeedbackState;
}

export default function TypingMode({ onSubmit, feedbackState }: TypingModeProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (feedbackState === 'idle') {
      setValue('');
      inputRef.current?.focus();
    }
  }, [feedbackState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && feedbackState === 'idle') {
      onSubmit(value.trim());
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type romaji..."
        autoFocus
        autoComplete="off"
        spellCheck={false}
        disabled={feedbackState !== 'idle'}
      />
      <button
        className={styles.submit}
        type="submit"
        disabled={!value.trim() || feedbackState !== 'idle'}
      >
        Enter
      </button>
    </form>
  );
}
