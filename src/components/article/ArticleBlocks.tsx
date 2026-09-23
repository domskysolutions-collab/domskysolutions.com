import React from 'react';
import { Link } from 'react-router-dom';
import type { ArticleBlock, ArticleDocument, ArticleImage, RichText } from '../../content/types';
import { H2, H3, SectionDivider } from '../ui';

export function ContentLink({ href, affiliate, children }: { href: string; affiliate?: boolean; children: React.ReactNode }) {
  const className = 'text-brand-cyan underline underline-offset-4 hover:text-white';
  return href.startsWith('/') && !href.startsWith('//')
    ? <Link to={href} className={className}>{children}</Link>
    : <a href={href} className={className} rel={affiliate ? 'sponsored noopener noreferrer' : undefined}>{children}</a>;
}
export function Text({ value }: { value: RichText }) {
  if (typeof value === 'string') return <>{value}</>;
  return <>{value.map((part, i) => {
    if (typeof part === 'string') return <React.Fragment key={i}>{part}</React.Fragment>;
    const label = part.strong ? <strong className="text-white">{part.text}</strong> : part.text;
    return part.href ? <ContentLink key={i} href={part.href} affiliate={part.affiliate}>{label}</ContentLink> : <React.Fragment key={i}>{label}</React.Fragment>;
  })}</>;
}
export function ArticleFigure({ image, eager = false }: { image: ArticleImage; eager?: boolean }) {
  return <figure className="my-10 overflow-hidden rounded-xl border border-gray-800 bg-brand-surface">
    <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading={eager ? 'eager' : 'lazy'} className="w-full h-auto" />
    {image.caption && <figcaption className="border-t border-gray-800 px-5 py-3 text-xs text-gray-400">{image.caption}</figcaption>}
  </figure>;
}
export function AffiliateDisclosure({ required, text }: { required: boolean; text?: string }) {
  if (!required && !text) return null;
  return <aside aria-label="Affiliate disclosure" className="my-8 border-l-2 border-brand-cyan bg-brand-surface p-5 text-sm leading-relaxed">
    {text || 'This article contains affiliate links. Domsky Solutions may earn a commission at no extra cost to you. Recommendations remain editorially independent.'}{' '}
    <ContentLink href="/disclaimer">Read our disclosure</ContentLink>.
  </aside>;
}
export function ArticleBlocks({ article }: { article: ArticleDocument }) {
  return <>{article.blocks.map((block, i) => <Block key={i} block={block} article={article} />)}</>;
}
function Block({ block, article }: { block: ArticleBlock; article: ArticleDocument }) {
  switch (block.type) {
    case 'paragraph': return <p><Text value={block.text} /></p>;
    case 'quote': return <blockquote className="my-8 border-l-2 border-brand-cyan bg-brand-surface p-5"><Text value={block.text} /></blockquote>;
    case 'heading': return block.level === 2 ? <H2 id={block.id}>{block.text}</H2> : <div id={block.id}><H3>{block.text}</H3></div>;
    case 'divider': return <SectionDivider />;
    case 'image': return <ArticleFigure image={block.image} />;
    case 'quickAnswer':
    case 'bestFor':
    case 'note': return <aside aria-label={block.title} className="my-8 rounded-r-lg border-l-2 border-brand-cyan bg-brand-surface p-5">
      <h3 className="text-white font-semibold mb-3">{block.title}</h3><Text value={block.text} />
    </aside>;
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return <Tag className={`pl-6 space-y-3 my-6 ${block.ordered ? 'list-decimal' : 'list-disc'}`}>{block.items.map((item, i) => <li key={i}><Text value={item} /></li>)}</Tag>;
    }
    case 'prosCons': return <div className="grid sm:grid-cols-2 gap-5 my-8">{[['Pros', block.pros], ['Cons', block.cons]].map(([label, items]) => <section key={String(label)} className="p-5 rounded-xl border border-gray-800 bg-brand-surface"><h3 className="text-white font-semibold mb-3">{String(label)}</h3><ul className="list-disc pl-5 space-y-2">{(items as RichText[]).map((item, i) => <li key={i}><Text value={item} /></li>)}</ul></section>)}</div>;
    case 'table':
    case 'pricing': return <div role="region" aria-label={block.caption} tabIndex={0} className="overflow-x-auto rounded-xl border border-gray-800 my-8">
      <table className="w-full min-w-[580px] text-sm text-left">
        <caption className="text-left p-4 bg-brand-surface text-gray-400">{block.caption}</caption>
        <thead className="bg-brand-surface text-white"><tr>{block.columns.map((column, i) => <th key={i} scope="col" className="p-4">{column}</th>)}</tr></thead>
        <tbody className="divide-y divide-gray-800">{block.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th key={j} scope="row" className="p-4 align-top text-white"><Text value={cell} /></th> : <td key={j} className="p-4 align-top"><Text value={cell} /></td>)}</tr>)}</tbody>
      </table>
    </div>;
    case 'workflow': return <figure className="my-8 rounded-xl border border-brand-cyan/30 bg-brand-surface p-5 sm:p-7">
      <div className="grid sm:grid-cols-2 gap-5">{block.paths.map(path => <div key={path.title} className="rounded-lg border border-gray-700 p-5">
        <div className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-4">{path.title}</div>
        {path.steps.map((step, i) => <React.Fragment key={i}>{i > 0 && <div aria-hidden="true" className="text-brand-cyan my-2">↓</div>}<div className="text-white">{step}</div></React.Fragment>)}
      </div>)}</div><figcaption className="text-xs text-gray-400 mt-5">{block.caption}</figcaption>
    </figure>;
    case 'cta': return <aside className="my-10 p-6 sm:p-8 rounded-xl bg-brand-surface border border-brand-cyan/30">
      <h3 className="text-xl text-white font-bold mb-3">{block.title}</h3><p><Text value={block.text} /></p>
      <ContentLink href={block.href} affiliate={block.affiliate}>{block.label} →</ContentLink>
    </aside>;
    case 'sources': return <section id={block.id}><H2>{block.title}</H2><ul className="list-disc pl-5 space-y-2 text-sm">{article.sources.map(source => <li key={source.id}><ContentLink href={source.url}>{source.title}</ContentLink></li>)}</ul></section>;
    default: { const exhaustive: never = block; return exhaustive; }
  }
}

