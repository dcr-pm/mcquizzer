import React, { useState, useMemo } from 'react';
import { Certification, PremiumQuestion } from '../types.ts';
import Confetti from './Confetti.tsx';

interface StudyModeScreenProps {
  cert: Certification;
  questions: PremiumQuestion[];
  onExit: () => void;
}

const StudyModeScreen: React.FC<StudyModeScreenProps> = ({ cert, questions, onExit }) => {
  const [domainFilter, setDomainFilter] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  const filteredQuestions = useMemo(() => {
    const filtered = domainFilter
      ? questions.filter(q => q.domainId === domainFilter)
      : questions;
    // Shuffle
    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [questions, domainFilter]);

  const question = filteredQuestions[currentIndex];

  if (!question || filteredQuestions.length === 0) {
    return (
      <div className="py-8 animate-fade-in-up max-w-2xl mx-auto text-center">
        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
          <i className="fa-solid fa-book-open text-4xl text-blue-400 mb-4"></i>
          <h2 className="text-2xl font-bold text-white mb-2">
            {filteredQuestions.length === 0 ? 'No Questions Available' : 'Study Complete!'}
          </h2>
          {stats.total > 0 && (
            <p className="text-gray-400 mb-6">You got {stats.correct} out of {stats.total} correct ({Math.round((stats.correct / stats.total) * 100)}%)</p>
          )}
          <button onClick={onExit} className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transform transition-transform">
            Back to Cert Hub
          </button>
        </div>
      </div>
    );
  }

  const handleSelectOption = (index: number) => {
    if (showAnswer) return;
    setSelectedOption(index);
    setShowAnswer(true);
    const isCorrect = index === question.correct;
    setStats(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setStats(s => ({ ...s, total: s.total + 1 }));
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      setCurrentIndex(filteredQuestions.length); // triggers complete screen
    }
  };

  const getOptionClass = (index: number) => {
    const base = 'w-full text-left p-3 sm:p-4 rounded-xl border transition-all duration-200';
    if (!showAnswer) return `${base} bg-gray-700/80 border-gray-600 hover:bg-gray-600/80 hover:border-gray-500`;
    if (index === question.correct) return `${base} bg-green-500/80 border-green-400 ring-2 ring-green-300`;
    if (index === selectedOption) return `${base} bg-red-500/80 border-red-400 ring-2 ring-red-300`;
    return `${base} bg-gray-700/80 border-gray-600 opacity-60`;
  };

  const getDomainName = (domainId: string) => cert.domains.find(d => d.id === domainId)?.name || domainId;

  return (
    <div className="py-6 animate-fade-in-up max-w-2xl mx-auto">
      {showConfetti && <Confetti />}

      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onExit} className="text-gray-400 hover:text-white text-sm transition-colors">
          <i className="fa-solid fa-arrow-left mr-2"></i>Exit Study
        </button>
        <span className="text-sm text-gray-400">
          {currentIndex + 1} / {filteredQuestions.length} | {stats.correct}/{stats.total} correct
        </span>
      </div>

      {/* Domain filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => { setDomainFilter(null); setCurrentIndex(0); setSelectedOption(null); setShowAnswer(false); }}
          className={`text-xs px-3 py-1.5 rounded-full transition-colors ${!domainFilter ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'}`}
        >
          All
        </button>
        {cert.domains.map(d => (
          <button
            key={d.id}
            onClick={() => { setDomainFilter(d.id); setCurrentIndex(0); setSelectedOption(null); setShowAnswer(false); setStats({ correct: 0, total: 0 }); }}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${domainFilter === d.id ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'}`}
          >
            {d.name}
          </button>
        ))}
      </div>

      {/* Question card */}
      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6">
        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">{getDomainName(question.domainId)}</span>
        <h3 className="text-lg font-bold text-white mt-3 mb-6">{question.text}</h3>

        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <button key={index} onClick={() => handleSelectOption(index)} className={getOptionClass(index)} disabled={showAnswer}>
              <span className="text-white text-sm">{option}</span>
            </button>
          ))}
        </div>

        {!showAnswer && (
          <button onClick={handleShowAnswer} className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
            <i className="fa-solid fa-eye mr-1"></i> Show Answer
          </button>
        )}

        {showAnswer && (
          <div className="bg-gray-900/50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-300"><i className="fa-solid fa-lightbulb text-yellow-400 mr-2"></i>{question.explanation}</p>
          </div>
        )}

        {showAnswer && (
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 rounded-lg shadow-lg hover:scale-105 transform transition-transform"
          >
            {currentIndex < filteredQuestions.length - 1 ? 'Next Question' : 'Finish Study Session'}
          </button>
        )}
      </div>
    </div>
  );
};

export default StudyModeScreen;
