import { articleCovers } from '../data/articleCovers';

import type { ArticleCardData } from './types';

// Legacy metadata only; bodies remain in src/pages/blog until individually migrated.
export const legacyArticles: ArticleCardData[] = [
  {
    title: "You Don't Need to Be Technical to Use AI — Start Here",
    slug: "/blog/you-dont-need-to-be-technical-to-use-ai",
    excerpt: "Everyone is talking about AI tools but nobody is explaining them for people who are not developers. This is that article. No jargon. No assumptions. Just what you actually need to know to start.",
    category: "AI News",
    date: "April 2026",
    readTime: "10 minutes",
    image: null,
    author: "Dominik Kanský"
  },
  {
    title: "Should You Replace Adobe? A Practical Switching Checklist",
    seoTitle: "Replace Adobe? A Practical Switching Checklist | Domsky",
    updatedAt: "2026-11-27",
    slug: "/blog/cancelled-adobe-never-looked-back",
    excerpt: "Check editable files, print output, fonts, handoffs and cancellation terms before moving a creative workflow away from Adobe.",
    category: "Guides",
    date: "April 2026",
    readTime: "7 minutes",
    image: articleCovers.adobe.src,
    imageAlt: articleCovers.adobe.alt,
    imageWidth: articleCovers.adobe.width,
    imageHeight: articleCovers.adobe.height,
    author: "Dominik Kanský"
  },
  {
    title: "10 AI Tools for Common Solo-Business Tasks",
    seoTitle: "10 AI Tools for Practical Solo-Business Tasks | Domsky",
    updatedAt: "2026-11-27",
    slug: "/blog/ai-tools-look-like-team-of-10",
    excerpt: "Try ten focused tasks for research, writing, coding, visuals, audio and websites, with output checks, limits and manual fallbacks.",
    category: "Guides",
    date: "April 2026",
    readTime: "8 minutes",
    image: articleCovers.tools.src,
    imageAlt: articleCovers.tools.alt,
    imageWidth: articleCovers.tools.width,
    imageHeight: articleCovers.tools.height,
    author: "Dominik Kanský"
  }
];
