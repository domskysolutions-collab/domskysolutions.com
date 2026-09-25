import type { ArticleDocument } from '../types';

export const softwareStackAudit = {
  id: 'dce-07-software-stack-audit',
  title: 'Audit Your Software Stack: What to Keep, Cancel or Replace',
  slug: '/blog/replaced-saas-stack-with-ai-tools',
  description: 'Review overlapping subscriptions, retained features and switching costs. Decide what to keep, downgrade, cancel or trial without overstating savings.',
  excerpt: 'A practical worksheet for mapping subscriptions to required jobs, testing replacement coverage and calculating recurring cash honestly.',
  deck: 'Map the work each subscription performs, test replacement coverage and separate recurring cash, migration costs and owner time before you cancel anything.',
  seoTitle: 'Audit Your Software Stack: Keep, Cancel or Replace | Domsky',
  socialTitle: 'Keep, Downgrade, Cancel or Trial? Audit Your Software Stack',
  socialDescription: 'Map subscriptions to required jobs, test replacement coverage and calculate recurring cash without hiding migration costs or owner time.',
  category: 'Guides',
  author: { name: 'Domsky Solutions editorial', type: 'Organization', url: '/about' },
  publishedAt: '2026-09-25', updatedAt: '2026-09-25', verifiedAt: '2026-09-25',
  status: 'published', contentType: 'guide',
  tags: ['Lean Software Stack', 'SaaS audit', 'Software costs', 'Subscription management', 'Solo business'],
  relatedSlugs: ['/blog/ai-daily-workflow-solo-business', '/comparisons/claude-vs-chatgpt-vs-gemini-2026', '/comparisons/kit-vs-mailerlite-vs-beehiiv'],
  readingMinutes: 13,
  featuredImageRequired: true,
  featuredImage: { src: '/images/software-stack-audit.svg', alt: 'A software audit worksheet sorting subscriptions into keep, downgrade, cancel and trial columns', caption: 'Make each decision from required coverage, recurring cash and migration risk.', width: 1600, height: 900 },
  ogImage: { src: '/images/software-stack-audit.svg', alt: 'A software audit worksheet with keep, downgrade, cancel and trial decisions', width: 1600, height: 900 },
  commercial: false,
  recommendedUpdateDays: 180,
  affiliateDisclosureRequired: false,
  disclosure: 'This guide contains no affiliate links. The worksheet and calculations are editorial tools, not promises that a replacement will fit every workflow or produce a particular saving.',
  verificationPending: [],
  sources: [
    { id: 'finops-optimize', title: 'FinOps Framework: Optimize Usage', url: 'https://www.finops.org/framework/capabilities/optimize-usage/' },
    { id: 'finops-licensing', title: 'FinOps Framework: Licensing & SaaS', url: 'https://www.finops.org/framework/capabilities/licensing-saas/' },
    { id: 'finops-saas', title: 'FinOps Framework: FinOps for SaaS', url: 'https://www.finops.org/framework/technology-categories/saas/' },
    { id: 'nist-sam', title: 'NIST: Software Asset Management Continuous Monitoring', url: 'https://csrc.nist.gov/pubs/pd/2015/09/16/software-asset-management-continuous-monitoring/final' },
  ],
  blocks: [
    { type: 'quickAnswer', title: 'Quick answer', text: 'Audit work before brands. List every recurring software cost, map each tool to the jobs your business must still perform, then classify it as keep, downgrade, cancel or trial. Calculate recurring cash separately from one-time migration cash, owner time and outside services.' },
    { type: 'paragraph', text: 'A smaller software stack is useful only when it still covers the work. Cancelling an overlapping subscription can reduce cash expense. Removing the only reliable export, billing or delivery path can create a larger operational problem.' },
    { type: 'paragraph', text: ['This audit turns a broad “replace SaaS with AI” idea into a decision process. Use the ', { text: 'SaaS stack calculator', href: '/tools/saas-calculator' }, ' alongside the worksheet, and verify changing product facts using ', { text: 'Domsky’s research method', href: '/methodology' }, '.'] },
    { type: 'heading', level: 2, id: 'sequence', text: 'The seven-step audit sequence' },
    { type: 'process', title: 'From inventory to controlled change', steps: [
      { title: 'Inventory', description: 'Record every recurring software payment and normalize billing periods.' },
      { title: 'Separate costs', description: 'Keep software cash, outside services and owner time in distinct columns.' },
      { title: 'Map coverage', description: 'Connect each tool to the business jobs and safeguards it provides.' },
      { title: 'Calculate', description: 'Compare old recurring cash with retained and replacement recurring cash.' },
      { title: 'Decide', description: 'Choose keep, downgrade, cancel, trial or buy nothing for each item.' },
      { title: 'Protect', description: 'Check exports, contracts, ownership, integrations and rollback options.' },
    ] },
    { type: 'paragraph', text: 'The final step is a controlled trial and review. Do not cancel the old path until the proposed replacement has completed the real job with acceptable quality, reliability and recovery options.' },

    { type: 'heading', level: 2, id: 'jobs-not-logos', text: 'Start with jobs, not logos' },
    { type: 'paragraph', text: 'Tool names encourage feature comparison. Jobs expose the requirement. “Email platform” is a category; “collect consent, deliver a lead magnet, send a welcome sequence and export subscribers” is a set of jobs that can be tested.' },
    { type: 'table', caption: 'Example task-level coverage map', columns: ['Required job', 'Current coverage', 'Proposed coverage', 'Evidence to check', 'Risk if missing'], rows: [
      ['Collect subscribers and consent', 'Current email platform', 'Retained or trial platform', 'Form, consent record and export test', 'High'],
      ['Create researched drafts', 'General AI assistant', 'One retained assistant', 'Source handling and output review', 'Medium'],
      ['Schedule appointments', 'Scheduler', 'Lower plan or calendar feature', 'Time-zone and confirmation test', 'Medium'],
      ['Store source files', 'Cloud storage', 'Retained storage', 'Ownership, version and recovery test', 'High'],
    ] },
    { type: 'paragraph', text: ['The goal is coverage with fewer unnecessary overlaps. When assistants overlap, ', { text: 'compare ChatGPT, Claude and Gemini by the work you need', href: '/comparisons/claude-vs-chatgpt-vs-gemini-2026' }, ' rather than paying for several tools by default.'] },

    { type: 'heading', level: 2, id: 'inventory', text: 'Step 1 — Build a complete inventory' },
    { type: 'paragraph', text: 'Use invoices, card statements and account billing pages. Normalize annual payments to a monthly equivalent for comparison, but retain the real renewal date and contract terms. A normalized number does not imply that the provider offers monthly cancellation or a refund.' },
    { type: 'table', caption: 'Minimum fields for each subscription', columns: ['Field', 'What to record'], rows: [
      ['Tool and plan', 'Exact product and current plan'], ['Billing', 'Actual amount, interval, renewal date and owner'], ['Required jobs', 'Work the business still needs'], ['Unique safeguards', 'Exports, history, permissions, recovery or integrations'], ['Usage evidence', 'Who used it, for what and how recently'], ['Decision', 'Keep, downgrade, cancel, trial or buy nothing'],
    ] },

    { type: 'heading', level: 2, id: 'separate-costs', text: 'Step 2 — Separate software cash, services and owner time' },
    { type: 'paragraph', text: 'A software bill, a contractor invoice and the owner’s time are different measures. Combining them into one “savings” total hides what actually changed.' },
    { type: 'table', caption: 'Keep these measures separate', columns: ['Measure', 'Examples', 'How to use it'], rows: [
      ['Recurring software cash', 'Monthly or normalized annual subscriptions', 'Use in the recurring-cash formula'],
      ['One-time migration cash', 'Setup fee, paid export or contractor migration', 'Subtract from the first-year recurring reduction'],
      ['Outside services', 'Bookkeeper, editor, developer or agency', 'Evaluate as a separate service decision'],
      ['Owner time', 'Setup, review, correction and maintenance hours', 'Track operational impact; do not insert an invented hourly value'],
    ] },

    { type: 'heading', level: 2, id: 'coverage', text: 'Step 3 — Test replacement coverage' },
    { type: 'list', items: [
      'Write the required job in observable terms.', 'Identify the data, permissions and integrations the job depends on.', 'Run the replacement with a real but limited example.', 'Test the unhappy path: export, restore, failed automation and account handover.', 'Record what still needs manual work or an outside service.', 'Keep the current tool until the replacement passes the agreed test.',
    ] },
    { type: 'note', title: 'AI is not automatic coverage', text: 'An assistant can draft, classify or transform information. It does not automatically replace storage, consent records, publishing controls, billing, delivery guarantees or accountable human review. Compare the completed job and safeguards, not the novelty of the interface.' },

    { type: 'heading', level: 2, id: 'cash-formula', text: 'Step 4 — Calculate recurring cash honestly' },
    { type: 'quote', text: 'Monthly net reduction = old recurring cash total − retained recurring costs − incremental replacement recurring costs' },
    { type: 'quote', text: 'First-year net cash reduction = monthly net reduction × 12 − one-time migration cash' },
    { type: 'paragraph', text: 'Owner time and outside services stay beside these results. Report them in their own units unless you have an approved valuation method. This keeps a cash result from quietly becoming a return-on-investment claim.' },

    { type: 'heading', level: 3, id: 'worked-example', text: 'Worked positive example' },
    { type: 'table', caption: 'Illustrative monthly inventory', columns: ['Item', 'Old recurring cash', 'Decision', 'New recurring cash'], rows: [
      ['Website', '€18', 'Keep', '€18'], ['Email', '€25', 'Keep', '€25'], ['Assistant A', '€24', 'Keep', '€24'], ['Assistant B', '€22', 'Cancel after coverage test', '€0'], ['Scheduler', '€15', 'Downgrade', '€7'], ['Total', '€104', '—', '€74'],
    ] },
    { type: 'paragraph', text: 'Old recurring cash is €104. Retained recurring cash is €74 and there is no incremental replacement subscription. The monthly net reduction is €30, or €360 annualized. If one-time migration cash is €30, first-year net cash reduction is €330.' },
    { type: 'table', caption: 'Time stays visible but outside the cash equation', columns: ['Time measure', 'Before', 'After', 'One-time migration'], rows: [['Owner hours', 'Record observed hours', 'Record observed hours', 'Record setup and review hours']] },
    { type: 'paragraph', text: 'This example is arithmetic, not a promise. Your coverage, contract terms, migration work and result will differ.' },

    { type: 'heading', level: 3, id: 'zero-negative', text: 'Zero and negative results are valid' },
    { type: 'table', caption: 'Language for every result', columns: ['Inputs', 'Monthly result', 'Correct interpretation'], rows: [
      ['€50 old − €30 retained − €20 replacement', '€0', 'No recurring cash change. Compare coverage, risk and time before switching.'],
      ['€50 old − €30 retained − €28 replacement', '−€8', 'The proposed stack costs €8 more per month. Proceed only if the added coverage or reduced risk justifies it.'],
    ] },
    { type: 'paragraph', text: 'Do not clamp a negative number to zero or label every change a saving. A more expensive stack can still be a sound choice, but the reason must come from coverage, reliability or risk rather than distorted arithmetic.' },

    { type: 'heading', level: 2, id: 'decisions', text: 'Step 5 — Choose one decision for each tool' },
    { type: 'decisionCards', cards: [
      { label: 'Keep', title: 'Required and adequately used', text: 'Keep the current plan when it covers a required job and the proposed replacement does not match the safeguards.' },
      { label: 'Downgrade', title: 'Right tool, oversized plan', text: 'Move to a lower plan only after checking limits, history, automations and contract timing.' },
      { label: 'Cancel', title: 'No required unique job', text: 'Cancel after exports and a replacement or documented removal of the job are complete.' },
      { label: 'Trial', title: 'Coverage is plausible but unproven', text: 'Run a time-bounded test with success, failure and rollback criteria before changing the live workflow.' },
    ] },
    { type: 'paragraph', text: '“Buy nothing” is also a decision. If a new tool does not close a documented gap, leave it out of the proposed stack.' },

    { type: 'heading', level: 2, id: 'safeguards', text: 'Step 6 — Run cancellation safeguards' },
    { type: 'list', items: [
      'Export data in a usable format and test that the export opens.', 'Record renewal, notice and cancellation terms.', 'Confirm account, domain, file and automation ownership.', 'List integrations and downstream workflows that will change.', 'Preserve required history, consent records and invoices.', 'Define a rollback path and the date when rollback stops being practical.', 'Assign a person to check the replacement after launch.',
    ] },
    { type: 'paragraph', text: ['A lean stack also benefits from a lean operating process. The ', { text: 'research-to-article workflow', href: '/blog/ai-daily-workflow-solo-business' }, ' shows how one controlled process can reduce unnecessary tool switching while keeping human approval.'] },

    { type: 'heading', level: 2, id: 'worksheet', text: 'Copyable software stack audit worksheet' },
    { type: 'heading', level: 3, id: 'worksheet-a', text: 'A. Inventory' },
    { type: 'table', caption: 'Copy this row for every recurring item', columns: ['Tool / plan', 'Actual billing', 'Monthly equivalent', 'Renewal', 'Owner', 'Last useful use'], rows: [['', '', '', '', '', '']] },
    { type: 'heading', level: 3, id: 'worksheet-b', text: 'B. Required coverage' },
    { type: 'table', caption: 'Define the job before choosing the tool', columns: ['Required job', 'Current coverage', 'Proposed coverage', 'Test evidence', 'Risk'], rows: [['', '', '', '', '']] },
    { type: 'heading', level: 3, id: 'worksheet-c', text: 'C. Cost separation' },
    { type: 'table', caption: 'Do not combine different cost types', columns: ['Recurring software cash', 'Migration cash', 'Outside service cash', 'Owner hours'], rows: [['', '', '', '']] },
    { type: 'heading', level: 3, id: 'worksheet-d', text: 'D. Decision register' },
    { type: 'table', caption: 'Record the decision and its condition', columns: ['Tool', 'Keep / downgrade / cancel / trial', 'Reason', 'Precondition', 'Review date'], rows: [['', '', '', '', '']] },
    { type: 'heading', level: 3, id: 'worksheet-e', text: 'E. Result' },
    { type: 'table', caption: 'Complete the audit arithmetic', columns: ['Old recurring', 'Retained recurring', 'Replacement recurring', 'Monthly result', 'Migration cash', 'First-year result'], rows: [['', '', '', '', '', '']] },
    { type: 'cta', title: 'Run the cash calculation', text: 'Enter the old, retained and replacement recurring cash totals. The calculator preserves zero and negative outcomes and keeps migration cash separate.', label: 'Open the SaaS stack calculator', href: '/tools/saas-calculator' },

    { type: 'heading', level: 2, id: 'questions', text: 'Questions before you finish' },
    { type: 'heading', level: 3, id: 'how-often', text: 'How often should I audit the stack?' },
    { type: 'paragraph', text: 'Review it when a major renewal approaches, a required workflow changes or overlapping subscriptions accumulate. The useful interval depends on contract timing and how quickly your operating process changes.' },
    { type: 'heading', level: 3, id: 'count-time', text: 'Should I convert my time into money?' },
    { type: 'paragraph', text: 'Track the hours first. Convert them only when you have an approved, relevant valuation method. Otherwise report cash and time separately.' },
    { type: 'heading', level: 3, id: 'cancel-unused', text: 'Can I cancel anything that looks unused?' },
    { type: 'paragraph', text: 'Low visible use is a prompt to investigate, not proof that the tool is unnecessary. Check integrations, automated work, records, ownership and recovery before cancelling.' },
    { type: 'heading', level: 3, id: 'ai-replacement', text: 'Can one AI assistant replace the whole stack?' },
    { type: 'paragraph', text: 'An assistant may cover several drafting or analysis tasks. It does not by itself prove coverage for delivery, storage, permissions, consent, billing or recovery. Test every required job.' },

    { type: 'heading', level: 2, id: 'limitations', text: 'Limitations' },
    { type: 'list', items: [
      'The worksheet does not determine whether a specific product satisfies legal, security or compliance requirements.', 'Normalized monthly costs can differ from real cash timing and contract commitments.', 'The formulas do not value tax effects, financing, exchange-rate changes or opportunity cost.', 'Product capabilities and plan limits change; verify them with current primary documentation.', 'A successful limited trial does not guarantee every future workflow or failure mode.',
    ] },
    { type: 'sources', id: 'sources', title: 'Sources and further reading' },
  ],
} satisfies ArticleDocument;
