import { Answers, emptyAnswers, parseAnswers, questionValid } from '../data/leanStack';
export const STORAGE_KEY = 'domsky.lean-stack.v1';
export type QuizState = { answers: Answers; step: number; stage: 'intro' | 'questions' | 'full' };
export function restoreQuiz(raw: string | null): QuizState | null {
  try {
    const data = JSON.parse(raw || 'null');
    if (data?.version !== 1) return null;
    const answers = parseAnswers(data.answers, false);
    if (!answers || !Number.isInteger(data.step) || data.step < 0 || data.step > 6) return null;
    if (!['intro','questions','full'].includes(data.stage)) return null;
    const firstMissing = ['business','team','goal','tasks','budget','existing','technical'].findIndex(key => !questionValid(answers, key as Parameters<typeof questionValid>[1]));
    return { answers, step: firstMissing >= 0 ? Math.min(data.step, firstMissing) : data.step, stage: data.stage === 'full' && firstMissing >= 0 ? 'questions' : data.stage };
  } catch { return null; }
}
export const initialQuiz = (): QuizState => ({ answers:emptyAnswers(), step:0, stage:'intro' });
type Event = 'started' | 'question_completed' | 'completed' | 'restarted' | 'affiliate_link_clicked';
// Local interface only. A future analytics adapter can listen without receiving answers or PII.
export function trackQuiz(event: Event, question?: number) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('domsky:analytics', { detail: { name:`stack_quiz_${event}`, ...(Number.isInteger(question) && question! >= 1 && question! <= 7 ? { question } : {}) } }));
}
