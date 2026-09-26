// Compatibility adapter for existing listing and legacy article consumers.
import { articleCards } from '../content/registry';

const UNPROMOTED_LEGACY_SLUGS = new Set([
  '/blog/you-dont-need-to-be-technical-to-use-ai',
]);

export const BLOG_POSTS = articleCards.filter(({ slug }) => !UNPROMOTED_LEGACY_SLUGS.has(slug));

