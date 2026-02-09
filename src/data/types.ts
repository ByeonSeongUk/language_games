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

// Word types
export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export interface Word {
  expression: string;  // 日本語 (kanji)
  reading: string;     // ひらがな
  meaning: string;     // English
  meaningKo?: string;  // 한국어
}

export type MeaningLanguage = 'en' | 'ko';

export type WordGameMode = 'meaningToWord' | 'wordToMeaning';

export interface WordGameConfig {
  levels: JLPTLevel[];
  gameMode: WordGameMode;
  questionCount: number;
  language: MeaningLanguage;
}

export interface WordQuestion {
  word: Word;
  options: string[];
  correctIndex: number;
}

export interface WordQuestionResult {
  question: WordQuestion;
  userAnswer: string;
  isCorrect: boolean;
}

export interface WordGameState {
  questions: WordQuestion[];
  currentIndex: number;
  results: WordQuestionResult[];
  currentStreak: number;
  bestStreak: number;
  feedbackState: FeedbackState;
  isFinished: boolean;
  startTime: number;
}

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
