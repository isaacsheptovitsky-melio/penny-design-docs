# Skill: align-page

Audit one or all Storybook docs pages and ensure the **Related components** block is present, correctly wired, and fully reciprocal.

## Usage

```
/align-page <ComponentName>   — single page
/align-page --all             — full corpus sweep
```

Examples: `/align-page Button`, `/align-page --all`

---

## What this skill does

Three pillars, applied to every target page:

1. **Structure check** — verifies the page has `## Related components` in the Design tab, positioned just before `</DocTab>` (the Development tab boundary).
2. **Preview convention** — enforces the correct preview type for each `<RelatedComponent>` card (live instance vs. visual mock — see below).
3. **Interconnection graph** — ensures every link is reciprocal: if page A lists page B, page B must also list page A. Zero orphans, zero dead links.

---

## Step-by-step process

### 1. Discover all pages

```bash
find penny-docs/src -name "*.docs.mdx" | sort
```

For each MDX file, derive its **story-id** (used in the `url` prop):

| MDX path | Storybook `title` | story-id |
|---|---|---|
| `src/components/navigation/Tabs/Tabs.docs.mdx` | `Components/Navigation/Tabs` | `components-navigation-tabs` |
| `src/components/foundations/Icon/Icon.docs.mdx` | `Foundations/Icon` | `foundations-icon` |

Formula: `title` → lowercase → `/` → `-` → append `--docs`.
Full URL: `/?path=/docs/<story-id>--docs`.

To verify a title, read the corresponding `*.stories.tsx` and find the `meta.title` value.

### 2. Build the graph

For each page, read its current `RelatedComponentsBlock` story (in `*.stories.tsx`) and extract the `url` values. Map them into a directed adjacency list:

```
Button → [NakedButton, Link]
NakedButton → [Button]
Link → [Button, NavigationItem]
```

Identify **missing reciprocal edges**: if `Button → NakedButton` exists but `NakedButton → Button` does not, add it.
Identify **dead links**: any `url` whose story-id resolves to a file that doesn't exist — fix or remove.

### 3. Decide the preview for each new entry

#### Live component instance
Use for components that render inline without any trigger or overlay:
- All inputs (TextField, Select, Checkbox, Switch, etc.)
- Badges, Pills, Tags, StatusIndicator
- Buttons, Links, NavigationItem
- Icon, Avatar, Spinner, Divider

```tsx
preview={<Button label="Pay" variant="primary" />}
preview={<Tag label="Pending" variant="default" />}
```

#### Faithful visual mock (divs/SVG)
Use for overlay/surface components that can't be "just rendered" in a 160px card, and for abstract foundation pages:
- Modal, Drawer, Popover, Floating, Menus, Tooltip, Blanket
- Foundations: Borders, Shadows, Spacing token swatches

```tsx
// Tooltip mock — speech-bubble shape in pure CSS
preview={
  <div style={{
    position: 'relative', background: '#1a202c', color: '#fff',
    borderRadius: '6px', padding: '6px 10px',
    fontSize: '12px', fontWeight: 500, whiteSpace: 'nowrap',
  }}>
    Hover for details
    <div style={{
      position: 'absolute', bottom: '-5px', left: '50%',
      transform: 'translateX(-50%)',
      width: 0, height: 0,
      borderLeft: '5px solid transparent', borderRight: '5px solid transparent',
      borderTop: '5px solid #1a202c',
    }} />
  </div>
}

// Spacing swatch mock — coloured strip
preview={
  <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end' }}>
    {[8, 12, 16, 24].map(s => (
      <div key={s} style={{ width: s, height: s, background: '#7849ff', borderRadius: '2px' }} />
    ))}
  </div>
}
```

### 4. Write the `RelatedComponentsBlock` story

Location: **in the component's `*.stories.tsx`**, at the bottom.

```tsx
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';
// also import any components used in previews

export const RelatedComponentsBlock: StoryObj<typeof ComponentName> = {
  name: 'Related components',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Link"
        url="/?path=/docs/components-navigation-link--docs"
        preview={<Link href="#" label="View invoice" variant="standalone" />}
      />
      <RelatedComponent
        name="Navigation Item"
        url="/?path=/docs/components-navigation-navigation-item--docs"
        preview={
          <NavigationItem isSelected>
            <Text color="inherit" textStyle="inline">Payments</Text>
          </NavigationItem>
        }
      />
    </RelatedComponents>
  ),
};
```

