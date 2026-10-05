import { useEffect } from 'react';
import { useGameDispatch, useGameState } from '../contexts/GameContext';
import { TOAST_DURATION_MS } from '../utils/constants';

const Toast: React.FC = () => {
  const { message } = useGameState();
  const dispatch = useGameDispatch();

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => dispatch({ type: 'DISMISS_MESSAGE', id: message.id }), TOAST_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [message, dispatch]);

  return (
    <div className="toast-region" aria-live="polite">
      {message && (
        <div key={message.id} className="toast">
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Toast;
