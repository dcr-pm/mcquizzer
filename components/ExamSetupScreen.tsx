import React, { useState } from 'react';
import { Certification, PremiumQuestion } from '../types.ts';

interface ExamSetupScreenProps {
  cert: Certification;
  questions: PremiumQuestion[];
  onStartExam: (questions: PremiumQuestion[], timeLimitSeconds: number) => void;
  onBack: () => void;
}

const ExamSetupScreen: React.FC<ExamSetupScreenProps> = ({ cert, questions, onStartExam, onBack }) => {
  const [mode, setMode] = useState<'full' | 'quick'>('full');

  const fullCount = Math.min(cert.examQuestionCount, questions.length);
  const quickCount = Math.min(Math.ceil(cert.examQuestionCount / 3), questions.length);

  const selectedCount = mode === 'full' ? fullCount : quickCount;
  const selectedTime = mode === 'full' ? cert.examTimeLimitMinutes : Math.ceil(cert.examTimeLimitMinutes / 3);

  const handleStart = () => {
    // Shuffle and pick questions
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const selected = shuffled.slice(0, selectedCount);
    onStartExam(selected, selectedTime * 60);
  };

  return (
    <div className="py-6 sm:py-8 animate-fade-in-up max-w-2xl mx-auto">
      <button onClick={onBack} className="text-gray-400 hover:text-white text-sm mb-6 transition-colors">
        <i className="fa-solid fa-arrow-left mr-2"></i>Back to Cert Hub
      </button>

      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4`}>
            <i className="fa-solid fa-file-circle-check text-3xl text-white"></i>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Practice Exam</h1>
          <p className="text-gray-400 text-sm">{cert.name}</p>
        </div>

        {/* Exam Info */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-gray-900/50 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-white">{cert.passingScore}%</p>
            <p className="text-xs text-gray-400 mt-1">Passing Score</p>
          </div>
          <div className="bg-gray-900/50 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-white">{selectedCount}</p>
            <p className="text-xs text-gray-400 mt-1">Questions</p>
          </div>
          <div className="bg-gray-900/50 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-white">{selectedTime}</p>
            <p className="text-xs text-gray-400 mt-1">Minutes</p>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="mb-8">
          <p className="text-sm font-bold text-gray-300 mb-3">Exam Mode</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMode('full')}
              className={`p-4 rounded-xl border-2 text-left transition-all ${mode === 'full' ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'}`}
            >
              <i className={`fa-solid fa-expand text-lg mb-2 ${mode === 'full' ? 'text-orange-400' : 'text-gray-500'}`}></i>
              <p className="font-bold text-white text-sm">Full Exam</p>
              <p className="text-xs text-gray-400 mt-1">{fullCount} questions, {cert.examTimeLimitMinutes} min</p>
            </button>
            <button
              onClick={() => setMode('quick')}
              className={`p-4 rounded-xl border-2 text-left transition-all ${mode === 'quick' ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'}`}
            >
              <i className={`fa-solid fa-bolt text-lg mb-2 ${mode === 'quick' ? 'text-orange-400' : 'text-gray-500'}`}></i>
              <p className="font-bold text-white text-sm">Quick Practice</p>
              <p className="text-xs text-gray-400 mt-1">{quickCount} questions, {Math.ceil(cert.examTimeLimitMinutes / 3)} min</p>
            </button>
          </div>
        </div>

        {/* Rules */}
        <div className="bg-gray-900/50 p-4 rounded-xl mb-8">
          <p className="text-sm font-bold text-gray-300 mb-2"><i className="fa-solid fa-circle-info mr-2 text-blue-400"></i>Exam Rules</p>
          <ul className="text-xs text-gray-400 space-y-1.5">
            <li><i className="fa-solid fa-clock mr-2 text-gray-600"></i>Global countdown timer — the exam auto-submits when time runs out</li>
            <li><i className="fa-solid fa-flag mr-2 text-gray-600"></i>Flag questions for review and navigate freely between them</li>
            <li><i className="fa-solid fa-eye-slash mr-2 text-gray-600"></i>No immediate feedback — results shown only after submission</li>
            <li><i className="fa-solid fa-check-double mr-2 text-gray-600"></i>You need {cert.passingScore}% to pass</li>
          </ul>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={questions.length === 0}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-xl shadow-lg hover:scale-105 transform transition-transform text-lg disabled:opacity-50 disabled:hover:scale-100"
        >
          <i className="fa-solid fa-play mr-2"></i>Start Exam
        </button>
        {questions.length === 0 && (
          <p className="text-center text-red-400 text-xs mt-3">No exam questions available yet.</p>
        )}
      </div>
    </div>
  );
};

export default ExamSetupScreen;
