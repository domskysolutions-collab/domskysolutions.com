# AI Agent vs. Automation: What Should a Solo Business Use for Client Intake in 2027?

**Editorial draft — not published.** Prepared 26 November 2026. Publication date awaits owner approval.

## Proposed publication metadata

- **Section / content type:** Comparisons / comparison.
- **Proposed slug:** `/comparisons/ai-agent-vs-automation-client-intake-2027`.
- **SEO title:** AI Agent vs Automation for Client Intake in 2027 | Domsky
- **Meta description:** Compare manual intake, rules-based automation and a human-approved AI agent using the same three client enquiries, with clear cost and approval limits.
- **Deck:** Keep intake manual when it works. Use rules for predictable handoffs. Consider an agent when interpreting enquiries earns its review and maintenance cost.
- **Attribution:** Domsky Solutions in the existing page presentation; retain the repository's truthful `PUBLIC_AUTHOR` attribution when implementation is approved.
- **Source review:** 26 November 2026. This is a documentation date, not a provider-test or publication date.
- **Disclosure:** This article contains no affiliate links. Provider documentation supports capability claims; the business examples and proposed tests below are editorial specifications.

---

If your inbox, form and client list already let you capture enquiries and respond reliably, keep that process. A new agent is useful only if it solves a recurring problem that simpler handling leaves behind.

For predictable work—recording fields, checking whether a budget is missing and sending a standard receipt—start with rules. Consider an AI agent when interpreting variable requests is the difficult part and you can review its proposals before anything reaches a client. A small AI drafting step may be enough.

**Evidence scope:** Official documentation was reviewed on 26 November 2026. No manual-versus-automation-versus-agent provider trial was performed for this article. The cases below describe expected handling, not observed results. The fictional business policy and January 2027 test clock make the proposed tests reproducible; they do not establish 2027 product availability, prices or performance.

## Three approaches, one intake job

The job is to preserve an enquiry, identify the next action and prepare an appropriate response. Accepting the project is a separate business decision.

**Manual handling:** the owner reads the enquiry, records it, notices gaps and decides what to send. It preserves flexibility without adding another automation service, but it still consumes time. Do not assume the owner never makes a mistake or that existing tools cost nothing.

