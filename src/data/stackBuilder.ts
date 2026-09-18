export const questions: { key: 'business' | 'goal' | 'existing' | 'budget' | 'problem'; title: string; options: [string, string][] }[] = [
  { key: 'business', title: 'What are you building?', options: [['content', 'Content website or blog'], ['newsletter', 'Newsletter'], ['freelance', 'Freelance or service business'], ['digital_product', 'Digital product business'], ['store', 'Small online store'], ['undecided', 'I’m still deciding']] },
  { key: 'goal', title: 'What is your next meaningful goal?', options: [['publish', 'Publish useful content'], ['audience', 'Build an email audience'], ['clients', 'Find and manage clients'], ['sell', 'Sell a product or service'], ['organize', 'Organize my work'], ['reduce_costs', 'Reduce software costs']] },
  { key: 'existing', title: 'What do you already have?', options: [['website', 'Website'], ['email', 'Email platform'], ['design', 'Design tool'], ['payments', 'Payment system'], ['analytics', 'Website analytics'], ['scheduling', 'Scheduling tool'], ['project_management', 'Project management tool'], ['none', 'None of these yet']] },
  { key: 'budget', title: 'What is your current monthly software budget?', options: [['free', 'I want to start free'], ['under_25', 'Under €25 per month'], ['25_75', '€25–€75 per month'], ['over_75', 'More than €75 per month'], ['unsure', 'I’m not sure yet']] },
  { key: 'problem', title: 'What is your biggest software problem right now?', options: [['start', 'I don’t know where to begin'], ['too_many', 'I already have too many tools'], ['cost', 'My subscriptions cost too much'], ['integration', 'My tools don’t work well together']] },
];
export type Answers = { business: string; goal: string; existing: string[]; budget: string; problem: string };
export const emptyAnswers = (): Answers => ({ business: '', goal: '', existing: [], budget: '', problem: '' });
export function toggleExisting(current: string[], value: string) {
  if (value === 'none') return current.includes('none') ? [] : ['none'];
  const rest = current.filter(item => item !== 'none');
  return rest.includes(value) ? rest.filter(item => item !== value) : [...rest, value];
}
export function isComplete(a: Answers) {
  return questions.every(q => q.key === 'existing'
    ? a.existing.length > 0 && a.existing.every(v => q.options.some(([key]) => key === v)) && !(a.existing.includes('none') && a.existing.length > 1)
    : q.options.some(([key]) => key === a[q.key]));
}
const categories = [
  ['website', 'Website', 'Publish one clear page explaining what you offer and who it helps.', 'Add a dedicated website when you have an offer or useful content to publish.'],
  ['email', 'Email platform', 'Create one signup form and a short welcome email.', 'Add an email platform when you are ready to collect permission-based subscribers.'],
  ['design', 'Design tool', 'Use one reusable template for your next piece of content or product.', 'Add a design tool when repeat visual work becomes a real need.'],
  ['payments', 'Payment system', 'Set up a trusted checkout or invoice payment link and test the purchase flow.', 'Add payments when you have an offer ready to sell. Transaction fees may apply.'],
  ['analytics', 'Website analytics', 'Measure one useful action, such as an inquiry or signup, using your platform’s built-in reports first.', 'Add basic analytics after you publish; deeper reporting can wait for meaningful traffic.'],
  ['scheduling', 'Scheduling tool', 'Use one booking link for client meetings; a calendar is enough until bookings repeat.', 'Add scheduling when back-and-forth booking becomes a recurring problem.'],
  ['project_management', 'Project management', 'Keep your next three tasks in one simple list or board.', 'Add a task board when a basic list no longer keeps work organized.'],
  ['ai', 'AI assistant', '', 'Skip a new AI subscription until a repeat task justifies it. This plan needs no AI service.'],
  ['automation', 'Advanced automation', '', 'Skip automation software until a stable, repeated workflow needs it.'],
  ['crm', 'Dedicated CRM', '', 'Skip a separate CRM while a simple client list can track your conversations.'],
  ['seo', 'Advanced SEO tools', '', 'Skip advanced SEO subscriptions until consistent publishing and search data reveal a specific need.'],
] as const;
export function buildPlan(a: Answers) {
  if (!isComplete(a)) throw new Error('Complete all five questions before building a plan.');
  // Business sets the foundation; the immediate goal adds only what that task requires.
  const byBusiness: Record<string, string[]> = { content: ['website', 'design'], newsletter: ['email'], freelance: ['website'], digital_product: ['website', 'design'], store: ['website', 'payments'], undecided: [] };
  const byGoal: Record<string, string[]> = { publish: ['website', 'design'], audience: ['email'], clients: ['website', 'project_management'], sell: ['payments'], organize: ['project_management'], reduce_costs: [] };
  const needed = new Set([...byBusiness[a.business], ...byGoal[a.goal]]);
  if (a.existing.includes('website') && needed.has('website')) needed.add('analytics');
  const items = categories.map(([id, name, action, later]) => ({ id, name,
    status: needed.has(id) ? 'now' : ['ai', 'automation', 'crm', 'seo'].includes(id) ? 'skip' : 'later',
    owned: a.existing.includes(id),
    explanation: needed.has(id) ? action : later,
  }));
  const budget = a.budget === 'free' ? 'Start with free plans and built-in features. A domain, hosting or payment fees may still cost money; “free” does not mean every business expense is covered.'
    : a.budget === 'under_25' ? 'Keep recurring costs lean. Use free plans first and pay for at most one clear bottleneck within your budget.'
    : a.budget === 'unsure' ? 'Start free where practical. Set a monthly ceiling before adding any recurring subscription.'
    : 'Your budget is a ceiling, not a target. Upgrade only when a recurring task or real usage limit justifies the cost.';
  const focus = a.problem === 'integration' ? 'Choose one task that crosses tools. Check native integrations and export options before adding a connector or moving your data.'
    : a.problem === 'too_many' || a.problem === 'cost' || a.goal === 'reduce_costs' ? 'List your subscriptions and the job each one does. Identify overlap, export anything you need, and review unused renewals before buying more.'
    : 'Start with the first missing essential below. Complete one useful task before adding another tool.';
  const first = items.find(i => i.status === 'now' && !i.owned);
  const next = a.goal === 'reduce_costs' || ['too_many', 'cost', 'integration'].includes(a.problem) ? focus
    : first ? first.explanation : needed.size ? 'Use a tool you already have to complete your next goal. You do not need another subscription to begin.' : 'Write down one audience, one problem you can help solve, and one small offer or piece of content to test.';
  return { items, budget, focus, next };
}
