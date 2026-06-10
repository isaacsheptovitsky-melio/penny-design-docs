# Skill: ZeroHeight → Storybook

Convert a Penny component's ZeroHeight documentation page into a Storybook MDX docs page that follows the Penny documentation style guide.

## Usage

```
/zeroheight-to-storybook <ComponentName>
```

Example: `/zeroheight-to-storybook Button`

---

## Step-by-step process

### 1. Fetch ZeroHeight content

**Prefer the native `penny` MCP tools when available.** This environment now has the `penny` MCP server connected, exposing `mcp__penny__list-pages`, `mcp__penny__get-page` (pass a numeric `pageId`), and `mcp__penny__get-page-asset`. Use `list-pages` to find the page id, then `get-page` to read the authoritative content — it returns the same structured markdown as the curl path below. Reach for the raw JSON-RPC/curl fallback only if the MCP tools are unavailable (e.g. a headless/cron run).

Fallback — call the ZeroHeight MCP directly via JSON-RPC. **Important**: the server uses SSE transport — always pass `Accept: application/json, text/event-stream` and strip the `data: ` prefix from the response line.

```bash
# List all pages
curl -s -X POST "https://mcp.zeroheight.com/mcp/eb7e03ab629d92c564b33b6726bc5d0b5af86439" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"list-pages","arguments":{}}}' \
  | grep '^data:' | sed 's/^data: //' | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['result']['content'][0]['text'])"

# Fetch a specific page by ID  — pageId must be a NUMBER, not a string
curl -s -X POST "https://mcp.zeroheight.com/mcp/eb7e03ab629d92c564b33b6726bc5d0b5af86439" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"get-page","arguments":{"pageId":7163868}}}' \
  | grep '^data:' | sed 's/^data: //' | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['result']['content'][0]['text'])"
```

Available tools: `list-pages`, `get-page`, `get-page-images`.

### 2. Locate the component in the snapshot

Component source lives at:
```
penny--melio-penny-57.0.2/packages/penny/src/components/<category>/<ComponentName>/
```
Files to read: `ComponentName.tsx`, `ComponentName.types.ts`, `ComponentName.stories.tsx`.

If the component is already in `penny-docs/src/components/<category>/<ComponentName>/`, use that copy.

#### 2a. Vendoring a not-yet-copied component (and its dependencies)

If the component lives only in the snapshot, copy it plus its transitive deps into `penny-docs/src`. Before copying blindly, **measure the import closure** — some deps explode:

- A component may pull in heavy **optional** branches. ActionBar, for example, imports `ActionsDropdownMenu` (→ the entire `containers/menus` subtree) and `_IconIndicator` (→ the whole popover/floating tree) — ~950 files combined. If a branch is only used by a feature the docs page doesn't exercise, **trim that branch from the vendored source** rather than copying the whole library. Keep the core rendering exactly as authored.
- **Import hooks from their specific file, never the barrel.** `@/theme/hooks/use-style-config` is safe; `@/theme/hooks` (the barrel) re-exports `useIcons` / `useIllustrations` / `useLogos`, which drag in the provider chain → `ConfigProvider` → `react-inlinesvg` (not installed) and break the Vite build. If a copied file imports the barrel, switch it to the specific path.
- **Register multi-part themes** for the component AND any vendored deps (e.g. `Panel`) in both `components.theme.ts` and `theme/components.ts` — see Step 5. Register a theme for **every** vendored component whose source calls `useStyleConfig`/`useMultiStyleConfig('X', …)`, or it renders unstyled.
- **Stub any missing `@melio/penny-utils` exports** in `src/penny-utils/index.ts` (e.g. `useDelayMount`) for code that is imported but not rendered at runtime. Replicate the snapshot's real implementation where behavior matters.
- **A new external npm dep may be required.** Some components depend on a package not in `penny-docs/package.json` (e.g. `Menu` needs `@floating-ui/react`). Install it with `pnpm add <pkg>@<version-from-snapshot-package.json>` before vendoring.
- **Measure the closure with a tracer, then trust the compiler.** Write a quick Python import-graph tracer over the snapshot `src` to count files and list external packages before you start (so you know what you're signing up for). Then vendor, trim barrels, and run `pnpm typecheck` in a loop — tsc reports unresolved imports, which tells you exactly what still needs copying or rewriting. Don't hand-trace every file.
- **Beware substring false-matches when reading a closure.** A grep for `Floating` matches both `FloatingMenu` (needed) and `containers/Floating` (often NOT needed). Confirm a dir is actually in the import graph before copying it — `BasePopover` and `Floating` are **not** in the `Menu` closure despite the name overlap.

#### 2b. Worked example — vendoring the real `Menu` + `MenuItem`

The naive `Menu` closure is **~1,100 files** and references **13 uninstalled packages** because the menu barrels (`Context/components`, `FloatingMenu`) `export *` from heavy siblings (`SelectionItem` → Combobox → Select → Table → `downshift`/`@tanstack/react-table`/`react-hook-form`/`yup`). The real rendering spine is far smaller. To vendor it:

1. `pnpm add @floating-ui/react@<snapshot-version>`.
2. Copy only: `containers/menus/{Context, FloatingMenu, BottomSheetMenu, Menu}`, `internal/{Floater, Portal, Blanket}`, `containers/{Container, BaseSheet, LoadingContainer}`, `foundations/transitions/Fade`, and `dataDisplay/typography` **trimmed to just `_SectionLabel`** (what `_MenuTitle` uses). Reuse anything already vendored (Group, Text, Slide).
3. **Trim every barrel** to the spine: drop `ActionsDropdownMenu`/`FlatMenu`/`SelectableDropdownMenu`/`SortDropdownMenu` from `menus/index.ts`; drop `SelectionItem`/`Section` from `Context/components/index.ts`; drop `FloatingMenuActionTrigger`/`FloatingMenuSection`/`FloatingMenuSelectionItem`/`triggers/ActionTrigger` from the `FloatingMenu` barrels; drop `BottomSheetMenuSelectionItem`. Delete the dropped files so nothing re-imports them.
4. Register themes (both files): `BaseSheet`, `Blanket`, `BottomSheetMenu`, `FloatingMenu`, `LoadingContainer` (multi-style); `Container`, `DropdownList`, `MenuItem`, `_MenuFooter`, `_MenuTitle`, `_SectionLabel` (single-style).
5. Stub the `@melio/penny-utils` exports the spine needs: `isAndroid`, `isMobileDevice`, `noop`, `unionBy` (re-export from `es-toolkit`), `useBoolean`, `useDelayUnmount`.
6. `Menu` switches on `useBreakpoint()` — desktop renders `FloatingMenu`, mobile renders `BottomSheetMenu`. The preview decorator already wraps stories in `BreakpointProvider`, so a wide canvas gets the desktop floating dropdown. Verify the mobile bottom-sheet path separately by resizing the canvas to a mobile width.

Compose a **split button** by placing a `Button` and a `Menu` (whose `trigger` is an `IconButton icon="caret-down"`) under one `ButtonGroup` — the trigger merges into the group seam. `MenuItem` takes `label`, `leftElement`, `onClick`, `aria-label`.

### 3. Generate or update the stories file

The stories file drives the interactive canvases. Ensure it has:
- A `Playground` story (used for the hero canvas + Controls table)
- Dedicated stories for each visual section (variants, sizes, states grid, etc.)
- Rich `argTypes` with `description`, `table.type`, `table.defaultValue`, `table.category`

See `penny-docs/src/components/action/Button/Button.stories.tsx` as the canonical pattern.

### 4. Write the MDX docs file

File path: `penny-docs/src/components/<category>/<ComponentName>/<ComponentName>.docs.mdx`

Follow the **Page Structure** and **Style Guide** below.

**Content fidelity — copy ZeroHeight, don't invent.** The MDX should track the ZeroHeight page closely:
- **Mirror the ZH structure and section names exactly — this is the #1 fidelity rule.** Use the page's own headings verbatim (`## Banner asset`, not your own `## Icon`), keep the same section order, and reproduce **every** documented subsection and enumerated item. ZH's "Banner asset" section, for instance, contains an asset-type gallery (Icon / Brand symbol / Flag icon), an `### Illustration asset` do/don't, and a `### When to use an icon` do/don't — all of them belong on the page. Do not rename, merge, simplify, or drop ZH sections; if a section lists N items (variants, asset types, sizes), render all N. When in doubt, re-open the ZH page and diff its outline against your `##`/`###` headings before finishing.
- **Copy the ZH wording** for usage bullets, variant descriptions, tips, and callouts. Only adjust when the source is genuinely inconsistent or unclear, and prefer light edits (bold the key term, tighten a phrase) over rewrites.
- **Do not invent new content** — no extra do/don'ts, code recipes (router integration, etc.), prop guidance, or accessibility rules that aren't on the ZH page. It may be tempting because it's useful, but leave it out. If you believe added content genuinely helps, include it but **explicitly mark it as a proposal for the author to approve** (e.g. a `<Callout note>` prefixed "Proposal:") rather than presenting it as fact.
- **Strip when unsure.** If you can't tell whether a clarifier (a px value, a "this only applies to X" aside) is faithful to the source, remove it. Verbatim ZH phrasing stays (e.g. ZH's "Using Body3 style" → keep `Body3 style`); your own added specifics go.
- **Keep prop names inside the definitions** — weave the real prop/value names (`standalone`, `isBold`, `isDisabled`) into the prose so designers and devs share vocabulary.
- **Design tab only.** Never populate Development or ADA — even when ZH has an Accessibility section, and even when revising an **older page** that already has populated Dev/ADA tabs: strip them back to empty `<DocTab>` shells. Remove any imports (e.g. `ArgTypes`) left unused after stripping.
- The design-guideline components (`VariantCards`, `RelatedComponents`, `StatesGrid`, …) are referred to as **"blocks"** to distinguish them from Penny product components. When a reviewer says "use the variant block" they mean `<VariantCards>`. Reach for a block (e.g. `VariantCards` for a Color/Type section) instead of ad-hoc bordered-grid markup.

