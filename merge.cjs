const fs = require('fs');

const promptBuilderContent = fs.readFileSync('src/PromptBuilderPage.tsx', 'utf8');
const lines = promptBuilderContent.split('\n');
// Remove imports (first 6 lines)
const componentLines = lines.slice(6);
const componentCode = componentLines.join('\n');

const appContent = fs.readFileSync('src/App.tsx', 'utf8');
const targetString = 'const SaasCalculatorPage = () => {';

if (appContent.includes(targetString)) {
  const newAppContent = appContent.replace(targetString, componentCode + '\n\n' + targetString);
  fs.writeFileSync('src/App.tsx', newAppContent);
  console.log('Successfully merged PromptBuilderPage into App.tsx');
} else {
  console.error('Target string not found in App.tsx');
}
