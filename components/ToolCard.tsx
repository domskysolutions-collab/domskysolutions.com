
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';

export const ToolReviewCard = ({ name, desc, to, category }: { name: string, desc: string, to: string, category?: string }) => {
  const categoryColors: Record<string, string> = {
    'Writing': 'border-l-[#00F5D4]',
    'Research': 'border-l-blue-500',
    'Design': 'border-l-purple-500',
    'Coding': 'border-l-green-500',
    'Productivity': 'border-l-[#F5A623]',
    'Video': 'border-l-coral-500',
    'Website': 'border-l-teal-500',
  };

  // coral-500 is not a default tailwind color, let's use a hex or rose-500
  const categoryColorsSafe: Record<string, string> = {
    'Writing': 'border-l-[#00F5D4]',
    'Research': 'border-l-blue-500',
    'Design': 'border-l-purple-500',
    'Coding': 'border-l-green-500',
    'Productivity': 'border-l-[#F5A623]',
    'Video': 'border-l-[#FF7F50]', // coral
    'Website': 'border-l-teal-500',
  };

  const borderClass = category && categoryColorsSafe[category] ? `${categoryColorsSafe[category]} border-l-4` : 'border-l-gray-800 border-l';

  return (
    <div className={`my-6 p-4 border-y border-r border-gray-800 ${borderClass} bg-brand-surface rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:border-brand-cyan/50 transition-colors`}>
      <div>
        <div className="font-bold font-mono text-white mb-1 text-[14px]">{name}</div>
        <div className="text-[14px] text-gray-400">{desc}</div>
      </div>
      <Link to={to} className="shrink-0 text-[14px] font-bold text-brand-cyan group-hover:text-white transition-colors flex items-center gap-2">
        Read Review <ArrowRight size={16} />
      </Link>
    </div>
  );
};
