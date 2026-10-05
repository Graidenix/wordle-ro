import { useMemo } from 'react';
import { useGameState } from '../contexts/GameContext';
import { buildBoardRows } from '../utils/buildBoardRows';
import Row from './Row';

const Board: React.FC = () => {
  const state = useGameState();
  const rows = useMemo(() => buildBoardRows(state), [state]);

  return (
    <div className="board" aria-label="Tabla de joc">
      {rows.map((row) => <Row key={row.id} row={row} />)}
    </div>
  );
};

export default Board;
