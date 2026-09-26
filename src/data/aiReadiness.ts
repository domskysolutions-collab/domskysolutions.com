export const firstTaskOptions = [
  { id:'draft', label:'Draft a routine email or short document' },
  { id:'research', label:'Create a source-discovery checklist' },
  { id:'organize', label:'Turn rough notes into an action list' },
  { id:'review', label:'Review a draft against clear criteria' },
] as const;

export type FirstTaskId = typeof firstTaskOptions[number]['id'];

export const firstTaskPlans: Record<FirstTaskId, { title:string; task:string; success:string; caution:string }> = {
  draft: {
    title:'Try one low-risk drafting task',
    task:'Give an AI assistant the audience, purpose, required facts and desired format for one routine draft. Review and edit it before sending.',
    success:'The draft includes the required facts and needs less editing than starting from a blank page.',
    caution:'Do not include confidential information. You remain responsible for accuracy and tone.',
  },
  research: {
    title:'Try source discovery for one narrow question',
    task:'Ask for possible primary sources and search terms for one question. Open the original sources and verify every claim yourself.',
    success:'You find relevant primary sources without treating generated summaries as evidence.',
    caution:'Generated citations can be incomplete or wrong. Verify author, date and source directly.',
  },
  organize: {
    title:'Turn one set of notes into next actions',
    task:'Paste non-sensitive notes and ask for decisions, owners, due dates and open questions. Correct the list before using it.',
    success:'The output captures the real decisions and gives each next action a clear owner.',
    caution:'Remove private client or employee information unless your approved data policy allows it.',
  },
  review: {
    title:'Review one draft against a checklist',
    task:'Provide a draft plus three explicit criteria, such as clarity, factual support and required next action. Ask for issues, not a replacement draft.',
    success:'The review identifies specific issues you can verify and fix without inventing evidence.',
    caution:'Treat suggestions as a second pass, not final approval. Check factual and legal requirements yourself.',
  },
};

export function firstTaskPlan(id: FirstTaskId) { return firstTaskPlans[id]; }
