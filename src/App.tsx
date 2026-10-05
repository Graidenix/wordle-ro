import { Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorFallback from './components/ErrorFallback';
import Game from './components/Game';
import GameProvider from './contexts/GameContext';
import StatsProvider from './contexts/StatsContext';

const App: React.FC = () => (
  <ErrorBoundary fallback={<ErrorFallback />}>
    <Suspense fallback={null}>
      <StatsProvider>
        <GameProvider>
          <Game />
        </GameProvider>
      </StatsProvider>
    </Suspense>
  </ErrorBoundary>
);

export default App;
