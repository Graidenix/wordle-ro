import type { GameAction } from '../types/game';
import { KEY_BACKSPACE, KEY_ENTER } from './constants';

const LETTER_PATTERN = /^[A-Z]$/;

export const keyToAction = (key: string): GameAction | null => {
  const upperKey = key.toUpperCase();
  if (upperKey === KEY_ENTER) return { type: 'SUBMIT_GUESS' };
  if (upperKey === KEY_BACKSPACE) return { type: 'DELETE_LETTER' };
  if (!LETTER_PATTERN.test(upperKey)) return null;
  return { type: 'ADD_LETTER', letter: upperKey };
};
