---
id: TASK-6
title: Mirror remaining ZH component pages
status: In Progress
assignee: []
created_date: '2026-06-10 13:15'
updated_date: '2026-06-30 13:59'
labels:
  - docs
  - storybook
dependencies: []
ordinal: 11000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Incrementally document the remaining zeroheight component pages in Storybook, aiming for complete coverage. Build fastest-first: components already vendored locally (Group, Container, Panel, Base Sheet, Blanket), then vendor + document the rest from the penny snapshot (Containers: Modal, Drawer, Card, Popover, Menus, Floating, Stacked Container; Data display: Avatar, Badge, Tag, Currency, Status indicator, Tracker, Virtual card, Brand, Brand Symbol, Flag icon, Avatar group, Tourtip; Action: Split Button; Feedback: Linear/Circular Progress, Skeletons; Media; Selection & Inputs; Form/Table). Follow the zeroheight-to-storybook skill and established conventions. New pages get the orange needs-review dot.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Progress: Built Group + Container (Containers category) — already-vendored, no snapshot needed. Both verified in Storybook (Group 6 instances, Container 9), typecheck clean (26 baseline), orange needs-review dots added in manager.tsx.

Remaining already-vendored (no snapshot vendoring): Panel, Base Sheet (compound), Blanket (simple overlay).

Remaining requiring snapshot vendoring (penny--melio-penny-57.0.2) with dependency-closure analysis per the skill: Containers (Modal, Drawer, Card, Popover, Menus, Floating, Stacked Container); Data display (Avatar, Avatar group, Badge, Tag, Currency, Status indicator, Tracker, Virtual card, Brand, Brand Symbol, Flag icon, Tourtip); Action (Split Button); Feedback (Linear/Circular Progress, Skeletons); Media (Image, Video, Lottie); Selection & Inputs (~20 inputs); Form/Table.

Built + committed Panel (Containers) — placement/position + batch-action use case; verified live (6 instances, orange dot). Containers now: Container, Group, Panel done. Remaining local: Base Sheet (compound), Blanket (private overlay). Next: vendor low-risk Data display (Badge, Tag — note Tag needs a close-mini Icon glyph added; Badge needs ConditionalWrapper vendored).

Vendored + built Tag (Selection & Inputs) — opened the Selection & Inputs category. Added close-mini glyph to local Icon; registered tagTheme. Verified live (19 tags, 9 remove buttons via close-mini, no crash; orange dot). Committed ff326fe. Pages done so far: Containers (Container, Group, Panel) + Tag. Base Sheet deferred (portal/Blanket-override risk). Next candidates: Data display Badge (needs ConditionalWrapper vendored) / Avatar / Currency / Status indicator; Action Split Button.

Committed 826bd3b: Currency + Status Indicator (Data display) vendored + documented; added useIntl/Currency to penny-utils stub, STATUS_INDICATOR/ILLUSTRATION test-ids, registered currencyTheme/statusIndicatorTheme. Verified live (Currency renders $1,234 superscript-50; StatusIndicator 16 dots correct colors; both orange).

Component pages done this session: Containers (Container, Group, Panel), Tag (Selection & Inputs), Currency, Status Indicator.

Next candidates (increasing cost): Tracker (compound: TrackerStep + 2 themes + contexts, deps local), Badge (needs ConditionalWrapper + BadgeMarkBorder vendored), Avatar (needs Image + ConditionalWrapper). Heavy/deferred: Modal/Drawer/Popover/Menus/Floating/BaseSheet (portal+overlay, large closures), FlagIcon/BrandSymbol (react-inlinesvg), Select/Combobox/DatePicker & the Selection&Inputs form set, Media, Form/Table. 'Complete' remains a multi-session effort.

Committed eea9c66: Badge (Data display) — vendored Badge + BadgeMarkBorder + ConditionalWrapper (now available for Avatar etc.); registered badgeTheme; switched Badge off the internal barrel import. Verified live (placement story: green status mark at all 4 avatar corners; orange dot).

This turn committed: Currency, Status Indicator, Badge.

Tracker re-assessed = HEAVY (its TrackerStep pulls Avatar + BrandSymbol[react-inlinesvg] + RadioGroup + Typography) — deferred unless trimmed.

Next cheap batch: vendor Image (media — themed img + FallbackImage, no react-inlinesvg; its own ZH Media/Image page) which then unlocks Avatar (deps now all local: ConditionalWrapper+Image+Badge). So Image + Avatar = 2 pages next. Then Feedback (Skeletons/Progress) and Action Split Button. Still deferred/heavy: Modal/Drawer/Popover/Menus/Floating/BaseSheet, FlagIcon/BrandSymbol, Select/Combobox/DatePicker & inputs, Form/Table, Tracker.

Loader (Foundations) — done. Full docs page built: Playground+Controls, Colors, UseCaseScreenLoading, UseCaseAsyncAction, RelatedComponentsBlock. Next: Shadows (Foundations) — add Use cases + RelatedComponentsBlock to match Spaces quality.

Shadows (Foundations) — done. Added Use cases (shadow-500 floating menu demo with FloatingMenu/FloatingMenuDropdownList, shadow-600 modal mockup) + RelatedComponentsBlock (Borders, Border Radius, Color Tokens). Renamed 'Related components' → 'Related' across all story names and MDX headings. Verified live in Storybook.

Spaces (Foundations) — done. Fixed token mismatch (first use case was labelled spacing.xxs/4px but ZH maps status-indicator+label to spacing.xxxs/2px). Updated MeasuredGap size from 4→2. Changed pill background from #f1f5f8 to #fff for visibility against the gray container. Page has: SpaceTokens grid, Use cases (xxxs/xs/s/m with MeasuredGap annotations), RelatedComponentsBlock (Breakpoints). Verified live in Storybook.

Spaces (Foundations) — marked done. Moving to Spinner.

Spinner (Foundations) — done. Restructured Types section from bullet list to per-variant paragraphs with When-to-use guidance matching ZH. Moved Sizes text below canvas and expanded to bullet list. Added Enabled/Disabled as H3 subsections under States with Enabled description. Fixed Figma shortcut tile label (was 'DS Components'). Stories were already complete (Playground+Controls, Variants, Inverse, Sizes, Disabled, Related→Loader). No story changes needed.

Spinner (Foundations) — fully done. Added custom size note (numeric px), fixed Related block preview (was showing Spinner, now shows Loader).

Typography (Foundations) — done. Removed empty LINKS bar (ShortcutTiles + links prop stripped). Added Links section (reuses body2/body3, semantic.text.link + underline), Naked Buttons section (reuses body2Semi/body3Semi, no dedicated token), Recommendations section (subtitle text: body2 in semantic.text.primary). Existing stories (FontFamily, DisplayAndHeadings, Metrics, Body, Captions) unchanged — they already matched theme tokens accurately. Accessibility & DOM structure section kept at end.

Typography (Foundations) — fully done. Added table block to all type specimen stories (Display & Headings, Metrics, Body, Captions) matching SemanticTokenTable pattern: STYLE | TOKEN | SIZE / LINE HEIGHT | WEIGHT, with mobile note for responsive styles. Verified Links section against theme source: Large=body2/body2Semi 16px/24px, Medium=body3/body3Semi 14px/24px (line-height bumped from 20→24px for a11y click area), Inline variant inherits parent. Color token corrected to semantic.link.primary.rest. NakedButton: large=body2Semi 16px/24px, medium=body3Semi 14px/20px — confirmed correct.

Status icon solid (Foundations) — done.
<!-- SECTION:NOTES:END -->
