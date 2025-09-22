import React, { useState, useEffect } from 'react';
import './ScrambleGame.css';

// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const ScrambleGame = () => {
  const [currentPhrase, setCurrentPhrase] = useState(null);
  const [scrambledWords, setScrambledWords] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [message, setMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Start a new game round
  const startGame = (data) => {
    const playablePhrases = data.filter(entry => entry.gif && entry.word.split(' ').length > 1);

    if (playablePhrases.length === 0) {
      setMessage('No playable phrases found in the glossary.');
      setIsLoading(false);
      return;
    }

    const randomIndex = Math.floor(Math.random() * playablePhrases.length);
    const selectedPhrase = playablePhrases[randomIndex];

    setCurrentPhrase(selectedPhrase);
    const words = selectedPhrase.word.split(' ');
    setScrambledWords(shuffleArray([...words]));
    setUserAnswer([]);
    setMessage('');
    setIsCorrect(false);
    setIsLoading(false);
  };

  // Load glossary data on mount
  useEffect(() => {
    fetch('/glossary.json')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => startGame(data))
      .catch(error => {
        console.error("Error loading glossary data:", error);
        setMessage("Failed to load game data. Check the console for details.");
        setIsLoading(false);
      });
  }, []);

  // Handle clicking a word
  const handleWordClick = (word, index) => {
    setUserAnswer(prev => [...prev, word]);
    const newScrambled = [...scrambledWords];
    newScrambled.splice(index, 1);
    setScrambledWords(newScrambled);
  };

  // Check user's answer
  const checkAnswer = () => {
    if (!currentPhrase) return;

    const correctPhrase = currentPhrase.word.toLowerCase();
    const userPhrase = userAnswer.join(' ').toLowerCase();

    if (userPhrase === correctPhrase) {
      setMessage('✅ Correct! Well done!');
      setIsCorrect(true);
    } else {
      setMessage('❌ Try again. The order is incorrect.');
      setIsCorrect(false);
    }
  };

  // Reset game for a new round
  const resetGame = () => {
    setIsLoading(true);
    fetch('/glossary.json')
      .then(response => response.json())
      .then(data => startGame(data));
  };

  if (isLoading) return <div>Loading game...</div>;

  return (
    <div className="scramble-game">
      <h2>Caption Scramble</h2>
      <p>Reorder the words to match the sign video.</p>

      <div className="game-area">
        <div className="gif-container">
          <img src={currentPhrase.gif} alt="Sign language hint" className="gif-hint" />
        </div>

        <div className="answer-area">
          <h3>Your Answer:</h3>
          <div className="word-slots">
            {userAnswer.map((word, index) => (
              <span key={index} className="word-slot">{word}</span>
            ))}
          </div>
          <p className={`message ${isCorrect ? 'correct' : 'incorrect'}`}>{message}</p>
        </div>

        <div className="word-bank">
          {scrambledWords.map((word, index) => (
            <button
              key={index}
              className="word-button"
              onClick={() => handleWordClick(word, index)}
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <div className="controls">
        <button className="check-button" onClick={checkAnswer}>Check Answer</button>
        <button className="reset-button" onClick={resetGame}>Next Game</button>
      </div>
    </div>
  );
};

export default ScrambleGame;
