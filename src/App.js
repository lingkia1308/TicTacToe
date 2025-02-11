import React, { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hearts] = useState([]); // Store floating hearts

  const loveImages = [
    process.env.PUBLIC_URL + "/heart/heart1.png",
    process.env.PUBLIC_URL + "/heart/heart2.png",
    process.env.PUBLIC_URL + "/heart/heart3.png",
    process.env.PUBLIC_URL + "/heart/heart4.png",
    process.env.PUBLIC_URL + "/heart/heart5.png",
    process.env.PUBLIC_URL + "/heart/heart6.png",
    process.env.PUBLIC_URL + "/heart/heart7.png",
    process.env.PUBLIC_URL + "/heart/heart8.png",
    process.env.PUBLIC_URL + "/heart/heart9.png",
  ];

  const messages = [
    "Every day with you feels like Valentine's Day. I’m so lucky to have you in my life",
    "You’re my favorite person in the world. Happy Valentine’s Day to the one who makes my heart skip a beat",
    "I fall for you more and more every day. Will you be my Valentine today and forever?",
    "You’re my sunshine on cloudy days and my stars on dark nights. I love you endlessly",
    "I don’t need a special day to remind me how much I love you, but today, I’m celebrating you extra hard.",
    "Roses are red, violets are blue, I’m bad at poems, but I’m great at loving you.",
    "Thank you for being my partner, my best friend, and my everything. I love you more than words can say.",
    "You make my life brighter, my heart fuller, and my days happier. I’m so grateful for you.",
    "Every moment with you is a gift. Thank you for loving me the way you do.",
  ];

  const handleClick = (i) => {
    if (board[i]) return;

    const remainingImages = loveImages.filter((img) => !board.includes(img));
    const remainingMessages = messages.filter(
      (msg) =>
        !board
          .map((_, idx) => messages[loveImages.indexOf(board[idx])])
          .includes(msg)
    );

    if (remainingImages.length === 0) return; // Safety check

    const randomIndex = Math.floor(Math.random() * remainingImages.length);
    const selectedImage = remainingImages[randomIndex];
    const selectedMessage = remainingMessages[randomIndex];

    const newBoard = [...board];
    newBoard[i] = selectedImage;
    setBoard(newBoard);
    setMessage(selectedMessage);

    if (newBoard.every((box) => box !== null)) {
      setTimeout(() => {
        setIsModalOpen(true);
      }, 500);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setMessage("");
    setIsModalOpen(false);
  };

  const renderSquare = (i) => {
    return (
      <button className="square" onClick={() => handleClick(i)}>
        {board[i] ? (
          <img src={board[i]} alt="love" className="love-icon" />
        ) : null}
      </button>
    );
  };

  return (
    <div className="game">
      <h1 className="mi-amor-title">💘 MI AMOR 💘</h1>

      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>

      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-container"
          style={{ left: heart.left }}
        >
          <span className="heart">💖</span>
        </div>
      ))}

      {/* Message Box with Floating Hearts */}
      <div className="message-box-container">
        <span className="floating-heart">❤️</span>
        <span className="floating-heart">💖</span>
        <span className="floating-heart">💕</span>
        <span className="floating-heart">💘</span>
        <div className="message-box">
          <p>{message || "Click on a square to reveal a message!"}</p>
        </div>
      </div>

      {/* Valentine’s Date Invitation Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Romantic Header */}
            <h2 className="modal-title">💖 Valentine’s Date Invitation 💖</h2>

            {/* Date & Venue Details */}
            <p>
              <strong>📅 Date:</strong> 14th Feb 2025
            </p>
            <p>
              <strong>📍 Venue:</strong> Sanuki Udon
            </p>

            {/* Custom Message */}
            <p>
              <strong>
                You make every day special, but this Valentine’s Day, I want to
                celebrate us. Join me for a night of love, surprises, and
                unforgettable moments. Be my Valentine? ❤️
              </strong>
              <strong></strong>
            </p>

            {/* Romantic Closing Line */}
            <p className="modal-footer">
              "I can't wait to spend this special day with you!" ✨
            </p>

            {/* Close Button */}
            <button className="close-btn" onClick={resetGame}>
              LOVE YOU MORE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
