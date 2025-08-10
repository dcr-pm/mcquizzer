import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const sfmcIcons = [
    { icon: 'fa-envelope', color: 'text-blue-400', top: '15%', left: '10%', size: 'text-3xl sm:text-5xl', delay: '0s' },
    { icon: 'fa-brain', color: 'text-orange-400', top: '20%', left: '85%', size: 'text-4xl sm:text-6xl', delay: '2s' },
    { icon: 'fa-gears', color: 'text-purple-400', top: '70%', left: '12%', size: 'text-3xl sm:text-4xl', delay: '1s' },
    { icon: 'fa-route', color: 'text-pink-400', top: '65%', left: '90%', size: 'text-3xl sm:text-5xl', delay: '3s' },
    { icon: 'fa-database', color: 'text-cyan-400', top: '85%', left: '50%', size: 'text-3xl sm:text-4xl', delay: '0.5s' },
    { icon: 'fa-chart-simple', color: 'text-green-400', top: '5%', left: '45%', size: 'text-3xl sm:text-5xl', delay: '1.5s' },
  ];

  return (
    <div className="relative text-center p-4 sm:p-8 flex flex-col items-center justify-center h-full overflow-hidden">
      {/* Background Floating Icons */}
      {sfmcIcons.map((item, index) => (
        <i
          key={index}
          className={`fa-solid ${item.icon} ${item.color} ${item.size} absolute opacity-0 animate-float`}
          style={{ top: item.top, left: item.left, animationDelay: item.delay }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 bg-white/10 backdrop-blur-xl p-6 sm:p-10 rounded-2xl shadow-2xl border border-white/20 max-w-3xl">
        <div className="flex justify-center items-center gap-3 sm:gap-4 mb-6" aria-hidden="true">
            <i className="fa-solid fa-envelope text-blue-400 text-2xl sm:text-3xl"></i>
            <i className="fa-solid fa-brain text-orange-400 text-3xl sm:text-4xl"></i>
            <i className="fa-solid fa-cloud text-teal-300 text-4xl sm:text-5xl"></i>
            <i className="fa-solid fa-route text-pink-400 text-3xl sm:text-4xl"></i>
            <i className="fa-solid fa-gears text-purple-400 text-2xl sm:text-3xl"></i>
        </div>
        
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Welcome to MarketingCloud Quizzer!</h2>
        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Challenge your expertise, earn points, and prove you're an SFMC Guru! Select a category and let the quiz begin.
        </p>
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 px-6 text-lg sm:py-4 sm:px-8 sm:text-xl rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out animate-pulse-light"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
