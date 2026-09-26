type ReviewSeed = {
  name: string;
  category: string;
  externalLink: string;
  focus: string;
  pricingSummary: string;
};

const legacyReview = ({ name, category, externalLink, focus, pricingSummary }: ReviewSeed) => ({
  name,
  category,
  externalLink,
  tagline: `An editorial review of ${focus}.`,
  heroDesc: [
    `${name} is covered here as a product to evaluate for ${focus}.`,
    'This legacy review does not include a complete dated test log, exact plan or version, representative inputs, sample outputs or a reproducible comparison. Product claims from the earlier copy have been removed where that evidence was missing.',
    'Use the official source link, then run the same representative task in each candidate product before choosing a plan.',
  ],
  features: [
    'Check the official documentation for current capabilities and limits',
    'Test a representative task with the same input used for alternatives',
    'Record output quality, correction time and failure cases',
    'Review privacy, rights, export and account requirements',
  ],
  pros: [
    `May fit a workflow that specifically needs ${focus}`,
    'An official product source is linked for current verification',
  ],
  cons: [
    'No complete dated Domsky test record is published for this legacy review',
    'Current plan, feature and usage limits must be verified with the vendor',
    'Any productivity or cost benefit depends on the reader’s measured workflow',
  ],
  pricing: `${pricingSummary}. Verify the current plan, billing cadence, region, tax and usage limits on the official pricing page before paying.`,
  bestFor: [
    `Consider ${name} only when ${focus} matches a current, defined job.`,
    'Skip a new subscription when an existing tool already completes that job reliably.',
  ],
  verdict: `${name} is a candidate to compare, not a universal recommendation. Evaluate it with a representative task, current vendor documentation and a clear human-review process. No numerical rating, guaranteed saving or productivity claim is made.`,
  bestForTags: focus,
  pricingSummary,
  ctaPrimary: 'Visit official site →',
});

export const toolReviews = {
  claude: legacyReview({
    name: 'Claude by Anthropic',
    category: 'AI Assistant / Writing',
    externalLink: 'https://claude.ai',
    focus: 'writing, reasoning and coding assistance',
    pricingSummary: 'Free — Custom pricing',
  }),
  perplexity: legacyReview({
    name: 'Perplexity AI',
    category: 'AI Search / Research',
    externalLink: 'https://perplexity.ai',
    focus: 'source discovery and generated research summaries',
    pricingSummary: 'Free — $20/month',
  }),
  'notion-ai': legacyReview({
    name: 'Notion AI',
    category: 'Productivity / AI Writing Assistant',
    externalLink: 'https://notion.so',
    focus: 'assistance inside a documents-and-databases workspace',
    pricingSummary: 'Free — Custom Enterprise',
  }),
  runway: legacyReview({
    name: 'Runway',
    category: 'AI Video Generation / Creative Tools',
    externalLink: 'https://runwayml.com',
    focus: 'AI-assisted video generation and editing',
    pricingSummary: 'Free — Custom Enterprise',
  }),
  elevenlabs: legacyReview({
    name: 'ElevenLabs',
    category: 'AI Audio',
    externalLink: 'https://elevenlabs.io',
    focus: 'generated speech and audio workflows',
    pricingSummary: 'Free tier — $5/month Starter',
  }),
  cursor: legacyReview({
    name: 'Cursor',
    category: 'AI Code Editor / Developer Tools',
    externalLink: 'https://cursor.com',
    focus: 'supervised AI-assisted software development',
    pricingSummary: 'Free — $40/user/month',
  }),
  midjourney: legacyReview({
    name: 'Midjourney',
    category: 'AI Image Generation / Design',
    externalLink: 'https://midjourney.com',
    focus: 'AI image generation and visual concept work',
    pricingSummary: '$10 — $120/month',
  }),
  jasper: legacyReview({
    name: 'Jasper',
    category: 'AI Writing / Marketing Content',
    externalLink: 'https://jasper.ai',
    focus: 'governed marketing-content workflows',
    pricingSummary: '$49/month — Custom Enterprise',
  }),
  descript: legacyReview({
    name: 'Descript',
    category: 'AI Video & Podcast Editing',
    externalLink: 'https://descript.com',
    focus: 'transcript-led audio and video editing',
    pricingSummary: 'Free — Custom Enterprise',
  }),
  framer: legacyReview({
    name: 'Framer AI',
    category: 'AI Website Builder / Design Tool',
    externalLink: 'https://framer.com',
    focus: 'visual website design and publishing',
    pricingSummary: 'Free — $40/month',
  }),
  synthesia: legacyReview({
    name: 'Synthesia',
    category: 'AI Video / Avatar Creation',
    externalLink: 'https://synthesia.io',
    focus: 'template-based avatar video and localization',
    pricingSummary: '$29/month — Custom Enterprise',
  }),
};
