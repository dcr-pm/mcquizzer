import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext.tsx';
import { fetchQuizHistory } from '../lib/database.ts';
import { QuizHistoryEntry } from '../types.ts';
import { PRIZES, CATEGORIES } from '../constants.ts';

interface DashboardScreenProps {
  onStartQuiz: () => void;
  onShowLeaderboard: () => void;
  onEditProfile: () => void;
  onCertPrep: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ onStartQuiz, onShowLeaderboard, onEditProfile, onCertPrep }) => {
  const { user, profile } = useAuth();
  const [history, setHistory] = useState<QuizHistoryEntry[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    if (user) {
      fetchQuizHistory(user.id, 10).then(h => {
        setHistory(h);
        setLoadingHistory(false);
      });
    }
  }, [user]);

  if (!profile) return null;

  const accuracy = profile.total_questions_answered > 0
    ? Math.round((profile.total_correct / profile.total_questions_answered) * 100)
    : 0;

  const initials = profile.display_name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Find favorite category
  const categoryCounts: Record<string, number> = {};
  history.forEach(h => {
    categoryCounts[h.category_name] = (categoryCounts[h.category_name] || 0) + 1;
  });
  const favoriteCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';

  // Earned badges
  const earnedBadges = PRIZES.filter(p => profile.points >= p.points);

  const getCategoryIcon = (categoryId: string) => {
    const cat = CATEGORIES.find(c => c.id === categoryId);
    return cat?.icon || 'fa-question';
  };

  const getCategoryColor = (categoryId: string) => {
    const cat = CATEGORIES.find(c => c.id === categoryId);
    return cat?.color || '#777';
  };

  return (
    <div className="py-6 sm:py-8 animate-fade-in-up max-w-4xl mx-auto">
      {/* Profile Card */}
      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-2xl font-bold text-white shadow-lg flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{profile.display_name}</h2>
            <p className="text-gray-400 text-sm">{user?.email}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2">
              <span className="text-sm bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">Level {profile.level}</span>
              <span className="text-sm bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full">
                <i className="fa-solid fa-star mr-1"></i>{profile.points.toLocaleString()} pts
              </span>
              <span className="text-sm bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
                <i className="fa-solid fa-medal mr-1"></i>{earnedBadges.length} badges
              </span>
            </div>
          </div>
          <button
            onClick={onEditProfile}
            className="bg-gray-700/80 hover:bg-gray-600/80 text-white font-bold h-10 w-10 flex items-center justify-center rounded-full shadow-md transition-colors"
            title="Edit Profile"
          >
            <i className="fa-solid fa-pen"></i>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-gray-800/80 backdrop-blur-md rounded-xl border border-white/10 p-4 text-center">
          <p className="text-2xl sm:text-3xl font-bold text-white">{profile.total_quizzes}</p>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Quizzes Played</p>
        </div>
        <div className="bg-gray-800/80 backdrop-blur-md rounded-xl border border-white/10 p-4 text-center">
          <p className="text-2xl sm:text-3xl font-bold text-green-400">{accuracy}%</p>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Accuracy</p>
        </div>
        <div className="bg-gray-800/80 backdrop-blur-md rounded-xl border border-white/10 p-4 text-center">
          <p className="text-2xl sm:text-3xl font-bold text-yellow-400">{profile.points.toLocaleString()}</p>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Total Points</p>
        </div>
        <div className="bg-gray-800/80 backdrop-blur-md rounded-xl border border-white/10 p-4 text-center">
          <p className="text-lg sm:text-xl font-bold text-blue-300 truncate">{favoriteCategory}</p>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Favorite Category</p>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 mb-6">
        <h3 className="text-lg font-bold text-white mb-4"><i className="fa-solid fa-trophy mr-2 text-yellow-400"></i>Badges</h3>
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          {PRIZES.map(prize => {
            const earned = profile.points >= prize.points;
            return (
              <div
                key={prize.name}
                className={`flex flex-col items-center p-3 rounded-xl w-20 sm:w-24 transition-all ${earned ? 'bg-gray-700/80' : 'bg-gray-900/50 opacity-40'}`}
                title={`${prize.name} — ${prize.points} pts`}
              >
                <i className={`fa-solid ${prize.icon} text-2xl sm:text-3xl mb-1 ${earned ? '' : 'text-gray-600'}`} style={earned ? { color: prize.color || '#60A5FA' } : {}}></i>
                <span className="text-[10px] sm:text-xs text-gray-300 text-center leading-tight">{prize.name.replace(' Badge', '')}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent History */}
      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 mb-6">
        <h3 className="text-lg font-bold text-white mb-4"><i className="fa-solid fa-clock-rotate-left mr-2 text-blue-400"></i>Recent Quizzes</h3>
        {loadingHistory ? (
          <div className="text-center py-6 text-gray-400">
            <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
          </div>
        ) : history.length === 0 ? (
          <p className="text-gray-400 text-center py-6">No quizzes yet. Start your first one!</p>
        ) : (
          <div className="space-y-2">
            {history.map(entry => (
              <div key={entry.id} className="flex items-center gap-3 bg-gray-900/50 p-3 rounded-lg">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: getCategoryColor(entry.category_id) + '30' }}>
                  <i className={`fa-solid ${getCategoryIcon(entry.category_id)}`} style={{ color: getCategoryColor(entry.category_id) }}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{entry.category_name}</p>
                  <p className="text-xs text-gray-400">{new Date(entry.completed_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-green-400">{entry.correct_answers}/{entry.total_questions}</p>
                  <p className="text-xs text-yellow-400">+{entry.points_earned} pts</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cert Prep Card */}
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-md rounded-2xl border border-blue-500/20 p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-certificate text-2xl text-white"></i>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white">Cert Prep Pro</h3>
            <p className="text-gray-400 text-sm">Study quizzes, flashcards & timed practice exams for Salesforce certifications</p>
          </div>
          <button
            onClick={onCertPrep}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transform transition-transform text-sm whitespace-nowrap"
          >
            {profile.is_premium ? (
              <><i className="fa-solid fa-arrow-right mr-2"></i>Open Cert Prep</>
            ) : (
              <><i className="fa-solid fa-lock mr-2"></i>Unlock Cert Prep</>
            )}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={onStartQuiz}
          className="flex-1 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-4 rounded-xl shadow-lg hover:scale-105 transform transition-transform text-lg"
        >
          <i className="fa-solid fa-play mr-2"></i>Start Quiz
        </button>
        <button
          onClick={onShowLeaderboard}
          className="flex-1 bg-gray-700/80 hover:bg-gray-600/80 text-white font-bold py-4 rounded-xl shadow-md transition-colors text-lg"
        >
          <i className="fa-solid fa-trophy mr-2"></i>Leaderboard
        </button>
      </div>
    </div>
  );
};

export default DashboardScreen;
