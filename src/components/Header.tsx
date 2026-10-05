import { ChartBarIcon, QuestionIcon } from '@phosphor-icons/react';
import IconButton from './IconButton';

const TITLE_LETTERS = 'WORDLE'.split('');

interface Props {
  onOpenHelp: () => void;
  onOpenStats: () => void;
}

const Header: React.FC<Props> = (props) => {
  const { onOpenHelp, onOpenStats } = props;

  return (
    <header className="header">
      <IconButton icon={QuestionIcon} label="Cum se joacă" onClick={onOpenHelp} />
      <div className="header__brand">
        <h1 className="title" aria-label="Wordle">
          {TITLE_LETTERS.map((letter) => (
            <span key={letter} className="title__letter" aria-hidden="true">
              {letter}
            </span>
          ))}
        </h1>
        <p className="subtitle">în limba română</p>
      </div>
      <IconButton icon={ChartBarIcon} label="Statistici" onClick={onOpenStats} />
    </header>
  );
};

export default Header;
