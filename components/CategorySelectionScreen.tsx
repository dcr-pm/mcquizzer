import React from 'react';
import { Category, Player } from '../types.ts';
import { CATEGORIES } from '../constants.ts';

interface CategorySelectionScreenProps {
  player: Player | null;
  onSelectCategory: (categoryId: string) => void;
  onShowLeaderboard: () => void;
}

const CategoryCard: React.FC<{ category: Omit<Category, 'questions'>; onSelect: () => void; }> = ({ category, onSelect }) => (
  <div
    onClick={onSelect}
    className={`relative group p-5 sm:p-6 rounded-xl shadow-lg transform transition-all duration-300 overflow-hidden bg-gradient-to-br ${category.gradient} cursor-pointer hover:-translate-y-2`}
  >
    <div className="relative z-10">
      <div className="flex items-center gap-4">
        <i className={`fa-solid ${category.icon} text-3xl sm:text-4xl text-white opacity-80`}></i>
        <h3 className="text-xl sm:text-2xl font-bold text-white">{category.name}</h3>
      </div>
      <p className="mt-2 text-white/90 text-sm sm:text-base">{category.description}</p>
    </div>
    <i className={`fa-solid ${category.icon} absolute -right-4 -bottom-4 text-8xl sm:text-9xl text-white/10 group-hover:rotate-12 transition-transform duration-500`}></i>
  </div>
);

const CategorySelectionScreen: React.FC<CategorySelectionScreenProps> = ({ player, onSelectCategory, onShowLeaderboard }) => {
  return (
    <div className="p-4 md:p-8 relative animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Welcome, {player?.name}!</h2>
        <p className="text-gray-300 mt-2 text-base sm:text-lg max-w-2xl mx-auto">Challenge your expertise, earn points, and prove you're an SFMC Guru! Select a category and let the quiz begin.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {CATEGORIES.map((cat) => (
          <CategoryCard key={cat.id} category={cat} onSelect={() => onSelectCategory(cat.id)} />
        ))}
      </div>
      
      <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-6 max-w-6xl mx-auto">
        <button
            onClick={() => onSelectCategory('random')}
            className="w-full md:w-auto flex-1 bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300"
        >
            <i className="fa-solid fa-shuffle mr-2"></i>Random Questions
        </button>
        <button
            onClick={() => onSelectCategory('einstein_challenge')}
            className="w-full md:w-auto flex-1 bg-gradient-to-r from-orange-400 to-amber-500 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300"
        >
            <i className="fa-solid fa-star mr-2"></i>Einstein Challenge
        </button>
      </div>

       <div className="text-center mt-12">
        <button onClick={onShowLeaderboard} className="text-lg text-blue-300 hover:text-blue-200 font-semibold transition-colors">
            <i className="fa-solid fa-trophy mr-2"></i>View Leaderboard
        </button>
      </div>
    </div>
  );
};

export default CategorySelectionScreen;