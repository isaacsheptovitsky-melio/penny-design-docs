---
id: TASK-1.1
title: 'Docs page: SectionBanner (Data display)'
status: Done
assignee: []
created_date: '2026-06-09 07:43'
updated_date: '2026-06-10 11:36'
labels:
  - docs
  - storybook
  - data-display
dependencies: []
references:
  - 'https://zeroheight.com/98bb1df01/v/latest/p/46d766'
modified_files:
  - penny-docs/src/components/dataDisplay/SectionBanner/SectionBanner.docs.mdx
  - >-
    penny-docs/src/components/dataDisplay/SectionBanner/SectionBanner.stories.tsx
  - penny-docs/src/components/dataDisplay/SectionBanner/SectionBannerIcon.tsx
  - penny-docs/src/storybook-utils/VariantCard.tsx
  - penny-docs/src/components/foundations/StatusIconSolid/StatusIconSolid.tsx
  - penny-docs/src/components/foundations/Illustration/Illustration.tsx
  - penny-docs/src/components/foundations/Illustration/index.ts
  - penny-docs/src/types.d.ts
  - skill/zeroheight-to-storybook.md
parent_task_id: TASK-1
ordinal: 2000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create SectionBanner.docs.mdx and SectionBanner.stories.tsx under penny-docs/src/components/dataDisplay/SectionBanner/, sourced from zeroheight page 6649348. SectionBanner is a compound component (Root/Content/Title/Description/Icon/CloseButton). Theme is already registered. Cover variants (neutral/informative/warning/critical/success/brand/secondary), Large vs Compact sizes, banner asset (icon), action (tertiary button/link), dismiss, and placement/use-case guidance.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 SectionBanner.docs.mdx follows PageHero + DocTabs (Design tab only populated)
- [x] #2 Stories include a Playground plus Variants, Sizes (Large/Compact), Action, and Dismiss sections
- [x] #3 All variant types are demonstrated
- [x] #4 No new typecheck errors in touched files
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added SectionBanner.stories.tsx (Playground + Variants, Sizes, Icon usage, Action, Dismissible, Stacking, Related components) and SectionBanner.docs.mdx (PageHero + DocTabs, Design tab only) under penny-docs/src/components/dataDisplay/SectionBanner/. Sourced from zeroheight 6649348. Theme was already registered. Verified in the running Storybook: the new "Data Display / Section Banner" category renders, 17 banner instances across the docs, no runtime errors. Typecheck: no new errors (baseline 27 → 26 after removing the compound-component `component` field from meta).

