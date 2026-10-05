import type { BoardTile } from '../types/game';

interface Props {
  tile: BoardTile;
}

const Tile: React.FC<Props> = (props) => {
  const { tile } = props;

  return (
    <div className="tile" data-state={tile.state}>
      {tile.letter}
    </div>
  );
};

export default Tile;
