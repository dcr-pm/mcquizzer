import React, { useState, useEffect } from 'react';

interface Job {
  title: string;
  company: string;
  location: string;
  url: string;
  publishedAt: string;
  source: string;
}

interface SFJobsScreenProps {
  onBack: () => void;
}

const SFJobsScreen: React.FC<SFJobsScreenProps> = ({ onBack }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/.netlify/functions/sf-jobs');
        const data = await res.json();
        if (data.jobs) setJobs(data.jobs);
      } catch (err: any) {
        setError('Unable to load job listings right now.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const timeAgo = (dateStr: string) => {
    if (!dateStr) return '';
    const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return '1 day ago';
    if (days < 30) return `${days} days ago`;
    const weeks = Math.floor(days / 7);
    return `${weeks}w ago`;
  };

  return (
    <div className="py-6 sm:py-8 animate-fade-in-up max-w-3xl mx-auto">
      <button onClick={onBack} className="text-gray-400 hover:text-white text-sm mb-6 transition-colors">
        <i className="fa-solid fa-arrow-left mr-2"></i>Back
      </button>

      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
          <i className="fa-solid fa-briefcase text-3xl text-white"></i>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Salesforce Jobs</h1>
        <p className="text-gray-400 text-sm">Latest Salesforce opportunities, updated in near real-time</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-green-400 mb-4"></i>
          <p className="text-gray-400">Loading jobs...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm text-center">
          <i className="fa-solid fa-triangle-exclamation mr-2"></i>{error}
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-white/20 p-12 text-center">
          <i className="fa-solid fa-briefcase text-4xl text-gray-600 mb-4"></i>
          <h3 className="text-lg font-bold text-white mb-2">No Listings Found</h3>
          <p className="text-gray-400 text-sm">Check back soon for new Salesforce opportunities.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job, i) => (
            <a
              key={i}
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-800/80 backdrop-blur-md rounded-xl border border-white/10 p-5 hover:border-green-500/30 hover:bg-gray-800 transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm sm:text-base group-hover:text-green-300 transition-colors mb-1 truncate">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                    <span>
                      <i className="fa-solid fa-building mr-1 text-gray-500"></i>{job.company}
                    </span>
                    {job.location && (
                      <span>
                        <i className="fa-solid fa-location-dot mr-1 text-gray-500"></i>{job.location}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm flex-shrink-0 mt-1">
                  Apply <i className="fa-solid fa-arrow-up-right-from-square ml-1"></i>
                </span>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                <span>{job.source}</span>
                {job.publishedAt && <span>{timeAgo(job.publishedAt)}</span>}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default SFJobsScreen;
