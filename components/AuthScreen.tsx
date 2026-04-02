import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext.tsx';

type AuthStep = 'email' | 'verify';

const AuthScreen: React.FC = () => {
  const { signInWithOtp, verifyOtp, configured } = useAuth();
  const [step, setStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
          <i className="fa-solid fa-cloud text-4xl text-[#0F79AF] mb-4"></i>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Setup Required</h2>
          <p className="text-gray-400 text-sm sm:text-base mb-4">
            Supabase is not configured yet. Add <strong className="text-white">VITE_SUPABASE_URL</strong> and <strong className="text-white">VITE_SUPABASE_ANON_KEY</strong> to your environment variables.
          </p>
          <p className="text-gray-500 text-xs">See the setup instructions in the README or supabase-setup.sql.</p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700 animate-fade-in-up w-full max-w-sm">
        <div className="text-center mb-6">
          <i className="fa-solid fa-cloud text-4xl text-[#0F79AF] mb-2"></i>
          <h2 className="text-xl sm:text-2xl font-bold text-white">SF Quizzer</h2>
          <p className="text-gray-400 text-sm mt-1">Test your Salesforce knowledge</p>
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

      </div>
    </div>
  );
};

export default AuthScreen;
