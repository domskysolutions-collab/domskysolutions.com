import { categories, type ArticleDocument, type ArticleCardData, type ArticleImage, type RichText } from './types';

export type ValidationResult = { errors: string[]; warnings: string[] };
export function validateContent(documents: ArticleDocument[], legacy: ArticleCardData[], routes: string[], assetExists: (src: string) => boolean): ValidationResult {
  const errors: string[] = [], warnings: string[] = [];
  const ids = new Set<string>(), slugs = new Set(legacy.map(item => item.slug));
  const publishedPaths = new Set([...routes, ...legacy.map(item => item.slug), ...documents.filter(item => item.status === 'published').map(item => item.slug)]);
  const validDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
  for (const article of documents) {
    const error = (message: string) => errors.push(article.id + ': ' + message);
    if (!article.id || ids.has(article.id)) error('Missing or duplicate ID'); ids.add(article.id);
    if (!(article.slug === '/uses' || /^\/(blog|comparisons|reviews)\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) || slugs.has(article.slug) || routes.includes(article.slug)) error('Invalid, duplicate or reserved slug'); slugs.add(article.slug);
    if (!article.title.trim() || !article.description.trim() || !article.author.name.trim()) error('Title, description and author are required');
    if (!categories.includes(article.category)) error('Unknown category');
    if (!['draft', 'published'].includes(article.status)) error('Invalid status');
    if (!['article', 'comparison', 'guide', 'review'].includes(article.contentType)) error('Invalid content type');
    if (article.contentType === 'comparison' && !article.slug.startsWith('/comparisons/')) error('Comparisons must use /comparisons/');
    if (article.contentType === 'review' && !article.slug.startsWith('/reviews/')) error('Reviews must use /reviews/');
    if (!Number.isInteger(article.readingMinutes) || article.readingMinutes < 1) error('Invalid reading time');
    for (const field of ['publishedAt', 'updatedAt', 'verifiedAt'] as const) if (article[field] !== null && !validDate(article[field]!)) error('Invalid ' + field);
    if (article.publishedAt && article.updatedAt && article.updatedAt < article.publishedAt) error('Updated date precedes publication');
    if (article.status === 'published') {
      if (article.verificationPending.length) error('Unresolved verification: ' + article.verificationPending.join('; '));
      if (!article.publishedAt) error('Published articles need an approved publication date');
      if (article.sources.length && !article.verifiedAt) error('Sourced articles need a supplied verification date');
    }
    if (!article.blocks.length) error('Article body is empty');
    const anchors = new Set<string>();
    for (const block of article.blocks) {
      if (block.type === 'heading' || block.type === 'sources') {
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(block.id) || anchors.has(block.id)) error('Invalid or duplicate anchor ' + block.id);
        anchors.add(block.id);
      }
    }
    const link = (href: string, affiliate = false) => {
      if (affiliate && !article.affiliateDisclosureRequired) error('Affiliate link requires disclosure');
      if (href.startsWith('/') && !href.startsWith('//')) {
        const [base, fragment] = href.split('#'), target = base.split('?')[0];
        if (!publishedPaths.has(target)) error('Unknown internal link ' + href);
        if (fragment && target === article.slug && !anchors.has(fragment)) error('Unknown article anchor ' + href);
      } else if (href.startsWith('#')) {
        if (!anchors.has(href.slice(1))) error('Unknown anchor ' + href);
      } else {
        try { if (new URL(href).protocol !== 'https:') error('Only HTTPS external links are supported: ' + href); } catch { error('Invalid link ' + href); }
      }
    };
    link(article.author.url);
    const rich = (text: RichText) => {
      if (typeof text === 'string') return;
      for (const part of text) if (typeof part !== 'string' && part.href) link(part.href, part.affiliate);
    };
    const image = (value: ArticleImage) => {
      if (!value.alt.trim()) error('Image needs alt text: ' + value.src);
      if (!/^\/images\/[a-zA-Z0-9_./-]+\.(png|jpe?g|webp|avif|svg)$/.test(value.src) || value.src.includes('..') || !assetExists(value.src)) error('Missing or invalid local image: ' + value.src);
      if ((value.width !== undefined && (!Number.isInteger(value.width) || value.width <= 0)) || (value.height !== undefined && (!Number.isInteger(value.height) || value.height <= 0))) error('Image dimensions must be positive integers');
      if (value.sourceUrl) link(value.sourceUrl);
    };
    if (article.featuredImage) image(article.featuredImage);
    if (article.ogImage) image(article.ogImage);
    const sourceIds = new Set<string>();
    for (const source of article.sources) {
      if (!source.id || sourceIds.has(source.id) || !source.title.trim()) error('Source needs a unique ID and title');
      sourceIds.add(source.id); link(source.url);
    }
    const related = new Set<string>();
    for (const slug of article.relatedSlugs) {
      if (slug === article.slug || related.has(slug) || ![...legacy.map(item => item.slug), ...documents.filter(item => item.status === 'published').map(item => item.slug)].includes(slug)) error('Invalid related article ' + slug);
      related.add(slug);
    }
    for (const block of article.blocks) {
      switch (block.type) {
        case 'paragraph': case 'quote': case 'quickAnswer': case 'note': case 'bestFor': rich(block.text); break;
        case 'quickVerdict':
          rich(block.summary); if (block.bestFor) rich(block.bestFor); if (block.notFor) rich(block.notFor); if (block.verdict) rich(block.verdict); block.keyPoints?.forEach(rich); break;
        case 'heading': if (!block.text.trim() || ![2, 3].includes(block.level)) error('Invalid heading'); break;
        case 'list': block.items.forEach(rich); break;
        case 'prosCons':
          if (block.pros.length < 2 || block.pros.length > 6 || block.cons.length < 2 || block.cons.length > 6) error('Pros and cons need 2–6 items per side');
          [...block.pros, ...block.cons].forEach(rich); break;
        case 'decisionCards':
          if (block.cards.length < 2 || block.cards.length > 4) error('Decision cards need 2–4 items');
          block.cards.forEach(card => rich(card.text)); break;
        case 'table': case 'pricing':
          if (!block.caption.trim() || block.columns.length < 2 || !block.rows.length) error('Table needs a caption, columns and rows');
          if (block.highlightedColumns?.some(index => !Number.isInteger(index) || index < 1 || index >= block.columns.length)) error('Highlighted table columns must reference product columns');
          for (const row of block.rows) { if (row.length !== block.columns.length) error('Table row width differs from header'); row.forEach(rich); } break;
        case 'image': image(block.image); break;
        case 'workflow': if (!block.paths.length || block.paths.some(path => !path.title || !path.steps.length)) error('Empty workflow'); break;
        case 'process':
          if (block.steps.length < 3 || block.steps.length > 6 || block.steps.some(step => !step.title.trim())) error('Processes need 3–6 titled steps');
          block.steps.forEach(step => { if (step.description) rich(step.description); }); break;
        case 'cta': rich(block.text); link(block.href, block.affiliate); if (!block.label.trim()) error('CTA needs a descriptive label'); break;
        case 'sources': if (!article.sources.length) error('Sources block has no references'); break;
        case 'divider': break;
        default: error('Unsupported content block');
      }
    }
  }
  return { errors, warnings };
}
