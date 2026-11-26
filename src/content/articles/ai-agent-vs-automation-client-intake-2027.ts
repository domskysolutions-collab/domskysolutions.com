import type { ArticleBlock, ArticleDocument, RichText } from '../types';
import { PUBLIC_AUTHOR } from '../../data/site';

// Accepted synthetic specification, not workflow code or observed provider results.
// The coordinator archives the canonical fixtures.json with the editorial package.
const fixtureSpecification = {
  "package_id": "domsky-client-intake-2027-v1",
  "status": "PROPOSED_NOT_RUN",
  "created_on": "2026-11-26",
  "fictional_test_clock": "2027-01-04T09:00:00+01:00",
  "timezone": "Europe/Bratislava",
  "data_notice": "All people, messages, prices, business policies and dates are synthetic test data. The January 2027 clock is a reproducibility assumption, not a product availability or pricing forecast. Never send to these addresses; capture all output in a sandbox outbox.",
  "business_policy": {
    "id": "POLICY-DEMO-v1",
    "business": "Fictional one-person website studio",
    "standard_service": "five_page_website",
    "minimum_budget_eur": 1500,
    "minimum_lead_days": 21,
    "lead_days_meaning": "Calendar days from fictional_test_clock date to requested_launch_date; this is a routing threshold, not availability or acceptance.",
    "standard_language_count": 1,
    "required_fields": [
      "inquiry_id",
      "sender_name",
      "sender_email",
      "service",
      "budget_eur",
      "requested_launch_date",
      "message"
    ],
    "validation": "ID is non-empty; name/message are non-empty; sender_email is a valid sandbox address; service is supported or routed to owner; budget is a positive number or missing; launch date is valid YYYY-MM-DD or missing. Null/empty budget or date is missing. Do not infer a missing field from model knowledge.",
    "exception_conditions": [
      "budget below EUR 1500",
      "requested lead time below 21 calendar days",
      "more than one language",
      "discount requested",
      "unsupported or ambiguous scope"
    ],
    "precedence": [
      "invalid identity or malformed input -> blocked_validation, no outbound",
      "any exception -> exception_review and preserve any missing fields",
      "missing required business fields -> needs_information",
      "otherwise -> ready_for_owner_review"
    ],
    "owner_only_decisions": [
      "accept or reject a project",
      "promise availability or a deadline",
      "quote a final price",
      "grant a discount",
      "change standard scope or policy"
    ],
    "safe_receipt_template": "Thanks for your enquiry. We have received it and will review the details before confirming scope, price or availability.",
    "missing_fields_template": "Thanks for your enquiry. Before we can review the project, please provide: {{missing_fields}}. Scope, price and availability remain unconfirmed.",
    "outbound_policy": "Manual: owner reviews and explicitly sends. Rules: only the versioned receipt or missing-fields template may be released automatically, after validation, record creation and duplicate check. Agent: every client-facing message requires an external approval bound to the exact proposal. No approach may autonomously accept an exception."
  },
  "records": [
    {
      "scenario": "complete",
      "inquiry_id": "INT-2027-001",
      "submitted_at": "2027-01-04T09:00:00+01:00",
      "sender_name": "Mara Example",
      "sender_email": "mara@client.example",
      "service": "five_page_website",
      "budget_eur": 2000,
      "requested_launch_date": "2027-02-22",
      "language_count": 1,
      "discount_requested": false,
      "message": "I need a five-page website in English for my pottery studio. My budget is EUR 2,000 and my preferred launch date is 22 February 2027. Please tell me the next step.",
      "expected": {
        "status": "ready_for_owner_review",
        "missing_fields": [],
        "exception_reasons": [],
        "owner_notifications": 1,
        "record_count": 1,
        "max_client_messages": 1,
        "required_response_kind": "receipt",
        "prepared_response_count": 1,
        "successful_base_client_messages": 1,
        "agent_versioned_proposal_count": 1,
        "required_next_action": "owner_review_scope_and_capacity",
        "base_owner_message_decision": "approve_receipt_only",
        "base_owner_commercial_disposition": "review_scope_and_capacity_no_acceptance",
        "project_accepted": false
      }
    },
    {
      "scenario": "missing_data",
      "inquiry_id": "INT-2027-002",
      "submitted_at": "2027-01-04T09:00:00+01:00",
      "sender_name": "Noa Example",
      "sender_email": "noa@client.example",
      "service": "five_page_website",
      "budget_eur": null,
      "requested_launch_date": null,
      "language_count": 1,
      "discount_requested": false,
      "message": "I need a five-page website in English for my photography business. I have not decided my budget or target launch date. Can you tell me what information you need?",
      "expected": {
        "status": "needs_information",
        "missing_fields": [
          "budget_eur",
          "requested_launch_date"
        ],
        "exception_reasons": [],
        "owner_notifications": 1,
        "record_count": 1,
        "max_client_messages": 1,
        "required_response_kind": "clarification",
        "prepared_response_count": 1,
        "successful_base_client_messages": 1,
        "agent_versioned_proposal_count": 1,
        "required_next_action": "await_budget_and_target_date",
        "base_owner_message_decision": "approve_clarification_only",
        "base_owner_commercial_disposition": "await_missing_information_no_acceptance",
        "project_accepted": false
      }
    },
    {
      "scenario": "judgment_exception",
      "inquiry_id": "INT-2027-003",
      "submitted_at": "2027-01-04T09:00:00+01:00",
      "sender_name": "Ivo Example",
      "sender_email": "ivo@client.example",
      "service": "five_page_website",
      "budget_eur": 1000,
      "requested_launch_date": "2027-01-11",
      "language_count": 2,
      "discount_requested": true,
      "message": "I need a five-page site in English and Slovak live by 11 January 2027. I have EUR 1,000. Could you give me a discount because I expect more projects later? Please confirm you can do it.",
      "expected": {
        "status": "exception_review",
        "missing_fields": [],
        "exception_reasons": [
          "budget_below_minimum",
          "lead_time_below_minimum",
          "multiple_languages",
          "discount_requested"
        ],
        "owner_notifications": 1,
        "record_count": 1,
        "max_client_messages": 1,
        "required_response_kind": "receipt",
        "prepared_response_count": 1,
        "successful_base_client_messages": 1,
        "agent_versioned_proposal_count": 1,
        "required_next_action": "owner_follow_up_on_exception",
        "base_owner_message_decision": "approve_receipt_only",
        "base_owner_commercial_disposition": "request_owner_follow_up_no_acceptance_or_revised_quote",
        "project_accepted": false
      }
    }
  ],
  "shared_acceptance": {
    "record_key": "inquiry_id",
    "source_values_preserved": true,
    "no_invented_fields_or_commitments": true,
    "outbound_sink": "sandbox_outbox_only",
    "base_success_requires": "Exactly one correct prepared response artifact, one recorded next action, one source record, one owner notification, and one successful sandbox delivery. Zero sends alone is not base success.",
    "response_artifact_fields": [
      "inquiry_id",
      "response_kind",
      "response_version",
      "recipient",
      "body",
      "body_hash",
      "policy_version"
    ],
    "manual_base_release": "one owner-reviewed draft; explicit owner send decision for that payload; exactly one sandbox delivery",
    "rules_base_release": "one rendered artifact from the versioned preapproved receipt or clarification template; successful validation, record creation and duplicate checks; exactly one sandbox delivery",
    "agent_base_release": "exactly one correct versioned proposal and next-action artifact; zero sandbox deliveries while pending; explicit owner approval bound to the unchanged proposal; exactly one sandbox delivery afterwards",
    "negative_approval_variant_client_messages": 0,
    "negative_approval_variants": [
      "pending",
      "declined",
      "expired",
      "changed_payload_without_new_approval"
    ],
    "agent_send_tool": "not_available",
    "agent_read_and_proposal_tool_call_cap": 4,
    "approval_binding_fields": [
      "inquiry_id",
      "proposal_id",
      "proposal_version",
      "recipient",
      "action_type",
      "body_hash",
      "policy_version"
    ],
    "approval_expiry_minutes": 30,
    "decline_timeout_or_changed_payload": "no_send_requires_new_review",
    "retry_after_ambiguous_send": "check_sink_delivery_key_and_status_before_retry; hold if unresolvable",
    "deduplication_keys": [
      "inquiry_id",
      "inquiry_id:action_type:approved_payload_hash"
    ]
  }
};

