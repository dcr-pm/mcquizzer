import React from 'react';
import { ExamResult, Certification } from '../types.ts';
import Confetti from './Confetti.tsx';

interface ExamResultsScreenProps {
  result: ExamResult;
  cert: Certification;
  onRetake: () => void;
  onBackToHub: () => void;
}

const ExamResultsScreen: React.FC<ExamResultsScreenProps> = ({ result, cert, onRetake, onBackToHub }) => {
  const passed = result.passed;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="py-6 sm:py-8 animate-fade-in-up max-w-2xl mx-auto">
      {passed && <Confetti />}

      {/* Pass/Fail Banner */}
      <div className={`rounded-2xl p-8 text-center mb-6 ${passed ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30' : 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30'}`}>
        <i className={`fa-solid ${passed ? 'fa-circle-check' : 'fa-circle-xmark'} text-5xl mb-4 ${passed ? 'text-green-400' : 'text-red-400'}`}></i>
        <h1 className={`text-3xl font-bold mb-2 ${passed ? 'text-green-400' : 'text-red-400'}`}>
          {passed ? 'Congratulations!' : 'Not Quite Yet'}
        </h1>
        <p className="text-gray-300 text-sm">
          {passed ? "You passed the practice exam! Keep up the great work." : `You need ${cert.passingScore}% to pass. Keep studying and try again!`}
        </p>
      </div>

      {/* Score Card */}
      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center mb-6">
          <div>
            <p className={`text-3xl font-bold ${passed ? 'text-green-400' : 'text-red-400'}`}>{result.scorePercent}%</p>
            <p className="text-xs text-gray-400 mt-1">Your Score</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{result.correctAnswers}/{result.totalQuestions}</p>
            <p className="text-xs text-gray-400 mt-1">Correct</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-400">{formatTime(result.timeTaken)}</p>
            <p className="text-xs text-gray-400 mt-1">Time Taken</p>
          </div>
        </div>

        {/* Score bar */}
        <div className="relative mb-2">
          <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${passed ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-orange-500'}`}
              style={{ width: `${result.scorePercent}%` }}
            ></div>
          </div>
          {/* Passing score marker */}
          <div
            className="absolute top-0 h-4 w-0.5 bg-white/60"
            style={{ left: `${cert.passingScore}%` }}
            title={`Passing: ${cert.passingScore}%`}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>0%</span>
          <span className="text-white/60">{cert.passingScore}% to pass</span>
          <span>100%</span>
        </div>
      </div>

      {/* Domain Breakdown */}
      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 mb-6">
        <h3 className="text-lg font-bold text-white mb-4">
          <i className="fa-solid fa-chart-pie mr-2 text-blue-400"></i>Score by Domain
        </h3>
        <div className="space-y-4">
          {result.domainBreakdown.map(domain => {
            const domainPassed = domain.percent >= cert.passingScore;
            return (
              <div key={domain.domainId}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{domain.domainName}</span>
                  <span className={`font-bold ${domainPassed ? 'text-green-400' : 'text-red-400'}`}>
                    {domain.correct}/{domain.total} ({domain.percent}%)
                  </span>
                </div>
                <div className="h-2.5 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${domainPassed ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${domain.percent}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onRetake}
          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-xl shadow-lg hover:scale-105 transform transition-transform text-lg"
        >
          <i className="fa-solid fa-rotate-right mr-2"></i>Retake Exam
        </button>
        <button
          onClick={onBackToHub}
          className="flex-1 bg-gray-700/80 hover:bg-gray-600/80 text-white font-bold py-4 rounded-xl shadow-md transition-colors text-lg"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i>Cert Hub
        </button>
      </div>
    </div>
  );
};

export default ExamResultsScreen;
