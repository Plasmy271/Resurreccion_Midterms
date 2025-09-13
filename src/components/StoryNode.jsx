// components/StoryNode.js
import React from 'react';
import { useGame } from '../contexts/GameContext';

function StoryNode({ nodeId }) {
  const { storyData, navigateToNode, inventory } = useGame();
  const node = storyData[nodeId];

  if (!node) {
    return <div>Error: Node not found</div>;
  }

  const handleChoiceClick = (to) => {
    navigateToNode(to);
  };

  const availableChoices = node.choices ? node.choices.filter(choice => {
    if (!choice.requires) return true;
    return inventory.includes(choice.requires);
  }) : [];

  return (
    <div className="story-node">
      <div className="story-text">{node.text}</div>
      {availableChoices.length > 0 && (
        <div className="choices">
          {availableChoices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoiceClick(choice.to)}
              className="choice-btn"
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default StoryNode;