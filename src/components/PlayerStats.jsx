import React from 'react';
import { useGame } from '../contexts/GameContext';

//Shows all of the player's name, hp, and inventory.
function PlayerStats() {
  const { playerName, hp, inventory } = useGame();

  return (
    <div className="player-stats">
      <h2>Hunter: {playerName}</h2>
      <div className="hp-container">
        <span>HP: {hp}</span>
        <div className="hp-bar">
          <div className="hp-bar-fill" style={{ width: `${hp}%` }}></div>
        </div>
      </div>
      <div className="inventory">
        <h3>Inventory:</h3>
        {inventory.length === 0 ? (
          <p>Empty</p>
        ) : (
          <ul>
            {inventory.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PlayerStats;