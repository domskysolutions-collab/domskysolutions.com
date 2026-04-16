import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ToolsPage } from './pages/ToolsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { BlogIndex } from './pages/BlogIndex';
import { PrivacyPage } from './pages/PrivacyPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ToolPage } from './pages/tools/ToolPage';
import { SaasCalculatorPage } from './pages/tools/SaasCalculatorPage';
import { PromptBuilderPage } from './pages/tools/PromptBuilderPage';
import { StackRecommenderPage } from './pages/tools/StackRecommenderPage';
import { ContentCalendarPage } from './pages/tools/ContentCalendarPage';
import { UsesPage } from './pages/UsesPage';
import { ConvertKitReviewPage } from './pages/uses/ConvertKitReviewPage';
import { NamecheapReviewPage } from './pages/uses/NamecheapReviewPage';
import { BlogPost1 } from './pages/blog/BlogPost1';
import { BlogPost2 } from './pages/blog/BlogPost2';
import { BlogPost3 } from './pages/blog/BlogPost3';
import { BlogPost4 } from './pages/blog/BlogPost4';
import { BlogPost5 } from './pages/blog/BlogPost5';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/tools/saas-calculator" element={<SaasCalculatorPage />} />
        <Route path="/tools/prompt-builder" element={<PromptBuilderPage />} />
        <Route path="/tools/stack-recommender" element={<StackRecommenderPage />} />
        <Route path="/tools/content-calendar" element={<ContentCalendarPage />} />
        <Route path="/uses" element={<UsesPage />} />
        <Route path="/uses/convertkit" element={<ConvertKitReviewPage />} />
        <Route path="/uses/namecheap" element={<NamecheapReviewPage />} />
        <Route path="/tools/:id" element={<ToolPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/reviews/:id" element={<ToolPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/replaced-saas-stack-with-ai-tools" element={<BlogPost1 />} />
        <Route path="/blog/ai-tools-look-like-team-of-10" element={<BlogPost2 />} />
        <Route path="/blog/claude-vs-chatgpt-vs-gemini-2026" element={<BlogPost3 />} />
        <Route path="/blog/ai-daily-workflow-solo-business" element={<BlogPost4 />} />
        <Route path="/blog/cancelled-adobe-never-looked-back" element={<BlogPost5 />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
