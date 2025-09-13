// App.js
import React, { useState, useEffect } from 'react';
import { GameProvider } from './contexts/GameContext';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    // Check for saved game
    const savedGame = localStorage.getItem('aswangHunterSave');
    if (savedGame) {
      const gameState = JSON.parse(savedGame);
      if (gameState.playerName) {
        setPlayerName(gameState.playerName);
        setGameStarted(true);
      }
    }
  }, []);

  const handleStartGame = (name) => {
    setPlayerName(name);
    setGameStarted(true);
  };

  const handleResetGame = () => {
    setGameStarted(false);
    setPlayerName('');
    localStorage.removeItem('aswangHunterSave');
  };

  return (
    <div className="App">
      <GameProvider playerName={playerName} onResetGame={handleResetGame}>
        {!gameStarted ? (
          <StartScreen onStartGame={handleStartGame} />
        ) : (
          <GameScreen />
        )}
      </GameProvider>
    </div>
  );
}

export default App;