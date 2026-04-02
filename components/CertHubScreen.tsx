import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext.tsx';
import { fetchExamHistory } from '../lib/database.ts';
import { Certification, ExamResult } from '../types.ts';

interface CertHubScreenProps {
  cert: Certification;
  onStudyMode: () => void;
  onFlashcards: () => void;
  onPracticeExam: () => void;
  onBack: () => void;
}

const CertHubScreen: React.FC<CertHubScreenProps> = ({ cert, onStudyMode, onFlashcards, onPracticeExam, onBack }) => {
  const { user } = useAuth();
  const [examHistory, setExamHistory] = useState<ExamResult[]>([]);

  useEffect(() => {
    if (user) {
      fetchExamHistory(user.id, cert.id, 5).then(setExamHistory);
    }
  }, [user, cert.id]);

  const bestScore = examHistory.length > 0
    ? Math.max(...examHistory.map(e => e.scorePercent))
    : null;

  const cards = [
    { key: 'study', icon: 'fa-book-open', title: 'Study Mode', desc: 'Learn at your own pace with untimed quizzes', color: 'from-blue-500 to-blue-600', onClick: onStudyMode },
    { key: 'flash', icon: 'fa-clone', title: 'Flashcards', desc: 'Review key concepts and track your mastery', color: 'from-purple-500 to-purple-600', onClick: onFlashcards },
    { key: 'exam', icon: 'fa-file-circle-check', title: 'Practice Exam', desc: `${cert.examQuestionCount} questions, ${cert.examTimeLimitMinutes} min, ${cert.passingScore}% to pass`, color: 'from-orange-500 to-red-500', onClick: onPracticeExam },
  ];

  return (
    <div className="py-6 sm:py-8 animate-fade-in-up max-w-3xl mx-auto">
      <button onClick={onBack} className="text-gray-400 hover:text-white text-sm mb-6 transition-colors">
        <i className="fa-solid fa-arrow-left mr-2"></i>Back to Dashboard
      </button>

      {/* Cert Header */}
      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${cert.gradient} flex items-center justify-center flex-shrink-0`}>
            <i className={`fa-solid ${cert.icon} text-2xl text-white`}></i>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">{cert.name}</h1>
            <p className="text-gray-400 text-sm">{cert.description}</p>
          </div>
        </div>
        {bestScore !== null && (
          <div className="mt-4 bg-gray-900/50 p-3 rounded-lg flex items-center gap-3">
            <i className={`fa-solid fa-trophy ${bestScore >= cert.passingScore ? 'text-green-400' : 'text-yellow-400'}`}></i>
            <span className="text-sm text-gray-300">Best exam score: <strong className={bestScore >= cert.passingScore ? 'text-green-400' : 'text-yellow-400'}>{bestScore}%</strong></span>
            {bestScore >= cert.passingScore && <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">Passing</span>}
          </div>
        )}
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {cards.map(card => (
          <button
            key={card.key}
            onClick={card.onClick}
            className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 text-left hover:border-white/25 hover:scale-[1.02] transition-all"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}>
              <i className={`fa-solid ${card.icon} text-xl text-white`}></i>
            </div>
            <h3 className="font-bold text-white mb-1">{card.title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed">{card.desc}</p>
          </button>
        ))}
      </div>

      {/* Domains */}
      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 mb-6">
        <h3 className="text-lg font-bold text-white mb-4"><i className="fa-solid fa-layer-group mr-2 text-blue-400"></i>Exam Domains</h3>
        <div className="space-y-3">
          {cert.domains.map(domain => (
            <div key={domain.id} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{domain.name}</span>
                  <span className="text-gray-500">{domain.weight}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-teal-400 rounded-full" style={{ width: `${domain.weight}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Exams */}
      {examHistory.length > 0 && (
        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6">
          <h3 className="text-lg font-bold text-white mb-4"><i className="fa-solid fa-clock-rotate-left mr-2 text-blue-400"></i>Recent Exams</h3>
          <div className="space-y-2">
            {examHistory.map((exam, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-900/50 p-3 rounded-lg">
                <i className={`fa-solid ${exam.passed ? 'fa-circle-check text-green-400' : 'fa-circle-xmark text-red-400'}`}></i>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{exam.passed ? 'Passed' : 'Not Passed'} — {exam.scorePercent}%</p>
                  <p className="text-xs text-gray-400">{exam.correctAnswers}/{exam.totalQuestions} correct</p>
                </div>
                <span className="text-xs text-gray-500">{new Date(exam.completedAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CertHubScreen;
