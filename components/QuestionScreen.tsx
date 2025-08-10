import React, { useState, useEffect } from 'react';
import Timer from './Timer.tsx';
import Confetti from './Confetti.tsx';
import { Category, Question } from '../types.ts';

interface QuestionScreenProps {
  category: Category;
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean, timeLeft: number) => void;
  onNext: () => void;
  onExit: () => void;
  onOpenFeedback: (question: Question) => void;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ category, question, questionNumber, totalQuestions, onAnswer, onNext, onExit, onOpenFeedback }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [resetTimerKey, setResetTimerKey] = useState(Date.now());

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowConfetti(false);
    setResetTimerKey(Date.now());
  }, [question]);

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered) return;
    const isCorrect = optionIndex === question.correct;
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    onAnswer(isCorrect, timeLeft);
    if (isCorrect) {
      setShowConfetti(true);
    }
  };

  const handleTimeUp = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    onAnswer(false, 0);
  };
  
  const getOptionClasses = (index: number) => {
    if (!isAnswered) {
      return 'bg-gray-700/80 hover:bg-gray-600/80';
    }
    if (index === question.correct) {
      return 'bg-green-500/80 ring-2 ring-green-300';
    }
    if (index === selectedOption) {
      return 'bg-red-500/80 ring-2 ring-red-300';
    }
    return 'bg-gray-700/80 opacity-60';
  };

  return (
    <div className="p-4 md:p-8 flex flex-col items-center">
      {showConfetti && <Confetti />}
      <div className="w-full max-w-4xl bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-6 md:p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className={`inline-block px-3 py-1 text-xs sm:text-sm rounded-full text-white font-bold bg-gradient-to-r ${category.gradient}`}>
              <i className={`fa-solid ${category.icon} mr-2`}></i>
              {category.name}
            </div>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Question {questionNumber} / {totalQuestions}</p>
          </div>
           <Timer
            isPaused={isAnswered}
            onTimeUp={handleTimeUp}
            onTick={setTimeLeft}
            resetKey={resetTimerKey}
          />
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-8">{question.text}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
              className={`p-3 sm:p-4 rounded-lg text-left text-white text-base sm:text-lg transition-all duration-300 ${getOptionClasses(index)}`}
            >
              <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>
        
        {isAnswered && (
          <div className="mt-8 p-4 bg-gray-900/50 rounded-lg animate-fade-in-up">
            <h4 className="font-bold text-lg sm:text-xl text-white mb-2">Explanation:</h4>
            <p className="text-gray-300 text-sm sm:text-base">{question.explanation}</p>
            <div className="mt-6 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
              <button onClick={() => onOpenFeedback(question)} className="text-gray-400 hover:text-white text-sm transition-colors self-start sm:self-center mt-2 sm:mt-0">
                  <i className="fa-solid fa-flag mr-2"></i>Report an Issue
              </button>
              <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                  <button onClick={onExit} className="flex-1 sm:flex-none bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
                      Exit
                  </button>
                  <button onClick={onNext} className="flex-1 sm:flex-none bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 px-6 sm:px-8 rounded-md shadow-lg hover:scale-105 transform transition-transform">
                      Next<i className="fa-solid fa-arrow-right ml-2 hidden sm:inline-block"></i>
                  </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionScreen;
