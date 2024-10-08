import React, { useState } from "react";

function PlayerView({ onJoin, onSubmitAnswer }) {
  const [playerName, setPlayerName] = useState("");
  const [answer, setAnswer] = useState("");

  const handleJoin = () => {
    onJoin(playerName);
  };

  const handleSubmit = () => {
    onSubmitAnswer(answer);
  };

  return (
    <div>
      <h2>Join the Game</h2>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={handleJoin}>Join</button>

      <h3>Submit Your Answer</h3>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter A, B, C, or D"
      />
      <button onClick={handleSubmit}>Submit Answer</button>
    </div>
  );
}

export default PlayerView;
