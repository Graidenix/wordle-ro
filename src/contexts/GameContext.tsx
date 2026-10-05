import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react';
import type { GameAction, GameState } from '../types/game';
import { createInitialState, gameReducer } from '../utils/gameReducer';

const GameStateContext = createContext<GameState | null>(null);
const GameDispatchContext = createContext<Dispatch<GameAction> | null>(null);

interface Props {
  children: ReactNode;
}

const GameProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState);

  return (
    <GameStateContext value={state}>
      <GameDispatchContext value={dispatch}>{children}</GameDispatchContext>
    </GameStateContext>
  );
};

export const useGameState = (): GameState => {
  const state = useContext(GameStateContext);
  if (!state) throw new Error('useGameState must be used within GameProvider');
  return state;
};

export const useGameDispatch = (): Dispatch<GameAction> => {
  const dispatch = useContext(GameDispatchContext);
  if (!dispatch) throw new Error('useGameDispatch must be used within GameProvider');
  return dispatch;
};

export default GameProvider;
