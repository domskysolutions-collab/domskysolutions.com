const fs = require('fs');

function fixFile(path, replacer) {
  let content = fs.readFileSync(path, 'utf-8');
  content = replacer(content);
  fs.writeFileSync(path, content);
}

// Fix ConvertKitForm
fixFile('src/components/ConvertKitForm.tsx', c => c.replace('export export', 'export'));

// Fix PromptBuilderPage
fixFile('src/pages/tools/PromptBuilderPage.tsx', c => c.replace('export export', 'export'));

// Fix Blog posts exports
fixFile('src/pages/blog/BlogPost1.tsx', c => c.replace('export const BlogPost =', 'export const BlogPost1 ='));
fixFile('src/pages/blog/BlogPost2.tsx', c => c.replace('export const TeamOf10BlogPost =', 'export const BlogPost2 ='));
fixFile('src/pages/blog/BlogPost3.tsx', c => c.replace('export const AiComparisonBlogPost =', 'export const BlogPost3 ='));
fixFile('src/pages/blog/BlogPost4.tsx', c => c.replace('export const AiDailyWorkflowBlogPost =', 'export const BlogPost4 ='));
fixFile('src/pages/blog/BlogPost5.tsx', c => c.replace('export const AdobeBlogPost =', 'export const BlogPost5 ='));

// Add missing imports to AboutPage
fixFile('src/pages/AboutPage.tsx', c => {
  return c.replace("import React from 'react';", "import React, { useEffect } from 'react';\nimport { useScroll } from 'motion/react';\nimport { CheckCircle2 } from 'lucide-react';\nimport { H2, SectionDivider } from '../components/ui';");
});

// Add missing imports to BlogIndex
fixFile('src/pages/BlogIndex.tsx', c => {
  return c.replace("import React from 'react';", "import React, { useEffect } from 'react';");
});

// Add missing imports to DisclaimerPage
fixFile('src/pages/DisclaimerPage.tsx', c => {
  return c.replace("import React, { useEffect } from 'react';", "import React, { useEffect } from 'react';\nimport { H2, SectionDivider } from '../components/ui';");
});

// Add missing imports to HomePage
fixFile('src/pages/HomePage.tsx', c => {
  return c.replace("import React from 'react';", "import React, { useState, useEffect, useRef } from 'react';\nimport { useInView } from 'motion/react';\nimport { CheckCircle2 } from 'lucide-react';\nimport { BLOG_POSTS } from '../data/blogPosts';\nimport { BlogCard } from '../components/BlogCard';");
});

// Add missing imports to PrivacyPage
fixFile('src/pages/PrivacyPage.tsx', c => {
  return c.replace("import React, { useEffect } from 'react';", "import React, { useEffect } from 'react';\nimport { Link } from 'react-router-dom';\nimport { H2, SectionDivider } from '../components/ui';");
});

// Add missing imports to ReviewsPage
fixFile('src/pages/ReviewsPage.tsx', c => {
  return c.replace("import React from 'react';", "import React, { useEffect } from 'react';");
});

// Add missing imports to ToolsPage
fixFile('src/pages/ToolsPage.tsx', c => {
  return c.replace("import React from 'react';", "import React, { useEffect } from 'react';\nimport { featuredTools } from '../data/navigation';");
});

// Add missing imports to BlogPost1
fixFile('src/pages/blog/BlogPost1.tsx', c => {
  return c.replace("import { ArrowRight, Check, Star, TrendingUp, Clock, Target, Zap, Shield, Sparkles } from 'lucide-react';", "import { ArrowRight, Check, Star, TrendingUp, Clock, Target, Zap, Shield, Sparkles, ChevronUp, Coffee, CheckCircle2, TrendingDown } from 'lucide-react';\nimport { useScroll } from 'motion/react';\nimport { useState } from 'react';\nimport { ToolReviewCard } from '../../components/ToolCard';\nimport { BLOG_POSTS } from '../../data/blogPosts';\nimport { BlogCard } from '../../components/BlogCard';");
});

// Add missing imports to BlogPost2
fixFile('src/pages/blog/BlogPost2.tsx', c => {
  return c.replace("import { ArrowRight, Check, Star, TrendingUp, Clock, Target, Zap, Shield, Sparkles } from 'lucide-react';", "import { ArrowRight, Check, Star, TrendingUp, Clock, Target, Zap, Shield, Sparkles } from 'lucide-react';\nimport { useScroll } from 'motion/react';\nimport { ToolReviewCard } from '../../components/ToolCard';\nimport { BLOG_POSTS } from '../../data/blogPosts';\nimport { BlogCard } from '../../components/BlogCard';");
});

