---
id: TASK-2
title: 'Docs page: Status Icon Solid (Foundation) + fix component fidelity'
status: Done
assignee: []
created_date: '2026-06-10 12:00'
updated_date: '2026-06-10 12:05'
labels:
  - docs
  - storybook
  - foundation
dependencies: []
references:
  - 'https://zeroheight.com/98bb1df01/v/latest/p/9965e2-status-icon-solid'
modified_files:
  - penny-docs/src/components/foundations/StatusIconSolid/StatusIconSolid.tsx
  - >-
    penny-docs/src/components/foundations/StatusIconSolid/StatusIconSolid.docs.mdx
  - >-
    penny-docs/src/components/foundations/StatusIconSolid/StatusIconSolid.stories.tsx
  - penny-docs/src/components/dataDisplay/SectionBanner/SectionBannerIcon.tsx
ordinal: 7000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create StatusIconSolid.docs.mdx + StatusIconSolid.stories.tsx under penny-docs/src/components/foundations/StatusIconSolid/, sourced from zeroheight page 7081715 (Foundation › Status icon solid). Also reconcile the docs StatusIconSolid reimplementation with the real Penny component: the authoritative variant set is pending/warning/success/informative/scheduled/processing/help/issues/cancel/decline/alert (NO brand), each mapped to a real Penny icon (warning-solid triangle, checked-circle-fill, info-fill, help-circle-fill, error-fill, refresh-fill, pause-solid, stopwatch-fill, process-fill, decline-fill, cancel) tinted by ColorStyle (warning/pending=icon.warning #fdb702, success #028838, informative/scheduled #306af7, processing/help/issues=primary #18191b, cancel/decline/alert=critical #d80e25). Sizes small 16 / medium 24 / large 32 / extra-large 40. Revert the earlier incorrect changes: remove the invented brand variant and the all-black warning triangle; warning is an amber triangle with a black exclamation. Update SectionBannerIcon to stop mapping brand→brand.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 StatusIconSolid reimplementation matches the real variant set (11, no brand), colors (ColorStyle), glyphs (real icon paths), and sizes (16/24/32/40)
- [x] #2 StatusIconSolid.docs.mdx follows PageHero + DocTabs (Design tab only) with Usage, Variants (status variants), Sizes, and States (disabled/read-only)
- [x] #3 StatusIconSolid.stories.tsx has a Playground plus Variants, Sizes, and States stories
- [x] #4 SectionBannerIcon no longer references a brand status-icon variant
- [x] #5 No new typecheck errors in touched files
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Rebuilt the docs StatusIconSolid reimplementation to match the real Penny component (sourced from the snapshot: StatusIconSolid.types statusIconSolidType + theme.utils ColorStyle). Variants are now the authoritative 11 (pending/warning/success/informative/scheduled/processing/help/issues/cancel/decline/alert) — the invented `brand` variant was removed — each rendered with the real Penny icon SVG path (warning-solid amber triangle with black exclamation, checked-circle-fill, info-fill, help-circle-fill, error-fill, refresh-fill, pause-solid, stopwatch-fill, process-fill, decline-fill, cancel) tinted by ColorStyle (warning/pending #fdb702, success #028838, informative/scheduled #306af7, processing/help/issues #18191b, cancel/decline/alert #d80e25). Sizes corrected to 16/24/32/40. isDisabled (grayscale+opacity) and isReadOnly (opacity) implemented for the States section. Created the Foundation docs page: StatusIconSolid.docs.mdx (PageHero category Foundations, DocTabs Design-only, Usage + Variants[Status variant/Sizes/States] + Related) and StatusIconSolid.stories.tsx (Playground + Variants/Sizes/States via VariantGrid + Related). Reverted SectionBannerIcon brand→help (no brand status icon). Verified live: foundation page renders 20 icons with correct glyphs/colors (warning is an amber triangle), and the SectionBanner warning icon is now an amber triangle (#fdb702) while the brand icon is #18191b. No new typecheck errors (26 baseline). NOTE: this reverses the earlier user request to color the SectionBanner brand icon purple — the design system has no brand Status Icon variant, so the brand banner correctly uses the neutral help icon.
<!-- SECTION:FINAL_SUMMARY:END -->
