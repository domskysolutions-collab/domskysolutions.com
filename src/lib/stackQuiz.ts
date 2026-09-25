import { Answers, emptyAnswers, parseAnswers, questionValid } from '../data/leanStack';
export const STORAGE_KEY = 'domsky.lean-stack.v1';
export type QuizState = { answers: Answers; step: number; stage: 'intro' | 'questions' | 'partial' };
export function restoreQuiz(raw: string | null): QuizState | null {
  try {
    const data = JSON.parse(raw || 'null');
    if (data?.version !== 1) return null;
    const answers = parseAnswers(data.answers, false);
    if (!answers || !Number.isInteger(data.step) || data.step < 0 || data.step > 6) return null;
    if (!['intro','questions','partial'].includes(data.stage)) return null;
    const firstMissing = ['business','team','goal','tasks','budget','existing','technical'].findIndex(key => !questionValid(answers, key as Parameters<typeof questionValid>[1]));
    return { answers, step: firstMissing >= 0 ? Math.min(data.step, firstMissing) : data.step, stage: data.stage === 'partial' && firstMissing >= 0 ? 'questions' : data.stage };
  } catch { return null; }
}
export const initialQuiz = (): QuizState => ({ answers:emptyAnswers(), step:0, stage:'intro' });
type Event = 'started' | 'question_completed' | 'partial_result_viewed' | 'email_submitted' | 'completed' | 'restarted' | 'affiliate_link_clicked';
// Local interface only. A future analytics adapter can listen without receiving answers or PII.
export function trackQuiz(event: Event, question?: number) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('domsky:analytics', { detail: { name:`stack_quiz_${event}`, ...(Number.isInteger(question) && question! >= 1 && question! <= 7 ? { question } : {}) } }));
}
export class SubmissionBusyError extends Error {}
export function createQuizSubscriber(fetcher: typeof fetch = fetch) {
  let pending = false;
  return async (payload: { email: string; firstName: string; consent: boolean; answers: Answers }) => {
    if (pending) throw new SubmissionBusyError('Submission already in progress.');
    pending = true;
    try {
      const response = await fetcher('/api/stack-subscribe', { method:'POST', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify(payload), signal:AbortSignal.timeout(15000) });
      // Hosting errors can be plain text or HTML rather than the expected JSON API response.
      const data = await response.json().catch(() => null);
      if (!response.ok || data?.ok !== true) throw new Error(response.status === 503 ? 'Email signup is not configured yet. Your preview is still available; please try again later.' : 'I couldn’t complete your signup. Your answers are safe. Please try again.');
      return { pendingConfirmation: data.pendingConfirmation === true };
    } catch (error) {
      if (error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError')) throw new Error('The signup timed out. Please try again; your answers are still here.');
      if (error instanceof TypeError) throw new Error('I couldn’t reach the signup service. Your answers are safe. Please try again.');
      throw error;
    } finally { pending = false; }
  };
}
