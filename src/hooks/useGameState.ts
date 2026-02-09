import { useReducer, useMemo, useCallback } from 'react';
import { GameConfig, GameQuestion, QuestionResult, GameState, FeedbackState } from '../data/types';
import { getCharactersByRows } from '../data';
import { shuffle, generateOptions, isCorrectAnswer } from '../utils/gameLogic';

type GameAction =
  | { type: 'SUBMIT_ANSWER'; answer: string }
  | { type: 'NEXT_QUESTION' };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SUBMIT_ANSWER': {
      if (state.feedbackState !== 'idle') return state;
      const current = state.questions[state.currentIndex];
      const correct = isCorrectAnswer(action.answer, current.character.romaji);
      const newStreak = correct ? state.currentStreak + 1 : 0;
      const result: QuestionResult = {
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

export function useGameState(config: GameConfig) {
  const initialState = useMemo<GameState>(() => {
    const characters = getCharactersByRows(config.characterType, config.selectedRowIds);
    const shuffled = shuffle(characters);

    const questions: GameQuestion[] = shuffled.map(char => {
      if (config.gameMode === 'multipleChoice') {
        const options = generateOptions(char, characters);
        return {
          character: char,
          options,
          correctIndex: options.indexOf(char.romaji),
        };
      }
      return { character: char };
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

  const [state, dispatch] = useReducer(gameReducer, initialState);

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
    currentQuestion,
    totalQuestions,
    correctCount,
    accuracy,
    submitAnswer,
    nextQuestion,
  };
}
