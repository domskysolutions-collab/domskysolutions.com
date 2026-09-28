# Kit API version and migration readiness

Recorded: 27 September 2026

## Current deliberate integration

The repository uses Kit/ConvertKit API v3 at `https://api.convertkit.com/v3/forms/{formId}/subscribe`. Authentication is sent as `api_key` in the server-to-server JSON body. Browser bundles receive no Kit credentials.

Server environment names are:

- `CONVERTKIT_API_KEY`
- `CONVERTKIT_FORM_ID`
- `CONVERTKIT_NEWSLETTER_TAG_ID`

The Stack Finder result is calculated and displayed locally. Kit is used only when a visitor separately chooses to join The Weekly Edge through `/api/subscribe`.

This batch does not migrate the integration to API v4. Possession of a v4 key is not evidence that the endpoint, authentication model, form behavior, fields, tags, confirmation state or response schema are compatible.

## Requirements before a v4 migration

1. Authorize a non-production Kit form, tags and test subscriber for provider integration tests.
2. Map the v3 form-subscribe request to the documented v4 subscriber, form and tagging operations.
3. Confirm the required v4 credential scopes and move authentication to the documented server-side header without exposing it to Vite.
4. Verify how v4 represents pending confirmation, existing subscribers, custom fields, duplicate submissions, tags and provider rate limits.
5. Preserve the current separation between local Stack Finder results and optional newsletter signup.
6. Update stable error mappings and provider mocks before changing production configuration.
7. Test success, validation failure, timeout, provider rate limiting, provider failure and existing-subscriber behavior against the authorized test form.
8. Deploy to Preview with test credentials, verify newsletter signup and confirmation behavior, then separately authorize the production cutover and rollback plan.

## External Vercel and Kit settings still required

- Set the three Kit variables separately for Preview and Production; never use a `VITE_` prefix.
- Set `ANTHROPIC_API_KEY` only if `/api/generate` is intentionally enabled.
- Configure `CONVERTKIT_FORM_ID` as The Weekly Edge signup form and use `CONVERTKIT_NEWSLETTER_TAG_ID` for newsletter subscribers.
- Add Vercel Firewall or equivalent durable rate-limit rules for `/api/subscribe` and `/api/generate`. The included in-memory limiter is a best-effort per-instance protection and is not a globally durable quota.
- Keep provider secrets scoped to serverless functions and rotate any credential that was previously exposed elsewhere.

No production provider request was made while preparing this record.
