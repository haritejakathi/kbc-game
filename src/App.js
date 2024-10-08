import React, { useState, useEffect } from "react";
import { questions } from "./questions"; // Make sure this file exists
import { QRCodeCanvas } from 'qrcode.react';  // Correct import
import { v4 as uuidv4 } from "uuid";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState({ currentAnswer: "", correctPlayer: "" });
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (gameState.correctPlayer) {
      const timeout = setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setGameState({ currentAnswer: "", correctPlayer: "" });
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [gameState]);

  const handleJoinGame = (name) => {
    const newPlayer = { id: uuidv4(), name };
    setPlayers([...players, newPlayer]);
  };

  const handleAnswerSubmission = (playerId, answer) => {
    if (answer === questions[currentQuestion].correct) {
      const player = players.find((p) => p.id === playerId);
      setGameState({ currentAnswer: answer, correctPlayer: player.name });
    } else {
      alert("Wrong answer!");
    }
  };

  return (
    <div className="App">
      <h1>KBC Game</h1>
      {!scanned ? (
        <>
          <h2>Scan the QR code to join the game!</h2>
          {/* This should now be QRCodeCanvas */}
          <QRCodeCanvas value={window.location.href} />
        </>
      ) : (
        <>
          <h2>Question: {questions[currentQuestion].question}</h2>
          <ul>
            {Object.entries(questions[currentQuestion].options).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
          {gameState.correctPlayer && (
            <h2>Congratulations {gameState.correctPlayer}, you answered correctly!</h2>
          )}
        </>
      )}

      <div>
        <h2>Players:</h2>
        <ul>
          {players.map((player) => (
            <li key={player.id}>{player.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
