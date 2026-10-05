import { useState } from 'react';
import { useGameState } from '../contexts/GameContext';
import usePhysicalKeyboard from '../hooks/usePhysicalKeyboard';
import useRecordGameResult from '../hooks/useRecordGameResult';
import type { Panel } from '../types/game';
import { hasSeenHelp, markHelpSeen } from '../utils/helpStorage';
import Board from './Board';
import Header from './Header';
import HelpModal from './HelpModal';
import Keyboard from './Keyboard';
import ResultModal from './ResultModal';
import StatsModal from './StatsModal';
import Toast from './Toast';

// First-time visitors see the rules before playing.
const getInitialPanel = (): Panel | null => (hasSeenHelp() ? null : 'help');

const Game: React.FC = () => {
  const [openPanel, setOpenPanel] = useState(getInitialPanel);
  const { gameId, status } = useGameState();
  usePhysicalKeyboard(openPanel !== null);
  useRecordGameResult();

  const handleCloseHelp = () => {
    markHelpSeen();
    setOpenPanel(null);
  };

  return (
    <div className="app">
      <Header onOpenHelp={() => setOpenPanel('help')} onOpenStats={() => setOpenPanel('stats')} />
      <main className="game">
        <Board key={gameId} />
        <Keyboard />
      </main>
      <Toast />
      {status !== 'playing' && <ResultModal />}
      {openPanel === 'help' && <HelpModal onClose={handleCloseHelp} />}
      {openPanel === 'stats' && <StatsModal onClose={() => setOpenPanel(null)} />}
    </div>
  );
};

export default Game;
