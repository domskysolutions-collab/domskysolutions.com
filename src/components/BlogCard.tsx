
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Clock } from 'lucide-react';

export const BlogCard: React.FC<{ post: any }> = ({ post }) => (
  <Link to={post.slug} className="group flex flex-col bg-brand-surface border border-gray-800 rounded-xl overflow-hidden hover:border-brand-cyan/50 transition-all duration-300">
    <div className="w-full h-52 overflow-hidden bg-gray-950">
      <img 
        src={post.image} 
        alt={post.title} 
        className="block w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-brand-cyan font-mono text-xs uppercase tracking-wider">{post.category}</span>
        <span className="text-gray-500 font-mono text-xs">•</span>
        <span className="text-gray-400 font-mono text-xs">{post.readTime}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors line-clamp-2">
        {post.title}
      </h3>
      <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-grow">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
        <div className="flex flex-col">
          <span className="text-gray-300 text-xs font-medium">{post.author}</span>
          <span className="text-gray-500 text-xs">{post.date}</span>
        </div>
        <span className="text-brand-cyan text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Read Article <ArrowRight size={16} />
        </span>
      </div>
    </div>
  </Link>
);
