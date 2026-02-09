import { useState, useCallback } from 'react';
import './styles/animations.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomeScreen from './components/screens/HomeScreen';
import SetupScreen from './components/screens/SetupScreen';
import GameScreen from './components/screens/GameScreen';
import ResultScreen from './components/screens/ResultScreen';
import ChartScreen from './components/screens/ChartScreen';
import WordSetupScreen from './components/screens/WordSetupScreen';
import WordGameScreen from './components/screens/WordGameScreen';
import WordResultScreen from './components/screens/WordResultScreen';
import { GameConfig, QuestionResult, WordGameConfig, WordQuestionResult } from './data/types';

type Screen =
  | 'home'
  | 'setup' | 'game' | 'result' | 'chart'
  | 'wordSetup' | 'wordGame' | 'wordResult';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
  const [lastResults, setLastResults] = useState<QuestionResult[]>([]);
  const [wordGameConfig, setWordGameConfig] = useState<WordGameConfig | null>(null);
  const [wordLastResults, setWordLastResults] = useState<WordQuestionResult[]>([]);

  const goHome = useCallback(() => setCurrentScreen('home'), []);
  const goSetup = useCallback(() => setCurrentScreen('setup'), []);
  const goChart = useCallback(() => setCurrentScreen('chart'), []);
  const goWordSetup = useCallback(() => setCurrentScreen('wordSetup'), []);

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

  // Word game handlers
  const startWordGame = useCallback((config: WordGameConfig) => {
    setWordGameConfig(config);
    setCurrentScreen('wordGame');
  }, []);

  const finishWordGame = useCallback((results: WordQuestionResult[]) => {
    setWordLastResults(results);
    setCurrentScreen('wordResult');
  }, []);

  const playWordAgain = useCallback(() => {
    if (wordGameConfig) {
      setCurrentScreen('wordGame');
    }
  }, [wordGameConfig]);

  const showBack = currentScreen !== 'home';
  const onBack = currentScreen === 'setup' ? goHome
    : currentScreen === 'game' ? goSetup
    : currentScreen === 'result' ? goSetup
    : currentScreen === 'chart' ? goHome
    : currentScreen === 'wordSetup' ? goHome
    : currentScreen === 'wordGame' ? goWordSetup
    : currentScreen === 'wordResult' ? goWordSetup
    : undefined;

  return (
    <>
      <Header showBack={showBack} onBack={onBack} />
      <main style={{ flex: 1 }}>
        {currentScreen === 'home' && (
          <HomeScreen onStart={goSetup} onChart={goChart} onWords={goWordSetup} />
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
        {currentScreen === 'wordSetup' && (
          <WordSetupScreen onStartGame={startWordGame} />
        )}
        {currentScreen === 'wordGame' && wordGameConfig && (
          <WordGameScreen
            key={Date.now()}
            config={wordGameConfig}
            onFinish={finishWordGame}
            onQuit={goWordSetup}
          />
        )}
        {currentScreen === 'wordResult' && (
          <WordResultScreen
            results={wordLastResults}
            config={wordGameConfig}
            onPlayAgain={playWordAgain}
            onChangeSettings={goWordSetup}
            onHome={goHome}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
