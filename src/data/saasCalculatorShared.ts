/** Shared with SaaS calculator — kept out of HomePage to avoid circular/heavy imports. */

export const SAAS_SPEND_CATEGORIES = [
  {
    title: 'Writing & Content',
    items: [
      { id: 'writingTool', label: 'AI Writing Tools (Jasper, Copy.ai, etc.)' },
      { id: 'copywriter', label: 'Freelance Copywriters' },
      { id: 'contentAgency', label: 'Content Marketing Agency' },
    ],
  },
  {
    title: 'Research & Information',
    items: [
      { id: 'newsSubs', label: 'News & Industry Subscriptions' },
      { id: 'researchTools', label: 'Research & Data Tools' },
    ],
  },
  {
    title: 'Design & Visuals',
    items: [
      { id: 'adobe', label: 'Adobe Creative Cloud' },
      { id: 'canva', label: 'Canva Pro or similar' },
      { id: 'stockPhoto', label: 'Stock Photo/Video Subscriptions' },
      { id: 'graphicDesigner', label: 'Freelance Graphic Designers' },
    ],
  },
  {
    title: 'Development & Web',
    items: [
      { id: 'devRetainer', label: 'Developer Retainers' },
      { id: 'websiteBuilder', label: 'Website Builders (Wix, Squarespace)' },
      { id: 'nocodeTool', label: 'No-Code Tools (Webflow, Bubble)' },
    ],
  },
  {
    title: 'Audio & Video',
    items: [
      { id: 'videoEditor', label: 'Freelance Video Editors' },
      { id: 'podcastEditor', label: 'Podcast Editors' },
      { id: 'voiceover', label: 'Voiceover Artists' },
    ],
  },
  {
    title: 'Workspace & Operations',
    items: [
      { id: 'noteTaking', label: 'Note-taking Apps (Evernote, Roam)' },
      { id: 'projectManagement', label: 'Project Management (Asana, Monday)' },
      { id: 'otherSubs', label: 'Other Software Subscriptions' },
    ],
  },
] as const;

/** @deprecated Use SAAS_SPEND_CATEGORIES — alias for existing calculator imports */
export const CATEGORIES = SAAS_SPEND_CATEGORIES;

export const AI_ALTERNATIVES = [
  {
    id: 'writing',
    name: 'Claude Pro',
    cost: 20,
    triggers: ['writingTool', 'copywriter', 'contentAgency'],
  },
  {
    id: 'research',
    name: 'Perplexity Pro',
    cost: 20,
    triggers: ['newsSubs', 'researchTools'],
  },
  {
    id: 'design',
    name: 'Midjourney Standard',
    cost: 30,
    triggers: ['adobe', 'canva', 'stockPhoto', 'graphicDesigner'],
  },
  {
    id: 'dev',
    name: 'Cursor Pro + Framer',
    cost: 40,
    triggers: ['devRetainer', 'websiteBuilder', 'nocodeTool'],
  },
  {
    id: 'video',
    name: 'Descript + ElevenLabs',
    cost: 29,
    triggers: ['videoEditor', 'podcastEditor', 'voiceover'],
  },
  {
    id: 'productivity',
    name: 'Notion AI',
    cost: 26,
    triggers: ['noteTaking', 'projectManagement'],
  },
  {
    id: 'other',
    name: 'Various AI tools',
    cost: 20,
    triggers: ['otherSubs'],
  },
];

export const RECOMMENDED_TOOLS = [
  {
    id: 'claude',
    name: 'Claude',
    desc: 'Advanced AI assistant for writing and analysis.',
    link: '/tools/claude',
    triggers: ['writingTool', 'copywriter', 'contentAgency'],
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    desc: 'AI search engine that provides cited answers.',
    link: '/tools/perplexity',
    triggers: ['newsSubs', 'researchTools'],
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    desc: 'Industry-leading AI image generation model.',
    link: '/reviews/midjourney',
    triggers: ['adobe', 'canva', 'stockPhoto', 'graphicDesigner'],
  },
  {
    id: 'cursor',
    name: 'Cursor',
    desc: 'The AI-first code editor that actually works.',
    link: '/tools/cursor',
    triggers: ['devRetainer', 'websiteBuilder', 'nocodeTool'],
  },
  {
    id: 'framer',
    name: 'Framer',
    desc: 'Design and ship websites with AI assistance.',
    link: '/reviews/framer',
    triggers: ['devRetainer', 'websiteBuilder', 'nocodeTool'],
  },
  {
    id: 'descript',
    name: 'Descript',
    desc: 'Edit video and audio as easily as a text document.',
    link: '/reviews/descript',
    triggers: ['videoEditor', 'podcastEditor', 'voiceover'],
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    desc: 'The most realistic AI voice generator available.',
    link: '/tools/elevenlabs',
    triggers: ['videoEditor', 'podcastEditor', 'voiceover'],
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    desc: 'Connected workspace with integrated AI assistant.',
    link: '/tools/notion-ai',
    triggers: ['noteTaking', 'projectManagement'],
  },
];
