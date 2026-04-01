import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext.tsx';

const AuthScreen: React.FC = () => {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isSignUp) {
      if (!displayName.trim()) {
        setError('Please enter a display name.');
        setLoading(false);
        return;
      }
      const { error: err } = await signUp(email, password, displayName.trim());
      if (err) {
        setError(err);
      } else {
        setConfirmationSent(true);
      }
    } else {
      const { error: err } = await signIn(email, password);
      if (err) setError(err);
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    const { error: err } = await signInWithGoogle();
    if (err) setError(err);
  };

  if (confirmationSent) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
        <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700 animate-fade-in-up w-full max-w-sm text-center">
          <i className="fa-solid fa-envelope-circle-check text-4xl text-green-400 mb-4"></i>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Check Your Email</h2>
          <p className="text-gray-400 text-sm sm:text-base mb-6">
            We've sent a confirmation link to <strong className="text-white">{email}</strong>. Click it to activate your account.
          </p>
          <button
            onClick={() => { setConfirmationSent(false); setIsSignUp(false); }}
            className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 rounded-md shadow-lg hover:scale-105 transform transition-transform duration-300"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700 animate-fade-in-up w-full max-w-sm">
        <div className="text-center mb-6">
          <i className="fa-solid fa-cloud text-4xl text-[#0F79AF] mb-2"></i>
          <h2 className="text-xl sm:text-2xl font-bold text-white">MarketingCloud Quizzer</h2>
          <p className="text-gray-400 text-sm mt-1">Test your SFMC knowledge</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex mb-6 bg-gray-900 rounded-lg p-1">
          <button
            onClick={() => { setIsSignUp(false); setError(null); }}
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${!isSignUp ? 'bg-gradient-to-r from-blue-500 to-teal-400 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsSignUp(true); setError(null); }}
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${isSignUp ? 'bg-gradient-to-r from-blue-500 to-teal-400 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 text-sm p-3 rounded-md mb-4">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>{error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display Name"
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              required
              maxLength={20}
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            required
            minLength={6}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 rounded-md shadow-lg hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? (
              <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Please wait...</>
            ) : (
              isSignUp ? "Create Account" : "Sign In"
            )}
          </button>
        </form>

        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-600"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white text-gray-800 font-bold py-3 rounded-md shadow-lg hover:scale-105 transform transition-transform duration-300 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default AuthScreen;
