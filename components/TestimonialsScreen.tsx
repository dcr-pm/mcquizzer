import React, { useState, useEffect } from 'react';
import { Testimonial } from '../types.ts';
import { useAuth } from '../lib/AuthContext.tsx';
import { fetchTestimonials, saveTestimonial, deleteTestimonial } from '../lib/database.ts';

interface TestimonialsScreenProps {
  onBack: () => void;
}

const TestimonialsScreen: React.FC<TestimonialsScreenProps> = ({ onBack }) => {
  const { user, profile } = useAuth();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    const data = await fetchTestimonials();
    setTestimonials(data);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!user || !profile || !content.trim()) return;
    setSubmitting(true);
    const result = await saveTestimonial(user.id, profile.display_name, content.trim());
    if (result) {
      setTestimonials(prev => [result, ...prev]);
      setContent('');
      setShowForm(false);
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete your testimonial?')) return;
    await deleteTestimonial(id);
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const timeAgo = (dateStr: string) => {
    const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return '1 day ago';
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
  };

  const renderContent = (text: string) => {
    return text.split('\n\n').map((paragraph, i) => (
      <p key={i} className="mb-2 last:mb-0">
        {paragraph.split('\n').map((line, j, arr) => (
          <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
        ))}
      </p>
    ));
  };

  return (
    <div className="py-6 sm:py-8 animate-fade-in-up max-w-3xl mx-auto">
      <button onClick={onBack} className="text-gray-400 hover:text-white text-sm mb-6 transition-colors">
        <i className="fa-solid fa-arrow-left mr-2"></i>Back
      </button>

      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
          <i className="fa-solid fa-comment-dots text-3xl text-white"></i>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Testimonials</h1>
        <p className="text-gray-400 text-sm">Hear what the SF Quizzer community has to say</p>
      </div>

      {/* Add testimonial button / form */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full mb-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
        >
          <i className="fa-solid fa-plus mr-2"></i>Share Your Experience
        </button>
      ) : (
        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-white/20 p-6 mb-6 animate-fade-in-up">
          <h3 className="text-white font-bold mb-3">
            <i className="fa-solid fa-pen mr-2 text-amber-400"></i>Write Your Testimonial
          </h3>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your experience with SF Quizzer... Feel free to use emojis! 🎉"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-sm leading-relaxed"
            rows={5}
            maxLength={1000}
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">{content.length}/1000</span>
            <div className="flex gap-2">
              <button
                onClick={() => { setShowForm(false); setContent(''); }}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!content.trim() || submitting}
                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Posting...</>
                ) : (
                  <><i className="fa-solid fa-paper-plane mr-2"></i>Post</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials list */}
      {loading ? (
        <div className="text-center py-12">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-amber-400 mb-4"></i>
          <p className="text-gray-400">Loading testimonials...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-white/20 p-12 text-center">
          <i className="fa-solid fa-comment-dots text-4xl text-gray-600 mb-4"></i>
          <h3 className="text-lg font-bold text-white mb-2">Be the First!</h3>
          <p className="text-gray-400 text-sm">No testimonials yet. Share your experience and inspire others.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((t) => {
            const initials = t.display_name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
            const isOwn = user?.id === t.user_id;

            return (
              <div
                key={t.id}
                className="bg-gray-800/80 backdrop-blur-md rounded-xl border border-white/10 p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-white font-semibold text-sm">{t.display_name}</span>
                        <span className="text-gray-500 text-xs ml-2">{timeAgo(t.created_at)}</span>
                      </div>
                      {isOwn && (
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="text-gray-600 hover:text-red-400 transition-colors text-xs"
                          title="Delete your testimonial"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      )}
                    </div>
                    <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {renderContent(t.content)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TestimonialsScreen;
