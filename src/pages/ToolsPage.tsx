import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const groups = [
  {title:'Plan your work',description:'Turn an idea into a practical starting point.',tools:[
    {to:'/tools/prompt-builder',name:'Prompt Builder',description:'Build a structured prompt from your task, context and preferred format. Copy it into your chosen AI assistant.',action:'Build a prompt'},
    {to:'/tools/content-calendar',name:'Content Calendar',description:'Create a 30-day plan using your audience, topics and publishing goals. Template-based ideas you can adapt.',action:'Plan my content'},
  ]},
  {title:'Choose your tools',description:'Understand your needs before adding another subscription.',tools:[
    {to:'/#stack-finder',name:'Lean Stack Finder',description:'Keep existing tools first, identify a named gap and decide what to trial, add or skip.',action:'Find my lean stack'},
    {to:'/tools/saas-calculator',name:'Software Stack Audit',description:'Compare recurring cash with retained and replacement costs. Keep migration, external services and owner time separate.',action:'Audit my costs'},
    {to:'/tools/ai-readiness-quiz',name:'AI Readiness Quiz',description:'Choose one low-risk first AI task without receiving another product recommendation.',action:'Choose my first task'},
  ]},
];
export const ToolsPage = () => <main className="bg-brand-bg min-h-screen pt-36 pb-24">
  <div className="max-w-6xl mx-auto px-6 lg:px-10">
    <header className="max-w-3xl mb-16"><p className="text-brand-cyan text-xs font-mono uppercase tracking-widest mb-4">Free tools</p><h1 className="text-4xl md:text-5xl font-bold text-white mb-6">A smaller toolkit. A clearer next step.</h1><p className="text-lg text-gray-300 leading-relaxed">Four focused browser utilities plus the Lean Stack Finder for software decisions. No external AI service is required.</p><p className="text-sm text-gray-400 mt-4">The four utilities require no signup. The Stack Finder shows a preview before its email unlock.</p></header>
    {groups.map(group=><section key={group.title} className="mb-14" aria-label={group.title}><h2 className="text-2xl font-bold text-white mb-2">{group.title}</h2><p className="text-gray-400 mb-6">{group.description}</p><div className="grid md:grid-cols-2 gap-6">{group.tools.map(tool=><article key={tool.to} className="flex flex-col rounded-xl border border-brand-border bg-brand-surface p-7"><h3 className="text-xl font-semibold text-white mb-3">{tool.name}</h3><p className="text-gray-300 leading-relaxed mb-7 flex-1">{tool.description}</p><Link to={tool.to} className="inline-flex items-center gap-2 text-brand-cyan font-semibold self-start py-2">{tool.action}<ArrowRight size={17} aria-hidden="true"/></Link></article>)}</div></section>)}
    <aside className="border-t border-brand-border pt-8 flex flex-col sm:flex-row gap-5 sm:justify-between"><p className="text-gray-400">Looking for software reviews instead?</p><Link to="/reviews" className="text-brand-cyan font-semibold">Browse AI & SaaS reviews →</Link></aside>
  </div>
</main>;

