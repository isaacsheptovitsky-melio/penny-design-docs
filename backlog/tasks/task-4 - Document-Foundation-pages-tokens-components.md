---
id: TASK-4
title: Document Foundation pages (tokens + components)
status: Done
assignee: []
created_date: '2026-06-10 12:28'
updated_date: '2026-06-10 12:48'
labels:
  - docs
  - storybook
  - foundation
dependencies: []
modified_files:
  - penny-docs/src/components/foundations/Typography/Typography.stories.tsx
  - penny-docs/src/components/foundations/Typography/Typography.docs.mdx
  - penny-docs/src/components/foundations/Spaces/Spaces.stories.tsx
  - penny-docs/src/components/foundations/Spaces/Spaces.docs.mdx
  - penny-docs/src/components/foundations/Shadows/Shadows.stories.tsx
  - penny-docs/src/components/foundations/Shadows/Shadows.docs.mdx
  - penny-docs/src/components/foundations/Breakpoints/Breakpoints.stories.tsx
  - penny-docs/src/components/foundations/Breakpoints/Breakpoints.docs.mdx
  - penny-docs/src/components/foundations/BorderRadius/BorderRadius.stories.tsx
  - penny-docs/src/components/foundations/BorderRadius/BorderRadius.docs.mdx
  - penny-docs/src/components/foundations/Borders/Borders.stories.tsx
  - penny-docs/src/components/foundations/Borders/Borders.docs.mdx
  - penny-docs/src/components/foundations/Spinner/Spinner.stories.tsx
  - penny-docs/src/components/foundations/Spinner/Spinner.docs.mdx
  - penny-docs/src/components/foundations/Loader/Loader.stories.tsx
  - penny-docs/src/components/foundations/Loader/Loader.docs.mdx
  - penny-docs/src/components/foundations/Icon/Icon.stories.tsx
  - penny-docs/src/components/foundations/Icon/Icon.docs.mdx
  - penny-docs/src/components/foundations/Illustration/Illustration.stories.tsx
  - penny-docs/src/components/foundations/Illustration/Illustration.docs.mdx
  - penny-docs/src/components/foundations/Illustration/Illustration.tsx
ordinal: 9000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Author Storybook docs (.docs.mdx) + stories (.stories.tsx) for the Foundation category, tokens and components first (prose/guideline pages deferred). Sourced from the Penny zeroheight Foundation pages and the local token data in penny-docs/src/theme/foundations. Follow the zeroheight-to-storybook skill and the established page conventions (PageHero + DocTabs Design-only, use the storybook-utils blocks). Already done: Color Tokens, Status Icon Solid.

Token pages: Typography, Spaces, Shadows, Borders, Border radius, Breakpoints.
Component pages: Spinner, Loader, Illustrations, Icons.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Each in-scope foundation page has a .docs.mdx (PageHero + DocTabs, Design tab only) and a .stories.tsx
- [x] #2 Token pages render the real token values from theme/foundations
- [x] #3 Component pages follow the component-docs pattern with a Playground + section stories
- [x] #4 New foundation entries get a green approved dot only if explicitly approved (sidebar manager map)
- [x] #5 penny-docs typecheck reports no new errors in touched files
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Built 10 Foundation pages (docs.mdx + stories.tsx), all verified in Storybook with no runtime errors and typecheck clean (26 baseline). Token pages render real values from theme/foundations: Typography (textStyles specimens via the Text component — Display/Headings, Metrics, Body, Captions + font family + a11y notes), Spaces (themeSpaces bars + use cases), Shadows (shadows elevation swatches), Breakpoints (themeBreakpoints + ranges), Border Radius (defaultGlobalBorderRadii swatches + semantic/component tokens), Borders (defaultGlobalBorders weights + semantic tokens). Component pages follow the Playground + section pattern: Spinner (variants neutral/brand/inverse, sizes, disabled), Loader (colors), Icons (curated 15-icon gallery + sizes + colors, noted as a curated subset), Illustrations (extended the docs Illustration component to 6 types — new-email/announce/celebration/error/approve/bank-success via ?raw SVG inlining — gallery + sizes). Verified live: Typography 23 specimens, Spinner neutral+brand render, Icons 25, Illustrations 10 with injected SVGs, Border Radius tokens present. New foundation pages intentionally have no green approved dot (not yet approved). Deferred (prose/guideline): Layout system, Accessibility, Mobile patterns, Partnerships, Values & principles.
<!-- SECTION:FINAL_SUMMARY:END -->
