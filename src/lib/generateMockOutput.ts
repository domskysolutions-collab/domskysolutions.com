import type { ToolConfig } from '../data/tools';

/** Phase 1: deterministic fake output so UI works without an API. */
export function generateMockOutput(tool: ToolConfig, inputs: Record<string, string>): string {
  const lines: string[] = [];
  lines.push('── Demo output (AI not connected yet) ──');
  lines.push('');
  lines.push(`Tool: ${tool.name}`);
  lines.push(`Output style: ${tool.outputType}`);
  lines.push('');
  lines.push('Your inputs:');
  for (const [key, value] of Object.entries(inputs)) {
    if (value.trim()) lines.push(`• ${key}: ${value}`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');

  if (tool.outputType === 'list') {
    lines.push('Sample results you might get with AI connected:');
    for (let i = 1; i <= 5; i++) {
      lines.push(`${i}. [Preview] ${tool.name} result ${i} — tailored using your topic and settings above.`);
    }
    lines.push('');
    lines.push('Tip: In Phase 2 this panel will show real model output you can save to your workspace.');
  } else if (tool.outputType === 'markdown') {
    lines.push(`## ${tool.name}`);
    lines.push('');
    lines.push(
      'This is **placeholder markdown**. Once the API is wired, this section will contain structured copy (headings, bullets, CTAs) based on your inputs.'
    );
    lines.push('');
    lines.push('- Point one aligned with your brief');
    lines.push('- Point two with specifics from your form');
    lines.push('- Point three with a clear next step');
  } else {
    lines.push(
      `Here's a short preview paragraph for "${tool.name}". With live AI, this block expands into polished copy using your exact inputs — same layout, real text.`
    );
    lines.push('');
    lines.push(
      'Domsky Solutions · Honest tools for founders and creators. Upgrade later for higher limits and saved history.'
    );
  }

  return lines.join('\n');
}
