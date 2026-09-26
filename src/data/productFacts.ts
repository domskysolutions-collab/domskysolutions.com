export type ProductFact = {
  id: string;
  name: string;
  category: 'assistant' | 'design' | 'workspace' | 'email' | 'automation' | 'website' | 'crm';
  categoryName: string;
  accessSummary: string;
  officialUrl: string;
  pricingUrl: string;
  verifiedOn: string;
};

// Provider facts stay separate from Domsky recommendation rules. These access
// summaries were checked against the linked official pricing pages on 2026-09-18.
// They deliberately omit paid prices, which can vary by region, tax and billing period.
export const productFacts = {
  chatgpt: { id:'chatgpt', name:'ChatGPT', category:'assistant', categoryName:'Writing and research', accessSummary:'Free plan; usage limits apply', officialUrl:'https://chatgpt.com/', pricingUrl:'https://chatgpt.com/pricing/', verifiedOn:'2026-09-18' },
  canva: { id:'canva', name:'Canva', category:'design', categoryName:'Design and media', accessSummary:'Free plan; premium assets cost extra', officialUrl:'https://www.canva.com/', pricingUrl:'https://www.canva.com/pricing/', verifiedOn:'2026-09-18' },
  notion: { id:'notion', name:'Notion', category:'workspace', categoryName:'Content calendar and project management', accessSummary:'Free individual plan; team limits apply', officialUrl:'https://www.notion.com/', pricingUrl:'https://www.notion.com/pricing', verifiedOn:'2026-09-18' },
  kit: { id:'kit', name:'Kit', category:'email', categoryName:'Email and newsletter', accessSummary:'Free Newsletter plan; features and subscriber limits apply', officialUrl:'https://kit.com/', pricingUrl:'https://kit.com/pricing', verifiedOn:'2026-09-18' },
  zapier: { id:'zapier', name:'Zapier', category:'automation', categoryName:'Automation', accessSummary:'Free plan for limited simple automations', officialUrl:'https://zapier.com/', pricingUrl:'https://zapier.com/pricing', verifiedOn:'2026-09-18' },
  make: { id:'make', name:'Make', category:'automation', categoryName:'Automation', accessSummary:'Free plan; credit and scheduling limits apply', officialUrl:'https://www.make.com/', pricingUrl:'https://www.make.com/en/pricing', verifiedOn:'2026-09-18' },
  wordpress: { id:'wordpress', name:'WordPress.com', category:'website', categoryName:'Website and product validation', accessSummary:'Free hosted site; custom domain and selling features may require payment', officialUrl:'https://wordpress.com/', pricingUrl:'https://wordpress.com/pricing/', verifiedOn:'2026-09-18' },
  github: { id:'github', name:'GitHub', category:'website', categoryName:'Product development', accessSummary:'Free plan; compute and advanced features have limits', officialUrl:'https://github.com/', pricingUrl:'https://github.com/pricing', verifiedOn:'2026-09-18' },
  hubspot: { id:'hubspot', name:'HubSpot CRM', category:'crm', categoryName:'Customers and sales', accessSummary:'Free CRM; seat, contact and feature limits apply', officialUrl:'https://www.hubspot.com/products/crm', pricingUrl:'https://www.hubspot.com/products/crm', verifiedOn:'2026-09-18' },
} as const satisfies Record<string, ProductFact>;

export type ProductFactId = keyof typeof productFacts;
