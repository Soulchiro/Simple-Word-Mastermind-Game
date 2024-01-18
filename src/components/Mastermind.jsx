import React, { useState, useEffect } from 'react';


const WordMastermind = () => {
  const secretWord = 'КОФЕ'; 
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 5;

  useEffect(() => {
    if (guess.length === secretWord.length) {
      checkGuess();
    }
  }, [guess]);

  const checkGuess = () => {
    let correctPositionCount = 0;
    let correctLetterCount = 0;

    for (let i = 0; i < secretWord.length; i++) {
      if (guess[i] === secretWord[i]) {
        correctPositionCount++;
      } else if (secretWord.includes(guess[i])) {
        correctLetterCount++;
      }
    }

    const newFeedback = [...feedback, `${correctPositionCount} в правильной позиции, ${correctLetterCount} правильных букв`];

    setFeedback(newFeedback);
    setAttempts(attempts + 1);
    setGuess('');

    if (correctPositionCount === secretWord.length) {
      alert(`Поздравляем! Вы угадали слово "${secretWord}"!`);
      resetGame();
    } else if (attempts >= maxAttempts) {
      alert(`Извините, вы исчерпали все попытки. Загаданное слово было "${secretWord}".`);
      resetGame();
    }
  };

  const resetGame = () => {
    setGuess('');
    setFeedback([]);
    setAttempts(0);
  };

  return (
    <div>
      <h1>Word Mastermind</h1>
      <p>Попробуйте угадать слово, состоящее из {secretWord.length} букв.</p>
      <p>Попыток: {attempts}/{maxAttempts}</p>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value.toUpperCase())}
        maxLength={secretWord.length}
      />
      <button onClick={checkGuess}>Проверить</button>
      <button onClick={resetGame}>Начать заново</button>
      <div>
        {feedback.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default WordMastermind;