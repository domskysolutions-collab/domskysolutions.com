const { Project } = require('ts-morph');
const fs = require('fs');
const path = require('path');

const project = new Project();
const sourceFile = project.addSourceFileAtPath('src/App.tsx');

function getDecl(name) {
  const varDecl = sourceFile.getVariableDeclaration(name);
  if (varDecl) return 'export ' + varDecl.getVariableStatement().getText();
  const funcDecl = sourceFile.getFunction(name);
  if (funcDecl) return 'export ' + funcDecl.getText();
  return null;
}

function getRawDecl(name) {
  const varDecl = sourceFile.getVariableDeclaration(name);
  if (varDecl) return varDecl.getVariableStatement().getText();
  const funcDecl = sourceFile.getFunction(name);
  if (funcDecl) return funcDecl.getText();
  return null;
}

const files = {};

// 1. Data files
files['src/data/navigation.ts'] = `
${getDecl('toolsDropdown')}
${getDecl('featuredTools')}
`;

files['src/data/toolReviews.ts'] = `
${getDecl('toolReviews')}
`;

files['src/data/saasReviews.ts'] = `
${getDecl('saasReviews')}
`;

files['src/data/blogPosts.ts'] = `
${getDecl('BLOG_POSTS')}
`;

// 2. Components
files['src/components/ui.tsx'] = `
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Check, ChevronRight, Star, ExternalLink, TrendingUp, Clock, Target, Zap, Shield, Sparkles } from 'lucide-react';

${getDecl('Money')}
${getDecl('BeforeAfter')}
${getDecl('SectionDivider')}
${getDecl('H2')}
${getDecl('H3')}
${getDecl('CalloutTip')}
${getDecl('Step')}
${getDecl('PullQuote')}
${getDecl('StatCard')}
${getDecl('SavingsChart')}
${getDecl('ToolLink')}
`;

files['src/components/ConvertKitForm.tsx'] = `
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';

${getDecl('ConvertKitForm')}
`;

files['src/components/Navbar.tsx'] = `
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { toolsDropdown } from '../data/navigation';

${getDecl('Navbar')}
`;

files['src/components/Footer.tsx'] = `
import React from 'react';
import { Link } from 'react-router-dom';
import { ConvertKitForm } from './ConvertKitForm';

${getDecl('Footer')}
`;

files['src/components/BlogCard.tsx'] = `
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Clock } from 'lucide-react';

${getDecl('BlogCard')}
`;

files['src/components/ToolCard.tsx'] = `
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';

${getDecl('ToolReviewCard')}
`;

// 3. Pages
files['src/pages/HomePage.tsx'] = `
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, ExternalLink, PenTool, Palette, Code, Megaphone, Zap, Video, Mic, FlaskConical, TrendingUp, Clock, Target, Shield, Sparkles } from 'lucide-react';
import { ConvertKitForm } from '../components/ConvertKitForm';
import { featuredTools } from '../data/navigation';
import { saasReviews } from '../data/saasReviews';

${getRawDecl('newsArticles')}
${getRawDecl('categories')}
${getRawDecl('AI_ALTERNATIVES')}
${getRawDecl('RECOMMENDED_TOOLS')}

${getRawDecl('Hero')}
${getRawDecl('FeaturedTools')}
${getRawDecl('SaasReviews')}
${getRawDecl('AiNews')}
${getRawDecl('CategoryExplorer')}
${getRawDecl('Newsletter')}

${getDecl('HomePage')}
`;

files['src/pages/AboutPage.tsx'] = `
import React from 'react';
import { motion } from 'motion/react';
import { ConvertKitForm } from '../components/ConvertKitForm';

${getDecl('AboutPage')}
`;

files['src/pages/ToolsPage.tsx'] = `
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, ExternalLink, PenTool, Palette, Code, Megaphone, Zap, Video, Mic, FlaskConical } from 'lucide-react';
import { toolReviews } from '../data/toolReviews';
import { ConvertKitForm } from '../components/ConvertKitForm';

${getDecl('ToolsPage')}
`;

files['src/pages/ReviewsPage.tsx'] = `
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, ExternalLink } from 'lucide-react';
import { saasReviews } from '../data/saasReviews';
import { ConvertKitForm } from '../components/ConvertKitForm';

${getDecl('ReviewsPage')}
`;

files['src/pages/BlogIndex.tsx'] = `
import React from 'react';
import { motion } from 'motion/react';
import { BLOG_POSTS } from '../data/blogPosts';
import { BlogCard } from '../components/BlogCard';
import { ConvertKitForm } from '../components/ConvertKitForm';

${getDecl('BlogIndex')}
`;

files['src/pages/PrivacyPage.tsx'] = `
import React from 'react';
import { motion } from 'motion/react';

${getDecl('PrivacyPolicyPage')}
`;

files['src/pages/DisclaimerPage.tsx'] = `
import React from 'react';
import { motion } from 'motion/react';

${getDecl('DisclaimerPage')}
`;

files['src/pages/NotFoundPage.tsx'] = `
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

${getDecl('NotFoundPage')}
`;

files['src/pages/tools/ToolPage.tsx'] = `
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, ExternalLink, Check, ChevronRight } from 'lucide-react';
import { toolReviews } from '../../data/toolReviews';
import { saasReviews } from '../../data/saasReviews';
import { ConvertKitForm } from '../../components/ConvertKitForm';

${getDecl('ToolPage')}
`;

files['src/pages/tools/SaasCalculatorPage.tsx'] = `
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Plus, Trash2, DollarSign, TrendingDown, Zap, Sparkles } from 'lucide-react';
import { ConvertKitForm } from '../../components/ConvertKitForm';

${getDecl('SaasCalculatorPage')}
`;

files['src/pages/tools/PromptBuilderPage.tsx'] = `
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Copy, Sparkles, RefreshCw, MessageSquare, Target, Zap, ChevronDown } from 'lucide-react';
import { ConvertKitForm } from '../../components/ConvertKitForm';

${getRawDecl('PROMPT_CATEGORIES')}
${getRawDecl('ROLES')}
${getRawDecl('TONES')}
${getRawDecl('FORMATS')}
${getRawDecl('EXAMPLES')}

${getDecl('PromptBuilderPage')}
`;

// Blog posts
const blogImports = `
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Check, Star, TrendingUp, Clock, Target, Zap, Shield, Sparkles } from 'lucide-react';
import { ConvertKitForm } from '../../components/ConvertKitForm';
import { Money, BeforeAfter, SectionDivider, H2, H3, CalloutTip, Step, PullQuote, StatCard, SavingsChart, ToolLink } from '../../components/ui';
`;

files['src/pages/blog/BlogPost1.tsx'] = blogImports + '\\n' + getDecl('BlogPost');
files['src/pages/blog/BlogPost2.tsx'] = blogImports + '\\n' + getDecl('TeamOf10BlogPost');
files['src/pages/blog/BlogPost3.tsx'] = blogImports + '\\n' + getDecl('AiComparisonBlogPost');
files['src/pages/blog/BlogPost4.tsx'] = blogImports + '\\n' + getDecl('AiDailyWorkflowBlogPost');
files['src/pages/blog/BlogPost5.tsx'] = blogImports + '\\n' + getDecl('AdobeBlogPost');

// Write files
Object.keys(files).forEach(filepath => {
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filepath, files[filepath]);
  console.log('Wrote', filepath);
});
