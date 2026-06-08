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

The ZeroHeight MCP server is NOT configured as a native tool in this environment. Access it directly via JSON-RPC. **Important**: the server uses SSE transport — always pass `Accept: application/json, text/event-stream` and strip the `data: ` prefix from the response line.

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
- **Register multi-part themes** for the component AND any vendored deps (e.g. `Panel`) in both `components.theme.ts` and `theme/components.ts` — see Step 5.
- **Stub any missing `@melio/penny-utils` exports** in `src/penny-utils/index.ts` (e.g. `useDelayMount`) for code that is imported but not rendered at runtime.

### 3. Generate or update the stories file

The stories file drives the interactive canvases. Ensure it has:
- A `Playground` story (used for the hero canvas + Controls table)
- Dedicated stories for each visual section (variants, sizes, states grid, etc.)
- Rich `argTypes` with `description`, `table.type`, `table.defaultValue`, `table.category`

See `penny-docs/src/components/action/Button/Button.stories.tsx` as the canonical pattern.

### 4. Write the MDX docs file

File path: `penny-docs/src/components/<category>/<ComponentName>/<ComponentName>.docs.mdx`

Follow the **Page Structure** and **Style Guide** below.

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
   │   └── ## Mobile usage     — width + stacking rules
   ├── Development tab        — LEAVE EMPTY (do not populate)
   └── ADA tab                — LEAVE EMPTY (do not populate)
```

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
- **Fills, not strokes**: H2 headings, `<th>` cells, and Callouts use **background fill only** — no `borderBottom` or `border` on these elements.
- **Border radius**: 8px everywhere (canvas boxes, tables, callouts, cards). Tables require `border-collapse: separate; border-spacing: 0` for `border-radius` to render.
- **Font rules — two separate contexts**:
  - *Docs UI / MDX prose* (storybook-utils components, MDX headings, body text): **never** set `fontFamily` inline. Nunito Sans is inherited from `.sbdocs`; Penny components apply Poppins through their theme.
  - *Story `render()` mockup text* (the custom HTML elements you build to simulate a UI — labels, headings, body text in cards, drawers, modals): **always** set `fontFamily: 'Poppins, sans-serif'` on the outermost wrapper `div` so all mockup text inherits Poppins rather than the docs Nunito Sans. Penny components inside the story already receive Poppins from the theme — this rule only applies to the surrounding mockup HTML you write.
- **Browser button resets**: Any component rendered as a native `<button>` must reset browser defaults in the theme's `baseStyle`: `border: 'none'`, `background: 'transparent'`, `padding: 0`, `cursor: 'pointer'`.

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
- **ZeroHeight MCP**: Must be called via direct `curl` with `Accept: application/json, text/event-stream` header. Response is SSE — strip `data: ` prefix. `pageId` must be a **number** (not string).
- **Figma screenshots**: Anatomy images are not yet embedded. Use `<Callout variant="note">Image to be added…</Callout>`.
- **Chakra context**: Never render Penny components inline in MDX — always wrap them in a story's `render()` function and reference with `<Story>` or `<Canvas>`. MDX inline JSX runs outside the Chakra provider.
- **Storybook port**: The dev script is `storybook dev --port 6006`. Always use this exact command; `pnpm storybook` is already wired to it in `package.json`.
- **BreakpointProvider**: `.storybook/preview.tsx` wraps stories in `TokensProvider` **and** `BreakpointProvider`. Components that call `useBreakpointValue` / `useBreakpoint` (ActionBar, responsive Group variants, etc.) default to the **`xs` (mobile)** breakpoint without it — bars/rows render stacked/vertical even on a wide screen. Keep the `BreakpointProvider` in the decorator.
- **No GFM tables**: `remark-gfm` is not configured in addon-docs, so markdown table syntax (`| col | col |`) renders as literal text. Use prose + bullet lists (or styled HTML) instead. *(A task to enable remark-gfm has been flagged.)*
