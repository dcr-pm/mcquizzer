

import React, { useEffect } from 'react';
import { Prize } from '../types.ts';

interface PrizeAlertProps {
  prize: Prize;
  onClose: () => void;
}

const PrizeAlert: React.FC<PrizeAlertProps> = ({ prize, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-24 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-xl z-50 animate-bounce-in">
      <div className="flex items-center gap-4">
        <i className={`${prize.icon} text-3xl`} style={{ color: prize.color || 'white' }}></i>
        <div>
          <h4 className="font-bold">Achievement Unlocked!</h4>
          <p>{prize.name}</p>
        </div>
      </div>
    </div>
  );
};

export default PrizeAlert;

// Add this to your global styles or index.html <style> tag.
// It's added here for context.
/*
@keyframes bounce-in {
  0% { transform: scale(0.5); opacity: 0; }
  60% { transform: scale(1.1); opacity: 1; }
  80% { transform: scale(0.95); }
  100% { transform: scale(1); }
}
.animate-bounce-in {
  animation: bounce-in 0.5s ease-out forwards;
}
*/