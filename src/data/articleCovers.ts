import type { ArticleImage } from '../content/types';

// Title artwork shared by articles, cards and social metadata; supplied unless noted.
export const articleCovers = {
  codex: { src: '/images/comparisons/codex-vs-claude-code-v2.webp', alt: 'Codex vs Claude Code comparison cover.', width: 1672, height: 941 },
  assistants: { src: '/images/comparisons/chatgpt-vs-claude-vs-gemini-v2.webp', alt: 'ChatGPT vs Claude vs Gemini: which AI fits your work in 2026?', width: 1672, height: 941 },
  email: { src: '/images/comparisons/kit-vs-mailerlite-vs-beehiiv-v2.webp', alt: 'Kit vs MailerLite vs beehiiv: newsletter tools compared.', width: 1672, height: 941 },
  adobe: { src: '/images/blog/replace-adobe.webp', alt: 'Replace Adobe? A practical switching checklist covering features, migration, team impact and total cost.', width: 1744, height: 901 },
  audit: { src: '/images/blog/software-stack-audit.webp', alt: 'Software Stack Audit: keep, replace, cancel, and test or review.', width: 1744, height: 901 },
  workflow: { src: '/images/blog/lean-content-workflow.webp', alt: 'Lean Content Workflow: idea, research, draft and publish.', width: 1744, height: 901 },
  // Programmatic editorial cover; source/provenance: docs/editorial/guides-upgrade/visuals/.
  tools: { src: '/images/blog/solo-business-ai-tools-v2.webp', alt: '10 AI tools for common solo-business tasks. One useful task at a time.', width: 1600, height: 900 },
  stack: { src: '/images/blog/lean-solo-business-stack.webp', alt: 'Lean Solo-Business Stack: use, keep and skip software categories.', width: 1744, height: 901 },
} satisfies Record<string, ArticleImage>;
