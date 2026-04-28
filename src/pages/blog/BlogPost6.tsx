import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'motion/react';
import { ChevronUp, Coffee } from 'lucide-react';
import { BLOG_POSTS } from '../../data/blogPosts';
import { BlogCard } from '../../components/BlogCard';
import { ConvertKitForm } from '../../components/ConvertKitForm';
import { SectionDivider, H2, H3, CalloutTip, PullQuote } from '../../components/ui';

const tocItems = [
  { id: 'the-misconception', label: 'The Misconception' },
  { id: 'what-ai-tools-actually-are', label: 'What AI Tools Actually Are' },
  { id: 'where-to-start', label: 'Where to Start' },
  { id: 'real-things-you-can-do', label: 'Real Things You Can Do' },
  { id: 'common-questions', label: 'Common Questions' },
  { id: 'your-next-step', label: 'Your Next Step' },
];

const ScreenshotPlaceholder = ({
  filename,
  description,
}: {
  filename: string;
  description: string;
}) => (
  <figure className="my-8 rounded-xl border border-dashed border-brand-cyan/40 bg-brand-surface/80 p-6 shadow-2xl">
    <div className="flex min-h-[260px] items-center justify-center rounded-lg border border-gray-800 bg-gray-950/60 px-6 text-center">
      <div>
        <div className="mb-3 text-xs font-mono uppercase tracking-[0.25em] text-brand-cyan">
          Screenshot Placeholder
        </div>
        <div className="text-lg font-semibold text-white">{filename}</div>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-400">{description}</p>
      </div>
    </div>
    <figcaption className="mt-3 text-center font-mono text-sm text-gray-500">{filename}</figcaption>
  </figure>
);