### 5. Register the theme

When adding a new component, register its theme in two places:

**`penny-docs/src/components/components.theme.ts`** — add the export:
```ts
export { nakedButtonTheme } from './action/NakedButton/NakedButton.theme';
```

**`penny-docs/src/theme/components.ts`** — add to the correct map:
- `MultiStyleComponents` for components using `ComponentMultiStyleConfig` (multiple theme parts)
- `SingleStyleComponents` for components using `ComponentSingleStyleConfig` (single style object)

```ts
const MultiStyleComponents = {
  Button: buttonTheme,
  NakedButton: nakedButtonTheme,  // ← add here
  ...
};
```

### 6. Typecheck and verify

```bash
cd penny-docs && pnpm typecheck 2>&1 | grep "<ComponentName>"
```

Only fix errors in files you touched. The baseline has pre-existing errors from the theme system — do not count those.

---

## Page structure

Every component docs page follows this exact section order. Only omit a section if the ZeroHeight page genuinely has no content for it.

```
1. PageHero            — category, title, badge, description
2. <DocTabs>           — three audience tabs wrapping all content below the hero
   ├── Design tab
   │   ├── Canvas (Playground) — hero interactive story
   │   ├── Controls            — props-only table, directly below Canvas, no heading
   │   ├── ShortcutTiles       — Figma link (+ any other external links)
   │   ├── ## Usage            — bullet list of do/don't rules
   │   ├── ## Variants         — summary bullets + VariantHierarchy cards (combined) + ### Inverse + ### States grid
   │   ├── ## Sizes            — prose + <Canvas Sizes> + size bullets
   │   ├── ## [Feature]        — one section per significant feature (icons, loading, etc.)
   │   ├── ## [Pattern]        — UX patterns (critical confirmation flow, etc.)
   │   ├── ## Desktop usage    — width + placement + do/don't rules
   │   ├── ## Mobile usage     — width + stacking rules
   │   └── ## Related components — RelatedComponents card grid (the ZH "Related components" set), last in the Design tab
   ├── Development tab        — LEAVE EMPTY (do not populate)
   └── ADA tab                — LEAVE EMPTY (do not populate)
```

> **Legacy pages**: some earlier pages populated the Development tab (e.g. "… as link", Props/`<ArgTypes>`) and the ADA tab (Accessibility). These predate the empty-tabs rule — when you touch such a page, **empty both tabs** and delete any stories that only fed them (e.g. an orphaned `…AsLink` story), keeping all Design-tab content.

---

## Style guide

### Typography & prose

- **Docs UI font**: Nunito Sans — applied via `.sbdocs { font-family: 'Nunito Sans', sans-serif }` in `preview-head.html`. This uses CSS inheritance with **no `!important` and no `*` selector**, so Penny component styles (Poppins) win naturally via cascade order.
- **Component font**: Penny components use Poppins (the design system font), set in `src/theme/foundations/fonts.ts`. Both fonts are loaded from Google Fonts in `preview-head.html`.
- **Never add `fontFamily` to any inline style** in docs UI components (MDX, storybook-utils, DocComponents). Docs elements inherit Nunito Sans from `.sbdocs`; Penny components apply Poppins through their theme.
- **Section headings** (`##`) use the custom `H2` component: 24px, weight 700, no border (fill only).
- **Subsection headings** (`###`) use `H3`: 17px, weight 600, no border.
- **Horizontal rules** (`---`) render as `1px solid #E2E8F0` dividers between major sections.
- **Inline code** renders with purple text on light lavender background.
- Keep prose short. Prefer bullets over paragraphs. Bold the key term at the start of each bullet.
- Prefer bullet lists over tables. GFM markdown tables (`| col | col |`) do **not** render — `remark-gfm` is not wired into addon-docs, so they show as literal text (see notes at the bottom). Use prose/bullets or styled HTML instead.

### Components reference

All components are imported from `@/storybook-utils/<Name>`.

#### `<DocTabs>` + `<DocTab>`
Three-tab wrapper that organizes docs by audience: **Design**, **Development**, **ADA**. Wraps everything below the `<PageHero>`.

```tsx
import { DocTabs, DocTab } from '@/storybook-utils/DocTabs';

<DocTabs>
  <DocTab label="Design">
    {/* Canvas, Controls, ShortcutTiles, Usage, Variants, Sizes, patterns, Desktop/Mobile */}
  </DocTab>
  <DocTab label="Development">
    {/* Leave empty — do not populate */}
  </DocTab>
  <DocTab label="ADA">
    {/* Leave empty — do not populate */}
  </DocTab>
</DocTabs>
```

Rules:
- Always use exactly these three labels in this order.
- **Only populate the Design tab.** Leave the Development and ADA tabs empty — render `<DocTab label="Development"></DocTab>` and `<DocTab label="ADA"></DocTab>` with no content. All three tabs must still be present, but Development and ADA are intentionally blank (no Anatomy, Props, or Accessibility sections).
- The Design tab is the default (active on load).
- Non-props Controls categories (accessibility, events, tests) auto-collapse via the `preview-head.html` MutationObserver — no story-level config needed.
- All markdown content (headings, bullets, code blocks, `<Canvas>`, `<Callout>`, etc.) works inside `<DocTab>` as long as there are blank lines between the JSX tag and the markdown.
- Do **not** use `---` horizontal rules inside `<DocTab>` — section spacing is sufficient.

---

#### `<PageHero>`
The page header. Required on every component page.

```tsx
<PageHero
  category="Action"           // component category, title-case
  title="Button"              // component name
  badge="Healthy"             // "Healthy" | "Beta" | "Deprecated" | "Experimental"
  description="The Button component is used to…"
/>
```

Badge colors: Healthy → green, Beta → yellow, Deprecated → red, Experimental → purple.

---

#### `<ShortcutTiles>` + `<ShortcutTile>`
Row of link cards below the hero canvas. Always include the Figma link.

```tsx
<ShortcutTiles>
  <ShortcutTile label="Figma" url="https://www.figma.com/…" icon="🎨" />
  <ShortcutTile label="Storybook" url="https://penny.melio.com/…" icon="📖" />
</ShortcutTiles>
```

---

#### `<RelatedComponents>` + `<RelatedComponent>`
Card grid for the **Related components** section at the bottom of the Design tab — mirrors the related-components block on the ZeroHeight page. Each card shows a **live preview** of the sibling component on top and its name below, and links to that component's docs page.

