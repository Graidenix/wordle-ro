import type { DistributionBar } from '../types/game';

const MIN_BAR_PERCENT = 8;

export const buildDistributionBars = (distribution: number[], highlightAttempt: number | null): DistributionBar[] => {
  const maxCount = Math.max(1, ...distribution);

  return distribution.map((count, idx) => ({
    id: `attempt-${idx + 1}`,
    attempt: idx + 1,
    count,
    width: `${Math.max(MIN_BAR_PERCENT, (count / maxCount) * 100)}%`,
    isHighlighted: highlightAttempt === idx + 1,
  }));
};
