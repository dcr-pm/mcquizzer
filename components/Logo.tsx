import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZES = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
  xl: 'w-20 h-20',
};

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  return (
    <div className={`${SIZES[size]} ${className} flex-shrink-0`}>
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="shineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.25" />
            <stop offset="50%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Rounded square base */}
        <rect width="64" height="64" rx="16" fill="url(#logoGrad)" />
        {/* Shine overlay */}
        <rect width="64" height="32" rx="16" fill="url(#shineGrad)" />
        {/* Cloud */}
        <path
          d="M47 35c0-3.3-2.2-6-5.2-6.8C41.3 24.1 37.7 21 33.5 21c-3 0-5.6 1.5-7.2 3.8C25 24.3 23.6 24 22 24c-4.4 0-8 3.6-8 8 0 .7.1 1.4.3 2C12.3 35 11 37 11 39.5 11 42.5 13.5 45 16.5 45h28c3 0 5.5-2.5 5.5-5.5 0-1.7-.8-3.2-2-4.2-.3-.1-1-.3-1-.3z"
          fill="white"
          opacity="0.95"
        />
        {/* Question mark */}
        <text
          x="30"
          y="41"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fontSize="16"
          fill="#3B82F6"
          textAnchor="middle"
        >
          ?
        </text>
      </svg>
    </div>
  );
};

export default Logo;
