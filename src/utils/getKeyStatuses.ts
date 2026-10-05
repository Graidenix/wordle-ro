import type { LetterStatus } from '../types/game';
import { evaluateGuess } from './evaluateGuess';

const STATUS_PRIORITY: Record<LetterStatus, number> = {
  absent: 1,
  present: 2,
  correct: 3,
};

export const getKeyStatuses = (guesses: string[], answer: string): Map<string, LetterStatus> =>
  guesses.reduce((statuses, guess) => {
    evaluateGuess(guess, answer).forEach((status, idx) => {
      const letter = guess.charAt(idx);
      const previous = statuses.get(letter);
      if (previous && STATUS_PRIORITY[previous] >= STATUS_PRIORITY[status]) return;
      statuses.set(letter, status);
    });
    return statuses;
  }, new Map<string, LetterStatus>());
