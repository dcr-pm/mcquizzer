import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext.tsx';
import Logo from './Logo.tsx';
import LandingQuiz from './LandingQuiz.tsx';
import StockTicker from './StockTicker.tsx';

type AuthStep = 'email' | 'verify';

const AuthScreen: React.FC = () => {
  const { signInWithOtp, verifyOtp, configured } = useAuth();
  const [step, setStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setError('Please enter a display name.');
      return;
    }
    setError(null);
    setLoading(true);

    const { error: err } = await signInWithOtp(email, displayName.trim());
    if (err) {
      setError(err);
    } else {
      setStep('verify');
    }
    setLoading(false);
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: err } = await verifyOtp(email, otpCode);
    if (err) {
      setError(err);
    }
    setLoading(false);
  };

  if (!configured) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
        <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700 animate-fade-in-up w-full max-w-sm text-center">
          <Logo size="lg" className="mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Setup Required</h2>
          <p className="text-gray-400 text-sm sm:text-base mb-4">
            Supabase is not configured yet. Add <strong className="text-white">VITE_SUPABASE_URL</strong> and <strong className="text-white">VITE_SUPABASE_ANON_KEY</strong> to your environment variables.
          </p>
          <p className="text-gray-500 text-xs">See the setup instructions in the README or supabase-setup.sql.</p>
        </div>
      </div>
    );
  }

  // Verify code step (modal overlay)
  if (step === 'verify') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
        <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700 animate-fade-in-up w-full max-w-sm">
          <div className="text-center mb-6">
            <i className="fa-solid fa-envelope-circle-check text-4xl text-green-400 mb-2"></i>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Check Your Email</h2>
            <p className="text-gray-400 text-sm mt-2">
              We sent a code to <strong className="text-white">{email}</strong>
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 text-sm p-3 rounded-md mb-4">
              <i className="fa-solid fa-circle-exclamation mr-2"></i>{error}
            </div>
          )}

          <form onSubmit={handleVerifyCode}>
            <input
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 8))}
              placeholder="Enter code"
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              required
              maxLength={8}
              autoFocus
            />
            <button
              type="submit"
              disabled={loading || otpCode.length < 6}
              className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 rounded-md shadow-lg hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? (
                <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Verifying...</>
              ) : (
                "Verify & Sign In"
              )}
            </button>
          </form>

          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => { setStep('email'); setOtpCode(''); setError(null); }}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              <i className="fa-solid fa-arrow-left mr-1"></i> Different email
            </button>
            <button
              onClick={async () => { setError(null); setOtpCode(''); await signInWithOtp(email, displayName); }}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              <i className="fa-solid fa-rotate-right mr-1"></i> Resend code
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Sign-in form (modal overlay)
  if (showSignIn) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
        <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700 animate-fade-in-up w-full max-w-sm">
          <div className="text-center mb-6">
            <Logo size="lg" className="mx-auto mb-2" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Welcome to SF Quizzer</h2>
            <p className="text-gray-400 text-sm mt-1">Sign in with your email - no password needed</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 text-sm p-3 rounded-md mb-4">
              <i className="fa-solid fa-circle-exclamation mr-2"></i>{error}
            </div>
          )}

          <form onSubmit={handleSendCode}>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display Name"
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              required
              maxLength={20}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              required
            />
            <p className="text-gray-500 text-xs mb-4 text-center">
              <i className="fa-solid fa-circle-info mr-1"></i>Please use a personal email (Gmail, Outlook, Yahoo, iCloud). Work/corporate emails may not receive the sign-in code.
            </p>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 rounded-md shadow-lg hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? (
                <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Sending code...</>
              ) : (
                <><i className="fa-solid fa-paper-plane mr-2"></i>Send Sign-In Code</>
              )}
            </button>
          </form>

          <button
            onClick={() => { setShowSignIn(false); setError(null); }}
            className="w-full mt-4 text-gray-500 hover:text-gray-300 text-sm transition-colors"
          >
            <i className="fa-solid fa-arrow-left mr-1"></i> Back to home
          </button>
        </div>
      </div>
    );
  }

  // Landing page
  return (
    <div className="min-h-dvh bg-gray-900 text-white">
      {/* Top Nav */}
      <header className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size="sm" />
          <span className="font-bold text-white text-lg">SF Quizzer</span>
          <StockTicker />
        </div>
        <button
          onClick={() => setShowSignIn(true)}
          className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-2 px-5 rounded-lg text-sm hover:scale-105 transform transition-transform"
        >
          Sign In
        </button>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 pt-10 sm:pt-16 pb-10 sm:pb-14 relative">
          {/* Top: Logo + Headline */}
          <div className="text-center mb-8 sm:mb-10">
            <Logo size="xl" className="mx-auto mb-4" />
            <h1 className="text-3xl sm:text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent leading-tight">
              Ace Your Salesforce Certification
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Practice exams, flashcards, and interactive learning paths designed to get you certified.
            </p>
          </div>

          {/* Interactive Quiz Widget */}
          <div className="mb-8">
            <LandingQuiz onSignUp={() => setShowSignIn(true)} />
          </div>

          {/* CTA below quiz */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setShowSignIn(true)}
              className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg hover:scale-105 transform transition-transform text-lg"
            >
              <i className="fa-solid fa-rocket mr-2"></i>Start Studying Free
            </button>
            <a
              href="#features"
              className="bg-gray-800/80 border border-white/10 text-gray-300 font-bold py-3.5 px-8 rounded-xl hover:bg-gray-700/80 transition-colors text-lg text-center"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-800/50 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-white">335+</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Practice Questions</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-white">2</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Certifications</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-white">90+</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Flashcards</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-white">100%</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Free to Start</p>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">Certifications Covered</h2>
        <p className="text-gray-400 text-center mb-8 text-sm sm:text-base">Full study suites with questions mapped to official exam domains</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gray-800/80 rounded-2xl border border-white/10 p-6 hover:border-blue-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
              <i className="fa-solid fa-certificate text-xl text-white"></i>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Marketing Cloud Email Specialist</h3>
            <p className="text-gray-400 text-sm mb-3">229 questions across 6 exam domains, plus interactive learning path</p>
            <div className="flex gap-3 text-xs text-gray-500">
              <span><i className="fa-solid fa-list-check mr-1 text-blue-400"></i>229 questions</span>
              <span><i className="fa-solid fa-clone mr-1 text-blue-400"></i>45 flashcards</span>
              <span><i className="fa-solid fa-route mr-1 text-blue-400"></i>Learning path</span>
            </div>
          </div>
          <div className="bg-gray-800/80 rounded-2xl border border-white/10 p-6 hover:border-violet-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center mb-4">
              <i className="fa-solid fa-cloud text-xl text-white"></i>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Data Cloud Consultant</h3>
            <p className="text-gray-400 text-sm mb-3">106 questions across 6 exam domains, plus interactive learning path</p>
            <div className="flex gap-3 text-xs text-gray-500">
              <span><i className="fa-solid fa-list-check mr-1 text-violet-400"></i>106 questions</span>
              <span><i className="fa-solid fa-clone mr-1 text-violet-400"></i>45 flashcards</span>
              <span><i className="fa-solid fa-route mr-1 text-violet-400"></i>Learning path</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="bg-gray-800/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">Everything You Need to Pass</h2>
          <p className="text-gray-400 text-center mb-10 text-sm sm:text-base">Study smarter with tools built for Salesforce certification prep</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: 'fa-book-open', color: 'text-blue-400', title: 'Study Mode', desc: 'Learn at your own pace with untimed quizzes. Get instant feedback and detailed explanations for every question.' },
              { icon: 'fa-file-circle-check', color: 'text-orange-400', title: 'Practice Exams', desc: 'Simulate the real exam with timed, scored tests. Full and quick modes with question flagging and navigation.' },
              { icon: 'fa-clone', color: 'text-green-400', title: 'Flashcards', desc: 'Review key concepts with spaced repetition. Track your mastery and focus on areas that need work.' },
              { icon: 'fa-route', color: 'text-purple-400', title: 'Learning Paths', desc: 'Follow a real-world scenario from start to finish. Interactive slides covering every exam domain.' },
              { icon: 'fa-trophy', color: 'text-yellow-400', title: 'Leaderboard', desc: 'Compete with other learners. Earn points, climb the rankings, and stay motivated.' },
              { icon: 'fa-chart-line', color: 'text-teal-400', title: 'Progress Tracking', desc: 'See your scores by domain. Identify weak areas and focus your study time where it matters most.' },
            ].map(f => (
              <div key={f.title} className="bg-gray-800/60 rounded-xl border border-white/5 p-5">
                <i className={`fa-solid ${f.icon} text-xl ${f.color} mb-3`}></i>
                <h3 className="text-white font-bold mb-1">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Get Started in 30 Seconds</h2>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          {[
            { step: '1', icon: 'fa-envelope', title: 'Enter your email', desc: 'No password needed. We send a one-time code to sign you in.' },
            { step: '2', icon: 'fa-certificate', title: 'Pick a certification', desc: 'Choose from Marketing Cloud Email Specialist or Data Cloud Consultant.' },
            { step: '3', icon: 'fa-graduation-cap', title: 'Start learning', desc: 'Study mode, practice exams, flashcards, and learning paths are all ready to go.' },
          ].map(s => (
            <div key={s.step}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center mx-auto mb-3 text-white font-bold">
                {s.step}
              </div>
              <h3 className="text-white font-bold mb-1">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600/20 to-teal-600/20 border-y border-white/5">
        <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Get Certified?</h2>
          <p className="text-gray-400 mb-6 text-sm sm:text-base">Join the community of Salesforce professionals preparing for their next certification.</p>
          <button
            onClick={() => setShowSignIn(true)}
            className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg hover:scale-105 transform transition-transform text-lg"
          >
            <i className="fa-solid fa-rocket mr-2"></i>Start Studying Free
          </button>
          <p className="text-gray-600 text-xs mt-4">No credit card required. No spam. Just study.</p>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Logo size="sm" />
          <span className="text-gray-400 font-bold">SF Quizzer</span>
        </div>
        <p className="text-gray-600 text-xs">Built for the Salesforce community. Not affiliated with Salesforce, Inc.</p>
      </div>
    </div>
  );
};

export default AuthScreen;
