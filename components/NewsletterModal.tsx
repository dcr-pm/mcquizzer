import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext.tsx';
import { supabase, isSupabaseConfigured } from '../lib/supabase.ts';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = async () => {
    if (!user || !isSupabaseConfigured) return;
    setLoading(true);
    try {
      await supabase.from('newsletter_subscribers').upsert(
        { user_id: user.id, email: user.email, subscribed: true },
        { onConflict: 'user_id' }
      );
      setSubscribed(true);
      setTimeout(onClose, 2000);
    } catch (err) {
      // Silently handle
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl border border-white/20 p-6 sm:p-8 max-w-sm w-full animate-fade-in-up">
        {subscribed ? (
          <div className="text-center">
            <i className="fa-solid fa-party-horn text-4xl text-yellow-400 mb-4"></i>
            <h3 className="text-xl font-bold text-white mb-2">Welcome to the Community!</h3>
            <p className="text-gray-400 text-sm">You'll receive our monthly newsletter with SF tips, updates, and exclusive content.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <i className="fa-solid fa-envelope-open-text text-4xl text-blue-400 mb-3"></i>
              <h3 className="text-xl font-bold text-white mb-2">Join the SF Quizzer Community!</h3>
              <p className="text-gray-400 text-sm">
                Get our monthly newsletter with Salesforce tips, cert prep strategies, industry news, and exclusive content delivered to your inbox.
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <i className="fa-solid fa-envelope text-blue-400"></i>
                <span className="text-gray-300">{user?.email}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold py-3 rounded-xl transition-colors text-sm"
              >
                Maybe Later
              </button>
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 transform transition-transform text-sm disabled:opacity-50"
              >
                {loading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  <><i className="fa-solid fa-check mr-2"></i>Count Me In!</>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsletterModal;
