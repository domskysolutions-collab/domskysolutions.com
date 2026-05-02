export type ToolInputType = 'text' | 'textarea' | 'select';

export type ToolInputField = {
  name: string;
  label: string;
  type: ToolInputType;
  placeholder?: string;
  options?: string[];
};

export type ToolOutputType = 'text' | 'list' | 'markdown';

export type ToolConfig = {
  slug: string;
  name: string;
  category: string;
  description: string;
  isPremium: boolean;
  inputs: ToolInputField[];
  promptTemplate: string;
  outputType: ToolOutputType;
  seoTitle: string;
  seoDescription: string;
};

export const TOOL_CATEGORIES = [
  'Social Media',
  'Content Creation',
  'SEO',
  'Marketing & Sales',
  'Business Ideas',
  'Productivity',
] as const;

export const AI_TOOLS: ToolConfig[] = [
  {
    slug: 'tiktok-hook-generator',
    name: 'TikTok Hook Generator',
    category: 'Social Media',
    description: 'Generate scroll-stopping TikTok hooks in seconds.',
    isPremium: false,
    inputs: [
      {
        name: 'topic',
        label: 'What is your video about?',
        type: 'text',
        placeholder: 'Example: AI tools for small business',
      },
      {
        name: 'tone',
        label: 'Tone',
        type: 'select',
        options: ['Bold', 'Educational', 'Funny', 'Professional'],
      },
    ],
    promptTemplate:
      'Generate 10 TikTok hooks about {{topic}} in a {{tone}} tone. Short, specific, curiosity-driven.',
    outputType: 'list',
    seoTitle: 'Free TikTok Hook Generator | Domsky Solutions',
    seoDescription:
      'Generate viral TikTok hooks for your videos in seconds with this free AI TikTok hook generator.',
  },
  {
    slug: 'youtube-title-generator',
    name: 'YouTube Title Generator',
    category: 'Social Media',
    description: 'Craft compelling YouTube titles that improve clicks.',
    isPremium: false,
    inputs: [
      {
        name: 'topic',
        label: 'Video topic',
        type: 'text',
        placeholder: 'e.g. Notion setup for freelancers',
      },
      {
        name: 'audience',
        label: 'Who is this for?',
        type: 'text',
        placeholder: 'e.g. beginner designers',
      },
    ],
    promptTemplate:
      'Generate 12 YouTube title ideas about {{topic}} for {{audience}}. Curiosity and benefit-led.',
    outputType: 'list',
    seoTitle: 'Free YouTube Title Generator | Domsky Solutions',
    seoDescription:
      'Generate click-worthy YouTube title ideas in seconds with AI.',
  },
  {
    slug: 'youtube-description-generator',
    name: 'YouTube Description Generator',
    category: 'Social Media',
    description: 'Write structured descriptions with keywords and CTAs.',
    isPremium: false,
    inputs: [
      {
        name: 'title',
        label: 'Working video title',
        type: 'text',
        placeholder: 'Your title or working title',
      },
      {
        name: 'keywords',
        label: 'Keywords (comma-separated)',
        type: 'text',
        placeholder: 'notion, productivity, tutorial',
      },
      {
        name: 'cta',
        label: 'Call to action',
        type: 'select',
        options: ['Subscribe', 'Comment', 'Free guide', 'Newsletter'],
      },
    ],
    promptTemplate:
      'Write a YouTube description for "{{title}}" using keywords {{keywords}} with CTA {{cta}}.',
    outputType: 'markdown',
    seoTitle: 'Free YouTube Description Generator | Domsky Solutions',
    seoDescription:
      'Create SEO-friendly YouTube descriptions with hooks, bullets, and CTAs.',
  },
  {
    slug: 'instagram-caption-generator',
    name: 'Instagram Caption Generator',
    category: 'Social Media',
    description: 'Turn a post idea into captions and hashtags.',
    isPremium: false,
    inputs: [
      {
        name: 'topic',
        label: 'What is the post about?',
        type: 'text',
        placeholder: 'Morning routine as a founder',
      },
      {
        name: 'tone',
        label: 'Tone',
        type: 'select',
        options: ['Friendly', 'Bold', 'Minimal', 'Storytelling'],
      },
    ],
    promptTemplate:
      'Write 5 Instagram captions about {{topic}} in a {{tone}} tone with hashtag ideas.',
    outputType: 'text',
    seoTitle: 'Free Instagram Caption Generator | Domsky Solutions',
    seoDescription:
      'Generate Instagram captions and hashtag ideas from one prompt.',
  },
  {
    slug: 'linkedin-post-generator',
    name: 'LinkedIn Post Generator',
    category: 'Content Creation',
    description: 'Draft professional LinkedIn posts that sound human.',
    isPremium: false,
    inputs: [
      {
        name: 'idea',
        label: 'Core idea or lesson',
        type: 'textarea',
        placeholder: 'What you want to share...',
      },
      {
        name: 'format',
        label: 'Format',
        type: 'select',
        options: ['Story', 'Listicle', 'Hot take', 'Lessons learned'],
      },
    ],
    promptTemplate:
      'Write a LinkedIn post: {{idea}}. Format: {{format}}. Hook, short paragraphs, question ending.',
    outputType: 'text',
    seoTitle: 'Free LinkedIn Post Generator | Domsky Solutions',
    seoDescription:
      'Turn ideas into LinkedIn posts with hooks, structure, and a closing question.',
  },
  {
    slug: 'blog-outline-generator',
    name: 'Blog Outline Generator',
    category: 'SEO',
    description: 'Create H2/H3 outlines that rank and read well.',
    isPremium: false,
    inputs: [
      {
        name: 'topic',
        label: 'Article topic',
        type: 'text',
        placeholder: 'Best AI tools for solo founders',
      },
      {
        name: 'intent',
        label: 'Search intent',
        type: 'select',
        options: ['How-to', 'Listicle', 'Comparison', 'Beginner guide'],
      },
    ],
    promptTemplate:
      'Create a blog outline for "{{topic}}" with intent {{intent}}: titles, H2/H3, FAQ ideas.',
    outputType: 'markdown',
    seoTitle: 'Free Blog Outline Generator | Domsky Solutions',
    seoDescription:
      'Generate SEO-minded blog outlines with headings and FAQ ideas.',
  },
  {
    slug: 'newsletter-idea-generator',
    name: 'Newsletter Idea Generator',
    category: 'Content Creation',
    description: 'Never run out of newsletter themes and angles.',
    isPremium: false,
    inputs: [
      {
        name: 'niche',
        label: 'Newsletter niche',
        type: 'text',
        placeholder: 'indie SaaS builders',
      },
      {
        name: 'goal',
        label: 'Goal this month',
        type: 'select',
        options: ['Grow opens', 'Sell a product', 'Build trust', 'Repurpose content'],
      },
    ],
    promptTemplate:
      'Generate 14 newsletter issue ideas for {{niche}} with goal: {{goal}}. Title + angles + CTA each.',
    outputType: 'list',
    seoTitle: 'Free Newsletter Idea Generator | Domsky Solutions',
    seoDescription:
      'Generate newsletter ideas with angles and CTAs for your niche.',
  },
  {
    slug: 'cold-email-generator',
    name: 'Cold Email Generator',
    category: 'Marketing & Sales',
    description: 'Write concise cold emails that get replies.',
    isPremium: false,
    inputs: [
      {
        name: 'offer',
        label: 'What are you offering?',
        type: 'textarea',
        placeholder: '1–2 sentences on value',
      },
      {
        name: 'recipient',
        label: 'Who is the recipient?',
        type: 'text',
        placeholder: 'marketing lead at SMB SaaS',
      },
    ],
    promptTemplate:
      'Write 3 cold email variants for {{recipient}}. Context: {{offer}}. Short, one CTA, human tone.',
    outputType: 'text',
    seoTitle: 'Free Cold Email Generator | Domsky Solutions',
    seoDescription:
      'Generate cold email drafts and subject lines tailored to your offer.',
  },
  {
    slug: 'landing-page-headline-generator',
    name: 'Landing Page Headline Generator',
    category: 'Marketing & Sales',
    description: 'Headlines and subheads for landing pages.',
    isPremium: false,
    inputs: [
      {
        name: 'product',
        label: 'Product or offer',
        type: 'text',
        placeholder: 'AI workspace for creators',
      },
      {
        name: 'audience',
        label: 'Target audience',
        type: 'text',
        placeholder: 'solopreneurs',
      },
    ],
    promptTemplate:
      'Create 10 headline + subheadline pairs for {{product}} targeting {{audience}}.',
    outputType: 'list',
    seoTitle: 'Free Landing Page Headline Generator | Domsky Solutions',
    seoDescription:
      'Generate headline and subheadline pairs for high-converting pages.',
  },
  {
    slug: 'product-description-generator',
    name: 'Product Description Generator',
    category: 'Marketing & Sales',
    description: 'Clear ecommerce descriptions that sell benefits.',
    isPremium: false,
    inputs: [
      {
        name: 'product',
        label: 'Product name & basics',
        type: 'textarea',
        placeholder: 'Name, what it does, materials, size',
      },
      {
        name: 'tone',
        label: 'Tone',
        type: 'select',
        options: ['Premium', 'Playful', 'Minimal', 'Technical'],
      },
    ],
    promptTemplate:
      'Write 3 product descriptions for: {{product}}. Tone: {{tone}}. Paragraph + bullets + specs line.',
    outputType: 'text',
    seoTitle: 'Free Product Description Generator | Domsky Solutions',
    seoDescription:
      'Create product descriptions with benefit-led bullets for ecommerce.',
  },
  {
    slug: 'ad-copy-generator',
    name: 'Ad Copy Generator',
    category: 'Marketing & Sales',
    description: 'Short ad variants for Meta, Google, or LinkedIn.',
    isPremium: false,
    inputs: [
      {
        name: 'product',
        label: 'Offer summary',
        type: 'textarea',
        placeholder: 'What you sell and the hook',
      },
      {
        name: 'platform',
        label: 'Platform',
        type: 'select',
        options: ['Meta', 'Google Search', 'LinkedIn'],
      },
    ],
    promptTemplate:
      'Write 6 ad copy variants for {{platform}}: {{product}}. Headlines, primary text, CTA.',
    outputType: 'text',
    seoTitle: 'Free Ad Copy Generator | Domsky Solutions',
    seoDescription:
      'Generate ad copy variants for Meta, Google, or LinkedIn.',
  },
  {
    slug: 'sales-page-copy-generator',
    name: 'Sales Page Copy Generator',
    category: 'Marketing & Sales',
    description: 'Long-form sales page sections from one brief.',
    isPremium: true,
    inputs: [
      {
        name: 'offer',
        label: 'Offer details',
        type: 'textarea',
        placeholder: 'What it is, who it is for, price, guarantee',
      },
      {
        name: 'objections',
        label: 'Top objections',
        type: 'text',
        placeholder: 'time, price, trust, results',
      },
    ],
    promptTemplate:
      'Draft sales page sections for: {{offer}}. Address objections: {{objections}}. Hero, story, FAQ, CTA.',
    outputType: 'markdown',
    seoTitle: 'Sales Page Copy Generator | Domsky Solutions',
    seoDescription:
      'Generate structured sales page copy: hero, story, objections, FAQ, CTA.',
  },
  {
    slug: 'offer-generator',
    name: 'Offer Generator',
    category: 'Marketing & Sales',
    description: 'Shape guarantees, bonuses, and stacks that feel fair.',
    isPremium: false,
    inputs: [
      {
        name: 'product',
        label: 'Product or service',
        type: 'text',
        placeholder: 'cohort course on AI workflows',
      },
      {
        name: 'price',
        label: 'Price point',
        type: 'text',
        placeholder: '€297',
      },
    ],
    promptTemplate:
      'Create 3 offer stacks for {{product}} at {{price}}: promise, bonuses, ethical urgency.',
    outputType: 'text',
    seoTitle: 'Free Offer Generator | Domsky Solutions',
    seoDescription:
      'Build offer stacks with bonuses and guarantees from your product and price.',
  },
  {
    slug: 'startup-idea-generator',
    name: 'Startup Idea Generator',
    category: 'Business Ideas',
    description: 'Explore problems worth solving and rough business models.',
    isPremium: false,
    inputs: [
      {
        name: 'interest',
        label: 'Your interests or skills',
        type: 'text',
        placeholder: 'local services, dev tools, fitness',
      },
      {
        name: 'constraint',
        label: 'Constraint',
        type: 'select',
        options: ['Bootstrapped', 'VC-scale', 'Side project', 'Indie SaaS'],
      },
    ],
    promptTemplate:
      'Generate 8 startup ideas for {{interest}} with constraint {{constraint}}: problem, user, monetization, validation step.',
    outputType: 'list',
    seoTitle: 'Free Startup Idea Generator | Domsky Solutions',
    seoDescription:
      'Generate startup ideas with problems, users, monetization, and validation steps.',
  },
  {
    slug: 'saas-name-generator',
    name: 'SaaS Name Generator',
    category: 'Business Ideas',
    description: 'Memorable names with rationale.',
    isPremium: false,
    inputs: [
      {
        name: 'space',
        label: 'Product space',
        type: 'text',
        placeholder: 'invoicing for freelancers',
      },
      {
        name: 'style',
        label: 'Name style',
        type: 'select',
        options: ['Real word', 'Compound', 'Abstract', 'Playful'],
      },
    ],
    promptTemplate:
      'Suggest 20 SaaS names for {{space}} in {{style}} style with one-line rationale each.',
    outputType: 'list',
    seoTitle: 'Free SaaS Name Generator | Domsky Solutions',
    seoDescription:
      'Brainstorm SaaS brand names with rationales before you buy a domain.',
  },
  {
    slug: 'domain-name-generator',
    name: 'Domain Name Generator',
    category: 'Business Ideas',
    description: 'Creative domain-style patterns for your next project.',
    isPremium: false,
    inputs: [
      {
        name: 'keyword',
        label: 'Core keyword or brand seed',
        type: 'text',
        placeholder: 'notion, oak, velocity',
      },
      {
        name: 'tld',
        label: 'Preferred TLD',
        type: 'select',
        options: ['.com', '.io', '.co', '.dev'],
      },
    ],
    promptTemplate:
      'Generate 25 domain-style ideas using {{keyword}} leaning toward {{tld}}. Prefix/suffix patterns.',
    outputType: 'list',
    seoTitle: 'Free Domain Name Generator | Domsky Solutions',
    seoDescription:
      'Brainstorm domain-style names — verify availability at your registrar.',
  },
  {
    slug: 'product-idea-validator',
    name: 'Product Idea Validator',
    category: 'Business Ideas',
    description: 'Stress-test an idea with risks and next experiments.',
    isPremium: false,
    inputs: [
      {
        name: 'idea',
        label: 'Describe your idea',
        type: 'textarea',
        placeholder: 'Problem, solution, who pays',
      },
      {
        name: 'stage',
        label: 'Stage',
        type: 'select',
        options: ['Idea', 'Prototype', 'Early revenue'],
      },
    ],
    promptTemplate:
      'Critically evaluate this idea at stage {{stage}}: {{idea}}. Strengths, risks, experiments, kill criteria.',
    outputType: 'markdown',
    seoTitle: 'Free Product Idea Validator | Domsky Solutions',
    seoDescription:
      'Stress-test your product idea with risks, experiments, and interview questions.',
  },
  {
    slug: 'meeting-notes-summarizer',
    name: 'Meeting Notes Summarizer',
    category: 'Productivity',
    description: 'Turn messy notes into summaries and action items.',
    isPremium: false,
    inputs: [
      {
        name: 'notes',
        label: 'Paste meeting notes',
        type: 'textarea',
        placeholder: 'Raw notes or transcript excerpt',
      },
      {
        name: 'audience',
        label: 'Summary for',
        type: 'select',
        options: ['Yourself', 'Your team', 'A client'],
      },
    ],
    promptTemplate:
      'Summarize these notes for {{audience}}: {{notes}}. TL;DR, decisions, actions, open questions.',
    outputType: 'markdown',
    seoTitle: 'Free Meeting Notes Summarizer | Domsky Solutions',
    seoDescription:
      'Summarize meeting notes into decisions, actions, and open questions.',
  },
  {
    slug: 'todo-list-generator',
    name: 'To-Do List Generator',
    category: 'Productivity',
    description: 'Break a goal into prioritized tasks for the week.',
    isPremium: false,
    inputs: [
      {
        name: 'goal',
        label: 'Your goal',
        type: 'text',
        placeholder: 'Launch landing page this week',
      },
      {
        name: 'hours',
        label: 'Hours available',
        type: 'select',
        options: ['2–5', '5–10', '10–20'],
      },
    ],
    promptTemplate:
      'Create a prioritized weekly todo list for {{goal}} with {{hours}} hours available. Mon–Fri buckets.',
    outputType: 'list',
    seoTitle: 'Free To-Do List Generator | Domsky Solutions',
    seoDescription:
      'Turn one goal into a realistic weekly task list with time buckets.',
  },
  {
    slug: 'resume-bullet-generator',
    name: 'Resume Bullet Point Generator',
    category: 'Productivity',
    description: 'Turn responsibilities into impact bullets.',
    isPremium: false,
    inputs: [
      {
        name: 'role',
        label: 'Role title',
        type: 'text',
        placeholder: 'Product Marketing Manager',
      },
      {
        name: 'achievements',
        label: 'Raw achievements or duties',
        type: 'textarea',
        placeholder: 'Metrics, projects, scope',
      },
    ],
    promptTemplate:
      'Rewrite into 10 resume bullets for {{role}} from: {{achievements}}. Action verbs, metrics if present.',
    outputType: 'list',
    seoTitle: 'Free Resume Bullet Generator | Domsky Solutions',
    seoDescription:
      'Generate resume bullet points from your achievements — verify accuracy.',
  },
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return AI_TOOLS.find((t) => t.slug === slug);
}

export function getRelatedTools(slug: string, limit = 4): ToolConfig[] {
  const current = getToolBySlug(slug);
  if (!current) return [];
  const sameCategory = AI_TOOLS.filter(
    (t) => t.slug !== slug && t.category === current.category
  );
  const filler = AI_TOOLS.filter((t) => t.slug !== slug && t.category !== current.category);
  return [...sameCategory, ...filler].slice(0, limit);
}
