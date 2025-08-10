
import React, { useState } from 'react';

interface PlayerNameModalProps {
  onNameSubmit: (name: string) => void;
}

const PlayerNameModal: React.FC<PlayerNameModalProps> = ({ onNameSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700 transform transition-all animate-fade-in-up w-full max-w-sm"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Enter Your Name</h2>
        <p className="text-gray-400 mb-6 text-sm sm:text-base">Your name will be displayed on the leaderboard.</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Alex Johnson"
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          maxLength={20}
        />
        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 rounded-md shadow-lg hover:scale-105 transform transition-transform duration-300"
        >
          Let's Go!
        </button>
      </form>
    </div>
  );
};

export default PlayerNameModal;
