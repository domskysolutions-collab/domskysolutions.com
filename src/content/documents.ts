import { makeZapierComparison } from './articles/make-vs-zapier';
import { clientIntakeApproaches } from './articles/ai-agent-vs-automation-client-intake-2027';
import { chatgptBusinessHub } from './articles/chatgpt-business-hub';
import { astraComparison } from './articles/astra-vs-claude-code';
import { assistantComparison } from './articles/chatgpt-vs-claude-vs-gemini';
import { kitReview } from './articles/kit-review';
import { emailPlatformComparison } from './articles/kit-vs-mailerlite-vs-beehiiv';
import { leanContentWorkflow } from './articles/lean-content-workflow';
import { softwareStackAudit } from './articles/software-stack-audit';
import { leanSoloBusinessStack } from './articles/lean-solo-business-stack';
import type { ArticleDocument } from './types';

// Register approved documents here. Keep this module free of rendering/date formatting.
export const articles: ArticleDocument[] = [clientIntakeApproaches, astraComparison, assistantComparison, kitReview, emailPlatformComparison, chatgptBusinessHub, leanContentWorkflow, softwareStackAudit, leanSoloBusinessStack, makeZapierComparison];
