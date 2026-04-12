
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Check, ChevronRight, Star, ExternalLink, TrendingUp, Clock, Target, Zap, Shield, Sparkles } from 'lucide-react';

export const Money = ({ children }: { children: React.ReactNode }) => (
  <span className="font-bold text-[1.1em] text-white">{children}</span>
);
export const BeforeAfter = ({ before, after, saving }: { before: React.ReactNode, after: React.ReactNode, saving: string }) => (
  <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="p-5 bg-red-950/20 border border-red-900/30 rounded-lg">
      <div className="text-red-400 font-mono text-sm font-bold mb-2 uppercase tracking-wider">Before</div>
      <div className="text-gray-300">{before}</div>
    </div>
    <div className="p-5 bg-green-950/20 border border-green-900/30 rounded-lg relative">
      <div className="text-green-400 font-mono text-sm font-bold mb-2 uppercase tracking-wider">After</div>
      <div className="text-gray-300">{after}</div>
      <div className="absolute -top-3 -right-3 bg-brand-cyan text-brand-bg font-bold font-mono text-xs px-3 py-1 rounded-full shadow-lg">
        Save {saving}
      </div>
    </div>
  </div>
);
export const SectionDivider = () => (
  <hr className="my-12 border-t border-gray-800" />
);
export const H2 = ({ children, id }: { children: React.ReactNode, id?: string }) => (
  <h2 id={id} className="text-[28px] font-bold font-inter text-brand-cyan mt-16 mb-6">{children}</h2>
);
export const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-[20px] font-semibold font-inter text-brand-amber mt-10 mb-4">{children}</h3>
);
export const CalloutTip = ({ children }: { children: React.ReactNode }) => (
  <div className="my-8 p-6 bg-brand-surface border-l-4 border-brand-amber text-[15px] text-gray-300 italic">
    {children}
  </div>
);
export const Step = ({ number, title, children }: { number: string, title: string, children: React.ReactNode }) => (
  <div className="my-8 flex gap-6">
    <div className="shrink-0 w-12 h-12 rounded-full bg-brand-amber/10 border border-brand-amber/30 flex items-center justify-center text-brand-amber font-bold font-mono text-xl">
      {number}
    </div>
    <div>
      <div className="font-bold text-white text-lg mb-2">{title}</div>
      <div className="text-gray-300">{children}</div>
    </div>
  </div>
);
export const PullQuote = ({ children }: { children: React.ReactNode }) => (
  <div className="my-10 pl-6 py-6 pr-6 border-l-4 border-brand-cyan bg-brand-surface rounded-r-lg">
    <p className="text-[18px] md:text-[22px] font-serif italic text-white leading-relaxed m-0">
      {children}
    </p>
  </div>
);
export const StatCard = ({ icon: Icon, title, stat }: { icon: any, title: string, stat: string }) => (
  <div className="bg-brand-surface border border-gray-800 hover:border-brand-cyan/50 transition-colors rounded-xl p-6 flex flex-col items-center text-center group">
    <div className="w-12 h-12 bg-brand-bg rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Icon size={24} className="text-brand-cyan" />
    </div>
    <div className="text-3xl font-bold font-mono text-brand-amber mb-2">{stat}</div>
    <div className="text-sm font-bold font-mono text-gray-300 uppercase tracking-wider">{title}</div>
  </div>
);
export const SavingsChart = () => {
  const data = [
    { name: 'Writing', before: 230, after: 20 },
    { name: 'Research', before: 45, after: 20 },
    { name: 'Design', before: 68, after: 30 },
    { name: 'Development', before: 300, after: 20 },
    { name: 'Productivity', before: 31, after: 26 },
    { name: 'Video', before: 150, after: 24 },
    { name: 'Website', before: 229, after: 20 },
  ];

  const maxVal = 300;

  return (
    <div className="my-10 bg-brand-surface border border-gray-800 rounded-xl p-6 overflow-x-auto">
      <div className="min-w-[500px]">
        <h3 className="text-xl font-bold font-mono text-white mb-6">Monthly Cost: Before vs After</h3>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-4">
              <div className="w-32 text-sm font-mono text-gray-400 shrink-0">{item.name}</div>
              <div className="flex-grow flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="h-3 bg-red-500/80 rounded-r" style={{ width: `${(item.before / maxVal) * 100}%` }}></div>
                  <span className="text-xs font-mono text-red-400">${item.before}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 bg-brand-cyan rounded-r" style={{ width: `${(item.after / maxVal) * 100}%` }}></div>
                  <span className="text-xs font-mono text-brand-cyan">${item.after}</span>
                </div>
              </div>
              <div className="w-24 text-right shrink-0">
                <span className="text-sm font-bold font-mono text-green-400">-${item.before - item.after}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export const ToolLink = ({ name, to }: { name: string, to: string }) => (
  <Link to={to} className="font-bold text-brand-cyan hover:underline decoration-brand-cyan decoration-2 underline-offset-4 transition-all">
    {name}
  </Link>
);
