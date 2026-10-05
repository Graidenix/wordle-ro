import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Stats } from '../types/game';
import { recordResult } from '../utils/recordResult';
import { loadStats, saveStats } from '../utils/statsStorage';

interface StatsActions {
  recordGame: (isWin: boolean, attempts: number) => void;
}

const StatsStateContext = createContext<Stats | null>(null);
const StatsActionsContext = createContext<StatsActions | null>(null);

interface Props {
  children: ReactNode;
}

const StatsProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [stats, setStats] = useState(loadStats);

  useEffect(() => saveStats(stats), [stats]);

  const recordGame = useCallback(
    (isWin: boolean, attempts: number) => setStats((previous) => recordResult(previous, isWin, attempts)),
    [],
  );
  const actions = useMemo(() => ({ recordGame }), [recordGame]);

  return (
    <StatsStateContext value={stats}>
      <StatsActionsContext value={actions}>{children}</StatsActionsContext>
    </StatsStateContext>
  );
};

export const useStats = (): Stats => {
  const stats = useContext(StatsStateContext);
  if (!stats) throw new Error('useStats must be used within StatsProvider');
  return stats;
};

export const useStatsActions = (): StatsActions => {
  const actions = useContext(StatsActionsContext);
  if (!actions) throw new Error('useStatsActions must be used within StatsProvider');
  return actions;
};

export default StatsProvider;
