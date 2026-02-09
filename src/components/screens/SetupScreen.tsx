import { useState } from 'react';
import styles from './SetupScreen.module.css';
import ToggleGroup from '../common/ToggleGroup';
import CheckboxGrid from '../common/CheckboxGrid';
import Button from '../common/Button';
import { CharacterType, GameMode, GameConfig } from '../../data/types';
import { getRows } from '../../data';

interface SetupScreenProps {
  onStartGame: (config: GameConfig) => void;
}

const CHARACTER_OPTIONS = [
  { value: 'hiragana', label: 'Hiragana' },
  { value: 'katakana', label: 'Katakana' },
  { value: 'both', label: 'Both' },
];

const MODE_OPTIONS = [
  { value: 'typing', label: 'Typing' },
  { value: 'multipleChoice', label: 'Quiz (4)' },
];

export default function SetupScreen({ onStartGame }: SetupScreenProps) {
  const [characterType, setCharacterType] = useState<CharacterType>('hiragana');
  const [gameMode, setGameMode] = useState<GameMode>('multipleChoice');
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>(['a']);

  const rows = getRows(characterType);
  const gridItems = rows.map(row => ({
    id: row.id,
    label: row.label,
    sublabel: row.labelRomaji,
  }));

  const rowChars = rows
    .filter(r => selectedRowIds.includes(r.id))
    .reduce((sum, r) => sum + r.characters.length, 0);
  const totalChars = characterType === 'both' ? rowChars * 2 : rowChars;

  const handleStart = () => {
    onStartGame({ characterType, gameMode, selectedRowIds });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Game Settings</h2>

      <section className={styles.section}>
        <ToggleGroup
          label="Character Type"
          options={CHARACTER_OPTIONS}
          value={characterType}
          onChange={(v) => {
            setCharacterType(v as CharacterType);
            setSelectedRowIds(['a']);
          }}
        />
      </section>

      <section className={styles.section}>
        <ToggleGroup
          label="Game Mode"
          options={MODE_OPTIONS}
          value={gameMode}
          onChange={(v) => setGameMode(v as GameMode)}
        />
      </section>

      <section className={styles.section}>
        <span className={styles.sectionLabel}>Select Rows</span>
        <CheckboxGrid
          items={gridItems}
          selectedIds={selectedRowIds}
          onChange={setSelectedRowIds}
        />
      </section>

      <div className={styles.footer}>
        <span className={styles.charCount}>
          {totalChars} characters
        </span>
        <Button
          onClick={handleStart}
          disabled={selectedRowIds.length === 0}
        >
          Start Game
        </Button>
      </div>
    </div>
  );
}
