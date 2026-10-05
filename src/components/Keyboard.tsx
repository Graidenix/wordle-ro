import { useMemo } from 'react';
import { useGameDispatch, useGameState } from '../contexts/GameContext';
import { KEYBOARD_ROWS } from '../utils/constants';
import { getKeyStatuses } from '../utils/getKeyStatuses';
import { keyToAction } from '../utils/keyToAction';
import KeyboardRow from './KeyboardRow';

const Keyboard: React.FC = () => {
  const dispatch = useGameDispatch();
  const { guesses, answer } = useGameState();
  const keyStatuses = useMemo(() => getKeyStatuses(guesses, answer), [guesses, answer]);

  const handlePress = (value: string) => {
    const action = keyToAction(value);
    if (!action) return;
    dispatch(action);
  };

  return (
    <div className="keyboard" role="group" aria-label="Tastatură">
      {KEYBOARD_ROWS.map((row) => <KeyboardRow key={row.id} row={row} keyStatuses={keyStatuses} onPress={handlePress} />)}
    </div>
  );
};

export default Keyboard;
