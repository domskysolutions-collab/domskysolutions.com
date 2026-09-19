import dotenv from 'dotenv';
import { segments } from '../src/data/leanStack';

dotenv.config({ path:'.env.local' });

const apiKey = process.env.KIT_API_KEY;
if (!apiKey) throw new Error('Set KIT_API_KEY in .env.local before running npm run setup:kit.');

const base = 'https://api.kit.com/v4';
async function kit(path: string, init: RequestInit = {}) {
  const response = await fetch(`${base}${path}`, {
    ...init,
    headers:{ 'Content-Type':'application/json', 'X-Kit-Api-Key':apiKey!, ...(init.headers || {}) },
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(`${init.method || 'GET'} ${path} failed (${response.status}): ${JSON.stringify(data)}`);
  return data;
}

const fieldLabels = [
  'Stack Business', 'Stack Team', 'Stack Goal', 'Stack Tasks', 'Stack Budget',
  'Stack Existing', 'Stack Technical', 'Stack Result', 'Stack Summary', 'Stack Consent',
];

const customFieldList = await kit('/custom_fields?per_page=100');
const customFields = Array.isArray(customFieldList?.custom_fields) ? customFieldList.custom_fields : [];
for (const label of fieldLabels) {
  const expectedKey = label.toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'');
  if (!customFields.some((field:any) => field.key === expectedKey || field.label?.toLowerCase() === label.toLowerCase())) {
    await kit('/custom_fields', { method:'POST', body:JSON.stringify({ label }) });
  }
}

const tagIds: Record<string, number> = {};
for (const name of segments) {
  const data = await kit('/tags', { method:'POST', body:JSON.stringify({ name }) });
  if (!Number.isSafeInteger(data?.tag?.id)) throw new Error(`Kit returned no ID for tag ${name}.`);
  tagIds[name] = data.tag.id;
}

const sequenceName = 'Lean Stack Finder — Welcome';
const sequenceList = await kit('/sequences?per_page=100');
const existingSequences = Array.isArray(sequenceList?.sequences) ? sequenceList.sequences : [];
let sequence = existingSequences.find((item:any) => item.name?.toLowerCase() === sequenceName.toLowerCase());
if (!sequence) {
  const created = await kit('/sequences', {
    method:'POST',
    body:JSON.stringify({ name:sequenceName, active:true, repeat:false, hold:false, time_zone:'Europe/Bratislava' }),
  });
  sequence = created?.sequence;
}
if (!Number.isSafeInteger(sequence?.id)) throw new Error('Kit returned no sequence ID.');

const emailList = await kit(`/sequences/${sequence.id}/emails?per_page=100`);
const existingEmails = Array.isArray(emailList?.emails) ? emailList.emails : [];
if (existingEmails.length === 0) {
  const emails = [
    {
      subject:'Your lean software stack: start here', delay_value:0, delay_unit:'days',
      preview_text:'One useful next step—without adding more software.',
      content:`<p>Thanks for using the Lean AI &amp; SaaS Stack Finder.</p><p>Your complete recommendation appeared immediately after signup. Before adding anything new, choose the single task that costs you the most time and check whether a tool you already use can solve it.</p><p><strong>Your first step:</strong> keep the smallest stack that supports your current goal. Add a tool only when you can name the specific recurring problem it will remove.</p><p><a href="https://www.domskysolutions.com/#stack-finder">Review or retake the Stack Finder</a></p><p>— Domsky Solutions</p>`,
    },
    {
      subject:'Three software overlaps worth checking', delay_value:2, delay_unit:'days',
      preview_text:'A short audit before your next renewal.',
      content:`<p>A lean stack is often created by removing overlap, not finding another app.</p><p>Check these three common duplicates:</p><ol><li><strong>AI assistants:</strong> keep one primary assistant unless a second tool has a clearly different job.</li><li><strong>Planning tools:</strong> avoid splitting tasks, notes, and calendars across several workspaces.</li><li><strong>Automation:</strong> check built-in integrations before paying for a separate automation platform.</li></ol><p>Write one sentence describing the job of every subscription. If two tools have the same sentence, compare them before the next renewal.</p><p>— Domsky Solutions</p>`,
    },
    {
      subject:'A simple rule for choosing your next tool', delay_value:3, delay_unit:'days',
      preview_text:'Buy for a proven bottleneck, not a possible future need.',
      content:`<p>Use this rule before choosing your next tool:</p><p><strong>Only add it when the same important problem has appeared repeatedly, the tool fits your budget, and you know how you will measure whether it helped.</strong></p><p>Start with the free or lowest-cost option. Set a review date. If it does not save useful time, improve output, or reduce another cost, remove it before renewal.</p><p>Domsky Solutions will keep sharing practical comparisons, affordable alternatives, and clear reasons to skip tools that do not fit.</p><p><a href="https://www.domskysolutions.com/">Browse practical tool guides</a></p><p>— Domsky Solutions</p>`,
    },
  ];
  for (const [position,email] of emails.entries()) {
    await kit(`/sequences/${sequence.id}/emails`, {
      method:'POST',
      body:JSON.stringify({ ...email, position, published:false }),
    });
  }
}

console.log('\nKit resources prepared. The three sequence emails remain drafts for review.');
console.log('\nAdd these server-only variables to Vercel Production, Preview and Development:');
console.log(`KIT_STACK_SEQUENCE_ID=${sequence.id}`);
console.log(`KIT_STACK_TAG_IDS='${JSON.stringify(tagIds)}'`);
console.log('KIT_API_KEY=<the same Kit API v4 key used for this setup>');
console.log('KIT_STACK_FORM_ID=<create the dedicated form in Kit, then paste its numeric ID>');
console.log('\nManual Kit step: create a form named “Lean Stack Finder”, enable its confirmation/incentive email, and review/publish the sequence emails.');