Re-applied zeroheight-to-storybook skill: added explicit <Do>/<Dont> RuleItem rules to the Icon section (sourced from the zeroheight icon-usage Do/Don't guidance) so the guidance renders with inline Penny SVG icons. Re-verified in Storybook — 17 banners render, Do/Don't rules render with icons, no errors; typecheck clean (26 baseline).

Presentation pass: reworked the Variants story to use the VariantCards/VariantCard block (live banner preview + per-variant 'when to use' guidance) instead of a plain stacked list. Each preview banner renders SectionBannerIcon (the StatusIconSolid Status Icon), so all seven semantic variants show their status icon in context. Verified in Storybook: 7 variant cards, 16 Status Icons across the page (the one icon-less banner is the intentional 'No icon needed' example), no errors; typecheck clean (26 baseline).

Feedback pass: (1) Added a backward-compatible `vertical` mode to VariantCard/VariantCards (preview stacked on top, white preview background, responsive grid) and switched the SectionBanner Variants story to <VariantCards vertical> with full-width banner previews. (2) Fixed the warning Status Icon in StatusIconSolid: the `warning` variant now renders a black (#18191b) rounded triangle with a white exclamation instead of an amber circle (matches Penny). Verified in Storybook: 7 vertical white-bg variant cards render; the warning banner's icon is a triangle path filled #18191b with no background circle; no errors; typecheck clean (26 baseline).

Reworked Variants section to match the provided zeroheight reference: each variant is now a two-column row — full Large banner (icon + title + body) in a neutral grey stage (#F8F9FA) on the left, variant name + role description on the right. Replaced the VariantCards usage with a bespoke grid layout; VARIANT_COPY now carries title/body/role. Verified in Storybook: 17 banners, no errors, typecheck clean (26). Two icon-level differences from the mock left for user decision: (a) warning Status Icon kept BLACK triangle per the user's explicit earlier instruction, though the reference shows an amber triangle; (b) outline/neutral/brand render the SectionBannerIcon component's 'help' (?) glyph whereas the mock shows an info 'i' — that mapping is component behavior, not changed.

Combined the Variants layout with the existing VariantCard block instead of a bespoke grid: added `whitePreview` and `previewMinWidth` props to VariantCard (defaults preserved for the Button page). Variants now render as VariantCards with a white component/preview area (previewMinWidth 400) holding the full banner on the left and the variant name + role on the right. Applied the same VariantCards treatment to the Sizes section (Large vs Compact cards, white preview). Verified in Storybook: 17 banners, Variants + Sizes render as white variant cards, no errors, typecheck clean (26). Warning Status Icon remains a black triangle pending the user's decision on amber-vs-black.

Centered the banner in the VariantCard thumbnail: the banner was already geometrically centered (L37/R36) but floated as a fixed 360px box inside a ~433px thumbnail, reading as off-center. Changed the preview wrappers (Variants + Sizes) to width:100% with maxWidth:400px so the banner fills and centers the thumbnail with symmetric ~16px padding (L17/R16). The maxWidth cap is required because a bare width:100% let the description's max-content blow the max-content grid column out to ~945px. Verified across cards; no errors; typecheck clean (26).

(A) Moved the Sizes guidance into the variant cards (card descriptions now carry the Large/Compact bullet text) and removed the duplicate bullet list from the MDX. (B) Rebuilt the Icon section as 'Banner asset' to match the ZH page: intro + asset-type cards (Icon asset / Brand symbol asset / Flag icon asset via SectionBannerIcon, a Google brand symbol, and a flag), an `### Illustration asset` DoDont (outline-only vs on-color), an `### When to use an icon` DoDont, and the 'Important — use only icons provided by Penny' callout. Added a DoDont import and ReactNode type import; removed the now-unused RuleItem import from the MDX. (C) Updated skill/zeroheight-to-storybook.md: noted the native penny MCP tools (list-pages/get-page) as preferred over curl; added a #1 structural-fidelity rule (mirror ZH section names/order and reproduce every subsection — the 'Banner asset' miss); documented VariantCard's whitePreview/previewMinWidth/vertical props and the width:100%+maxWidth centering caveat; added lessons on compound-component meta (omit `component`), StatusIconSolid warning=black triangle + flag mock-vs-component icon gaps, DoDont vs Do/Dont usage, and keeping per-item guidance in cards not duplicate bullet lists. Verified all in Storybook; no errors; typecheck clean (26 baseline).

Feedback round: (1) Brand icon — added a `brand` variant to StatusIconSolid (purple #7849ff + info glyph) and mapped SectionBannerIcon brand→brand, so the brand banner's Status Icon is now brand-colored. (2) Sizes — switched both size cards to the success variant. (3) Illustration asset — vendored a docs `Illustration` foundation component (inlines new-email.svg via ?raw, resolves penny-illustration-* classes to token hex; sizes small/medium/large) since the real one needs react-inlinesvg; the Illustration-asset Do/Don't now uses it. Added a `*.svg?raw` module declaration. (4) When-to-use-an-icon Do/Don't now uses the user-provided screenshots (renamed section-banner-do-01/dont-01 to .png, imagePreview). (5) Action section now uses VariantCards (Tertiary button / Link cards) and the MDX bullet list was folded into the cards. Verified live in Storybook: brand icon fill #7849ff, Illustration SVG inlined+themed, success Sizes, both Do/Don't PNGs load, Action cards render; no errors; typecheck clean (26 baseline).
<!-- SECTION:FINAL_SUMMARY:END -->
