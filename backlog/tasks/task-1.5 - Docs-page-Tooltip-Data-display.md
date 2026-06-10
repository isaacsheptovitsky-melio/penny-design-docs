---
id: TASK-1.5
title: 'Docs page: Tooltip (Data display)'
status: Done
assignee: []
created_date: '2026-06-09 07:44'
updated_date: '2026-06-09 08:02'
labels:
  - docs
  - storybook
  - data-display
dependencies: []
references:
  - 'https://zeroheight.com/98bb1df01/v/latest/p/60e8d6'
modified_files:
  - penny-docs/src/components/dataDisplay/Tooltip/Tooltip.docs.mdx
  - penny-docs/src/components/dataDisplay/Tooltip/Tooltip.stories.tsx
parent_task_id: TASK-1
ordinal: 6000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create Tooltip.docs.mdx and Tooltip.stories.tsx under penny-docs/src/components/dataDisplay/Tooltip/, sourced from zeroheight page 7016952.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Tooltip.docs.mdx follows PageHero + DocTabs
- [x] #2 Stories include Playground plus placement/usage sections
- [x] #3 No new typecheck errors in touched files
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added Tooltip.stories.tsx and Tooltip.docs.mdx. Because the local Tooltip is a pass-through stub, the page is badged Beta, leads with a warning Callout, renders faithful static design mocks (TooltipBubble) for With title / Line break / Placement / Label with icon, and includes a Current behavior story showing the stub passing children through. Verified in Storybook: 9 triggers render, stub warning present, no errors. No new typecheck errors.
<!-- SECTION:FINAL_SUMMARY:END -->