```tsx
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';

<RelatedComponents>
  <RelatedComponent name="Button" url="/?path=/docs/components-action-button--docs"
    preview={<Button label="Label" variant="primary" />} />
  <RelatedComponent name="Naked Button" url="/?path=/docs/components-action-naked-button--docs"
    preview={<NakedButton label="Label" variant="primary" />} />
  <RelatedComponent name="Navigation Item" url="/?path=/docs/components-navigation-navigation-item--docs"
    preview={<NavigationItem isSelected>…</NavigationItem>} dark={false} />
</RelatedComponents>
```

Rules:
- The previews are **live Penny components**, so this MUST live in a story `render()` and be referenced from MDX with `<Story of={Stories.RelatedComponentsBlock} />` (never inline in MDX — Chakra context). Set `controls: { disable: true }` and `docs: { canvas: { sourceState: 'none' } }`.
- Match the set of related components ZeroHeight lists for the page, and link to the **local docs pages** (relative `/?path=/docs/<id>--docs`), not the ZH URLs. Story ids derive from the component title (e.g. `Components/Action/Naked Button` → `components-action-naked-button`).
- Pass `dark` for an inverse component whose preview needs a dark backdrop.
- Prefer this block over plain `<ShortcutTiles>` for the Related components section.
- **Every related component must itself be documented** — a Related components card links to a local docs page, so that page has to exist. If ZeroHeight lists a sibling that isn't documented yet, **vendor and document it too** (don't drop it from the set and don't link to a missing page). If that sibling has no ZeroHeight page of its own but is a real, public-facing component, document it from its API per the "component with no ZeroHeight page" note: badge it `Experimental` (or `Beta`), and open the Design tab with a `<Callout note>` stating the docs are derived from its API. This can cascade — vendoring one related component may surface its own related set; follow it until every linked card resolves.
  - **Exception — internal/private primitives.** If the sibling is an internal, low-level primitive (its source is marked `@private`/"For internal use only", e.g. `NavigationList`), **don't** give it a docs page. **Omit it from the related set** instead — drop the card rather than linking to a page that shouldn't exist. The related set then intentionally diverges from ZeroHeight's list; that's expected, since ZeroHeight surfaces primitives the component docs deliberately don't.

---

#### `<Callout>`
Highlighted note boxes. Use sparingly — one per section maximum.

| Variant | Color | Icon | When to use |
|---------|-------|------|-------------|
| `note` | Blue | info circle | Neutral information, usage suggestions, best-practice advice, placeholder for missing Figma images. `variant="note"` and `variant="tip"` are aliases — both work identically. |
| `success` | Green | filled check circle | Guidelines that allow something ("it's okay to break the rule") |
| `warning` | Amber | warning triangle | Warnings about common mistakes. `variant="warning"` and `variant="caution"` are aliases — both work identically. |
| `critical` | Red | alert circle | Destructive or irreversible action warnings |

Icons are inline SVGs in each variant's semantic color (blue-700, Melio green, amber-700, rose-700). **Never use emojis** in Callouts — the component renders Penny-style SVG icons automatically.

Callouts have **no border** — fill color only.

```tsx
<Callout variant="note">Short, specific insight. No more than 2 sentences.</Callout>
```

---

#### `<VariantCard>` + `<VariantCards>`
Two-column card for the Hierarchy section. Left panel shows a live component; right panel explains the variant's role.

```tsx
<VariantCards>
  <VariantCard
    preview={<Button label="Primary" variant="primary" />}
    title="Primary — The Revenue Generator"
    dark={false}   // true for inverse variants (renders dark bg on left)
  >
    One-line description of what this variant is for.
    <ul style={{ margin: '8px 0 0', paddingLeft: '16px' }}>
      <li><strong>Logic</strong> — why this variant exists</li>
      <li><strong>Constraints</strong> — what it must/must not be paired with</li>
      <li><strong>Examples</strong> — Pay, Create invoice, Approve</li>
    </ul>
  </VariantCard>
</VariantCards>
```

