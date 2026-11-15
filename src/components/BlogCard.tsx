
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Clock } from 'lucide-react';
import type { ArticleCardData } from '../content/types';

export const BlogCard: React.FC<{ post: ArticleCardData }> = ({ post }) => (
  <Link to={post.slug} className="group flex flex-col bg-brand-surface border border-line rounded-xl overflow-hidden hover:border-brand-cyan transition-all duration-300">
    {post.image && <div className="w-full h-[220px] overflow-hidden bg-surface">
      <img 
        src={post.image} 
        alt={post.imageAlt || post.title}
        loading="lazy"
        className="block w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
    </div>}
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-link font-mono text-xs uppercase tracking-wider">{post.category}</span>
        <span className="text-subtle font-mono text-xs">•</span>
        <span className="text-secondary font-mono text-xs">{post.readTime}</span>
      </div>
      <h2 className="text-xl font-bold text-ink mb-3 group-hover:text-link transition-colors line-clamp-2">
        {post.title}
      </h2>
      <p className="text-secondary text-sm mb-6 line-clamp-2 flex-grow">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-line">
        <div className="flex flex-col">
          <span className="text-secondary text-xs font-medium">{post.author}</span>
          <span className="text-subtle text-xs">{post.date}</span>
        </div>
        <span className="text-link text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Read Article <ArrowRight size={16} />
        </span>
      </div>
    </div>
  </Link>
);

