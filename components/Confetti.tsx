
import React from 'react';

const Confetti: React.FC = () => {
  const confettiCount = 50;
  const colors = ['#FF9E1B', '#0F79AF', '#E02A9A', '#7B2CBF', '#4CAF50'];

  const confetti = Array.from({ length: confettiCount }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      opacity: Math.random()
    };
    const size = Math.random() * 8 + 4;

    return (
      <div
        key={i}
        className="absolute top-0 rounded-full animate-fall"
        style={{
          ...style,
          width: `${size}px`,
          height: `${size}px`,
        }}
      ></div>
    );
  });

  return <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">{confetti}</div>;
};

export default Confetti;

// Add this to your global styles or index.html <style> tag if you haven't.
// It's added here for context.
/*
@keyframes fall {
  0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
.animate-fall {
  animation-name: fall;
  animation-timing-function: linear;
  animation-iteration-count: 1;
}
*/
// Note: tailwind.config.js keyframes extension is better, but for single file generation, we'll rely on a global style.
// Since we cannot create CSS files, we'll put keyframes in index.html, but they don't seem to work. Let's try to add it inside App.tsx as a style tag
