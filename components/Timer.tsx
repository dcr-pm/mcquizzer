
import React, { useState, useEffect } from 'react';
import { TIMER_DURATION } from '../constants.ts';

interface TimerProps {
  isPaused: boolean;
  onTimeUp: () => void;
  onTick: (timeLeft: number) => void;
  resetKey: number;
}

const Timer: React.FC<TimerProps> = ({ isPaused, onTimeUp, onTick, resetKey }) => {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / TIMER_DURATION) * circumference;

  useEffect(() => {
    setTimeLeft(TIMER_DURATION);
  }, [resetKey]);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        onTick(newTime);
        if (newTime <= 0) {
          clearInterval(intervalId);
          onTimeUp();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, resetKey]);

  const getTimeColor = () => {
    if (timeLeft <= 5) return 'text-red-500';
    if (timeLeft <= 10) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        <circle
          className="text-gray-600"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
        <circle
          className={`${getTimeColor()} transition-all duration-1000 linear`}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
        />
      </svg>
      <span className={`absolute inset-0 flex items-center justify-center text-3xl font-bold ${getTimeColor()}`}>
        {timeLeft}
      </span>
    </div>
  );
};

export default Timer;