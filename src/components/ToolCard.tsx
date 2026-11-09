
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';

export const ToolReviewCard = ({ name, desc, to, category }: { name: string, desc: string, to: string, category?: string }) => {
  const categoryColors: Record<string, string> = {
    'Writing': 'border-l-line',
    'Research': 'border-l-line',
    'Design': 'border-l-line',
    'Coding': 'border-l-line',
    'Productivity': 'border-l-line',
    'Video': 'border-l-line',
    'Website': 'border-l-line',
  };

  // Categories use neutral rules; labels carry the meaning.
  const categoryColorsSafe: Record<string, string> = {
    'Writing': 'border-l-line',
    'Research': 'border-l-line',
    'Design': 'border-l-line',
    'Coding': 'border-l-line',
    'Productivity': 'border-l-line',
    'Video': 'border-l-line',
    'Website': 'border-l-line',
  };

  const borderClass = category && categoryColorsSafe[category] ? `${categoryColorsSafe[category]} border-l-4` : 'border-l-line border-l';

  return (
    <div className={`my-6 p-4 border-y border-r border-line ${borderClass} bg-brand-surface rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:border-brand-cyan transition-colors`}>
      <div>
        <div className="font-bold font-mono text-ink mb-1 text-[14px]">{name}</div>
        <div className="text-[14px] text-secondary">{desc}</div>
      </div>
      <Link to={to} className="shrink-0 text-[14px] font-bold text-link group-hover:text-ink transition-colors flex items-center gap-2">
        Read {name} review <ArrowRight size={16} />
      </Link>
    </div>
  );
};
