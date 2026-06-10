---
id: TASK-3
title: Sidebar done indicator (blue dot) + restore Healthy badges
status: Done
assignee: []
created_date: '2026-06-10 12:12'
updated_date: '2026-06-10 12:25'
labels:
  - docs
  - storybook
dependencies: []
modified_files:
  - penny-docs/.storybook/manager.tsx
  - penny-docs/src/components/navigation/Tabs/Tabs.docs.mdx
  - penny-docs/src/components/navigation/Pagination/Pagination.docs.mdx
  - penny-docs/src/components/navigation/NavigationItem/NavigationItem.docs.mdx
  - penny-docs/src/components/navigation/Link/Link.docs.mdx
  - penny-docs/src/components/foundations/ColorTokens/ColorTokens.docs.mdx
  - penny-docs/src/components/action/ButtonGroup/ButtonGroup.docs.mdx
  - penny-docs/src/components/action/Button/Button.docs.mdx
  - penny-docs/src/components/action/NakedButton/NakedButton.docs.mdx
  - penny-docs/src/components/action/IconButton/IconButton.docs.mdx
  - penny-docs/src/components/action/ActionBar/ActionBar.docs.mdx
  - penny-docs/src/ux-patterns/Delete/Delete.docs.mdx
  - penny-docs/src/ux-patterns/ButtonsVsLinks/ButtonsVsLinks.docs.mdx
  - penny-docs/src/ux-patterns/Feedback/Feedback.docs.mdx
ordinal: 8000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add a sidebar status indicator showing which components are documented/done, and revert the in-page PageHero "Done" badges back to "Healthy".
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Sidebar shows a colored status dot next to each documented component mirroring its PageHero badge (green=Healthy, amber=Beta)
- [x] #2 All 13 PageHero badge="Done" pages are changed back to "Healthy"
- [x] #3 No new typecheck errors
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added penny-docs/.storybook/manager.tsx with a sidebar.renderLabel that appends a small status dot to each documented component, colored by status (healthy=#028838 green, beta=#fdb702 amber, deprecated=red, experimental=purple). The COMPONENT_STATUS map keys are the sidebar group ids (from /index.json) and mirror each page's PageHero badge — 21 healthy + Tooltip beta. Required a Storybook manager restart to take effect; verified live across Data Display, Foundations, UX Patterns, and Action groups (dots render on each component; Tooltip is amber). Also flipped all 13 PageHero badge="Done" occurrences to "Healthy" (Tabs, Pagination, NavigationItem, Link, ColorTokens, ButtonGroup, Button, NakedButton, IconButton, ActionBar, Delete, ButtonsVsLinks, Feedback) — badge counts now 21 Healthy / 1 Beta / 1 Design Only. Typecheck clean (26 baseline). Note: the manager.tsx status map is maintained by hand — add an entry when a new component is documented (a comment in the file says so).

Revised the sidebar indicator per feedback: removed the left-side health dot (renderLabel), and instead of Storybook 10's built-in right-side status sparkle (the default 'New' indicator, which is now hidden via manager CSS), each documented component shows a blue (#306af7) dot on the right indicating it's done. Implemented in .storybook/manager.tsx by injecting a <style> that (a) hides `.sidebar-item button[aria-label^="Change status"]` and (b) adds a `::after` blue dot (right:12px) for the DONE_COMPONENTS group ids. Verified live: 0 old health dots, native status display:none, blue ::after dots on documented components.

Revised again per feedback: removed the right-side blue dot; now a green (#028838) dot renders next to the component NAME (via sidebar.renderLabel) for only the explicitly approved-done pages — Color Tokens, Buttons vs. Links, Delete, Feedback, Button (APPROVED set of sidebar ids in .storybook/manager.tsx). Storybook's native right-side status sparkle stays hidden. Verified live: exactly 5 green name-dots (incl. Button under Action), none on non-approved components (e.g. Icon Button).

Expanded the APPROVED set to 13 pages: added Icon Button, Naked Button, ActionBar, Button Group (Action) and Link, Navigation Item, Pagination, Tabs (Navigation) alongside the original Color Tokens, Buttons vs. Links, Delete, Feedback, Button. Verified live: all 13 show the green name dot, none missing.
<!-- SECTION:FINAL_SUMMARY:END -->
