import React from 'react';
import { useGame } from '../contexts/GameContext';
import StoryNode from './StoryNode';
import PlayerStats from './PlayerStats';
import GameOverScreen from './GameOverScreen';

//Displays the stats and story. Will show the gameover screen if the player dies or reaches an ending.
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