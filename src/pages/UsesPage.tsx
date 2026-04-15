import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, ExternalLink } from 'lucide-react';
import { ConvertKitForm } from '../components/ConvertKitForm';

const usesTools = [
  {
    id: 'convertkit',
    name: 'ConvertKit',
    category: 'Email Newsletter',
    rating: 4.8,
    externalLink: 'https://convertkit.com',
    tagline: 'The creator marketing platform',
    desc: 'We use ConvertKit to send our weekly newsletter to thousands of subscribers. It\'s built specifically for creators, making it incredibly easy to set up automations, segment our audience, and deliver content reliably without getting bogged down in complex enterprise features.',
    pros: [
      'Extremely intuitive visual automation builder',
      'Built specifically for creators and newsletters',
      'Industry-leading deliverability rates'
    ],
    cons: [
      'Pricing scales up quickly as your list grows',
      'Email templates are somewhat basic out of the box'
    ],
    pricing: 'Free up to 1,000 subscribers. Paid plans start at $29/month.',
    ctaPrimary: 'Try ConvertKit'
  },
  {
    id: 'namecheap',
    name: 'Namecheap',
    category: 'Domain Registrar',
    rating: 4.7,
    externalLink: 'https://namecheap.com',
    tagline: 'Affordable, no-nonsense domains',
    desc: 'Every project starts with a domain name, and we register all of ours through Namecheap. They offer consistently low prices, a clean interface, and most importantly, they don\'t aggressively upsell you on unnecessary add-ons during checkout like some competitors do.',
    pros: [
      'Consistently low prices for new registrations and renewals',
      'Free domain privacy protection (WhoisGuard) included forever',
      'Clean, easy-to-navigate dashboard'
    ],
    cons: [
      'Support can sometimes be slow during peak times',
      'Included email hosting is very basic'
    ],
    pricing: 'Domains typically range from $8 to $15 per year depending on the TLD.',
    ctaPrimary: 'Search Domains'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Hosting',
    rating: 4.9,
    externalLink: 'https://vercel.com',
    tagline: 'The platform for frontend developers',
    desc: 'domskysolutions.com is hosted on Vercel. Their platform provides an unparalleled developer experience, offering seamless deployments straight from GitHub, global edge caching for lightning-fast load times, and zero-configuration setups for modern frontend frameworks.',
    pros: [
      'Incredible developer experience and seamless GitHub integration',
      'Global edge network ensures blazing fast load times worldwide',
      'Automatic preview deployments for every pull request'
    ],
    cons: [
      'Bandwidth and serverless function pricing can spike if not monitored',
      'Best suited specifically for frontend frameworks (Next.js, React, etc.)'
    ],
    pricing: 'Hobby plan is free. Pro plan starts at $20/user/month.',
    ctaPrimary: 'Deploy on Vercel'
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    category: 'DNS & Security',
    rating: 4.9,
    externalLink: 'https://cloudflare.com',
    tagline: 'Making the internet faster and safer',
    desc: 'We route our domain through Cloudflare for DNS management, SSL, and security. Their global network acts as a shield against malicious traffic while simultaneously speeding up content delivery. The fact that their free tier offers enterprise-grade features is staggering.',
    pros: [
      'Lightning-fast DNS propagation',
      'Excellent free tier with DDoS protection and free SSL',
      'Powerful page rules and edge caching capabilities'
    ],
    cons: [
      'The dashboard can be overwhelming due to the sheer number of features',
      'Advanced security rules require a steep learning curve'
    ],
    pricing: 'Generous free tier. Pro plan starts at $20/month.',
    ctaPrimary: 'Secure with Cloudflare'
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Code Repository',
    rating: 5.0,
    externalLink: 'https://github.com',
    tagline: 'Where the world builds software',
    desc: 'All of our codebase lives on GitHub. It\'s the industry standard for version control and collaboration. We rely heavily on GitHub Actions for our CI/CD pipelines, ensuring that every change is tested and deployed smoothly to our hosting provider.',
    pros: [
      'The undisputed industry standard for version control',
      'GitHub Actions provides incredibly powerful CI/CD built-in',
      'Excellent integration ecosystem with almost every developer tool'
    ],
    cons: [
      'Can be intimidating for non-technical team members',
      'Project management features (Issues/Projects) are good but not best-in-class'
    ],
    pricing: 'Free for individuals and small teams. Team plan starts at $4/user/month.',
    ctaPrimary: 'Join GitHub'
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'Design',
    rating: 4.8,
    externalLink: 'https://canva.com',
    tagline: 'Empowering the world to design',
    desc: 'For blog post thumbnails, social media graphics, and quick visual assets, we use Canva. While we use professional tools for deep UI/UX work, Canva\'s speed, massive template library, and collaborative features make it indispensable for day-to-day content creation.',
    pros: [
      'Incredibly fast workflow for creating standard marketing assets',
      'Massive library of templates, stock photos, and elements',
      'Great collaborative features for teams'
    ],
    cons: [
      'Lacks the precision and advanced tools of professional software like Figma or Illustrator',
      'Designs can sometimes look "template-y" if not customized enough'
    ],
    pricing: 'Free basic plan. Canva Pro is $14.99/month.',
    ctaPrimary: 'Design with Canva'
  }
];

export const UsesPage = () => {
  useEffect(() => {
    document.title = "Tools We Use | domskysolutions.com";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-brand-bg min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">Tools We Use</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A curated list of the software and services we actually use to build, host, and run domskysolutions.com.
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
              className="bg-brand-surface border border-gray-800 p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan to-blue-500"></div>
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-mono uppercase tracking-wider">
                      {tool.category}
                    </span>
                    <div className="flex items-center gap-1 text-brand-amber text-sm font-mono">
                      <Star size={16} fill="currentColor" /> {tool.rating}
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold font-mono mb-2 text-white">{tool.name}</h2>
                  <p className="text-lg text-brand-cyan font-mono mb-4">"{tool.tagline}"</p>
                </div>
                <a href={tool.externalLink} target="_blank" rel="noopener noreferrer" className="bg-brand-cyan text-brand-bg px-6 py-3 font-bold hover:bg-teal-400 transition-all glow-cyan flex items-center justify-center gap-2 whitespace-nowrap">
                  {tool.ctaPrimary} <ExternalLink size={18} />
                </a>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">{tool.desc}</p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-green-900/10 border border-green-900/30 p-6">
                  <h3 className="text-xl font-bold font-mono mb-4 text-green-400">Pros</h3>
                  <ul className="space-y-3">
                    {tool.pros.map((p, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-3">
                        <span className="text-green-500 font-bold">+</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-900/10 border border-red-900/30 p-6">
                  <h3 className="text-xl font-bold font-mono mb-4 text-red-400">Cons</h3>
                  <ul className="space-y-3">
                    {tool.cons.map((c, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-3">
                        <span className="text-red-500 font-bold">-</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-brand-bg p-4 border border-gray-800 font-mono text-sm text-gray-400">
                <span className="font-bold text-white">Pricing:</span> {tool.pricing}
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
