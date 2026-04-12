import React, { useState, useEffect } from 'react';

interface LandingQuestion {
  text: string;
  options: string[];
  correct: number;
  fact: string;
}

const LANDING_QUESTIONS: LandingQuestion[] = [
  {
    text: 'What does API stand for in Salesforce?',
    options: ['Application Programming Interface', 'Automated Process Integration', 'Application Process Identifier', 'Advanced Platform Interface'],
    correct: 0,
    fact: 'Salesforce offers REST, SOAP, Bulk, and Streaming APIs for integration.',
  },
  {
    text: 'Which Salesforce cloud is used for managing customer support cases?',
    options: ['Sales Cloud', 'Marketing Cloud', 'Service Cloud', 'Commerce Cloud'],
    correct: 2,
    fact: 'Service Cloud handles cases, knowledge articles, and omni-channel support.',
  },
  {
    text: 'What is a "Governor Limit" in Salesforce?',
    options: ['A user permission level', 'A runtime enforcement to prevent resource abuse', 'A type of data validation rule', 'A security access control'],
    correct: 1,
    fact: 'Governor limits prevent any single tenant from monopolizing shared resources.',
  },
  {
    text: 'Which object in Salesforce tracks potential revenue?',
    options: ['Lead', 'Account', 'Opportunity', 'Contact'],
    correct: 2,
    fact: 'Opportunities represent deals in your pipeline with amounts and close dates.',
  },
  {
    text: 'What language is used for Salesforce server-side logic?',
    options: ['JavaScript', 'Python', 'Apex', 'Java'],
    correct: 2,
    fact: 'Apex is a strongly-typed, object-oriented language similar to Java.',
  },
];

