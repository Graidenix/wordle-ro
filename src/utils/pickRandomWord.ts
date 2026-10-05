import { WORDS } from '../data/words';

export const pickRandomWord = (): string => WORDS[Math.floor(Math.random() * WORDS.length)] ?? WORDS[0] ?? '';