// Add missing imports to BlogPost3
fixFile('src/pages/blog/BlogPost3.tsx', c => {
  return c.replace("import { ArrowRight, Check, Star, TrendingUp, Clock, Target, Zap, Shield, Sparkles } from 'lucide-react';", "import { ArrowRight, Check, Star, TrendingUp, Clock, Target, Zap, Shield, Sparkles } from 'lucide-react';\nimport { useScroll } from 'motion/react';\nimport { ToolReviewCard } from '../../components/ToolCard';\nimport { BLOG_POSTS } from '../../data/blogPosts';\nimport { BlogCard } from '../../components/BlogCard';");
});

// Add missing imports to BlogPost4
fixFile('src/pages/blog/BlogPost4.tsx', c => {
  return c.replace("import { ArrowRight, Check, Star, TrendingUp, Clock, Target, Zap, Shield, Sparkles } from 'lucide-react';", "import { ArrowRight, Check, Star, TrendingUp, Clock, Target, Zap, Shield, Sparkles } from 'lucide-react';\nimport { useScroll } from 'motion/react';\nimport { ToolReviewCard } from '../../components/ToolCard';");
});

// Add missing imports to BlogPost5
fixFile('src/pages/blog/BlogPost5.tsx', c => {
  return c.replace("import { ArrowRight, Check, Star, TrendingUp, Clock, Target, Zap, Shield, Sparkles } from 'lucide-react';", "import { ArrowRight, Check, Star, TrendingUp, Clock, Target, Zap, Shield, Sparkles, ChevronUp, Coffee } from 'lucide-react';\nimport { useScroll } from 'motion/react';\nimport { useState } from 'react';\nimport { ToolReviewCard } from '../../components/ToolCard';\nimport { BLOG_POSTS } from '../../data/blogPosts';\nimport { BlogCard } from '../../components/BlogCard';");
});

// Add missing imports to PromptBuilderPage
fixFile('src/pages/tools/PromptBuilderPage.tsx', c => {
  return c.replace("import { ArrowRight, Check, Copy, Sparkles, RefreshCw, MessageSquare, Target, Zap, ChevronDown } from 'lucide-react';", "import { ArrowRight, Check, Copy, Sparkles, RefreshCw, MessageSquare, Target, Zap, ChevronDown, CheckCircle2, X } from 'lucide-react';");
});

// Add missing imports to SaasCalculatorPage
fixFile('src/pages/tools/SaasCalculatorPage.tsx', c => {
  return c.replace("import { ArrowRight, Check, Plus, Trash2, DollarSign, TrendingDown, Zap, Sparkles } from 'lucide-react';", "import { ArrowRight, Check, Plus, Trash2, DollarSign, TrendingDown, Zap, Sparkles, CheckCircle2, Copy } from 'lucide-react';\nimport { Link } from 'react-router-dom';\nimport { AI_ALTERNATIVES, RECOMMENDED_TOOLS } from '../HomePage';");
});

// Wait, AI_ALTERNATIVES and RECOMMENDED_TOOLS are in HomePage. I should export them from HomePage.
fixFile('src/pages/HomePage.tsx', c => {
  return c.replace("const AI_ALTERNATIVES", "export const AI_ALTERNATIVES").replace("const RECOMMENDED_TOOLS", "export const RECOMMENDED_TOOLS");
});

// Wait, CATEGORIES is also used in SaasCalculatorPage. Where is it?
// It was in App.tsx, I put it in HomePage.tsx.
fixFile('src/pages/tools/SaasCalculatorPage.tsx', c => {
  return c.replace("import { AI_ALTERNATIVES, RECOMMENDED_TOOLS } from '../HomePage';", "import { AI_ALTERNATIVES, RECOMMENDED_TOOLS, categories as CATEGORIES } from '../HomePage';");
});
fixFile('src/pages/HomePage.tsx', c => {
  return c.replace("const categories", "export const categories");
});

// Add missing imports to ToolPage
fixFile('src/pages/tools/ToolPage.tsx', c => {
  return c.replace("import { useParams, Link } from 'react-router-dom';", "import { useParams, Link, useLocation } from 'react-router-dom';\nimport { CheckCircle2 } from 'lucide-react';");
});

console.log("Fixed imports");
