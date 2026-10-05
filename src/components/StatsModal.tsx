import GuessDistribution from './GuessDistribution';
import Modal from './Modal';
import StatsSummary from './StatsSummary';

interface Props {
  onClose: () => void;
}

const StatsModal: React.FC<Props> = (props) => {
  const { onClose } = props;

  return (
    <Modal titleId="stats-title" onClose={onClose}>
      <h2 id="stats-title" className="modal__title">
        Statistici
      </h2>
      <StatsSummary />
      <GuessDistribution highlightAttempt={null} />
    </Modal>
  );
};

export default StatsModal;
