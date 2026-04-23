
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Check, Star, TrendingUp, Clock, Target, Zap, Shield, Sparkles, ChevronUp } from 'lucide-react';
import { useScroll } from 'motion/react';
import { ToolReviewCard } from '../../components/ToolCard';
import { ConvertKitForm } from '../../components/ConvertKitForm';
import { Money, BeforeAfter, SectionDivider, H2, H3, CalloutTip, Step, PullQuote, StatCard, SavingsChart, ToolLink } from '../../components/ui';
export const BlogPost4 = () => {
  const { scrollYProgress } = useScroll();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    document.title = "How I Use AI to Run My Entire Business Solo — My Exact Daily Workflow";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "I run a growing AI tools publication completely solo. Here is the exact AI workflow I use every single day — the tools, the order, the prompts, and the time it saves.");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
      
      const sections = ['morning-routine', 'content-creation', 'research', 'development', 'end-of-day', 'the-stack'];
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 100)) {
          current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-brand-bg min-h-screen text-gray-300 font-sans pb-24 relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-cyan origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Table of Contents Sidebar (Desktop Only) */}
      <div className="hidden xl:block fixed left-[max(0px,calc(50%-550px))] top-48 w-64">
        <div className="mb-4">
          <div className="h-[2px] bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-cyan rounded-full"
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
            />
          </div>
          <div className="text-[10px] font-mono text-gray-600 mt-1">Reading progress</div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-[0.2em]">Contents</span>
          <div className="flex-1 h-px bg-brand-cyan opacity-30" />
        </div>

        <ul className="space-y-3 font-inter">
          {[
            { id: 'morning-routine', label: 'Morning Routine' },
            { id: 'content-creation', label: 'Content Creation' },
            { id: 'research', label: 'Research' },
            { id: 'development', label: 'Development' },
            { id: 'end-of-day', label: 'End of Day' },
            { id: 'the-stack', label: 'The Full Stack' },
          ].map(item => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`text-left transition-all duration-200 flex items-center gap-2 ${activeSection === item.id ? 'text-brand-cyan font-semibold text-[13px]' : 'text-gray-500 text-[12px] hover:text-gray-300'}`}
              >
                <span className={`w-1 h-1 rounded-full flex-shrink-0 transition-all ${activeSection === item.id ? 'bg-brand-cyan scale-150' : 'bg-gray-700'}`} />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-brand-surface border border-brand-cyan/30 p-3 rounded-full text-brand-cyan hover:bg-brand-cyan hover:text-brand-bg transition-all duration-300 z-50 shadow-lg hover:shadow-brand-cyan/20 hover:scale-110"
          aria-label="Back to top"
        >
          <ChevronUp size={24} />
        </button>
      )}

      <div className="max-w-[680px] mx-auto px-6 pt-32">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-brand-cyan font-mono text-sm uppercase tracking-wider">AI News</span>
            <span className="text-gray-500 font-mono text-sm">•</span>
            <span className="text-gray-400 font-mono text-sm">9 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white leading-tight mb-8">
            How I Use AI to Run My Entire Business Solo — My Exact Daily Workflow
          </h1>
          <div className="flex flex-wrap gap-2">
            {['AI Workflow', 'Solopreneur', 'Productivity', 'AI Tools 2026', 'Daily Routine', 'Solo Business'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-mono rounded-full border border-gray-700">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full rounded-xl overflow-hidden mb-12 border border-brand-surface shadow-2xl bg-gray-900 flex items-center justify-center" style={{height: '400px'}}>
          <div className="text-center text-gray-600">
            <div className="text-6xl mb-4">🖼</div>
            <p className="font-mono text-sm">
              [ INSERT COVER IMAGE HERE ]
            </p>
            <p className="font-mono text-xs mt-2 opacity-50">
              Suggested: A clean, top-down shot of a minimalist desk setup with a coffee cup and a glowing laptop screen, cinematic lighting.
            </p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-[17px] leading-[1.8] space-y-6">
          <p>
            People ask me regularly how I manage to run domskysolutions.com — researching tools, writing reviews, publishing blog posts, managing social media, and keeping up with a industry that moves faster than any other — completely alone, without a team, without an agency, and without burning out in the process.
          </p>
          <p>
            The honest answer is that I do not do it alone.
          </p>
          <p>
            I do it with a stack of AI tools that handle the parts of the work that used to require either a team or an unsustainable number of hours.
          </p>
          <p>
            What follows is not a theoretical framework or a curated list of tools I think sound impressive. It is the exact workflow I use every single day, in the order I use it, with the specific tools that have earned a permanent place in how I operate.
          </p>
          <p>
            If you are building something solo — a newsletter, a content site, a consulting practice, a SaaS product, or anything in between — this is the closest thing I can offer to showing you exactly what running a one person business looks like when AI is doing its job properly.
          </p>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="morning-routine">THE MORNING BLOCK — 7:00 AM TO 9:00 AM</H2>
            <p className="text-xl text-white mb-6">"Intelligence gathering"</p>

            <p>
              The first two hours of my day used to be the most chaotic. Tabs open everywhere. Newsletter after newsletter. Twitter scrolling that felt productive but was not. Three different apps for notes that never talked to each other.
            </p>
            <p>
              I was consuming information without processing it, which meant I was always busy but rarely informed in any useful way.
            </p>
            <p>
              Now my morning looks like this:
            </p>

            <H3>STEP 1 — THE DAILY BRIEF WITH PERPLEXITY</H3>
            <p className="mb-2"><strong>Time:</strong> 15 minutes</p>
            <p className="mb-6"><strong>Tool:</strong> <ToolLink name="Perplexity Pro" to="/tools/perplexity" /></p>

            <p>
              The first thing I open every morning is <ToolLink name="Perplexity" to="/tools/perplexity" />. I run the same three searches every day:
            </p>

            <div className="bg-brand-surface border border-gray-800 p-6 rounded-lg my-6 font-mono text-sm">
              <p className="text-brand-cyan mb-2">Search 1:</p>
              <p className="mb-4">"Most significant AI tool launches and updates in the last 24 hours"</p>
              
              <p className="text-brand-cyan mb-2">Search 2:</p>
              <p className="mb-4">"Latest news about [the specific tool I am currently reviewing]"</p>
              
              <p className="text-brand-cyan mb-2">Search 3:</p>
              <p>"Top discussions about AI tools on Reddit and Twitter today"</p>
            </div>

            <p>
              <ToolLink name="Perplexity" to="/tools/perplexity" /> reads the current web, pulls the most relevant sources, and gives me cited summaries in under a minute each.
            </p>
            <p>
              What used to take an hour of tab switching now takes fifteen minutes and I come away with actual information rather than the feeling of having been informed.
            </p>

            <CalloutTip>
              <span className="font-bold text-white">Key insight:</span> I save every interesting finding directly into <ToolLink name="Notion" to="/tools/notion" /> with one click. No more losing things in browser tabs.
            </CalloutTip>

            <H3>STEP 2 — PROCESSING NOTES WITH NOTION AI</H3>
            <p className="mb-2"><strong>Time:</strong> 10 minutes</p>
            <p className="mb-6"><strong>Tool:</strong> <ToolLink name="Notion AI" to="/tools/notion" /></p>

            <p>
              Everything I captured yesterday — ideas, research notes, half-formed article concepts, interesting quotes — lives in a <ToolLink name="Notion" to="/tools/notion" /> inbox page.
            </p>
            <p>
              Every morning I open it and ask <ToolLink name="Notion AI" to="/tools/notion" />:
            </p>

            <div className="bg-brand-surface border border-gray-800 p-6 rounded-lg my-6 font-mono text-sm">
              <p className="text-brand-cyan mb-2">Prompt:</p>
              <p>"Summarize everything in this inbox, identify any action items, and suggest which items could become content pieces"</p>
            </div>

            <p>
              It processes everything I dumped in yesterday and hands me back a clear picture of what needs attention.
            </p>
            <p>
              The cognitive load of remembering what I was working on is completely eliminated. I just read the summary and know exactly where I am.
            </p>

            <CalloutTip>
              <span className="font-bold text-white">Key insight:</span> <ToolLink name="Notion AI" to="/tools/notion" /> is not just a writing tool — it is a thinking partner that makes your existing notes more valuable than you could make them yourself.
            </CalloutTip>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="content-creation">THE CONTENT BLOCK — 9:00 AM TO 12:00 PM</H2>
            <p className="text-xl text-white mb-6">"Creating and publishing"</p>

            <p>
              This is the core of my working day and where AI assistance has the most dramatic impact on output.
            </p>
            <p>
              Three hours of focused content work now produces what used to take a full day.
            </p>

            <H3>STEP 3 — FIRST DRAFT WITH CLAUDE</H3>
            <p className="mb-2"><strong>Time:</strong> 30-45 minutes per piece</p>
            <p className="mb-6"><strong>Tool:</strong> <ToolLink name="Claude Pro" to="/tools/claude" /></p>

            <p>
              I do not stare at a blank page. Ever.
            </p>
            <p>
              <ToolLink name="Claude" to="/tools/claude" /> handles every first draft — blog posts, tool reviews, newsletter issues, social media threads. My process:
            </p>

            <div className="bg-brand-surface border border-gray-800 p-6 rounded-lg my-6 font-mono text-sm">
              <p className="text-brand-cyan mb-2">The prompt I use for blog posts:</p>
              <p className="mb-4">"Write a detailed outline for an article titled [title]. The audience is founders and solopreneurs. The tone is direct, experienced, and honest — not salesy. Include a hook introduction, 5-7 main sections with subpoints, and a strong conclusion with a clear takeaway."</p>
              
              <p className="text-brand-cyan mb-2">Once the outline is approved I ask:</p>
              <p>"Now write the full article based on this outline. Use specific examples, avoid generic statements, and write as if you are a practitioner who has actually used these tools — not a reviewer who is summarizing specs."</p>
            </div>

            <p>
              The draft <ToolLink name="Claude" to="/tools/claude" /> produces is 70-80 percent of the way to publishable.
            </p>
            <p>
              The remaining 20-30 percent is my job — adding personal experience, specific examples from my actual use of the tools, and the genuine opinions that only come from real usage.
            </p>

            <CalloutTip>
              <span className="font-bold text-white">Key insight:</span> <ToolLink name="Claude" to="/tools/claude" /> does not replace my writing. It eliminates the blank page problem and the structural thinking, which are the two most time consuming parts of the writing process for me. The voice and the insight remain mine.
            </CalloutTip>

            <H3>STEP 4 — RESEARCH VERIFICATION WITH PERPLEXITY</H3>
            <p className="mb-2"><strong>Time:</strong> 15 minutes</p>
            <p className="mb-6"><strong>Tool:</strong> <ToolLink name="Perplexity Pro" to="/tools/perplexity" /></p>

            <p>
              Before anything gets published I verify every factual claim — pricing, features, recent updates — against current sources.
            </p>
            <p>
              AI tools change fast. A pricing tier that was accurate two months ago might not be accurate today.
            </p>

            <p>
              I paste the draft into a note and ask <ToolLink name="Perplexity" to="/tools/perplexity" />:
            </p>

            <div className="bg-brand-surface border border-gray-800 p-6 rounded-lg my-6 font-mono text-sm">
              <p>"Verify these specific claims about [tool name] — are the pricing tiers, features, and any statistics current and accurate as of today?"</p>
            </div>

            <p>
              It checks against live sources and flags anything that has changed. This single step is what separates content that builds trust from content that erodes it.
            </p>

            <H3>STEP 5 — VISUALS WITH MIDJOURNEY</H3>
            <p className="mb-2"><strong>Time:</strong> 20 minutes</p>
            <p className="mb-6"><strong>Tool:</strong> <ToolLink name="Midjourney Standard" to="/tools/midjourney" /></p>

            <p>
              Every piece of content needs a cover image. My process is now:
            </p>

            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>Describe the article concept in one sentence</li>
              <li>Ask <ToolLink name="Claude" to="/tools/claude" /> to suggest three <ToolLink name="Midjourney" to="/tools/midjourney" /> prompts that would create a compelling cover image for that concept</li>
              <li>Run the best prompt in <ToolLink name="Midjourney" to="/tools/midjourney" /></li>
              <li>Upscale the best result</li>
              <li>Done</li>
            </ol>

            <p>
              The cover images this process produces are consistently better than anything I could brief a designer to create because <ToolLink name="Claude" to="/tools/claude" /> understands both the article content and what makes a good <ToolLink name="Midjourney" to="/tools/midjourney" /> prompt.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="research">THE DISTRIBUTION BLOCK — 12:00 PM TO 1:00 PM</H2>
            <p className="text-xl text-white mb-6">"Getting the work seen"</p>

            <p>
              Creating content that nobody sees is not a content strategy — it is a hobby.
            </p>
            <p>
              Distribution is half the job and AI has made it dramatically more efficient.
            </p>

            <H3>STEP 6 — SOCIAL CONTENT WITH CLAUDE</H3>
            <p className="mb-2"><strong>Time:</strong> 20 minutes</p>
            <p className="mb-6"><strong>Tool:</strong> <ToolLink name="Claude Pro" to="/tools/claude" /></p>

            <p>
              Once an article is published I ask <ToolLink name="Claude" to="/tools/claude" />:
            </p>

            <div className="bg-brand-surface border border-gray-800 p-6 rounded-lg my-6 font-mono text-sm">
              <p className="mb-4">"Based on this article [paste article], create the following:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>A LinkedIn post — professional tone, leads with the most counterintuitive insight, ends with a question to drive comments. 250 words maximum.</li>
                <li>An X thread — 8 tweets, hooks with a bold claim, each tweet is standalone valuable, ends with a link to the full article.</li>
                <li>Three different hook options for the article that I can test across different platforms."</li>
              </ol>
            </div>

            <p>
              <ToolLink name="Claude" to="/tools/claude" /> produces all of this in under a minute.
            </p>
            <p>
              I review, edit anything that does not sound like me, and schedule everything in one sitting.
            </p>

            <CalloutTip>
              <span className="font-bold text-white">Key insight:</span> The same article now generates content for three platforms without three times the work. That compounding is what makes solo publishing sustainable.
            </CalloutTip>

            <H3>STEP 7 — NEWSLETTER ISSUE WITH CLAUDE + NOTION AI</H3>
            <p className="mb-2"><strong>Time:</strong> 20 minutes</p>
            <p className="mb-6"><strong>Tool:</strong> <ToolLink name="Claude Pro" to="/tools/claude" /> + <ToolLink name="Notion AI" to="/tools/notion" /></p>

            <p>
              My weekly newsletter goes out every Thursday. The process:
            </p>

            <ol className="list-decimal pl-6 space-y-4 mb-6">
              <li>Ask <ToolLink name="Notion AI" to="/tools/notion" /> to pull the most interesting things I captured in my inbox that week</li>
              <li>
                Ask <ToolLink name="Claude" to="/tools/claude" /> to turn the highlights into a newsletter format:
                <div className="bg-brand-bg border border-gray-800 p-4 rounded mt-2 font-mono text-sm">
                  "Write a weekly newsletter issue using these highlights. Include: one main insight, three tool recommendations with one line each, one tip readers can use today, and a closing thought. Tone: like a smart friend sharing what they learned this week."
                </div>
              </li>
              <li>Edit to add my voice and any personal context</li>
              <li>Send</li>
            </ol>

            <p>
              The entire newsletter production process takes under thirty minutes from a cold start.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="development">THE OPERATIONS BLOCK — 2:00 PM TO 3:00 PM</H2>
            <p className="text-xl text-white mb-6">"Running the business"</p>

            <H3>STEP 8 — TOOL RESEARCH WITH PERPLEXITY + CLAUDE</H3>
            <p className="mb-2"><strong>Time:</strong> 45 minutes</p>
            <p className="mb-6"><strong>Tool:</strong> <ToolLink name="Perplexity Pro" to="/tools/perplexity" /> + <ToolLink name="Claude Pro" to="/tools/claude" /></p>

            <p>
              Every week I research one new tool deeply enough to write a full review. The process:
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <p className="font-bold text-white">Phase 1 — Research with <ToolLink name="Perplexity" to="/tools/perplexity" />:</p>
                <p className="font-mono text-sm bg-brand-surface p-3 rounded border border-gray-800 mt-1">"Give me a comprehensive overview of [tool name] — what it does, who it is for, current pricing tiers, recent updates, and what users are saying about it on Reddit and Twitter"</p>
              </div>
              <div>
                <p className="font-bold text-white">Phase 2 — Structure with <ToolLink name="Claude" to="/tools/claude" />:</p>
                <p className="font-mono text-sm bg-brand-surface p-3 rounded border border-gray-800 mt-1">"Based on this research [paste Perplexity output], create a detailed review outline following this structure: hero description, key features, pros, cons, pricing, who it is best for, final verdict"</p>
              </div>
              <div>
                <p className="font-bold text-white">Phase 3 — Write with <ToolLink name="Claude" to="/tools/claude" />:</p>
                <p className="font-mono text-sm bg-brand-surface p-3 rounded border border-gray-800 mt-1">"Now write the full review using this outline. Be honest about limitations — we never write purely positive reviews."</p>
              </div>
              <div>
                <p className="font-bold text-white">Phase 4 — Personal layer:</p>
                <p className="mt-1">I add my own experience using the tool, specific examples, and genuine opinions before publishing.</p>
              </div>
            </div>

            <H3>STEP 9 — CODING AND SITE UPDATES WITH CURSOR</H3>
            <p className="mb-2"><strong>Time:</strong> As needed</p>
            <p className="mb-6"><strong>Tool:</strong> <ToolLink name="Cursor Pro" to="/tools/cursor" /></p>

            <p>
              Any time the website needs updating — a new section, a bug fix, a design tweak — I use <ToolLink name="Cursor" to="/tools/cursor" />.
            </p>
            <p>
              I describe what I want in plain language and <ToolLink name="Cursor" to="/tools/cursor" /> writes the code.
            </p>

            <p>
              Last week I added a new filtering system to the tools page. I described what I wanted, <ToolLink name="Cursor" to="/tools/cursor" /> wrote the React component, I reviewed it, and it was live in under an hour.
            </p>
            <p>
              Without <ToolLink name="Cursor" to="/tools/cursor" /> that change would have required briefing a developer and waiting days.
            </p>

            <CalloutTip>
              <span className="font-bold text-white">Key insight:</span> <ToolLink name="Cursor" to="/tools/cursor" /> is not just for developers. It is for anyone who wants to control their own digital product without being permanently dependent on someone else to make changes for them.
            </CalloutTip>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="the-numbers">THE NUMBERS — WHAT THIS WORKFLOW ACTUALLY SAVES</H2>

            <p>
              Here is an honest accounting of what this AI workflow replaces and what it costs:
            </p>

            <div className="bg-brand-surface border border-gray-800 rounded-xl overflow-hidden my-8">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-800">
                <div className="p-6">
                  <h4 className="text-lg font-bold font-mono text-red-400 mb-4">BEFORE THIS WORKFLOW:</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between"><span>Research time:</span> <strong>3 hours/day</strong></li>
                    <li className="flex justify-between"><span>Writing time:</span> <strong>4 hours/article</strong></li>
                    <li className="flex justify-between"><span>Social content:</span> <strong>1 hour/post</strong></li>
                    <li className="flex justify-between"><span>Newsletter:</span> <strong>3 hours/issue</strong></li>
                    <li className="flex justify-between"><span>Developer retainer:</span> <strong><Money>$300/month</Money></strong></li>
                    <li className="flex justify-between"><span>Designer:</span> <strong><Money>$200/month</Money></strong></li>
                    <li className="border-t border-gray-700 pt-3 mt-3 flex justify-between text-white"><span>Total time per week:</span> <strong>35-40 hours</strong></li>
                    <li className="flex justify-between text-red-400"><span>Total monthly cost:</span> <strong><Money>$500+</Money></strong></li>
                  </ul>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold font-mono text-green-400 mb-4">WITH THIS WORKFLOW:</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between"><span>Research time:</span> <strong>45 minutes/day</strong></li>
                    <li className="flex justify-between"><span>Writing time:</span> <strong>90 minutes/article</strong></li>
                    <li className="flex justify-between"><span>Social content:</span> <strong>20 minutes/post</strong></li>
                    <li className="flex justify-between"><span>Newsletter:</span> <strong>30 minutes/issue</strong></li>
                    <li className="flex justify-between"><span>Developer retainer:</span> <strong><Money>$0</Money></strong></li>
                    <li className="flex justify-between"><span>Designer:</span> <strong><Money>$0</Money></strong></li>
                    <li className="border-t border-gray-700 pt-3 mt-3 flex justify-between text-white"><span>Total time per week:</span> <strong>18-20 hours</strong></li>
                    <li className="flex justify-between text-green-400"><span>Monthly tool cost:</span> <strong><Money>$140/month</Money></strong></li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-900 p-6 border-t border-gray-800 text-center">
                <p className="text-lg font-mono text-white mb-1">Time saved per week: <span className="text-green-400 font-bold">15-20 hours</span></p>
                <p className="text-lg font-mono text-white">Money saved per month: <span className="text-green-400 font-bold"><Money>$360+</Money></span></p>
              </div>
            </div>

            <p>
              That time saving is not theoretical.
            </p>
            <p>
              It is the difference between burning out trying to run everything alone and having enough capacity left to actually think about where the business is going.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="the-stack">THE TOOLS IN THIS WORKFLOW</H2>

            <p>
              Every tool mentioned in this workflow has a full review on domskysolutions.com:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              <ToolReviewCard name="Claude" desc="The thinking and writing partner that powers everything." to="/tools/claude" category="AI Assistant" />
              <ToolReviewCard name="Perplexity" desc="The research department that runs in real time." to="/tools/perplexity" category="Research" />
              <ToolReviewCard name="Notion AI" desc="The knowledge system that makes everything else findable." to="/tools/notion" category="Workspace" />
              <ToolReviewCard name="Midjourney" desc="The design studio for every visual asset." to="/tools/midjourney" category="Image Generation" />
              <ToolReviewCard name="Cursor" desc="The development team for every site change." to="/tools/cursor" category="Code Editor" />
            </div>

            <p className="text-xl font-bold font-mono text-center my-8">
              Total: <span className="text-brand-cyan"><Money>$116/month</Money></span> for a workflow that replaces a team.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="end-of-day">THE ONE THING THAT MAKES IT WORK</H2>

            <p>
              Every tool in this workflow is only as good as the human judgment applied to its output.
            </p>
            <p>
              <ToolLink name="Claude" to="/tools/claude" />'s drafts need editing. <ToolLink name="Perplexity" to="/tools/perplexity" />'s research needs verification. <ToolLink name="Midjourney" to="/tools/midjourney" />'s images need curation. <ToolLink name="Cursor" to="/tools/cursor" />'s code needs review.
            </p>
            <p>
              The workflow does not replace thinking. It removes the friction between thinking and doing — and that is where most of the time in a solo business actually goes.
            </p>
            <p>
              When that friction disappears, the amount you can produce alone genuinely surprises you.
            </p>
            <p>
              This is not about working harder. It is about removing every obstacle between an idea and its execution.
            </p>
            
            <PullQuote>
              "The workflow does not replace thinking. It removes the friction between thinking and doing."
            </PullQuote>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="want-this-workflow">WANT THIS WORKFLOW FOR YOUR BUSINESS?</H2>

            <p>
              Start with just two tools — <ToolLink name="Claude" to="/tools/claude" /> and <ToolLink name="Perplexity" to="/tools/perplexity" />.
            </p>
            <p>
              Use them exclusively for two weeks on real work tasks. The time saving will be obvious enough to tell you exactly which tool to add next.
            </p>
            <p>
              The full stack takes time to build. The first tool takes an afternoon.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link to="/tools/claude" className="flex-1 bg-brand-surface border border-gray-700 p-4 text-center hover:border-brand-cyan transition-colors group">
                <span className="block font-bold text-white mb-1 group-hover:text-brand-cyan transition-colors">Start with Claude</span>
                <span className="text-sm text-gray-400 flex items-center justify-center gap-1">Read our review <ArrowRight size={14} /></span>
              </Link>
              <Link to="/tools/perplexity" className="flex-1 bg-brand-surface border border-gray-700 p-4 text-center hover:border-brand-cyan transition-colors group">
                <span className="block font-bold text-white mb-1 group-hover:text-brand-cyan transition-colors">Start with Perplexity</span>
                <span className="text-sm text-gray-400 flex items-center justify-center gap-1">Read our review <ArrowRight size={14} /></span>
              </Link>
            </div>
          </motion.div>

          <div className="mt-16 p-6 bg-brand-surface border border-gray-800 rounded-xl text-sm text-gray-400">
            <p className="mb-2"><strong className="text-gray-300">ABOUT THIS ARTICLE</strong></p>
            <p>
              domskysolutions.com reviews AI tools and SaaS software for founders, solopreneurs and builders. We test every tool we recommend and update our reviews regularly as products evolve. Some links in this article are affiliate links — we may earn a commission if you sign up through them at no extra cost to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};