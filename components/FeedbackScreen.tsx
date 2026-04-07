import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext.tsx';
import { supabase, isSupabaseConfigured } from '../lib/supabase.ts';

interface FeedbackScreenProps {
  onBack: () => void;
}

const CATEGORIES = [
  { id: 'bug', label: 'Bug Report', icon: 'fa-bug', color: 'text-red-400' },
  { id: 'feature', label: 'Feature Request', icon: 'fa-lightbulb', color: 'text-yellow-400' },
  { id: 'content', label: 'Question / Content Issue', icon: 'fa-file-lines', color: 'text-blue-400' },
  { id: 'general', label: 'General Feedback', icon: 'fa-comment', color: 'text-green-400' },
  { id: 'other', label: 'Other', icon: 'fa-ellipsis', color: 'text-gray-400' },
];

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ onBack }) => {
  const { user, profile } = useAuth();
  const [category, setCategory] = useState('general');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    setSubmitting(true);
    setError(null);

    try {
      if (isSupabaseConfigured) {
        await supabase.from('general_feedback').insert({
          user_id: user.id,
          display_name: profile?.display_name || 'Anonymous',
          category,
          message: message.trim(),
        });
      }
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setCategory('general');
    setMessage('');
    setSubmitted(false);
    setError(null);
  };

  return (
    <div className="py-6 sm:py-8 animate-fade-in-up max-w-2xl mx-auto">
      <button onClick={onBack} className="text-gray-400 hover:text-white text-sm mb-6 transition-colors">
        <i className="fa-solid fa-arrow-left mr-2"></i>Back
      </button>

      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mx-auto mb-4">
          <i className="fa-solid fa-paper-plane text-3xl text-white"></i>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Send Feedback</h1>
        <p className="text-gray-400 text-sm">Found a bug, have an idea, or just want to share your thoughts? We'd love to hear from you.</p>
      </div>

      {submitted ? (
        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-white/20 p-8 sm:p-12 text-center">
          <i className="fa-solid fa-circle-check text-5xl text-green-400 mb-4"></i>
          <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
          <p className="text-gray-400 text-sm mb-6">Your feedback has been received. We appreciate you taking the time to help us improve SF Quizzer.</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-gray-700 text-white text-sm font-bold rounded-lg hover:bg-gray-600 transition-colors"
            >
              Send More Feedback
            </button>
            <button
              onClick={onBack}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-teal-400 text-white text-sm font-bold rounded-lg hover:scale-105 transform transition-transform"
            >
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-white/20 p-6 sm:p-8">
          {/* Category */}
          <div className="mb-5">
            <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 block">Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                    category === cat.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-400 hover:text-white'
                  }`}
                >
                  <i className={`fa-solid ${cat.icon} mr-1`}></i>{cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submitting as */}
          {profile && (
            <div className="mb-5 bg-gray-900/50 rounded-lg px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                {profile.display_name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{profile.display_name}</p>
                <p className="text-gray-500 text-xs">Submitting as</p>
              </div>
            </div>
          )}

          {/* Message */}
          <div className="mb-5">
            <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 block">Your Feedback</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what's on your mind..."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-36 resize-none"
              required
              maxLength={2000}
            />
            <p className="text-xs text-gray-600 mt-1 text-right">{message.length}/2000</p>
          </div>

          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm text-center">
              <i className="fa-solid fa-triangle-exclamation mr-2"></i>{error}
            </div>
          )}

          <button
            type="submit"
            disabled={!message.trim() || submitting}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold rounded-lg hover:scale-[1.02] transform transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {submitting ? (
              <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Sending...</>
            ) : (
              <><i className="fa-solid fa-paper-plane mr-2"></i>Submit Feedback</>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default FeedbackScreen;
