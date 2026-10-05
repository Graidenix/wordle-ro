import type { Icon } from '@phosphor-icons/react';

const ICON_SIZE = 24;

interface Props {
  icon: Icon;
  label: string;
  onClick: () => void;
}

const IconButton: React.FC<Props> = (props) => {
  const { icon: ButtonIcon, label, onClick } = props;

  return (
    <button type="button" className="icon-button" aria-label={label} title={label} onClick={onClick}>
      <ButtonIcon size={ICON_SIZE} weight="bold" aria-hidden="true" />
    </button>
  );
};

export default IconButton;
