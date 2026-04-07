import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext.tsx';
import { redirectToCheckout } from '../lib/stripe.ts';
import { CERTIFICATIONS } from '../data/certifications.ts';

interface PremiumUpgradeScreenProps {
  onBack: () => void;
}

const PremiumUpgradeScreen: React.FC<PremiumUpgradeScreenProps> = ({ onBack }) => {
  const { user, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [proPassCode, setProPassCode] = useState('');
  const [proPassLoading, setProPassLoading] = useState(false);
  const [proPassSuccess, setProPassSuccess] = useState(false);
  const cert = CERTIFICATIONS[0];

  const handleUpgrade = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      await redirectToCheckout(user.id);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handleRedeemProPass = async () => {
    if (!user || !proPassCode.trim()) return;
    setProPassLoading(true);
    setError(null);
    try {
      const response = await fetch('/.netlify/functions/redeem-propass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, code: proPassCode.trim().toUpperCase() }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Invalid ProPass code.');
        setProPassLoading(false);
        return;
      }
      setProPassSuccess(true);
      await refreshProfile();
      setTimeout(() => onBack(), 1500);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setProPassLoading(false);
    }
  };

  const features = [
    { icon: 'fa-book-open', title: 'Study Mode', desc: 'Untimed quizzes with instant explanations to build your knowledge' },
    { icon: 'fa-clone', title: 'Flashcards', desc: 'Master key concepts with smart flashcards that track your progress' },
    { icon: 'fa-file-circle-check', title: 'Practice Exams', desc: 'Full-length timed exams that simulate the real certification test' },
    { icon: 'fa-chart-pie', title: 'Score Breakdown', desc: 'See your strengths and weaknesses by topic domain' },
  ];

  return (
    <div className="py-6 sm:py-8 animate-fade-in-up max-w-3xl mx-auto">
      {/* Back button */}
      <button onClick={onBack} className="text-gray-400 hover:text-white text-sm mb-6 transition-colors">
        <i className="fa-solid fa-arrow-left mr-2"></i>Back to Dashboard
      </button>

      {/* Hero */}
      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden mb-6">
        <div className={`bg-gradient-to-r ${cert.gradient} p-8 sm:p-10 text-center`}>
          <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className={`fa-solid ${cert.icon} text-3xl text-white`}></i>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Cert Prep Pro</h1>
          <p className="text-white/80 text-sm sm:text-base max-w-md mx-auto">{cert.name}</p>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {features.map(f => (
              <div key={f.title} className="bg-gray-900/50 p-4 rounded-xl flex gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className={`fa-solid ${f.icon} text-blue-400`}></i>
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{f.title}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Domains */}
          <div className="mb-8">
            <p className="text-sm font-bold text-gray-300 mb-3">Exam Domains Covered:</p>
            <div className="flex flex-wrap gap-2">
              {cert.domains.map(d => (
                <span key={d.id} className="text-xs bg-gray-700/80 text-gray-300 px-3 py-1.5 rounded-full">
                  {d.name} ({d.weight}%)
                </span>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 text-sm p-3 rounded-md mb-4">
              <i className="fa-solid fa-circle-exclamation mr-2"></i>{error}
            </div>
          )}

          {/* ProPass Section */}
          <div>
            {proPassSuccess ? (
              <div className="bg-green-500/20 border border-green-500/50 text-green-300 text-sm p-4 rounded-xl text-center">
                <i className="fa-solid fa-circle-check text-2xl mb-2"></i>
                <p className="font-bold">ProPass Activated!</p>
                <p className="text-xs mt-1">Redirecting to Cert Hub...</p>
              </div>
            ) : (
              <>
                <p className="text-center text-gray-300 text-sm font-semibold mb-3">
                  <i className="fa-solid fa-key mr-1"></i>Enter your ProPass code to unlock
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={proPassCode}
                    onChange={(e) => setProPassCode(e.target.value.toUpperCase())}
                    placeholder="Enter ProPass code"
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-xl p-3 text-white text-sm text-center tracking-widest focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:tracking-normal placeholder:text-gray-500"
                    maxLength={20}
                  />
                  <button
                    onClick={handleRedeemProPass}
                    disabled={proPassLoading || !proPassCode.trim()}
                    className="bg-gray-600 hover:bg-gray-500 text-white font-bold px-5 rounded-xl transition-colors disabled:opacity-40 disabled:hover:bg-gray-600"
                  >
                    {proPassLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-arrow-right"></i>}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumUpgradeScreen;
