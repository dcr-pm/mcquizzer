
import React from 'react';
import { Player } from '../types.ts';

interface LeaderboardProps {
  players: Player[];
  currentPlayerName: string | null;
  onBack: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ players, currentPlayerName, onBack }) => {
  const rankColors: { [key: number]: string } = {
    1: 'bg-yellow-500/80 border-yellow-400',
    2: 'bg-gray-400/80 border-gray-300',
    3: 'bg-orange-600/80 border-orange-500',
  };

  const rankIcons: { [key: number]: string } = {
    1: 'fa-trophy text-yellow-300',
    2: 'fa-medal text-gray-200',
    3: 'fa-award text-orange-400',
  };

  return (
    <div className="p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Leaderboard</h2>
                 <button onClick={onBack} className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                    <i className="fa-solid fa-arrow-left"></i><span className="hidden sm:inline">Back to Categories</span>
                </button>
            </div>
            <div className="space-y-2 sm:space-y-3">
            {players.map((player, index) => {
                const rank = index + 1;
                const isCurrentPlayer = player.name === currentPlayerName;
                return (
                <div
                    key={index}
                    className={`flex items-center p-2 sm:p-3 rounded-lg transition-all duration-300 ${
                    rankColors[rank] || 'bg-gray-700/60'
                    } ${isCurrentPlayer ? 'ring-2 ring-blue-400 scale-105' : ''}`}
                >
                    <div className="flex items-center w-12 sm:w-16 flex-shrink-0">
                        <span className="font-bold text-base sm:text-xl text-white w-8 text-center">{rank}</span>
                        {rankIcons[rank] && <i className={`fa-solid ${rankIcons[rank]} ml-1 sm:ml-2 text-xl sm:text-2xl`}></i>}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-white text-sm sm:text-lg truncate">{player.name}</p>
                    </div>
                    <div className="w-24 sm:w-32 text-right flex-shrink-0">
                        <p className="font-semibold text-white text-sm sm:text-base">{player.points.toLocaleString()} pts</p>
                        <p className="text-xs sm:text-sm text-gray-300">Level {player.level}</p>
                    </div>
                </div>
                );
            })}
            </div>
        </div>
    </div>
  );
};

export default Leaderboard;
