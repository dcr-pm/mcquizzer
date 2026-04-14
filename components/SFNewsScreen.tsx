import React, { useState, useEffect } from 'react';
import { NewsItem } from '../types.ts';

interface SFNewsScreenProps {
  onBack: () => void;
  backLabel?: string;
}

const SFNewsScreen: React.FC<SFNewsScreenProps> = ({ onBack, backLabel = 'Back to Dashboard' }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/.netlify/functions/sf-news');
        if (!response.ok) throw new Error('Failed to fetch news');
        const data = await response.json();
        setNews(data.articles || []);
      } catch (err: any) {
        setError('Unable to load news right now. Please try again later.');
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  const timeAgo = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Just now';
  };

  return (
    <div className="py-6 sm:py-8 animate-fade-in-up max-w-3xl mx-auto">
      <button onClick={onBack} className="text-gray-400 hover:text-white text-sm mb-6 transition-colors">
        <i className="fa-solid fa-arrow-left mr-2"></i>{backLabel}
      </button>

      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mx-auto mb-4">
          <i className="fa-solid fa-newspaper text-3xl text-white"></i>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Salesforce News</h1>
        <p className="text-gray-400 text-sm">Latest happenings in the Salesforce ecosystem</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-400 mb-4"></i>
          <p className="text-gray-400">Loading latest news...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/20 border border-red-500/50 text-red-300 text-sm p-6 rounded-xl text-center">
          <i className="fa-solid fa-circle-exclamation text-2xl mb-2"></i>
          <p>{error}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-800/80 backdrop-blur-md rounded-xl border border-white/10 p-5 hover:border-blue-500/30 hover:bg-gray-800 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fa-solid fa-bolt text-blue-400"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm sm:text-base group-hover:text-blue-300 transition-colors leading-snug mb-3">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span><i className="fa-solid fa-globe mr-1"></i>{item.source}</span>
                    <span><i className="fa-solid fa-clock mr-1"></i>{timeAgo(item.publishedAt)}</span>
                    <span className="ml-auto text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more <i className="fa-solid fa-arrow-up-right-from-square ml-1"></i>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
          {news.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <i className="fa-solid fa-newspaper text-3xl mb-4"></i>
              <p>No news articles found right now.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SFNewsScreen;
