import { WORDS } from '../data/words';
import type { GameAction, GameState, GameStatus } from '../types/game';
import { MAX_ATTEMPTS, MESSAGE_NOT_ENOUGH_LETTERS, MESSAGE_UNKNOWN_WORD, WORD_LENGTH } from './constants';
import { pickRandomWord } from './pickRandomWord';

const WORD_SET = new Set(WORDS);

export const createGame = (answer: string, gameId = 0): GameState => ({
  gameId,
  answer,
  guesses: [],
  currentGuess: '',
  status: 'playing',
  message: null,
  messageCount: 0,
  invalidSubmits: 0,
});

export const createInitialState = (): GameState => createGame(pickRandomWord());

const rejectGuess = (state: GameState, text: string): GameState => ({
  ...state,
  message: { id: state.messageCount + 1, text },
  messageCount: state.messageCount + 1,
  invalidSubmits: state.invalidSubmits + 1,
});

const getStatusAfterGuess = (guess: string, answer: string, attempts: number): GameStatus => {
  if (guess === answer) return 'won';
  if (attempts >= MAX_ATTEMPTS) return 'lost';
  return 'playing';
};

const submitGuess = (state: GameState): GameState => {
  const { currentGuess, answer, guesses } = state;
  if (currentGuess.length < WORD_LENGTH) return rejectGuess(state, MESSAGE_NOT_ENOUGH_LETTERS);
  if (!WORD_SET.has(currentGuess)) return rejectGuess(state, MESSAGE_UNKNOWN_WORD);

  const nextGuesses = [...guesses, currentGuess];
  return {
    ...state,
    guesses: nextGuesses,
    currentGuess: '',
    status: getStatusAfterGuess(currentGuess, answer, nextGuesses.length),
    message: null,
    invalidSubmits: 0,
  };
};

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  if (action.type === 'NEW_GAME') return createGame(action.answer, state.gameId + 1);
  if (action.type === 'DISMISS_MESSAGE') {
    if (state.message?.id !== action.id) return state;
    return { ...state, message: null };
  }
  if (state.status !== 'playing') return state;

  switch (action.type) {
    case 'ADD_LETTER':
      if (state.currentGuess.length >= WORD_LENGTH) return state;
      return { ...state, currentGuess: state.currentGuess + action.letter };
    case 'DELETE_LETTER':
      return { ...state, currentGuess: state.currentGuess.slice(0, -1) };
    case 'SUBMIT_GUESS':
      return submitGuess(state);
  }
};
