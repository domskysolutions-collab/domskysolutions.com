const fs = require('fs');

const files = [
  'src/components/Navbar.tsx',
  'src/components/Footer.tsx',
  'src/pages/HomePage.tsx',
  'src/pages/AboutPage.tsx',
  'src/pages/ToolsPage.tsx',
  'src/pages/ReviewsPage.tsx',
  'src/pages/BlogIndex.tsx',
  'src/pages/PrivacyPage.tsx',
  'src/pages/DisclaimerPage.tsx',
  'src/pages/NotFoundPage.tsx',
  'src/pages/UsesPage.tsx',
  'src/pages/tools/ToolPage.tsx',
  'src/pages/tools/SaasCalculatorPage.tsx',
  'src/pages/tools/PromptBuilderPage.tsx',
  'src/pages/tools/StackRecommenderPage.tsx',
  'src/data/navigation.ts',
  'src/data/toolReviews.ts',
  'src/data/saasReviews.ts',
  'src/data/blogPosts.ts',
  'src/pages/blog/BlogPost1.tsx',
  'src/pages/blog/BlogPost2.tsx',
  'src/pages/blog/BlogPost3.tsx',
  'src/pages/blog/BlogPost4.tsx',
  'src/pages/blog/BlogPost5.tsx'
];

let output = '';

for (const file of files) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    output += `\n\n### ${file}\n\n\`\`\`tsx\n${content}\n\`\`\`\n`;
  } catch (e) {
    output += `\n\n### ${file}\n\nError reading file: ${e.message}\n`;
  }
}

fs.writeFileSync('all_files_output.md', output);
console.log('Created all_files_output.md');
