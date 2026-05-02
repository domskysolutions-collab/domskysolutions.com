/** Shared with SaaS calculator — kept out of HomePage to avoid circular/heavy imports. */

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
