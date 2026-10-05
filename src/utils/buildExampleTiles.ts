import type { BoardTile, LetterStatus } from '../types/game';

export const buildExampleTiles = (word: string, highlightIdx: number, status: LetterStatus): BoardTile[] =>
  word.split('').map((letter, idx) => ({
    id: `${word}-${idx}`,
    letter,
    state: idx === highlightIdx ? status : 'empty',
  }));
