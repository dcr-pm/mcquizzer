import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext.tsx';
import { updateProfile } from '../lib/database.ts';

interface ProfileEditScreenProps {
  onBack: () => void;
}

const ProfileEditScreen: React.FC<ProfileEditScreenProps> = ({ onBack }) => {
  const { user, profile, refreshProfile } = useAuth();
  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !displayName.trim()) return;

    setSaving(true);
    setError(null);

    const result = await updateProfile(user.id, { display_name: displayName.trim() });
    if (result) {
      await refreshProfile();
      setSaved(true);
      setTimeout(() => onBack(), 1200);
    } else {
      setError('Failed to update profile. Please try again.');
    }
    setSaving(false);
  };

  return (
    <div className="py-6 sm:py-8 animate-fade-in-up max-w-md mx-auto">
      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBack}
            className="bg-gray-700/80 hover:bg-gray-600/80 text-white h-9 w-9 flex items-center justify-center rounded-full transition-colors"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Edit Profile</h2>
        </div>

        {saved ? (
          <div className="text-center py-6">
            <i className="fa-solid fa-check-circle text-4xl text-green-400 mb-3"></i>
            <p className="text-white font-bold text-lg">Profile Updated!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-300 text-sm p-3 rounded-md mb-4">
                <i className="fa-solid fa-circle-exclamation mr-2"></i>{error}
              </div>
            )}

            <label className="block text-sm font-semibold text-gray-300 mb-2">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your display name"
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              required
              maxLength={20}
            />
            <p className="text-xs text-gray-500 mb-6">This is how you'll appear on the leaderboard.</p>

            <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full bg-gray-900/50 border border-gray-700 rounded-md p-3 text-gray-500 mb-6 cursor-not-allowed"
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || !displayName.trim()}
                className="flex-1 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 rounded-md shadow-lg hover:scale-105 transform transition-transform disabled:opacity-50 disabled:hover:scale-100"
              >
                {saving ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Saving...</> : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileEditScreen;
