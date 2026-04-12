import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext.tsx';
import Logo from './Logo.tsx';
import LandingQuiz from './LandingQuiz.tsx';
import StockTicker from './StockTicker.tsx';
import SFNewsScreen from './SFNewsScreen.tsx';
import SFJobsScreen from './SFJobsScreen.tsx';

type AuthStep = 'email' | 'verify';
type LandingPage = 'home' | 'about' | 'news' | 'careers' | 'contact';

const AuthScreen: React.FC = () => {
  const { signInWithOtp, verifyOtp, configured } = useAuth();
  const [step, setStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [landingPage, setLandingPage] = useState<LandingPage>('home');

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

  // Shared landing nav
  const landingNav = (
    <header className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-md border-b border-white/5 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setLandingPage('home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Logo size="sm" />
            <span className="font-bold text-white text-lg">SF Quizzer</span>
          </button>
          <StockTicker />
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="hidden md:flex items-center gap-1 mr-3">
            {[
              { key: 'about' as LandingPage, label: 'About' },
              { key: 'news' as LandingPage, label: 'SF News' },
              { key: 'careers' as LandingPage, label: 'Careers' },
              { key: 'contact' as LandingPage, label: 'Contact' },
            ].map(item => (
              <button
                key={item.key}
                onClick={() => { setLandingPage(item.key); window.scrollTo(0, 0); }}
                className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${landingPage === item.key ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => setShowSignIn(true)}
            className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-2 px-5 rounded-lg text-sm hover:scale-105 transform transition-transform"
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  );

  // About page
  if (landingPage === 'about') {
    return (
      <div className="min-h-dvh bg-gray-900 text-white">
        {landingNav}
        <div className="max-w-4xl mx-auto px-4 py-10 sm:py-16">
          {/* Hero */}
          <div className="text-center mb-12">
            <Logo size="xl" className="mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">About SF Quizzer</h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">Built by Salesforce professionals who got tired of boring study tools.</p>
          </div>

          {/* Mission */}
          <div className="bg-gray-800/60 rounded-2xl border border-white/10 p-6 sm:p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-4"><i className="fa-solid fa-bullseye text-blue-400 mr-2"></i>Our Mission</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Salesforce certifications open doors. But studying for them can feel like a grind. We built SF Quizzer because we believe certification prep should be engaging, effective, and accessible to everyone in the ecosystem.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Every question is mapped to official exam domains. Every explanation teaches the "why" behind the answer. And every feature is designed to make your study sessions count, not just fill time.
            </p>
          </div>

          {/* What makes us different */}
          <h2 className="text-xl font-bold text-white mb-5"><i className="fa-solid fa-sparkles text-teal-400 mr-2"></i>What Makes Us Different</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {[
              { icon: 'fa-bullseye', color: 'text-blue-400', bg: 'bg-blue-500/10', title: 'Exam-Focused Content', desc: 'Questions mapped to real Salesforce exam domains and weighted by importance. No fluff.' },
              { icon: 'fa-route', color: 'text-purple-400', bg: 'bg-purple-500/10', title: 'Interactive Learning Paths', desc: 'Follow a fictional company through a complete implementation. Learn by doing, not just reading.' },
              { icon: 'fa-file-circle-check', color: 'text-orange-400', bg: 'bg-orange-500/10', title: 'Realistic Practice Exams', desc: 'Timed exams with question flagging, navigation, and domain-level score breakdowns. Just like the real thing.' },
              { icon: 'fa-mobile-screen', color: 'text-teal-400', bg: 'bg-teal-500/10', title: 'Study Anywhere', desc: 'Mobile-friendly design. Study on the bus, in line, or on your couch. Your progress syncs everywhere.' },
              { icon: 'fa-heart', color: 'text-red-400', bg: 'bg-red-500/10', title: 'Community Built', desc: 'Made by Salesforce professionals for Salesforce professionals. We use it too.' },
              { icon: 'fa-lock-open', color: 'text-green-400', bg: 'bg-green-500/10', title: 'Free to Start', desc: 'No credit card. No trial period. Sign up with just your email and start studying immediately.' },
            ].map(f => (
              <div key={f.title} className="bg-gray-800/60 rounded-xl border border-white/5 p-5">
                <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-3`}>
                  <i className={`fa-solid ${f.icon} ${f.color}`}></i>
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{f.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="bg-gray-800/60 rounded-2xl border border-white/10 p-6 sm:p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-4"><i className="fa-solid fa-certificate text-yellow-400 mr-2"></i>Certifications We Cover</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 rounded-xl p-4 border border-blue-500/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <i className="fa-solid fa-certificate text-white"></i>
                  </div>
                  <h3 className="text-white font-bold text-sm">Marketing Cloud Email Specialist</h3>
                </div>
                <p className="text-gray-500 text-xs">229 questions, 45 flashcards, interactive learning path</p>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4 border border-violet-500/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center">
                    <i className="fa-solid fa-cloud text-white"></i>
                  </div>
                  <h3 className="text-white font-bold text-sm">Data Cloud Consultant</h3>
                </div>
                <p className="text-gray-500 text-xs">106 questions, 45 flashcards, interactive learning path</p>
              </div>
            </div>
            <p className="text-gray-500 text-xs mt-4 text-center">More certifications coming soon.</p>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800/60 rounded-2xl border border-white/10 p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-3">
                <i className="fa-solid fa-envelope text-xl text-white"></i>
              </div>
              <h2 className="text-xl font-bold text-white mb-1">Get In Touch</h2>
              <p className="text-gray-400 text-sm">Questions, feedback, or partnership ideas? We would love to hear from you.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); const form = e.target as HTMLFormElement; const formEmail = (form.elements.namedItem('email') as HTMLInputElement).value; const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value; window.location.href = `mailto:support@login.sfquizzer.com?subject=SF Quizzer Inquiry&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(formEmail)}`; }} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1.5 block">Name</label>
                  <input type="text" name="name" placeholder="Your name" className="w-full bg-gray-900/60 border border-gray-700 rounded-xl p-3 text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1.5 block">Email</label>
                  <input type="email" name="email" placeholder="you@example.com" required className="w-full bg-gray-900/60 border border-gray-700 rounded-xl p-3 text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1.5 block">Subject</label>
                <select name="subject" className="w-full bg-gray-900/60 border border-gray-700 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-transparent">
                  <option value="general">General Question</option>
                  <option value="bug">Report a Bug</option>
                  <option value="feature">Feature Request</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1.5 block">Message</label>
                <textarea name="message" rows={4} placeholder="Tell us what's on your mind..." required className="w-full bg-gray-900/60 border border-gray-700 rounded-xl p-3 text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-[1.02] transform transition-transform text-sm">
                <i className="fa-solid fa-paper-plane mr-2"></i>Send Message
              </button>
              <p className="text-gray-600 text-xs text-center">Or email us directly at support@login.sfquizzer.com</p>
            </form>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <button onClick={() => setShowSignIn(true)} className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg hover:scale-105 transform transition-transform text-lg">
              <i className="fa-solid fa-rocket mr-2"></i>Start Studying Free
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SF News page
  if (landingPage === 'news') {
    return (
      <div className="min-h-dvh bg-gray-900 text-white">
        {landingNav}
        <div className="max-w-4xl mx-auto px-4">
          <SFNewsScreen onBack={() => setLandingPage('home')} />
        </div>
      </div>
    );
  }

  // SF Careers page
  if (landingPage === 'careers') {
    return (
      <div className="min-h-dvh bg-gray-900 text-white">
        {landingNav}
        <div className="max-w-4xl mx-auto px-4">
          <SFJobsScreen onBack={() => setLandingPage('home')} />
        </div>
      </div>
    );
  }

  // Contact page
  if (landingPage === 'contact') {
    return (
      <div className="min-h-dvh bg-gray-900 text-white">
        {landingNav}
        <div className="max-w-4xl mx-auto px-4 py-10 sm:py-16">
          <div className="bg-gray-800/60 rounded-2xl border border-white/10 p-6 sm:p-8 mb-8">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-3">
                <i className="fa-solid fa-envelope text-xl text-white"></i>
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">Contact Us</h1>
              <p className="text-gray-400 text-sm">Have a question, suggestion, or just want to say hello? We would love to hear from you.</p>
            </div>

            {/* Contact info */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-900/50 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-envelope text-blue-400"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Email</p>
                  <a href="mailto:support@login.sfquizzer.com" className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors">support@login.sfquizzer.com</a>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-clock text-teal-400"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Response Time</p>
                  <p className="text-gray-300 text-sm font-semibold">Within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <form onSubmit={(e) => { e.preventDefault(); const form = e.target as HTMLFormElement; const formEmail = (form.elements.namedItem('email') as HTMLInputElement).value; const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value; window.location.href = `mailto:support@login.sfquizzer.com?subject=SF Quizzer Inquiry&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(formEmail)}`; }} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1.5 block">Name</label>
                  <input type="text" name="name" placeholder="Your name" className="w-full bg-gray-900/60 border border-gray-700 rounded-xl p-3 text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1.5 block">Email</label>
                  <input type="email" name="email" placeholder="you@example.com" required className="w-full bg-gray-900/60 border border-gray-700 rounded-xl p-3 text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1.5 block">Subject</label>
                <select name="subject" className="w-full bg-gray-900/60 border border-gray-700 rounded-xl p-3 text-white text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-transparent">
                  <option value="general">General Question</option>
                  <option value="bug">Report a Bug</option>
                  <option value="feature">Feature Request</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1.5 block">Message</label>
                <textarea name="message" rows={4} placeholder="Tell us what's on your mind..." required className="w-full bg-gray-900/60 border border-gray-700 rounded-xl p-3 text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-[1.02] transform transition-transform text-sm">
                <i className="fa-solid fa-paper-plane mr-2"></i>Send Message
              </button>
              <p className="text-gray-600 text-xs text-center">Or email us directly at support@login.sfquizzer.com</p>
            </form>
          </div>

          {/* Help topics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: 'fa-bug', label: 'Report a Bug', color: 'text-red-400', bg: 'bg-red-500/10' },
              { icon: 'fa-lightbulb', label: 'Feature Request', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
              { icon: 'fa-circle-question', label: 'General Help', color: 'text-blue-400', bg: 'bg-blue-500/10' },
              { icon: 'fa-handshake', label: 'Partnerships', color: 'text-green-400', bg: 'bg-green-500/10' },
            ].map(t => (
              <div key={t.label} className="bg-gray-800/60 rounded-xl border border-white/5 p-4 text-center">
                <div className={`w-10 h-10 rounded-xl ${t.bg} flex items-center justify-center mx-auto mb-2`}>
                  <i className={`fa-solid ${t.icon} ${t.color}`}></i>
                </div>
                <p className="text-gray-300 text-xs font-bold">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Landing page
  return (
    <div className="min-h-dvh bg-gray-900 text-white">
      {landingNav}

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

      {/* About */}
      <div id="about" className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">About SF Quizzer</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              SF Quizzer was built by Salesforce professionals, for Salesforce professionals. We know how tough certification exams can be, and we wanted to create a study tool that actually feels good to use.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Every question is mapped to official exam domains. Every explanation teaches you the "why" behind the answer. And every feature is designed to make your study time count.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Whether you are preparing for your first Salesforce certification or adding another to your collection, SF Quizzer gives you the practice and confidence you need to pass.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/60 rounded-xl border border-white/5 p-5 text-center">
              <i className="fa-solid fa-bullseye text-2xl text-blue-400 mb-2"></i>
              <p className="text-white font-bold text-sm">Exam-Focused</p>
              <p className="text-gray-500 text-xs mt-1">Questions mapped to real exam domains</p>
            </div>
            <div className="bg-gray-800/60 rounded-xl border border-white/5 p-5 text-center">
              <i className="fa-solid fa-graduation-cap text-2xl text-teal-400 mb-2"></i>
              <p className="text-white font-bold text-sm">Learn by Doing</p>
              <p className="text-gray-500 text-xs mt-1">Interactive paths with real scenarios</p>
            </div>
            <div className="bg-gray-800/60 rounded-xl border border-white/5 p-5 text-center">
              <i className="fa-solid fa-clock text-2xl text-purple-400 mb-2"></i>
              <p className="text-white font-bold text-sm">Study Anywhere</p>
              <p className="text-gray-500 text-xs mt-1">Mobile-friendly, works on any device</p>
            </div>
            <div className="bg-gray-800/60 rounded-xl border border-white/5 p-5 text-center">
              <i className="fa-solid fa-heart text-2xl text-red-400 mb-2"></i>
              <p className="text-white font-bold text-sm">Community Built</p>
              <p className="text-gray-500 text-xs mt-1">Made by the SF community, for the community</p>
            </div>
          </div>
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
      <footer className="border-t border-white/5 bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <Logo size="sm" />
                <span className="text-white font-bold">SF Quizzer</span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">Your Salesforce certification study partner. Practice smarter, pass faster.</p>
              <div className="mt-3">
                <StockTicker />
              </div>
            </div>

            {/* Study */}
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Study</h4>
              <ul className="space-y-2">
                <li><a href="/cert-prep" className="text-gray-400 hover:text-white text-sm transition-colors">Cert Prep Pro</a></li>
                <li><a href="/quiz" className="text-gray-400 hover:text-white text-sm transition-colors">Quick Quiz</a></li>
                <li><a href="/leaderboard" className="text-gray-400 hover:text-white text-sm transition-colors">Leaderboard</a></li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Community</h4>
              <ul className="space-y-2">
                <li><a href="/news" className="text-gray-400 hover:text-white text-sm transition-colors">SF News</a></li>
                <li><a href="/jobs" className="text-gray-400 hover:text-white text-sm transition-colors">Salesforce Careers</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">From the Founder</a></li>
                <li><a href="/testimonials" className="text-gray-400 hover:text-white text-sm transition-colors">Testimonials</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Support</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a></li>
                <li><a href="/help" className="text-gray-400 hover:text-white text-sm transition-colors">How to Use</a></li>
                <li><a href="/feedback" className="text-gray-400 hover:text-white text-sm transition-colors">Give Feedback</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-600 text-xs">Built for the Salesforce community. Not affiliated with Salesforce, Inc.</p>
            <p className="text-gray-600 text-xs">support@login.sfquizzer.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthScreen;
