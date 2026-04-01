import React, { useState, useRef, useEffect } from 'react';
import { Player, GameScreen } from '../types.ts';

interface HeaderProps {
  player: Player | null;
  onNavigateHome: () => void;
  onSignOut: () => void;
  screen: GameScreen;
}

const Header: React.FC<HeaderProps> = ({ player, onNavigateHome, onSignOut, screen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showHomeButton = player && !['dashboard'].includes(screen);

  const initials = player
    ? player.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '';

  return (
    <header className="sticky top-0 z-30 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-lg text-white p-3 sm:p-4 flex justify-between items-center">
      <div className="flex items-center gap-2 sm:gap-3">
        <i className="fa-solid fa-cloud text-2xl sm:text-3xl text-[#0F79AF]"></i>
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">MarketingCloud Quizzer</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {showHomeButton && (
          <button
            onClick={onNavigateHome}
            className="bg-gray-700/80 hover:bg-gray-600/80 text-white font-bold h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-full shadow-md transition-colors duration-200"
            title="Dashboard"
          >
            <i className="fa-solid fa-house"></i>
          </button>
        )}

        {player && (
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-2 px-3 sm:px-4 rounded-full shadow-md text-sm sm:text-base">
              <i className="fa-solid fa-star mr-1 sm:mr-2"></i>
              <span>{player.points.toLocaleString()}</span>
            </div>

            {/* User Avatar Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-sm font-bold text-white shadow-md hover:scale-105 transition-transform"
                title={player.name}
              >
                {initials}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden animate-fade-in-up z-50">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="font-bold text-white text-sm truncate">{player.name}</p>
                    <p className="text-xs text-gray-400">Level {player.level}</p>
                  </div>
                  <button
                    onClick={() => { setDropdownOpen(false); onNavigateHome(); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700/80 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <i className="fa-solid fa-gauge w-4"></i> Dashboard
                  </button>
                  <button
                    onClick={() => { setDropdownOpen(false); onSignOut(); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-gray-700/80 hover:text-red-300 transition-colors flex items-center gap-2"
                  >
                    <i className="fa-solid fa-right-from-bracket w-4"></i> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
