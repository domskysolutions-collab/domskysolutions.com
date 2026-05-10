import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Wand2 } from 'lucide-react';
import { AI_TOOLS } from '../data/tools';
import { ToolCategoryFilter } from '../components/tools/ToolCategoryFilter';
import { ToolCard } from '../components/tools/ToolCard';
import { ConvertKitForm } from '../components/ConvertKitForm';

export const ToolsPage = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [emailUnlocked, setEmailUnlocked] = useState(false);

  const featuredToolSlugs = useMemo(
    () => ['tiktok-hook-generator', 'linkedin-post-generator', 'meeting-notes-summarizer'],
    []
  );

  const featuredTools = useMemo(() => {
    const bySlug = new Map(AI_TOOLS.map((t) => [t.slug, t]));
    return featuredToolSlugs.map((slug) => bySlug.get(slug)).filter(Boolean);
  }, [featuredToolSlugs]);

  useEffect(() => {
    document.title = 'AI Workspace Tools | Domsky Solutions';
  }, []);

  useEffect(() => {
    try {
      const savedEmail = window.localStorage.getItem('ds_tools_email');
      setEmailUnlocked(Boolean(savedEmail));
    } catch {
      setEmailUnlocked(false);
    }
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return AI_TOOLS.filter((t) => {
      if (category && t.category !== category) return false;
      if (!q) return true;
      const blob = `${t.name} ${t.description} ${t.category} ${t.slug}`.toLowerCase();
      return blob.includes(q);
    });
  }, [query, category]);

  const visibleTools = emailUnlocked ? filtered : featuredTools;

  return (
    <div className="bg-brand-bg min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-gray-800 text-brand-cyan text-xs font-mono mb-4">
            <Wand2 className="w-3.5 h-3.5" aria-hidden />
            AI workspace
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">Tools library</h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Generate content, marketing copy, and productivity outputs in one place — starting free. Reviews of AI software
            live under{' '}
            <Link to="/reviews" className="text-brand-cyan hover:underline font-medium">
              Reviews
            </Link>
            .
          </p>
        </header>

        <section className="mb-12 rounded-2xl border border-gray-800 bg-brand-surface p-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-2">BROWSER AI TOOLS</div>
              <h2 className="text-2xl md:text-3xl font-bold font-mono text-white mb-2">3 featured tools</h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                The full library of {AI_TOOLS.length} tools is unlocked after email signup.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTools.map((tool: any) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>

          {!emailUnlocked && (
            <div className="mt-8 border-t border-gray-800 pt-8">
              <div className="max-w-xl">
                <h3 className="text-white font-bold font-mono text-lg mb-2">Unlock all tools</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Enter your email once to access the full 20-tool library.
                </p>
                <ConvertKitForm
                  className="flex flex-col sm:flex-row gap-3"
                  inputClassName="flex-1 rounded-xl border border-gray-700 bg-brand-bg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/40 focus:border-brand-cyan font-sans text-sm"
                  buttonClassName="px-6 py-3 rounded-xl bg-brand-cyan text-brand-bg font-bold font-mono text-sm hover:opacity-90 transition-opacity"
                  buttonText="Unlock tools"
                  placeholder="Enter your email to unlock…"
                  successMessage="Unlocked — scroll down to the full tools library."
                  onSuccess={(email) => {
                    try {
                      window.localStorage.setItem('ds_tools_email', email);
                    } catch {}
                    setEmailUnlocked(true);
                  }}
                />
              </div>
            </div>
          )}
        </section>

        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10 mb-10">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools by name, topic, or category…"
              className="w-full rounded-xl border border-gray-700 bg-brand-surface pl-12 pr-4 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/40 focus:border-brand-cyan font-sans text-sm"
              aria-label="Search tools"
              disabled={!emailUnlocked}
            />
          </div>
          <div className={!emailUnlocked ? 'opacity-50 pointer-events-none' : ''}>
            <ToolCategoryFilter selected={category} onChange={setCategory} />
          </div>
        </div>

        <p className="text-sm text-gray-500 font-mono mb-6">
          Showing {visibleTools.length} of {AI_TOOLS.length} tools
        </p>

        {visibleTools.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-700 bg-brand-surface/50 p-12 text-center">
            <p className="text-gray-400 mb-4">No tools match your filters.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCategory(null);
              }}
              className="text-brand-cyan font-bold hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {visibleTools.map((tool: any) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        )}

        <section className="mt-16 rounded-xl border border-gray-800 bg-brand-surface p-8 text-center">
          <h2 className="text-xl font-bold font-mono text-white mb-2">Classic free utilities</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">
            SaaS calculator, content calendar, prompt builder, and more — same URLs as before.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/tools/content-calendar"
              className="px-4 py-2 rounded-lg border border-gray-600 text-sm text-gray-300 hover:border-brand-cyan hover:text-brand-cyan transition-colors"
            >
              Content calendar
            </Link>
            <Link
              to="/tools/prompt-builder"
              className="px-4 py-2 rounded-lg border border-gray-600 text-sm text-gray-300 hover:border-brand-cyan hover:text-brand-cyan transition-colors"
            >
              Prompt builder
            </Link>
            <Link
              to="/tools/saas-calculator"
              className="px-4 py-2 rounded-lg border border-gray-600 text-sm text-gray-300 hover:border-brand-cyan hover:text-brand-cyan transition-colors"
            >
              SaaS calculator
            </Link>
            <Link
              to="/tools/tool-description"
              className="px-4 py-2 rounded-lg border border-gray-600 text-sm text-gray-300 hover:border-brand-cyan hover:text-brand-cyan transition-colors"
            >
              Tool description generator
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
