import type { Stats } from '../types/game';

export const recordResult = (stats: Stats, isWin: boolean, attempts: number): Stats => {
  if (!isWin) return { ...stats, played: stats.played + 1, currentStreak: 0 };

  const currentStreak = stats.currentStreak + 1;
  return {
    played: stats.played + 1,
    wins: stats.wins + 1,
    currentStreak,
    maxStreak: Math.max(stats.maxStreak, currentStreak),
    distribution: stats.distribution.map((count, idx) => (idx === attempts - 1 ? count + 1 : count)),
  };
};
