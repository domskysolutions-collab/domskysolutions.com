import fs from 'node:fs';
import { legacyReviewRedirects } from '../src/data/reviewCatalog';
import { retiredUtilityRedirects } from '../src/data/utilityRoutes';
import { canonicalHostRedirects } from './canonical-redirects';
fs.writeFileSync('vercel.json', JSON.stringify({ cleanUrls: true, trailingSlash: false, redirects: [...canonicalHostRedirects, ...Object.entries(legacyReviewRedirects).map(([source, destination]) => ({ source, destination, permanent: true })), ...Object.entries(retiredUtilityRedirects).map(([source, destination]) => ({ source, destination, permanent: true }))] }, null, 2) + '\n');

