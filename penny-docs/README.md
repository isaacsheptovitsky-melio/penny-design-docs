# Penny Design Docs

Storybook documentation for the Penny design system. Deployed to GitHub Pages on every push to `main`.

**Live site:** https://isaacsheptovitsky-melio.github.io/penny-design-docs/

## Local setup

Requires Node ≥ 22 and pnpm ≥ 10.

```bash
pnpm install
```

Create a `.env` file in the project root (not committed):

```
VITE_ASSETS_CDN=https://penny-static.meliopayments.com
```

This CDN URL is used by `ConfigProvider` to resolve icon, brand, and illustration SVGs.

```bash
pnpm storybook   # starts on http://localhost:6006
```

## Path aliases

| Alias | Resolves to |
|---|---|
| `@/*` | `src/*` |
| `@melio/penny-utils` | `src/penny-utils/index.ts` (local stub) |

Story files and doc blocks import components via `@/components/...` and doc utilities via `@/storybook-utils/...`. Both are resolved by Vite and TypeScript — no install step needed.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds Storybook and deploys to GitHub Pages via `actions/deploy-pages`.

The `VITE_ASSETS_CDN` value must be set as a repository Actions variable (**Settings → Secrets and variables → Actions → Variables**) for the CDN to resolve in CI builds.
