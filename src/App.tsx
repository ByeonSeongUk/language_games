import { useState, useCallback } from 'react';
import './styles/animations.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomeScreen from './components/screens/HomeScreen';
import SetupScreen from './components/screens/SetupScreen';
import GameScreen from './components/screens/GameScreen';
import ResultScreen from './components/screens/ResultScreen';
import ChartScreen from './components/screens/ChartScreen';
import { GameConfig, QuestionResult } from './data/types';

type Screen = 'home' | 'setup' | 'game' | 'result' | 'chart';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
  const [lastResults, setLastResults] = useState<QuestionResult[]>([]);

  const goHome = useCallback(() => setCurrentScreen('home'), []);
  const goSetup = useCallback(() => setCurrentScreen('setup'), []);
  const goChart = useCallback(() => setCurrentScreen('chart'), []);

  const startGame = useCallback((config: GameConfig) => {
    setGameConfig(config);
    setCurrentScreen('game');
  }, []);

  const finishGame = useCallback((results: QuestionResult[]) => {
    setLastResults(results);
    setCurrentScreen('result');
  }, []);

  const playAgain = useCallback(() => {
    if (gameConfig) {
      setCurrentScreen('game');
    }
  }, [gameConfig]);

  const showBack = currentScreen !== 'home';
  const onBack = currentScreen === 'setup' ? goHome
    : currentScreen === 'game' ? goSetup
    : currentScreen === 'result' ? goSetup
    : currentScreen === 'chart' ? goHome
    : undefined;

  return (
    <>
      <Header showBack={showBack} onBack={onBack} />
      <main style={{ flex: 1 }}>
        {currentScreen === 'home' && (
          <HomeScreen onStart={goSetup} onChart={goChart} />
        )}
        {currentScreen === 'chart' && (
          <ChartScreen />
        )}
        {currentScreen === 'setup' && (
          <SetupScreen onStartGame={startGame} />
        )}
        {currentScreen === 'game' && gameConfig && (
          <GameScreen
            key={Date.now()}
            config={gameConfig}
            onFinish={finishGame}
            onQuit={goSetup}
          />
        )}
        {currentScreen === 'result' && (
          <ResultScreen
            results={lastResults}
            config={gameConfig}
            onPlayAgain={playAgain}
            onChangeSettings={goSetup}
            onHome={goHome}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
