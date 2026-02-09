export type CharacterType = 'hiragana' | 'katakana' | 'both';

export interface KanaCharacter {
  character: string;
  romaji: string;
  rowId: string;
  type?: 'hiragana' | 'katakana';
}

export interface KanaRow {
  id: string;
  label: string;
  labelRomaji: string;
  characters: KanaCharacter[];
}

export interface KanaSet {
  type: CharacterType;
  rows: KanaRow[];
}

export type GameMode = 'typing' | 'multipleChoice';

export interface GameConfig {
  characterType: CharacterType;
  gameMode: GameMode;
  selectedRowIds: string[];
}

export interface GameQuestion {
  character: KanaCharacter;
  options?: string[];
  correctIndex?: number;
}

export interface QuestionResult {
  question: GameQuestion;
  userAnswer: string;
  isCorrect: boolean;
}

export type FeedbackState = 'idle' | 'correct' | 'wrong';

export interface GameState {
  questions: GameQuestion[];
  currentIndex: number;
  results: QuestionResult[];
  currentStreak: number;
  bestStreak: number;
  feedbackState: FeedbackState;
  isFinished: boolean;
  startTime: number;
}
