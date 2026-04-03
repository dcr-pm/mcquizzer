import React from 'react';
import { useAuth } from '../lib/AuthContext.tsx';
import StockTicker from './StockTicker.tsx';

interface HomeScreenProps {
  onStartQuiz: () => void;
  onCertPrep: () => void;
  onSFNews: () => void;
  onBlog: () => void;
  onHelp: () => void;
  onDashboard: () => void;
  onLeaderboard: () => void;
  onSFJobs: () => void;
  onTestimonials: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartQuiz, onCertPrep, onSFNews, onBlog, onHelp, onDashboard, onLeaderboard, onSFJobs, onTestimonials }) => {
  const { profile } = useAuth();

  return (
    <div className="relative py-6 sm:py-10 animate-fade-in-up max-w-4xl mx-auto">
      {/* Knowledge-themed background */}
      <div className="fixed inset-0 -z-10 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 600px 600px at 15% 20%, rgba(59,130,246,0.08) 0%, transparent 70%),
          radial-gradient(ellipse 500px 500px at 85% 15%, rgba(99,102,241,0.07) 0%, transparent 70%),
          radial-gradient(ellipse 400px 400px at 50% 60%, rgba(20,184,166,0.06) 0%, transparent 70%),
          radial-gradient(ellipse 350px 350px at 80% 75%, rgba(139,92,246,0.05) 0%, transparent 70%),
          radial-gradient(ellipse 300px 300px at 20% 80%, rgba(6,182,212,0.06) 0%, transparent 70%),
          url("https://www.transparenttextures.com/patterns/groovepaper.png")
        `,
      }} />
      {/* Welcome */}
      <div className="text-center mb-8">
        <i className="fa-solid fa-cloud text-5xl text-[#0F79AF] mb-3"></i>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">SF Quizzer</h1>
        <p className="text-gray-400">Your Salesforce learning hub</p>
        {profile && (
          <p className="text-gray-500 text-sm mt-2">Welcome back, <span className="text-blue-400">{profile.display_name}</span></p>
        )}
      </div>

      {/* Stock ticker */}
      <div className="flex justify-center mb-8 sm:hidden">
        <StockTicker />
      </div>

      {/* Main Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Take the Quiz */}
        <button
          onClick={onStartQuiz}
          className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8 text-left hover:border-blue-500/30 hover:bg-gray-800 transition-all group"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center mb-4">
            <i className="fa-solid fa-play text-2xl text-white"></i>
          </div>
          <h2 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-2">Take the Quiz</h2>
          <p className="text-gray-400 text-sm">Test your Salesforce knowledge across multiple categories. Earn points, climb the leaderboard, and unlock badges.</p>
        </button>

        {/* Cert Prep Pro */}
        <button
          onClick={onCertPrep}
          className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8 text-left hover:border-cyan-500/30 hover:bg-gray-800 transition-all group"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
            <i className="fa-solid fa-certificate text-2xl text-white"></i>
          </div>
          <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">Cert Prep Pro</h2>
          <p className="text-gray-400 text-sm">Study quizzes, flashcards, and timed practice exams for Salesforce certifications. Everything you need in one place.</p>
          {!profile?.is_premium && (
            <span className="inline-block mt-3 text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">
              <i className="fa-solid fa-lock mr-1"></i>Premium
            </span>
          )}
        </button>

        {/* SF News */}
        <button
          onClick={onSFNews}
          className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8 text-left hover:border-indigo-500/30 hover:bg-gray-800 transition-all group"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mb-4">
            <i className="fa-solid fa-newspaper text-2xl text-white"></i>
          </div>
          <h2 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">SF News</h2>
          <p className="text-gray-400 text-sm">Stay up to date with the latest happenings in the Salesforce ecosystem, updated in real time.</p>
        </button>

        {/* From the Founder */}
        <button
          onClick={onBlog}
          className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8 text-left hover:border-purple-500/30 hover:bg-gray-800 transition-all group"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
            <i className="fa-solid fa-pen-fancy text-2xl text-white"></i>
          </div>
          <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2">From the Founder</h2>
          <p className="text-gray-400 text-sm">Thoughts, stories, and insights from the creator of SF Quizzer.</p>
        </button>

        {/* SF Jobs */}
        <button
          onClick={onSFJobs}
          className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8 text-left hover:border-green-500/30 hover:bg-gray-800 transition-all group"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mb-4">
            <i className="fa-solid fa-briefcase text-2xl text-white"></i>
          </div>
          <h2 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors mb-2">Salesforce Jobs</h2>
          <p className="text-gray-400 text-sm">Browse the latest Salesforce job opportunities. Updated in near real-time from top job boards.</p>
        </button>

        {/* Testimonials */}
        <button
          onClick={onTestimonials}
          className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8 text-left hover:border-amber-500/30 hover:bg-gray-800 transition-all group"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mb-4">
            <i className="fa-solid fa-comment-dots text-2xl text-white"></i>
          </div>
          <h2 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2">Testimonials</h2>
          <p className="text-gray-400 text-sm">See what the community is saying about SF Quizzer. Share your own experience too!</p>
        </button>
      </div>

      {/* Secondary Actions */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={onDashboard}
          className="bg-gray-800/80 backdrop-blur-md rounded-xl border border-white/10 p-4 text-center hover:border-blue-500/30 hover:bg-gray-800 transition-all group"
        >
          <i className="fa-solid fa-gauge text-xl text-blue-400 mb-2"></i>
          <p className="text-white text-sm font-semibold group-hover:text-blue-300 transition-colors">Dashboard</p>
        </button>
        <button
          onClick={onLeaderboard}
          className="bg-gray-800/80 backdrop-blur-md rounded-xl border border-white/10 p-4 text-center hover:border-yellow-500/30 hover:bg-gray-800 transition-all group"
        >
          <i className="fa-solid fa-trophy text-xl text-yellow-400 mb-2"></i>
          <p className="text-white text-sm font-semibold group-hover:text-yellow-300 transition-colors">Leaderboard</p>
        </button>
        <button
          onClick={onHelp}
          className="bg-gray-800/80 backdrop-blur-md rounded-xl border border-white/10 p-4 text-center hover:border-green-500/30 hover:bg-gray-800 transition-all group"
        >
          <i className="fa-solid fa-circle-question text-xl text-green-400 mb-2"></i>
          <p className="text-white text-sm font-semibold group-hover:text-green-300 transition-colors">How to Use</p>
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
