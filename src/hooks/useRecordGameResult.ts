import { useEffect, useRef } from 'react';
import { useGameState } from '../contexts/GameContext';
import { useStatsActions } from '../contexts/StatsContext';

const useRecordGameResult = (): void => {
  const { status, gameId, guesses } = useGameState();
  const { recordGame } = useStatsActions();
  // Guards against recording a game twice (StrictMode re-runs effects in development).
  const recordedGameIdRef = useRef<number | null>(null);
  const attempts = guesses.length;

  useEffect(() => {
    if (status === 'playing') return;
    if (recordedGameIdRef.current === gameId) return;
    recordedGameIdRef.current = gameId;
    recordGame(status === 'won', attempts);
  }, [status, gameId, attempts, recordGame]);
};

export default useRecordGameResult;
