# Codex High — DigiEduHack M1–M6 platform audit + M6 real-data integration

**Model:** strongest available Codex coding/browser model. **Reasoning effort:** High.
**Repository:** https://github.com/barbalatv/DigiEduHack2026
**Existing product:** React/Vite/TS app in \`web/\`. PR #1 is in main. PR #2 (\`Vladimir/puntea-edu-pr2\`, head at audit start \`feac5dd4b6302112e10d6876fb75815a07243132\`) is OPEN and UNMERGED.
**M6 scaffold already created:** \`feat/m6-governance-slice\`, based on PR #2. Inspect branch head before touching any files; it has M6 route, fixture records, decision simulation and M1 reference link.
**Event platform open in browser:** DigiEduHack Legacy Moldova 2026 at \`https://script.google.com/macros/s/AKfycbx0JXaodr1tqOqX4nLWfPtST3xxy2g34TP_LsprQIeDWHtAgCoTfA3nyafps8tWjv1OSQ/exec?p=modul&m=6\`.
**Scope:** read-only inspection of event platform; implementation ONLY in our repository.
**Time budget:** official agenda lists submission of canvas/dosar/common map on 8 November 2026 at 11:30, then presentations at 12:00 (confirm if platform announces changes).

## Objective

Extract everything relevant and actually visible from ALL SIX modules, especially final ideas, canvas, dossier, notes, links, test outcomes, decisions, cross-module dependencies, and their selection status. Then convert the current M6 demo into a credible integration-ready prototype that uses true source records when verifiable.

The user needs a useful end-to-end product, not a folder of notes. But **do not invent official decisions or integrations**.

## Phase A — independently audit platform, without writes

1. Inspect open platform tab using browser interaction. Apps Script may render as an iframe; follow the visible page rather than assuming DOM text from the wrapper is the content. If browser control is unavailable, report this explicitly and stop platform extraction rather than guessing.
2. Explore \`Acasă\`, \`Cum lucrez\`, module M1 to M6, \`Harta comună\`, \`Contribuție\`, \`Agenda\`, \`Panoul\`. In every module inspect \`Canvas\`, \`Dosar\`, \`Idei\` (including descendants/branches), \`Legături\`, \`Notițe\`, \`Test\`, selection summaries and any final decision.
3. For each screen save a structured, readable record: module, subsection, original Romanian text, short Russian meaning, source URL, UTC timestamp, status (confirmed/proposed/selected/rejected/unknown), IDs if displayed, authorship only if strictly needed and appropriate, evidence screenshot path.
4. Trace cross-module link graph: depends-on, complements, duplicates, uses. Keep exact source IDs and confidence; never convert editorial suggestions into approved integration.
5. Check the discrepancy: platform M1 selection was reported as **19 main ideas and 122 consolidated contributions**, while our PR #2 README refers to **18 final ideas and 11 unconfirmed links**. Verify actual values, timestamps and whether changed; do not silently reconcile.
6. M6: enumerate all submitted alternatives and priorities before choosing what to implement. Look for governance process, owner, public reply, conflict resolution, prioritisation, privacy, feedback, and explicit links to M1–M5.
7. Do not submit notes, names, ideas, tests, votes or modifications to the event platform. No scraping hidden/private Sheets, bypassing access controls, or exposing participant details. Use only authorized browser UI and explicit exports if supported.
8. If data is absent, keep a field \`unknown\`; do not synthesize a canvas, participant, link, decision or count.

**Output:**
- \`research/platform-2026-11-07/MODULES.md\` — six-module map, evidence, current status, key ideas, problems, proposed APIs/interfaces, and unresolved mismatches.
- \`research/platform-2026-11-07/M6-DECISIONS.md\` — M6 factual audit, not a plan.
- \`research/platform-2026-11-07/links.json\` — cross-module graph with source IDs and certainty.
- \`research/platform-2026-11-07/snapshot.json\` — sanitized, normalized, provenance-tagged platform snapshot. Use existing \`SnapshotEnvelope\` schema if appropriate; don't force incompatible source data into a misleading schema.
- screenshots only if needed to evidence critical ambiguities, with private information removed.

## Phase B — inspect existing repository & strengthen vertical slice

1. Read actual \`main\`, PR #2 and M6 feature branch; compare diffs and check whether other commits appeared. Keep open PR #2 intact. Work in a NEW \`feat/m6-platform-integration\` branch based on latest \`feat/m6-governance-slice\` (or safe worktree). Do not directly modify \`main\` or existing open PR #2.
2. Verify the M6 domain model in \`web/src/lib/governance.ts\` and UI in \`web/src/GovernancePage.tsx\`, CSS, tests and route wiring in \`web/src/App.tsx\`. Fix logic/style/accessibility defects.
3. Replace only *source-backed* fixtures with real material from phase A. Keep demonstrative examples explicitly labeled. Official M6 decisions must never be simulated as if real. Any real programme link must resolve into our existing M1 program card or show a clear pending-integration state.
4. Primary happy path: open real M1 course, navigate to M6 with stable reference, describe concrete need, see what happens next, and inspect a justified decision/status. Without auth/backend, keep this clearly **local demo** and provide a path for subsequent verified integration.
5. Represent M2 expert, M3 community, M4 gap/route and M5 evidence via typed source references. If corresponding source records are unavailable, make the integration state visibly \`not connected\` and do not fake content.
6. Only if it clearly improves the MVP and poses no privacy risk, add one click to export the user's local demo proposal as JSON. Avoid accounts, live voting, rankings, email, storage and AI features.
7. Maintain existing responsive visual system (Puntea Edu MD) and original M1 functionality. Check 320/390/768/1280 widths, contrast, keyboard, focus, empty/loading/error states, direct-link refresh, Back and official outbound source links.
8. No secrets, no personal data, no invented user interviews, tests, platform API, automated updates or deployed URL. Public deployment is separate and requires verified URL and smoke checks.

## Required verification
- \`cd web && pnpm install --frozen-lockfile && pnpm build && pnpm lint && pnpm test\`.
- \`git diff --check\`, \`git status --short\`, verify no nested git repositories/gitlinks and no accidental platform-user data.
- Browser smoke on the real local app: M1 catalog -> real programme -> M6 -> add demo feedback -> show provenance -> simulate motivated decision -> Back/refresh -> M1, mobile and desktop. Avoid calling an observed screenshot test “automated CI”.
- Independent review of domain contracts and privacy assumptions before any data persistence or remote write.
- If unable to run, mark exact check \`NOT RUN\` and explain why; never claim PASS without actually executing.

## Deliverables, source control and final report
- Commit changes and audit artifacts in your own branch, push; open a DRAFT PR targeting \`feat/m6-governance-slice\`, not \`main\` or PR #2.
- Provide exact SHA, PR URL, verified checks (with commands and outcomes), unverified parts, and 3-minute end-to-end demo instructions.
- Explicitly distinguish platform facts, source-backed catalog data, simulated sample content and future integration assumptions.
- Protect the event deadline: if audit scope expands, stop researching and preserve a minimal demonstrable prototype plus factual source notes. Do not treat number of documents or PRs as success.
