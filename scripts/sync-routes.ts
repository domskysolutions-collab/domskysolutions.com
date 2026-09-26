import fs from 'node:fs';
import { legacyReviewRedirects } from '../src/data/reviewCatalog';
import { retiredUtilityRedirects } from '../src/data/utilityRoutes';
import { ALTERNATE_HOST, SITE_URL } from '../src/data/site';
const canonicalHostRedirect = { source:'/:path*', has:[{ type:'host', value:ALTERNATE_HOST }], destination:`${SITE_URL}/:path*`, permanent:true };
fs.writeFileSync('vercel.json', JSON.stringify({ cleanUrls: true, trailingSlash: false, redirects: [canonicalHostRedirect, ...Object.entries(legacyReviewRedirects).map(([source, destination]) => ({ source, destination, permanent: true })), ...Object.entries(retiredUtilityRedirects).map(([source, destination]) => ({ source, destination, permanent: true }))] }, null, 2) + '\n');