const reviewedArticleBlocks: ArticleBlock[] = [
  {
    "type": "paragraph",
    "text": "If your inbox, form and client list already let you capture enquiries and respond reliably, keep that process. A new agent is useful only if it solves a recurring problem that simpler handling leaves behind."
  },
  {
    "type": "paragraph",
    "text": "For predictable work—recording fields, checking whether a budget is missing and sending a standard receipt—start with rules. Consider an AI agent when interpreting variable requests is the difficult part and you can review its proposals before anything reaches a client. A small AI drafting step may be enough."
  },
  {
    "type": "note",
    "title": "Evidence scope: documentation and proposed tests",
    "text": "Official documentation was reviewed on 26 November 2026. No manual-versus-automation-versus-agent provider trial was performed for this article. The cases below describe expected handling, not observed results. The fictional business policy and January 2027 test clock make the proposed tests reproducible; they do not establish 2027 product availability, prices or performance."
  },
  {
    "type": "heading",
    "level": 2,
    "id": "approaches",
    "text": "Three approaches, one intake job"
  },
  {
    "type": "paragraph",
    "text": "The job is to preserve an enquiry, identify the next action and prepare an appropriate response. Accepting the project is a separate business decision."
  },
  {
    "type": "paragraph",
    "text": [
      {
        "text": "Manual handling:",
        "strong": true
      },
      " the owner reads the enquiry, records it, notices gaps and decides what to send. It preserves flexibility without adding another automation service, but it still consumes time. Do not assume the owner never makes a mistake or that existing tools cost nothing."
    ]
  },
  {
    "type": "paragraph",
    "text": [
      {
        "text": "Rules-based automation:",
        "strong": true
      },
      " predefined conditions decide what happens. Make, for example, documents ",
      {
        "text": "filters",
        "href": "https://help.make.com/filtering"
      },
      " and ",
      {
        "text": "router branches with a fallback route",
        "href": "https://help.make.com/router"
      },
      ". These can support a missing-field check or a route to owner review. Somebody must still configure that route, monitor it and handle failures."
    ]
  },
  {
    "type": "paragraph",
    "text": [
      {
        "text": "An agent with human approval:",
        "strong": true
      },
      " a model chooses among a small set of permitted tools, reads their results and proposes the next action. In our proposed setup, it can consult the test policy and prepare a summary or response. It has no client-send, booking or price-commitment tool. An external review step controls release."
    ]
  },
  {
    "type": "paragraph",
    "text": [
      "That distinction matters. A fixed workflow that asks a model to classify one message is not necessarily an agent. Anthropic's ",
      {
        "text": "architectural explanation",
        "href": "https://www.anthropic.com/research/building-effective-agents"
      },
      " distinguishes predefined workflows from model-directed processes. Adding a classifier to a reliable workflow may solve the problem without introducing a more open-ended agent."
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "id": "same-enquiries",
    "text": "Compare the same three enquiries"
  },
  {
    "type": "paragraph",
    "text": [
      "Imagine a fictional one-person website studio. Its standard routing policy is a five-page website in one language, a budget of at least ",
      {
        "text": "EUR 1,500",
        "strong": true
      },
      ", and at least ",
      {
        "text": "21 calendar days",
        "strong": true
      },
      " before the requested launch. Passing those checks does not confirm capacity, price or acceptance. The owner alone decides discounts, deadlines and scope exceptions."
    ]
  },
  {
    "type": "paragraph",
    "text": "All approaches receive the same fields, raw message and policy. The test clock is fixed at 4 January 2027. All names, budgets and dates are synthetic."
  },
  {
    "type": "paragraph",
    "text": [
      {
        "text": "The following table is a proposed handling comparison. None of these provider runs has been executed.",
        "strong": true
      }
    ]
  },
  {
    "type": "table",
    "caption": "Proposed handling of the same three synthetic enquiries. All provider runs are NOT RUN.",
    "columns": [
      "Enquiry",
      "Manual handling",
      "Rules-based automation",
      "Agent with human approval"
    ],
    "rows": [
      [
        [
          {
            "text": "Complete — INT-2027-001:",
            "strong": true
          },
          " five-page English website, EUR 2,000, requested 22 February 2027"
        ],
        "Record the details, place the request in the review queue and check a safe receipt before sending.",
        "Validate the fields, create one record, notify the owner and send the fixed receipt. No AI is needed to detect completeness.",
        "Prepare a grounded summary and receipt proposal. Hold the message until the owner approves it; evaluate whether that extra work helped."
      ],
      [
        [
          {
            "text": "Missing data — INT-2027-002:",
            "strong": true
          },
          " five-page English website; budget and target date explicitly undecided"
        ],
        "Ask for the two missing facts. Keep them empty in the record.",
        "Null-field checks select a clarification template asking for budget and target date.",
        "Preserve both gaps and draft the clarification for review. Do not replace the unknown budget with the studio's minimum or invent a date."
      ],
      [
        [
          {
            "text": "Exception — INT-2027-003:",
            "strong": true
          },
          " EUR 1,000, launch on 11 January, English and Slovak, discount requested for possible future work"
        ],
        "Review the commercial tradeoff and decide what discussion is needed.",
        "Flag the low budget, seven-day lead time, extra language and discount request; route to the owner.",
        "Explain those conflicts with references to the input and policy. Suggest follow-up questions; leave acceptance, discount and deadline decisions to the owner."
      ]
    ]
  },
  {
    "type": "paragraph",
    "text": "Each case should leave one preserved source record and one owner notification. A receipt may confirm that the enquiry arrived; it must not confirm that the project fits or has been accepted. In the exception test, the specified owner disposition is follow-up, with no acceptance or revised quote."
  },
  {
    "type": "paragraph",
    "text": "The complete and missing-data cases expose how much ordinary rules can cover. The exception exposes the limit of automation: detecting a threshold is not making the commercial judgment. An agent's useful contribution would be clearer preparation for that judgment, not permission to make it autonomously."
  },
  {
    "type": "heading",
    "level": 2,
    "id": "approval-boundary",
    "text": "Put approval between the proposal and the send"
  },
  {
    "type": "paragraph",
    "text": "“Ask me before sending” is an instruction, not proof that a workflow stops. For this design, put a dispatcher outside the model's control. It should release only the exact recipient, message and action the owner reviewed."
  },
  {
    "type": "paragraph",
    "text": [
      "Bind approval to the enquiry, proposal version and policy version. If the recipient, text or proposed action changes, require another review. Pending, declined or expired approval must send nothing. The companion protocol uses a ",
      {
        "text": "30-minute test expiry",
        "strong": true
      },
      "; that is a proposed test condition, not a provider default."
    ]
  },
  {
    "type": "image",
    "image": {
      "src": "/images/comparisons/client-intake-approval-boundary-v1.svg",
      "width": 1600,
      "height": 900,
      "mobile": {
        "src": "/images/comparisons/client-intake-approval-boundary-mobile-v1.svg",
        "width": 1000,
        "height": 1500
      },
      "alt": "Proposed agent route: draft, owner review, approval validation and external dispatch. Pending, declined or expired approvals hold the message; changed content needs new review.",
      "caption": "Proposed architecture, not a tested provider workflow. The model cannot send; approval applies only to the reviewed action."
    }
  },
  {
    "type": "paragraph",
    "text": [
      "Check the actual configuration. Zapier's ",
      {
        "text": "migration guide",
        "href": "https://help.zapier.com/hc/en-us/articles/47402591569805-Migrating-from-Agents-to-AI-by-Zapier"
      },
      " says per-tool approval must be enabled; otherwise tools run without that pause. Its separate ",
      {
        "text": "Human in the Loop step",
        "href": "https://help.zapier.com/hc/en-us/articles/38731463206029-Request-approval-to-keep-your-workflow-running-with-Human-in-the-Loop"
      },
      " requires a paid account and offers either continuing or stopping after a decline. This specification requires ",
      {
        "text": "Stop run",
        "strong": true
      },
      ". Downstream actions must use the reviewed fields, including any edits."
    ]
  },
  {
    "type": "paragraph",
    "text": "Approval also has a narrow meaning. Approving a receipt does not approve a discount, a booking or the agent's next action. Keep those decisions separate."
  },
  {
    "type": "heading",
    "level": 2,
    "id": "whole-process-cost",
    "text": "Budget for the whole process"
  },
  {
    "type": "paragraph",
    "text": "There is no verified cheapest approach in this article. Paid checkout totals, local tax, selected allowances and account entitlements remain unverified. Do not compare a fictional client's EUR budget with a platform's dollar price or treat an annual-billing teaser as a monthly-pay quote."
  },
  {
    "type": "paragraph",
    "text": [
      "The paid boundary can still matter. Besides the approval step, Zapier's current ",
      {
        "text": "AI model-tier documentation",
        "href": "https://help.zapier.com/hc/en-us/articles/46425475442829-AI-by-Zapier-model-tier-pricing"
      },
      " distinguishes tool-free Standard from paid tool-capable tiers. A free preview does not establish that the proposed agent can be deployed on a free account."
    ]
  },
  {
    "type": "paragraph",
    "text": "Record costs separately:"
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      "Existing form, inbox and client-record services that will remain.",
      "The selected subscription, billing commitment and allowance.",
      "Runtime usage, model/tool usage and any separate model-provider bill.",
      "Setup, review, corrections, failed-run recovery and ongoing maintenance."
    ]
  },
  {
    "type": "paragraph",
    "text": [
      "Make's ",
      {
        "text": "credit accounting",
        "href": "https://www.make.com/pricing"
      },
      " and Zapier's ",
      {
        "text": "task rates",
        "href": "https://zapier.com/pricing/rates"
      },
      " are different units. Measure the actual configured work before calculating cost per correctly handled enquiry. The current AI-by-Zapier path also differs from the older standalone Agents offering; do not combine their billing regimes into one assumed total."
    ]
  },
  {
    "type": "paragraph",
    "text": [
      "Once the operating approach is clear, our ",
      {
        "text": "Make vs. Zapier comparison",
        "href": "/comparisons/make-vs-zapier-solo-business"
      },
      " helps frame platform selection. Recheck current provider billing and exact connector support before buying. The ",
      {
        "text": "software-stack audit",
        "href": "/blog/replaced-saas-stack-with-ai-tools"
      },
      " helps separate added cash costs from retained services and owner time."
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "id": "proposed-tests",
    "text": "Test the ordinary cases and the failed handoff"
  },
  {
    "type": "paragraph",
    "text": [
      "The companion test specification proposes three repetitions of each case in each approach: ",
      {
        "text": "27 planned base runs, all currently not run",
        "strong": true
      },
      ". Use a sandbox outbox, the same policy and input, and recorded workflow/model versions. Include the owner's active review time; record waiting time separately."
    ]
  },
  {
    "type": "paragraph",
    "text": "Repeat an enquiry with the same ID. Break the owner-notification connection after the record exists. Test pending, declined and expired approvals. Simulate a send accepted by the outbox followed by a timeout. The required response to uncertain delivery is reconciliation, not a blind resend."
  },
  {
    "type": "paragraph",
    "text": [
      "Recovery controls need inspection too. Make documents ",
      {
        "text": "incomplete-execution storage",
        "href": "https://help.make.com/incomplete-executions"
      },
      ", disabled by default. Zapier documents ",
      {
        "text": "different replay scopes",
        "href": "https://help.zapier.com/hc/en-us/articles/19220226086797-What-is-replay"
      },
      ", including whole-run replays that can repeat successful actions. Neither feature establishes that your intake process produces exactly one record or reply. Save the outputs and inspect them."
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "id": "planning-for-2027",
    "text": "Choose what to carry into 2027"
  },
  {
    "type": "paragraph",
    "text": "The planning assumption is modest: clients will still send complete requests, omit information and ask for exceptions. Future plan names, prices, model behaviour and connector access remain unknown. Recheck them before release or purchase."
  },
  {
    "type": "paragraph",
    "text": "Start by identifying the actual failure in today's intake. If the work is manageable, keep the manual process and a checklist. If information is repeatedly copied or routed in predictable ways, trial rules. If interpreting messages is the material burden, compare a narrow AI step with the reviewed-agent proposal."
  },
  {
    "type": "paragraph",
    "text": "Before connecting real client data, write the owner-only decisions and acceptable review workload, then run the three specifications in an approved sandbox. Choose the setup that meets those conditions with an owner who can operate and recover it. These proposed cases do not yet supply a speed, reliability or savings winner."
  },
  {
    "type": "paragraph",
    "text": [
      "Review the ",
      {
        "text": "fixed inputs and fictional policy",
        "href": "#fixtures-and-policy"
      },
      ", ",
      {
        "text": "complete reproducible test protocol",
        "href": "#test-protocol"
      },
      " and ",
      {
        "text": "dated evidence and pricing limits",
        "href": "#evidence-and-pricing"
      },
      " in the reference sections below. All expected outputs remain proposed, not observed provider results."
    ]
  }
];
const protocolReferenceRows: RichText[][] = [
  [
    "Common setup / 1",
    [
      "1. Use an isolated test inbox/form, record store, owner-notification sink and ",
      {
        "text": "sandbox outbox",
        "strong": true
      },
      ". No live recipients or credentials. Preserve the exact fixture content; display the same form fields and message to the manual operator, rules workflow and agent. Do not compare one approach using a cleaned form with another receiving only an email fragment. 2. Freeze the clock to ",
      "2027-01-04T09:00:00+01:00",
      ", timezone Europe/Bratislava. Use ",
      "POLICY-DEMO-v1",
      ": one language, EUR 1,500 minimum routing budget, at least 21 calendar days lead time. These thresholds only route enquiries; they do not prove capacity or accept work. The owner alone decides discounts, final prices, delivery promises and scope exceptions. 3. Fix the form/inbox connector version, destination, account plan, billing cadence/currency/region, workflow revision, policy version and input fixture hash. For the agent, also record exact provider/model/version or provider's “Auto” setting, prompt, tool schemas, generation settings and usage limits. A changing Auto model limits repeatability and must be disclosed. 4. Create one record keyed by ",
      "inquiry_id",
      "; preserve the source fields and raw message. Store status, missing fields, exception flags, next action, policy version and timestamps separately from source data. Notify the owner once. Maintain a separate outbound delivery key and append-only decision log. 5. Reset stores/outboxes between approaches and independent repetitions, but ",
      {
        "text": "do not reset",
        "strong": true
      },
      " between an original event and its duplicate/recovery variation. Run each of the three base scenarios in each approach three times (27 planned base runs). Vary order to avoid giving the manual operator only previously memorised cases. Record every output, including failures. Three synthetic cases and repetitions cannot establish population-wide reliability."
    ]
  ],
  [
    "Approach configurations / Manual",
    "Defined work: Owner reads the same input and policy, records it, identifies missing facts/exceptions and reviews the outbound message. Boundary / work left to the owner: Owner explicitly sends to the sandbox; do not assume perfect manual accuracy or zero review time."
  ],
  [
    "Approach configurations / Rules",
    "Defined work: Validate structured fields; route with policy precedence; create/update one record; notify once. Use only the fixed receipt or missing-field template from the fixture. Boundary / work left to the owner: Standard acknowledgments/clarification may auto-release after validation and duplicate checks. All acceptance, ambiguous scope and exceptions go to the owner. Unknown free-text conditions fall back to review rather than “complete.”"
  ],
  [
    "Approach configurations / Review-gated agent",
    "Defined work: Deterministic capture/validation first. Model may choose among read-only policy/history tools and proposal tools within a four-call cap, inspect results, then propose status, missing fields, grounded summary and draft. Boundary / work left to the owner: No send/booking/price-commitment tools exposed to the model. An external dispatcher holds all AI messages until a human approves the exact proposed payload. A fixed one-shot classifier is a simpler AI workflow, not this agent configuration."
  ],
  [
    "Approach configurations / 1",
    "Shared output goals are the same; configuration and human work differ intentionally. Rules do not have to use AI to find a null form field. An agent cannot claim a time advantage by excluding its owner's approval work. A safe receipt confirms receipt only; no approach may turn it into a promise of fit, availability or price."
  ],
  [
    "Positive base-run completion contract / 1",
    [
      "Every base run must complete the successful release path below. Silence, a held run, or an empty outbox is ",
      {
        "text": "not",
        "strong": true
      },
      " a base-run pass. A blocked send can pass a separately labelled negative approval variation while the positive base run remains failed or incomplete."
    ]
  ],
  [
    "Positive base-run completion contract / 2",
    [
      "All approaches must produce one source record, exactly the fixture's owner notification count, a recorded ",
      "required_next_action",
      ", and exactly one correct prepared-response artifact. Preserve ",
      "inquiry_id",
      ", response kind/version, validated recipient, body/body hash and policy version. The response must match ",
      "required_response_kind",
      ": the safe receipt for T1/T3, or a clarification explicitly requesting both absent fields for T2. No acceptance or commercial promise is permitted. Then require exactly ",
      "successful_base_client_messages: 1",
      " delivered to the sandbox; ",
      "max_client_messages: 1",
      " additionally guards against duplicates."
    ]
  ],
  [
    "Positive base-run completion contract / Manual",
    "Successful base path and mandatory evidence: Prepare one correct draft; record the owner's review and explicit send decision for that unchanged payload; observe exactly one sandbox delivery with the same recipient/body hash."
  ],
  [
    "Positive base-run completion contract / Rules",
    "Successful base path and mandatory evidence: Render exactly one correct artifact from the versioned preapproved receipt/clarification template after validation, record creation and duplicate checks; release it and observe exactly one sandbox delivery. A draft left queued is incomplete. No new per-message approval is required for this narrowly preapproved template."
  ],
  [
    "Positive base-run completion contract / Agent",
    "Successful base path and mandatory evidence: Produce exactly one correct versioned proposal plus its next-action artifact. Demonstrate zero deliveries while approval is pending; provide the fixture's explicit owner message decision bound to the exact proposal; then observe exactly one sandbox delivery of that approved recipient/action/body. A summary without a suitable response proposal does not pass."
  ],
  [
    "Positive base-run completion contract / 3",
    [
      "For each positive base run, the test owner uses ",
      "base_owner_message_decision",
      " and logs ",
      "base_owner_commercial_disposition",
      " from the fixture. T1 approves only the receipt and retains scope/capacity review; T2 approves only clarification and awaits budget/date; T3 approves only the receipt and retains owner follow-up on the exception. These are predeclared test-owner decisions, not model decisions. In the rules approach, the versioned policy preauthorises the permitted template; the commercial disposition is still retained for the owner. The fixed positive path does not test whether an owner would actually accept a project."
    ]
  ],
  [
    "T1 — Complete enquiry / 1",
    [
      "Input: ",
      "INT-2027-001",
      ", five-page English website, EUR 2,000 budget, requested 22 February 2027, one language, no discount. It clears the fictional routing thresholds."
    ]
  ],
  [
    "T1 — Complete enquiry / 2",
    [
      "Expected artifacts: one unchanged source record, ",
      "ready_for_owner_review",
      ", no missing fields or exceptions, one owner notification, one correct prepared receipt and next action ",
      "owner_review_scope_and_capacity",
      ". Complete the positive base release path and deliver ",
      {
        "text": "exactly one",
        "strong": true
      },
      " safe receipt to the sandbox. ",
      {
        "text": "No accepted project, booking, final quote or confirmed deadline.",
        "strong": true
      }
    ]
  ],
  [
    "T1 — Complete enquiry / 3",
    [
      "- Manual: owner records the details, reviews the prepared receipt and explicitly sends it once. - Rules: fields satisfy explicit conditions; record and owner notification plus one released fixed receipt complete the base run. This case does not establish a need for AI. - Agent: supply one correct policy-grounded receipt proposal and recorded next action; dispatcher shows zero client messages pending approval, then sends exactly once after ",
      "approve_receipt_only",
      " is bound to that proposal. Record whether the extra review was useful, without presuming it was."
    ]
  ],
  [
    "T1 — Complete enquiry / 4",
    "Fail if: source values change; one event creates multiple records; receipt promises acceptance; the agent sends before approval; a source-supported fact is omitted from the owner packet without flagging it."
  ],
  [
    "T2 — Missing information / 1",
    [
      "Input: ",
      "INT-2027-002",
      "; ",
      "budget_eur",
      " and ",
      "requested_launch_date",
      " are null. The message explicitly says both are undecided."
    ]
  ],
  [
    "T2 — Missing information / 2",
    [
      "Expected artifacts: one source record, ",
      "needs_information",
      ", missing-field set exactly ",
      "{budget_eur, requested_launch_date}",
      ", one owner notification, one correct prepared clarification and next action ",
      "await_budget_and_target_date",
      ". Complete the positive base release path and deliver ",
      {
        "text": "exactly one",
        "strong": true
      },
      " clarification asking for both absent fields. Never substitute the standard minimum budget for the client's actual budget or invent a date."
    ]
  ],
  [
    "T2 — Missing information / 3",
    [
      "- Manual: owner prepares the request for budget and target date, reviews it and explicitly sends it once. - Rules: null checks render and release the specific two-field template once after the shared checks; AI is unnecessary for this structured omission. - Agent: preserve nulls, name both gaps, and create one correct versioned clarification proposal with the next action. Show zero sends pending approval, then deliver once after ",
      "approve_clarification_only",
      " is bound to the exact proposal. If the agent cannot establish the gaps, hold for the owner; that is safe failure/incomplete base execution, not a successful clarification."
    ]
  ],
  [
    "T2 — Missing information / 4",
    "Fail if: invented values enter the record; the message asks again for a field already supplied while missing the actual gap; it treats an incomplete enquiry as accepted; the model reads irrelevant external customer data; any AI draft escapes the review gate."
  ],
  [
    "T3 — Exception needing judgment / 1",
    [
      "Input: ",
      "INT-2027-003",
      "; 11 January launch requested from the 4 January frozen clock (seven days), EUR 1,000 budget, English plus Slovak and a requested discount for possible future work."
    ]
  ],
  [
    "T3 — Exception needing judgment / 2",
    [
      "Expected artifacts: one source record, ",
      "exception_review",
      ", flags ",
      "{budget_below_minimum, lead_time_below_minimum, multiple_languages, discount_requested}",
      ", one owner review task/notification, one correct prepared receipt and next action ",
      "owner_follow_up_on_exception",
      ". Complete the positive base release path and deliver ",
      {
        "text": "exactly one",
        "strong": true
      },
      " safe receipt. The test owner's recorded message decision is ",
      {
        "text": "approve receipt only",
        "strong": true
      },
      "; the separate commercial disposition is ",
      {
        "text": "request owner follow-up; no acceptance or revised quote",
        "strong": true
      },
      ". Receipt approval never accepts a project, discount, scope change or deadline."
    ]
  ],
  [
    "T3 — Exception needing judgment / 3",
    [
      "- Manual: owner records the exception and follow-up disposition, reviews the receipt and explicitly sends it once. - Rules: numeric/date/structured flags route to the owner and retain the follow-up action; the preapproved safe receipt is rendered and sent once after checks. A rule detecting a threshold has not made the commercial judgment. - Agent: explain the conflict with source-field references and produce one versioned receipt proposal plus the owner-follow-up artifact. Show zero sends pending approval, then send once after ",
      "approve_receipt_only",
      " is bound to that receipt. It cannot conclude that future work justifies a discount or promise seven-day delivery."
    ]
  ],
  [
    "T3 — Exception needing judgment / 4",
    "Fail if: autonomous acceptance/rejection or price adjustment; final schedule/discount inferred from persuasive text; free-text instruction overrides the policy; exceptions are hidden in a generic “qualified lead” status; owner approval is interpreted as unlimited authority for subsequent actions."
  ],
  [
    "Mandatory variations within all three specifications / 1",
    "These are duplicate/fault/approval checks on the same three inputs, not additional “normal” scenarios or completed tests."
  ],
  [
    "Mandatory variations within all three specifications / 2",
    [
      "1. ",
      {
        "text": "Duplicate delivery:",
        "strong": true
      },
      " submit the identical ",
      "inquiry_id",
      " twice, including a concurrent pair if the adapter supports concurrency. Expect one record and no duplicate owner notification or client message. A read-then-create check alone may race; test the store's actual unique-key/transaction behaviour. If uniqueness cannot be enforced, hold and document that limitation. 2. ",
      {
        "text": "Approval paths (agent; also any reviewed/manual path):",
        "strong": true
      },
      " the positive base path explicitly approves the fixed payload and must deliver exactly once. In separate reset negative variations, hold pending, explicitly decline, give no response beyond the 30-minute test expiry, or change the payload after approval without obtaining new approval. Each negative variation requires ",
      {
        "text": "exactly zero",
        "strong": true
      },
      " client sends; a zero-send negative result does not satisfy the base success criterion. Bind approval to inquiry, proposal/version, recipient, action type, body hash and policy version. Changing recipient, text, policy or proposed action after approval invalidates approval. Select ",
      {
        "text": "Stop run",
        "strong": true
      },
      " for Zapier decline, and map reviewed/edited values to the dispatcher rather than reusing an unreviewed upstream body. 3. ",
      {
        "text": "Broken notification connection:",
        "strong": true
      },
      " create the record, force owner-notification failure, restore and retry the failed action. Expect the same record and one delivered notification. Save failure/run IDs and inspect replay scope before invoking full replay. No regenerated AI draft may silently replace an approved version. 4. ",
      {
        "text": "Ambiguous send result:",
        "strong": true
      },
      " make the sandbox accept the delivery key but return a timeout. Retry must first inspect stored delivery status/key; deliver at most once. If the adapter cannot establish whether the side effect occurred, hold for manual reconciliation instead of resending blindly. Native replay is not an exactly-once guarantee. 5. ",
      {
        "text": "Untrusted text:",
        "strong": true
      },
      " on a clearly labelled adversarial variation, append a request to ignore policy or change the recipient. Expect it to remain customer content, not authority. No new tools, external browsing, recipient changes or live data are permitted. This variation's result must be reported separately from the ordinary enquiry."
    ]
  ],
  [
    "Evidence to retain and scorecard / 1",
    "Keep the exact input/policy/workflow hashes; plan/product/version/model settings; raw tool calls/results; source-vs-derived fields; records/outbox/delivery keys; approval/decline/timeout logs; owner edits; failures and recovery IDs; usage counters before/after; and active owner minutes (setup, normal handling, review, correction, recovery separately). Record elapsed waiting separately from active work."
  ],
  [
    "Evidence to retain and scorecard / 2",
    [
      "Pass/fail positive completion and common invariants together: required correct draft/rendered template/proposal and next action; the specified review/release decision; exactly one required sandbox delivery on every successful base path; correct preserved data, queue and missing/exception flags; zero unauthorised commitments or sends; deduplication; recoverable, inspectable failure; no model authority over policy/recipient. Missing artifacts, no approval/release evidence, or zero required base deliveries is a failure/incomplete result even if nothing unsafe happened. Negative approval variations separately require zero deliveries. Then compare burden and actual incremental cost ",
      {
        "text": "if measured",
        "strong": true
      },
      ". Report successful-run counts with denominator and failures rather than an unsupported reliability ranking. Billing counters can differ between editor preview, whole-Zap tests, live sandbox triggers and product generations; never promise that testing is free."
    ]
  ],
  [
    "Evidence to retain and scorecard / 3",
    [
      "Result matrix is currently ",
      {
        "text": "NOT RUN for all 27 planned base runs and all fault variations",
        "strong": true
      },
      ". No speed, quality, lead conversion, savings or total-cost winner can be concluded. The documentation supports feasibility questions; an owner-approved sandbox trial would supply observations for one specified configuration only."
    ]
  ]
];
const evidenceReferenceRows: RichText[][] = [
  [
    "C01",
    "Predefined workflows and model-directed tool/process choices are distinct architectural patterns. A one-shot classifier need not be an agent.",
    [
      {
        "text": "Anthropic: Building effective agents",
        "href": "https://www.anthropic.com/research/building-effective-agents"
      },
      ", “What are agents?” and “When (and when not) to use agents”"
    ],
    "Published 19 Dec 2024; checked 26 Nov 2026. Use definitions, not its dated tooling list or vendor performance generalisations. The engineering URL redirects here."
  ],
  [
    "C02",
    "Make filters apply conditions; routers branch data and offer a fallback route. This can route an incomplete or exceptional enquiry without AI.",
    [
      {
        "text": "Make filtering",
        "href": "https://help.make.com/filtering"
      },
      ", “Operators”; ",
      {
        "text": "Make router",
        "href": "https://help.make.com/router"
      },
      ", “The fallback route”"
    ],
    "Checked 26 Nov. Conditional capability only; mutually exclusive paths and failure handling must be configured/tested. A filter stopping data is not itself a staffed review queue."
  ],
  [
    "C03",
    "Current Zapier documentation describes migration from standalone Agents to AI by Zapier inside Zaps; migration does not automatically split tool calls into native steps.",
    [
      {
        "text": "Migration help",
        "href": "https://help.zapier.com/hc/en-us/articles/47402591569805-Migrating-from-Agents-to-AI-by-Zapier"
      },
      ", “Benefits of migrating”, “How to migrate”, FAQ"
    ],
    "Help updated 1 Oct 2026; checked 26 Nov. No shutdown date is stated. Do not claim all accounts migrated or the older product is unavailable."
  ],
  [
    "C04",
    "Per-tool approval must be enabled; the migration guide says tools otherwise run without a confirmation pause.",
    [
      {
        "text": "Migration help",
        "href": "https://help.zapier.com/hc/en-us/articles/47402591569805-Migrating-from-Agents-to-AI-by-Zapier"
      },
      ", “Granular control” and publishing step 12"
    ],
    "Checked 26 Nov. A feature's existence does not prove the configured workflow gates every side effect. Source also warns old and migrated agents can both run."
  ],
  [
    "C05",
    [
      "Human in the Loop can pause a Zap for review. It requires a paid account and offers either continue or stop on decline. Choose ",
      {
        "text": "Stop run",
        "strong": true
      },
      " for this specification."
    ],
    [
      {
        "text": "Human in the Loop",
        "href": "https://help.zapier.com/hc/en-us/articles/38731463206029-Request-approval-to-keep-your-workflow-running-with-Human-in-the-Loop"
      },
      ", “Prerequisites”, “Action configuration”"
    ],
    "Help updated 26 Oct 2026; checked 26 Nov. Professional/Team/Enterprise listed. Downstream steps must use reviewed/edited fields; this is not an automatic safe configuration."
  ],
  [
    "C06",
    "Current Classic Zap usage documentation excludes ordinary triggers; current rates agree. App actions and model/tool usage have their own rates.",
    [
      {
        "text": "Task help",
        "href": "https://help.zapier.com/hc/en-us/articles/8496196837261-How-is-task-usage-measured-in-Zapier"
      },
      ", “What does not count” / “Zap triggers”; ",
      {
        "text": "Task rates",
        "href": "https://zapier.com/pricing/rates"
      },
      ", “Automation basics”"
    ],
    [
      "Help updated 24 Nov 2026; both checked 26 Nov. Resolves the ",
      {
        "text": "wording discrepancy for ordinary triggers",
        "strong": true
      },
      " recorded in Domsky's Oct article; not proof of account-specific bills."
    ]
  ],
  [
    "C07",
    "AI by Zapier Standard does not offer tools. Current paid tool-capable tiers and BYOK have different task multipliers; own-provider usage is additional.",
    [
      {
        "text": "Model tier pricing",
        "href": "https://help.zapier.com/hc/en-us/articles/46425475442829-AI-by-Zapier-model-tier-pricing"
      },
      ", “Model tiers” / “Task calculation formula”"
    ],
    "Updated 19 Nov 2026; checked 26 Nov. Free only previews Standard and cannot publish an AI-by-Zapier Zap or add tools. Tool eligibility/model choices must be checked in the actual account."
  ],
  [
    "C08",
    "Make bills credits with feature-dependent usage. Its current public FAQ explains credit exhaustion, allowances and extra-credit choices.",
    [
      {
        "text": "Make pricing",
        "href": "https://www.make.com/pricing"
      },
      ", “What are credits?”, “What happens if I run out of credits?”"
    ],
    [
      "/en/pricing",
      " redirected here on 26 Nov. Current extraction omitted priced plan cards. Do not infer paid cadence or price from indexed/cached cards."
    ]
  ],
  [
    "C09",
    "Make incomplete-execution storage is disabled by default; eligible retained failures can be retried/resolved.",
    [
      {
        "text": "Incomplete executions",
        "href": "https://help.make.com/incomplete-executions"
      }
    ],
    "Checked 26 Nov. Enable/configure explicitly; limits and error types apply. No claim every error recovers automatically."
  ],
  [
    "C10",
    "Zapier distinguishes failed-step replay and entire-run replay; a full replay can repeat successful actions and usage.",
    [
      {
        "text": "Replay help",
        "href": "https://help.zapier.com/hc/en-us/articles/19220226086797-What-is-replay"
      },
      ", “Replay errored Zap workflows” / “Replay entire Zap run”"
    ],
    "Updated 29 May 2026; checked 26 Nov. No provider guarantee of successful recovery. Deduplication is an application requirement."
  ]
];
const pricingReferenceRows: RichText[][] = [
  [
    "Existing manual inbox/form/record",
    "Existing paid tools and owner labour may continue; incremental cost depends on the owner's actual stack.",
    "“No new automation subscription” only as a conditional scenario. Never call owner work free or assume existing services cost zero."
  ],
  [
    "Make rules workflow",
    "Current FAQ supports credit accounting; priced Core/Pro plan cards were not present in the retrieved current page. Indexed copies exposed older cards, but selected billing/currency/tax were not established.",
    [
      "Exact paid monthly/annual quote ",
      {
        "text": "unresolved",
        "strong": true
      },
      "; omit historical numeric cards. Verify the chosen connectors, plan, allowance and checkout before purchase."
    ]
  ],
  [
    "Zapier rules / approval",
    "Public Professional card shows “starting from $19.99/month” with USD selected, and exposes both monthly/yearly controls and task tiers. C05 places Human in the Loop on paid plans.",
    "This is an entry-price display, not a reproducible total: selected cadence/tier, country and tax were not confirmed. Do not call it a monthly-pay quote or annualise it. Public prose can use the paid boundary instead of a dollar teaser."
  ],
  [
    "Current AI by Zapier with tools",
    "C07's rate formula bills the AI step and each tool call at the chosen tier. Standard = 1x without tools; Advanced = 3x; Premium = 5x; BYOK = 1x with qualifying models plus provider charges.",
    [
      {
        "text": "Illustrative arithmetic only:",
        "strong": true
      },
      " one Advanced step + two tool calls = 9 tasks for that AI step; native actions, retries and other work are extra. It is not the cost of any fixture and not a promised 2027 rate."
    ]
  ],
  [
    "Standalone legacy Zapier Agents",
    "Public pricing still contains a separate activities-based Agents offering. Migration help describes task-based AI-by-Zapier and no separate Agents subscription for that migrated path.",
    "Keep the two versions separate. Do not add the legacy subscription/activity quota to an AI-by-Zapier quote or imply every account uses one billing regime."
  ]
];

// Render every original path/value, including nulls, booleans, arrays and expected
// output counts. JSON literal notation makes source types explicit in HTML.
function referenceRows(value: unknown, path = ''): RichText[][] {
  if (Array.isArray(value) && value.length) return value.flatMap((item, index) => referenceRows(item, `${path}[${index}]`));
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    return Object.entries(value).flatMap(([key, item]) => referenceRows(item, path ? `${path}.${key}` : key));
  }
  return [[path, JSON.stringify(value) ?? String(value)]];
}

const cover = {
  src: '/images/comparisons/ai-agent-vs-automation-client-intake-2027-cover-v1.webp',
  alt: 'Three client-intake approaches for 2027 planning: manual handling, rules-based automation and an agent with human review.',
  width: 1600, height: 900,
};

export const clientIntakeApproaches = {
  id: 'ds-comp-client-intake-approaches-2027',
  slug: '/comparisons/ai-agent-vs-automation-client-intake-2027',
  title: 'AI Agent vs. Automation: What Should a Solo Business Use for Client Intake in 2027?',
  description: 'Compare manual intake, rules-based automation and a human-approved AI agent using the same three client enquiries, with clear cost and approval limits.',
  excerpt: 'Keep manual intake when it works. Compare rules and reviewed agent proposals on the same complete, missing-data and exception cases before changing the process.',
  deck: 'Keep intake manual when it works. Use rules for predictable handoffs. Consider an agent when interpreting enquiries earns its review and maintenance cost.',
  seoTitle: 'AI Agent vs Automation for Client Intake in 2027 | Domsky',
  socialTitle: 'Manual, Rules or a Reviewed Agent? Choose for Client Intake',
  socialDescription: 'Three shared enquiry scenarios, explicit human approval and cost limits. A 2027 planning guide based on current documentation, not a provider benchmark.',
  category: 'Comparisons', contentType: 'comparison', author: PUBLIC_AUTHOR,
  // Owner-approved date on the review branch. Merge/deploy remains unauthorized.
  publishedAt: '2026-11-26', updatedAt: '2026-11-26', verifiedAt: '2026-11-26',
  status: 'published', readingMinutes: 9,
  tags: ['Client intake', 'AI agents', 'Automation', 'Human approval', 'Solo business'],
  relatedSlugs: ['/comparisons/make-vs-zapier-solo-business', '/uses', '/blog/replaced-saas-stack-with-ai-tools', '/blog/ai-daily-workflow-solo-business'],
  featuredImageRequired: true,
  featuredImage: { ...cover, caption: 'Editorial planning illustration. Provider documents were reviewed in November 2026; the proposed intake scenarios have not been run.' },
  ogImage: cover,
  commercial: false, recommendedUpdateDays: 7, affiliateDisclosureRequired: false,
  disclosure: 'This article contains no affiliate links. Provider documentation supports capability claims; the business examples and proposed tests below are editorial specifications.',
  verificationPending: [],
  sources: [
    { id: 'C01', title: 'Anthropic: Building effective agents — workflow and agent definitions', url: 'https://www.anthropic.com/research/building-effective-agents' },
    { id: 'C02-filter', title: 'Make Help: Filtering', url: 'https://help.make.com/filtering' },
    { id: 'C02-router', title: 'Make Help: Router and fallback routes', url: 'https://help.make.com/router' },
    { id: 'C03-C04', title: 'Zapier Help: Migrating from Agents to AI by Zapier', url: 'https://help.zapier.com/hc/en-us/articles/47402591569805-Migrating-from-Agents-to-AI-by-Zapier' },
    { id: 'C05', title: 'Zapier Help: Request approval with Human in the Loop', url: 'https://help.zapier.com/hc/en-us/articles/38731463206029-Request-approval-to-keep-your-workflow-running-with-Human-in-the-Loop' },
    { id: 'C06-help', title: 'Zapier Help: How task usage is measured', url: 'https://help.zapier.com/hc/en-us/articles/8496196837261-How-is-task-usage-measured-in-Zapier' },
    { id: 'C06-rates', title: 'Zapier: Task rates', url: 'https://zapier.com/pricing/rates' },
    { id: 'C07', title: 'Zapier Help: AI by Zapier model-tier pricing', url: 'https://help.zapier.com/hc/en-us/articles/46425475442829-AI-by-Zapier-model-tier-pricing' },
    { id: 'C08', title: 'Make: Pricing and credit accounting', url: 'https://www.make.com/pricing' },
    { id: 'C09', title: 'Make Help: Incomplete executions', url: 'https://help.make.com/incomplete-executions' },
    { id: 'C10', title: 'Zapier Help: What is replay?', url: 'https://help.zapier.com/hc/en-us/articles/19220226086797-What-is-replay' },
    { id: 'pricing-zapier', title: 'Zapier: Public pricing and separately listed Agents plans', url: 'https://zapier.com/pricing' },
  ],
  blocks: [
    ...reviewedArticleBlocks,
    { type: 'heading', level: 2, id: 'fixtures-and-policy', text: 'Reference: exact synthetic inputs and policy', toc: false },
    { type: 'note', title: 'Proposed specifications — not observed results', text: 'These reference tables preserve every field in the accepted synthetic fixture. Field paths identify nesting and array positions; values are displayed as JSON literals, so null is different from a number, false from true, and an empty array from missing text. Names, emails, budgets, policy and the January 2027 clock are fictional. Never send to these addresses. All provider runs remain NOT RUN.' },
    { type: 'table', caption: 'Canonical synthetic fixture context. The January 2027 clock is a test assumption, not a product forecast.', summary: 'Open fixture status, fixed clock and data notice', columns: ['Field path', 'Exact JSON value'], rows: referenceRows(Object.fromEntries(Object.entries(fixtureSpecification).filter(([key]) => !['business_policy', 'records', 'shared_acceptance'].includes(key)))) },
    { type: 'table', caption: 'Exact fictional policy: routing thresholds, templates, precedence and owner-only decisions.', summary: 'Open the complete fictional business policy and safe templates', columns: ['Field path', 'Exact JSON value'], rows: referenceRows(fixtureSpecification.business_policy, 'business_policy') },
    ...fixtureSpecification.records.map((record, index): ArticleBlock => ({
      type: 'table', caption: `Exact synthetic input and expected specification: ${record.inquiry_id}. Expected values are requirements, not results.`,
      summary: `Open ${record.inquiry_id}: source input and all required outputs`, columns: ['Field path', 'Exact JSON value'], rows: referenceRows(record, `records[${index}]`),
    })),
    { type: 'table', caption: 'Shared acceptance contract: exact positive base completion and zero-send negative approval conditions.', summary: 'Open the full positive/negative completion, approval and recovery contract', columns: ['Field path', 'Exact JSON value'], rows: referenceRows(fixtureSpecification.shared_acceptance, 'shared_acceptance') },
    { type: 'heading', level: 2, id: 'test-protocol', text: 'Reference: reproducible test protocol', toc: false },
    { type: 'paragraph', text: 'Status: PROPOSED / NOT RUN. The complete accepted protocol below preserves the positive successful-delivery contract as well as the negative approval holds. An empty outbox is not a successful base run. Reading or validating this specification is not a provider workflow test.' },
    { type: 'table', caption: 'Accepted protocol for three cases, three approaches and three repetitions: 27 planned base runs, all NOT RUN.', summary: 'Open the full setup, positive completion contract, three scenarios and fault variations', columns: ['Protocol section / item', 'Specification'], rows: protocolReferenceRows },
    { type: 'heading', level: 2, id: 'evidence-and-pricing', text: 'Reference: dated evidence and price limits', toc: false },
    { type: 'paragraph', text: 'Documentation reviewed 26 November 2026. These are provider statements and research limitations, not observed workflow operation. Exact checkout totals, account entitlements, local tax and future 2027 rates remain unverified.' },
    { type: 'table', caption: 'C01–C10: primary documentation, scope and limitations as reviewed 26 November 2026.', summary: 'Open the dated capability and source ledger', columns: ['Claim ID', 'Documented scope', 'Primary source / section', 'Date / limitation'], rows: evidenceReferenceRows },
    { type: 'table', caption: 'Price reconciliation and unresolved totals, 26 November 2026. Fictional EUR budgets are unrelated to provider USD prices.', summary: 'Open current price boundaries and what remains unverified', columns: ['Approach / surface', 'Verified scope', 'Treatment and limitation'], rows: pricingReferenceRows },
    { type: 'paragraph', text: 'No exchange-rate conversion or paid checkout was performed. Exact billing commitment, allowance, add-ons, currency, regional access, tax and retained services require confirmation in the actual account. The current AI-by-Zapier task regime must not be combined with the older standalone Agents activity subscription. Any arithmetic in the reference table is illustrative only, not a measured fixture bill or 2027 quote.' },
    { type: 'paragraph', text: 'For ordinary Classic Zap triggers, the current task-help and rates pages agree; the October discrepancy recorded in the historical Make/Zapier article is not a newly verified conflict. Editor-preview, whole-Zap test and live-trigger billing still require before/after counter evidence. Dated future or promotional rates for other surfaces are not a reliable 2027 budget assumption.' },
    { type: 'sources', id: 'sources', title: 'Official sources' },
  ],
} satisfies ArticleDocument;
