import { ArrowClockwiseIcon, ConfettiIcon, SmileySadIcon } from '@phosphor-icons/react';
import { useMemo } from 'react';
import { useGameDispatch, useGameState } from '../contexts/GameContext';
import { LOSE_TITLE, WIN_TITLES } from '../utils/constants';
import { pickRandomWord } from '../utils/pickRandomWord';
import GuessDistribution from './GuessDistribution';
import Modal from './Modal';
import StatsSummary from './StatsSummary';

const ResultModal: React.FC = () => {
  const { status, answer, guesses } = useGameState();
  const dispatch = useGameDispatch();
  const isWin = status === 'won';
  const attempts = guesses.length;
  const attemptsWord = attempts === 1 ? 'încercare' : 'încercări';
  const title = isWin ? (WIN_TITLES[attempts - 1] ?? WIN_TITLES[0]) : LOSE_TITLE;
  const summary = isWin ? `Ai ghicit din ${attempts} ${attemptsWord}.` : 'Cuvântul era:';

  const answerTiles = useMemo(
    () => answer.split('').map((letter, idx) => ({ id: `${idx}-${letter}`, letter })),
    [answer],
  );

  return (
    <Modal titleId="result-title" isDelayed>
      <div className="modal__badge" data-result={status}>
        {isWin ? <ConfettiIcon size={36} weight="fill" aria-hidden="true" /> : <SmileySadIcon size={36} weight="fill" aria-hidden="true" />}
      </div>
      <h2 id="result-title" className="modal__title">
        {title}
      </h2>
      <p className="modal__text">{summary}</p>
      <div className="modal__answer">
        {answerTiles.map((tile) => (
          <span key={tile.id} className="modal__tile" data-state={isWin ? 'correct' : 'absent'}>
            {tile.letter}
          </span>
        ))}
      </div>
      <StatsSummary />
      <GuessDistribution highlightAttempt={isWin ? attempts : null} />
      <button
        type="button"
        className="button"
        onClick={() => dispatch({ type: 'NEW_GAME', answer: pickRandomWord() })}
        autoFocus
      >
        <ArrowClockwiseIcon size={22} weight="bold" aria-hidden="true" />
        Joacă din nou
      </button>
    </Modal>
  );
};

export default ResultModal;
