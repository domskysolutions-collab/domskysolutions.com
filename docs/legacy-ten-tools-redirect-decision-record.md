# Legacy ten-tools article redirect decision record

Recorded: 27 September 2026

Route under review: `/blog/ai-tools-look-like-team-of-10`

## Repository evidence

- The route remains live in `src/App.tsx` and renders `src/pages/blog/BlogPost2.tsx`.
- Its listing metadata remains in `src/content/legacy.ts`.
- The homepage currently links to it as “10 AI Tools for Common Solo-Business Tasks.”
- The article has unique category-level copy for writing, research, design, coding, audio, video and website workflows. It is not a byte-for-byte duplicate of `/uses` or a structured DCE article.
- No redirect for this route exists in `vercel.json`.

## Evidence not available in the repository

- page-level traffic and conversion data;
- inbound-link and referring-domain data;
- search-query and ranking data;
- a reviewed inventory showing which passages have unique search or reader value; and
- an approved destination that preserves every useful intent served by the article.

## Decision

Keep the route live and do not redirect it in this batch. A redirect recommendation is deferred until the owner reviews analytics, backlinks and the unique-content inventory. If that review later supports consolidation, compare `/uses`, DCE-02 and DCE-06 as possible destinations by reader intent before choosing one.

This record authorizes no redirect and makes no claim about current traffic or backlinks.