const LandingQuiz: React.FC<{ onSignUp: () => void }> = ({ onSignUp }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<'intro' | 'playing' | 'reveal' | 'complete'>('intro');
  const [streak, setStreak] = useState(0);
  const [animateIn, setAnimateIn] = useState(true);
  const [pulseScore, setPulseScore] = useState(false);
  const [introStep, setIntroStep] = useState(0);

  // Intro animation: typewriter-like reveal
  useEffect(() => {
    if (phase !== 'intro') return;
    const timers = [
      setTimeout(() => setIntroStep(1), 400),
      setTimeout(() => setIntroStep(2), 1200),
      setTimeout(() => setIntroStep(3), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  const question = LANDING_QUESTIONS[currentIndex];
  const totalQuestions = 3; // Only show 3 to keep it tight

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const isCorrect = index === question.correct;
    if (isCorrect) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
      setPulseScore(true);
      setTimeout(() => setPulseScore(false), 600);
    } else {
      setStreak(0);
    }
    setPhase('reveal');
  };

  const handleNext = () => {
    if (currentIndex + 1 >= totalQuestions) {
      setPhase('complete');
      return;
    }
    setAnimateIn(false);
    setTimeout(() => {
      setCurrentIndex(i => i + 1);
      setSelected(null);
      setPhase('playing');
      setAnimateIn(true);
    }, 200);
  };

  const handleStart = () => {
    setPhase('playing');
    setAnimateIn(true);
  };

  const getOptionClass = (index: number) => {
    const base = 'w-full text-left p-3 rounded-xl border transition-all duration-300 cursor-pointer';
    if (selected === null) return `${base} bg-gray-700/60 border-gray-600/50 hover:bg-gray-600/60 hover:border-blue-400/40 hover:scale-[1.02]`;
    if (index === question.correct) return `${base} bg-green-500/20 border-green-400 scale-[1.02]`;
    if (index === selected) return `${base} bg-red-500/20 border-red-400 opacity-80`;
    return `${base} bg-gray-700/40 border-gray-700 opacity-40`;
  };

  const getOptionIcon = (index: number) => {
    if (selected === null) return String.fromCharCode(65 + index);
    if (index === question.correct) return '\u2713';
    if (index === selected) return '\u2717';
    return String.fromCharCode(65 + index);
  };

  // Intro state
  if (phase === 'intro') {
    return (
      <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8 max-w-lg mx-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 pointer-events-none"></div>
        <div className="relative text-center">
          <div className={`transition-all duration-500 ${introStep >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
              <i className="fa-solid fa-bolt text-2xl text-white"></i>
            </div>
          </div>
          <div className={`transition-all duration-500 delay-100 ${introStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className="text-xl font-bold text-white mb-1">Think you know Salesforce?</h3>
            <p className="text-gray-400 text-sm">3 questions. 30 seconds. No sign-up needed.</p>
          </div>
          <div className={`transition-all duration-500 delay-200 ${introStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex justify-center gap-6 my-5 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-400">3</p>
                <p className="text-xs text-gray-500">Questions</p>
              </div>
              <div className="w-px bg-gray-700"></div>
              <div>
                <p className="text-2xl font-bold text-teal-400"><i className="fa-solid fa-bolt text-lg"></i></p>
                <p className="text-xs text-gray-500">Instant Results</p>
              </div>
              <div className="w-px bg-gray-700"></div>
              <div>
                <p className="text-2xl font-bold text-yellow-400"><i className="fa-solid fa-trophy text-lg"></i></p>
                <p className="text-xs text-gray-500">Beat Your Score</p>
              </div>
            </div>
          </div>
          <div className={`transition-all duration-500 delay-300 ${introStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-500/25 hover:scale-105 transform transition-transform text-base"
            >
              <i className="fa-solid fa-play mr-2"></i>Let's Go
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Complete state
  if (phase === 'complete') {
    const percent = Math.round((score / totalQuestions) * 100);
    const message = score === totalQuestions ? 'Perfect score!' : score >= 2 ? 'Nice work!' : score >= 1 ? 'Good start!' : 'Keep learning!';
    const emoji = score === totalQuestions ? 'fa-crown' : score >= 2 ? 'fa-fire' : 'fa-seedling';
    const emojiColor = score === totalQuestions ? 'text-yellow-400' : score >= 2 ? 'text-orange-400' : 'text-green-400';

    return (
      <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8 max-w-lg mx-auto relative overflow-hidden animate-fade-in-up">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 pointer-events-none"></div>
        <div className="relative text-center">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${score === totalQuestions ? 'from-yellow-500 to-orange-500' : 'from-blue-500 to-teal-400'} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
            <i className={`fa-solid ${emoji} text-2xl text-white`}></i>
          </div>
          <p className={`text-sm font-bold ${emojiColor} mb-1`}>{message}</p>
          <h3 className="text-3xl font-extrabold text-white mb-1">{score}/{totalQuestions}</h3>
          <p className="text-gray-400 text-sm mb-6">{percent}% correct</p>

          {/* Score bar */}
          <div className="w-full bg-gray-700/50 rounded-full h-2 mb-6 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${score === totalQuestions ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 'bg-gradient-to-r from-blue-500 to-teal-400'}`}
              style={{ width: `${percent}%` }}
            ></div>
          </div>

          <p className="text-gray-400 text-sm mb-5">
            {score === totalQuestions
              ? 'You clearly know your stuff. Imagine what you could do with 335+ practice questions and full exam simulations.'
              : `There are 335+ questions across 2 certifications waiting for you. Study mode, practice exams, flashcards, and guided learning paths.`}
          </p>

          <button
            onClick={onSignUp}
            className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 hover:scale-105 transform transition-transform text-base mb-3"
          >
            <i className="fa-solid fa-rocket mr-2"></i>Unlock Full Access - Free
          </button>
          <button
            onClick={() => { setCurrentIndex(0); setSelected(null); setScore(0); setStreak(0); setPhase('playing'); setAnimateIn(true); }}
            className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
          >
            <i className="fa-solid fa-rotate-right mr-1"></i>Try again
          </button>
        </div>
      </div>
    );
  }

  // Playing / Reveal states
  return (
    <div className={`bg-gray-800/60 backdrop-blur-md rounded-2xl border border-white/10 p-5 sm:p-6 max-w-lg mx-auto relative overflow-hidden transition-all duration-300 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 pointer-events-none"></div>
      <div className="relative">
        {/* Progress & Score */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <div
                key={i}
                className={`w-8 h-1.5 rounded-full transition-all duration-300 ${
                  i < currentIndex ? 'bg-blue-400' : i === currentIndex ? 'bg-gradient-to-r from-blue-500 to-teal-400' : 'bg-gray-700'
                }`}
              ></div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {streak >= 2 && (
              <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full animate-fade-in-up">
                <i className="fa-solid fa-fire mr-1"></i>{streak} streak
              </span>
            )}
            <span className={`text-sm font-bold transition-all duration-300 ${pulseScore ? 'text-green-400 scale-125' : 'text-gray-400 scale-100'}`}>
              {score}/{currentIndex + (phase === 'reveal' ? 1 : 0)}
            </span>
          </div>
        </div>

        {/* Question */}
        <p className="text-sm text-blue-400 font-medium mb-1">Question {currentIndex + 1} of {totalQuestions}</p>
        <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">{question.text}</h3>

        {/* Options */}
        <div className="space-y-2 mb-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={selected !== null}
              className={getOptionClass(index)}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300 ${
                  selected === null ? 'bg-gray-600/50 text-gray-300' :
                  index === question.correct ? 'bg-green-500 text-white' :
                  index === selected ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-500'
                }`}>
                  {getOptionIcon(index)}
                </span>
                <span className="text-sm text-white">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Reveal: fun fact + next */}
        {phase === 'reveal' && (
          <div className="animate-fade-in-up">
            <div className={`p-3 rounded-xl mb-3 ${selected === question.correct ? 'bg-green-500/10 border border-green-500/20' : 'bg-blue-500/10 border border-blue-500/20'}`}>
              <p className="text-xs text-gray-300">
                <i className={`fa-solid ${selected === question.correct ? 'fa-lightbulb text-yellow-400' : 'fa-book-open text-blue-400'} mr-1.5`}></i>
                {question.fact}
              </p>
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-2.5 rounded-xl shadow-lg hover:scale-[1.02] transform transition-transform text-sm"
            >
              {currentIndex + 1 < totalQuestions ? (
                <>Next Question <i className="fa-solid fa-chevron-right ml-1"></i></>
              ) : (
                <>See Your Results <i className="fa-solid fa-chart-simple ml-1"></i></>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingQuiz;
