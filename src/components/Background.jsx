import React from 'react';
import { useGame } from '../contexts/GameContext';

function Background() {
  const { backgroundImage } = useGame();

  // Prepend the /images/ path to the image filename
  const imagePath = backgroundImage 
    ? `/images/${backgroundImage}`
    : '/images/default-background.png';

  return (
    <div 
      className="background-container"
      style={{
        backgroundImage: `url(${imagePath})`
      }}
    />
  );
}

export default Background;