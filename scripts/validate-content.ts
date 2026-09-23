import fs from 'node:fs';
import { articles } from '../src/content/registry';
import { legacyArticles } from '../src/content/legacy';
import { validateContent } from '../src/content/validate';
import { seoPages } from '../src/data/seo';

const result = validateContent(articles, legacyArticles, seoPages.filter(page => !page.article && !legacyArticles.some(article => article.slug === page.path)).map(page => page.path), src => fs.existsSync('public' + src));
for (const warning of result.warnings) console.warn('CONTENT WARNING: ' + warning);
if (result.errors.length) throw new Error(result.errors.join('\n'));
console.log('Validated ' + articles.length + ' structured articles and ' + legacyArticles.length + ' preserved legacy entries.');

