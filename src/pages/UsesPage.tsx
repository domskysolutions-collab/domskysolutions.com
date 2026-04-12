import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, ExternalLink } from 'lucide-react';
import { ConvertKitForm } from '../components/ConvertKitForm';

const usesTools = [
  {
    id: 'convertkit',
    name: 'ConvertKit',
    category: 'Email Marketing',
    rating: 4.6,
    externalLink: 'https://convertkit.com',
    tagline: 'The email platform built for creators who mean business',
    desc: 'We use it for: The Weekly Edge newsletter',
    pricing: 'Free plan: Up to 10,000 subscribers. Paid: from $25/month',
    ctaPrimary: 'Try ConvertKit Free →'
  },
  {
    id: 'namecheap',
    name: 'Namecheap',
    category: 'Domain Registrar',
    rating: 4.5,
    externalLink: 'https://namecheap.com',
    tagline: 'The domain registrar that does not treat you like an ATM',
    desc: '',
    pricing: 'Free plan: No — from ~$8/year',
    ctaPrimary: 'Buy Your Domain →'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Hosting & Deployment',
    rating: 4.8,
    externalLink: 'https://vercel.com',
    tagline: 'Deploy in seconds, scale automatically',
    desc: 'We use it for: Hosting domskysolutions.com',
    pricing: 'Free plan: Yes — Hobby plan',
    ctaPrimary: 'Deploy Free on Vercel →'
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    category: 'DNS & Security',
    rating: 4.7,
    externalLink: 'https://cloudflare.com',
    tagline: 'The internet infrastructure layer you never see but always need',
    desc: 'We use it for: DNS, domain security, email routing',
    pricing: 'Free plan: Yes',
    ctaPrimary: 'Get Started Free →'
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Code Repository',
    rating: 4.8,
    externalLink: 'https://github.com',
    tagline: 'Where code lives',
    desc: 'We use it for: Storing and deploying site code',
    pricing: 'Free plan: Yes',
    ctaPrimary: 'Start Free on GitHub →'
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'Design Tool',
    rating: 4.6,
    externalLink: 'https://canva.com',
    tagline: 'Design without a designer',
    desc: 'We use it for: Blog covers, PDF guides, social media graphics',
    pricing: 'Free plan: Yes — generous free tier',
    ctaPrimary: 'Design Free on Canva →'
  }
];

export const UsesPage = () => {
  useEffect(() => {
    document.title = "Tools We Use to Run domskysolutions.com | domskysolutions.com";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-brand-bg min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-block px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-sm font-mono font-bold mb-6 tracking-wide">
            WHAT WE ACTUALLY USE
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-6 leading-tight">
            Tools We Use to Run<br />domskysolutions.com
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Every tool on this page is something we use daily to build and run this site. No sponsored placements. Just what actually works.
          </p>
        </div>

        <div className="space-y-12">
          {usesTools.map((tool, index) => (
            <motion.div 
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-surface border border-gray-800 p-8 relative overflow-hidden group hover:border-brand-cyan/50 transition-colors"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan to-blue-500"></div>
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-mono uppercase tracking-wider">
                      {tool.category}
                    </span>
                    <div className="flex items-center gap-1 text-brand-amber text-sm font-mono">
                      <Star size={16} fill="currentColor" /> {tool.rating}/5
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold font-mono mb-2 text-white">{tool.name}</h2>
                  <p className="text-lg text-brand-cyan font-mono mb-4">"{tool.tagline}"</p>
                </div>
                <a href={tool.externalLink} target="_blank" rel="noopener noreferrer" className="bg-brand-cyan text-brand-bg px-6 py-3 font-bold hover:bg-teal-400 transition-all glow-cyan flex items-center justify-center gap-2 whitespace-nowrap">
                  {tool.ctaPrimary}
                </a>
              </div>

              {tool.desc && (
                <p className="text-gray-300 text-lg leading-relaxed mb-6">{tool.desc}</p>
              )}

              <div className="bg-brand-bg p-4 border border-gray-800 font-mono text-sm text-gray-400">
                {tool.pricing}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24">
          <ConvertKitForm />
        </div>
      </div>
    </div>
  );
};
