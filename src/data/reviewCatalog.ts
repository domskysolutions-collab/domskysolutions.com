import { toolReviews } from './toolReviews';

export const reviewCatalog = Object.entries(toolReviews).map(([slug, review]) => ({
  slug, name: review.name, category: review.category,
  description: review.heroDesc[0],
  link: `/reviews/${slug}`, externalLink: review.externalLink,
}));
export const reviewCount = reviewCatalog.length + 2; // Includes Kit and Namecheap.
export const legacyReviewRedirects = Object.fromEntries([
  ...reviewCatalog.map(review => [`/tools/${review.slug}`, review.link]),
  ['/uses/convertkit', '/reviews/convertkit'],
  ['/uses/namecheap', '/reviews/namecheap'],
  ['/tools/notion', '/reviews/notion-ai'],
  ['/reviews/notion', '/reviews/notion-ai'],
  ['/blog/claude-vs-chatgpt-vs-gemini-2026', '/comparisons/claude-vs-chatgpt-vs-gemini-2026'],
]);

