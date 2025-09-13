// contexts/GameContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import storyData from '../assets/data/story.json';

const GameContext = createContext();

const initialState = {
  currentNode: 'start',
  playerName: '',
  hp: 100,
  inventory: [],
  gameOver: false,
  victory: false
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'LOAD_SAVED_GAME':
      return { ...state, ...action.payload };
    case 'SET_CURRENT_NODE':
      return { ...state, currentNode: action.payload };
    case 'ADD_ITEM':
      return { 
        ...state, 
        inventory: [...state.inventory, action.payload] 
      };
    case 'TAKE_DAMAGE':
      const newHp = state.hp - action.payload;
      return { 
        ...state, 
        hp: newHp,
        gameOver: newHp <= 0
      };
    case 'SET_GAME_OVER':
      return { ...state, gameOver: true };
    case 'SET_VICTORY':
      return { ...state, victory: true };
    case 'RESET_GAME':
      return { ...initialState, playerName: action.payload };
    default:
      return state;
  }
}

export function GameProvider({ children, playerName, onResetGame }) {
  const [state, dispatch] = useReducer(gameReducer, {
    ...initialState,
    playerName
  });

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (state.playerName) {
      localStorage.setItem('aswangHunterSave', JSON.stringify(state));
    }
  }, [state]);

  // Check for game over due to HP loss
  useEffect(() => {
    if (state.hp <= 0 && !state.gameOver) {
      dispatch({ type: 'SET_CURRENT_NODE', payload: 'gameOver_hp' });
      dispatch({ type: 'SET_GAME_OVER' });
    }
  }, [state.hp, state.gameOver]);

  const navigateToNode = (nodeId) => {
    dispatch({ type: 'SET_CURRENT_NODE', payload: nodeId });
    
    // Apply any onArrive effects
    const node = storyData[nodeId];
    if (node && node.onArrive) {
      if (node.onArrive.addItem) {
        dispatch({ type: 'ADD_ITEM', payload: node.onArrive.addItem });
      }
      if (node.onArrive.takeDamage) {
        dispatch({ type: 'TAKE_DAMAGE', payload: node.onArrive.takeDamage });
      }
    }
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME', payload: playerName });
    onResetGame();
  };

  const value = {
    ...state,
    storyData,
    navigateToNode,
    resetGame
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}