import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Certification, PremiumQuestion } from '../types.ts';
import { useAuth } from '../lib/AuthContext.tsx';
import { fetchStudyNotes, saveStudyNote } from '../lib/database.ts';
import Confetti from './Confetti.tsx';

interface StudyModeScreenProps {
  cert: Certification;
  questions: PremiumQuestion[];
  onExit: () => void;
}

const StudyModeScreen: React.FC<StudyModeScreenProps> = ({ cert, questions, onExit }) => {
  const { user } = useAuth();
  const [domainFilter, setDomainFilter] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  // Notes state
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [currentNote, setCurrentNote] = useState('');
  const [noteSaving, setNoteSaving] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  // Load all notes on mount
  useEffect(() => {
    if (user) {
      fetchStudyNotes(user.id).then(setNotes);
    }
  }, [user]);

  // Sync current note when question changes or notes load
  const syncNoteForQuestion = useCallback((questionText: string) => {
    setCurrentNote(notes[questionText] || '');
    setNoteSaved(false);
    setShowNotes(!!(notes[questionText]));
  }, [notes]);

  // Handle saving a note
  const handleSaveNote = async () => {
    if (!user || !question) return;
    setNoteSaving(true);
    await saveStudyNote(user.id, question.text, currentNote);
    setNotes(prev => {
      const updated = { ...prev };
      if (currentNote.trim()) {
        updated[question.text] = currentNote.trim();
      } else {
        delete updated[question.text];
      }
      return updated;
    });
    setNoteSaving(false);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

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

  // Sync note when current question changes (filter change, notes load)
  useEffect(() => {
    if (question) {
      setCurrentNote(notes[question.text] || '');
      setShowNotes(!!(notes[question.text]));
    }
  }, [question?.text, notes]);

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
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedOption(null);
      setShowAnswer(false);
      syncNoteForQuestion(filteredQuestions[nextIndex].text);
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

        {/* Personal Notes */}
        {showAnswer && (
          <div className="mb-4">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors mb-2"
            >
              <i className={`fa-solid ${showNotes ? 'fa-chevron-down' : 'fa-chevron-right'} mr-1`}></i>
              <i className="fa-solid fa-sticky-note mr-1"></i>
              {notes[question.text] ? 'View/Edit Notes' : 'Add Notes'}
            </button>
            {showNotes && (
              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4 animate-fade-in-up">
                <textarea
                  value={currentNote}
                  onChange={(e) => { setCurrentNote(e.target.value); setNoteSaved(false); }}
                  placeholder="Write your personal notes for this question..."
                  className="w-full bg-gray-900/60 border border-gray-700 rounded-lg p-3 text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent h-24 resize-none"
                  maxLength={1000}
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-600">{currentNote.length}/1000</p>
                  <div className="flex items-center gap-2">
                    {noteSaved && (
                      <span className="text-xs text-green-400 animate-fade-in-up">
                        <i className="fa-solid fa-check mr-1"></i>Saved
                      </span>
                    )}
                    <button
                      onClick={handleSaveNote}
                      disabled={noteSaving}
                      className="text-xs px-3 py-1.5 bg-yellow-500/20 text-yellow-300 rounded-lg hover:bg-yellow-500/30 transition-colors disabled:opacity-50"
                    >
                      {noteSaving ? (
                        <><i className="fa-solid fa-spinner fa-spin mr-1"></i>Saving...</>
                      ) : (
                        <><i className="fa-solid fa-floppy-disk mr-1"></i>Save Note</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
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
