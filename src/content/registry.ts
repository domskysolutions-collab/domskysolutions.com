import { astraComparison } from './articles/astra-vs-claude-code';
import { legacyArticles } from './legacy';
import { formatArticleDate, type ArticleDocument, type ArticleCardData } from './types';

// Explicit imports work identically in Vite and the Node prerenderer. Register each approved file here.
export const articles: ArticleDocument[] = [astraComparison];
export const selectPublished = (documents: ArticleDocument[]) => documents.filter(article => article.status === 'published');
export const publishedArticles = selectPublished(articles);
export function toArticleCard(article: ArticleDocument): ArticleCardData {
  return {
    title: article.title, slug: article.slug, excerpt: article.description, category: article.category,
    date: article.publishedAt ? formatArticleDate(article.publishedAt) : article.updatedAt ? 'Updated ' + formatArticleDate(article.updatedAt) : '',
    readTime: article.readingMinutes + ' minutes', image: article.featuredImage?.src || null,
    imageAlt: article.featuredImage?.alt, author: article.author.name,
  };
}
export const articleCards: ArticleCardData[] = [...publishedArticles.map(toArticleCard), ...legacyArticles];
export function getArticle(slug: string) {
  return publishedArticles.find(article => article.slug === slug.replace(/\/+$/, ''));
}
export function getRelatedArticles(article: ArticleDocument): ArticleCardData[] {
  // Editorial order is intentional; no inferred or forced links.
  return article.relatedSlugs.flatMap(slug => {
    const card = articleCards.find(item => item.slug === slug && item.slug !== article.slug);
    return card ? [card] : [];
  });
}

