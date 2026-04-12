const { Project } = require('ts-morph');
const fs = require('fs');

const project = new Project();
const sourceFile = project.addSourceFileAtPath('src/App.tsx');

function getDecl(name) {
  const varDecl = sourceFile.getVariableDeclaration(name);
  if (varDecl) return varDecl.getVariableStatement().getText();
  const funcDecl = sourceFile.getFunction(name);
  if (funcDecl) return funcDecl.getText();
  return null;
}

console.log("FeaturedTools:", !!getDecl('featuredTools'));
console.log("toolReviews:", !!getDecl('toolReviews'));
console.log("saasReviews:", !!getDecl('saasReviews'));
console.log("BLOG_POSTS:", !!getDecl('BLOG_POSTS'));
console.log("toolsDropdown:", !!getDecl('toolsDropdown'));
console.log("Navbar:", !!getDecl('Navbar'));
console.log("Footer:", !!getDecl('Footer'));
console.log("ConvertKitForm:", !!getDecl('ConvertKitForm'));
console.log("SectionDivider:", !!getDecl('SectionDivider'));
console.log("BlogCard:", !!getDecl('BlogCard'));
console.log("ToolReviewCard:", !!getDecl('ToolReviewCard'));
console.log("HomePage:", !!getDecl('HomePage'));
console.log("AboutPage:", !!getDecl('AboutPage'));
console.log("ToolsPage:", !!getDecl('ToolsPage'));
console.log("ReviewsPage:", !!getDecl('ReviewsPage'));
console.log("BlogIndex:", !!getDecl('BlogIndex'));
console.log("PrivacyPolicyPage:", !!getDecl('PrivacyPolicyPage'));
console.log("DisclaimerPage:", !!getDecl('DisclaimerPage'));
console.log("NotFoundPage:", !!getDecl('NotFoundPage'));
console.log("BlogPost:", !!getDecl('BlogPost'));
console.log("TeamOf10BlogPost:", !!getDecl('TeamOf10BlogPost'));
console.log("AiComparisonBlogPost:", !!getDecl('AiComparisonBlogPost'));
console.log("AiDailyWorkflowBlogPost:", !!getDecl('AiDailyWorkflowBlogPost'));
console.log("AdobeBlogPost:", !!getDecl('AdobeBlogPost'));
console.log("ToolPage:", !!getDecl('ToolPage'));
console.log("SaasCalculatorPage:", !!getDecl('SaasCalculatorPage'));
console.log("PromptBuilderPage:", !!getDecl('PromptBuilderPage'));
