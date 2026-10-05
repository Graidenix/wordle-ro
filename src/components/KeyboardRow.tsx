import type { KeyboardRowData, LetterStatus } from '../types/game';
import Key from './Key';

interface Props {
  row: KeyboardRowData;
  keyStatuses: Map<string, LetterStatus>;
  onPress: (value: string) => void;
}

const KeyboardRow: React.FC<Props> = (props) => {
  const { row, keyStatuses, onPress } = props;

  return (
    <div className="keyboard__row">
      {row.keys.map((value) => <Key key={value} value={value} status={keyStatuses.get(value)} onPress={onPress} />)}
    </div>
  );
};

export default KeyboardRow;
