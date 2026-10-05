import { useEffect } from 'react';
import { useGameDispatch, useGameState } from '../contexts/GameContext';
import { keyToAction } from '../utils/keyToAction';

const usePhysicalKeyboard = (isPaused: boolean): void => {
  const dispatch = useGameDispatch();
  const { status } = useGameState();
  const isActive = status === 'playing' && !isPaused;

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.ctrlKey || ev.altKey || ev.metaKey) return;
      const action = keyToAction(ev.key);
      if (!action) return;
      // Stops Enter from also activating whichever on-screen key has focus.
      ev.preventDefault();
      dispatch(action);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, isActive]);
};

export default usePhysicalKeyboard;
