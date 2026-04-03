import React, { useState, useEffect, useCallback, useRef } from 'react';

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

const CLOUDS = [
  { id: 'all', label: 'All Clouds', icon: 'fa-cloud' },
  { id: 'Marketing Cloud', label: 'Marketing Cloud', icon: 'fa-envelope' },
  { id: 'Sales Cloud', label: 'Sales Cloud', icon: 'fa-chart-line' },
  { id: 'Service Cloud', label: 'Service Cloud', icon: 'fa-headset' },
  { id: 'Data Cloud', label: 'Data Cloud', icon: 'fa-database' },
  { id: 'Commerce Cloud', label: 'Commerce Cloud', icon: 'fa-cart-shopping' },
  { id: 'Experience Cloud', label: 'Experience Cloud', icon: 'fa-globe' },
  { id: 'Revenue Cloud', label: 'Revenue Cloud', icon: 'fa-money-bill-trend-up' },
  { id: 'Health Cloud', label: 'Health Cloud', icon: 'fa-heart-pulse' },
  { id: 'Financial Services Cloud', label: 'Financial Services', icon: 'fa-landmark' },
];

const ROLES = [
  { id: 'all', label: 'All Roles', icon: 'fa-users' },
  { id: 'Admin', label: 'Admin', icon: 'fa-gear' },
  { id: 'Developer', label: 'Developer', icon: 'fa-code' },
  { id: 'Architect', label: 'Architect', icon: 'fa-sitemap' },
  { id: 'Consultant', label: 'Consultant', icon: 'fa-comments' },
  { id: 'Business Analyst', label: 'Business Analyst', icon: 'fa-magnifying-glass-chart' },
  { id: 'Project Manager', label: 'Project Manager', icon: 'fa-diagram-project' },
  { id: 'Account Manager', label: 'Account Manager', icon: 'fa-handshake' },
  { id: 'Solution Engineer', label: 'Solution Engineer', icon: 'fa-screwdriver-wrench' },
  { id: 'Data Analyst', label: 'Data Analyst', icon: 'fa-chart-pie' },
  { id: 'Marketing Specialist', label: 'Marketing Specialist', icon: 'fa-bullhorn' },
  { id: 'Technical Lead', label: 'Technical Lead', icon: 'fa-user-tie' },
  { id: 'Scrum Master', label: 'Scrum Master', icon: 'fa-arrows-spin' },
  { id: 'QA Tester', label: 'QA / Tester', icon: 'fa-bug' },
  { id: 'Other', label: 'Other', icon: 'fa-ellipsis' },
];

const LOCATIONS = [
  { id: '', label: 'Any Location' },
  { id: 'Remote', label: 'Remote' },
  { id: 'New York', label: 'New York' },
  { id: 'San Francisco', label: 'San Francisco' },
  { id: 'Chicago', label: 'Chicago' },
  { id: 'Austin', label: 'Austin' },
  { id: 'Toronto', label: 'Toronto' },
  { id: 'London', label: 'London' },
  { id: 'India', label: 'India' },
];

const SFJobsScreen: React.FC<SFJobsScreenProps> = ({ onBack }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCloud, setSelectedCloud] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchJobs = useCallback(async (cloud: string, role: string, location: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (cloud !== 'all') params.set('cloud', cloud);
      if (role !== 'all') params.set('role', role);
      if (location) params.set('location', location);
      const qs = params.toString();
      const res = await fetch(`/.netlify/functions/sf-jobs${qs ? `?${qs}` : ''}`);
      const data = await res.json();
      if (data.error && (!data.jobs || data.jobs.length === 0)) {
        const msg = data.error.includes('429')
          ? 'Too many requests. Please wait a moment and try again.'
          : data.error;
        setError(msg);
      }
      setJobs(data.jobs || []);
    } catch {
      setError('Unable to load job listings right now.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchJobs(selectedCloud, selectedRole, selectedLocation);
    }, 500);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [selectedCloud, selectedRole, selectedLocation, fetchJobs]);

  const handleCloudChange = (cloud: string) => {
    setSelectedCloud(cloud);
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  const handleLocationChange = (loc: string) => {
    setSelectedLocation(loc);
    setCustomLocation('');
  };

  const handleCustomLocationSearch = () => {
    if (customLocation.trim()) {
      setSelectedLocation(customLocation.trim());
    }
  };

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

      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
          <i className="fa-solid fa-briefcase text-3xl text-white"></i>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Salesforce Jobs</h1>
        <p className="text-gray-400 text-sm">Latest opportunities from LinkedIn, Indeed, Glassdoor and more</p>
        <div className="mt-3 bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2 inline-block">
          <p className="text-blue-300 text-xs"><i className="fa-solid fa-circle-info mr-1"></i>These listings are for awareness of current openings. We recommend visiting the company website directly to apply.</p>
        </div>
      </div>

      {/* Cloud filter */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">Salesforce Cloud</p>
        <div className="flex flex-wrap gap-2">
          {CLOUDS.map((cloud) => (
            <button
              key={cloud.id}
              onClick={() => handleCloudChange(cloud.id)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                selectedCloud === cloud.id
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-700 text-gray-400 hover:text-white'
              }`}
            >
              <i className={`fa-solid ${cloud.icon} mr-1`}></i>{cloud.label}
            </button>
          ))}
        </div>
      </div>

      {/* Role filter */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">Role</p>
        <div className="flex flex-wrap gap-2">
          {ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleChange(role.id)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                selectedRole === role.id
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-700 text-gray-400 hover:text-white'
              }`}
            >
              <i className={`fa-solid ${role.icon} mr-1`}></i>{role.label}
            </button>
          ))}
        </div>
      </div>

      {/* Location filter */}
      <div className="mb-6">
        <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">Location</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => handleLocationChange(loc.id)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                selectedLocation === loc.id && !customLocation
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-700 text-gray-400 hover:text-white'
              }`}
            >
              {loc.id && <i className="fa-solid fa-location-dot mr-1"></i>}{loc.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={customLocation}
            onChange={(e) => setCustomLocation(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCustomLocationSearch()}
            placeholder="Or type a city, state, or country..."
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            onClick={handleCustomLocationSearch}
            disabled={!customLocation.trim()}
            className="px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-green-400 mb-4"></i>
          <p className="text-gray-400">Searching jobs...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm text-center">
          <i className="fa-solid fa-triangle-exclamation mr-2"></i>{error}
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-white/20 p-12 text-center">
          <i className="fa-solid fa-briefcase text-4xl text-gray-600 mb-4"></i>
          <h3 className="text-lg font-bold text-white mb-2">No Listings Found</h3>
          <p className="text-gray-400 text-sm">Try a different cloud or location filter.</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-gray-500 mb-3">{jobs.length} job{jobs.length !== 1 ? 's' : ''} found</p>
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
                    <h3 className="text-white font-bold text-sm sm:text-base group-hover:text-green-300 transition-colors mb-1">
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
        </>
      )}
    </div>
  );
};

export default SFJobsScreen;
