import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Copy, RefreshCw, RotateCcw } from 'lucide-react';
import { ConvertKitForm } from '../../components/ConvertKitForm';

type AudienceOption =
  | 'Founders and entrepreneurs'
  | 'Designers and creatives'
  | 'Developers and builders'
  | 'Marketers and growth teams'
  | 'Small business owners'
  | 'Content creators'
  | 'Students and learners'
  | 'General audience';

type GoalOption =
  | 'Grow audience'
  | 'Drive sales'
  | 'Educate'
  | 'Build trust'
  | 'Go viral'
  | 'Build email list';

type ToneOption =
  | 'Professional'
  | 'Casual & fun'
  | 'Educational'
  | 'Inspirational'
  | 'Controversial'
  | 'Storytelling';

type ContentTypeId =
  | 'blog'
  | 'youtube'
  | 'instagram'
  | 'x'
  | 'linkedin'
  | 'podcast'
  | 'newsletter'
  | 'tiktok';

type IdeaKind = 'Blog' | 'Social' | 'Video' | 'Podcast' | 'Newsletter';

type CalendarItem =
  | {
      kind: 'content';
      dayNumber: number;
      weekday: string;
      ideaKind: IdeaKind;
      typeLabel: string;
      title: string;
      hook: string;
      estTime: string;
    }
  | {
      kind: 'rest';
      dayNumber: number;
      weekday: string;
    };

const SURFACE = 'bg-[#1a1a2e]';

const AUDIENCE_OPTIONS: AudienceOption[] = [
  'Founders and entrepreneurs',
  'Designers and creatives',
  'Developers and builders',
  'Marketers and growth teams',
  'Small business owners',
  'Content creators',
  'Students and learners',
  'General audience',
];

const CONTENT_TYPES: Array<{ id: ContentTypeId; label: string; emoji: string }> = [
  { id: 'blog', label: 'Blog Posts', emoji: '📝' },
  { id: 'youtube', label: 'YouTube Videos', emoji: '🎥' },
  { id: 'instagram', label: 'Instagram', emoji: '📱' },
  { id: 'x', label: 'X / Twitter', emoji: '🐦' },
  { id: 'linkedin', label: 'LinkedIn', emoji: '💼' },
  { id: 'podcast', label: 'Podcast', emoji: '🎙️' },
  { id: 'newsletter', label: 'Newsletter', emoji: '📧' },
  { id: 'tiktok', label: 'TikTok', emoji: '🎵' },
];

const GOALS: Array<{ id: GoalOption; label: string; emoji: string }> = [
  { id: 'Grow audience', label: 'Grow audience', emoji: '🎯' },
  { id: 'Drive sales', label: 'Drive sales', emoji: '💰' },
  { id: 'Educate', label: 'Educate', emoji: '📚' },
  { id: 'Build trust', label: 'Build trust', emoji: '🤝' },
  { id: 'Go viral', label: 'Go viral', emoji: '🔥' },
  { id: 'Build email list', label: 'Build email list', emoji: '📧' },
];

const TONES: ToneOption[] = [
  'Professional',
  'Casual & fun',
  'Educational',
  'Inspirational',
  'Controversial',
  'Storytelling',
];

const POSTING_DAYS = new Set([1, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 21, 22, 24, 26, 28, 30]);

const WEEKDAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

function weekdayForDayNumber(dayNumber: number) {
  return WEEKDAY_NAMES[(dayNumber - 1) % 7];
}