**Rules-based automation:** predefined conditions decide what happens. Make, for example, documents [filters](https://help.make.com/filtering) and [router branches with a fallback route](https://help.make.com/router). These can support a missing-field check or a route to owner review. Somebody must still configure that route, monitor it and handle failures.

**An agent with human approval:** a model chooses among a small set of permitted tools, reads their results and proposes the next action. In our proposed setup, it can consult the test policy and prepare a summary or response. It has no client-send, booking or price-commitment tool. An external review step controls release.

That distinction matters. A fixed workflow that asks a model to classify one message is not necessarily an agent. Anthropic's [architectural explanation](https://www.anthropic.com/research/building-effective-agents) distinguishes predefined workflows from model-directed processes. Adding a classifier to a reliable workflow may solve the problem without introducing a more open-ended agent.

## Compare the same three enquiries

Imagine a fictional one-person website studio. Its standard routing policy is a five-page website in one language, a budget of at least **EUR 1,500**, and at least **21 calendar days** before the requested launch. Passing those checks does not confirm capacity, price or acceptance. The owner alone decides discounts, deadlines and scope exceptions.

All approaches receive the same fields, raw message and policy. The test clock is fixed at 4 January 2027. All names, budgets and dates are synthetic.

**The following table is a proposed handling comparison. None of these provider runs has been executed.**

| Enquiry | Manual handling | Rules-based automation | Agent with human approval |
| --- | --- | --- | --- |
| **Complete — `INT-2027-001`:** five-page English website, EUR 2,000, requested 22 February 2027 | Record the details, place the request in the review queue and check a safe receipt before sending. | Validate the fields, create one record, notify the owner and send the fixed receipt. No AI is needed to detect completeness. | Prepare a grounded summary and receipt proposal. Hold the message until the owner approves it; evaluate whether that extra work helped. |
| **Missing data — `INT-2027-002`:** five-page English website; budget and target date explicitly undecided | Ask for the two missing facts. Keep them empty in the record. | Null-field checks select a clarification template asking for budget and target date. | Preserve both gaps and draft the clarification for review. Do not replace the unknown budget with the studio's minimum or invent a date. |
| **Exception — `INT-2027-003`:** EUR 1,000, launch on 11 January, English and Slovak, discount requested for possible future work | Review the commercial tradeoff and decide what discussion is needed. | Flag the low budget, seven-day lead time, extra language and discount request; route to the owner. | Explain those conflicts with references to the input and policy. Suggest follow-up questions; leave acceptance, discount and deadline decisions to the owner. |

Each case should leave one preserved source record and one owner notification. A receipt may confirm that the enquiry arrived; it must not confirm that the project fits or has been accepted. In the exception test, the specified owner disposition is follow-up, with no acceptance or revised quote.

The complete and missing-data cases expose how much ordinary rules can cover. The exception exposes the limit of automation: detecting a threshold is not making the commercial judgment. An agent's useful contribution would be clearer preparation for that judgment, not permission to make it autonomously.

## Put approval between the proposal and the send

“Ask me before sending” is an instruction, not proof that a workflow stops. For this design, put a dispatcher outside the model's control. It should release only the exact recipient, message and action the owner reviewed.

Bind approval to the enquiry, proposal version and policy version. If the recipient, text or proposed action changes, require another review. Pending, declined or expired approval must send nothing. The companion protocol uses a **30-minute test expiry**; that is a proposed test condition, not a provider default.

Check the actual configuration. Zapier's [migration guide](https://help.zapier.com/hc/en-us/articles/47402591569805-Migrating-from-Agents-to-AI-by-Zapier) says per-tool approval must be enabled; otherwise tools run without that pause. Its separate [Human in the Loop step](https://help.zapier.com/hc/en-us/articles/38731463206029-Request-approval-to-keep-your-workflow-running-with-Human-in-the-Loop) requires a paid account and offers either continuing or stopping after a decline. This specification requires **Stop run**. Downstream actions must use the reviewed fields, including any edits.

Approval also has a narrow meaning. Approving a receipt does not approve a discount, a booking or the agent's next action. Keep those decisions separate.

## Budget for the whole process

There is no verified cheapest approach in this article. Paid checkout totals, local tax, selected allowances and account entitlements remain unverified. Do not compare a fictional client's EUR budget with a platform's dollar price or treat an annual-billing teaser as a monthly-pay quote.

The paid boundary can still matter. Besides the approval step, Zapier's current [AI model-tier documentation](https://help.zapier.com/hc/en-us/articles/46425475442829-AI-by-Zapier-model-tier-pricing) distinguishes tool-free Standard from paid tool-capable tiers. A free preview does not establish that the proposed agent can be deployed on a free account.

Record costs separately:

- Existing form, inbox and client-record services that will remain.
- The selected subscription, billing commitment and allowance.
- Runtime usage, model/tool usage and any separate model-provider bill.
- Setup, review, corrections, failed-run recovery and ongoing maintenance.

Make's [credit accounting](https://www.make.com/pricing) and Zapier's [task rates](https://zapier.com/pricing/rates) are different units. Measure the actual configured work before calculating cost per correctly handled enquiry. The current AI-by-Zapier path also differs from the older standalone Agents offering; do not combine their billing regimes into one assumed total.

Once the operating approach is clear, our [Make vs. Zapier comparison](https://domskysolutions.com/comparisons/make-vs-zapier-solo-business) helps frame platform selection. Recheck current provider billing and exact connector support before buying. The [software-stack audit](https://domskysolutions.com/blog/replaced-saas-stack-with-ai-tools) helps separate added cash costs from retained services and owner time.

## Test the ordinary cases and the failed handoff

The companion test specification proposes three repetitions of each case in each approach: **27 planned base runs, all currently not run**. Use a sandbox outbox, the same policy and input, and recorded workflow/model versions. Include the owner's active review time; record waiting time separately.

Repeat an enquiry with the same ID. Break the owner-notification connection after the record exists. Test pending, declined and expired approvals. Simulate a send accepted by the outbox followed by a timeout. The required response to uncertain delivery is reconciliation, not a blind resend.

Recovery controls need inspection too. Make documents [incomplete-execution storage](https://help.make.com/incomplete-executions), disabled by default. Zapier documents [different replay scopes](https://help.zapier.com/hc/en-us/articles/19220226086797-What-is-replay), including whole-run replays that can repeat successful actions. Neither feature establishes that your intake process produces exactly one record or reply. Save the outputs and inspect them.

## Choose what to carry into 2027

The planning assumption is modest: clients will still send complete requests, omit information and ask for exceptions. Future plan names, prices, model behaviour and connector access remain unknown. Recheck them before release or purchase.

Start by identifying the actual failure in today's intake. If the work is manageable, keep the manual process and a checklist. If information is repeatedly copied or routed in predictable ways, trial rules. If interpreting messages is the material burden, compare a narrow AI step with the reviewed-agent proposal.

Before connecting real client data, write the owner-only decisions and acceptable review workload, then run the three specifications in an approved sandbox. Choose the setup that meets those conditions with an owner who can operate and recover it. These proposed cases do not yet supply a speed, reliability or savings winner.

---

**Review companions:** [fixed inputs and fictional policy](fixtures.json), [reproducible test protocol](03-test-specifications.md), and [dated evidence and pricing reconciliation](02-evidence-and-pricing.md). These are editorial-package links; replace them with approved accessible reference material during any later implementation.
