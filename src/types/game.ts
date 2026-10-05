export type LetterStatus = 'correct' | 'present' | 'absent';

export type TileState = LetterStatus | 'empty' | 'filled';

export type GameStatus = 'playing' | 'won' | 'lost';

export interface ToastMessage {
  id: number;
  text: string;
}

export interface GameState {
  gameId: number;
  answer: string;
  guesses: string[];
  currentGuess: string;
  status: GameStatus;
  message: ToastMessage | null;
  messageCount: number;
  invalidSubmits: number;
}

export type GameAction =
  | { type: 'ADD_LETTER'; letter: string }
  | { type: 'DELETE_LETTER' }
  | { type: 'SUBMIT_GUESS' }
  | { type: 'NEW_GAME'; answer: string }
  | { type: 'DISMISS_MESSAGE'; id: number };

export interface BoardTile {
  id: string;
  letter: string;
  state: TileState;
}

export interface BoardRow {
  id: string;
  tiles: BoardTile[];
  isRevealed: boolean;
  isWinning: boolean;
  isShaking: boolean;
}

export interface KeyboardRowData {
  id: string;
  keys: string[];
}

export interface Stats {
  played: number;
  wins: number;
  currentStreak: number;
  maxStreak: number;
  distribution: number[];
}

export interface StatsItem {
  id: string;
  label: string;
  value: string;
}

export interface DistributionBar {
  id: string;
  attempt: number;
  count: number;
  width: string;
  isHighlighted: boolean;
}

export type Panel = 'help' | 'stats';

export interface HelpExample {
  id: string;
  tiles: BoardTile[];
  description: string;
}
