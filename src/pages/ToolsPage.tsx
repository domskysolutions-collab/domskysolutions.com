import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const groups = [
  {title:'Plan your work',description:'Turn an idea into a practical starting point.',tools:[
    {slug:'prompt-builder',name:'Prompt Builder',description:'Build a structured prompt from your task, context and preferred format. Copy it into your chosen AI assistant.',action:'Build a prompt'},
    {slug:'content-calendar',name:'Content Calendar',description:'Create a 30-day plan using your audience, topics and publishing goals. Template-based ideas you can adapt.',action:'Plan my content'},
  ]},
  {title:'Choose your tools',description:'Understand your needs before adding another subscription.',tools:[
    {slug:'saas-calculator',name:'SaaS Savings Calculator',description:'Compare software costs and estimate potential savings. Treat the result as a planning estimate.',action:'Calculate costs'},
    {slug:'ai-readiness-quiz',name:'AI Readiness Quiz',description:'Answer a short set of questions to find a practical first step with AI.',action:'Check my readiness'},
    {slug:'stack-recommender',name:'Stack Recommender',description:'Get a rule-based starting stack that matches your business needs and budget.',action:'Explore my options'},
  ]},
];
export const ToolsPage = () => <main className="bg-brand-bg min-h-screen pt-36 pb-24">
  <div className="max-w-6xl mx-auto px-6 lg:px-10">
    <header className="max-w-3xl mb-16"><p className="text-brand-cyan text-xs font-mono uppercase tracking-widest mb-4">Free tools</p><h1 className="text-4xl md:text-5xl font-bold text-white mb-6">A smaller toolkit. A clearer next step.</h1><p className="text-lg text-gray-300 leading-relaxed">Five practical tools to plan content, write better prompts and make sense of your software costs. Each runs in your browser—no AI API key required.</p><p className="text-sm text-gray-400 mt-4">Free to use. No signup required for these five tools.</p></header>
    {groups.map(group=><section key={group.title} className="mb-14" aria-label={group.title}><h2 className="text-2xl font-bold text-white mb-2">{group.title}</h2><p className="text-gray-400 mb-6">{group.description}</p><div className="grid md:grid-cols-2 gap-6">{group.tools.map(tool=><article key={tool.slug} className="flex flex-col rounded-xl border border-brand-border bg-brand-surface p-7"><h3 className="text-xl font-semibold text-white mb-3">{tool.name}</h3><p className="text-gray-300 leading-relaxed mb-7 flex-1">{tool.description}</p><Link to={`/tools/${tool.slug}`} className="inline-flex items-center gap-2 text-brand-cyan font-semibold self-start py-2">{tool.action}<ArrowRight size={17} aria-hidden="true"/></Link></article>)}</div></section>)}
    <aside className="border-t border-brand-border pt-8 flex flex-col sm:flex-row gap-5 sm:justify-between"><p className="text-gray-400">Looking for software reviews instead?</p><Link to="/reviews" className="text-brand-cyan font-semibold">Browse AI & SaaS reviews →</Link></aside>
  </div>
</main>;

