import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types.ts';
import { supabase, isSupabaseConfigured } from '../lib/supabase.ts';

interface BlogScreenProps {
  onBack: () => void;
}

const BlogScreen: React.FC<BlogScreenProps> = ({ onBack }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (data) setPosts(data as BlogPost[]);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Detail view
  if (selectedPost) {
    return (
      <div className="py-6 sm:py-8 animate-fade-in-up max-w-3xl mx-auto">
        <button onClick={() => setSelectedPost(null)} className="text-gray-400 hover:text-white text-sm mb-6 transition-colors">
          <i className="fa-solid fa-arrow-left mr-2"></i>Back to Posts
        </button>

        <article className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-10">
          <div className="mb-6">
            <p className="text-blue-400 text-xs mb-3">
              <i className="fa-solid fa-calendar mr-1"></i>{formatDate(selectedPost.published_at)}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {selectedPost.title}
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-sm font-bold text-white">
                {selectedPost.author.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{selectedPost.author}</p>
                <p className="text-gray-500 text-xs">Founder, SF Quizzer</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <div
              className="text-gray-300 leading-relaxed space-y-4"
              style={{ fontSize: '1rem', lineHeight: '1.8' }}
            >
              {selectedPost.content.split('\n\n').map((paragraph, i) => (
                <p key={i}>
                  {paragraph.split('\n').map((line, j, arr) => (
                    <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </article>
      </div>
    );
  }

  // List view
  return (
    <div className="py-6 sm:py-8 animate-fade-in-up max-w-3xl mx-auto">
      <button onClick={onBack} className="text-gray-400 hover:text-white text-sm mb-6 transition-colors">
        <i className="fa-solid fa-arrow-left mr-2"></i>Back
      </button>

      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
          <i className="fa-solid fa-pen-fancy text-3xl text-white"></i>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          From the Founder
        </h1>
        <p className="text-gray-400 text-sm">Thoughts, stories, and insights from the creator of SF Quizzer</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-purple-400 mb-4"></i>
          <p className="text-gray-400">Loading posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-white/20 p-12 text-center">
          <i className="fa-solid fa-pen-to-square text-4xl text-gray-600 mb-4"></i>
          <h3 className="text-lg font-bold text-white mb-2">Coming Soon</h3>
          <p className="text-gray-400 text-sm">The first blog post is on its way. Stay tuned!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <button
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="w-full text-left bg-gray-800/80 backdrop-blur-md rounded-xl border border-white/10 p-6 hover:border-purple-500/30 hover:bg-gray-800 transition-all group"
            >
              <p className="text-purple-400 text-xs mb-2">
                <i className="fa-solid fa-calendar mr-1"></i>{formatDate(post.published_at)}
              </p>
              <h3 className="text-white font-bold text-lg sm:text-xl group-hover:text-purple-300 transition-colors mb-2">
                {post.title}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                <span>{post.author}</span>
                <span className="ml-auto text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read more <i className="fa-solid fa-arrow-right ml-1"></i>
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogScreen;
