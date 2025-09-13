import React, { useState } from 'react';

function StartScreen({ onStartGame }) {
  const [name, setName] = useState('');

  //Checks the name is filled in before starting the game. If it isn't, it prevents the game from starting.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onStartGame(name.trim());
    }
  };

  return (
    <div className="start-screen">
      <h1>Aswang Hunter</h1>
      <p>Hunt down the Manananggal, and save San Gubat from the nightly terrors that haunt it.</p>
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