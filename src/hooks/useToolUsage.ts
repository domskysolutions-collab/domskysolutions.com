import { useCallback, useEffect, useMemo, useState } from 'react';

const TOOL_DAILY_LIMITS: Record<string, number> = {
  'email-writer': 2,
  'tool-description': 2,
  'cost-audit': 1,
  'prompt-builder': 2,
  'stack-recommender': 2,
  'content-calendar': 1,
};
const EMAIL_BONUS = 3;
function todayIso(): string { return new Date().toISOString().slice(0, 10); }
function readCount(toolId: string): { date: string; count: number } { if (typeof window === 'undefined') return { date: todayIso(), count: 0 }; try { const raw = localStorage.getItem(`tool-usage:${toolId}`); if (!raw) return { date: todayIso(), count: 0 }; const parsed = JSON.parse(raw) as { date?: string; count?: number }; return parsed.date === todayIso() ? { date: parsed.date, count: parsed.count || 0 } : { date: todayIso(), count: 0 }; } catch { return { date: todayIso(), count: 0 }; } }
function unlocked() { return typeof window !== 'undefined' && localStorage.getItem('tool-email-unlocked') === 'true'; }
export function useToolUsage(toolId: string) {
  const baseLimit = useMemo(() => TOOL_DAILY_LIMITS[toolId] ?? 2, [toolId]);
  const [emailUnlocked, setEmailUnlocked] = useState(unlocked);
  const [remainingUses, setRemainingUses] = useState(() => Math.max(0, baseLimit + (unlocked() ? EMAIL_BONUS : 0) - readCount(toolId).count));
  const dailyLimit = baseLimit + (emailUnlocked ? EMAIL_BONUS : 0);
  useEffect(() => { const onUnlock = () => { setEmailUnlocked(true); const { count } = readCount(toolId); setRemainingUses(Math.max(0, dailyLimit + EMAIL_BONUS - count)); }; window.addEventListener('tool-email-unlocked', onUnlock); return () => window.removeEventListener('tool-email-unlocked', onUnlock); }, [toolId, dailyLimit]);
  const incrementUsage = useCallback(() => { const { date, count } = readCount(toolId); const nextCount = date === todayIso() ? count + 1 : 1; localStorage.setItem(`tool-usage:${toolId}`, JSON.stringify({ date: todayIso(), count: nextCount })); const limit = baseLimit + (localStorage.getItem('tool-email-unlocked') === 'true' ? EMAIL_BONUS : 0); setRemainingUses(Math.max(0, limit - nextCount)); }, [toolId, baseLimit]);
  return { limitReached: remainingUses <= 0, remainingUses, incrementUsage, dailyLimit };
}

