# Kit API integration

Recorded: 28 September 2026

The newsletter endpoint uses Kit API v4. It creates or updates an inactive subscriber, then adds that subscriber to the configured form so the form controls confirmation behavior. Authentication uses the server-side `X-Kit-Api-Key` header. Browser bundles receive no Kit credentials.

Required Vercel variables:

- `CONVERTKIT_API_KEY`
- `CONVERTKIT_FORM_ID`

The Stack Finder result is calculated and displayed locally. Kit is called only when a visitor separately consents to join The Weekly Edge through `/api/subscribe`. No tag or paid Kit plan is required for this flow.

Keep the variables server-only without a `VITE_` prefix. Configure the form's confirmation email and unsubscribe behavior in Kit, and verify the full signup journey with an authorized address before launch.
