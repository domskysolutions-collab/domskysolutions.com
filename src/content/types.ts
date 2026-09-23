export type RichText = string | Inline[];
export type Inline = string | { text: string; strong?: boolean; href?: string; affiliate?: boolean };
export type ArticleImage = { src: string; alt: string; caption?: string; width?: number; height?: number };
export type ArticleSource = { id: string; title: string; url: string };
export type ArticleBlock =
  | { type: 'paragraph' | 'quote'; text: RichText }
  | { type: 'heading'; level: 2 | 3; id: string; text: string; toc?: boolean }
  | { type: 'list'; ordered?: boolean; items: RichText[] }
  | { type: 'quickAnswer' | 'note' | 'bestFor'; title: string; text: RichText }
  | { type: 'prosCons'; pros: RichText[]; cons: RichText[] }
  | { type: 'table' | 'pricing'; caption: string; columns: string[]; rows: RichText[][] }
  | { type: 'image'; image: ArticleImage }
  | { type: 'workflow'; caption: string; paths: { title: string; steps: string[] }[] }
  | { type: 'cta'; title: string; text: RichText; label: string; href: string; affiliate?: boolean }
  | { type: 'sources'; id: string; title: string }
  | { type: 'divider' };
export const categories = ['AI News', 'Comparisons', 'Design', 'Workflows', 'Guides'] as const;
export type Category = typeof categories[number];
export type ArticleDocument = {
  id: string;
  title: string;
  slug: `/blog/${string}` | `/comparisons/${string}`;
  description: string;
  deck?: string;
  category: Category;
  author: { name: string; type: 'Person' | 'Organization'; url: string };
  publishedAt: string | null;
  updatedAt: string | null;
  verifiedAt: string | null;
  status: 'draft' | 'published';
  contentType: 'article' | 'comparison' | 'guide';
  tags: string[];
  relatedSlugs: string[];
  readingMinutes: number;
  featuredImage: ArticleImage | null;
  featuredImageRequired?: boolean;
  commercial?: boolean;
  recommendedUpdateDays?: number;
  ogImage?: ArticleImage;
  affiliateDisclosureRequired: boolean;
  disclosure?: string;
  sources: ArticleSource[];
  verificationPending: string[];
  blocks: ArticleBlock[];
};
export type ArticleCardData = {
  title: string; slug: string; excerpt: string; category: string; date: string;
  readTime: string; image: string | null; imageAlt?: string; author: string;
};
export function formatArticleDate(value: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(value + 'T00:00:00Z'));
}

