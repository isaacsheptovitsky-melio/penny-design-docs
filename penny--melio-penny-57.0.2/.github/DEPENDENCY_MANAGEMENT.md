# Dependency Management

## Two tools, two purposes

| Tool | Purpose |
|------|---------|
| **Renovate** | Regular dependency updates (minor, patch, major) |
| **Dependabot** | Security vulnerability fixes only |

Renovate opens grouped PRs on a schedule. Dependabot opens individual PRs when a CVE is reported.

---

## Renovate groups

Each group targets one published package. The `[suffix]` in the PR title identifies the group.

| Group | Package(s) | Risk |
|-------|-----------|------|
| `penny` | `@melio/penny` | **High** |
| `penny-mcp` | `@melio/penny-mcp` | Low |
| `penny-utils` | `@melio/penny-utils` | Medium |
| `penny-testkits` | `penny-testkit-pw`, `-rtl`, `-cy` | Medium |
| `penny-assets` | `@melio/penny-assets` | Medium |
| root devDeps | tooling, CI orbs, etc. | Low |
| major updates | all packages, monthly (1st of month) | Varies |

---

## Auto-changeset

When a Renovate or Dependabot PR is opened, the `auto-changeset` workflow runs automatically and commits a patch changeset to the PR branch.

**Renovate:** the `[suffix]` at the end of the PR title is mapped to the package name(s).

**Dependabot:** the updated dependency name is extracted from the PR title and matched against `package.json` files to find which published packages are affected.

**Testkits are excluded** testkit packages only declare peer dependencies (no own deps), so updating them doesn't change their published output.

If a changeset already exists on the branch, the workflow skips.

---

## Excluded packages

Some packages are excluded from automatic Renovate updates due to peer dependency constraints or known stability issues. The authoritative list lives in `.github/renovate.json5` under `packageRules` with `"enabled": false`.
