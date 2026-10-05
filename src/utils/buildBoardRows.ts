import type { BoardRow, BoardTile, GameState } from '../types/game';
import { MAX_ATTEMPTS, WORD_LENGTH } from './constants';
import { evaluateGuess } from './evaluateGuess';

const buildRevealedRow = (guess: string, answer: string, rowId: string): BoardRow => ({
  id: rowId,
  tiles: evaluateGuess(guess, answer).map((status, idx) => ({
    id: `${rowId}-${idx}`,
    letter: guess.charAt(idx),
    state: status,
  })),
  isRevealed: true,
  isWinning: guess === answer,
  isShaking: false,
});

const buildPendingRow = (text: string, rowId: string, isShaking: boolean): BoardRow => ({
  id: rowId,
  tiles: Array.from({ length: WORD_LENGTH }, (_slot, idx): BoardTile => ({
    id: `${rowId}-${idx}`,
    letter: text.charAt(idx),
    state: text.charAt(idx) ? 'filled' : 'empty',
  })),
  isRevealed: false,
  isWinning: false,
  isShaking,
});

export const buildBoardRows = (state: GameState): BoardRow[] => {
  const { guesses, currentGuess, answer, status, invalidSubmits } = state;

  return Array.from({ length: MAX_ATTEMPTS }, (_slot, rowIdx) => {
    const guess = guesses[rowIdx];
    if (guess !== undefined) return buildRevealedRow(guess, answer, `row-${rowIdx}`);
    if (rowIdx !== guesses.length || status !== 'playing') return buildPendingRow('', `row-${rowIdx}`, false);
    // The id changes on every rejected submit, remounting the row so the shake animation replays.
    return buildPendingRow(currentGuess, `row-${rowIdx}-attempt-${invalidSubmits}`, invalidSubmits > 0);
  });
};
