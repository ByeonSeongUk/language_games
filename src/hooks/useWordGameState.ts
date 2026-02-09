import { useReducer, useMemo, useCallback } from 'react';
import {
  WordGameConfig,
  WordQuestion,
  WordQuestionResult,
  WordGameState,
  FeedbackState,
  Word,
  MeaningLanguage
} from '../data/types';
import { getWordsByLevels } from '../data/words';

type WordGameAction =
  | { type: 'SUBMIT_ANSWER'; answer: string }
  | { type: 'NEXT_QUESTION' };

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getMeaning(word: Word, language: MeaningLanguage): string {
  if (language === 'ko' && word.meaningKo) {
    return word.meaningKo;
  }
  return word.meaning;
}

function generateWordOptions(
  correctWord: Word,
  allWords: Word[],
  mode: 'meaningToWord' | 'wordToMeaning',
  language: MeaningLanguage,
  count: number = 4
): string[] {
  const correctAnswer = mode === 'meaningToWord'
    ? `${correctWord.expression} (${correctWord.reading})`
    : getMeaning(correctWord, language);

  // Get other words for wrong options
  const otherWords = allWords.filter(w => w.expression !== correctWord.expression);
  const shuffledOthers = shuffle(otherWords).slice(0, count - 1);

  const wrongOptions = shuffledOthers.map(w =>
    mode === 'meaningToWord'
      ? `${w.expression} (${w.reading})`
      : getMeaning(w, language)
  );

  // Combine and shuffle
  const options = shuffle([correctAnswer, ...wrongOptions]);
  return options;
}

function wordGameReducer(state: WordGameState, action: WordGameAction): WordGameState {
  switch (action.type) {
    case 'SUBMIT_ANSWER': {
      if (state.feedbackState !== 'idle') return state;
      const current = state.questions[state.currentIndex];
      const correct = action.answer === current.options[current.correctIndex];
      const newStreak = correct ? state.currentStreak + 1 : 0;
      const result: WordQuestionResult = {
        question: current,
        userAnswer: action.answer,
        isCorrect: correct,
      };
      return {
        ...state,
        results: [...state.results, result],
        currentStreak: newStreak,
        bestStreak: Math.max(state.bestStreak, newStreak),
        feedbackState: correct ? 'correct' : 'wrong',
      };
    }
    case 'NEXT_QUESTION': {
      const nextIndex = state.currentIndex + 1;
      return {
        ...state,
        currentIndex: nextIndex,
        feedbackState: 'idle',
        isFinished: nextIndex >= state.questions.length,
      };
    }
    default:
      return state;
  }
}

export function useWordGameState(config: WordGameConfig) {
  const initialState = useMemo<WordGameState>(() => {
    const allWords = getWordsByLevels(config.levels);
    const shuffled = shuffle(allWords);
    const selected = shuffled.slice(0, config.questionCount);

    const questions: WordQuestion[] = selected.map(word => {
      const options = generateWordOptions(word, allWords, config.gameMode, config.language);
      const correctAnswer = config.gameMode === 'meaningToWord'
        ? `${word.expression} (${word.reading})`
        : getMeaning(word, config.language);
      return {
        word,
        options,
        correctIndex: options.indexOf(correctAnswer),
      };
    });

    return {
      questions,
      currentIndex: 0,
      results: [],
      currentStreak: 0,
      bestStreak: 0,
      feedbackState: 'idle' as FeedbackState,
      isFinished: false,
      startTime: Date.now(),
    };
  }, [config]);

  const [state, dispatch] = useReducer(wordGameReducer, initialState);

  const submitAnswer = useCallback((answer: string) => {
    dispatch({ type: 'SUBMIT_ANSWER', answer });
  }, []);

  const nextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION' });
  }, []);

  const currentQuestion = state.questions[state.currentIndex] ?? null;
  const totalQuestions = state.questions.length;
  const correctCount = state.results.filter(r => r.isCorrect).length;
  const accuracy = state.results.length > 0
    ? Math.round((correctCount / state.results.length) * 100)
    : 0;

  return {
    ...state,
    config,
    currentQuestion,
    totalQuestions,
    correctCount,
    accuracy,
    submitAnswer,
    nextQuestion,
  };
}
