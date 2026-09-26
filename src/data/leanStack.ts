import { productFacts, type ProductFactId } from './productFacts';
import { SITE_URL } from './site';

export type Answers = {
  business: string; team: string; goal: string; tasks: string[]; budget: string;
  existing: string[]; technical: string; businessOther: string; tasksOther: string; existingOther: string;
};
export type QuestionKey = 'business' | 'team' | 'goal' | 'tasks' | 'budget' | 'existing' | 'technical';
export const budgetConfig = {
  currency: 'EUR', symbol: '€',
  options: [
    { id: 'low', label: '€0–€25', ceiling: 25 }, { id: 'medium', label: '€26–€75', ceiling: 75 },
    { id: 'high', label: '€76–€150', ceiling: 150 }, { id: 'flexible', label: 'More than €150', ceiling: 150 },
    { id: 'unsure', label: 'I am not sure yet', ceiling: 25 },
  ],
};
export const questions: { key: QuestionKey; title: string; help: string; multi?: boolean; other?: keyof Answers; options: [string, string][] }[] = [
  { key: 'business', title: 'What are you building?', help: 'Choose the closest fit. You can add a little context if you choose Other.', other: 'businessOther', options: [['service','Service business'],['content','Content business'],['saas','SaaS product'],['ecommerce','Ecommerce business'],['other','Other']] },
  { key: 'team', title: 'How large is your team?', help: 'Include everyone who regularly uses your business tools.', options: [['solo','Solo'],['small','2–5 people'],['growing','6–20 people']] },
  { key: 'goal', title: 'What is your main goal?', help: 'Pick the one outcome you want to improve first.', options: [['content','Create better content'],['automation','Automate repetitive work'],['product-building','Build and launch a product'],['customer-sales','Manage customers and sales'],['cost-reduction','Reduce software costs']] },
  { key: 'tasks', title: 'Which tasks consume the most time?', help: 'Choose up to three. Focus on the work that slows you down most.', multi: true, other: 'tasksOther', options: [['writing','Research and writing'],['design','Design and media creation'],['publishing','Publishing and content distribution'],['admin','Repetitive administration'],['customers','Customer communication'],['sales','Lead management and sales'],['development','Product development'],['analytics','Reporting and analytics'],['collaboration','Team collaboration'],['other','Other']] },
  { key: 'budget', title: 'What is your monthly software budget?', help: 'Your budget is a ceiling, not a spending target. Start free where practical.', options: budgetConfig.options.map(b => [b.id, b.label]) },
  { key: 'existing', title: 'Which tools do you already use?', help: 'Choose all that apply. I will look for ways to reuse what you have.', multi: true, other: 'existingOther', options: [['assistant','ChatGPT or another AI assistant'],['design','Canva or another design platform'],['email','Kit/ConvertKit or another email platform'],['workspace','Notion or another workspace'],['automation','Zapier, Make, or another automation platform'],['crm','A CRM or sales platform'],['website','Website builder or CMS'],['analytics','Analytics platform'],['none','I do not use any yet'],['other','Other']] },
  { key: 'technical', title: 'How technical are you?', help: 'This helps me choose a setup you can maintain comfortably.', options: [['beginner','Beginner — I prefer simple tools with guided setup'],['comfortable','Comfortable — I can connect tools and follow technical instructions'],['technical','Technical — I can work with APIs, code, hosting, or advanced automation']] },
];
export const emptyAnswers = (): Answers => ({ business:'', team:'', goal:'', tasks:[], budget:'', existing:[], technical:'', businessOther:'', tasksOther:'', existingOther:'' });
export function selection(current: string[], value: string, key: 'tasks' | 'existing') {
  if (current.includes(value)) return current.filter(v => v !== value);
  if (key === 'tasks' && current.length >= 3) return current;
  if (value === 'none') return ['none'];
  return [...current.filter(v => v !== 'none'), value];
}
export function questionValid(a: Answers, key: QuestionKey) {
  const q = questions.find(q => q.key === key)!;
  const values = Array.isArray(a[key]) ? a[key] as string[] : [a[key] as string];
  return values.length > 0 && new Set(values).size === values.length && values.every(v => q.options.some(([id]) => id === v)) &&
    !(key === 'tasks' && values.length > 3) && !(key === 'existing' && values.includes('none') && values.length > 1);
}
export function parseAnswers(raw: unknown, complete = true): Answers | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const a = emptyAnswers();
  for (const q of questions) {
    const value = (raw as Record<string, unknown>)[q.key];
    if (q.multi) {
      if (!Array.isArray(value) || value.some(v => typeof v !== 'string')) return null;
      (a[q.key] as string[]) = [...value];
    } else { if (typeof value !== 'string') return null; (a[q.key] as string) = value; }
    if ((complete || (Array.isArray(value) ? value.length : value)) && !questionValid(a, q.key)) return null;
  }
  for (const key of ['businessOther','tasksOther','existingOther'] as const) {
    const value = (raw as Record<string, unknown>)[key];
    if (typeof value !== 'string' || value.length > 160) return null;
    a[key] = value.trim();
  }
  return a;
}
export const labelFor = (key: QuestionKey, value: string) => questions.find(q => q.key === key)?.options.find(([id]) => id === value)?.[1] || value;
export const segments = ['content','automation','product-building','customer-sales','cost-reduction','solo-founder','small-team','low-budget','AI-beginner','technical-founder'] as const;
export function tagsFor(a: Answers) {
  return [a.goal, a.team === 'solo' ? 'solo-founder' : 'small-team', ...(a.budget === 'low' ? ['low-budget'] : []), ...(a.technical === 'beginner' ? ['AI-beginner'] : a.technical === 'technical' ? ['technical-founder'] : [])];
}
export type Category = 'assistant' | 'design' | 'workspace' | 'email' | 'automation' | 'analytics' | 'website' | 'crm';
export type Product = ReturnType<typeof product>;
const recommendationRules: Record<ProductFactId, { affiliate: boolean; fit: string; use: string; skip: string; alternative: string }> = {
  chatgpt: { affiliate:false, fit:'One assistant can help outline, draft and summarize without adding separate writing subscriptions.', use:'People who can review outputs and verify important facts.', skip:'Skip a paid plan until free limits interrupt useful work. Do not enter confidential customer data without checking your policies.', alternative:'Write in your existing document editor and research original sources.' },
  canva: { affiliate:false, fit:'Reusable templates reduce the time spent on repeat visuals.', use:'Creators and teams making straightforward branded graphics.', skip:'Skip an upgrade if basic templates and your own assets cover the job.', alternative:'Reuse existing brand templates and native image editing tools.' },
  notion: { affiliate:false, fit:'Keep your tasks and content calendar in one place.', use:'Solo builders who want a simple list, calendar and notes.', skip:'Skip a new workspace if your current one works. Teams should check collaboration limits before inviting everyone.', alternative:'An existing shared document or spreadsheet with an owner and due date.' },
  kit: { affiliate:false, fit:'One permission-based list and welcome message are enough to start publishing.', use:'Content businesses and creators ready to build an email audience.', skip:'Skip advanced sequences before a basic newsletter and signup form are working.', alternative:'Use your existing email platform’s basic plan; do not move a working list just to switch tools.' },
  zapier: { affiliate:false, fit:'Start with one simple connection between tools you already use.', use:'Beginners with a stable, recurring task supported by the free plan.', skip:'Skip it if the task happens rarely or needs paid apps and multi-step workflows.', alternative:'A checklist or a native integration in your existing software.' },
  make: { affiliate:false, fit:'Visual scenarios suit people comfortable mapping data and troubleshooting connections.', use:'Confident users who can test and maintain a repeatable workflow.', skip:'Skip complex scenarios before you know the manual process works.', alternative:'Native integrations or a manual checklist; technical users can evaluate a small script they can maintain.' },
  wordpress: { affiliate:false, fit:'Validate an idea with a simple hosted page before buying a full website stack.', use:'Beginners publishing content, a service offer or an early product description.', skip:'The free plan is not a complete SaaS application or ecommerce checkout.', alternative:'A page on your existing website, or a simple offer document shared with prospective customers.' },
  github: { affiliate:false, fit:'Keep product source code, issues and change history together.', use:'Technical founders building and testing their own application.', skip:'Skip it as your primary builder if you need guided no-code setup. Hosting, a database and checkout are separate costs.', alternative:'Validate the offer manually on your current website before developing an application.' },
  hubspot: { affiliate:false, fit:'Track leads and the next action without buying a large sales suite.', use:'Small client pipelines that fit the current free limits.', skip:'Skip it when a shared lead list is sufficient; check seat limits for larger teams.', alternative:'A spreadsheet with lead, stage, owner and next follow-up date.' },
};
function product(id: ProductFactId) {
  const fact = productFacts[id];
  return { ...fact, price:fact.accessSummary, url:fact.officialUrl, ...recommendationRules[id] };
}
export const products = Object.fromEntries((Object.keys(productFacts) as ProductFactId[]).map(id => [id, product(id)])) as Record<ProductFactId, Product>;
export const stacks: Record<string, { name: string; explanation: string; base: Category[] }> = {
  content: { name:'Lean Content Builder', explanation:'Keep your current writing path, then test only the capability blocking useful content now.', base:['assistant'] },
  automation: { name:'Automation Essentials', explanation:'Document one repeatable process, then trial one connection only if manual work is a measured bottleneck.', base:['automation'] },
  'product-building': { name:'Product Launch Stack', explanation:'Keep the current validation path and add a website or development capability only when the next test requires it.', base:['website'] },
  'customer-sales': { name:'Client and Sales Stack', explanation:'Keep dependable client delivery tools and address only the step where inquiries or follow-ups are being lost.', base:['crm'] },
  'cost-reduction': { name:'Cost-Conscious Core Stack', explanation:'Audit existing access and remove overlap before trialling another subscription.', base:['workspace'] },
};
const taskCategory: Record<string, Category> = { writing:'assistant', design:'design', publishing:'email', admin:'automation', customers:'crm', sales:'crm', development:'website', analytics:'analytics', collaboration:'workspace' };
export function recommend(a: Answers) {
  if (!parseAnswers(a)) throw new Error('Complete all seven questions.');
  const stack = stacks[a.goal];
  const scores = new Map<Category, number>(stack.base.map((id, i) => [id, 100 - i]));
  for (const task of a.tasks) { const id = taskCategory[task]; if (id) scores.set(id, (scores.get(id) || 0) + 20); }
  const categories = [...scores].sort((a,b) => b[1] - a[1]).slice(0, 4).map(([id]) => id);
  const essentials = categories.map(category => {
    const owned = a.existing.includes(category);
    const id = category === 'assistant' ? 'chatgpt' : category === 'design' ? 'canva' : category === 'workspace' ? 'notion' : category === 'email' ? 'kit' : category === 'automation' ? a.technical === 'beginner' ? 'zapier' : 'make' : category === 'crm' ? 'hubspot' : category === 'website' ? a.technical === 'technical' && (a.business === 'saas' || a.goal === 'product-building') ? 'github' : 'wordpress' : '';
    const product = products[id];
    const manual = category === 'analytics' || a.goal === 'cost-reduction' || (!owned && ((category === 'workspace' && a.team !== 'solo') || (category === 'crm' && (a.team === 'growing' || a.budget === 'low')) || (category === 'automation' && a.budget === 'low')));
    const categoryName = product?.categoryName || 'Reporting and analytics';
    const namedNeed = a.tasks.some(task => taskCategory[task] === category);
    const decision = owned ? 'keep' as const : manual ? 'skip' as const : namedNeed && category !== 'assistant' ? 'add' as const : 'trial' as const;
    return { category, categoryName, owned, decision, product: owned || manual ? null : product,
      name: owned ? `Keep your existing ${categoryName.toLowerCase()} tool` : manual ? category === 'analytics' ? 'Built-in reports and a simple tracking sheet' : `A shared ${category === 'crm' ? 'lead list' : category === 'automation' ? 'process checklist' : 'task list'}` : product.name,
      reason: owned ? 'You already use a tool in this category. Keep it if it meets this goal; do not add a second subscription for the same job.' : manual ? 'A manual or built-in workflow is enough to start. This avoids paid seats and unnecessary integrations.' : product.fit,
      price: owned ? 'No incremental subscription recommended; your current fees still apply.' : manual ? 'No new subscription required.' : product.price,
      gap: owned ? 'No uncovered requirement is assumed. Keep only while the current tool completes the job.' : manual ? 'The selected task can begin with existing or manual access.' : namedNeed ? `You named a task that requires ${categoryName.toLowerCase()}; this is the unmet need to test.` : `Your selected goal points to ${categoryName.toLowerCase()} as a capability to test before adding it.`,
      trial: owned ? 'Check the current tool against the required job before considering a replacement.' : manual ? 'Run the workflow manually and record any repeated failure before researching software.' : 'Use non-critical work, define pass/fail criteria and keep the current path until the candidate proves coverage.',
      incrementalCost: owned || manual ? '€0 in new subscriptions' : 'Check the candidate’s current plan only after the trial; count the full new charge unless another cost is actually removed.',
    };
  });
  const budget = budgetConfig.options.find(b => b.id === a.budget)!;
  const allowance = 0;
  const cost = 'No universal total — calculate incremental cost after each successful trial.';
  const insight = a.existing.some(v => v !== 'none' && v !== 'other') ? 'Keep the tools you already use when they cover these jobs. Replace a tool only after checking its gaps and export options.' : a.technical === 'beginner' ? 'Skip advanced automation until you have completed the workflow manually.' : 'Skip duplicate AI assistants. Start with one and measure whether it saves useful work.';
  const skip = [
    a.goal === 'automation' ? 'Skip automating an unstable process. Test one repeatable task before expanding.' : 'Skip a new automation platform until you have a stable, recurring task.',
    a.team === 'solo' ? 'Skip enterprise collaboration and per-seat suites while you work alone.' : 'Skip separate workspaces for each team. Check seat costs before rolling out any paid plan.',
    a.goal === 'cost-reduction' ? 'Skip new purchases until you have checked renewals, duplicate features and data export requirements.' : 'Skip overlapping writing, research and AI subscriptions until one assistant proves insufficient.',
  ];
  const next = a.goal === 'cost-reduction' ? 'List each subscription, its renewal date and the job it does. Flag duplicates before your next renewal.' : a.goal === 'automation' ? 'Write down one repetitive task from start to finish. Run it manually once, then test one native integration or free automation.' : a.goal === 'customer-sales' ? 'Put your current leads in one list and give each a next follow-up date.' : a.goal === 'product-building' ? 'Publish a short offer or prototype description and ask three prospective customers for feedback before expanding the build.' : 'Create one reusable content outline and schedule one useful piece for this week.';
  const bestFor = `${labelFor('business',a.business)} · ${labelFor('team',a.team)} · ${labelFor('goal',a.goal)} · ${budget.label} · ${a.technical} setup`;
  return { name:stack.name, explanation:stack.explanation, bestFor, essentials, cost, allowance, insight, skip, next,
    budgetNote:'The starter recommendations use free tiers, existing tools or manual workflows. Any range is an optional spending allowance, not a vendor quote. Existing subscriptions, tax, domains, hosting, payment fees and usage charges are not included. Check current limits and total team seats before upgrading.',
    upgrade: 'Do not spend to fill a category. Trial the smallest missing capability, verify the current quote, then record its full incremental recurring cost and any cost actually removed.',
    businessNote: a.business === 'ecommerce' ? 'For an online store, keep your current commerce platform. This is a supporting workflow stack, not a priced checkout, inventory or payment solution.' : a.business === 'saas' ? 'For a SaaS product, this is a validation and workflow stack. Production hosting, security, data storage and payment processing need a separate cost assessment.' : 'Start with one useful outcome before expanding your stack.',
  };
}
export type StackResult = ReturnType<typeof recommend>;
export function summaryFor(result: StackResult) {
  return `${result.name}\n${result.bestFor}\n${result.cost}\n${result.essentials.map(i => `${i.categoryName}: ${i.name}`).join('\n')}\nNext step: ${result.next}\n${SITE_URL}/#stack-finder`;
}
