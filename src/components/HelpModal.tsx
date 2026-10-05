import type { HelpExample } from '../types/game';
import { buildExampleTiles } from '../utils/buildExampleTiles';
import { MAX_ATTEMPTS, WORD_LENGTH } from '../utils/constants';
import Modal from './Modal';
import Tile from './Tile';

const EXAMPLES: HelpExample[] = [
  { id: 'correct', tiles: buildExampleTiles('FRAZA', 0, 'correct'), description: 'F este în cuvânt, pe poziția corectă.' },
  { id: 'present', tiles: buildExampleTiles('PIEPT', 1, 'present'), description: 'I este în cuvânt, dar pe altă poziție.' },
  { id: 'absent', tiles: buildExampleTiles('VORBA', 3, 'absent'), description: 'B nu apare în cuvânt.' },
];

interface Props {
  onClose: () => void;
}

const HelpModal: React.FC<Props> = (props) => {
  const { onClose } = props;

  return (
    <Modal titleId="help-title" onClose={onClose}>
      <h2 id="help-title" className="modal__title">
        Cum se joacă
      </h2>
      <div className="help">
        <p>
          Ghicește cuvântul de {WORD_LENGTH} litere din {MAX_ATTEMPTS} încercări. Fiecare încercare trebuie să fie un
          cuvânt din dicționar.
        </p>
        <p>După fiecare încercare, culorile îți arată cât de aproape ești:</p>
        {EXAMPLES.map((example) => (
          <div key={example.id} className="help__example">
            <div className="help__tiles">
              {example.tiles.map((tile) => <Tile key={tile.id} tile={tile} />)}
            </div>
            <p className="help__description">{example.description}</p>
          </div>
        ))}
        <p className="help__note">Diacriticele nu contează: Ă și Â se scriu A, Î se scrie I, Ș se scrie S, Ț se scrie T.</p>
      </div>
      <button type="button" className="button" onClick={onClose} autoFocus>
        Hai să jucăm
      </button>
    </Modal>
  );
};

export default HelpModal;
