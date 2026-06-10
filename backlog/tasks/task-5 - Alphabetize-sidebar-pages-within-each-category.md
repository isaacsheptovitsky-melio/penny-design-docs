---
id: TASK-5
title: Alphabetize sidebar pages within each category
status: Done
assignee: []
created_date: '2026-06-10 13:05'
updated_date: '2026-06-10 13:06'
labels:
  - storybook
dependencies: []
modified_files:
  - penny-docs/.storybook/preview.tsx
ordinal: 10000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Order all Storybook sidebar pages alphabetically within their category, keeping intro pages and the category order pinned, and preserving each page's authored story order.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Pages are alphabetical within each category/group (Foundations, UX Patterns, Components subgroups, and each component group)
- [x] #2 Intro pages (Design Guidelines, Welcome) and category order stay at the top
- [x] #3 Story order within a page is preserved (Docs first)
- [x] #4 Storybook builds and typecheck is clean
<!-- AC:END -->



## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Replaced the custom storySort.order pins in .storybook/preview.tsx with an inline storySort comparator that sorts the title hierarchy alphabetically while: pinning the top-level order (✦ Design Guidelines, Welcome, Foundations, UX Patterns, Components), and returning 0 for same-title pairs so each page's authored story order (Docs, Playground, sections) is preserved. Verified via /index.json and the sidebar: Foundations, UX Patterns, Components subgroups and each component group are alphabetical. Gotchas (SB10): storySort is statically extracted from preview.tsx, so the comparator must be (1) inline — not a reference to a module-scope const (that errors 'unsupported'), and (2) free of TypeScript type annotations in its source (they error 'Unexpected token :'). Params are typed contextually from the Preview type, so tsc stays clean (26 baseline) with no annotations.
<!-- SECTION:FINAL_SUMMARY:END -->
