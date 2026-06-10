---
id: TASK-1
title: Document Data display component category in Storybook
status: Done
assignee: []
created_date: '2026-06-09 07:43'
updated_date: '2026-06-09 08:02'
labels:
  - docs
  - storybook
  - data-display
dependencies: []
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Author Storybook docs (.docs.mdx) and stories (.stories.tsx) pages for the Data display component category, sourced from the Penny zeroheight documentation and following the project's documentation style guide (see the zeroheight-to-storybook skill).

Scope is limited to the Data display components that already have component source vendored locally under penny-docs/src/components/dataDisplay/ AND a matching zeroheight page: SectionBanner, Divider, Counter, Pill, Tooltip. The remaining zeroheight Data display pages (Avatar, Avatar group, Badge, Brand, Brand Symbol, Currency, Flag icon, Status indicator, Tracker, Virtual card, Tourtip) require their source to be vendored from a penny snapshot that is not present locally; they are out of scope until that snapshot is available.

Each component is tracked as a subtask. Pattern reference: penny-docs/src/components/action/Button/.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Each in-scope component (SectionBanner, Divider, Counter, Pill, Tooltip) has a .docs.mdx page following the PageHero + DocTabs structure
- [x] #2 Each in-scope component has a .stories.tsx with a Playground story plus section stories
- [x] #3 New component themes are registered in components.theme.ts and theme/components.ts where required
- [x] #4 penny-docs typecheck reports no new errors in the touched files
- [x] #5 Out-of-scope components requiring snapshot vendoring are explicitly noted, not silently dropped
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Authored Storybook docs + stories for all 5 in-scope Data display components (SectionBanner, Divider, Counter, Pill, Tooltip), each following the PageHero + DocTabs (Design tab only) pattern with a Playground and section stories. All themes were already registered (SectionBanner in the prior commit; Divider/Counter/Pill use existing registrations). Verified each in the running Storybook with no runtime errors; penny-docs typecheck shows no new errors (baseline 27 → 26). Out of scope and explicitly deferred (no local source — require vendoring from a penny snapshot not present in this repo): Avatar, Avatar group, Badge, Brand, Brand Symbol, Currency, Flag icon, Status indicator, Tracker, Virtual card, Tourtip. Tooltip's local component is a pass-through stub, so its page is badged Beta and uses static design mocks with a clear warning callout.
<!-- SECTION:FINAL_SUMMARY:END -->
