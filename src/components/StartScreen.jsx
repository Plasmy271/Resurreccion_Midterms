// components/StartScreen.js
import React, { useState } from 'react';

function StartScreen({ onStartGame }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onStartGame(name.trim());
    }
  };

  return (
    <div className="start-screen">
      <h1>Aswang Hunter</h1>
      <p>Embark on a journey through Filipino folklore</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Begin Hunt</button>
      </form>
    </div>
  );
}

export default StartScreen;