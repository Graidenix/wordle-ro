import type { BoardRow } from '../types/game';
import { classNames } from '../utils/classNames';
import Tile from './Tile';

interface Props {
  row: BoardRow;
}

const Row: React.FC<Props> = (props) => {
  const { row } = props;
  const className = classNames(
    'row',
    row.isRevealed && 'row--revealed',
    row.isWinning && 'row--winning',
    row.isShaking && 'row--shake',
  );

  return (
    <div className={className}>
      {row.tiles.map((tile) => <Tile key={tile.id} tile={tile} />)}
    </div>
  );
};

export default Row;
