import type { ArticleDocument } from '../types';
import { PUBLIC_AUTHOR } from '../../data/site';

const announcement = 'https://openai.com/index/introducing-businesses-chatgpt/';
const setup = 'https://help.openai.com/en/articles/20001635-setting-up-your-business-on-chatgpt';
const policy = 'https://openai.com/policies/business-agents-policy/';
const terms = 'https://openai.com/policies/businesses-in-chatgpt-terms/';
const overview = 'https://openai.com/business/businesses-in-chatgpt/';
const google = 'https://blog.google/innovation-and-ai/products/gemini-app/new-tools-small-business-owners/';
const cover = {
  src: '/images/blog/chatgpt-business-hub-small-business.webp',
  alt: 'ChatGPT Business Hub editorial guide: check eligibility, prepare business facts and review answers.',
  width: 1600, height: 900,
};

export const chatgptBusinessHub = {
  id: 'ds-blog-chatgpt-business-hub',
  slug: '/blog/chatgpt-business-hub-small-business',
  title: 'ChatGPT Business Hub: What Small Businesses Should Set Up First',
  description: 'A practical guide to ChatGPT Business Hub: profile eligibility, agent limits and the business information to prepare before launching a customer-facing agent.',
  excerpt: 'Start with accurate business information, check the rollout limits and review customer answers before deciding whether to launch an agent.',
  deck: 'Prepare an accurate business profile, check eligibility and test the answers before launching a customer-facing agent.',
  seoTitle: 'ChatGPT Business Hub for Small Businesses | Domsky',
  socialTitle: 'ChatGPT Business Hub: What to Set Up First',
  socialDescription: 'Separate profile claiming, agent publication and advertising. Prepare the information your customers actually need.',
  category: 'AI News', contentType: 'article', author: PUBLIC_AUTHOR,
  // Proposed release date on the review branch; merging remains the publication gate.
  publishedAt: '2026-11-15', updatedAt: '2026-11-15', verifiedAt: '2026-11-15',
  status: 'published', readingMinutes: 6,
  tags: ['ChatGPT', 'Business Hub', 'AI discovery', 'Small business', 'Business agents'],
  relatedSlugs: ['/uses', '/blog/replaced-saas-stack-with-ai-tools', '/blog/ai-daily-workflow-solo-business'],
  featuredImageRequired: true,
  featuredImage: { ...cover, caption: 'Editorial preparation guide, not a product screenshot. Publishing an agent is optional and depends on eligibility and review.' },
  ogImage: cover,
  commercial: false, recommendedUpdateDays: 7, affiliateDisclosureRequired: false,
  disclosure: 'This article contains no affiliate links. It reports official documentation and separates Domsky recommendations from provider claims.',
  verificationPending: [],
  sources: [
    { id: 'BH-01', title: 'OpenAI: Introducing Businesses in ChatGPT, 10 November 2026', url: announcement },
    { id: 'BH-02', title: 'OpenAI Help: Setting up your business on ChatGPT', url: setup },
    { id: 'BH-03', title: 'OpenAI: Business Agents Policy', url: policy },
    { id: 'BH-04', title: 'OpenAI: Businesses in ChatGPT Terms', url: terms },
    { id: 'BH-05', title: 'Google: New Gemini tools for small business owners, 20 October 2026', url: google },
    { id: 'BH-06', title: 'OpenAI: Businesses in ChatGPT overview', url: overview },
  ],
  blocks: [
    { type: 'paragraph', text: 'Before launching a customer-facing AI agent, fix the information it will answer from. For a solo business, a clear offer, current policies and a working contact route are a useful starting point.' },
    { type: 'paragraph', text: ['OpenAI announced ', { text: 'Businesses in ChatGPT in beta on 10 November 2026', href: announcement }, '. Business Hub lets eligible businesses claim their profile, contribute information and view engagement insights. Customer-facing Business Agents are a separate option, initially for eligible U.S. ecommerce and online service businesses.'] },
    { type: 'note', title: 'Scope of this guide', text: 'Official sources were reviewed on 15 November 2026. No account setup, agent operation or lead measurement was performed for this article. The preparation checklist and example below are editorial recommendations. Availability and setup requirements can change.' },
    { type: 'heading', level: 2, id: 'why-now', text: 'Why this launch matters to a small business' },
    { type: 'paragraph', text: ['The recent announcements point toward AI assistants becoming another place to manage business information and customer interactions. Google also announced a ', { text: 'Gemini business landing page and connected tools on 20 October', href: google }, '. Its focus includes work inside a business; ChatGPT’s new profile and Business Agent focus on how customers encounter that business. These are different jobs.'] },
    { type: 'paragraph', text: 'For a solo operator, the immediate work is maintaining answers. If an agent repeats an outdated delivery policy, somebody still has to correct it. Improving the public page helps customers today, whether or not you launch an agent.' },
    { type: 'heading', level: 2, id: 'separate-decisions', text: 'Separate the profile, the agent and the ad' },
    { type: 'paragraph', text: ['Treat claiming a profile, publishing an agent and paying for advertising as three decisions. OpenAI’s ', { text: 'launch announcement', href: announcement }, ' describes each separately.'] },
    { type: 'table', caption: 'Three separate decisions, based on OpenAI documentation reviewed 15 November 2026', columns: ['Decision', 'Purpose', 'What to check first'], rows: [
      ['Claim a profile', 'Manage the business information you supply', 'Ownership, supported location and verification'],
      ['Publish an agent', 'Answer customer questions about the business', 'Agent eligibility, accurate source material and reviewed answers'],
      ['Advertise', 'Pay for a separate promotional placement', 'A defined campaign objective and an advertising arrangement'],
    ] },
    { type: 'paragraph', text: ['OpenAI says claiming a profile ', { text: 'does not guarantee higher placement or sales', href: overview }, '. Treat a profile as an information-maintenance decision. Assess any paid promotion against its own budget and results.'] },
    { type: 'heading', level: 2, id: 'eligibility', text: 'Check your location and verification path' },
    { type: 'paragraph', text: ['The ', { text: 'Help Center', href: setup }, ' makes the rollout narrower than a general “businesses can join” headline. Claim availability depends on location, business type and supported verification. Local stores and restaurants can currently claim only existing U.S. listings. Business Agents require an eligible U.S. ecommerce or online service business with a website.'] },
    { type: 'paragraph', text: 'If you operate in Slovakia, elsewhere in Europe or another market, check profile access separately from agent access. Prepare the source material while waiting for supported access; there is no reason to build a workaround around an unavailable feature.' },
    { type: 'note', title: 'Check the publishing consequence before verification', text: ['OpenAI requires approved Persona identity verification for profile edits, insights and eligible agent creation. Creating a new profile through Persona can publish it automatically when approved. Read the ', { text: 'current setup instructions', href: setup }, ' before submitting. Publishing an agent remains a separate step.'] },
    { type: 'heading', level: 2, id: 'prepare-information', text: 'Prepare one small business fact sheet' },
    { type: 'paragraph', text: 'Start with the questions customers ask before they buy or contact you. Use your current website and approved policies as the reference. Record a source URL and an owner for every answer that changes over time.' },
    { type: 'list', items: [
      [{ text: 'Offer and fit: ', strong: true }, 'what you sell, who it serves and what is outside the scope.'],
      [{ text: 'Price conditions: ', strong: true }, 'what is included, extra charges and when a quote is required.'],
      [{ text: 'Delivery or service boundaries: ', strong: true }, 'locations, lead times, availability and limitations.'],
      [{ text: 'Policies: ', strong: true }, 'returns, cancellations, support and the page that governs each answer.'],
      [{ text: 'Customer handoff: ', strong: true }, 'the correct product, contact or booking page and who handles unresolved questions.'],
    ] },
    { type: 'paragraph', text: ['For example, imagine an independent web designer offering a fixed-scope website package. “Unlimited revisions” in a draft description conflicts with a contract allowing two revision rounds. Correct the public description before adding it to another channel. This is a fictional preparation example, not a Business Hub test. The same evidence discipline appears in our ', { text: 'researched content workflow', href: '/blog/ai-daily-workflow-solo-business' }, '.'] },
    { type: 'process', title: 'Suggested preparation handoff', steps: [
      { title: 'Collect', description: 'Gather current public pages, policies and real customer questions.' },
      { title: 'Resolve', description: 'Correct conflicts and name an owner for information that changes.' },
      { title: 'Review', description: 'Approve the profile information; test an agent only if eligible and useful.' },
    ] },
    { type: 'heading', level: 2, id: 'agent-review', text: 'Test an agent before customers can use it' },
    { type: 'paragraph', text: ['An agent should have a clear job. OpenAI’s ', { text: 'Business Agents Policy', href: policy }, ' requires honest business representation and current information. Its ', { text: 'terms assign testing and correction responsibilities to the business', href: terms }, '. Publishing therefore creates an ongoing maintenance task.'] },
    { type: 'paragraph', text: 'Before release, write the expected answer and supporting page for each question below. Keep the actual response beside it, correct failures and repeat the question. These are proposed review questions; no beta test was performed for this article.' },
    { type: 'list', ordered: true, items: [
      'A normal fit question: which offering matches this clearly described customer need?',
      'A boundary question: can the business deliver to a location or deadline it does not support?',
      'A policy exception: can the customer receive a refund the published policy does not promise?',
      'A missing fact: what happens when the supplied information does not contain the answer?',
      'A human handoff: where should the customer go to resolve an account-specific problem?',
    ] },
    { type: 'paragraph', text: ['Watch for invented exceptions, stale facts and unsupported promises. The ', { text: 'current Help Center', href: setup }, ' says the agent explains offerings and links to your website; it cannot complete purchases, bookings or order checks. Keep the existing checkout and support routes working.'] },
    { type: 'heading', level: 2, id: 'measure', text: 'Measure useful customer activity' },
    { type: 'paragraph', text: ['Business Hub reports aggregated mentions, website clicks and discovery topics. OpenAI’s ', { text: 'insight documentation', href: setup }, ' says businesses do not receive individual conversations. Blank metrics can reflect reporting thresholds or unavailable data; they do not necessarily mean no activity.'] },
    { type: 'paragraph', text: 'For your own review, record the setup date, maintenance work and qualified enquiries you can actually identify. Keep mentions, clicks and sales as separate measures. A new dashboard is not evidence that the channel has paid for itself.' },
    { type: 'heading', level: 2, id: 'next-step', text: 'A useful next step before adding another tool' },
    { type: 'paragraph', text: 'Choose five genuine pre-sale questions. Find the public page that answers each, fix contradictions and decide who will keep the answers current. Then check whether Business Hub supports your business and whether a profile alone meets the immediate need.' },
    { type: 'paragraph', text: ['If maintaining the existing website and customer support already fills your available time, defer the agent. Use the ', { text: 'software stack audit', href: '/blog/replaced-saas-stack-with-ai-tools' }, ' to assess a new recurring obligation, and the ', { text: 'lean solo-business stack', href: '/uses' }, ' to keep the wider setup manageable.'] },
    { type: 'paragraph', text: ['Schedule the next information review in the ', { text: 'Content Calendar', href: '/tools/content-calendar' }, '. Recheck beta eligibility and published instructions before making the profile or agent public.'] },
    { type: 'sources', id: 'sources', title: 'Official sources' },
  ],
} satisfies ArticleDocument;
