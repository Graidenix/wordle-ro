import type { Stats } from '../types/game';
import { MAX_ATTEMPTS, STATS_STORAGE_KEY } from './constants';

export const createEmptyStats = (): Stats => ({
  played: 0,
  wins: 0,
  currentStreak: 0,
  maxStreak: 0,
  distribution: Array.from({ length: MAX_ATTEMPTS }, () => 0),
});

const isCountList = (value: unknown): value is number[] =>
  Array.isArray(value) && value.length === MAX_ATTEMPTS && value.every((count) => typeof count === 'number');

const isStats = (value: unknown): value is Stats => {
  if (typeof value !== 'object' || value === null) return false;
  if (!('played' in value) || typeof value.played !== 'number') return false;
  if (!('wins' in value) || typeof value.wins !== 'number') return false;
  if (!('currentStreak' in value) || typeof value.currentStreak !== 'number') return false;
  if (!('maxStreak' in value) || typeof value.maxStreak !== 'number') return false;
  return 'distribution' in value && isCountList(value.distribution);
};

// Storage can be missing, full or blocked (private mode); the game then just starts from empty stats.
export const loadStats = (): Stats => {
  try {
    const raw = window.localStorage.getItem(STATS_STORAGE_KEY);
    if (!raw) return createEmptyStats();
    const parsed: unknown = JSON.parse(raw);
    return isStats(parsed) ? parsed : createEmptyStats();
  } catch {
    return createEmptyStats();
  }
};

export const saveStats = (stats: Stats): void => {
  try {
    window.localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Not persisted when storage is unavailable.
  }
};
