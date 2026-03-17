import { useState } from 'react';
import type { Category } from './lib/categories';
import { UsernameScreen } from './components/UsernameScreen';
import { GameScreen } from './components/GameScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';

type Screen = 'home' | 'game' | 'results' | 'leaderboard';

interface GameState {
  category: Category;
  score: number;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [gameState, setGameState] = useState<GameState>({
    category: 'US States',
    score: 0,
  });

  function handleCategorySelect(category: Category) {
    setGameState({ category, score: 0 });
    setScreen('game');
  }

  function handleViewLeaderboard(category: Category) {
    setGameState(prev => ({ ...prev, category }));
    setScreen('leaderboard');
  }

  function handleGameEnd(score: number) {
    setGameState(prev => ({ ...prev, score }));
    setScreen('results');
  }

  function handlePlayAgain() {
    setScreen('home');
  }

  return (
    <div className="app">
      {screen !== 'home' && (
        <button
          className="home-btn"
          onClick={() => setScreen('home')}
          aria-label="Return to home"
          title="Home"
        >
          ← Home
        </button>
      )}
      {screen === 'home' && (
        <UsernameScreen
          onSelectCategory={handleCategorySelect}
          onViewLeaderboard={handleViewLeaderboard}
        />
      )}
      {screen === 'game' && (
        <GameScreen
          category={gameState.category}
          onGameEnd={handleGameEnd}
        />
      )}
      {screen === 'results' && (
        <ResultsScreen
          category={gameState.category}
          score={gameState.score}
          onPlayAgain={handlePlayAgain}
        />
      )}
      {screen === 'leaderboard' && (
        <LeaderboardScreen
          initialCategory={gameState.category}
          onPlay={handleCategorySelect}
        />
      )}
    </div>
  );
}
