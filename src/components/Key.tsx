import { BackspaceIcon, PaperPlaneRightIcon, type Icon } from '@phosphor-icons/react';
import type { LetterStatus } from '../types/game';
import { classNames } from '../utils/classNames';
import { KEY_ARIA_LABELS, KEY_BACKSPACE, KEY_ENTER } from '../utils/constants';

const KEY_ICONS: Partial<Record<string, Icon>> = {
  [KEY_ENTER]: PaperPlaneRightIcon,
  [KEY_BACKSPACE]: BackspaceIcon,
};

const ICON_SIZE = 24;

interface Props {
  value: string;
  status: LetterStatus | undefined;
  onPress: (value: string) => void;
}

const Key: React.FC<Props> = (props) => {
  const { value, status, onPress } = props;
  const KeyIcon = KEY_ICONS[value];
  const ariaLabel = KEY_ARIA_LABELS[value] ?? value;
  const className = classNames(
    'key',
    (value === KEY_ENTER || value === KEY_BACKSPACE) && 'key--wide',
    value === KEY_ENTER && 'key--accent',
  );

  return (
    <button type="button" className={className} data-state={status} aria-label={ariaLabel} onClick={() => onPress(value)}>
      {KeyIcon ? <KeyIcon size={ICON_SIZE} weight="bold" aria-hidden="true" /> : value}
    </button>
  );
};

export default Key;
