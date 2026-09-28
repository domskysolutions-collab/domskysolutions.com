import { ALTERNATE_HOST, SITE_URL } from '../src/data/site';

// Canonicalize pages, but keep API requests on the caller's origin.
export const canonicalHostRedirects = [
  { source: '/', has: [{ type: 'host', value: ALTERNATE_HOST }], destination: SITE_URL, permanent: true },
  { source: '/:path((?!api(?:/|$)).+)', has: [{ type: 'host', value: ALTERNATE_HOST }], destination: `${SITE_URL}/:path`, permanent: true },
];
