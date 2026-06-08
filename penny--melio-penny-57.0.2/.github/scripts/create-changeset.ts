#!/usr/bin/env npx tsx
/**
 * Auto-changeset script for dependency PRs
 * Creates a changeset file for Renovate/Dependabot PRs based on affected packages
 *
 * Usage: npx tsx create-changeset.ts <pr_number> [--dry-run]
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const PACKAGES_DIR = 'packages';
const CHANGESET_DIR = '.changeset';

/**
 * Maps the [suffix] from Renovate PR titles to published package name(s).
 * penny-testkits is intentionally excluded — testkits only have peer dependencies
 * so a dep update won't affect their published output; no changeset needed.
 */
const RENOVATE_PACKAGE_MAP: Record<string, string[]> = {
  'penny': ['@melio/penny'],
  'penny-mcp': ['@melio/penny-mcp'],
  'penny-utils': ['@melio/penny-utils', '@melio/penny'],
  'penny-assets': ['@melio/penny-assets'],
  'penny-testkits': ['@melio/penny-testkit-pw', '@melio/penny-testkit-rtl', '@melio/penny-testkit-cy'],
};

/**
 * Packages excluded from changeset generation in both flows.
 * Testkits only declare peer dependencies — their published output is unaffected
 * by dep updates, so a changeset would be a no-op (and could incorrectly trigger
 * bumps in dependent packages via the fixed changeset group).
 */
const EXCLUDED_PACKAGES = new Set([
  '@melio/penny-testkit-pw',
  '@melio/penny-testkit-rtl',
  '@melio/penny-testkit-cy',
]);

interface PackageInfo {
  name: string;
  dependencies: Set<string>;
}

interface PrInfo {
  title: string;
  headRefName: string;
}

function git(args: string): string {
  return execSync(`git ${args}`, { encoding: 'utf-8' }).trim();
}

function fetchPrInfo(prNumber: string): PrInfo {
  const json = execSync(
    `gh pr view ${prNumber} --json title,headRefName`,
    { encoding: 'utf-8' }
  );
  const data = JSON.parse(json);
  return { title: data.title, headRefName: data.headRefName };
}

// ── Renovate flow ─────────────────────────────────────────────────────────────

/**
 * Extract the bracket suffix from a Renovate PR title.
 * e.g. "chore(deps): update dependencies [penny-mcp]" → "penny-mcp"
 */
function extractRenovateSuffix(title: string): string | null {
  const match = title.match(/\[([^\]]+)\]\s*$/);
  return match ? match[1] : null;
}

function handleRenovate(title: string, prNumber: string, headRef: string, dryRun: boolean): void {
  const suffix = extractRenovateSuffix(title);

  if (!suffix) {
    console.log('No package suffix in title — root devDeps, skipping');
    return;
  }

  const packageNames = RENOVATE_PACKAGE_MAP[suffix];

  if (packageNames) {
    const included = packageNames.filter(pkg => !EXCLUDED_PACKAGES.has(pkg));
    if (included.length === 0) {
      console.log(`All packages for "[${suffix}]" are excluded (peer deps only), skipping`);
      return;
    }
    writeChangeset(included, prNumber, headRef, title, dryRun);
    return;
  }

  console.warn(`Warning: suffix "[${suffix}]" not found in RENOVATE_PACKAGE_MAP, skipping`);
}

// ── Dependabot flow ───────────────────────────────────────────────────────────

/**
 * Get all packages with their direct dependencies (for Dependabot scanning).
 */
function getPackages(): PackageInfo[] {
  const packages: PackageInfo[] = [];
  if (!existsSync(PACKAGES_DIR)) return packages;

  for (const entry of readdirSync(PACKAGES_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const pkgPath = join(PACKAGES_DIR, entry.name, 'package.json');
    if (!existsSync(pkgPath)) continue;

    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
      if (!pkg.name) continue;

      const dependencies = new Set<string>([
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.devDependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
      ]);

      packages.push({ name: pkg.name, dependencies });
    } catch {
      console.warn(`Warning: Failed to parse ${pkgPath}`);
    }
  }

  return packages;
}

/**
 * Extract dependency name from a Dependabot PR title.
 * e.g. "Bump @scope/package from 1.0.0 to 1.2.3"
 */
function extractDependabotDep(title: string): string | null {
  const match = title.match(/bump\s+(@?[\w.-]+(?:\/[\w.-]+)?)\s+from/i);
  return match ? match[1] : null;
}

function handleDependabot(title: string, prNumber: string, headRef: string, dryRun: boolean): void {
  const dependencyName = extractDependabotDep(title);
  if (!dependencyName) {
    console.log('Could not extract dependency name from PR title, skipping');
    return;
  }
  console.log(`Dependency: ${dependencyName}`);

  const packages = getPackages();
  const affectedPackages = packages
    .filter(pkg => pkg.dependencies.has(dependencyName) && !EXCLUDED_PACKAGES.has(pkg.name))
    .map(pkg => pkg.name);

  if (affectedPackages.length === 0) {
    console.log('No packages depend on this dependency, skipping');
    return;
  }

  writeChangeset(affectedPackages, prNumber, headRef, title, dryRun);
}

// ── Shared ────────────────────────────────────────────────────────────────────

function writeChangeset(
  packageNames: string[],
  prNumber: string,
  headRef: string,
  title: string,
  dryRun: boolean
): void {
  console.log(`Affected packages: ${packageNames.join(', ')}`);

  const slug = headRef.replace(/\//g, '-').slice(0, 30);
  const filename = `${CHANGESET_DIR}/dep-${prNumber}-${slug}.md`;
  const content = [
    '---',
    ...packageNames.map(pkg => `'${pkg}': patch`),
    '---',
    '',
    title,
    '',
  ].join('\n');

  if (dryRun) {
    console.log('');
    console.log(`[DRY RUN] Would create: ${filename}`);
    console.log(content);
    return;
  }

  mkdirSync(CHANGESET_DIR, { recursive: true });
  writeFileSync(filename, content);
  console.log(`Created: ${filename}`);
}

// ── Entry point ───────────────────────────────────────────────────────────────

function main(): void {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const positionalArgs = args.filter(a => !a.startsWith('--'));

  const [prNumber] = positionalArgs;

  if (!prNumber) {
    console.error('Usage: npx tsx create-changeset.ts <pr_number> [--dry-run]');
    process.exit(1);
  }

  const { title, headRefName } = fetchPrInfo(prNumber);

  console.log('=== Auto-changeset for dependency PRs ===');
  console.log(`PR: #${prNumber} - ${title}`);
  console.log(`Branch: ${headRefName}`);
  console.log('');

  // Check if changeset already exists in this PR
  const existingChangesets = git('diff --name-only origin/main...HEAD -- .changeset/*.md')
    .split('\n')
    .filter(f => f && !f.endsWith('README.md'));

  if (existingChangesets.length > 0) {
    console.log('Changeset already exists:', existingChangesets.join(', '));
    return;
  }

  if (headRefName.startsWith('renovate/')) {
    handleRenovate(title, prNumber, headRefName, dryRun);
  } else if (headRefName.startsWith('dependabot/')) {
    handleDependabot(title, prNumber, headRefName, dryRun);
  } else {
    console.log(`Branch "${headRefName}" is not a Renovate or Dependabot branch, skipping`);
  }
}

main();
