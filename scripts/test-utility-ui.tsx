import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { LeanStackFinder } from '../src/components/LeanStackFinder';
import { SaasCalculatorPage } from '../src/pages/tools/SaasCalculatorPage';
import { AiReadinessQuiz } from '../src/pages/tools/AiReadinessQuiz';

const render = (component: React.ReactNode) => renderToStaticMarkup(<MemoryRouter>{component}</MemoryRouter>);
const finder = render(<LeanStackFinder />);
assert(finder.includes('aria-label="The Lean AI &amp; SaaS Stack Finder"'));
assert(finder.includes('<button') && finder.includes('Show My Recommended Stack'));

const calculator = render(<SaasCalculatorPage />);
for (const id of ['oldRecurringCash','retainedRecurringCash','replacementRecurringCash','oneTimeMigrationCash','externalServiceCash']) {
  assert(calculator.includes(`id="${id}"`),`Missing keyboard-labelled calculator input: ${id}`);
}
assert(calculator.includes('aria-label="Currency"'));
assert(calculator.includes('sm:grid-cols-3') && calculator.includes('lg:grid-cols-'));
assert(calculator.includes('External services, reported separately'));

const readiness = render(<AiReadinessQuiz />);
assert.equal((readiness.match(/type="radio"/g)||[]).length,4);
assert(readiness.includes('<fieldset>') && readiness.includes('<legend'));
assert(readiness.includes('sm:grid-cols-2'));
assert(readiness.includes('disabled=""'));

const calendar = fs.readFileSync('src/pages/tools/ContentCalendarPage.tsx','utf8');
for (const invented of ['How I got results','I just discovered','I wish I knew','after 90 days','cannot live without','Cost Me a Week','Day in My Life','grew their results','Share one mistake you made']) {
  assert(!calendar.includes(invented),`Invented calendar claim remains: ${invented}`);
}

console.log('PASS: semantic keyboard controls, responsive layout contracts and claim-safe calendar templates.');
