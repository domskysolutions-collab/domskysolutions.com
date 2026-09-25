import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PageSeo } from './components/PageSeo';
import { MethodologyPage } from './pages/MethodologyPage';
import { ComparisonsPage } from './pages/ComparisonsPage';
import { legacyReviewRedirects } from './data/reviewCatalog';
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
import { AiReadinessQuiz } from './pages/tools/AiReadinessQuiz';
import { StackScorecardPage } from './pages/StackScorecardPage';
import { UsesPage } from './pages/UsesPage';
import { NamecheapReviewPage } from './pages/uses/NamecheapReviewPage';
import { BlogPost2 } from './pages/blog/BlogPost2';
import { BlogPost5 } from './pages/blog/BlogPost5';
import { BlogPost6 } from './pages/blog/BlogPost6';
import { ArticleRoute } from './components/article/ArticlePage';
import { publishedArticles } from './content/registry';

export function SiteRoutes() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <PageSeo />
      <div id="main-content" tabIndex={-1}>
      <Routes>
        {Object.entries(legacyReviewRedirects).map(([from, to]) => <Route key={from} path={from} element={<Navigate replace to={to} />} />)}
        <Route path="/methodology" element={<MethodologyPage />} />
        <Route path="/comparisons" element={<ComparisonsPage />} />
        {publishedArticles.map(article => <Route key={article.id} path={article.slug} element={<ArticleRoute />} />)}
        <Route path="/" element={<HomePage />} />
        <Route path="/stack-builder" element={<Navigate replace to="/#stack-finder" />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/tools/saas-calculator" element={<SaasCalculatorPage />} />
        <Route path="/tools/prompt-builder" element={<PromptBuilderPage />} />
        <Route path="/tools/stack-recommender" element={<StackRecommenderPage />} />
        <Route path="/tools/content-calendar" element={<ContentCalendarPage />} />
        <Route path="/uses" element={<UsesPage />} />
        <Route path="/reviews/namecheap" element={<NamecheapReviewPage />} />
        <Route path="/tools/ai-readiness-quiz" element={<AiReadinessQuiz />} />
        <Route path="/scorecard" element={<StackScorecardPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/reviews/:id" element={<ToolPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/ai-tools-look-like-team-of-10" element={<BlogPost2 />} />
        <Route path="/blog/cancelled-adobe-never-looked-back" element={<BlogPost5 />} />
        <Route path="/blog/you-dont-need-to-be-technical-to-use-ai" element={<BlogPost6 />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </div>
      <Footer />
    </>
  );
}

export default function App() { return <Router><SiteRoutes /></Router>; }
