import type { KeyboardRowData } from '../types/game';

export const WORD_LENGTH = 5;
export const MAX_ATTEMPTS = 6;
export const TOAST_DURATION_MS = 1800;

export const KEY_ENTER = 'ENTER';
export const KEY_BACKSPACE = 'BACKSPACE';

export const KEYBOARD_ROWS: KeyboardRowData[] = [
  { id: 'top', keys: 'QWERTYUIOP'.split('') },
  { id: 'middle', keys: 'ASDFGHJKL'.split('') },
  { id: 'bottom', keys: [KEY_BACKSPACE, ...'ZXCVBNM'.split(''), KEY_ENTER] },
];

export const KEY_ARIA_LABELS: Record<string, string> = {
  [KEY_ENTER]: 'Trimite cuvântul',
  [KEY_BACKSPACE]: 'Șterge litera',
};

export const MESSAGE_NOT_ENOUGH_LETTERS = 'Prea puține litere';
export const MESSAGE_UNKNOWN_WORD = 'Cuvântul nu există în listă';

export const WIN_TITLES = ['Genial!', 'Magnific!', 'Impresionant!', 'Splendid!', 'Bravo!', 'La limită!'];
export const LOSE_TITLE = 'Ai pierdut';

export const STATS_STORAGE_KEY = 'wordle-ro:stats';
export const HELP_SEEN_STORAGE_KEY = 'wordle-ro:help-seen';
