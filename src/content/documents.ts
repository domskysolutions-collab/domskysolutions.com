import { astraComparison } from './articles/astra-vs-claude-code';
import { assistantComparison } from './articles/chatgpt-vs-claude-vs-gemini';
import { kitReview } from './articles/kit-review';
import { emailPlatformComparison } from './articles/kit-vs-mailerlite-vs-beehiiv';
import type { ArticleDocument } from './types';

// Register approved documents here. Keep this module free of rendering/date formatting.
export const articles: ArticleDocument[] = [astraComparison, assistantComparison, kitReview, emailPlatformComparison];

