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
  return <figure className="my-10 overflow-hidden rounded-xl border border-brand-border bg-brand-surface">
    <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading={eager ? 'eager' : 'lazy'} decoding="async" className="block w-full h-auto" />
    {(image.caption || image.source) && <figcaption className="border-t border-brand-border px-5 py-3 text-xs leading-relaxed text-gray-400">
      {image.caption}
      {image.caption && image.source ? ' ' : null}
      {image.source && (image.sourceUrl ? <>Source: <ContentLink href={image.sourceUrl}>{image.source}</ContentLink>.</> : <>Source: {image.source}.</>)}
    </figcaption>}
  </figure>;
}

export function AffiliateDisclosure({ required, text }: { required: boolean; text?: string }) {
  if (!required && !text) return null;
  return <aside aria-label="Affiliate disclosure" className="my-8 border-l-2 border-brand-cyan bg-brand-surface px-5 py-4 text-sm leading-relaxed">
    {text || 'This article contains affiliate links. Domsky Solutions may earn a commission at no extra cost to you. Recommendations remain editorially independent.'}{' '}
    <ContentLink href="/disclaimer">Read my disclosure</ContentLink>.
  </aside>;
}

function QuickVerdict({ block }: { block: Extract<ArticleBlock, { type: 'quickVerdict' }> }) {
  const details = [
    block.bestFor && { label: 'Best for', value: block.bestFor },
    block.notFor && { label: 'Less suitable for', value: block.notFor },
    block.verdict && { label: 'Bottom line', value: block.verdict },
  ].filter(Boolean) as { label: string; value: RichText }[];
  return <aside aria-label={block.label} className="my-9 rounded-xl border border-brand-border bg-brand-surface px-5 py-6 sm:px-7">
    <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-brand-cyan">{block.label}</p>
    <p className="mb-0 text-lg leading-relaxed text-white"><Text value={block.summary} /></p>
    {details.length > 0 && <dl className="mt-6 grid gap-4 border-t border-brand-border pt-5 sm:grid-cols-2">
      {details.map(item => <div key={item.label} className={item.label === 'Bottom line' && details.length % 2 === 1 ? 'sm:col-span-2' : undefined}>
        <dt className="mb-1 font-mono text-xs uppercase tracking-wider text-gray-400">{item.label}</dt>
        <dd className="text-sm leading-relaxed text-gray-300"><Text value={item.value} /></dd>
      </div>)}
    </dl>}
    {block.keyPoints?.length ? <ul className="mt-5 space-y-2 border-t border-brand-border pt-5 text-sm text-gray-300">
      {block.keyPoints.map((item, i) => <li key={i} className="flex gap-3"><span aria-hidden="true" className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-brand-cyan" /><span><Text value={item} /></span></li>)}
    </ul> : null}
  </aside>;
}

function EditorialNote({ title, text }: { title: string; text: RichText }) {
  return <aside aria-label={title} className="my-8 border-l-2 border-brand-cyan bg-brand-surface/70 px-5 py-4">
    <h3 className="mb-2 font-mono text-sm font-bold text-white">{title}</h3>
    <div className="text-sm leading-relaxed text-gray-300"><Text value={text} /></div>
  </aside>;
}

function ProsCons({ pros, cons }: { pros: RichText[]; cons: RichText[] }) {
  return <div className="my-9 grid gap-4 sm:grid-cols-2">
    {[['Pros', pros], ['Cons', cons]].map(([label, items], column) => <section key={String(label)} className="rounded-xl border border-brand-border bg-brand-surface p-5">
      <h3 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-white">{String(label)}</h3>
      <ul className="space-y-3 text-sm leading-relaxed text-gray-300">
        {(items as RichText[]).map((item, i) => <li key={i} className="flex gap-3">
          <span aria-hidden="true" className={`mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full ${column === 0 ? 'bg-brand-cyan' : 'border border-gray-500'}`} />
          <span><Text value={item} /></span>
        </li>)}
      </ul>
    </section>)}
  </div>;
}

function DecisionCards({ cards }: { cards: Extract<ArticleBlock, { type: 'decisionCards' }>['cards'] }) {
  return <div className="my-9 grid gap-4 sm:grid-cols-2">
    {cards.map(card => <section key={card.label + card.title} className="rounded-xl border border-brand-border bg-brand-surface p-5">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-cyan">{card.label}</p>
      <h3 className="mb-2 text-base font-bold text-white">{card.title}</h3>
      {card.tool && <p className="mb-2 text-xs font-mono text-gray-400">{card.tool}</p>}
      <div className="text-sm leading-relaxed text-gray-300"><Text value={card.text} /></div>
    </section>)}
  </div>;
}

function ComparisonTable({ block }: { block: Extract<ArticleBlock, { type: 'table' | 'pricing' }> }) {
  const highlighted = new Set(block.highlightedColumns || []);
  return <div role="region" aria-label={block.caption} tabIndex={0} className="my-9 overflow-x-auto rounded-xl border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-cyan/60">
    <table className="w-full min-w-[620px] border-collapse text-left text-sm">
      <caption className="bg-brand-surface px-4 py-3 text-left text-xs leading-relaxed text-gray-400">{block.caption}</caption>
      <thead className="border-t border-brand-border bg-brand-surface text-white">
        <tr>{block.columns.map((column, i) => <th key={i} scope="col" className={`p-4 font-mono text-xs uppercase tracking-wide ${highlighted.has(i) ? 'bg-brand-cyan/5 text-brand-cyan' : ''}`}>{column}</th>)}</tr>
      </thead>
      <tbody className="divide-y divide-brand-border">{block.rows.map((row, i) => <tr key={i} className={i % 2 ? 'bg-brand-surface/30' : undefined}>
        {row.map((cell, j) => j === 0
          ? <th key={j} scope="row" className="p-4 align-top font-medium text-white"><Text value={cell} /></th>
          : <td key={j} className={`p-4 align-top leading-relaxed text-gray-300 ${highlighted.has(j) ? 'bg-brand-cyan/5' : ''}`}><Text value={cell} /></td>)}
      </tr>)}</tbody>
    </table>
  </div>;
}

function Process({ block }: { block: Extract<ArticleBlock, { type: 'process' }> }) {
  return <figure className="my-9">
    {block.title && <figcaption className="mb-4 font-mono text-sm font-bold text-white">{block.title}</figcaption>}
    <ol className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
      {block.steps.map((step, i) => <li key={step.title} className="relative rounded-lg border border-brand-border bg-brand-surface p-4">
        <span className="mb-3 block font-mono text-xs text-brand-cyan">{String(i + 1).padStart(2, '0')}</span>
        <h3 className="text-sm font-bold text-white">{step.title}</h3>
        {step.description && <div className="mt-2 text-xs leading-relaxed text-gray-400"><Text value={step.description} /></div>}
      </li>)}
    </ol>
  </figure>;
}

export function ArticleBlocks({ article }: { article: ArticleDocument }) {
  return <>{article.blocks.map((block, i) => <Block key={i} block={block} article={article} />)}</>;
}

function Block({ block, article }: { block: ArticleBlock; article: ArticleDocument }) {
  switch (block.type) {
    case 'paragraph': return <p><Text value={block.text} /></p>;
    case 'quote': return <blockquote className="my-8 border-l-2 border-brand-cyan bg-brand-surface px-5 py-4 italic"><Text value={block.text} /></blockquote>;
    case 'heading': return block.level === 2 ? <H2 id={block.id}>{block.text}</H2> : <div id={block.id}><H3>{block.text}</H3></div>;
    case 'divider': return <SectionDivider />;
    case 'image': return <ArticleFigure image={block.image} />;
    case 'quickVerdict': return <QuickVerdict block={block} />;
    case 'quickAnswer':
    case 'bestFor':
    case 'note': return <EditorialNote title={block.title} text={block.text} />;
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return <Tag className={`my-6 space-y-3 pl-6 ${block.ordered ? 'list-decimal' : 'list-disc'}`}>{block.items.map((item, i) => <li key={i}><Text value={item} /></li>)}</Tag>;
    }
    case 'prosCons': return <ProsCons pros={block.pros} cons={block.cons} />;
    case 'decisionCards': return <DecisionCards cards={block.cards} />;
    case 'table':
    case 'pricing': return <ComparisonTable block={block} />;
    case 'workflow': return <figure className="my-9 rounded-xl border border-brand-border bg-brand-surface p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">{block.paths.map(path => <div key={path.title} className="rounded-lg border border-brand-border p-5">
        <div className="mb-4 font-mono text-xs uppercase tracking-widest text-brand-cyan">{path.title}</div>
        {path.steps.map((step, i) => <React.Fragment key={i}>{i > 0 && <div aria-hidden="true" className="my-2 text-brand-cyan">↓</div>}<div className="text-sm text-white">{step}</div></React.Fragment>)}
      </div>)}</div><figcaption className="mt-5 text-xs leading-relaxed text-gray-400">{block.caption}</figcaption>
    </figure>;
    case 'process': return <Process block={block} />;
    case 'cta': return <aside className="my-10 rounded-xl border border-brand-border bg-brand-surface p-6">
      <h3 className="mb-3 text-lg font-bold text-white">{block.title}</h3><p><Text value={block.text} /></p>
      <ContentLink href={block.href} affiliate={block.affiliate}>{block.label} →</ContentLink>
    </aside>;
    case 'sources': return <section id={block.id}><H2>{block.title}</H2><ul className="space-y-2 pl-5 text-sm leading-relaxed">{article.sources.map(source => <li key={source.id} className="list-disc"><ContentLink href={source.url}>{source.title}</ContentLink></li>)}</ul></section>;
    default: { const exhaustive: never = block; return exhaustive; }
  }
}

