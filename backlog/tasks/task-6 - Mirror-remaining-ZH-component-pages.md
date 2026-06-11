---
id: TASK-6
title: Mirror remaining ZH component pages
status: In Progress
assignee: []
created_date: '2026-06-10 13:15'
updated_date: '2026-06-11 06:30'
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
<!-- SECTION:NOTES:END -->
