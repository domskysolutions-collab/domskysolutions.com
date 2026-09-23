import type { ArticleDocument } from '../types';

// Imported from the approved existing article. Exact original publication day is unknown.
export const astraComparison = {
  "id": "astra-vs-claude-code",
  "title": "ChatGPT Astra vs Claude Code in 2026: Features, Pricing & Real Value",
  "slug": "/comparisons/chatgpt-astra-vs-alternatives",
  "description": "Astra in Codex or Claude Code? Compare features, subscription prices, usage limits and the real cost of getting working software built.",
  "deck": "Two routes to getting software built. Understand what you are buying, where the limits are, and how to choose without paying for two tools you barely use.",
  "category": "Comparisons",
  "author": {
    "name": "Domsky Solutions editorial",
    "type": "Organization",
    "url": "/about"
  },
  "publishedAt": null,
  "updatedAt": "2026-09-23",
  "verifiedAt": "2026-09-23",
  "status": "published",
  "contentType": "comparison",
  "tags": [
    "AI assistants",
    "Coding"
  ],
  "relatedSlugs": [
    "/comparisons/claude-vs-chatgpt-vs-gemini-2026"
  ],
  "readingMinutes": 8,
  "featuredImage": null,
  "affiliateDisclosureRequired": false,
  "disclosure": "Provider links here are direct, non-affiliate links. Other pages may contain affiliate links.",
  "sources": [
    {
      "id": "access",
      "url": "https://help.openai.com/en/articles/20001275/",
      "title": "OpenAI: ChatGPT Work, Codex and Astra access"
    },
    {
      "id": "plus",
      "url": "https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus",
      "title": "OpenAI: ChatGPT Plus pricing and API billing"
    },
    {
      "id": "code",
      "url": "https://code.claude.com/docs/en/overview",
      "title": "Anthropic: Claude Code overview"
    },
    {
      "id": "pricing",
      "url": "https://claude.com/pricing",
      "title": "Anthropic: Claude subscription pricing"
    },
    {
      "id": "costs",
      "url": "https://code.claude.com/docs/en/costs",
      "title": "Anthropic: Claude Code usage and costs"
    }
  ],
  "verificationPending": [],
  "blocks": [
    {
      "type": "note",
      "title": "About this comparison",
      "text": [
        "This is a research-based buying guide using official product documentation, not a hands-on benchmark. Recommendations are editorial judgments. We have not run a controlled head-to-head coding test. ",
        {
          "text": "How we evaluate tools",
          "href": "/methodology"
        },
        "."
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "id": "quick-answer",
      "text": "Which should you choose?"
    },
    {
      "type": "paragraph",
      "text": [
        {
          "text": "Already paying for ChatGPT? Try Astra in Codex first.",
          "strong": true
        },
        " Give it one real development task before buying another subscription. Your existing access may be enough."
      ]
    },
    {
      "type": "paragraph",
      "text": [
        {
          "text": "Want a coding agent close to your terminal or IDE? Shortlist Claude Code.",
          "strong": true
        },
        " Evaluate how it fits your project, not just how convincing its answers sound."
      ]
    },
    {
      "type": "paragraph",
      "text": [
        {
          "text": "Mostly creating reports, proposals or spreadsheets?",
          "strong": true
        },
        " Compare ChatGPT Work with Claude’s broader productivity offering. A coding-agent comparison is not the best starting point if you rarely work with a codebase."
      ]
    },
    {
      "type": "note",
      "title": "Important note",
      "text": [
        "Start with one paid tool. Add a second only after it reliably solves a recurring problem the first leaves behind. These are buying recommendations, not measured performance rankings."
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "id": "what-is-astra",
      "text": "Astra is a model. Claude Code is a coding app."
    },
    {
      "type": "paragraph",
      "text": [
        "“ChatGPT Astra” is shorthand for using OpenAI’s GPT‑6 Astra model. Claude Code is a software-development product powered by Claude models. For coding, the useful comparison is ",
        {
          "text": "Astra in Codex versus Claude Code with a specified model",
          "strong": true
        },
        "."
      ]
    },
    {
      "type": "workflow",
      "caption": "Editorial workflow diagram. This illustrates product roles, not performance.",
      "paths": [
        {
          "title": "OpenAI route",
          "steps": [
            "GPT‑6 Astra — Model",
            "Codex — Workspace and tools",
            "A reviewed code change"
          ]
        },
        {
          "title": "Anthropic route",
          "steps": [
            "A Claude model — Model",
            "Claude Code — Workspace and tools",
            "A reviewed code change"
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "text": [
        "OpenAI lists Astra in Work and Codex for Plus. GPT‑6 Pro, powered by Astra, is available in regular ChatGPT on Pro $100, Pro $200, Business and Enterprise. Account and workspace settings affect access. ",
        {
          "text": "Check OpenAI’s access guide",
          "href": "https://help.openai.com/en/articles/20001275/"
        },
        "."
      ]
    },
    {
      "type": "image",
      "image": {
        "src": "/images/astra-work-model-picker.webp",
        "alt": "GPT-6 Astra selected in the ChatGPT Work model picker in the original Slovak interface.",
        "caption": "Original capture, 22 September 2026. This shows Astra in ChatGPT Work, not Codex or a coding benchmark. Your account’s options may differ."
      }
    },
    {
      "type": "heading",
      "level": 2,
      "id": "comparison",
      "text": "Features side by side"
    },
    {
      "type": "table",
      "caption": "Documented capabilities and practical evaluation criteria",
      "columns": [
        "Decision point",
        "Astra in Codex",
        "Claude Code"
      ],
      "rows": [
        [
          "What it is",
          "A model used inside a development workspace.",
          "A coding application using Claude models."
        ],
        [
          "Repository work",
          "Code changes, debugging, tests, commands and review.",
          "Reads code, edits files, runs commands and works with Git."
        ],
        [
          "Environment",
          "Check Astra availability in your Codex model picker.",
          "Terminal, supported IDEs, desktop and browser."
        ],
        [
          "Customization",
          "Trial it with your repository instructions and checks.",
          "CLAUDE.md, MCP integrations, skills and hooks."
        ],
        [
          "Beyond coding",
          "Work is the separate experience for research and deliverables.",
          "Evaluate the wider Claude subscription separately."
        ],
        [
          "Your responsibility",
          "Review the diff and verify the finished feature.",
          "Review the diff and verify the finished feature."
        ]
      ]
    },
    {
      "type": "paragraph",
      "text": [
        "Feature references: ",
        {
          "text": "OpenAI Work and Codex",
          "href": "https://help.openai.com/en/articles/20001275/"
        },
        " and ",
        {
          "text": "Claude Code overview",
          "href": "https://code.claude.com/docs/en/overview"
        },
        ". Similar capabilities do not establish identical results."
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "id": "alternatives",
      "text": "Which workflow fits your business?"
    },
    {
      "type": "heading",
      "level": 3,
      "id": "alternatives-1",
      "text": "Astra in Codex: test the access you already have"
    },
    {
      "type": "paragraph",
      "text": [
        "If ChatGPT is already part of your business, start with a bounded feature and a clear acceptance checklist. Judge the implementation, explanation and checks you can rerun. Do not upgrade merely because a model name sounds more advanced."
      ]
    },
    {
      "type": "paragraph",
      "text": [
        "Watch whether your allowance lasts through meaningful work. If you repeatedly run out while completing valuable tasks, a higher tier may be justified. If the output requires extensive repair, buying more capacity will not by itself solve the quality problem."
      ]
    },
    {
      "type": "heading",
      "level": 3,
      "id": "alternatives-2",
      "text": "Claude Code: test the developer workflow"
    },
    {
      "type": "paragraph",
      "text": [
        "Claude Code is worth evaluating when you want an agent in your development environment. Its documented project instructions and integrations give you specific workflow features to assess. ",
        {
          "text": "Explore Claude Code’s environments and customization",
          "href": "https://code.claude.com/docs/en/overview"
        },
        "."
      ]
    },
    {
      "type": "paragraph",
      "text": [
        "The tradeoff is setup and supervision. Your project needs to run correctly, and somebody needs to assess the changes. For a nontechnical founder, define success in observable terms—what the page displays, how the form behaves, and which existing features must keep working."
      ]
    },
    {
      "type": "heading",
      "level": 3,
      "id": "alternatives-3",
      "text": "Neither replaces acceptance checks"
    },
    {
      "type": "paragraph",
      "text": [
        "A polished response is not proof that code works. Check mobile layouts, failure states and existing behavior. Prefer a tool that makes a focused, understandable change over one that produces more code than you can maintain."
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "id": "cost",
      "text": "Pricing: compare allowances, not just monthly fees"
    },
    {
      "type": "paragraph",
      "text": [
        "Published US-dollar consumer prices checked on 23 September 2026. Tax, local checkout and future plan changes can affect your bill."
      ]
    },
    {
      "type": "pricing",
      "caption": "Subscription prices",
      "columns": [
        "Plan",
        "Price",
        "Buying implication"
      ],
      "rows": [
        [
          "ChatGPT Plus",
          "$20/month",
          "An entry point for limited Astra access in Work and Codex."
        ],
        [
          "ChatGPT Pro",
          "$100 or $200/month",
          "Compare the included allowance with your actual workload."
        ],
        [
          "Claude Pro",
          "$20/month or $200 billed annually",
          "Includes Claude Code. Annual billing is an upfront commitment."
        ],
        [
          "Claude Max",
          "From $100/month",
          "Higher usage; check the selected tier before paying."
        ]
      ]
    },
    {
      "type": "paragraph",
      "text": [
        "Price sources: ",
        {
          "text": "ChatGPT Plus",
          "href": "https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus"
        },
        ", ",
        {
          "text": "OpenAI Pro and Astra access",
          "href": "https://help.openai.com/en/articles/20001275/"
        },
        ", ",
        {
          "text": "Claude plans",
          "href": "https://claude.com/pricing"
        },
        "."
      ]
    },
    {
      "type": "heading",
      "level": 3,
      "id": "cost-1",
      "text": "Three details that change the real cost"
    },
    {
      "type": "list",
      "ordered": false,
      "items": [
        [
          {
            "text": "Subscriptions have limits.",
            "strong": true
          },
          " Astra draws on the Work/Codex allowance. Plus includes limited Astra usage; task size and settings affect consumption. ",
          {
            "text": "OpenAI usage details",
            "href": "https://help.openai.com/en/articles/20001275/"
          },
          "."
        ],
        [
          {
            "text": "Additional usage can cost extra.",
            "strong": true
          },
          " Claude Code has subscription allowances and optional paid extra usage. Its usage view tracks limits; an API-equivalent session cost is not your subscription invoice. ",
          {
            "text": "Claude Code cost guide",
            "href": "https://code.claude.com/docs/en/costs"
          },
          "."
        ],
        [
          {
            "text": "API billing is separate.",
            "strong": true
          },
          " Do not assume your chat subscription pays for calls made with a personal API key. ",
          {
            "text": "OpenAI billing",
            "href": "https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus"
          },
          "; ",
          {
            "text": "Claude Code billing",
            "href": "https://code.claude.com/docs/en/costs"
          },
          "."
        ]
      ]
    },
    {
      "type": "heading",
      "level": 3,
      "id": "cost-2",
      "text": "Measure the cost of an accepted result"
    },
    {
      "type": "paragraph",
      "text": [
        "Include subscription cost, extra usage, review and repair time. A feature has little value if you spend the afternoon fixing it."
      ]
    },
    {
      "type": "note",
      "title": "Important note",
      "text": [
        "Hypothetical example, not a benchmark: allocate a $20 subscription across four tasks, with no extra usage. At $30/hour for your time, 15 minutes of review per task makes the effective cost $12.50 each. One hour of repair per task raises it to $35."
      ]
    },
    {
      "type": "paragraph",
      "text": [
        "Start with monthly billing while evaluating. Upgrade after repeatedly completing useful work and reaching a limit. Use the ",
        {
          "text": "SaaS calculator",
          "href": "/tools/saas-calculator"
        },
        " to check your total software spend."
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "id": "test",
      "text": "Run a fair three-task trial"
    },
    {
      "type": "paragraph",
      "text": [
        "Give both tools the same starting commit, requirements and checks. Use separate branches so neither benefits from the other’s edits. Record the model, plan, date and settings."
      ]
    },
    {
      "type": "list",
      "ordered": true,
      "items": [
        [
          {
            "text": "Fix a reproducible bug.",
            "strong": true
          },
          " Supply steps and expected behavior. Check the original failure and one adjacent case."
        ],
        [
          {
            "text": "Build a small feature.",
            "strong": true
          },
          " Try an email form with validation, loading, success and failure states. Review it on mobile and with a keyboard."
        ],
        [
          {
            "text": "Revise a requirement.",
            "strong": true
          },
          " Make one change that affects several files. Look for regressions and unnecessary edits."
        ]
      ]
    },
    {
      "type": "quote",
      "text": [
        "Implement this requirement in the existing project. Explain the plan, keep the change focused, run relevant checks, and report what passed, what failed, and what needs manual review. Do not deploy it."
      ]
    },
    {
      "type": "paragraph",
      "text": [
        "Track accepted tasks, elapsed time, corrections and allowance consumed. Message counts are not comparable units of work. If both pass, choose the better fit for your budget and workflow. If neither passes, narrow the task before buying more capacity."
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "id": "verdict",
      "text": "Our verdict: choose the tool that finishes your work"
    },
    {
      "type": "paragraph",
      "text": [
        "For an existing ChatGPT subscriber, Astra in Codex is the sensible first trial. For someone seeking a terminal or IDE coding workflow, Claude Code deserves a direct evaluation. Neither recommendation is a claim of superior code quality."
      ]
    },
    {
      "type": "heading",
      "level": 3,
      "id": "verdict-1",
      "text": "Is Astra a separate subscription?"
    },
    {
      "type": "paragraph",
      "text": [
        "No. Confirm the plan and experience that provide the model you want. Work access and regular ChatGPT access are different."
      ]
    },
    {
      "type": "heading",
      "level": 3,
      "id": "verdict-2",
      "text": "Is Claude Code the same as Claude chat?"
    },
    {
      "type": "paragraph",
      "text": [
        "No. Claude Code is the development tool. Evaluate it directly rather than assuming a good chat response predicts its repository work."
      ]
    },
    {
      "type": "heading",
      "level": 3,
      "id": "verdict-3",
      "text": "Which produces better code?"
    },
    {
      "type": "paragraph",
      "text": [
        "We have not run a controlled benchmark supporting a universal winner. Your repository, selected model, instructions and acceptance checks are the useful test."
      ]
    },
    {
      "type": "heading",
      "level": 3,
      "id": "verdict-4",
      "text": "Should you pay for both?"
    },
    {
      "type": "paragraph",
      "text": [
        "Only when each consistently handles valuable work the other cannot. One useful subscription is a better starting point than overlapping plans with no defined purpose."
      ]
    },
    {
      "type": "cta",
      "title": "Build a smaller, more useful AI stack",
      "text": "Narrow your shortlist around your actual business needs.",
      "label": "Find my starting AI stack",
      "href": "/tools/stack-recommender"
    },
    {
      "type": "paragraph",
      "text": [
        "Official documentation checked on 23 September 2026. This guide separates documented facts from editorial recommendations. No measured speed advantage, personal benchmark history or guaranteed savings are claimed."
      ]
    },
    {
      "type": "sources",
      "id": "sources",
      "title": "Sources & methodology"
    }
  ]
} satisfies ArticleDocument;

