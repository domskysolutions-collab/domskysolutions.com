
import React, { useEffect } from 'react';
import { featuredTools } from '../data/navigation';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, ExternalLink, PenTool, Palette, Code, Megaphone, Zap, Video, Mic, FlaskConical } from 'lucide-react';
import { toolReviews } from '../data/toolReviews';
import { ConvertKitForm } from '../components/ConvertKitForm';

export const ToolsPage = () => {
  useEffect(() => {
    document.title = "AI Tool Reviews | domskysolutions.com";
  }, []);

  return (
    <div className="bg-brand-bg min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">AI Tool Reviews</h1>
          <p className="text-xl text-gray-400">Tested. Rated. Honest.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-surface border border-gray-800 p-6 flex flex-col h-full transition-all duration-300 glow-cyan-hover group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 bg-gray-800 text-gray-300 text-xs font-mono uppercase tracking-wider">
                  {tool.category}
                </span>
                <div className="flex items-center gap-1 text-brand-amber text-sm font-mono">
                  <Star size={14} fill="currentColor" /> {tool.rating}
                </div>
              </div>
              <h3 className="text-2xl font-bold font-mono mb-3 group-hover:text-brand-cyan transition-colors">{tool.name}</h3>
              <p className="text-gray-400 mb-6 flex-grow text-sm leading-relaxed">{tool.desc}</p>
              <Link to={`/tools/${tool.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-brand-cyan transition-colors mt-auto">
                Read Review <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
