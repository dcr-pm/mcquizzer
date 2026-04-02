import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PremiumQuestion, ExamState } from '../types.ts';

interface ExamPlayingScreenProps {
  examState: ExamState;
  onUpdateExamState: (updater: (prev: ExamState) => ExamState) => void;
  onSubmit: () => void;
}

const ExamPlayingScreen: React.FC<ExamPlayingScreenProps> = ({ examState, onUpdateExamState, onSubmit }) => {
  const [showNavPanel, setShowNavPanel] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const autoSubmittedRef = useRef(false);

  const { questions, answers, flagged, currentIndex, startTime, timeLimitSeconds } = examState;
  const question = questions[currentIndex];

  // Timer
  const [timeLeft, setTimeLeft] = useState(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    return Math.max(0, timeLimitSeconds - elapsed);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, timeLimitSeconds - elapsed);
      setTimeLeft(remaining);
      if (remaining <= 0 && !autoSubmittedRef.current) {
        autoSubmittedRef.current = true;
        clearInterval(interval);
        onSubmit();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, timeLimitSeconds, onSubmit]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const timerColor = timeLeft <= 60 ? 'text-red-400' : timeLeft <= 300 ? 'text-yellow-400' : 'text-green-400';

  const handleSelectOption = (index: number) => {
    onUpdateExamState(prev => {
      const newAnswers = new Map(prev.answers);
      newAnswers.set(currentIndex, index);
      return { ...prev, answers: newAnswers };
    });
  };

  const handleToggleFlag = () => {
    onUpdateExamState(prev => {
      const newFlagged = new Set(prev.flagged);
      if (newFlagged.has(currentIndex)) {
        newFlagged.delete(currentIndex);
      } else {
        newFlagged.add(currentIndex);
      }
      return { ...prev, flagged: newFlagged };
    });
  };

  const handleGoTo = (index: number) => {
    onUpdateExamState(prev => ({ ...prev, currentIndex: index }));
    setShowNavPanel(false);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onUpdateExamState(prev => ({ ...prev, currentIndex: prev.currentIndex - 1 }));
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      onUpdateExamState(prev => ({ ...prev, currentIndex: prev.currentIndex + 1 }));
    }
  };

  const handleSubmitClick = () => {
    const unanswered = questions.length - answers.size;
    if (unanswered > 0) {
      setShowSubmitConfirm(true);
    } else {
      onSubmit();
    }
  };

  const answeredCount = answers.size;
  const flaggedCount = flagged.size;
  const selectedOption = answers.get(currentIndex) ?? null;
  const isFlagged = flagged.has(currentIndex);

  const getNavButtonClass = (index: number) => {
    const base = 'w-9 h-9 rounded-lg text-xs font-bold transition-all flex items-center justify-center';
    const isActive = index === currentIndex;
    const isAnswered = answers.has(index);
    const isFl = flagged.has(index);

    if (isActive) return `${base} ring-2 ring-blue-400 bg-blue-500 text-white`;
    if (isFl && isAnswered) return `${base} bg-yellow-500/30 text-yellow-300 border border-yellow-500/50`;
    if (isFl) return `${base} bg-yellow-500/20 text-yellow-400 border border-yellow-500/30`;
    if (isAnswered) return `${base} bg-green-500/20 text-green-400 border border-green-500/30`;
    return `${base} bg-gray-700/80 text-gray-500 border border-gray-600`;
  };

  return (
    <div className="py-4 animate-fade-in-up max-w-2xl mx-auto">
      {/* Top bar with timer */}
      <div className="bg-gray-800/80 backdrop-blur-md rounded-xl border border-white/10 p-3 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`font-mono text-lg font-bold ${timerColor}`}>
            <i className="fa-solid fa-clock mr-1"></i>{formatTime(timeLeft)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full">{answeredCount}/{questions.length}</span>
          {flaggedCount > 0 && (
            <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
              <i className="fa-solid fa-flag mr-1"></i>{flaggedCount}
            </span>
          )}
          <button
            onClick={() => setShowNavPanel(!showNavPanel)}
            className="bg-gray-700/80 hover:bg-gray-600/80 text-white px-3 py-1.5 rounded-full transition-colors"
          >
            <i className="fa-solid fa-grip mr-1"></i>Nav
          </button>
        </div>
      </div>

      {/* Question Navigation Panel */}
      {showNavPanel && (
        <div className="bg-gray-800/80 backdrop-blur-md rounded-xl border border-white/20 p-4 mb-4 animate-fade-in-up">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-white">Question Navigator</span>
            <button onClick={() => setShowNavPanel(false)} className="text-gray-400 hover:text-white">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {questions.map((_, i) => (
              <button key={i} onClick={() => handleGoTo(i)} className={getNavButtonClass(i)}>
                {i + 1}
              </button>
            ))}
          </div>
          <div className="flex gap-4 mt-3 text-xs">
            <span className="text-green-400"><i className="fa-solid fa-circle text-[8px] mr-1"></i>Answered</span>
            <span className="text-yellow-400"><i className="fa-solid fa-flag text-[8px] mr-1"></i>Flagged</span>
            <span className="text-gray-500"><i className="fa-solid fa-circle text-[8px] mr-1"></i>Unanswered</span>
          </div>
        </div>
      )}

      {/* Question card */}
      {question && (
        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">Question {currentIndex + 1} of {questions.length}</span>
            <button
              onClick={handleToggleFlag}
              className={`text-sm px-3 py-1.5 rounded-full transition-colors ${isFlagged ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-700/80 text-gray-500 hover:text-yellow-400'}`}
            >
              <i className={`fa-solid fa-flag mr-1`}></i>{isFlagged ? 'Flagged' : 'Flag'}
            </button>
          </div>

          <h3 className="text-lg font-bold text-white mb-6">{question.text}</h3>

          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const base = 'w-full text-left p-3 sm:p-4 rounded-xl border transition-all duration-200';
              const cls = isSelected
                ? `${base} bg-blue-500/20 border-blue-400 ring-2 ring-blue-300`
                : `${base} bg-gray-700/80 border-gray-600 hover:bg-gray-600/80 hover:border-gray-500`;
              return (
                <button key={index} onClick={() => handleSelectOption(index)} className={cls}>
                  <span className="text-white text-sm">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="bg-gray-700/80 hover:bg-gray-600/80 text-white font-bold py-3 px-5 rounded-xl shadow-md transition-colors disabled:opacity-30 disabled:hover:bg-gray-700/80"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              onClick={currentIndex < questions.length - 1 ? handleNext : handleSubmitClick}
              className={`flex-1 font-bold py-3 rounded-xl shadow-lg hover:scale-105 transform transition-transform text-white ${
                currentIndex < questions.length - 1
                  ? 'bg-gradient-to-r from-blue-500 to-teal-400'
                  : 'bg-gradient-to-r from-orange-500 to-red-500'
              }`}
            >
              {currentIndex < questions.length - 1 ? (
                <>Next<i className="fa-solid fa-chevron-right ml-2"></i></>
              ) : (
                <><i className="fa-solid fa-paper-plane mr-2"></i>Submit Exam</>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Submit at any time */}
      {currentIndex < questions.length - 1 && (
        <button
          onClick={handleSubmitClick}
          className="w-full mt-4 text-gray-500 hover:text-orange-400 text-sm transition-colors"
        >
          <i className="fa-solid fa-paper-plane mr-1"></i>Submit Exam Early
        </button>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl border border-white/20 p-6 max-w-sm w-full animate-fade-in-up">
            <div className="text-center">
              <i className="fa-solid fa-triangle-exclamation text-3xl text-yellow-400 mb-3"></i>
              <h3 className="text-lg font-bold text-white mb-2">Submit Exam?</h3>
              <p className="text-sm text-gray-400 mb-6">
                You have <strong className="text-yellow-400">{questions.length - answeredCount}</strong> unanswered question{questions.length - answeredCount !== 1 ? 's' : ''}.
                Unanswered questions will be marked as incorrect.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  Go Back
                </button>
                <button
                  onClick={() => { setShowSubmitConfirm(false); onSubmit(); }}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 transform transition-transform"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPlayingScreen;
