const fs = require('fs');

const appContent = fs.readFileSync('src/App.tsx', 'utf8');

// We need to rename CATEGORIES to PROMPT_CATEGORIES inside PromptBuilderPage
// The PromptBuilderPage starts at `const CATEGORIES = [` right before `const ROLES = [`
// Let's just find `const CATEGORIES = [` that is followed by `{ id: 'writing', icon: '✍️', label: 'Writing' },`
// and replace it with `const PROMPT_CATEGORIES = [`
// Then inside PromptBuilderPage, replace `CATEGORIES.map` and `CATEGORIES.find` with `PROMPT_CATEGORIES.map` and `PROMPT_CATEGORIES.find`

let newAppContent = appContent.replace(
  "const CATEGORIES = [\n  { id: 'writing', icon: '✍️', label: 'Writing' },",
  "const PROMPT_CATEGORIES = [\n  { id: 'writing', icon: '✍️', label: 'Writing' },"
);

newAppContent = newAppContent.replace(/CATEGORIES\.map/g, "PROMPT_CATEGORIES.map");
newAppContent = newAppContent.replace(/CATEGORIES\.find/g, "PROMPT_CATEGORIES.find");

// Wait, the SaasCalculatorPage also uses CATEGORIES.map!
// Let's revert and do it more carefully.
