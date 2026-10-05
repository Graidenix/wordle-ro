import type { Stats, StatsItem } from '../types/game';

const getWinRate = (stats: Stats): number => (stats.played ? Math.round((stats.wins / stats.played) * 100) : 0);

export const buildStatsItems = (stats: Stats): StatsItem[] => [
  { id: 'played', label: 'Jucate', value: String(stats.played) },
  { id: 'win-rate', label: 'Câștigate', value: `${getWinRate(stats)}%` },
  { id: 'current-streak', label: 'Serie curentă', value: String(stats.currentStreak) },
  { id: 'max-streak', label: 'Serie maximă', value: String(stats.maxStreak) },
];
