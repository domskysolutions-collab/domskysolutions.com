
import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { BLOG_POSTS } from '../data/blogPosts';
import { BlogCard } from '../components/BlogCard';
import { ConvertKitForm } from '../components/ConvertKitForm';

export const BlogIndex = () => {
  useEffect(() => {
    document.title = "AI Insights & News | Domsky Solutions";
  }, []);

  return (
    <div className="bg-brand-bg min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-6">
            AI Insights & News
          </h1>
          <p className="text-xl text-gray-400">
            Deep dives, tool comparisons and industry analysis for builders and founders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {BLOG_POSTS.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
