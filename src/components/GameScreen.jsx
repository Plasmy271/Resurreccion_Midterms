// components/GameScreen.js
import React from 'react';
import { useGame } from '../contexts/GameContext';
import StoryNode from './StoryNode';
import PlayerStats from './PlayerStats';
import GameOverScreen from './GameOverScreen';

function GameScreen() {
  const { currentNode, gameOver, victory } = useGame();

  if (gameOver || victory) {
    return <GameOverScreen />;
  }

  return (
    <div className="game-screen">
      <PlayerStats />
      <StoryNode nodeId={currentNode} />
    </div>
  );
}

export default GameScreen;