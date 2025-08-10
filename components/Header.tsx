import React from 'react';
import { Player, GameScreen } from '../types.ts';

interface HeaderProps {
  player: Player | null;
  onNavigateToCategories: () => void;
  screen: GameScreen;
}

const Header: React.FC<HeaderProps> = ({ player, onNavigateToCategories, screen }) => {
  // Show the button if a player exists and they are NOT on the initial screens or the category selection screen itself.
  const showHomeButton = player && !['name_entry', 'category_selection'].includes(screen);

  return (
    <header className="sticky top-0 z-30 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-lg text-white p-3 sm:p-4 flex justify-between items-center">
      <div className="flex items-center gap-2 sm:gap-3">
        <i className="fa-solid fa-cloud text-2xl sm:text-3xl text-[#0F79AF]"></i>
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">MarketingCloud Quizzer</h1>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        {showHomeButton && (
          <button
            onClick={onNavigateToCategories}
            className="bg-gray-700/80 hover:bg-gray-600/80 text-white font-bold h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-full shadow-md transition-colors duration-200"
            title="Back to Categories"
          >
            <i className="fa-solid fa-grip-vertical"></i>
          </button>
        )}

        {player && (
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-right">
              <span className="font-bold text-base sm:text-lg block truncate max-w-[100px] sm:max-w-[150px]">{player.name}</span>
              <div className="text-xs sm:text-sm text-gray-300">
                <span>Level: {player.level}</span>
              </div>
            </div>
            <div className="flex items-center bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-2 px-3 sm:px-4 rounded-full shadow-md text-sm sm:text-base">
              <i className="fa-solid fa-star mr-1 sm:mr-2"></i>
              <span>{player.points}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;