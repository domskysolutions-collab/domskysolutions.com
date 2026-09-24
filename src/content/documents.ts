import { astraComparison } from './articles/astra-vs-claude-code';
import { assistantComparison } from './articles/chatgpt-vs-claude-vs-gemini';
import type { ArticleDocument } from './types';

// Register approved documents here. Keep this module free of rendering/date formatting.
export const articles: ArticleDocument[] = [astraComparison, assistantComparison];

