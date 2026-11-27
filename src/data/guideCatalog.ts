import { articleCards, articles } from '../content/registry';
import type { ArticleCardData, ArticleDocument } from '../content/types';

// Curated reading paths, not a relabeling of the product-review catalog.
// Titles and excerpts come from each article's existing metadata.
const curatedGroups = [
  {
    title: 'Choose and maintain your software stack',
    description: 'Start with the work you need to do, then decide what to keep or change.',
    slugs: ['/uses', '/blog/replaced-saas-stack-with-ai-tools', '/blog/cancelled-adobe-never-looked-back'],
  },
  {
    title: 'Build a useful AI workflow',
    description: 'Define a task, check the output and keep editorial responsibility clear.',
    slugs: ['/blog/ai-daily-workflow-solo-business', '/blog/ai-tools-look-like-team-of-10'],
  },
];

export function buildGuideGroups(cards: ArticleCardData[], documents: ArticleDocument[]) {
  const groups = curatedGroups.map(group => ({
    title: group.title,
    description: group.description,
    articles: group.slugs.map(slug => {
      const article = cards.find(item => item.slug === slug);
      if (!article) throw new Error(`Missing curated guide: ${slug}`);
      return article;
    }),
  }));
  const listed = new Set(groups.flatMap(group => group.articles.map(article => article.slug)));
  const additional = cards.filter(card => {
    if (listed.has(card.slug) || card.slug.startsWith('/reviews/') || card.slug === '/blog/you-dont-need-to-be-technical-to-use-ai') return false;
    const document = documents.find(item => item.slug === card.slug);
    if (document) return document.status === 'published' && document.contentType !== 'review'
      && (document.contentType === 'guide' || document.category === 'Guides');
    return card.category === 'Guides';
  });
  if (additional.length) groups.push({
    title: 'More guides',
    description: 'Further practical guides from the publication.',
    articles: additional,
  });
  return groups;
}

// Newly published guide documents appear without another curated-slug edit.
export const guideGroups = buildGuideGroups(articleCards, articles);
