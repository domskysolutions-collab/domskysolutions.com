import { useCallback, useMemo, useState } from 'react';

const TOOL_DAILY_LIMITS: Record<string, number> = {
  'email-writer': 3,
};

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function readCount(toolId: string): { date: string; count: number } {
  if (typeof window === 'undefined') {
    return { date: todayIso(), count: 0 };
  }
  try {
    const raw = localStorage.getItem(`tool-usage:${toolId}`);
    if (!raw) return { date: todayIso(), count: 0 };
    const parsed = JSON.parse(raw) as { date?: string; count?: number };
    const date = typeof parsed.date === 'string' ? parsed.date : todayIso();
    const count = typeof parsed.count === 'number' ? parsed.count : 0;
    if (date !== todayIso()) return { date: todayIso(), count: 0 };
    return { date, count };
  } catch {
    return { date: todayIso(), count: 0 };
  }
}

export function useToolUsage(toolId: string) {
  const dailyLimit = useMemo(() => TOOL_DAILY_LIMITS[toolId] ?? 3, [toolId]);

  const [remainingUses, setRemainingUses] = useState(() => {
    const { count } = readCount(toolId);
    return Math.max(0, dailyLimit - count);
  });

  const [limitReached, setLimitReached] = useState(() => {
    const { count } = readCount(toolId);
    return count >= dailyLimit;
  });

  const incrementUsage = useCallback(() => {
    const { date, count } = readCount(toolId);
    const d = todayIso();
    const nextCount = date === d ? count + 1 : 1;
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        `tool-usage:${toolId}`,
        JSON.stringify({ date: d, count: nextCount })
      );
    }
    setRemainingUses(Math.max(0, dailyLimit - nextCount));
    setLimitReached(nextCount >= dailyLimit);
  }, [toolId, dailyLimit]);

  return {
    limitReached,
    remainingUses,
    incrementUsage,
    dailyLimit,
  };
}
