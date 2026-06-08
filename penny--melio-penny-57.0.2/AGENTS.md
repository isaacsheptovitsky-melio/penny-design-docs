# Agent Instructions

## Package Manager

This repository uses **pnpm**.

- Use `pnpm install` to install dependencies
- Use `pnpm <script>` to run scripts (e.g., `pnpm test`, `pnpm lint`)
- Use `pnpm add <package>` to add dependencies
- Use `pnpm --filter <package> <command>` to run commands in specific workspace packages
- Workspace dependencies use `workspace:*` protocol

## Monorepo Structure

This is a Lerna monorepo with workspaces defined in `pnpm-workspace.yaml`:
- `packages/*` - Published packages (@melio/penny, @melio/penny-utils, etc.)
- `devtools/*` - Internal development tools

## Dependency Management

Dependencies are managed by Renovate (regular updates) and Dependabot (security fixes). Changesets are generated automatically by a GitHub Actions workflow.

See [`.github/DEPENDENCY_MANAGEMENT.md`](.github/DEPENDENCY_MANAGEMENT.md) for details.
