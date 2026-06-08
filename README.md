# Penny Design Documentation — Storybook

A Storybook documentation site that migrates Melio's Penny design system docs from ZeroHeight into live, interactive component pages.

---

## Quick start

**Requirements**: Node 22+ and pnpm 10+ (managed by Volta — see `.volta` in `penny-docs/package.json`).

```bash
cd penny-docs
pnpm install
pnpm storybook        # opens http://localhost:6006
```

---

## What's in this package

```
penny-docs/           ← the full Storybook project (source only, no node_modules)
  src/
    components/       ← component docs pages (stories + MDX)
      action/         ← Button, IconButton, NakedButton, ActionBar
      navigation/     ← Link
      foundations/    ← ColorTokens
    ux-patterns/      ← ButtonsVsLinks, Delete, Feedback
    storybook-utils/  ← shared doc components (Callout, DocTabs, DoDont, etc.)
    assets/           ← images and GIFs used in stories
    DesignGuidelines.mdx  ← style guide for the docs site itself
  .storybook/
    main.ts           ← Storybook config (includes the pnpm MDX fix plugin)
    preview.tsx       ← theme provider + global styles

skill/
  zeroheight-to-storybook.md   ← Claude slash-command skill for generating new pages
```

---

## The `/zeroheight-to-storybook` skill

The skill automates creating a new component docs page from ZeroHeight content.

### Install (Claude Code project command)

Copy `skill/zeroheight-to-storybook.md` to your project's `.claude/commands/` directory:

```bash
mkdir -p .claude/commands
cp skill/zeroheight-to-storybook.md .claude/commands/
```

Then in Claude Code:
```
/zeroheight-to-storybook ComponentName
```

### What it does

1. Fetches the component's ZeroHeight page via the ZeroHeight MCP server
2. Reads the component source from the Penny snapshot
3. Generates a `ComponentName.stories.tsx` + `ComponentName.docs.mdx` following the Penny docs style guide

### ZeroHeight MCP

The skill pulls content from ZeroHeight via MCP. To connect:

```bash
claude mcp add --transport http penny "https://mcp.zeroheight.com/mcp/eb7e03ab629d92c564b33b6726bc5d0b5af86439"
```

---

## Penny component snapshot

The original Penny source lives in `penny--melio-penny-57.0.2/` (not included — 900 MB+).
All components documented here have already been copied into `penny-docs/src/components/` and are fully self-contained. You do not need the snapshot to run the Storybook.

If you want to add new components, you'll need a copy of the snapshot at the workspace root:
```
penny-design-documentation/
  penny-docs/          ← this project
  penny--melio-penny-57.0.2/   ← read-only snapshot (not included)
```

---

## Storybook URL

Local dev server: **http://localhost:6006**

(If port 6006 is in use, Storybook will pick the next free port and print it in the terminal.)

---

## Tech stack

- Storybook 10.3 (`@storybook/react-vite`)
- React 18 + TypeScript 5.9
- Vite 6
- Chakra UI v2 (Penny's component framework)
- pnpm 10 (Volta-pinned)

> **Note**: `.storybook/main.ts` includes a `fix-mdx-react-shim` Vite plugin that works around a Storybook 10 + pnpm incompatibility. Do not remove it.