export const BlogPost6 = () => {
  const { scrollYProgress } = useScroll();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [sidebarFixed, setSidebarFixed] = useState(true);

  useEffect(() => {
    document.title = "You Don't Need to Be Technical to Use AI — Start Here | Domsky Solutions";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content',
      'Everyone is talking about AI tools but nobody is explaining them for people who are not developers. This is that article. No jargon. No assumptions. Just what you actually need to know to start.'
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);

      let current = '';
      for (const section of tocItems) {
        const element = document.getElementById(section.id);
        if (element && window.scrollY >= element.offsetTop - 120) {
          current = section.id;
        }
      }
      setActiveSection(current);

      const relatedSection = document.getElementById('related-articles');
      if (relatedSection) {
        setSidebarFixed(relatedSection.getBoundingClientRect().top >= window.innerHeight);
      }
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

  const relatedPosts = BLOG_POSTS.filter((post) =>
    [
      '/blog/replaced-saas-stack-with-ai-tools',
      '/blog/claude-vs-chatgpt-vs-gemini-2026',
    ].includes(post.slug)
  );

  return (
    <div className="bg-brand-bg min-h-screen text-gray-300 font-sans pb-24 relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-cyan origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <div
        className={`hidden xl:block ${
          sidebarFixed ? 'fixed left-[max(0px,calc(50%-550px))] top-48' : 'absolute left-[max(0px,calc(50%-550px))]'
        } w-64`}
      >
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
          {tocItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`text-left transition-all duration-200 flex items-center gap-2 ${
                  activeSection === item.id
                    ? 'text-brand-cyan font-semibold text-[13px]'
                    : 'text-gray-500 text-[12px] hover:text-gray-300'
                }`}
              >
                <span
                  className={`w-1 h-1 rounded-full flex-shrink-0 transition-all ${
                    activeSection === item.id ? 'bg-brand-cyan scale-150' : 'bg-gray-700'
                  }`}
                />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

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
            <span className="text-gray-400 font-mono text-sm flex items-center gap-2">
              <Coffee size={16} /> 10 min read
            </span>
          </div>
          <h1 className="text-[48px] font-bold font-inter text-white leading-tight mb-8">
            You Don't Need to Be Technical to Use AI — Start Here
          </h1>
          <div className="flex flex-wrap gap-2">
            {['AI Tools', 'Beginners', 'Getting Started', 'Claude', 'Productivity', 'No Code'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-mono rounded-full border border-gray-700">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full rounded-xl overflow-hidden mb-12 border border-brand-surface shadow-2xl">
          <div className="flex h-[400px] items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_45%),linear-gradient(180deg,_rgba(15,23,42,0.9),_rgba(2,6,23,1))] px-10 text-center">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-brand-cyan mb-4">April 2026</div>
              <h2 className="text-3xl md:text-4xl font-bold font-inter text-white leading-tight">
                AI tools are not for developers only.
              </h2>
              <p className="mt-6 text-lg font-serif text-gray-300 leading-8 max-w-2xl">
                No jargon. No assumptions. Just what a non-technical person actually needs to know to start.
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-[18px] leading-[1.9] font-serif space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p>
              <span className="font-bold text-white">
                I have been in tech for 25 years. I built this website myself. I review AI tools for a living.
                <br />
                <br />
                And I am telling you honestly — you do not need any of that to start using AI tools today.
              </span>
            </p>
            <p>
              Every article about AI tools seems to be written by developers for developers. Full of jargon. Full of assumptions
              about what you already know.
            </p>
            <p>This one is different.</p>
            <p>
              I am writing this for the person who has heard about ChatGPT or Claude but has no idea where to start. For the small
              business owner who keeps seeing AI tools mentioned but feels like they are not technical enough to use them. For the
              freelancer who is curious but intimidated.
            </p>
            <p>
              That was me once — with computers, with design software, with coding. Every skill I have I taught myself because
              someone eventually explained it in plain language.
            </p>
            <p>This is that article for AI tools.</p>
          </motion.div>

          <PullQuote>
            "The only skill you need to use AI tools is the ability to describe what you want clearly. You have been doing that
            your whole life."
          </PullQuote>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="the-misconception">THE BIGGEST MISCONCEPTION ABOUT AI TOOLS</H2>

            <ScreenshotPlaceholder
              filename="ai-misconception.jpg"
              description='Recommended visual: a simple side-by-side diagram showing "What people think AI requires" versus "What AI actually requires".'
            />

            <p>Here is what most people believe about AI tools:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 my-4">
              <li>You need to understand how they work.</li>
              <li>You need programming knowledge.</li>
              <li>You need to be comfortable with complex technology.</li>
              <li>You need to be young or technical.</li>
            </ul>
            <p>Here is what is actually true:</p>
            <p className="font-bold text-white">You need to know what you want and be able to describe it.</p>
            <p>That is the complete list.</p>
            <p>
              AI tools are not like spreadsheet software with a hundred menus and formulas to memorise. They are not like Photoshop
              with layers and blend modes and keyboard shortcuts.
            </p>
            <p>
              They are conversational. You talk to them like you would talk to a very capable person and they respond in kind.
            </p>
            <p>
              If you can write an email — and I am assuming you can — you can use AI tools.
            </p>

            <CalloutTip>
              "I am a graphic designer with 25 years of tech experience and I still sometimes sit down with a blank screen and no
              idea how to start something. The difference now is I have a thinking partner I can describe the problem to. That is
              all AI tools are — a thinking partner that types very fast."
            </CalloutTip>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="what-ai-tools-actually-are">WHAT AI TOOLS ACTUALLY ARE (IN PLAIN LANGUAGE)</H2>
            <p>
              Let me strip away all the technical language and explain what you are actually dealing with.
            </p>
            <p>
              An AI tool is software that has been trained on enormous amounts of text — books, articles, websites, conversations —
              and learned patterns from all of it.
            </p>
            <p>
              When you type something to it the software predicts what a useful response would look like based on everything it has
              learned.
            </p>
            <p>That is it. That is the whole thing.</p>
            <p>
              You do not need to understand the mathematics behind it any more than you need to understand how a car engine works to
              drive one. You just need to know how to use the steering wheel.
            </p>
            <p>
              For AI tools the steering wheel is your words. The better you describe what you want the better the result.
            </p>

            <H3>The Three Categories You Actually Need to Know</H3>

            <div className="grid gap-6 md:grid-cols-3 my-8 not-prose">
              <div className="rounded-xl border border-gray-800 bg-brand-surface p-6">
                <div className="text-sm font-mono uppercase tracking-wider text-brand-cyan mb-3">Writing and Thinking Tools</div>
                <p className="text-gray-300 text-base leading-7 mb-4">
                  These help you write, edit, brainstorm, and think through problems.
                </p>
                <p className="text-sm text-gray-400 leading-7">
                  <span className="font-semibold text-white">Examples:</span> Claude, ChatGPT
                  <br />
                  <span className="font-semibold text-white">Best for:</span> emails, blog posts, decisions, summaries
                </p>
              </div>
              <div className="rounded-xl border border-gray-800 bg-brand-surface p-6">
                <div className="text-sm font-mono uppercase tracking-wider text-brand-cyan mb-3">Research Tools</div>
                <p className="text-gray-300 text-base leading-7 mb-4">
                  These help you find information quickly with sources you can verify.
                </p>
                <p className="text-sm text-gray-400 leading-7">
                  <span className="font-semibold text-white">Examples:</span> Perplexity
                  <br />
                  <span className="font-semibold text-white">Best for:</span> research, fact-checking, staying current on your
                  industry
                </p>
              </div>
              <div className="rounded-xl border border-gray-800 bg-brand-surface p-6">
                <div className="text-sm font-mono uppercase tracking-wider text-brand-cyan mb-3">Creative Tools</div>
                <p className="text-gray-300 text-base leading-7 mb-4">
                  These generate images, video, audio, and design assets.
                </p>
                <p className="text-sm text-gray-400 leading-7">
                  <span className="font-semibold text-white">Examples:</span> Midjourney, Runway, ElevenLabs
                  <br />
                  <span className="font-semibold text-white">Best for:</span> visuals, marketing assets, content creation
                </p>
              </div>
            </div>

            <p>Most people need one tool from the first category to start. Everything else can wait.</p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="where-to-start">WHERE TO START (THE ONLY RECOMMENDATION YOU NEED)</H2>

            <ScreenshotPlaceholder
              filename="claude-beginner-start.jpg"
              description="Recommended visual: the Claude.ai interface showing a simple beginner conversation in progress."
            />

            <p>
              If you are reading this and you have never seriously used an AI tool before — start with Claude.
            </p>
            <p>
              Not because it is the only good one. There are several excellent options. But because it is the one I use every
              single day, the one I can speak about from real experience, and the one I consistently recommend to people who are
              just starting out.
            </p>
            <p>Here is why Claude specifically:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 my-4">
              <li>
                It is honest about what it does not know. Claude is notably better at saying "I am not certain about this" which
                matters when you are relying on it for real work.
              </li>
              <li>It writes in a natural way. The output does not immediately read as AI generated.</li>
              <li>The free plan is genuinely useful. You do not need to pay anything to get significant value from it.</li>
              <li>
                It is designed to be a thinking partner not just a text generator, which fits the tasks most beginners actually
                need.
              </li>
            </ul>

            <H3>Your First Five Minutes with Claude</H3>

            <div className="not-prose">
              <div className="my-8 flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-full bg-brand-amber/10 border border-brand-amber/30 flex items-center justify-center text-brand-amber font-bold font-mono text-xl">
                  1
                </div>
                <div>
                  <div className="font-bold text-white text-lg mb-2">Create your account</div>
                  <div className="text-gray-300 leading-8">Go to `claude.ai`, click sign up, and use your email or Google account.</div>
                </div>
              </div>
              <div className="my-8 flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-full bg-brand-amber/10 border border-brand-amber/30 flex items-center justify-center text-brand-amber font-bold font-mono text-xl">
                  2
                </div>
                <div>
                  <div className="font-bold text-white text-lg mb-2">Ask for something real</div>
                  <div className="text-gray-300 leading-8">
                    Type something you actually need today instead of a test prompt.
                  </div>
                </div>
              </div>
              <div className="my-8 flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-full bg-brand-amber/10 border border-brand-amber/30 flex items-center justify-center text-brand-amber font-bold font-mono text-xl">
                  3
                </div>
                <div>
                  <div className="font-bold text-white text-lg mb-2">Refine the response</div>
                  <div className="text-gray-300 leading-8">
                    Tell it what to change: "Make it shorter", "Less formal", "Expand the second point".
                  </div>
                </div>
              </div>
              <div className="my-8 flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-full bg-brand-amber/10 border border-brand-amber/30 flex items-center justify-center text-brand-amber font-bold font-mono text-xl">
                  4
                </div>
                <div>
                  <div className="font-bold text-white text-lg mb-2">Keep the conversation going</div>
                  <div className="text-gray-300 leading-8">This is not a single query. It gets better when you continue the conversation.</div>
                </div>
              </div>
            </div>

            <p className="font-bold text-white">That is it. You are now using an AI tool.</p>

            <CalloutTip>
              "The single most common mistake beginners make is treating it like a search engine. It is not Google. You do not type
              keywords. You type sentences. You explain context. You give it the background it needs to help you well. The more you
              treat it like a conversation the better the results get."
            </CalloutTip>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="real-things-you-can-do">REAL THINGS YOU CAN DO WITH CLAUDE TODAY</H2>
            <p>
              Here are ten things non-technical people use Claude for every day. None of them require any skill beyond describing
              what you want.
            </p>

            <div className="space-y-8 not-prose my-8">
              {[
                {
                  title: 'Write emails you have been putting off',
                  prompt:
                    'I need to write an email to a client who has not paid their invoice. It has been 3 weeks. I want to be firm but not rude. The amount is €450. Their name is [name].',
                  result: 'A complete professional email ready to send or edit.',
                },
                {
                  title: 'Summarise long documents',
                  prompt:
                    'Here is a contract I need to understand. Can you summarise the key points in plain language and flag anything I should pay attention to before signing? [paste the document]',
                  result: 'A clear summary of the main points and any potential concerns.',
                },
                {
                  title: 'Prepare for a difficult conversation',
                  prompt:
                    'I need to tell a client their project will be delayed by two weeks. Help me think through how to approach this conversation.',
                  result: 'A structured approach including what to say, how to say it, and how to handle likely responses.',
                },
                {
                  title: 'Write your bio or about page',
                  prompt:
                    'Help me write a professional bio for my website. I am a [your job]. I have been doing this for [years]. I specialise in [area]. I want it to sound professional but human. About 150 words.',
                  result: 'A polished bio you can use immediately.',
                },
                {
                  title: 'Brainstorm ideas',
                  prompt:
                    'I run a small bakery in [city]. I want to attract more customers on weekday mornings. Give me 10 ideas for promotions or changes I could make.',
                  result: '10 specific actionable ideas you can evaluate and choose from.',
                },
                {
                  title: 'Proofread and improve your writing',
                  prompt:
                    'Please proofread this and improve it. Make it clearer and fix any errors but keep my voice. [paste your text]',
                  result: 'A polished version of your own writing that still sounds like you.',
                },
                {
                  title: 'Research a topic quickly',
                  prompt:
                    'Explain [topic] to me like I am completely new to it. Then tell me the three most important things I need to understand about it.',
                  result: 'A clear explanation at exactly the level you need.',
                },
                {
                  title: 'Create a plan',
                  prompt:
                    'I want to start a newsletter about [topic]. I have never done this before. Create a simple step by step plan for the first 30 days.',
                  result: 'A realistic actionable plan broken down into daily tasks.',
                },
                {
                  title: 'Prepare for a job interview',
                  prompt:
                    'I have an interview for a [job title] role at [type of company]. Help me prepare answers for the most likely questions. My background is [brief description].',
                  result: 'Prepared answers you can practice and adapt.',
                },
                {
                  title: 'Understand a confusing document',
                  prompt:
                    'Can you explain what this means in plain language? [paste confusing text — legal, medical, financial, technical]',
                  result: 'A clear human explanation of exactly what it says.',
                },
              ].map((item, index) => (
                <div key={item.title} className="rounded-xl border border-gray-800 bg-brand-surface p-6">
                  <div className="text-sm font-mono uppercase tracking-wider text-brand-cyan mb-3">{index + 1}. {item.title}</div>
                  <p className="text-sm font-semibold text-white mb-2">The prompt:</p>
                  <p className="text-gray-300 italic leading-8 mb-4">"{item.prompt}"</p>
                  <p className="text-sm font-semibold text-white mb-2">What you get:</p>
                  <p className="text-gray-400 leading-8">{item.result}</p>
                </div>
              ))}
            </div>

            <ScreenshotPlaceholder
              filename="claude-real-example.jpg"
              description="Recommended visual: a Claude conversation showing one of these practical examples in action."
            />
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="common-questions">THE QUESTIONS EVERYONE IS TOO EMBARRASSED TO ASK</H2>

            <H3>"Will it replace my job?"</H3>
            <p>Probably not in the way you fear.</p>
            <p>
              AI tools are genuinely better than humans at certain specific tasks — generating first drafts, summarising
              information, producing variations quickly.
            </p>
            <p>
              They are genuinely worse than humans at others — understanding context, making judgement calls, building
              relationships, understanding nuance.
            </p>
            <p>
              The realistic picture: people who use AI tools effectively are becoming more productive and more valuable. People who
              ignore them entirely are finding it harder to compete on output and speed.
            </p>
            <p>
              The goal is not to be replaced by AI. The goal is to use AI so you can do more of the work that actually requires
              you.
            </p>

            <H3>"What if I get something wrong?"</H3>
            <p>This is an important one.</p>
            <p>
              AI tools make mistakes. Claude, ChatGPT, Gemini — all of them will occasionally give you wrong information delivered
              with complete confidence.
            </p>
            <p className="font-bold text-white">The rule is simple: never use AI output for something important without checking it.</p>
            <p>
              Use it to write a first draft — then read it carefully before sending. Use it to summarise a contract — then read the
              actual contract before signing. Use it to research a topic — then verify key facts from authoritative sources.
            </p>
            <p>AI tools are a starting point and a thinking partner. They are not a replacement for your own judgement.</p>

            <H3>"Is my information private?"</H3>
            <p>This is worth taking seriously.</p>
            <p>
              Do not paste sensitive personal information, confidential business data, passwords, financial details, or anything you
              would not want stored on an external server into any AI tool.
            </p>
            <p>
              For general use — writing help, brainstorming, research, summaries of non-sensitive content — the privacy risk is
              comparable to using any other online service.
            </p>
            <p>
              Read the privacy policy of any tool you use seriously. Claude's is at{' '}
              <a href="https://www.anthropic.com/privacy" target="_blank" rel="noreferrer">
                anthropic.com/privacy
              </a>.
            </p>

            <H3>"Is it cheating?"</H3>
            <p>This comes up a lot — especially from people using AI for writing.</p>
            <p>
              Here is the honest answer: it depends entirely on what you are doing and what the expectations are.
            </p>
            <p>
              Using AI to help you write a business email? Not cheating — you are using a tool to communicate more effectively.
            </p>
            <p>
              Using AI to write an essay for a class that prohibits it? That is cheating by definition.
            </p>
            <p>
              For most professional use cases — AI is a productivity tool like any other. The work is still yours. The judgement
              is still yours. The responsibility is still yours.
            </p>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2 id="your-next-step">YOUR NEXT STEP (KEEP IT SIMPLE)</H2>

            <ScreenshotPlaceholder
              filename="ai-next-steps.jpg"
              description='Recommended visual: a simple 3-step graphic labelled "Step 1, Step 2, Step 3".'
            />

            <p>I want to give you one specific thing to do after reading this.</p>
            <p>Not ten things. Not a list of tools to sign up for. Not a complicated system to implement.</p>
            <p>One thing.</p>
            <p className="font-bold text-white">Go to claude.ai right now. Sign up for free. Ask it one thing you actually need today.</p>
            <p>
              Not a test prompt. Not "what is the capital of France." Something real. Something from your actual work or life.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 my-4">
              <li>A difficult email you have been avoiding.</li>
              <li>A decision you are stuck on.</li>
              <li>A document you need to understand.</li>
              <li>A plan you need to start.</li>
            </ul>
            <p>Use it for that one real thing. See what happens.</p>
            <p>
              The learning curve for AI tools is not a curve at all. It is a single step. You describe what you want. You read the
              result. You tell it if you need something different.
            </p>
            <p>That is all there is.</p>
            <p>
              After 25 years in technology I can say with confidence that AI tools represent the most significant shift in how
              individuals can work that I have ever seen.
            </p>
            <p>
              And unlike most technology shifts — this one genuinely does not require any technical knowledge to benefit from.
            </p>
            <p>You just have to start.</p>

            <PullQuote>
              "After 25 years in technology this is the first shift I have seen where the barrier to entry is not technical skill —
              it is simply deciding to begin."
            </PullQuote>
          </motion.div>

          <SectionDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <H2>ONE MORE THING</H2>
            <p>If you found this useful there are two things I would ask.</p>
            <p>
              First — share it with one person you know who has been curious about AI tools but felt like they were not technical
              enough. This article was written for them.
            </p>
            <p>
              Second — if you want to stay current on AI tools without spending hours researching I send one email every Thursday.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 my-4">
              <li>One tool worth knowing.</li>
              <li>One workflow tip that saves real time.</li>
              <li>One insight from the week.</li>
            </ul>
            <p>
              No jargon. No technical assumptions. Just what actually matters for people who have real work to do.
            </p>
            <p>It is called The Weekly Edge and it is free.</p>

            <div className="not-prose my-10 rounded-2xl border border-brand-cyan/20 bg-brand-surface p-8 shadow-2xl">
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-brand-cyan mb-4">Newsletter Signup</div>
              <h3 className="text-2xl font-bold font-inter text-white mb-3">Join The Weekly Edge</h3>
              <p className="text-gray-300 leading-8 mb-6">
                One tool worth knowing, one workflow tip that saves real time, and one insight from the week. Every Thursday.
              </p>
              <ConvertKitForm
                className="flex flex-col sm:flex-row gap-3"
                inputClassName="flex-1 px-4 py-3 rounded-lg bg-brand-bg border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-cyan"
                buttonClassName="px-6 py-3 rounded-lg bg-brand-cyan text-brand-bg font-bold hover:bg-white transition-colors"
                buttonText="Subscribe Free"
                placeholder="Your email address"
                successMessage="You are in. The next Thursday issue will land in your inbox."
              />
            </div>

            <p>
              And if you have questions — about any specific tool, about where to start, about whether a particular AI tool would
              be useful for your specific situation — send me an email.
            </p>
            <p className="font-bold text-white">team@domskysolutions.com</p>
            <p>I read every message personally.</p>
            <p className="font-bold text-white mt-8">
              "You are not behind. You are exactly where you need to be to start."
            </p>
            <p className="text-gray-400">
              — Dominik
              <br />
              domskysolutions.com
            </p>
          </motion.div>
        </div>
      </div>

      <div id="related-articles" className="max-w-5xl mx-auto px-6 mt-24 border-t border-gray-800 pt-16">
        <h2 className="text-2xl font-bold font-mono text-white mb-8">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {relatedPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
