import React, { useState, useMemo, useEffect } from 'react';
import { Certification, Flashcard, FlashcardProgress } from '../types.ts';

interface FlashcardScreenProps {
  cert: Certification;
  flashcards: Flashcard[];
  progress: FlashcardProgress[];
  onUpdateProgress: (flashcardId: string, mastery: 'new' | 'learning' | 'mastered') => void;
  onExit: () => void;
}

const FlashcardScreen: React.FC<FlashcardScreenProps> = ({ cert, flashcards, progress, onUpdateProgress, onExit }) => {
  const [domainFilter, setDomainFilter] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const filteredCards = useMemo(() => {
    return domainFilter
      ? flashcards.filter(f => f.domainId === domainFilter)
      : flashcards;
  }, [flashcards, domainFilter]);

  const card = filteredCards[currentIndex];

  const getMastery = (flashcardId: string): 'new' | 'learning' | 'mastered' => {
    return progress.find(p => p.flashcard_id === flashcardId)?.mastery || 'new';
  };

  // Stats
  const totalCards = filteredCards.length;
  const masteredCount = filteredCards.filter(f => getMastery(f.id) === 'mastered').length;
  const learningCount = filteredCards.filter(f => getMastery(f.id) === 'learning').length;
  const newCount = totalCards - masteredCount - learningCount;
  const progressPercent = totalCards > 0 ? Math.round((masteredCount / totalCards) * 100) : 0;

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleGotIt = () => {
    if (!card) return;
    const current = getMastery(card.id);
    const next = current === 'new' ? 'learning' : 'mastered';
    onUpdateProgress(card.id, next);
    goNext();
  };

  const handleStillLearning = () => {
    if (!card) return;
    const current = getMastery(card.id);
    const next = current === 'mastered' ? 'learning' : current === 'learning' ? 'learning' : 'new';
    onUpdateProgress(card.id, next);
    goNext();
  };

  const goNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const goPrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  // Reset index on filter change
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [domainFilter]);

  const getDomainName = (domainId: string) => cert.domains.find(d => d.id === domainId)?.name || domainId;

  const masteryColor = (m: 'new' | 'learning' | 'mastered') => {
    if (m === 'mastered') return 'text-green-400';
    if (m === 'learning') return 'text-yellow-400';
    return 'text-gray-500';
  };

  const masteryIcon = (m: 'new' | 'learning' | 'mastered') => {
    if (m === 'mastered') return 'fa-circle-check';
    if (m === 'learning') return 'fa-spinner';
    return 'fa-circle';
  };

  const masteryLabel = (m: 'new' | 'learning' | 'mastered') => {
    if (m === 'mastered') return 'Mastered';
    if (m === 'learning') return 'Learning';
    return 'New';
  };

  if (filteredCards.length === 0) {
    return (
      <div className="py-8 animate-fade-in-up max-w-2xl mx-auto text-center">
        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
          <i className="fa-solid fa-clone text-4xl text-purple-400 mb-4"></i>
          <h2 className="text-2xl font-bold text-white mb-2">No Flashcards Available</h2>
          <p className="text-gray-400 mb-6">There are no flashcards for the selected filter.</p>
          <button onClick={onExit} className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transform transition-transform">
            Back to Cert Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 animate-fade-in-up max-w-2xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onExit} className="text-gray-400 hover:text-white text-sm transition-colors">
          <i className="fa-solid fa-arrow-left mr-2"></i>Exit Flashcards
        </button>
        <span className="text-sm text-gray-400">
          {currentIndex + 1} / {filteredCards.length}
        </span>
      </div>

      {/* Domain filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setDomainFilter(null)}
          className={`text-xs px-3 py-1.5 rounded-full transition-colors ${!domainFilter ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'}`}
        >
          All
        </button>
        {cert.domains.map(d => (
          <button
            key={d.id}
            onClick={() => setDomainFilter(d.id)}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${domainFilter === d.id ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'}`}
          >
            {d.name}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="bg-gray-800/80 backdrop-blur-md rounded-xl border border-white/10 p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-300 font-semibold">Mastery Progress</span>
          <span className="text-sm text-green-400 font-bold">{progressPercent}%</span>
        </div>
        <div className="h-3 bg-gray-700 rounded-full overflow-hidden flex">
          {masteredCount > 0 && (
            <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${(masteredCount / totalCards) * 100}%` }}></div>
          )}
          {learningCount > 0 && (
            <div className="h-full bg-yellow-500 transition-all duration-500" style={{ width: `${(learningCount / totalCards) * 100}%` }}></div>
          )}
        </div>
        <div className="flex gap-4 mt-2 text-xs">
          <span className="text-green-400"><i className="fa-solid fa-circle-check mr-1"></i>{masteredCount} Mastered</span>
          <span className="text-yellow-400"><i className="fa-solid fa-spinner mr-1"></i>{learningCount} Learning</span>
          <span className="text-gray-500"><i className="fa-solid fa-circle mr-1"></i>{newCount} New</span>
        </div>
      </div>

      {/* Flashcard */}
      {card && (
        <>
          <div
            onClick={handleFlip}
            className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 min-h-[250px] flex flex-col items-center justify-center cursor-pointer hover:border-purple-500/30 transition-all mb-4 select-none"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">{getDomainName(card.domainId)}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${getMastery(card.id) === 'mastered' ? 'bg-green-500/20 text-green-300' : getMastery(card.id) === 'learning' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-gray-700/80 text-gray-500'}`}>
                <i className={`fa-solid ${masteryIcon(getMastery(card.id))} mr-1`}></i>{masteryLabel(getMastery(card.id))}
              </span>
            </div>

            {!isFlipped ? (
              <div className="text-center">
                <i className="fa-solid fa-question-circle text-3xl text-purple-400 mb-4"></i>
                <p className="text-lg font-bold text-white">{card.front}</p>
                <p className="text-xs text-gray-500 mt-4"><i className="fa-solid fa-hand-pointer mr-1"></i>Tap to reveal answer</p>
              </div>
            ) : (
              <div className="text-center animate-fade-in-up">
                <i className="fa-solid fa-lightbulb text-3xl text-yellow-400 mb-4"></i>
                <p className="text-base text-gray-200 leading-relaxed">{card.back}</p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={goPrev}
              className="bg-gray-700/80 hover:bg-gray-600/80 text-white font-bold h-12 w-12 flex items-center justify-center rounded-xl shadow-md transition-colors"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            {isFlipped ? (
              <>
                <button
                  onClick={handleStillLearning}
                  className="flex-1 bg-gray-700/80 hover:bg-gray-600/80 text-yellow-400 font-bold py-3 rounded-xl shadow-md transition-colors text-sm"
                >
                  <i className="fa-solid fa-rotate-left mr-2"></i>Still Learning
                </button>
                <button
                  onClick={handleGotIt}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 transform transition-transform text-sm"
                >
                  <i className="fa-solid fa-check mr-2"></i>Got It!
                </button>
              </>
            ) : (
              <button
                onClick={handleFlip}
                className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 transform transition-transform text-sm"
              >
                <i className="fa-solid fa-rotate mr-2"></i>Flip Card
              </button>
            )}
            <button
              onClick={goNext}
              className="bg-gray-700/80 hover:bg-gray-600/80 text-white font-bold h-12 w-12 flex items-center justify-center rounded-xl shadow-md transition-colors"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FlashcardScreen;
