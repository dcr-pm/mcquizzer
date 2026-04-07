import React, { useState, useCallback } from 'react';
import { LearningPath, LearningSlide } from '../types.ts';

interface LearningPathScreenProps {
  path: LearningPath;
  onExit: () => void;
}

const LearningPathScreen: React.FC<LearningPathScreenProps> = ({ path, onExit }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completedSlides, setCompletedSlides] = useState<Set<number>>(new Set());
  const [showChapterNav, setShowChapterNav] = useState(false);

  const slide = path.slides[currentSlide];
  const totalSlides = path.slides.length;
  const progressPercent = Math.round(((completedSlides.size) / totalSlides) * 100);

  const markComplete = useCallback((idx: number) => {
    setCompletedSlides(prev => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  }, []);

  const handleNext = () => {
    markComplete(currentSlide);
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleAnswer = (idx: number) => {
    if (showExplanation) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
    markComplete(currentSlide);
  };

  const handleJumpToChapter = (chapterIndex: number) => {
    const slideIdx = path.slides.findIndex(s => s.chapter === chapterIndex + 1);
    if (slideIdx >= 0) {
      setCurrentSlide(slideIdx);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowChapterNav(false);
    }
  };

  const currentChapter = slide.chapter;
  const chapterSlides = path.slides.filter(s => s.chapter === currentChapter);
  const slideInChapter = chapterSlides.indexOf(slide) + 1;

  const canGoNext = slide.type === 'question' ? showExplanation : true;

  const renderSlideContent = (s: LearningSlide) => {
    switch (s.type) {
      case 'context':
        return (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
                <i className="fa-solid fa-book-open mr-1"></i>Scenario
              </span>
            </div>
            <div className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {s.content}
            </div>
          </div>
        );

      case 'teach':
        return (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
                <i className="fa-solid fa-lightbulb mr-1"></i>Learn
              </span>
            </div>
            <div className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {s.content}
            </div>
          </div>
        );

      case 'question':
        return (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                <i className="fa-solid fa-circle-question mr-1"></i>Question
              </span>
            </div>
            <p className="text-white text-sm sm:text-base font-semibold mb-5 leading-relaxed">{s.question}</p>
            <div className="space-y-3">
              {s.options?.map((opt, i) => {
                let classes = 'w-full text-left p-4 rounded-xl border transition-all text-sm leading-relaxed ';
                if (showExplanation) {
                  if (i === s.correct) {
                    classes += 'bg-green-500/20 border-green-500/50 text-green-200';
                  } else if (i === selectedAnswer) {
                    classes += 'bg-red-500/20 border-red-500/50 text-red-300';
                  } else {
                    classes += 'bg-gray-800/50 border-gray-700/50 text-gray-500';
                  }
                } else if (selectedAnswer === i) {
                  classes += 'bg-blue-500/20 border-blue-500/50 text-white';
                } else {
                  classes += 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-500/50 hover:bg-gray-700/50';
                }
                return (
                  <button key={i} onClick={() => handleAnswer(i)} className={classes} disabled={showExplanation}>
                    <span className="font-bold mr-2 text-gray-500">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                );
              })}
            </div>
            {showExplanation && (
              <div className={`mt-5 p-4 rounded-xl border ${selectedAnswer === s.correct ? 'bg-green-500/10 border-green-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
                <p className={`text-sm font-bold mb-1 ${selectedAnswer === s.correct ? 'text-green-400' : 'text-amber-400'}`}>
                  <i className={`fa-solid ${selectedAnswer === s.correct ? 'fa-circle-check' : 'fa-triangle-exclamation'} mr-1`}></i>
                  {selectedAnswer === s.correct ? 'Correct!' : 'Not quite.'}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">{s.explanation}</p>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="py-6 sm:py-8 animate-fade-in-up max-w-3xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onExit} className="text-gray-400 hover:text-white text-sm transition-colors">
          <i className="fa-solid fa-arrow-left mr-2"></i>Back to Cert Hub
        </button>
        <button
          onClick={() => setShowChapterNav(!showChapterNav)}
          className="text-gray-400 hover:text-white text-sm transition-colors sm:hidden"
        >
          <i className="fa-solid fa-bars mr-1"></i>Chapters
        </button>
      </div>

      {/* Path title */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${path.gradient} flex items-center justify-center flex-shrink-0`}>
          <i className={`fa-solid ${path.icon} text-white`}></i>
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">{path.title}</h1>
          <p className="text-gray-400 text-xs">{path.company}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Slide {currentSlide + 1} of {totalSlides}</span>
          <span>{progressPercent}% complete</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Chapter sidebar - desktop */}
        <div className="hidden sm:block w-56 flex-shrink-0">
          <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-white/10 p-4 sticky top-24">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Chapters</p>
            <div className="space-y-1">
              {path.chapters.map((ch, i) => {
                const chapterNum = i + 1;
                const chSlides = path.slides.filter(s => s.chapter === chapterNum);
                const chCompleted = chSlides.filter((_, si) => {
                  const globalIdx = path.slides.indexOf(chSlides[si]);
                  return completedSlides.has(globalIdx);
                }).length;
                const isActive = currentChapter === chapterNum;
                return (
                  <button
                    key={i}
                    onClick={() => handleJumpToChapter(i)}
                    className={`w-full text-left text-xs p-2 rounded-lg transition-colors flex items-center gap-2 ${isActive ? 'bg-blue-500/20 text-blue-300' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                  >
                    <i className={`fa-solid ${ch.icon} w-4 text-center`}></i>
                    <span className="flex-1 truncate">{ch.title}</span>
                    <span className="text-[10px] text-gray-500">{chCompleted}/{chSlides.length}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile chapter nav dropdown */}
        {showChapterNav && (
          <div className="fixed inset-0 z-50 sm:hidden" onClick={() => setShowChapterNav(false)}>
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute top-20 left-4 right-4 bg-gray-800 rounded-2xl border border-white/10 p-4 animate-fade-in-up" onClick={e => e.stopPropagation()}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Chapters</p>
              <div className="space-y-1">
                {path.chapters.map((ch, i) => {
                  const isActive = currentChapter === i + 1;
                  return (
                    <button
                      key={i}
                      onClick={() => handleJumpToChapter(i)}
                      className={`w-full text-left text-sm p-3 rounded-lg transition-colors flex items-center gap-2 ${isActive ? 'bg-blue-500/20 text-blue-300' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                    >
                      <i className={`fa-solid ${ch.icon} w-5 text-center`}></i>
                      <span>{ch.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Chapter badge */}
          <div className="mb-3">
            <span className="text-xs text-gray-500">
              <i className={`fa-solid ${path.chapters[currentChapter - 1]?.icon} mr-1`}></i>
              Chapter {currentChapter}: {path.chapters[currentChapter - 1]?.title}
              <span className="mx-1">&middot;</span>
              {slideInChapter} of {chapterSlides.length}
            </span>
          </div>

          {/* Slide card */}
          <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8 mb-6">
            <h2 className="text-xl font-bold text-white mb-5">{slide.title}</h2>
            {renderSlideContent(slide)}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-gray-700 text-white text-sm font-bold rounded-xl hover:bg-gray-600 transition-colors disabled:opacity-30 disabled:hover:bg-gray-700"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i>Previous
            </button>

            {currentSlide < totalSlides - 1 ? (
              <button
                onClick={handleNext}
                disabled={!canGoNext}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-bold rounded-xl hover:scale-105 transition-all disabled:opacity-30 disabled:hover:scale-100"
              >
                Next<i className="fa-solid fa-arrow-right ml-2"></i>
              </button>
            ) : (
              <button
                onClick={() => { markComplete(currentSlide); onExit(); }}
                disabled={slide.type === 'question' && !showExplanation}
                className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold rounded-xl hover:scale-105 transition-all disabled:opacity-30 disabled:hover:scale-100"
              >
                <i className="fa-solid fa-check mr-2"></i>Finish Path
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPathScreen;