Rules:
- Story `name` must be `'Related components'` (exact string — drives the canvas heading).
- `parameters.controls.disable: true` and `sourceState: 'none'` on every RelatedComponentsBlock story.
- Previews must render without crashing — any component that needs the Chakra provider is fine (the story decorator wraps it). Do NOT render components that aren't vendored.
- For the `dark` prop: pass `dark={true}` on entries for `*-inverse` variants only.

### 5. Update the MDX file

Insert (or update) the `## Related components` section inside the **Design** `<DocTab>`, immediately before `</DocTab>` + the Development tab:

```mdx
## Related components

<Story of={ComponentNameStories.RelatedComponentsBlock} />

</DocTab>

<DocTab label="Development">
```

The `* as ComponentNameStories` import alias must already exist at the top of the MDX (it's the standard import for every page — `import * as ButtonStories from './Button.stories'`). If missing, add it.

### 6. Verify

After editing, run:

```bash
cd penny-docs && pnpm typecheck 2>&1 | grep -i "related\|RelatedComponent"
```

Only fix errors in files you touched. Then spot-check in the running Storybook: scroll to `## Related components` on the edited page and confirm each card renders with a visible preview.

---

## Reciprocity checklist

Before finishing, confirm:

- [ ] Every page that was modified now lists all pages that link TO it (inbound) AND all pages it links to (outbound)
- [ ] No page has a `RelatedComponentsBlock` story that references a non-existent `story-id`
- [ ] No page is missing a `## Related components` section entirely (run: `find penny-docs/src -name "*.docs.mdx" | xargs grep -rL "RelatedComponentsBlock"` to find omissions)

---

## `--all` sweep strategy

Running on the full corpus (~88 pages) is best parallelised by category:

1. Map the full graph centrally before editing anything.
2. Fan out edits by category (foundations / containers / dataDisplay / action / navigation / selectionAndInputs) — one agent per category, each given the pre-computed graph for its category + the standard recipe.
3. Run a final central pass to close any cross-category orphans (pages in category A that link to category B but got no inbound edge added).

The graph design (what links to what) must stay with the orchestrator — delegates only execute the edit recipe against a pre-designed adjacency list.

---

## PageHero badge convention

The `badge` prop on `<PageHero>` should only ever be set to `"Deprecated"` — for components that are being phased out. All other pages have **no badge**. Never write `badge="Healthy"`, `badge="Beta"`, or any other status value; remove them if encountered.

---

## ShortcutTiles convention

`<ShortcutTile>` entries in the links bar should link to **Figma** and **Notion** only. Do not add ZeroHeight tiles — they have been removed from all pages and must not be re-introduced. If a page has no Figma URL, omit the Figma tile rather than fabricating one.

---

## Playground (Controls table) convention

After removing the old playground-wrapper, the controls section is just bare `<Controls>`:

```mdx
<Controls of={ComponentStories.Playground} />
```

No wrapping `<div>` with gray background. Do not add a playground-wrapper div around `<Controls>` on any page.

---

## VariantGrid convention

Use `<VariantGrid>` / `<VariantGridItem>` for size and color variant showcases instead of custom flex/div layouts:

```tsx
import { VariantGrid, VariantGridItem } from '@/storybook-utils/VariantGrid';

export const Sizes: Story = {
  render: () => (
    <VariantGrid minItemWidth={100}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <VariantGridItem key={size} label={size}>
          <MyComponent size={size} />
        </VariantGridItem>
      ))}
    </VariantGrid>
  ),
  parameters: { controls: { disable: true } },
};
```

For variants that need a dark background (e.g. `inverse` color), wrap the component in a dark `div` inside `<VariantGridItem>` rather than using a separate dark grid:

```tsx
<VariantGridItem label="inverse">
  <div style={{ background: '#0F0728', padding: '10px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
    <Icon type="info" size="large" color="inverse" />
  </div>
</VariantGridItem>
```

---

## Color/token table convention

Use an inline `<table>` with **Token | Value | Role** columns. Color swatch goes in the first column alongside the token name. Pattern:

```mdx
<table style={{ borderCollapse: 'separate', borderSpacing: 0, width: '100%', fontSize: '13px', border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden', marginTop: '8px' }}>
  <thead>
    <tr>
      <th style={{ padding: '8px 16px', textAlign: 'left', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6B7280', background: '#F7FAFC', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>Token</th>
      <th ...>Value</th>
      <th ...>Role</th>
    </tr>
  </thead>
  <tbody>
    {rows.map(({ token, hex, role }, i, arr) => (
      <tr key={token}>
        <td style={{ padding: '10px 16px', borderRight: '1px solid #E2E8F0', borderBottom: i < arr.length - 1 ? '1px solid #E2E8F0' : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Solid color swatch */}
            <span style={{ display: 'inline-block', width: '14px', height: '14px', borderRadius: '50%', background: hex, border: hex === '#ffffff' ? '1px solid #E2E8F0' : 'none', flexShrink: 0 }} />
            {/* OR dashed circle for 'inherit' / no-color tokens */}
            <span style={{ display: 'inline-block', width: '14px', height: '14px', borderRadius: '50%', border: '1.5px dashed #C3CAD5', flexShrink: 0 }} />
            <span style={{ fontFamily: '"SFMono-Regular", Consolas, monospace', color: '#475569' }}>{token}</span>
          </div>
        </td>
        <td ...>{value}</td>
        <td ...>{role}</td>
      </tr>
    ))}
  </tbody>
</table>
```

White swatches (`#ffffff`) need `border: '1px solid #E2E8F0'` to be visible. The `inherit` token uses a dashed circle instead of a solid color.

---

## CDN gallery convention (Icons and Illustrations)

Gallery stories load assets from the CDN at module level to avoid context issues:

```tsx
import { getDefaultIconsMap } from '@/theme/icons/icons.generated';
const CDN_URL = (import.meta.env.VITE_ASSETS_CDN as string) || '';
const ALL_ICON_KEYS = Object.keys(getDefaultIconsMap(CDN_URL)).sort();
```

Icons render as `<img>` tags (single-color SVGs, no theming needed):
```tsx
<img src={`${CDN_URL}/assets/1.0.0/icons/medium/${key}.svg`} alt={key} width={24} height={24} />
```

**Illustrations must be inlined** — they use `penny-illustration-*` CSS classes for theming which don't work through `<img>` tags. Fetch and inline each SVG, then define class styles via a `<style>` block in the gallery wrapper:

```tsx
import { useEffect, useState } from 'react';
import { getDefaultIllustrations } from '@/theme/defaultIllustrations/defaultIllustrations.generated';
const ALL_ILLUSTRATION_KEYS = Object.keys(getDefaultIllustrations(CDN_URL)).sort();

const CdnIllustration = ({ name }: { name: string }) => {
  const [html, setHtml] = useState('');
  useEffect(() => {
    fetch(`${CDN_URL}/assets/1.0.0/illustrations/${name}.svg`)
      .then((r) => r.text())
      .then(setHtml)
      .catch(() => {});
  }, [name]);
  return (
    <span style={{ display: 'inline-flex', width: 96, height: 96, flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: html }} />
  );
};

// In the gallery render, inject illustration token CSS:
<style>{`
  .penny-illustration-border { fill: #18191b; }
  .penny-illustration-background { fill: #ffffff; }
  .penny-illustration-brand-primary { fill: #7849ff; }
  .penny-illustration-brand-secondary { fill: #f6f2fd; }
  .penny-illustration-success { fill: #028838; }
  .penny-illustration-critical { fill: #d80e25; }
  .penny-illustration-stroke-border { stroke: #18191b; }
  .penny-illustration-stroke-background { stroke: #ffffff; }
  .penny-illustration-stroke-brand-primary { stroke: #7849ff; }
  .penny-illustration-stroke-brand-secondary { stroke: #f6f2fd; }
  .penny-illustration-stroke-success { stroke: #028838; }
  .penny-illustration-stroke-critical { stroke: #d80e25; }
`}</style>
```

---

## Known conventions

- **Pre-existing Related blocks** (the original ~43) may preview the SOURCE component rather than the target (e.g. StatusIndicator's "Tooltip" entry renders a StatusIndicator dot, not a Tooltip). Any page touched in a future pass should fix these to preview the TARGET.
- **Foundations pages** (Borders, Spaces, Border Radius): use the visual mock convention — you cannot render "a border" as a live component in a 160px chip.
- **ZeroHeight links**: never add `<ShortcutTile label="ZeroHeight" ...>` to any page. All have been removed.
- **Playground wrapper**: no `<div>` wrapping `<Controls>` — just bare `<Controls of={...} />`.
