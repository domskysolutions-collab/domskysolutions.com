/** Editorial maintenance signals, not SEO scores. No network requests or content mutations. */
type RecordValue = Record<string, unknown>;
const record = (value: unknown): RecordValue => value !== null && typeof value === 'object' && !Array.isArray(value) ? value as RecordValue : {};
const list = (value: unknown): unknown[] => Array.isArray(value) ? value : [];
const text = (value: unknown): string => typeof value === 'string' ? value.trim() : '';
export type QualityIssue = { severity: 'ERROR' | 'WARN'; code: string; message: string };
export type QualityReport = { articles: { slug: string; issues: QualityIssue[] }[]; passed: number; warnings: number; errors: number };
export type QualityOptions = {
  now?: Date; knownPaths?: string[]; legacySlugs?: string[];
  assetExists?: (src: string) => boolean;
  policy?: Partial<{ minimumWords: number; maximumTitleLength: number; maximumDescriptionLength: number; updateWindowDays: number }>;
};
export const qualityPolicy = { minimumWords: 150, maximumTitleLength: 100, maximumDescriptionLength: 300, updateWindowDays: 180 };
export const validDate = (value: unknown): value is string => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
const normalize = (path: string) => path.replace(/\/+$/, '') || '/';
function internalTarget(href: string, slug: string): { path: string; fragment: string } | null {
  try {
    const url = new URL(href, 'https://www.domskysolutions.com' + (slug || '/'));
    if (!['domskysolutions.com', 'www.domskysolutions.com'].includes(url.hostname)) return null;
    return { path: normalize(url.pathname), fragment: decodeURIComponent(url.hash.slice(1)) };
  } catch { return { path: href, fragment: '' }; }
}
function walk(value: unknown, visit: (node: RecordValue) => void) {
  if (Array.isArray(value)) value.forEach(item => walk(item, visit));
  else if (value && typeof value === 'object') { const node = record(value); visit(node); Object.values(node).forEach(item => walk(item, visit)); }
}
function bodyText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(bodyText).join(' ');
  return Object.entries(record(value)).filter(([key]) => ['text', 'title', 'items', 'pros', 'cons', 'caption', 'columns', 'rows', 'paths', 'steps', 'label'].includes(key)).map(([, item]) => bodyText(item)).join(' ');
}
export function checkContent(input: readonly unknown[], options: QualityOptions = {}): QualityReport {
  const documents = input.map(record), policy = { ...qualityPolicy, ...options.policy };
  const now = options.now ?? new Date();
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const legacy = new Set((options.legacySlugs ?? []).map(normalize));
  const publicArticles = new Set([...legacy, ...documents.filter(doc => doc.status === 'published').map(doc => normalize(text(doc.slug)))]);
  const known = new Set([...(options.knownPaths ?? []).map(normalize), ...publicArticles]);
  const anchors = (doc: RecordValue) => new Set(list(doc.blocks).map(record).filter(block => block.type === 'heading' || block.type === 'sources').map(block => text(block.id)));
  const articles = documents.map((doc, index) => {
    const slug = text(doc.slug), issues: QualityIssue[] = [];
    const add = (severity: QualityIssue['severity'], code: string, message: string) => {
      if (!issues.some(issue => issue.code === code && issue.message === message)) issues.push({ severity, code, message });
    };
    const error = (code: string, message: string) => add('ERROR', code, message);
    const warn = (code: string, message: string) => add('WARN', code, message);
    for (const [field, label] of [['title', 'title'], ['slug', 'slug'], ['description', 'meta description'], ['category', 'category']]) if (!text(doc[field])) error('missing-' + field, 'Missing ' + label);
    if (slug && (documents.filter(other => normalize(text(other.slug)) === normalize(slug)).length > 1 || legacy.has(normalize(slug)))) error('duplicate-slug', 'Duplicate slug: ' + slug);
    for (const [field, label] of [['publishedAt', 'published date'], ['updatedAt', 'updated date'], ['verifiedAt', 'verification date']]) {
      if (doc[field] === undefined || doc[field] === null || doc[field] === '') add(field === 'publishedAt' ? 'ERROR' : 'WARN', 'missing-' + field, 'Missing ' + label);
      else if (!validDate(doc[field])) error('invalid-' + field, 'Invalid ' + label + ': use a real YYYY-MM-DD calendar date');
    }
    if (validDate(doc.publishedAt) && validDate(doc.updatedAt) && doc.updatedAt < doc.publishedAt) error('date-order', 'Updated date precedes published date');
    const window = doc.recommendedUpdateDays ?? policy.updateWindowDays;
    if (typeof window !== 'number' || !Number.isInteger(window) || window <= 0) error('invalid-window', 'Recommended update window must be a positive integer in days');
    else if (validDate(doc.verifiedAt)) {
      const days = Math.floor((today - Date.parse(doc.verifiedAt)) / 86400000);
      if (days > window) warn('stale-verification', `Last verified ${days} days ago (recommended window: ${window} days)`);
    }
    const blocks = list(doc.blocks), words = bodyText(blocks).match(/\S+/g)?.length ?? 0;
    if (!blocks.length || !words && !blocks.some(block => text(record(record(block).image).src))) error('missing-body', 'Missing article body');
    else if (words < policy.minimumWords) warn('short-body', `Unusually short article: ${words} words (review threshold: ${policy.minimumWords})`);
    if (text(doc.title).length > policy.maximumTitleLength) warn('long-title', `Unusually long title: ${text(doc.title).length} characters`);
    if (text(doc.description).length > policy.maximumDescriptionLength) warn('long-description', `Unusually long description: ${text(doc.description).length} characters`);
    const image = (value: unknown, label: string) => {
      const item = record(value);
      if (!text(item.alt)) warn('image-alt', 'Missing image alt text: ' + (text(item.src) || label));
      if (!text(item.src) || text(item.src).startsWith('/') && options.assetExists && !options.assetExists(text(item.src))) error('image-reference', 'Missing image reference or local file: ' + (text(item.src) || label));
    };
    if (doc.featuredImageRequired === true && !text(record(doc.featuredImage).src)) error('required-image', 'Missing required featured-image reference');
    if (doc.featuredImage) image(doc.featuredImage, 'featured image');
    if (doc.ogImage) image(doc.ogImage, 'Open Graph image');
    const contextual = new Set<string>();
    let affiliate = doc.commercial === true;
    const link = (href: string, context: boolean) => {
      const target = internalTarget(href, slug);
      if (!target) return;
      const self = target.path === normalize(slug);
      if (!self && !known.has(target.path)) error('broken-link', 'Broken internal content reference: ' + href);
      const targetDoc = self ? doc : documents.find(other => other.status === 'published' && normalize(text(other.slug)) === target.path);
      if (target.fragment && targetDoc && !anchors(targetDoc).has(target.fragment)) error('broken-anchor', 'Broken article anchor: ' + href);
      if (context && !self && known.has(target.path)) contextual.add(target.path);
    };
    for (const value of blocks) {
      const block = record(value);
      if (block.type === 'image') image(block.image, 'body image');
      walk(block, node => { if (node.affiliate === true) affiliate = true; if (text(node.href)) link(text(node.href), !['cta', 'sources', 'image'].includes(text(block.type))); });
    }
    for (const source of list(doc.sources)) if (text(record(source).url)) link(text(record(source).url), false);
    if (text(record(doc.author).url)) link(text(record(doc.author).url), false);
    // The layout supplies a default disclosure when affiliateDisclosureRequired is true.
    if (affiliate && doc.affiliateDisclosureRequired !== true && !text(doc.disclosure)) warn('affiliate-disclosure', 'Missing affiliate disclosure on commercial/affiliate content');
    if (contextual.size < 2) warn('contextual-links', `Only ${contextual.size} distinct contextual internal links (review target: 2)`);
    for (const related of list(doc.relatedSlugs)) if (!text(related) || !publicArticles.has(normalize(text(related))) || normalize(text(related)) === normalize(slug)) error('broken-related', 'Broken related-content reference: ' + String(related));
    if (!documents.some(other => other !== doc && other.status === 'published' && list(other.relatedSlugs).some(value => text(value) && normalize(text(value)) === normalize(slug)))) warn('incoming-related', 'No incoming related-content references from other published structured articles');
    return { slug: slug || text(doc.id) || `article-${index + 1}`, issues };
  });
  return { articles, passed: articles.filter(item => !item.issues.length).length, warnings: articles.flatMap(item => item.issues).filter(issue => issue.severity === 'WARN').length, errors: articles.flatMap(item => item.issues).filter(issue => issue.severity === 'ERROR').length };
}
export const qualityExitCode = (report: QualityReport) => report.errors ? 1 : 0;
export function formatQualityReport(report: QualityReport): string {
  return [...report.articles.map(article => `${article.issues.some(issue => issue.severity === 'ERROR') ? 'ERROR' : article.issues.length ? 'WARN' : 'PASS'} ${article.slug}\n${article.issues.map(issue => `  ${issue.severity} ${issue.message}`).join('\n')}`), `Articles checked: ${report.articles.length}\nPassed: ${report.passed}\nWarnings: ${report.warnings}\nErrors: ${report.errors}`].join('\n\n');
}

