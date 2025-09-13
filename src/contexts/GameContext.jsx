import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import storyData from '../data/story.json';

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
      return { ...initialState, playerName: action.payload || '' };
    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.payload };
    default:
      return state;
  }
}

export function GameProvider({ children, playerName, onResetGame }) {
  const [state, dispatch] = useReducer(gameReducer, {
    ...initialState,
    playerName
  });

  // Load saved game on initial render
  useEffect(() => {
    const savedGame = localStorage.getItem('aswangHunterSave');
    if (savedGame) {
      try {
        const gameState = JSON.parse(savedGame);
        // Only load if we have a valid saved state
        if (gameState.currentNode && gameState.currentNode !== 'start') {
          dispatch({ type: 'LOAD_SAVED_GAME', payload: gameState });
        }
      } catch (e) {
        console.error('Failed to parse saved game:', e);
      }
    }
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    // Only save if we're not in the initial state
    if (state.currentNode !== 'start' || state.inventory.length > 0 || state.hp !== 100) {
      localStorage.setItem('aswangHunterSave', JSON.stringify(state));
    }
  }, [state]);

  // Update playerName when prop changes
  useEffect(() => {
    if (playerName && playerName !== state.playerName) {
      dispatch({ type: 'SET_PLAYER_NAME', payload: playerName });
    }
  }, [playerName, state.playerName]);

  // Check for game over due to HP loss
  useEffect(() => {
    if (state.hp <= 0 && !state.gameOver) {
      dispatch({ type: 'SET_CURRENT_NODE', payload: 'gameOver_hp' });
      dispatch({ type: 'SET_GAME_OVER' });
    }
  }, [state.hp, state.gameOver]);

  const navigateToNode = useCallback((nodeId) => {
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

    // Check if this is an ending node
    if (node && node.isEnding) {
      if (nodeId === 'goodEnding') {
        dispatch({ type: 'SET_VICTORY' });
      } else {
        dispatch({ type: 'SET_GAME_OVER' });
      }
    }
  }, []);

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