function typeBadge(ideaKind: IdeaKind) {
  switch (ideaKind) {
    case 'Blog':
      return { label: 'Blog', className: 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30' };
    case 'Social':
      return { label: 'Social', className: 'bg-brand-amber/10 text-brand-amber border border-brand-amber/30' };
    case 'Video':
      return { label: 'Video', className: 'bg-purple-500/10 text-purple-300 border border-purple-500/30' };
    case 'Podcast':
      return { label: 'Podcast', className: 'bg-green-500/10 text-green-300 border border-green-500/30' };
    case 'Newsletter':
      return { label: 'Newsletter', className: 'bg-blue-500/10 text-blue-300 border border-blue-500/30' };
  }
}

function estTimeForKind(kind: IdeaKind) {
  switch (kind) {
    case 'Blog':
      return '~2 hours';
    case 'Newsletter':
      return '~2 hours';
    case 'Social':
      return '~15 mins';
    case 'Video':
      return '~3 hours';
    case 'Podcast':
      return '~1 hour';
  }
}

function pick<T>(arr: T[], seed: number) {
  return arr[seed % arr.length];
}

function hashSeed(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function humanAudience(audience: AudienceOption) {
  switch (audience) {
    case 'Founders and entrepreneurs':
      return 'founders';
    case 'Designers and creatives':
      return 'creatives';
    case 'Developers and builders':
      return 'builders';
    case 'Marketers and growth teams':
      return 'growth teams';
    case 'Small business owners':
      return 'small business owners';
    case 'Content creators':
      return 'creators';
    case 'Students and learners':
      return 'learners';
    case 'General audience':
      return 'everyone';
  }
}

function goalAngle(goal: GoalOption) {
  switch (goal) {
    case 'Grow audience':
      return 'grow attention and followers';
    case 'Drive sales':
      return 'turn readers into customers';
    case 'Educate':
      return 'teach the fundamentals fast';
    case 'Build trust':
      return 'build credibility with proof and nuance';
    case 'Go viral':
      return 'earn shares and replies';
    case 'Build email list':
      return 'capture subscribers with a lead magnet';
  }
}

function normalizeNiche(niche: string) {
  const trimmed = niche.trim();
  if (!trimmed) return '';
  return trimmed.length > 80 ? trimmed.slice(0, 80) : trimmed;
}

function buildIdea(
  ideaKind: IdeaKind,
  niche: string,
  audience: AudienceOption,
  goal: GoalOption,
  tone: ToneOption,
  seed: number,
) {
  const n = niche;
  const aud = humanAudience(audience);
  const angle = goalAngle(goal);

  const blogTemplates = [
    `The Ultimate Guide to ${n} in 2026`,
    `I Tested ${n} tools for 30 Days — Here Is What I Found`,
    `5 ${n} Mistakes That Are Costing You Time and Money`,
    `How I got results using ${n} — Step by Step`,
    `The Honest Truth About ${n} Nobody Talks About`,
    `${(seed % 7) + 3} ${n} Tips That Actually Work`,
    `Why Most People Fail at ${n} (and how to fix it)`,
    `The ${n} Beginner's Guide: Start Here`,
  ];

  const socialTemplates = [
    `Hot take: ${n} is not about tactics — it’s about systems`,
    `I just discovered a ${n} shortcut. Here is why it changes everything:`,
    `The ${n} advice everyone gives is wrong. Here is what actually works:`,
    `3 things I wish I knew about ${n} when I started:`,
    `Thread: Everything I know about ${n} after 90 days 🧵`,
    `Controversial opinion about ${n}:`,
    `The ${n} tool I cannot live without:`,
    `What nobody tells you about ${n}:`,
  ];

  const videoTemplates = [
    `I Tried ${n} for 30 Days`,
    `${n} Tutorial: From Zero to Results`,
    `The Truth About ${n} — Honest Review`,
    `Watch Me do ${n} in Real Time`,
    `This ${n} Mistake Cost Me a Week`,
    `${n} vs the old way — Which Wins?`,
    `Day in My Life as a ${n} Creator`,
    `React to: Worst ${n} Advice Online`,
  ];

  const podcastTemplates = [
    `Episode: The ${n} strategy nobody is talking about`,
    `Interview: How ${aud} grew their results using ${n}`,
    `Deep dive: The complete ${n} playbook for 2026`,
    `Q&A: Your biggest ${n} questions answered`,
  ];

  const title = (() => {
    switch (ideaKind) {
      case 'Blog':
        return pick(blogTemplates, seed);
      case 'Newsletter':
        return pick(blogTemplates, seed + 3);
      case 'Social':
        return pick(socialTemplates, seed);
      case 'Video':
        return pick(videoTemplates, seed);
      case 'Podcast':
        return pick(podcastTemplates, seed);
    }
  })();

  const hooks = [
    `Make it ${tone.toLowerCase()} and practical — one clear takeaway people can apply today.`,
    `Aim to ${angle}. Write for ${aud} and include 1 concrete example.`,
    `Open with a surprising insight, then break it into 3 simple steps.`,
    `Use a “before vs after” contrast and end with a strong call-to-action.`,
    `Share one mistake you made in ${n}, and the exact fix you’d use now.`,
    `Include a mini checklist so the reader can copy/paste and implement.`,
  ];

  return {
    title,
    hook: pick(hooks, seed + 11),
    estTime: estTimeForKind(ideaKind),
  };
}

function ideaKindForContentType(contentTypeId: ContentTypeId): IdeaKind {
  if (contentTypeId === 'podcast') return 'Podcast';
  if (contentTypeId === 'newsletter') return 'Newsletter';
  if (contentTypeId === 'blog') return 'Blog';
  if (contentTypeId === 'youtube' || contentTypeId === 'tiktok') return 'Video';
  return 'Social';
}

function typeLabelForContentType(contentTypeId: ContentTypeId) {
  switch (contentTypeId) {
    case 'blog':
      return 'Blog Post';
    case 'newsletter':
      return 'Newsletter';
    case 'youtube':
      return 'YouTube Video';
    case 'tiktok':
      return 'TikTok';
    case 'podcast':
      return 'Podcast';
    case 'instagram':
      return 'Instagram';
    case 'x':
      return 'X / Twitter';
    case 'linkedin':
      return 'LinkedIn';
  }
}

function buildWeekItems(items: CalendarItem[], week: 1 | 2 | 3 | 4) {
  const start = (week - 1) * 7 + 1;
  const end = start + 6;
  return items.filter(i => i.dayNumber >= start && i.dayNumber <= end);
}

function buildCopyText(items: CalendarItem[]) {
  const lines: string[] = [];
  lines.push('MY 30-DAY CONTENT CALENDAR');
  lines.push('Generated by domskysolutions.com');
  lines.push('');

  for (let week = 1 as 1 | 2 | 3 | 4; week <= 4; week = (week + 1) as any) {
    lines.push(`WEEK ${week}:`);
    const weekItems = buildWeekItems(items, week);
    for (const item of weekItems) {
      if (item.kind === 'rest') continue;
      lines.push(`Day ${item.dayNumber} (${item.weekday}) — ${item.typeLabel}:`);
      lines.push(item.title);
      lines.push(item.hook);
      lines.push('');
    }
    lines.push('');
  }

  return lines.join('\n').trim();
}

export const ContentCalendarPage = () => {
  const [niche, setNiche] = useState('');
  const [contentTypes, setContentTypes] = useState<ContentTypeId[]>(['blog', 'x', 'linkedin']);
  const [audience, setAudience] = useState<AudienceOption>('Founders and entrepreneurs');
  const [goal, setGoal] = useState<GoalOption>('Grow audience');
  const [tone, setTone] = useState<ToneOption>('Professional');

  const [activeWeek, setActiveWeek] = useState<1 | 2 | 3 | 4>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [calendar, setCalendar] = useState<CalendarItem[] | null>(null);
  const [copyAllState, setCopyAllState] = useState<'idle' | 'copied'>('idle');
  const [copyShareState, setCopyShareState] = useState<'idle' | 'copied'>('idle');

  const loadingTimer = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = '30-Day Content Calendar Generator — domskysolutions.com';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Generate a 30-day content calendar in 30 seconds. Enter your niche and content types — get realistic posting ideas ready to publish.',
      );
    }
    return () => {
      if (loadingTimer.current) window.clearTimeout(loadingTimer.current);
    };
  }, []);

  const normalizedNiche = useMemo(() => normalizeNiche(niche), [niche]);

  const shareText = useMemo(() => {
    const n = normalizedNiche || 'my niche';
    return (
      `Just generated my 30-day content calendar for ${n} using this free tool from domskysolutions.com\n\n` +
      `Takes 30 seconds — no signup needed 👇\n` +
      `domskysolutions.com/tools/content-calendar`
    );
  }, [normalizedNiche]);

  const counts = useMemo(() => {
    const base = { ideas: 0, blog: 0, social: 0, video: 0, podcast: 0, newsletter: 0 };
    if (!calendar) return base;
    for (const item of calendar) {
      if (item.kind !== 'content') continue;
      base.ideas += 1;
      if (item.ideaKind === 'Blog') base.blog += 1;
      if (item.ideaKind === 'Social') base.social += 1;
      if (item.ideaKind === 'Video') base.video += 1;
      if (item.ideaKind === 'Podcast') base.podcast += 1;
      if (item.ideaKind === 'Newsletter') base.newsletter += 1;
    }
    return base;
  }, [calendar]);

  const toggleContentType = (id: ContentTypeId) => {
    setContentTypes(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      return [...prev, id];
    });
  };

  const generateCalendar = (seedBump = 0) => {
    if (!normalizedNiche) return;
    setIsLoading(true);
    setCalendar(null);
    setActiveWeek(1);
    setCopyAllState('idle');
    setCopyShareState('idle');

    if (loadingTimer.current) window.clearTimeout(loadingTimer.current);
    loadingTimer.current = window.setTimeout(() => {
      const selected = contentTypes.length > 0 ? contentTypes : (['blog'] as ContentTypeId[]);
      const baseSeed = hashSeed(`${normalizedNiche}|${audience}|${goal}|${tone}|${selected.join(',')}|${seedBump}`);

      const items: CalendarItem[] = [];

      const contentTypesForPostingDays = [...selected];
      for (let day = 1; day <= 30; day++) {
        const weekday = weekdayForDayNumber(day);
        if (!POSTING_DAYS.has(day)) {
          items.push({ kind: 'rest', dayNumber: day, weekday });
          continue;
        }

        const typePick = contentTypesForPostingDays[(baseSeed + day) % contentTypesForPostingDays.length];
        const ideaKind = ideaKindForContentType(typePick);
        const typeLabel = typeLabelForContentType(typePick);

        const idea = buildIdea(ideaKind, normalizedNiche, audience, goal, tone, baseSeed + day * 13);

        items.push({
          kind: 'content',
          dayNumber: day,
          weekday,
          ideaKind,
          typeLabel,
          title: idea.title,
          hook: idea.hook,
          estTime: idea.estTime,
        });
      }

      setCalendar(items);
      setIsLoading(false);
    }, 1500);
  };

  const handleCopyAll = async () => {
    if (!calendar) return;
    await navigator.clipboard.writeText(buildCopyText(calendar));
    setCopyAllState('copied');
    window.setTimeout(() => setCopyAllState('idle'), 2000);
  };

  const handleCopyShareText = async () => {
    await navigator.clipboard.writeText(shareText);
    setCopyShareState('copied');
    window.setTimeout(() => setCopyShareState('idle'), 2000);
  };

  const handleShareX = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const startOver = () => {
    setNiche('');
    setContentTypes(['blog', 'x', 'linkedin']);
    setAudience('Founders and entrepreneurs');
    setGoal('Grow audience');
    setTone('Professional');
    setActiveWeek(1);
    setCalendar(null);
    setIsLoading(false);
    setCopyAllState('idle');
    setCopyShareState('idle');
  };

  const weekItems = useMemo(() => (calendar ? buildWeekItems(calendar, activeWeek) : []), [calendar, activeWeek]);

  return (
    <div className="bg-[#0D0F12] min-h-screen text-gray-300 font-sans pb-24 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-block bg-brand-cyan/10 text-brand-cyan text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider font-mono">
            FREE TOOL — NO SIGNUP REQUIRED
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white leading-tight mb-6">
            30-Day Content Calendar Generator
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Enter your niche and content type — get 30 days of content ideas ready to publish. Takes 30 seconds.
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-brand-cyan" /> 30 ideas instantly
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-brand-cyan" /> No signup required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-brand-cyan" /> Copy with one click
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-brand-cyan" /> Built for solopreneurs
            </span>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className={`${SURFACE} border border-brand-cyan/30 rounded-xl p-8`}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold font-mono text-white mb-2">Tell us about your content</h2>
              <p className="text-gray-400">We’ll generate a realistic posting plan for your niche and formats.</p>
            </div>

            <div className="space-y-7">
              {/* Niche */}
              <div>
                <label className="block text-sm font-mono font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Your niche or topic <span className="text-brand-amber">*</span>
                </label>
                <input
                  value={niche}
                  onChange={e => setNiche(e.target.value)}
                  placeholder="e.g. AI tools, graphic design, personal finance, fitness..."
                  className="w-full bg-[#1a1a2e] border border-gray-700/70 rounded-md px-4 py-3 text-white font-bold focus:outline-none focus:border-brand-cyan transition-colors"
                />
              </div>

              {/* Content types */}
              <div>
                <label className="block text-sm font-mono font-bold text-gray-500 uppercase tracking-widest mb-3">
                  What content do you create?
                </label>
                <div className="flex flex-wrap gap-2">
                  {CONTENT_TYPES.map(ct => {
                    const selected = contentTypes.includes(ct.id);
                    return (
                      <button
                        key={ct.id}
                        type="button"
                        onClick={() => toggleContentType(ct.id)}
                        className={[
                          'min-h-[44px] px-4 py-2 rounded-full border font-bold font-mono text-sm transition-all',
                          selected
                            ? 'bg-brand-cyan text-[#0D0F12] border-brand-cyan'
                            : 'bg-[#12131a] text-gray-400 border-gray-700 hover:border-gray-500',
                        ].join(' ')}
                      >
                        {ct.emoji} {ct.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Audience */}
              <div>
                <label className="block text-sm font-mono font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Your target audience
                </label>
                <select
                  value={audience}
                  onChange={e => setAudience(e.target.value as AudienceOption)}
                  className="w-full bg-[#1a1a2e] border border-gray-700/70 rounded-md px-4 py-3 text-white font-bold focus:outline-none focus:border-brand-cyan transition-colors"
                >
                  {AUDIENCE_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Goals */}
              <div>
                <label className="block text-sm font-mono font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Primary content goal
                </label>
                <div className="flex flex-wrap gap-2">
                  {GOALS.map(g => {
                    const selected = goal === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGoal(g.id)}
                        className={[
                          'min-h-[44px] px-4 py-2 rounded-full border font-bold font-mono text-sm transition-all',
                          selected
                            ? 'bg-brand-cyan text-[#0D0F12] border-brand-cyan'
                            : 'bg-[#12131a] text-gray-400 border-gray-700 hover:border-gray-500',
                        ].join(' ')}
                      >
                        {g.emoji} {g.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tone */}
              <div>
                <label className="block text-sm font-mono font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Content tone
                </label>
                <div className="flex flex-wrap gap-2">
                  {TONES.map(t => {
                    const selected = tone === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTone(t)}
                        className={[
                          'min-h-[44px] px-4 py-2 rounded-full border font-bold font-mono text-sm transition-all',
                          selected
                            ? 'bg-brand-cyan text-[#0D0F12] border-brand-cyan'
                            : 'bg-[#12131a] text-gray-400 border-gray-700 hover:border-gray-500',
                        ].join(' ')}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() => generateCalendar(0)}
                disabled={!normalizedNiche || isLoading}
                className={[
                  'w-full h-14 rounded-md font-bold text-[#0D0F12] transition-all',
                  normalizedNiche && !isLoading
                    ? 'bg-[#F5A623] hover:brightness-110'
                    : 'bg-[#F5A623]/40 cursor-not-allowed',
                ].join(' ')}
              >
                Generate My 30-Day Calendar →
              </button>
            </div>
          </div>

          {/* Right side helper / loading / empty */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className={`${SURFACE} border border-gray-800 rounded-xl p-8`}>
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center py-10"
                  >
                    <div className="flex justify-center mb-5">
                      <div className="w-10 h-10 rounded-full border-2 border-brand-cyan/30 border-t-brand-cyan animate-spin" />
                    </div>
                    <div className="text-white font-bold font-mono text-lg mb-2">Building your calendar...</div>
                    <div className="text-gray-400">Mixing ideas for your formats and audience.</div>
                  </motion.div>
                ) : calendar ? (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="text-sm font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">
                      Summary
                    </div>
                    <div className="text-white font-bold font-mono text-2xl mb-4">
                      {counts.ideas} ideas in 30 days
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-400 mb-6">
                      <span className="px-3 py-1 rounded-full border border-gray-800 bg-[#0D0F12]">
                        {counts.blog} blog posts
                      </span>
                      <span className="px-3 py-1 rounded-full border border-gray-800 bg-[#0D0F12]">
                        {counts.newsletter} newsletters
                      </span>
                      <span className="px-3 py-1 rounded-full border border-gray-800 bg-[#0D0F12]">
                        {counts.social} social posts
                      </span>
                      <span className="px-3 py-1 rounded-full border border-gray-800 bg-[#0D0F12]">
                        {counts.video} videos
                      </span>
                      <span className="px-3 py-1 rounded-full border border-gray-800 bg-[#0D0F12]">
                        {counts.podcast} podcasts
                      </span>
                    </div>

                    <div className="text-gray-400 text-sm leading-relaxed">
                      Tip: This is a realistic schedule (rest days included). If you want more volume, regenerate and
                      expand your content types.
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center py-10"
                  >
                    <div className="text-6xl mb-5">🗓️</div>
                    <div className="text-white font-bold font-mono text-2xl mb-3">Generate your calendar</div>
                    <div className="text-gray-400 mb-8 max-w-sm mx-auto">
                      Enter a niche, pick your formats, then generate a 30-day plan with realistic posting days.
                    </div>
                    <div className="space-y-3 max-w-sm mx-auto">
                      <div className="bg-[#0D0F12] border border-gray-800 rounded-lg p-4 text-gray-300 font-medium">
                        Built for solopreneurs
                      </div>
                      <div className="bg-[#0D0F12] border border-gray-800 rounded-lg p-4 text-gray-300 font-medium">
                        Copy with one click
                      </div>
                      <div className="bg-[#0D0F12] border border-gray-800 rounded-lg p-4 text-gray-300 font-medium">
                        No signup required
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {calendar && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35 }}
            >
              {/* Week tabs */}
              <div className="flex gap-4 overflow-x-auto pb-2 mb-6">
                {([1, 2, 3, 4] as const).map(w => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setActiveWeek(w)}
                    className={[
                      'min-h-[44px] font-mono font-bold text-sm px-2 whitespace-nowrap transition-colors',
                      activeWeek === w ? 'text-brand-cyan' : 'text-gray-400 hover:text-gray-200',
                    ].join(' ')}
                  >
                    <span className="pb-2 inline-block border-b-2">
                      <span className={activeWeek === w ? 'border-brand-cyan' : 'border-transparent'} />
                    </span>
                    <span className={activeWeek === w ? 'border-b-2 border-brand-cyan pb-2' : 'pb-2'}>
                      Week {w}
                    </span>
                  </button>
                ))}
              </div>

              {/* Above calendar summary row */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="text-gray-400 font-mono text-sm">
                  <span className="text-white font-bold">{counts.ideas} ideas</span> · {counts.blog} blog posts ·{' '}
                  {counts.social} social posts · {counts.video} videos
                </div>
              </div>

              {/* Calendar grid (desktop) */}
              <div className="hidden md:grid grid-cols-7 gap-3">
                {weekItems.map((item, idx) => (
                  <motion.div
                    key={item.dayNumber}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.25 }}
                    className={[
                      'border rounded-xl p-4 min-h-[180px]',
                      item.kind === 'content'
                        ? 'bg-[#1a1a2e] border-gray-800'
                        : 'bg-[#0D0F12] border-gray-800/70',
                    ].join(' ')}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="text-white font-bold font-mono text-sm">Day {item.dayNumber}</div>
                        <div className="text-gray-500 text-xs font-mono">{item.weekday}</div>
                      </div>
                      {item.kind === 'content' && (
                        <span
                          className={[
                            'text-[10px] font-bold font-mono px-2 py-1 rounded-full',
                            typeBadge(item.ideaKind).className,
                          ].join(' ')}
                        >
                          {typeBadge(item.ideaKind).label}
                        </span>
                      )}
                    </div>

                    {item.kind === 'rest' ? (
                      <div className="text-gray-600 text-sm font-mono">Rest day</div>
                    ) : (
                      <>
                        <div className="text-white font-bold text-sm leading-snug mb-2">{item.title}</div>
                        <div className="text-gray-400 text-xs leading-relaxed mb-3">{item.hook}</div>
                        <div className="text-gray-500 text-xs font-mono flex items-center justify-between">
                          <span>{item.typeLabel}</span>
                          <span>{item.estTime}</span>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Calendar list (mobile) */}
              <div className="md:hidden space-y-3">
                {weekItems.map((item, idx) => (
                  <motion.div
                    key={item.dayNumber}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.25 }}
                    className={[
                      'border rounded-xl p-4',
                      item.kind === 'content'
                        ? 'bg-[#1a1a2e] border-gray-800'
                        : 'bg-[#0D0F12] border-gray-800/70',
                    ].join(' ')}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="text-white font-bold font-mono text-sm">
                          Day {item.dayNumber} <span className="text-gray-500 font-mono text-xs">({item.weekday})</span>
                        </div>
                      </div>
                      {item.kind === 'content' && (
                        <span
                          className={[
                            'text-[10px] font-bold font-mono px-2 py-1 rounded-full',
                            typeBadge(item.ideaKind).className,
                          ].join(' ')}
                        >
                          {typeBadge(item.ideaKind).label}
                        </span>
                      )}
                    </div>

                    {item.kind === 'rest' ? (
                      <div className="text-gray-600 text-sm font-mono">Rest day</div>
                    ) : (
                      <>
                        <div className="text-white font-bold text-sm leading-snug mb-2">{item.title}</div>
                        <div className="text-gray-400 text-xs leading-relaxed mb-3">{item.hook}</div>
                        <div className="text-gray-500 text-xs font-mono flex items-center justify-between">
                          <span>{item.typeLabel}</span>
                          <span>{item.estTime}</span>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Email capture */}
              <div className="mt-10">
                <div className="bg-[#1a1a2e] border border-brand-cyan/30 rounded-xl p-8">
                  <div className="text-white font-bold font-mono text-xl mb-2">🗓️ Want a new calendar every month?</div>
                  <div className="text-gray-400 mb-6">
                    Join The Weekly Edge — our free Thursday newsletter with fresh content ideas, AI tool tips, and
                    workflow hacks for solopreneurs.
                  </div>
                  <ConvertKitForm
                    className="flex flex-col sm:flex-row gap-3"
                    inputClassName="flex-1 bg-[#0D0F12] border border-gray-800 rounded-md px-4 py-3 text-white font-bold focus:outline-none focus:border-brand-cyan transition-colors min-h-[44px]"
                    buttonClassName="bg-brand-cyan text-[#0D0F12] font-bold px-6 py-3 rounded-md hover:brightness-110 transition-all min-h-[44px] whitespace-nowrap"
                    buttonText="Get Weekly Content Ideas →"
                    placeholder="Enter your email address..."
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-10 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleCopyAll}
                  className="w-full h-14 rounded-md font-bold text-[#0D0F12] bg-[#F5A623] hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <Copy size={18} />
                  {copyAllState === 'copied' ? 'Copied! ✓' : 'Copy All Ideas to Clipboard →'}
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => generateCalendar(1)}
                    className="min-h-[44px] rounded-md font-bold text-brand-cyan border border-brand-cyan/50 bg-transparent hover:bg-brand-cyan/10 transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={18} /> Regenerate Calendar 🔄
                  </button>
                  <button
                    type="button"
                    onClick={startOver}
                    className="min-h-[44px] rounded-md font-bold text-gray-300 border border-gray-700 bg-transparent hover:border-gray-500 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={18} /> Start Over
                  </button>
                </div>
              </div>

              {/* Share */}
              <div className="mt-12">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="text-white font-bold font-mono text-lg mb-1">Share your calendar</div>
                    <div className="text-gray-400 text-sm">Copy the share text or post it on X.</div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={handleCopyShareText}
                      className="min-h-[44px] rounded-md font-bold text-gray-300 border border-gray-700 bg-transparent hover:border-gray-500 hover:bg-white/5 transition-all px-5 flex items-center justify-center gap-2"
                    >
                      <Copy size={18} /> {copyShareState === 'copied' ? 'Copied! ✓' : 'Copy Share Text'}
                    </button>
                    <button
                      type="button"
                      onClick={handleShareX}
                      className="min-h-[44px] rounded-md font-bold text-brand-cyan border border-brand-cyan/50 bg-transparent hover:bg-brand-cyan/10 transition-all px-5 flex items-center justify-center gap-2"
                    >
                      Share on X
                    </button>
                  </div>
                </div>

                <div className="mt-4 bg-[#0D0F12] border border-gray-800 rounded-xl p-5 text-gray-400 text-sm whitespace-pre-line">
                  {shareText}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

