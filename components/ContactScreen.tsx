import React from 'react';

interface ContactScreenProps {
  onBack: () => void;
  onFeedback: () => void;
}

const ContactScreen: React.FC<ContactScreenProps> = ({ onBack, onFeedback }) => {
  return (
    <div className="py-6 sm:py-8 animate-fade-in-up max-w-2xl mx-auto">
      <button onClick={onBack} className="text-gray-400 hover:text-white text-sm mb-6 transition-colors">
        <i className="fa-solid fa-arrow-left mr-2"></i>Back to Home
      </button>

      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-envelope text-2xl text-white"></i>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-gray-400 text-sm">Have a question, suggestion, or just want to say hello? We would love to hear from you.</p>
        </div>

        {/* Email */}
        <div className="bg-gray-900/50 rounded-xl p-5 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <i className="fa-solid fa-envelope text-blue-400 text-lg"></i>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Email</p>
              <a
                href="mailto:support@login.sfquizzer.com"
                className="text-blue-400 hover:text-blue-300 transition-colors font-semibold"
              >
                support@login.sfquizzer.com
              </a>
              <p className="text-gray-500 text-xs mt-1">We typically respond within 24 hours</p>
            </div>
          </div>
        </div>

        {/* Website */}
        <div className="bg-gray-900/50 rounded-xl p-5 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <i className="fa-solid fa-globe text-cyan-400 text-lg"></i>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Website</p>
              <a
                href="https://sfquizzer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
              >
                sfquizzer.com
              </a>
            </div>
          </div>
        </div>

        {/* What to reach out about */}
        <div className="mt-8">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">What can we help with?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: 'fa-bug', label: 'Report a Bug', color: 'text-red-400', bgColor: 'bg-red-500/10' },
              { icon: 'fa-lightbulb', label: 'Feature Requests', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' },
              { icon: 'fa-circle-question', label: 'General Questions', color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
              { icon: 'fa-handshake', label: 'Partnerships', color: 'text-green-400', bgColor: 'bg-green-500/10' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 bg-gray-900/30 rounded-lg p-3">
                <div className={`w-8 h-8 rounded-lg ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <i className={`fa-solid ${item.icon} ${item.color} text-sm`}></i>
                </div>
                <span className="text-gray-300 text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback form CTA */}
        <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
          <p className="text-gray-400 text-sm mb-3">Want to send quick feedback directly from the app?</p>
          <button
            onClick={onFeedback}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-2.5 px-6 rounded-xl hover:scale-105 transition-all text-sm"
          >
            <i className="fa-solid fa-comment-dots mr-2"></i>Open Feedback Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;
