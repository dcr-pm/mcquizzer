import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext.tsx';
import { redirectToCheckout } from '../lib/stripe.ts';
import { CERTIFICATIONS } from '../data/certifications.ts';

interface PremiumUpgradeScreenProps {
  onBack: () => void;
}

const PremiumUpgradeScreen: React.FC<PremiumUpgradeScreenProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

          {/* CTA */}
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-4 rounded-xl shadow-lg hover:scale-105 transform transition-transform text-lg disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? (
              <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Redirecting to checkout...</>
            ) : (
              <><i className="fa-solid fa-unlock mr-2"></i>Get Cert Prep Pro</>
            )}
          </button>
          <p className="text-center text-gray-500 text-xs mt-3">
            <i className="fa-solid fa-tag mr-1"></i>Have a discount code? You can enter it at checkout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumUpgradeScreen;
