// components/GameOverScreen.js
import React from 'react';
import { useGame } from '../contexts/GameContext';

function GameOverScreen() {
  const { storyData, currentNode, resetGame, victory } = useGame();
  const node = storyData[currentNode];

  return (
    <div className="game-over-screen">
      <h1>{victory ? 'Victory!' : 'Game Over'}</h1>
      <div className="ending-text">{node.text}</div>
      <button onClick={resetGame} className="play-again-btn">
        Play Again
      </button>
    </div>
  );
}

export default GameOverScreen;