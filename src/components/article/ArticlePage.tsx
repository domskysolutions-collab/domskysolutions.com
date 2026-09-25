import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll } from 'motion/react';
import { getArticle, getRelatedArticles } from '../../content/registry';
import { formatArticleDate, type ArticleDocument } from '../../content/types';
import { ArticleBlocks, ArticleFigure, AffiliateDisclosure } from './ArticleBlocks';
import { NotFoundPage } from '../../pages/NotFoundPage';

export function RelatedArticles({ article }: { article: ArticleDocument }) {
  const related = getRelatedArticles(article).slice(0, 4);
  if (!related.length) return null;
  return <section className="mt-16 border-t border-brand-border pt-9" aria-label="Related articles">
    <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-brand-cyan">Continue reading</p>
    <h2 className="mb-5 font-mono text-xl font-bold text-white">Related articles</h2>
    <div className="grid gap-3 sm:grid-cols-2">{related.map(post => <Link key={post.slug} to={post.slug} className="rounded-lg border border-brand-border bg-brand-surface p-4 hover:border-brand-cyan/60">
      <span className="font-mono text-[11px] uppercase tracking-wider text-gray-400">{post.category}</span>
      <h3 className="mt-2 text-sm font-bold leading-snug text-white">{post.title}</h3>
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-400">{post.excerpt}</p>
    </Link>)}</div>
  </section>;
}
export function ArticleRoute() {
  const { pathname } = useLocation();
  const article = getArticle(pathname);
  return article ? <ArticlePage article={article} /> : <NotFoundPage />;
}
export function ArticlePage({ article }: { article: ArticleDocument }) {
  const { scrollYProgress } = useScroll();
  const toc = article.blocks.flatMap(block => block.type === 'heading' && block.level === 2 && block.toc !== false
    ? [{ id: block.id, text: block.text }] : block.type === 'sources' ? [{ id: block.id, text: block.title }] : []);
  const hasToc = toc.length >= 3;
  const parent = article.slug.startsWith('/comparisons/') ? '/comparisons' : article.slug.startsWith('/reviews/') ? '/reviews' : '/blog';
  return <main className="bg-brand-bg min-h-screen text-gray-300 pb-24">
    <motion.div aria-hidden="true" className="fixed top-0 inset-x-0 h-1 bg-brand-cyan origin-left z-50" style={{ scaleX: scrollYProgress }} />
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-36">
      <Link to={parent} className="text-sm text-brand-cyan hover:underline">← {parent === '/comparisons' ? 'All comparisons' : parent === '/reviews' ? 'All reviews' : 'All articles'}</Link>
      <header className="max-w-4xl mt-8 mb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-brand-cyan mb-5">{article.category} · {article.readingMinutes} min read</p>
        <h1 className="font-mono font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">{article.title}</h1>
        <p className="text-lg sm:text-xl leading-relaxed text-gray-400 mt-6 max-w-3xl">{article.deck || article.description}</p>
        <p className="mt-6 text-sm text-gray-400">{article.author.name}
          {article.publishedAt && <> · Published <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time></>}
          {article.updatedAt && <> · Updated <time dateTime={article.updatedAt}>{formatArticleDate(article.updatedAt)}</time></>}
        </p>
        {article.verifiedAt && <p className="mt-2 text-xs text-gray-400">Facts last verified <time dateTime={article.verifiedAt}>{formatArticleDate(article.verifiedAt)}</time></p>}
      </header>
      <div className={hasToc ? 'grid lg:grid-cols-[200px_minmax(0,1fr)] gap-10 lg:gap-14 items-start' : 'max-w-[760px]'}>
        {hasToc && <nav aria-label="Article contents" className="lg:sticky lg:top-32 rounded-xl border border-gray-800 p-5 bg-brand-surface">
          <p className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-4">In this article</p>
          <ul className="space-y-3 text-sm">{toc.map(item => <li key={item.id}><a href={`#${item.id}`} className="hover:text-brand-cyan">{item.text}</a></li>)}</ul>
        </nav>}
        <article className="min-w-0 max-w-[760px] text-[17px] leading-[1.85] break-words [&_[id]]:scroll-mt-32 [&_p]:mb-5">
          <AffiliateDisclosure required={article.affiliateDisclosureRequired} text={article.disclosure} />
          {article.featuredImage && <ArticleFigure image={article.featuredImage} eager />}
          <ArticleBlocks article={article} />
          <RelatedArticles article={article} />
        </article>
      </div>
    </div>
  </main>;
}

