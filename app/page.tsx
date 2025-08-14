"use client";

import { useEffect, useState } from "react";
import {
  Shuffle,
  Eye,
  RotateCcw,
  Trophy,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function Home() {
  const companyNames = [
    "CHRISTEX FOUNDATION",
    "SAFULPAY",
    "THE COMMUNITY",
    "KNESST",
    "MICROSOFT",
    "NVIDIA",
    "PERPLEXITY",
    "GUARANTY TRUST BANK",
    "INTERNET SOCIETY",
    "OSWALD'S TECH",
    "MOBILE MONEY",
    "NATCA",
    "SEND ME",
    "CHAT GPT",
    "ARTIFICIAL INTELLIGENCE",
    "GEMINI",
    "SOFTWARE ENGINEERING",
    "INNOVATION",
    "SEAMLESSLY",
    "MONIME",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledName, setShuffledName] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameStats, setGameStats] = useState({ correct: 0, total: 0 });

  // Function to shuffle letters in a word
  const shuffleWord = (word: string) => {
    const letters = word.split("");
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join("");
  };

  // Initialize game with first shuffled word
  useEffect(() => {
    const shuffled = shuffleWord(companyNames[currentIndex]);
    setShuffledName(shuffled);
  }, [currentIndex]);

  const handleGuess = () => {
    const correct = userGuess.toUpperCase() === companyNames[currentIndex];
    setIsCorrect(correct);
    setAttempts((prev) => prev + 1);

    if (correct) {
      setScore((prev) => prev + 1);
      setGameStats((prev) => ({
        correct: prev.correct + 1,
        total: prev.total + 1,
      }));
    } else {
      setGameStats((prev) => ({
        correct: prev.correct,
        total: prev.total + 1,
      }));
    }

    // Auto advance after 2 seconds if correct
    if (correct) {
      setTimeout(() => {
        nextWord();
      }, 2000);
    }
  };

  const revealAnswer = () => {
    setShowAnswer(true);
    setIsCorrect(null);
  };

  const nextWord = () => {
    if (currentIndex < companyNames.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserGuess("");
      setShowAnswer(false);
      setIsCorrect(null);
    } else {
      // Game completed
      alert(
        `Game Complete! Final Score: ${score + (isCorrect ? 1 : 0)}/${
          companyNames.length
        }`
      );
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setUserGuess("");
    setShowAnswer(false);
    setScore(0);
    setAttempts(0);
    setIsCorrect(null);
    setGameStats({ correct: 0, total: 0 });
    const shuffled = shuffleWord(companyNames[0]);
    setShuffledName(shuffled);
  };

  const skipWord = () => {
    setGameStats((prev) => ({
      correct: prev.correct,
      total: prev.total + 1,
    }));
    nextWord();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🧠💭 GUESS THE WORD
          </h1>
          <p className="text-gray-600">Unscramble the word!</p>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {currentIndex + 1}
            </div>
            <div className="text-sm text-gray-600">
              of {companyNames.length}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {gameStats.correct}
            </div>
            <div className="text-sm text-gray-600">Correct</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {gameStats.total > 0
                ? Math.round((gameStats.correct / gameStats.total) * 100)
                : 0}
              %
            </div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
        </div>

        {/* Shuffled Word Display */}
        <div className="text-center mb-8">
          <div className="text-4xl font-mono font-bold text-gray-800 mb-4 tracking-wider bg-yellow-100 py-4 px-6 rounded-lg border-2 border-yellow-200">
            {showAnswer ? companyNames[currentIndex] : shuffledName}
          </div>
          {showAnswer && (
            <div className="text-green-600 font-semibold">
              ✓ Correct Answer Revealed!
            </div>
          )}
        </div>

        {/* Input and Buttons */}
        <div className="space-y-4">
          {!showAnswer && isCorrect === null && (
            <>
              <input
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                placeholder="Enter your guess..."
                className="w-full p-4 text-black text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                onKeyPress={(e) =>
                  e.key === "Enter" && userGuess.trim() && handleGuess()
                }
              />

              <div className="flex gap-3">
                <button
                  onClick={handleGuess}
                  disabled={!userGuess.trim()}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Guess
                </button>
                <button
                  onClick={revealAnswer}
                  className="flex-1 bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye size={18} />
                  Reveal
                </button>
              </div>
            </>
          )}

          {/* Feedback */}
          {isCorrect === true && (
            <div className="text-center p-4 bg-green-100 rounded-lg border border-green-300">
              <CheckCircle className="mx-auto mb-2 text-green-600" size={32} />
              <div className="text-green-800 font-semibold text-lg">
                Correct! Well done! 🎉
              </div>
              <div className="text-green-700 text-sm mt-1">
                Moving to next word...
              </div>
            </div>
          )}

          {isCorrect === false && (
            <div className="space-y-3">
              <div className="text-center p-4 bg-red-100 rounded-lg border border-red-300">
                <XCircle className="mx-auto mb-2 text-red-600" size={32} />
                <div className="text-red-800 font-semibold">
                  Not quite right. Try again!
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsCorrect(null);
                    setUserGuess("");
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={revealAnswer}
                  className="flex-1 bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye size={18} />
                  Show Answer
                </button>
              </div>
            </div>
          )}

          {showAnswer && (
            <div className="flex gap-3">
              <button
                onClick={nextWord}
                disabled={currentIndex >= companyNames.length - 1}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {currentIndex >= companyNames.length - 1
                  ? "Game Complete!"
                  : "Next Word →"}
              </button>
              <button
                onClick={skipWord}
                className="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Skip
              </button>
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={resetGame}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RotateCcw size={16} />
            Reset Game
          </button>
          <button
            onClick={() => {
              const newShuffled = shuffleWord(companyNames[currentIndex]);
              setShuffledName(newShuffled);
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Shuffle size={16} />
            Re-shuffle
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>
              {currentIndex + 1}/{companyNames.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / companyNames.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