Rules:
- Always render this inside a story's `render()` function (not inline MDX) because it wraps live Chakra components that need the theme provider.
- Use `dark={true}` only for `*-inverse` variants.
- Include all variants that have a meaningful UX role (skip `success` if ZH doesn't document it separately).

Extra props (added during the Section Banner pass):
- **`whitePreview`** — render the left preview surface white (`#fff`) instead of the default light-grey (`#F8F9FA`). Use it whenever the previewed component **carries its own background** (Section Banner, Pill, anything with a fill) so the grey stage doesn't muddy it. The grey default stays for bare components like Button.
- **`previewMinWidth`** (default `150`) — minimum width (px) of the preview/component cell in the horizontal layout. Bump it (e.g. `400`) when the preview is a wide component like a banner so the thumbnails line up.
- **`vertical`** (on `<VariantCards vertical>`, propagated to each card) — stacks the preview on top of the text as a single boxed card laid out in a responsive grid, instead of the side-by-side rows. The vertical preview surface is white.
- **Filling + centering a wide component in the thumbnail.** To make the component fill the thumbnail and sit centered, wrap the preview in `width: '100%'` **with a `maxWidth` cap** (e.g. `maxWidth: '400px'`). A bare `width: '100%'` is a trap: `VariantCards` uses a `max-content` grid column, and a text-heavy component (a banner with a long description) reports a huge max-content, blowing the preview column out to ~900px+ and squashing the text column. The `maxWidth` bounds the column; the cell's `justify-content: center` then centers it with symmetric padding. (A fixed `width: '360px'` also bounds it but leaves slack and reads as off-center.)

---

#### `<VariantGrid>` + `<VariantGridItem>`
The **consolidated** alternative to `VariantCards` — use it when variants are self-explanatory and don't each need a paragraph of side text. Instead of stacked two-column cards, it spreads the previews evenly across the width (wrapping as needed), each with just a label underneath — the same shape as a "Sizes" row.

```tsx
import { VariantGrid, VariantGridItem } from '@/storybook-utils/VariantGrid';

<VariantGrid>
  <VariantGridItem label="Primary"><IconButton icon="add" variant="primary" aria-label="Add" /></VariantGridItem>
  <VariantGridItem label="Tertiary"><IconButton icon="add" variant="tertiary" aria-label="Add" /></VariantGridItem>
  <VariantGridItem label="Naked inverse" dark><IconButton icon="add" variant="naked-inverse" aria-label="Add" /></VariantGridItem>
</VariantGrid>
```

- **`VariantCards` vs `VariantGrid`**: reach for `VariantCards` when each variant needs its own rationale (logic, constraints, examples); reach for `VariantGrid` when you just want to show them all at a glance.
- **Surface — off by default; don't double-wrap.** The grid draws no surface of its own; it inherits its container. In a component page the `<Canvas>` already provides the white preview surface, so leave `surface` off — adding it would box-in-a-box. Pass `surface` only when the grid is **standalone** (inline in MDX, no Canvas) and needs its own white card.
- **`dark`** draws a dark surface (always — inverse variants need a dark backdrop against the white canvas) and lightens the labels. Mix light + inverse by using two grids: a plain `<VariantGrid>` and a `<VariantGrid dark>`.
- `minItemWidth` (default 120) sets the item width before the grid wraps.
- Like `VariantCards`, render it inside a story's `render()` (it wraps live components needing the theme provider).

---

#### `<StatesGrid>` + `<StatesGridRow>` + `<StatesGridCell>`
Labeled grid showing all interactive states per variant. Default columns: Rest, Hover, Pressed, Loading, Disabled.

If the component has **no loading state**, pass custom columns to omit it:

```tsx
const MY_COLUMNS = [
  { label: 'Rest', tooltip: 'The default appearance' },
  { label: 'Hover', tooltip: 'When the user points at it with the cursor' },
  { label: 'Pressed', tooltip: 'The moment it is clicked or tapped' },
  { label: 'Disabled', tooltip: 'When the action is unavailable' },
];

<StatesGrid columns={MY_COLUMNS}>
  <StatesGridRow label="Primary">
    <StatesGridCell><Button label="Button" variant="primary" /></StatesGridCell>
    <StatesGridCell forceState="hover"><Button label="Button" variant="primary" /></StatesGridCell>
    <StatesGridCell forceState="active"><Button label="Button" variant="primary" /></StatesGridCell>
    <StatesGridCell><Button label="Button" variant="primary" isDisabled /></StatesGridCell>
  </StatesGridRow>
</StatesGrid>
```

Use `dark` prop on `StatesGridCell` for inverse/invert variants:
```tsx
<StatesGridCell dark><Button label="Button" variant="primary-inverse" /></StatesGridCell>
```

`forceState="hover" | "active"` simulates those states. **It only works because `StatesGridCell` clones the `data-hover` / `data-active` attribute onto its child component** — Penny's `_hover` / `_active` compile to Chakra selectors on the element itself (`&[data-hover]`), so the attribute must land on the rendered component, not a wrapper. The component must spread unknown props onto its styled root (Button / IconButton / NakedButton all do) for the forced state to render. If a new component swallows props, `forceState` will silently show the rest appearance — verify hover/pressed actually differ (e.g. via `getComputedStyle().backgroundColor`), don't trust the screenshot alone.

Always render inside a story. Reference from MDX with `<Story of={ComponentStories.ButtonStates} />`.

---

#### `<PartCallout>`
Wraps a single element and places a dot → line → label **below** it (or above, as an overlay). Use in anatomy diagrams and token architecture pages to tie a label to a specific visual point.

```tsx
// Below (default) — label stacked under the element
<PartCallout label="button.primary.bg">
  <Button label="Button" variant="primary" />
</PartCallout>

// Above — label overlaid on top, element fills the background
<PartCallout label="button.primary.bg" placement="above">
  <Button label="Button" variant="primary" />
</PartCallout>
```

Props: `label` (string), `lineHeight` (number, default 16), `panelBg` (string, default `'#F8F9FA'`), `placement` (`'below'` | `'above'`, default `'below'`), `children` (ReactNode).

**When to use** — Pointing at one named part in an anatomy diagram, or showing which token drives a visual property on a standalone rendered element.

**When NOT to use** — Annotating an element that already lives inside a rendered UI mockup (a row, a drawer, a card). `<PartCallout>` wraps its child and adds vertical space, which distorts the surrounding layout. Use **Inline Overlay Annotations** instead.

---

#### Inline Overlay Annotations

A pure-CSS positioning pattern — not a React component — for annotating specific points inside a rendered UI mockup (prop values, placement rules, visual states) **without distorting the layout**. The visual is the back layer; the annotation is a transparent front layer.

**Core rule**: Wrap the card and the annotation together in `position: relative`. The annotation is a **sibling** of the card (not a child), so the card's `overflow: hidden` never clips it. Always `pointer-events: none`.

**Dot placement rule**: Always place the dot in whitespace — **never over text**. Safe locations:
- **Right padding strip** — gap between a right-aligned button and the card's right border
- **Left padding strip** — gap between the card's left border and a left-aligned button
- **Space-between gap** — empty area between two `justifyContent: space-between` siblings

##### Right-side annotation
For elements near the **right edge** of the card. DOM order `[dot][line][label]` — elements flow left→right, label exits outside the card.

`left: 'calc(100% - Xpx)'` where X = half the right padding (e.g. `10px` for a `20px` right pad).

```tsx
<div style={{ position: 'relative' }}>
  <div style={{ ...CARD, overflow: 'hidden' }}>
    {/* your visual — unchanged */}
  </div>
  {/* annotation sibling — never clipped by the card's overflow:hidden */}
  <div style={{
    position: 'absolute',
    top: `${elementCenterY}px`,   // measured from wrapper top = card top border
    left: 'calc(100% - 10px)',    // dot in right padding strip (half of 20px pad)
    transform: 'translateY(-50%)',
    display: 'flex', alignItems: 'center', gap: '4px', pointerEvents: 'none',
  }}>
    <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#9CA3AF', border: '1px solid white', flexShrink: 0 }} />
    <div style={{ width: '32px', height: '1px', background: '#D1D5DB', flexShrink: 0 }} />
    <span style={{ fontFamily: '"SFMono-Regular", Consolas, monospace', fontSize: '10px', color: '#6B7280', whiteSpace: 'nowrap' }}>variant="primary"</span>
  </div>
</div>
```

##### Left-side annotation
For elements near the **left edge** of the card. DOM order `[label][line][dot]` — dot is rightmost (lands in left padding), label exits outside the card on the left.

`right: 'calc(100% - Xpx)'` anchors the container's right edge inside the left padding strip. Set X to half the left padding (e.g. `14px` for a `24px` left pad).

```tsx
<div style={{ position: 'relative' }}>
  <div style={{ ...CARD, overflow: 'hidden' }}>
    {/* your visual — unchanged */}
  </div>
  <div style={{
    position: 'absolute',
    top: `${elementCenterY}px`,
    right: 'calc(100% - 14px)',   // dot in left padding strip (half of 24px pad)
    transform: 'translateY(-50%)',
    display: 'flex', alignItems: 'center', gap: '4px', pointerEvents: 'none',
  }}>
    <span style={{ fontFamily: '"SFMono-Regular", Consolas, monospace', fontSize: '10px', color: '#6B7280', whiteSpace: 'nowrap' }}>label text</span>
    <div style={{ width: '32px', height: '1px', background: '#D1D5DB', flexShrink: 0 }} />
    <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#9CA3AF', border: '1px solid white', flexShrink: 0 }} />
  </div>
</div>
```

##### Calculating `top`

`top` = (sum of heights of all elements above target row) + target row top-padding + (target element height ÷ 2)

| Element | Height |
|---|---|
| Table header (`padding: '10px 20px'`, 11px text) | ≈ 36px |
| Table row (`padding: '12px 20px'`, 32px avatar) | ≈ 57px |
| Button `size="small"` | 32px |
| Button `size="medium"` | 40px |
| Drawer header (`padding: '20px 24px 16px'`, 40px avatar) | ≈ 77px |

Visual spec — all annotations use: dot 3×3px `#9CA3AF` fill + `1px solid white` halo · line 32×1px `#D1D5DB` · label 10px SFMono `#6B7280` `whiteSpace: nowrap` · `gap: 4px` between every element.

---

### Canvas usage

| Story type | MDX usage | `sourceState` |
|---|---|---|
| Interactive playground | `<Canvas of={Stories.Playground} />` then `<Controls of={Stories.Playground} />` immediately after, no heading | default (shown) |
| Layout stories (Hierarchy, States, Inverse) | `<Canvas of={Stories.VariantHierarchy} />` | `"none"` — set in story `parameters` |
| Feature demos (Sizes, WithElements, FullWidth) | `<Canvas of={Stories.Sizes} />` | default |

**`<Canvas>` vs `<Story>` — framed vs bare.** `<Canvas of={…} />` wraps the story in Storybook's bordered preview container (the grey frame with the show-code toolbar); `<Story of={…} />` renders it inline with **no frame**. Use `<Canvas>` for every feature/state demo (Sizes, IconButtons, SharedState, AsSplitButton…) so the sections are visually consistent. Use `<Story>` only for `VariantCards`-based stories (Hierarchy, variant guides) — those cards already draw their own borders, so a `<Canvas>` frame would double up. If sections look inconsistently boxed, it's almost always a stray `<Story>` that should be `<Canvas>`.

The `Playground` story uses `controls.include` to show **only props-category items** in the Design tab Controls table. Non-props categories (accessibility, events, tests) are documented in the Dev tab via `<ArgTypes>`.

```tsx
export const Playground: Story = {
  name: 'Playground',
  parameters: {
    controls: {
      include: ['label', 'variant', 'size', 'isDisabled', 'isLoading', 'isFullWidth', 'leftElement', 'rightElement', 'link'],
      // list only the argTypes whose table.category is 'props'
    },
  },
};
```

Set `sourceState: 'none'` and `controls: { disable: true }` on layout stories:

```tsx
parameters: {
  controls: { disable: true },
  docs: { canvas: { sourceState: 'none' } },
},
```

---

### Anatomy section — when to include

> **Deprecated:** the Development and ADA tabs are left empty (see the DocTabs rules above), so Anatomy / Props / Accessibility sections are no longer added to pages. This guidance is retained for reference only.

Include `## Anatomy` only when it would meaningfully help a designer or developer use the component correctly. Apply this test: **if a reader could understand all the parts just by reading the props table, skip anatomy.**

Include anatomy when at least **2** of these are true:

| Criterion | Examples |
|---|---|
| **3+ named sub-parts** with distinct behavior, constraints, or a11y implications | Modal (header/body/footer), Form Field (label/input/helper/error) |
| **Independent slot structure** — content areas the consumer fills separately | Card, Dialog, Popover, Page Layout |
| **Part names are referenced later** in the same docs page ("the trigger", "the overlay") | Select, Tooltip, DatePicker |
| **Spatial layout affects usage** — knowing *where* a part lives changes design decisions | Badge placement on Avatar, focus ring position on complex controls |
| **Parts have independent ARIA roles or keyboard behaviors** | Combobox (input + listbox), Tabs (tablist + tabpanel), Disclosure |

**Skip anatomy for:** Button, Icon, Badge, Tag, Avatar, Spinner, Divider, Checkbox, Switch, Radio — their structure is self-evident from the props.

When anatomy IS included, use this pattern (Figma screenshot pending):

```mdx
## Anatomy

<Callout variant="note">**Image to be added** — screenshot from Figma showing: [part names].</Callout>

The [component] is made up of:
- **[Part]** — [one-line description of its role and any constraint].
```

---

### Variants section pattern

```mdx
## Variants

[N] semantic variants are available. Pick based on **intent**, not colour.

| Variant | Use when |
|---|---|
| `primary` | … |
| `secondary` | … |

<Canvas of={ComponentStories.Variants} />

### Hierarchy

[One-sentence framing of the hierarchy concept.]

<Canvas of={ComponentStories.VariantHierarchy} />

### Inverse

[When inverse variants are used — one sentence.]

<Canvas of={ComponentStories.InverseVariants} />

### States

[One sentence. Note that hover/pressed are interactive-only.]

<Canvas of={ComponentStories.ButtonStates} />

### Disabled state

[One sentence about disabled appearance + Canvas + guidance note + Callout note about WCAG.]
```

---

### Do/Don't rules

Use the `<Do>` and `<Dont>` components from `@/storybook-utils/RuleItem`. These render inline Penny SVG icons in Melio brand colors (`#028838` green / `#D80E25` red) — never use emoji (✅/❌).

```mdx
import { Do, Dont } from '@/storybook-utils/RuleItem';

<Do>place the delete action at the row level so it's always scoped to a single item.</Do>

<Dont>place a bulk "Delete all" action unless the user has first selected specific items with checkboxes.</Dont>
```

Group related do/don'ts under a `###` subheading. At most 3 per subheading.

`DoDont` items require a `preview` (a visual/image) per item — without one the preview row renders empty cells. If you have no do/don't imagery, use plain Usage bullets instead.

---

### Accessibility section pattern

> **Deprecated:** the ADA tab is left empty (see the DocTabs rules), so this Accessibility section is no longer added to pages. Retained for reference only.

```mdx
## Accessibility

- **Keyboard**: `Tab` to focus, `Space`/`Enter` to activate.
- **Focus ring**: a 2px offset focus ring renders on `:focus-visible`.
- **Semantics**: [what HTML element is rendered and why].
- **[State]**: [what ARIA attribute is set and when].
- **Icon-only**: provide `aria-label` when no visible label is present.
```

---

## ZeroHeight content mapping

| ZeroHeight section | MDX section | Component/pattern |
|---|---|---|
| Component intro / description | `PageHero description` | `<PageHero>` |
| Usage guidelines | `## Usage` | Bullet list |
| Anatomy / structure | `## Anatomy` | `<Callout note>` + bullet list |
| Variants table | `## Variants` | Bullet list (markdown tables don't render — see notes) |
| Variant previews | `### Hierarchy` | `<VariantCards>` + `<VariantCard>` |
| Inverse variants | `### Inverse` | `<VariantCards dark>` |
| States (rest/hover/pressed/loading/disabled) | `### States` | `<StateRow>` + `<StateCell>` |
| Disabled usage rules | `### Disabled state` | `<Canvas>` + `<Callout note>` |
| Sizes / dimensions | `## Sizes` | `<Canvas>` + markdown table |
| Icons / slots | `## Left and right elements` | `<Canvas>` + prose |
| Destructive / critical flow | `## Critical button UX pattern` | Numbered list |
| Desktop layout rules | `## Desktop usage and treatment` | Prose + do/don't rules |
| Mobile layout rules | `## Mobile usage and treatment` | Prose |
| Link behavior | `## [Component] as link` | Code snippet + `<Canvas>` |
| Accessibility notes | `## Accessibility` | Bullet list |
| Props / API | `## Props` | `<ArgTypes of={Stories} />` |

---

## Design rules (enforced project-wide)

These are non-negotiable constraints established for the project. Never deviate from them.

- **Borders**: always `1px solid #E2E8F0`. Never `rgba(...)`, never `2px`.
- **Preview-surface backgrounds — white by default**: any block that displays **live components** uses a **white** (`#ffffff`) surface (VariantGrid, VariantCard preview column, states cells, the playground canvas). Components are designed for white/neutral surfaces, so white shows them truthfully. Use a **gray** surface (`#F3F4F6` / `#F8F9FA`) only when you're *not* previewing a component on it directly:
  - **Simulating a real app page behind a component that has its own surface** (cards, modals, drawers, layouts, ActionBar — the STAGE pattern): gray represents the page so the white-surfaced component stands out instead of disappearing into it.
  - **Non-preview docs chrome**: section/column headers, code blocks, the Controls wrapper.
  - For variants that only make sense on dark/brand surfaces (`*-inverse`), use the **dark** surface (`#0F0728`), not white or gray.
- **Fills, not strokes**: H2 headings, `<th>` cells, and Callouts use **background fill only** — no `borderBottom` or `border` on these elements.
- **Border radius**: 8px everywhere (canvas boxes, tables, callouts, cards). Tables require `border-collapse: separate; border-spacing: 0` for `border-radius` to render.
- **Font rules — two separate contexts**:
  - *Docs UI / MDX prose* (storybook-utils components, MDX headings, body text): **never** set `fontFamily` inline. Nunito Sans is inherited from `.sbdocs`; Penny components apply Poppins through their theme.
  - *Story `render()` mockup text* (the custom HTML elements you build to simulate a UI — labels, headings, body text in cards, drawers, modals): **always** set `fontFamily: 'Poppins, sans-serif'` on the outermost wrapper `div` so all mockup text inherits Poppins rather than the docs Nunito Sans. Penny components inside the story already receive Poppins from the theme — this rule only applies to the surrounding mockup HTML you write.
- **Browser button resets**: Any component rendered as a native `<button>` must reset browser defaults in the theme's `baseStyle` (`background`, `border`, `padding`, `cursor`). Penny relies on Chakra's global CSS reset for this, which this docs project does **not** apply — so without the reset, the browser's default button styling (grey `#efefef` fill, `2px outset` border) leaks through. It only shows on variants that set **no background or border of their own** (e.g. IconButton `naked` / `naked-inverse`); variants with their own fill/border accidentally mask the bug, so check the bare variants specifically.
  - **Use this project's type-clean token forms**, not the bare CSS values, or you'll get cascading `InternalCSSObject` type errors: `backgroundColor: 'transparent'` (not `background: 'transparent'`) and `border: 'global.none'` (not `border: 'none'`). `padding: 0` also errors — prefer a space token or omit it when fixed `width`/`height` + flex centering already position the content. (`NakedButton.theme.ts` uses the bare forms and carries baseline type errors as a result — don't copy that pattern.)

---

## Button variant rules (authoritative — from ZeroHeight)

ZeroHeight defines these variant semantics precisely. Always apply them when building demos or writing implementation checklists.

| Variant | Use for | Never use for |
|---|---|---|
| `primary` | The single highest-value CTA that advances the user's primary financial goal (Pay, Create invoice, Approve) | Cancel, Edit, Copy, or any neutral/utility action |
| `secondary` | Positive, workflow-extending actions that **directly support** a primary CTA in the same container (e.g. "Save draft" beside "Publish") | Cancel, Delete, Edit Details, Copy, or any neutral action |
| `tertiary` | Independent, neutral, or supplementary actions — **including Cancel, Edit [noun], Copy Link, View History** | Nothing financial/primary |
| `critical` | The destructive confirm button inside a modal, and the delete trigger in lists/drawers | Any non-destructive action |

Key consequences:
- **Cancel** in any modal or dialog = `variant="tertiary"` — never `secondary`
- **Edit [noun]** in a drawer footer or row = `variant="tertiary"` — it's a utility action, not a primary CTA
- **Secondary** requires an actual primary CTA paired in the same action group — if there's no primary, don't use secondary

---

## Interactive demo conventions

When writing multi-step interactive demos (stories that show a flow end-to-end), follow these patterns.

### STAGE — the demo container

Wrap each step's visual area in a consistent "stage" container. All steps must have the same outer height (use `height` + `boxSizing: 'border-box'` so padding doesn't affect the total).

```tsx
const STAGE: React.CSSProperties = {
  border: '1px solid #E2E8F0',
  borderRadius: '12px',
  overflow: 'hidden',
  boxSizing: 'border-box',
};

// Step 1/2 (trigger + modal) — grey bg simulates a real app page
<div style={{ ...STAGE, background: '#F3F4F6', position: 'relative',
              height: '380px', display: 'flex', flexDirection: 'column',
              justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
  {/* card or modal */}
</div>

// Result / success step — same dimensions
<div style={{ ...STAGE, background: '#F3F4F6',
              height: '380px', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
  {/* success state */}
</div>
```

Rules:
- All steps use **identical `height`** (e.g. `380px`) with `boxSizing: 'border-box'` — so padding differences don't cause layout shifts between steps.
- Steps 1–N (active flow): `background: '#F3F4F6'` (grey, simulates a real app page behind the content).
- Result/success step: same grey background for visual consistency.
- A step-label (`fontSize: 11px`, `fontWeight: 700`, `textTransform: uppercase`, `color: '#8B95A9'`) sits above each stage and changes with the step.

### Dropdowns inside a STAGE — override overflow

The `STAGE` constant sets `overflow: 'hidden'`, which clips absolutely-positioned dropdown menus and floating elements. When the stage contains a dropdown or any popover that should escape the frame, override `overflow` after spreading STAGE:

```tsx
<div style={{
  ...STAGE,
  overflow: 'visible',   // ← override: lets dropdown menu render above the stage boundary
  background: '#F3F4F6',
  position: 'relative',
  height: '380px',
  // ...
}}>
```

The stage's own `border-radius` still renders on the element itself — only children can now overflow the boundary.

---

### Modal overlay inside a STAGE

The overlay is absolutely positioned, fills the STAGE, and has padding to show the dimmed backdrop around the dialog:

```tsx
const OVERLAY: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  background: 'rgba(24,25,27,0.45)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  padding: '50px',   // dark backdrop visible around the modal on all sides
};
```

Size the STAGE so the modal fits within the overlay with comfortable padding:
- STAGE width ≥ modal width + (overlay padding × 2). Example: 480px modal + 100px = 580px minimum.
- Column `maxWidth` should match (e.g. `620px`).

### Result state — centered icon (default)

Use Penny's `checked-circle-fill` icon SVG inline at 48px in Melio success green (`#028838`). Never use emoji. Center the icon + message + restart button in the stage:

```tsx
<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
     style={{ color: '#028838' }}>
  <path fillRule="evenodd" clipRule="evenodd"
    d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM16.7809 9.62473C17.1259 9.19347 17.056 8.56418 16.6247 8.21917C16.1934 7.87416 15.5641 7.94408 15.2191 8.37534L11.0948 13.5307L8.68394 11.2705C8.28103 10.8928 7.6482 10.9132 7.27047 11.3161C6.89274 11.719 6.91315 12.3518 7.31606 12.7296L10.5161 15.7296C10.7195 15.9203 10.9933 16.0174 11.2714 15.9975C11.5495 15.9776 11.8067 15.8425 11.9809 15.6247L16.7809 9.62473Z"
    fill="currentColor" />
</svg>
<p style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#18191b' }}>Action completed</p>
<Button label="Restart demo" variant="tertiary" size="medium" onClick={() => setStep('idle')} />
```

### Result state — toast banner + restart (alternative)

When the result is best shown as a product-accurate toast notification (e.g. after a delete that removes an item from a list), use this layout instead:

```tsx
// Stage: flex column, alignItems: 'stretch', justifyContent: 'flex-start', padding: '20px'
<div style={{ ...STAGE, background: '#F3F4F6', height: '380px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'stretch', justifyContent: 'flex-start', padding: '20px' }}>

  {/* Toast banner at top */}
  <div style={{ background: '#F0FDF5', border: '1px solid #86EFAC', borderRadius: '8px',
                padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
    {/* checked-circle-fill SVG at 20px, color: '#028838' */}
    <span style={{ fontSize: '14px', fontWeight: 500, color: '#18191b', flex: 1 }}>
      Acme Corp vendor deleted
    </span>
    <CloseIconBtn onClick={() => setStep('idle')} />
  </div>

  {/* Restart button centred in remaining space */}
  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Button label="Restart demo" variant="tertiary" size="medium" onClick={() => setStep('idle')} />
  </div>
</div>
```

The `CloseIconBtn` (an X button) on the toast and the "Restart demo" button both reset the demo to `'idle'` — two affordances for the same action.

### Poppins on the outer wrapper

Every story `render()` function that builds a UI mockup must set `fontFamily: 'Poppins, sans-serif'` on the outermost wrapper div. Otherwise mockup text inherits Nunito Sans from the Storybook docs styles.

```tsx
render: () => (
  <div style={{ padding: '32px', fontFamily: 'Poppins, sans-serif', /* ... */ }}>
    {/* all mockup text inside inherits Poppins */}
  </div>
)
```

---

---

## Anatomy diagram — two-column SVG pattern

Use this pattern when annotating multiple named sections of a rendered UI mockup (e.g. a confirmation modal with header / body / footer). It's the right tool when `<PartCallout>` would distort layout and inline overlay annotations can't point at sections cleanly.

**Structure**: three columns in a flex row — the modal, an SVG connector strip, and an absolutely-positioned label column.

```tsx
render: () => {
  // 1. Fix section heights so SVG y-coords are exact
  const HEADER_H = 72;
  const BODY_H   = 80;
  const FOOTER_H = 64;
  const MODAL_W  = 400;
  const GAP_W    = 52;   // SVG width
  const LABEL_W  = 200;

  // 2. Compute vertical centre of each section
  const headerMid = HEADER_H / 2;
  const bodyMid   = HEADER_H + BODY_H / 2;
  const footerMid = HEADER_H + BODY_H + FOOTER_H / 2;
  const totalH    = HEADER_H + BODY_H + FOOTER_H;

  const annotations = [
    { mid: headerMid, title: 'Entity name in title' },
    { mid: bodyMid,   title: 'Body copy'            },
    { mid: footerMid, title: 'Two explicit actions' },
  ];

  const PILL: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center',
    background: '#18191b', color: '#fff',
    borderRadius: '100px', padding: '5px 12px',
    fontSize: '12px', fontWeight: 600,
    whiteSpace: 'nowrap', lineHeight: 1.3,
  };

  const PILL_COLOR = '#18191b';

  return (
    <div style={{ padding: '44px 40px', display: 'flex', justifyContent: 'center',
                  fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>

        {/* Modal — use explicit height on each section for precise line alignment */}
        <div style={{ width: MODAL_W, flexShrink: 0, background: '#fff',
                      border: '1px solid #E2E8F0', borderRadius: '12px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.13)', overflow: 'hidden' }}>
          <div style={{ height: HEADER_H, padding: '0 20px', display: 'flex',
                        alignItems: 'center', justifyContent: 'space-between',
                        boxSizing: 'border-box' }}>
            {/* header content */}
          </div>
          <div style={{ height: BODY_H, padding: '0 20px', display: 'flex',
                        alignItems: 'center', boxSizing: 'border-box' }}>
            {/* body content */}
          </div>
          <div style={{ height: FOOTER_H, padding: '0 20px', display: 'flex',
                        alignItems: 'center', justifyContent: 'space-between',
                        boxSizing: 'border-box' }}>
            {/* footer content */}
          </div>
        </div>

        {/* SVG connector — tick at modal edge, dashed line, no terminal dot */}
        <svg width={GAP_W} height={totalH} style={{ flexShrink: 0, display: 'block', overflow: 'visible' }}>
          {annotations.map((a) => (
            <g key={a.title}>
              <line x1={1} y1={a.mid - 5} x2={1} y2={a.mid + 5}
                    stroke={PILL_COLOR} strokeWidth="1.5" strokeLinecap="round" />
              <line x1={3} y1={a.mid} x2={GAP_W} y2={a.mid}
                    stroke={PILL_COLOR} strokeWidth="1" strokeDasharray="3 4" />
            </g>
          ))}
        </svg>

        {/* Label column — absolutely positioned pills, centred on their section */}
        <div style={{ position: 'relative', height: totalH, width: LABEL_W }}>
          {annotations.map((a) => (
            <div key={a.title} style={{ position: 'absolute', top: a.mid, left: 0,
                                        transform: 'translateY(-50%)' }}>
              <div style={PILL}>{a.title}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
},
```

**Key rules**:
- Each modal section uses an **explicit `height`** (not `padding`-driven) and `boxSizing: 'border-box'`. This is what makes the SVG y-coordinates exact.
- **Do not add artificial dividers** between sections. The real product uses padding alone for separation — adding `1px` rules changes the modal's appearance.
- **Label style**: black pill (`#18191b` background, white text, `borderRadius: '100px'`). No numbers — the spatial alignment with the section is the connection.
- **SVG connector**: a small vertical tick at `x=1` (the modal's right edge) + a dashed line extending to `x=GAP_W` (the pill's left edge). Same color as the pill (`PILL_COLOR`). No terminal dot — the pill itself is the endpoint.
- **Do not use purple** (`#5C3EC5`) for annotation UI — it competes with the Penny brand and the Melio product palette. Use near-black.

---

## Absolutely-positioned (Panel-based) components

Components built on `Panel` (ActionBar, sticky / bottom bars) render `position: absolute`. An absolute element **adds no height to its parent**, so wrap it in a `position: relative` container with an **explicit, snug height** (≈ the component's own height — don't leave a tall empty canvas). It also anchors left by default; center it with `left: 0; right: 0; margin-inline: auto` (in-app a centered `Layout` column does this). Example wrapper used in the ActionBar stories:

```tsx
const Stage = ({ children }) => (
  <div className="ab-stage" style={{ position: 'relative', height: '96px', borderRadius: '8px' }}>
    <style>{`.ab-stage [data-component="ActionBar"] { left: 0; right: 0; margin-inline: auto; }`}</style>
    {children}
  </div>
);
```

Size the height to the rendered component (measure it — ActionBar is ~74px, so a 96px Stage leaves a small breathing gap). A height that's too large leaves a tall, mostly-empty canvas; too small clips the absolute child.

---

## Fixed-position headers (ExternalLayout) — contain them in the stage

Some components render a `position: fixed` header that pins to the top of the page (ExternalLayout's branded header). A `fixed` element attaches to the **viewport** by default — in a docs canvas that means it escapes the story box, overlaps the page chrome, and reattaches to the iframe top instead of sitting inside your stage.

To contain it, give the stage wrapper a **CSS containing block** for fixed descendants — any of `transform`, `filter`, or `will-change` on the wrapper does this. `transform: scale(1)` is the cleanest (visually a no-op). The fixed header then pins to the stage's top edge instead of the viewport. This is the same trick the snapshot's `Storybook.Container transform="scale(1)"` uses.

```tsx
const Stage = ({ children, height = 540 }: { children: React.ReactNode; height?: number }) => (
  <div style={{
    position: 'relative',
    transform: 'scale(1)',   // ← establishes the containing block for the fixed header
    height: `${height}px`,
    width: '100%',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    overflow: 'hidden',
  }}>
    {children}
  </div>
);
```

The component's header uses `width: inherit`, so the stage's `width: 100%` makes the header span the stage. `overflow: hidden` + `borderRadius` clips it cleanly to the rounded stage.

---

## Forcing a breakpoint in docs — override `BreakpointContext`

Components that switch layout on breakpoint (SplitScreen renders side-by-side on `l`+ / stacked below it; responsive Group variants; Menu) read the active breakpoint from `BreakpointProvider`. The docs canvas iframe is **far narrower than the `l` (1240px) breakpoint**, so these components render in their stacked/mobile form by default — which hides the desktop layout that's usually the whole point of the page.

You **cannot** force this through `BreakpointProvider`'s `breakpoint` prop — that prop is dead; the provider always calls `usePennyBreakpoint()` (which measures the real window width) and uses that. Instead, **override the context directly**. Both `useBreakpoint()` and `useBreakpointValue()` read from `BreakpointContext`, so wrapping a story in a `BreakpointContext.Provider` with a fixed value forces the layout you want to document:

```tsx
import { type ThemeBreakpointsKey } from '@/theme/foundations/breakpoints';
import { BreakpointContext } from '@/theme/providers/BreakpointProvider';

const ForceBreakpoint = ({ value, children }: { value: ThemeBreakpointsKey; children: React.ReactNode }) => (
  <BreakpointContext.Provider value={value}>{children}</BreakpointContext.Provider>
);

// Desktop side-by-side demo:  <ForceBreakpoint value="xl">…</ForceBreakpoint>
// Mobile stacked demo:        <ForceBreakpoint value="xs">…</ForceBreakpoint>
```

This lets one page document **both** layouts with real canvases (a forced-`xl` desktop story and a forced-`xs` mobile story) instead of only describing the desktop form in prose. Note: Chakra responsive props (`{ s: 'xxl', xs: 's' }` in `__css`) still resolve via CSS media queries against the real iframe width, so padding may stay mobile-sized while the JS-driven layout switches — acceptable for a demo, but don't expect pixel-perfect desktop spacing in a narrow canvas.

---

## Static asset imports — product GIFs and images

When ZeroHeight provides GIFs or images that show the real product interaction (trigger placement, flows), import and display them in the story instead of building a custom code mock. Product recordings are always more accurate.

### 1. Declare asset types in `types.d.ts`

Add module declarations once per project (already done in `penny-docs/src/types.d.ts`):

```ts
declare module '*.gif' { const src: string; export default src; }
declare module '*.png' { const src: string; export default src; }
declare module '*.jpg' { const src: string; export default src; }
declare module '*.svg' { const src: string; export default src; }
```

### 2. Copy assets into `src/assets/`

ZeroHeight images for the Delete UX pattern are already saved locally at:
```
penny-design-documentation/documentation images/ux-patterns/delete/
```

Copy to the working asset folder:
```bash
cp "documentation images/ux-patterns/delete/delete-from-resource.gif" \
   penny-docs/src/assets/delete-from-resource.gif
```

### 3. Import and render in the story

```tsx
import deleteFromResourceGif from '@/assets/delete-from-resource.gif';

export const RowDeleteTrigger: Story = {
  render: () => (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', fontFamily: 'Poppins, sans-serif', gap: '12px' }}>
      <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.07em', color: '#8B95A9', alignSelf: 'flex-start' }}>
        List view — delete as a row action
      </div>
      <img
        src={deleteFromResourceGif}
        alt="Deleting a vendor from a resource list"
        style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid #E2E8F0' }}
      />
    </div>
  ),
};
```

Use this pattern for any story whose purpose is "show where/how the trigger appears in the product." Reserve code mocks for interactive demos where the user can click through steps.

---

- **Loader bug**: `isLoading` on `Button` crashes in Storybook (pre-existing). Omit Loading state from states grids; it's shown in a separate `LoadingState` story instead.
- **Spinner** (for loading states): use the vendored `Spinner` foundation (`@/components/foundations/Spinner`), not a hand-rolled CSS spinner. Pick its `variant` (`neutral` | `brand` | `inverse`) to match the host's foreground — light-content surfaces (filled / `*-inverse`) want `inverse`; light surfaces want `neutral` (see IconButton's `spinnerVariantMap`). Caveat: `SpinnerContext` defaults to a **truthy empty object `{}`** when no `SpinnerProvider` is mounted (the case in this docs project), so the override branch (`if (spinnerOverride)`) fires and `createElement({})` throws "Element type is invalid". The vendored Spinner guards this by only treating the override as real when it's a function or forwardRef object — keep that guard. More generally: when vendoring a component that reads a Provider-backed override hook, check the context's **default value** isn't truthy.
- **Variant lists — code is the source of truth, not ZeroHeight.** The implemented variant union (e.g. `iconButtonVariants`) may be **broader** than what the ZH page documents — IconButton ships `critical` / `critical-secondary` that ZH omits. Document what the component actually supports; flag ZH/code mismatches (and default-value mismatches, e.g. ZH "Large default size" vs code `medium`) to the user rather than silently trimming or following ZH.
- **ZeroHeight MCP**: Must be called via direct `curl` with `Accept: application/json, text/event-stream` header. Response is SSE — strip `data: ` prefix. `pageId` must be a **number** (not string).
- **Figma screenshots**: Anatomy images are not yet embedded. Use `<Callout variant="note">Image to be added…</Callout>`.
- **Chakra context**: Never render Penny components inline in MDX — always wrap them in a story's `render()` function and reference with `<Story>` or `<Canvas>`. MDX inline JSX runs outside the Chakra provider.
- **Storybook port**: The dev script is `storybook dev --port 6006`. Always use this exact command; `pnpm storybook` is already wired to it in `package.json`.
- **BreakpointProvider**: `.storybook/preview.tsx` wraps stories in `TokensProvider` **and** `BreakpointProvider`. Components that call `useBreakpointValue` / `useBreakpoint` (ActionBar, responsive Group variants, etc.) default to the **`xs` (mobile)** breakpoint without it — bars/rows render stacked/vertical even on a wide screen. Keep the `BreakpointProvider` in the decorator. To **force a specific breakpoint** for a story (e.g. show SplitScreen's desktop side-by-side layout in the narrow docs canvas), override `BreakpointContext` directly — the provider's `breakpoint` prop is a no-op. See *"Forcing a breakpoint in docs"* above.
- **No GFM tables**: `remark-gfm` is not configured in addon-docs, so markdown table syntax (`| col | col |`) renders as literal text. Use prose + bullet lists (or styled HTML) instead. *(A task to enable remark-gfm has been flagged.)*
- **The docs `Icon` is pruned — keys typecheck but crash.** `foundations/Icon` carries its own small `IconKey` union (e.g. `add`, `caret-down`, `checked`, `chevron-left`, `chevron-right`, `close`, `delete`, `edit`, `filter`, `info`, `invoices`, `search`, `warning`) with inline-SVG `PATHS` for just those. But `IconButton`'s `icon` prop (and other consumers) type against the **full generated** `IconKey`, so an unsupported key like `copy`/`file-move`/`save`/`archive-box` **passes `tsc` and then throws at runtime** via the error boundary (`PATHS[type]` is undefined). Restrict icon keys to what's actually in the union, and verify in the live preview — typecheck won't catch this.
- **Adding an icon to the docs `Icon`.** The snapshot's icons are CDN-fetched (`getIconPath` → `react-inlinesvg`, not installed here), so `icons.generated.ts` has **no inline path data**. The real SVG source is the assets package (see below). To add a glyph: read both `assets/icons/small/<name>.svg` (16×16) and `assets/icons/medium/<name>.svg` (24×24), then add `<name>` to the `IconKey` union and a `PATHS['<name>']` entry with `small`/`large` `{ viewBox, paths: [...] }` (copy every `<path d="…">`, in order — many glyphs are multi-path). `color="inherit"` works because the source paths use `fill="currentColor"`.

## Asset source — icons, illustrations, brands, flags

The design system's raw assets live in the snapshot at:
```
penny--melio-penny-57.0.2/packages/penny-assets/src/assets/
├── icons/small/   (~341 SVGs, 16×16)   icons/medium/ (~340 SVGs, 24×24)
├── illustrations/ (~67 SVGs)
├── brand-symbols/ (~68)   brands/ (~54)   flags/ (~249)
```
These are the authoritative SVGs behind the CDN icon names. Use them to:
- **Add an `Icon` glyph** to `foundations/Icon` (recipe above) when a page needs an icon outside the curated set — `ls assets/icons/medium | grep <keyword>` to find the name.
- **Pull an illustration/brand/flag** into `src/assets/` (`cp` the SVG, then `import … from '@/assets/<name>.svg'`) when a docs mock needs real product imagery rather than a code placeholder.

Prefer a real asset from here over inventing markup or leaving a placeholder, but only add what the page actually uses.
- **Component with no ZeroHeight page of its own.** Some components (e.g. `Button Group`) have no dedicated ZH page, but a *pattern built on them* does (e.g. `Split Button`, an instance of `ButtonGroup`). Source the docs from the component's source API (`.types.ts`) for the props/Controls, and from the related pattern's ZH page for usage/variants/mobile guidance. Badge it `Healthy` and frame the page around the component, folding the pattern in as a section.
- **Pasted images aren't files.** An image pasted into chat is NOT written to disk and can't be `import`ed. Ask the user to save it into `penny-docs/src/assets/<name>.png` (give the exact path), confirm it exists (`ls`/`file`), then add the `import … from '@/assets/<name>.png'` and render it. Don't add the import before the file exists — the running Vite dev server will fail to resolve it.
- **Import `<Story>` before using it.** If you reference a story with `<Story of={…} />` in MDX (e.g. for a `VariantCards`/`RelatedComponents` block), add `Story` to the `@storybook/addon-docs/blocks` import. Forgetting it throws "Expected component `Story` to be defined: you likely forgot to import, pass, or provide it." — the page error-boundaries out.
- **Story id ≠ display `name`.** A story's URL id derives from its **export name**, not its `name` parameter. `export const DisabledLinks` with `name: 'Disabled'` is at `…--disabled-links`, not `…--disabled`. Use the export name (camelCase → kebab-case) when navigating to a story; `--docs` is the auto-generated docs page id. Titles with symbols keep them — `<Meta title="✦ Design Guidelines" />` has the sidebar node id `✦-design-guidelines`, so its docs path is `/?path=/docs/✦-design-guidelines--docs` and the `✦` must be `encodeURIComponent`'d. When unsure of an id, read the sidebar node's `id` attribute in the manager DOM.
- **Verifying a fix in the live preview — trust the DOM, not the console.** `preview_console_logs` is **cumulative across reloads**: a crash from *before* your fix stays in the buffer and reads as current (you can see hundreds of stale `Element type is invalid` lines after the bug is already gone). To confirm a fix actually took, query the live iframe: `/Element type is invalid/.test(doc.body.textContent)` for the error-boundary fallback, and `getComputedStyle(el)` for the real visual (bg, border, etc.). A screenshot confirms layout but won't prove an earlier runtime error is resolved. Also: a full reload can drop the preview to the landing page and a non-Design tab — re-navigate to `…--docs` and click **Design** before asserting.
- **Compound components — omit `component` in the meta.** For a multi-part component you compose by hand (Section Banner = `SectionBannerRoot` + `Icon`/`Content`/`Title`/`Description`/`CloseButton`), don't set `component:` in the `Meta`. It forces a `children`-required prop type that conflicts with a custom Playground args type and throws `TS2322` on the meta object. Instead define a `PlaygroundArgs` type, type the meta as `Meta<PlaygroundArgs>`, and drive everything through `render`. The compound parts render fine inside the story; only the meta-level `component` field is the problem.
- **`StatusIconSolid` glyphs/colors.** The docs reimplementation draws each variant as a filled circle with a white glyph **except `warning`, which is a black (`#18191b`) rounded triangle** with a white exclamation — that's the Penny warning status icon, so don't "fix" it to an amber circle. Its variant set is limited and `SectionBannerIcon` maps `neutral`/`brand`/`secondary` → `help` (a "?"), `informative` → the blue "i", etc.; if a ZH mock shows a different glyph/color (e.g. an info "i" on a neutral banner, or a purple brand icon) that's a real component-vs-mock gap — flag it rather than silently re-mapping, since the mapping is component behavior.
- **`DoDont` for paired visual rules; `<Do>`/`<Dont>` for inline text rules.** When ZH documents a Do/Don't with imagery (illustration-on-outline vs on-color, icon-adds-clarity vs redundant), use `<DoDont items={[…]} previewBg="white" />` with a live component in each `preview` (`previewBg="white"` when the component carries its own fill). Use the lighter `<Do>`/`<Dont>` RuleItem components only for inline text-only rules with no preview.
- **Put per-item guidance inside the cards, not in a duplicate bullet list.** When a section is presented as `VariantCards` (Variants, Sizes, Banner asset), the per-item descriptions belong **in the cards' right column**, not in a separate `- **Large** — …` bullet list above the story. Having both duplicates the content; fold the bullet text into the card descriptions and delete the standalone list (keep only a one-line section lead-in).
