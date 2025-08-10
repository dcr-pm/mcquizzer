
import React, { useState } from 'react';
import { SessionStats, Player } from '../types.ts';
import CertificateModal from './CertificateModal.tsx';

interface ScoreScreenProps {
  stats: SessionStats;
  player: Player | null;
  onPlayAgain: () => void;
  onNewCategory: () => void;
  onShowLeaderboard: () => void;
}

const ScoreScreen: React.FC<ScoreScreenProps> = ({ stats, player, onPlayAgain, onNewCategory, onShowLeaderboard }) => {
  const [isCertificateVisible, setCertificateVisible] = useState(false);
  const { categoryName, pointsEarned, correctAnswers, totalQuestions } = stats;
  
  const getPerformanceMessage = () => {
    if (totalQuestions === 0) return "No questions answered, but practice makes perfect!";
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    if (percentage >= 90) return "Outstanding! You're a true SFMC master!";
    if (percentage >= 70) return "Great job! You really know your stuff.";
    if (percentage >= 50) return "Solid effort! Keep practicing to improve.";
    return "Good try! Every quiz is a learning experience.";
  };

  return (
    <>
      <div className="text-center p-8 flex flex-col items-center justify-center h-full animate-fade-in-up">
        <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-white/20 w-full max-w-2xl">
          <i className="fa-solid fa-check-circle text-6xl text-green-400 mb-4"></i>
          <h2 className="text-4xl font-bold text-white mb-2">Quiz Complete!</h2>
          <p className="text-xl text-gray-300 mb-6">{getPerformanceMessage()}</p>

          <div className="bg-gray-900/50 p-6 rounded-lg mb-8 text-left grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <p className="text-sm text-gray-400">Category</p>
                  <p className="text-2xl font-bold text-blue-300">{categoryName}</p>
              </div>
              <div>
                  <p className="text-sm text-gray-400">Questions Answered</p>
                  <p className="text-2xl font-bold text-white">{totalQuestions}</p>
              </div>
              <div>
                  <p className="text-sm text-gray-400">Correct Answers</p>
                  <p className="text-2xl font-bold text-green-400">{correctAnswers} / {totalQuestions}</p>
              </div>
              <div>
                  <p className="text-sm text-gray-400">Points Earned</p>
                  <p className="text-2xl font-bold text-yellow-400">+{pointsEarned.toLocaleString()} pts</p>
              </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <button
              onClick={onPlayAgain}
              className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transform transition-transform"
            >
              <i className="fa-solid fa-redo mr-2"></i>Play Again
            </button>
            <button
              onClick={onNewCategory}
              className="w-full md:w-auto bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              <i className="fa-solid fa-list-ul mr-2"></i>New Category
            </button>
             <button
              onClick={onShowLeaderboard}
              className="w-full md:w-auto text-blue-300 hover:text-blue-200 font-semibold transition-colors py-3 px-6"
            >
              <i className="fa-solid fa-trophy mr-2"></i>View Leaderboard
            </button>
          </div>
          
           <div className="mt-8 text-center">
             <button
                onClick={() => setCertificateVisible(true)}
                className="w-full md:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transform transition-transform"
              >
                <i className="fa-solid fa-award mr-2"></i>Get Certificate
              </button>
           </div>
        </div>
      </div>
      {isCertificateVisible && player && (
        <CertificateModal
            player={player}
            stats={stats}
            onClose={() => setCertificateVisible(false)}
        />
      )}
    </>
  );
};

export default ScoreScreen;