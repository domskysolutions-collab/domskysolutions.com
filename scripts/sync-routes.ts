import fs from 'node:fs';
import { legacyReviewRedirects } from '../src/data/reviewCatalog';
fs.writeFileSync('vercel.json', JSON.stringify({ cleanUrls: true, trailingSlash: false, redirects: Object.entries(legacyReviewRedirects).map(([source, destination]) => ({ source, destination, permanent: true })) }, null, 2) + '\n');

