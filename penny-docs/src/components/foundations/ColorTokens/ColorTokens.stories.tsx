import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';
import { Button } from '@/components/action/Button';
import { Link } from '@/components/navigation/Link';

import {
  ColorPaletteGroup,
  ColorSwatch,
  SemanticTokenTable,
} from '@/storybook-utils/ColorPalette';
import type { SemanticTokenRow, SwatchData } from '@/storybook-utils/ColorPalette';
import { PartCallout } from '@/storybook-utils/PartCallout';
import { CascadeDiagram } from '@/storybook-utils/CascadeDiagram';

// ─── Placeholder component (no real component — just documentation) ───────────
const ColorTokensDoc: React.FC = () => null;

const meta: Meta<typeof ColorTokensDoc> = {
  title: 'Foundations/Color Tokens',
  component: ColorTokensDoc,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ColorTokensDoc>;

// ─────────────────────────────────────────────────────────────────────────────
// Global color lookup — used to resolve semantic token references
// ─────────────────────────────────────────────────────────────────────────────

const G: Record<string, string> = {
  // Neutral
  'neutral.100': '#ffffff',
  'neutral.200': '#f8fafc',
  'neutral.300': '#f1f5f8',
  'neutral.400': '#e4e7ec',
  'neutral.500': '#c3cad5',
  'neutral.600': '#8b95a9',
  'neutral.700': '#646f87',
  'neutral.800': '#475467',
  'neutral.900': '#344054',
  'neutral.1000': '#18191b',
  'neutral.A0': 'rgba(255, 255, 255, 0)',
  'neutral.A15': 'rgba(255, 255, 255, 0.15)',
  'neutral.A35': 'rgba(255, 255, 255, 0.35)',
  'neutral.A60': 'rgba(255, 255, 255, 0.60)',
  'neutral.A80': 'rgba(255, 255, 255, 0.80)',
  // Neutral — Alpha Dark (neutral.1000 overlay)
  'neutral.AD0': 'rgba(24, 25, 27, 0)',
  'neutral.AD15': 'rgba(24, 25, 27, 0.15)',
  'neutral.AD35': 'rgba(24, 25, 27, 0.35)',
  'neutral.AD60': 'rgba(24, 25, 27, 0.60)',
  'neutral.AD80': 'rgba(24, 25, 27, 0.80)',
  // Brand
  'brand.100': '#f6f2fd',
  'brand.200': '#e4dbff',
  'brand.300': '#d9ccff',
  'brand.400': '#c9b6ff',
  'brand.500': '#b79eff',
  'brand.600': '#9470ff',
  'brand.700': '#7849ff',
  'brand.800': '#5f33e6',
  'brand.900': '#4315cb',
  'brand.1000': '#321098',
  // Brand Secondary
  'brandSecondary.100': '#f6f2fd',
  'brandSecondary.200': '#e4dbff',
  'brandSecondary.300': '#d9ccff',
  'brandSecondary.400': '#c9b6ff',
  'brandSecondary.500': '#b79eff',
  'brandSecondary.600': '#9470ff',
  'brandSecondary.700': '#7849ff',
  'brandSecondary.800': '#5f33e6',
  'brandSecondary.900': '#4315cb',
  'brandSecondary.1000': '#321098',
  // Critical
  'critical.100': '#fde7e9',
  'critical.200': '#fac4c9',
  'critical.300': '#f9b4ba',
  'critical.400': '#f79ca4',
  'critical.500': '#f57f89',
  'critical.600': '#f14755',
  'critical.700': '#d80e25',
  'critical.800': '#c50c22',
  'critical.900': '#8d0411',
  'critical.1000': '#6d030d',
  // Success
  'success.100': '#dff5e7',
  'success.200': '#b1e2c4',
  'success.300': '#9bdab3',
  'success.400': '#7dcf9d',
  'success.500': '#54bf7e',
  'success.600': '#41ae6c',
  'success.700': '#028838',
  'success.800': '#00702d',
  'success.900': '#014b1f',
  'success.1000': '#012811',
  // Warning
  'warning.100': '#fff8e6',
  'warning.200': '#fff0ca',
  'warning.300': '#ffe9b2',
  'warning.400': '#ffe299',
  'warning.500': '#ffd875',
  'warning.600': '#fdc535',
  'warning.700': '#fdb702',
  'warning.800': '#e6a702',
  'warning.900': '#b88501',
  'warning.1000': '#986e01',
  // Informative
  'informative.100': '#e6f0fe',
  'informative.200': '#c7dafd',
  'informative.300': '#b5cefc',
  'informative.400': '#a2c1fb',
  'informative.500': '#8fb4fa',
  'informative.600': '#5484f8',
  'informative.700': '#306af7',
  'informative.800': '#2256d6',
  'informative.900': '#0351c0',
  'informative.1000': '#023d91',
  // Decorative
  'decorative.1': '#ead6d4',
  'decorative.2': '#ffe0d6',
  'decorative.3': '#ffd0ea',
  'decorative.4': '#d9e1fd',
  'decorative.5': '#c9f8f8',
  // Focus
  'focus.primary': '#0548cf',
  'focus.inverse': '#3798f2',
};

/** Resolve a `{global.brand.700}` reference to its hex value */
function g(ref: string): string {
  const match = ref.match(/\{global\.(.+?)\}/);
  if (!match) return ref; // already a raw value (shouldn't happen)
  return G[match[1]] ?? '#cccccc';
}

function row(token: string, globalRef: string): SemanticTokenRow {
  return { token, globalRef, hex: g(globalRef) };
}

// ─────────────────────────────────────────────────────────────────────────────
// Global palette — single searchable data model
// ─────────────────────────────────────────────────────────────────────────────

/** A swatch that also carries its full global token key (e.g. `neutral.100`) for search. */
interface GlobalSwatch extends SwatchData {
  /** Full token key used for searching, e.g. `brand.700` or `neutral.AD15`. */
  key: string;
}

interface GlobalGroup {
  name: string;
  swatches: GlobalSwatch[];
  /** Render on a dark background (used for white-overlay alpha swatches). */
  dark?: boolean;
}

/** Build a numbered scale (`prefix.100 … prefix.1000`) as searchable swatches. */
function scale(prefix: string, steps: number[]): GlobalSwatch[] {
  return steps.map((s) => ({
    step: String(s),
    hex: G[`${prefix}.${s}`] ?? '#ccc',
    key: `${prefix}.${s}`,
  }));
}

/** Build named swatches (e.g. decorative, focus) as searchable swatches. */
function named(prefix: string, names: (string | number)[]): GlobalSwatch[] {
  return names.map((n) => ({
    step: String(n),
    hex: G[`${prefix}.${n}`] ?? '#ccc',
    key: `${prefix}.${n}`,
  }));
}

const SCALE_STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const ALPHA_STEPS = ['A0', 'A15', 'A35', 'A60', 'A80'];
const ALPHA_DARK_STEPS = ['AD0', 'AD15', 'AD35', 'AD60', 'AD80'];

const GLOBAL_GROUPS: GlobalGroup[] = [
  { name: 'Brand', swatches: scale('brand', SCALE_STEPS) },
  { name: 'Brand Secondary', swatches: scale('brandSecondary', SCALE_STEPS) },
  { name: 'Neutral', swatches: scale('neutral', SCALE_STEPS) },
  { name: 'Neutral — Alpha (white overlay)', dark: true, swatches: named('neutral', ALPHA_STEPS) },
  { name: 'Neutral — Alpha Dark (neutral 1000 overlay)', swatches: named('neutral', ALPHA_DARK_STEPS) },
  { name: 'Critical', swatches: scale('critical', SCALE_STEPS) },
  { name: 'Success', swatches: scale('success', SCALE_STEPS) },
  { name: 'Warning', swatches: scale('warning', SCALE_STEPS) },
  { name: 'Informative', swatches: scale('informative', SCALE_STEPS) },
  { name: 'Decorative', swatches: named('decorative', [1, 2, 3, 4, 5]) },
  { name: 'Focus', swatches: named('focus', ['primary', 'inverse']) },
];

/** True when a swatch matches the query by token key or hex value. */
function swatchMatches(s: GlobalSwatch, q: string): boolean {
  return s.key.toLowerCase().includes(q) || s.hex.toLowerCase().includes(q);
}

const NoResults: React.FC<{ query: string }> = ({ query }) => (
  <div style={{ padding: '32px 4px', color: '#6B7280', fontSize: '14px' }}>
    No tokens match <code style={{ fontFamily: '"SFMono-Regular", Consolas, monospace', color: '#18191b' }}>{query}</code>.
  </div>
);

/** Render the global palette groups, filtered by an optional search query. */
function renderGlobalGroups(query: string): React.ReactNode {
  const q = query.trim().toLowerCase();
  const groups = q
    ? GLOBAL_GROUPS
        .map((g) => ({ ...g, swatches: g.swatches.filter((s) => swatchMatches(s, q)) }))
        .filter((g) => g.swatches.length > 0)
    : GLOBAL_GROUPS;

  if (groups.length === 0) return <NoResults query={query} />;

  return groups.map((g) => (
    <ColorPaletteGroup key={g.name} name={g.name} dark={g.dark} swatches={g.swatches} />
  ));
}

export const GlobalPalette: Story = {
  name: 'Global palette',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => <div style={{ padding: '24px 32px' }}>{renderGlobalGroups('')}</div>,
};

// ─────────────────────────────────────────────────────────────────────────────
// Story: SemanticColorTokens
// ─────────────────────────────────────────────────────────────────────────────

export const SemanticColorTokens: Story = {
  name: 'Semantic tokens',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ padding: '24px 32px' }}>
      <SemanticTokenTable
        title="Action"
        rows={[
          row('action.primary.rest',        '{global.brand.700}'),
          row('action.primary.hover',       '{global.brand.800}'),
          row('action.primary.pressed',     '{global.brand.900}'),
          row('action.primary.disabled',    '{global.neutral.300}'),
          row('action.secondary.rest',      '{global.neutral.100}'),
          row('action.secondary.hover',     '{global.brand.100}'),
          row('action.secondary.pressed',   '{global.brand.200}'),
          row('action.secondary.disabled',  '{global.neutral.300}'),
          row('action.tertiary.rest',       '{global.neutral.100}'),
          row('action.tertiary.hover',      '{global.neutral.300}'),
          row('action.tertiary.pressed',    '{global.neutral.400}'),
          row('action.tertiary.disabled',   '{global.neutral.300}'),
          row('action.criticalPrimary.rest',     '{global.critical.700}'),
          row('action.criticalPrimary.hover',    '{global.critical.800}'),
          row('action.criticalPrimary.pressed',  '{global.critical.900}'),
          row('action.criticalPrimary.disabled', '{global.neutral.300}'),
          row('action.criticalSecondary.rest',     '{global.neutral.100}'),
          row('action.criticalSecondary.hover',    '{global.critical.100}'),
          row('action.criticalSecondary.pressed',  '{global.critical.200}'),
          row('action.criticalSecondary.disabled', '{global.neutral.300}'),
          row('action.inversePrimary.rest',     '{global.neutral.100}'),
          row('action.inversePrimary.hover',    '{global.neutral.A80}'),
          row('action.inversePrimary.pressed',  '{global.neutral.A60}'),
          row('action.inversePrimary.disabled', '{global.neutral.300}'),
          row('action.inverseSecondary.rest',     '{global.neutral.A0}'),
          row('action.inverseSecondary.hover',    '{global.neutral.A15}'),
          row('action.inverseSecondary.pressed',  '{global.neutral.A35}'),
          row('action.inverseSecondary.disabled', '{global.neutral.300}'),
        ]}
      />

      <SemanticTokenTable
        title="Background"
        rows={[
          row('background.primary',                '{global.neutral.100}'),
          row('background.secondary',              '{global.neutral.200}'),
          row('background.brand.primary',          '{global.brand.700}'),
          row('background.brand.secondary',        '{global.brand.100}'),
        ]}
      />

      <SemanticTokenTable
        title="Surface"
        rows={[
          row('surface.primary.rest',       '{global.neutral.100}'),
          row('surface.primary.hover',      '{global.neutral.300}'),
          row('surface.primary.pressed',    '{global.neutral.400}'),
          row('surface.primary.selected',   '{global.brand.100}'),
          row('surface.primary.disabled',   '{global.neutral.300}'),
          row('surface.secondary.rest',     '{global.neutral.200}'),
          row('surface.secondary.hover',    '{global.neutral.400}'),
          row('surface.secondary.pressed',  '{global.neutral.500}'),
          row('surface.secondary.selected', '{global.brand.100}'),
          row('surface.secondary.disabled', '{global.neutral.300}'),
          row('surface.tertiary.rest',      '{global.neutral.400}'),
          row('surface.tertiary.hover',     '{global.neutral.500}'),
          row('surface.tertiary.pressed',   '{global.neutral.600}'),
          row('surface.tertiary.selected',  '{global.neutral.100}'),
          row('surface.tertiary.disabled',  '{global.neutral.300}'),
          row('surface.inverse',            '{global.neutral.1000}'),
        ]}
      />

      <SemanticTokenTable
        title="Text"
        rows={[
          row('text.primary',                  '{global.neutral.1000}'),
          row('text.secondary',                '{global.neutral.700}'),
          row('text.inverse',                  '{global.neutral.100}'),
          row('text.disabled',                 '{global.neutral.500}'),
          row('text.brand.rest',               '{global.brand.700}'),
          row('text.brand.hover',              '{global.brand.800}'),
          row('text.brand.pressed',            '{global.brand.900}'),
          row('text.brand.onColor',            '{global.brand.900}'),
          row('text.critical.rest',            '{global.critical.700}'),
          row('text.critical.hover',           '{global.critical.800}'),
          row('text.critical.pressed',         '{global.critical.900}'),
          row('text.critical.onColor',         '{global.critical.900}'),
          row('text.informative.rest',         '{global.informative.700}'),
          row('text.success.rest',             '{global.success.700}'),
        ]}
      />

      <SemanticTokenTable
        title="Border"
        rows={[
          row('border.static',                  '{global.neutral.400}'),
          row('border.inverse',                 '{global.neutral.100}'),
          row('border.brand',                   '{global.brand.700}'),
          row('border.critical',                '{global.critical.700}'),
          row('border.success',                 '{global.success.700}'),
          row('border.warning',                 '{global.warning.700}'),
          row('border.informative',             '{global.informative.700}'),
          row('border.neutral',                 '{global.neutral.1000}'),
          row('border.interactive.rest',        '{global.neutral.600}'),
          row('border.interactive.hover',       '{global.neutral.1000}'),
          row('border.interactive.selected',    '{global.brand.700}'),
          row('border.interactive.disabled',    '{global.neutral.400}'),
        ]}
      />

      <SemanticTokenTable
        title="Fill"
        rows={[
          row('fill.primary',              '{global.neutral.100}'),
          row('fill.secondary',            '{global.neutral.300}'),
          row('fill.tertiary',             '{global.neutral.400}'),
          row('fill.disabled',             '{global.neutral.300}'),
          row('fill.inverse',              '{global.neutral.1000}'),
          row('fill.readOnly',             '{global.neutral.700}'),
          row('fill.brand.primary',        '{global.brand.700}'),
          row('fill.brand.secondary',      '{global.brand.100}'),
          row('fill.critical.primary',     '{global.critical.700}'),
          row('fill.critical.secondary',   '{global.critical.100}'),
          row('fill.success.primary',      '{global.success.700}'),
          row('fill.success.secondary',    '{global.success.100}'),
          row('fill.warning.primary',      '{global.warning.700}'),
          row('fill.warning.secondary',    '{global.warning.100}'),
          row('fill.informative.primary',  '{global.informative.700}'),
          row('fill.informative.secondary','{global.informative.100}'),
          row('fill.decorative.1',         '{global.decorative.1}'),
          row('fill.decorative.2',         '{global.decorative.2}'),
          row('fill.decorative.3',         '{global.decorative.3}'),
          row('fill.decorative.4',         '{global.decorative.4}'),
          row('fill.decorative.5',         '{global.decorative.5}'),
        ]}
      />

      <SemanticTokenTable
        title="Icon"
        rows={[
          row('icon.primary',        '{global.neutral.1000}'),
          row('icon.disabled',       '{global.neutral.500}'),
          row('icon.readOnly',       '{global.neutral.700}'),
          row('icon.inverse',        '{global.neutral.100}'),
          row('icon.inverseDisabled','{global.neutral.A35}'),
          row('icon.brand',          '{global.brand.700}'),
          row('icon.informative',    '{global.informative.700}'),
          row('icon.critical',       '{global.critical.700}'),
          row('icon.success',        '{global.success.700}'),
          row('icon.warning',        '{global.warning.700}'),
        ]}
      />

      <SemanticTokenTable
        title="Link"
        rows={[
          row('link.primary.rest',      '{global.neutral.1000}'),
          row('link.primary.hover',     '{global.neutral.1000}'),
          row('link.primary.pressed',   '{global.neutral.700}'),
          row('link.primary.disabled',  '{global.neutral.500}'),
          row('link.secondary.rest',    '{global.brand.700}'),
          row('link.secondary.hover',   '{global.brand.800}'),
          row('link.secondary.pressed', '{global.brand.900}'),
          row('link.secondary.disabled','{global.neutral.500}'),
          row('link.inverse.rest',      '{global.neutral.100}'),
          row('link.inverse.hover',     '{global.neutral.A80}'),
          row('link.inverse.pressed',   '{global.neutral.A60}'),
          row('link.inverse.disabled',  '{global.neutral.A35}'),
        ]}
      />

      <SemanticTokenTable
        title="Focus"
        rows={[
          row('focus.primary', '{global.focus.primary}'),
          row('focus.inverse', '{global.focus.inverse}'),
        ]}
      />
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Story: ComponentColorTokens
// ─────────────────────────────────────────────────────────────────────────────

export const ComponentColorTokens: Story = {
  name: 'Component tokens',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ padding: '24px 32px' }}>
      <SemanticTokenTable
        title="Text Button (NakedButton)"
        rows={[
          row('component.button.textPrimary.rest.label',     '{global.neutral.1000}'),
          row('component.button.textPrimary.hover.label',    '{global.brand.700}'),
          row('component.button.textPrimary.pressed.label',  '{global.brand.800}'),
          row('component.button.textPrimary.disabled.label', '{global.neutral.500}'),
          row('component.button.textSecondary.rest.label',   '{global.brand.700}'),
          row('component.button.textSecondary.hover.label',  '{global.brand.800}'),
          row('component.button.textSecondary.pressed.label','{global.brand.900}'),
          row('component.button.textInverse.rest.label',     '{global.neutral.100}'),
          row('component.button.textInverse.hover.label',    '{global.neutral.A80}'),
          row('component.button.textInverse.pressed.label',  '{global.neutral.A60}'),
          row('component.button.textCritical.rest.label',    '{global.critical.700}'),
          row('component.button.textCritical.hover.label',   '{global.critical.800}'),
          row('component.button.textCritical.pressed.label', '{global.critical.900}'),
        ]}
      />

      <SemanticTokenTable
        title="Tabs"
        rows={[
          row('component.tabs.default.rest',     '{global.neutral.700}'),
          row('component.tabs.default.hover',    '{global.brand.800}'),
          row('component.tabs.default.pressed',  '{global.brand.900}'),
          row('component.tabs.default.selected', '{global.brand.700}'),
          row('component.tabs.neutral.rest',     '{global.neutral.700}'),
          row('component.tabs.neutral.hover',    '{global.neutral.1000}'),
          row('component.tabs.neutral.pressed',  '{global.neutral.1000}'),
          row('component.tabs.neutral.selected', '{global.neutral.1000}'),
        ]}
      />
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Story: TokenLevels — unified three-level explorer with internal tab switcher
// ─────────────────────────────────────────────────────────────────────────────

const LEVEL_DEFS = [
  {
    id: 'global',
    number: '1',
    label: 'Global',
    sublabel: 'Raw palette',
    description: 'Raw hex values — the complete color palette. Only used when defining a new semantic token, never directly in components.',
  },
  {
    id: 'semantic',
    number: '2',
    label: 'Semantic',
    sublabel: 'Intent mapping',
    description: 'Maps a global color to a functional meaning. Expresses what a color is for, not what it is. Use these in component themes.',
  },
  {
    id: 'component',
    number: '3',
    label: 'Component',
    sublabel: 'Part-level tokens',
    description: 'Ties a semantic token to a specific part and state of a specific component. Defined in each component\'s *.theme.ts file.',
  },
] as const;

type LevelId = 'global' | 'semantic' | 'component';

interface ContentProps {
  /** Search query — filters swatches/rows by token key, global ref, or hex. */
  query?: string;
}

const GlobalContent: React.FC<ContentProps> = ({ query = '' }) => (
  <div style={{ padding: '24px 32px' }}>{renderGlobalGroups(query)}</div>
);

// ─── Semantic + component token tables, as filterable data ───────────────────

interface TokenTableDef {
  title: string;
  rows: SemanticTokenRow[];
}

/** True when a row matches the query by token name, global ref, or resolved hex. */
function rowMatches(r: SemanticTokenRow, q: string): boolean {
  return (
    r.token.toLowerCase().includes(q) ||
    r.globalRef.toLowerCase().includes(q) ||
    r.hex.toLowerCase().includes(q)
  );
}

/** Render a set of token tables, hiding rows (and empty tables) that don't match the query. */
function renderTokenTables(tables: TokenTableDef[], query: string): React.ReactNode {
  const q = query.trim().toLowerCase();
  const filtered = q
    ? tables
        .map((t) => ({ ...t, rows: t.rows.filter((r) => rowMatches(r, q)) }))
        .filter((t) => t.rows.length > 0)
    : tables;

  if (filtered.length === 0) return <NoResults query={query} />;

  return filtered.map((t) => (
    <SemanticTokenTable key={t.title} title={t.title} rows={t.rows} />
  ));
}

const SEMANTIC_TABLES: TokenTableDef[] = [
  { title: 'Action', rows: [
    row('action.primary.rest',         '{global.brand.700}'),
    row('action.primary.hover',        '{global.brand.800}'),
    row('action.primary.pressed',      '{global.brand.900}'),
    row('action.primary.disabled',     '{global.neutral.300}'),
    row('action.secondary.rest',       '{global.neutral.100}'),
    row('action.secondary.hover',      '{global.brand.100}'),
    row('action.secondary.pressed',    '{global.brand.200}'),
    row('action.secondary.disabled',   '{global.neutral.300}'),
    row('action.criticalPrimary.rest',    '{global.critical.700}'),
    row('action.criticalPrimary.hover',   '{global.critical.800}'),
    row('action.criticalPrimary.pressed', '{global.critical.900}'),
    row('action.inversePrimary.rest',     '{global.neutral.100}'),
    row('action.inversePrimary.hover',    '{global.neutral.A80}'),
    row('action.inversePrimary.pressed',  '{global.neutral.A60}'),
  ] },
  { title: 'Text', rows: [
    row('text.primary',               '{global.neutral.1000}'),
    row('text.secondary',             '{global.neutral.700}'),
    row('text.inverse',               '{global.neutral.100}'),
    row('text.disabled',              '{global.neutral.500}'),
    row('text.brand.rest',            '{global.brand.700}'),
    row('text.brand.hover',           '{global.brand.800}'),
    row('text.brand.pressed',         '{global.brand.900}'),
    row('text.critical.rest',         '{global.critical.700}'),
    row('text.informative.rest',      '{global.informative.700}'),
    row('text.success.rest',          '{global.success.700}'),
  ] },
  { title: 'Surface', rows: [
    row('surface.primary.rest',       '{global.neutral.100}'),
    row('surface.primary.hover',      '{global.neutral.300}'),
    row('surface.primary.pressed',    '{global.neutral.400}'),
    row('surface.primary.selected',   '{global.brand.100}'),
    row('surface.secondary.rest',     '{global.neutral.200}'),
    row('surface.secondary.hover',    '{global.neutral.400}'),
    row('surface.inverse',            '{global.neutral.1000}'),
  ] },
  { title: 'Border', rows: [
    row('border.static',              '{global.neutral.400}'),
    row('border.inverse',             '{global.neutral.100}'),
    row('border.brand',               '{global.brand.700}'),
    row('border.critical',            '{global.critical.700}'),
    row('border.success',             '{global.success.700}'),
    row('border.warning',             '{global.warning.700}'),
    row('border.informative',         '{global.informative.700}'),
    row('border.interactive.rest',    '{global.neutral.600}'),
    row('border.interactive.hover',   '{global.neutral.1000}'),
    row('border.interactive.selected','{global.brand.700}'),
  ] },
  { title: 'Fill', rows: [
    row('fill.primary',               '{global.neutral.100}'),
    row('fill.secondary',             '{global.neutral.300}'),
    row('fill.disabled',              '{global.neutral.300}'),
    row('fill.brand.primary',         '{global.brand.700}'),
    row('fill.brand.secondary',       '{global.brand.100}'),
    row('fill.critical.primary',      '{global.critical.700}'),
    row('fill.success.primary',       '{global.success.700}'),
    row('fill.warning.primary',       '{global.warning.700}'),
    row('fill.informative.primary',   '{global.informative.700}'),
  ] },
  { title: 'Icon', rows: [
    row('icon.primary',               '{global.neutral.1000}'),
    row('icon.disabled',              '{global.neutral.500}'),
    row('icon.inverse',               '{global.neutral.100}'),
    row('icon.brand',                 '{global.brand.700}'),
    row('icon.critical',              '{global.critical.700}'),
    row('icon.success',               '{global.success.700}'),
    row('icon.warning',               '{global.warning.700}'),
  ] },
  { title: 'Link', rows: [
    row('link.primary.rest',          '{global.neutral.1000}'),
    row('link.primary.disabled',      '{global.neutral.500}'),
    row('link.secondary.rest',        '{global.brand.700}'),
    row('link.secondary.hover',       '{global.brand.800}'),
    row('link.inverse.rest',          '{global.neutral.100}'),
    row('link.inverse.disabled',      '{global.neutral.A35}'),
  ] },
  { title: 'Focus', rows: [
    row('focus.primary',              '{global.focus.primary}'),
    row('focus.inverse',              '{global.focus.inverse}'),
  ] },
];

const COMPONENT_TABLES: TokenTableDef[] = [
  { title: 'Text Button (NakedButton)', rows: [
    row('component.button.textPrimary.rest.label',     '{global.neutral.1000}'),
    row('component.button.textPrimary.hover.label',    '{global.brand.700}'),
    row('component.button.textPrimary.pressed.label',  '{global.brand.800}'),
    row('component.button.textPrimary.disabled.label', '{global.neutral.500}'),
    row('component.button.textSecondary.rest.label',   '{global.brand.700}'),
    row('component.button.textSecondary.hover.label',  '{global.brand.800}'),
    row('component.button.textSecondary.pressed.label','{global.brand.900}'),
    row('component.button.textInverse.rest.label',     '{global.neutral.100}'),
    row('component.button.textInverse.hover.label',    '{global.neutral.A80}'),
    row('component.button.textCritical.rest.label',    '{global.critical.700}'),
    row('component.button.textCritical.hover.label',   '{global.critical.800}'),
  ] },
  { title: 'Tabs', rows: [
    row('component.tabs.default.rest',     '{global.neutral.700}'),
    row('component.tabs.default.hover',    '{global.brand.800}'),
    row('component.tabs.default.selected', '{global.brand.700}'),
    row('component.tabs.neutral.rest',     '{global.neutral.700}'),
    row('component.tabs.neutral.hover',    '{global.neutral.1000}'),
    row('component.tabs.neutral.selected', '{global.neutral.1000}'),
  ] },
];

const SemanticContent: React.FC<ContentProps> = ({ query = '' }) => (
  <div style={{ padding: '24px 32px' }}>{renderTokenTables(SEMANTIC_TABLES, query)}</div>
);

const ComponentContent: React.FC<ContentProps> = ({ query = '' }) => (
  <div style={{ padding: '24px 32px' }}>{renderTokenTables(COMPONENT_TABLES, query)}</div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Story: TokenArchitecture — visual resolution chain (replaces numbered list)
// ─────────────────────────────────────────────────────────────────────────────

export const TokenArchitecture: Story = {
  name: 'Token architecture diagram',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => {
    const MONO = '"SFMono-Regular", Consolas, monospace';

    return (
      <CascadeDiagram
        connectorLabel="used by"
        levels={[
          {
            label: 'Global',
            sublabel: 'Raw palette',
            description: 'The raw hex values behind every color in the system. Never use these directly in components — always go through a semantic token first.',
            visual: (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {['#f6f2fd', '#e4dbff', '#b79eff', '#9470ff', '#7849ff', '#5f33e6', '#4315cb'].map((c) => (
                    <div key={c} style={{ width: '20px', height: '20px', borderRadius: '4px', background: c, border: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }} />
                  ))}
                </div>
                <span style={{ fontFamily: MONO, fontSize: '10px', color: '#9CA3AF' }}>global.brand.100 → 1000</span>
              </div>
            ),
          },
          {
            label: 'Semantic',
            sublabel: 'Intent mapping',
            description: "Gives a global color a purpose — names what it's for (\"primary action fill\") without locking in a specific hex. Use these in all component themes.",
            visual: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { name: 'action.primary.rest', color: '#7849ff' },
                  { name: 'text.primary',        color: '#18191b' },
                  { name: 'border.critical',     color: '#d80e25' },
                ].map(({ name, color }) => (
                  <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                    <span style={{ fontFamily: MONO, fontSize: '10px', color: '#6B7280' }}>{name}</span>
                  </div>
                ))}
              </div>
            ),
          },
          {
            label: 'Component',
            sublabel: 'Part-level token',
            description: 'Ties a semantic token to a specific part and state of one component. Defined in ComponentName.theme.ts — never references a global token directly.',
            visual: (
              <PartCallout label="button.primary.bg">
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  background: '#7849ff', color: '#fff',
                  borderRadius: '6px', padding: '6px 14px',
                  fontSize: '11px', fontWeight: 600,
                  fontFamily: "'Nunito Sans', sans-serif",
                }}>
                  Button
                </div>
              </PartCallout>
            ),
          },
        ]}
        trace={{
          tokens: [
            'global.brand.700',
            'semantic.action.primary.rest',
            'component.button.primary.bg',
          ],
          resolvedHex: '#7849ff',
        }}
      />
    );
  },
};

export const TokenLevels: Story = {
  name: 'Token levels',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => {
    const hashLevel = (): LevelId => {
      const h = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
      return (LEVEL_DEFS.find((l) => l.id === h)?.id ?? 'global') as LevelId;
    };

    const [active, setActive] = React.useState<LevelId>(hashLevel);
    const [query, setQuery] = React.useState('');

    React.useEffect(() => {
      const onHashChange = () => setActive(hashLevel());
      window.addEventListener('hashchange', onHashChange);
      return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    return (
      <div style={{ fontFamily: "'Nunito Sans', sans-serif", border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
        {/* Level selector strip */}
        <div
          style={{
            display: 'flex',
            borderBottom: '2px solid #E2E8F0',
            background: '#fff',
          }}
        >
          {LEVEL_DEFS.map((level) => {
            const isActive = active === level.id;
            return (
              <button
                key={level.id}
                onClick={() => {
                  setActive(level.id);
                  history.replaceState(null, '', '#' + level.id);
                }}
                style={{
                  padding: '14px 28px',
                  border: 'none',
                  background: 'none',
                  borderBottom: `2px solid ${isActive ? '#7849ff' : 'transparent'}`,
                  marginBottom: '-2px',
                  cursor: 'pointer',
                  fontFamily: "'Nunito Sans', sans-serif",
                  outline: 'none',
                }}
              >
                <h2 style={{
                  margin: 0,
                  fontSize: '18px',
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? '#111827' : '#6B7280',
                  lineHeight: 1.2,
                  fontFamily: "'Nunito Sans', sans-serif",
                }}>
                  {level.label}
                </h2>
              </button>
            );
          })}
        </div>

        {/* Description bar */}
        <div
          style={{
            padding: '10px 24px',
            background: '#fff',
            borderBottom: '1px solid #E2E8F0',
            fontSize: '13px',
            color: '#4A5568',
            fontFamily: "'Nunito Sans', sans-serif",
          }}
        >
          {LEVEL_DEFS.find((l) => l.id === active)?.description}
        </div>

        {/* Search bar — filter by token key (e.g. neutral.100) or hex (e.g. #ffffff) */}
        <div
          style={{
            padding: '12px 24px',
            background: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span aria-hidden style={{ fontSize: '14px', color: '#94A3B8' }}>🔍</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search by token or hex — e.g. "neutral.100" or "#ffffff"'
            aria-label="Search color tokens by key or hex value"
            style={{
              flex: 1,
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              padding: '7px 12px',
              fontSize: '13px',
              fontFamily: '"SFMono-Regular", Consolas, monospace',
              color: '#18191b',
              background: '#fff',
              outline: 'none',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                border: '1px solid #E2E8F0',
                borderRadius: '6px',
                padding: '7px 12px',
                fontSize: '13px',
                background: '#fff',
                color: '#475569',
                cursor: 'pointer',
                fontFamily: "'Nunito Sans', sans-serif",
                whiteSpace: 'nowrap',
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Content */}
        {active === 'global' && <GlobalContent query={query} />}
        {active === 'semantic' && <SemanticContent query={query} />}
        {active === 'component' && <ComponentContent query={query} />}
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Story: SemanticTokensQuickRef — single swatch per semantic token (compact)
// ─────────────────────────────────────────────────────────────────────────────

export const SemanticSwatchGrid: Story = {
  name: 'Semantic swatch grid',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => {
    const groups: { title: string; swatches: Array<{ step: string; hex: string }> }[] = [
      {
        title: 'Text',
        swatches: [
          { step: 'text.primary', hex: G['neutral.1000'] },
          { step: 'text.secondary', hex: G['neutral.700'] },
          { step: 'text.inverse', hex: G['neutral.100'] },
          { step: 'text.disabled', hex: G['neutral.500'] },
          { step: 'text.brand', hex: G['brand.700'] },
          { step: 'text.critical', hex: G['critical.700'] },
          { step: 'text.success', hex: G['success.700'] },
          { step: 'text.info', hex: G['informative.700'] },
        ],
      },
      {
        title: 'Action fills',
        swatches: [
          { step: 'action.primary', hex: G['brand.700'] },
          { step: 'action.secondary', hex: G['neutral.100'] },
          { step: 'action.critical', hex: G['critical.700'] },
          { step: 'action.success', hex: G['success.700'] },
          { step: 'action.disabled', hex: G['neutral.300'] },
        ],
      },
      {
        title: 'Border',
        swatches: [
          { step: 'border.static', hex: G['neutral.400'] },
          { step: 'border.brand', hex: G['brand.700'] },
          { step: 'border.critical', hex: G['critical.700'] },
          { step: 'border.success', hex: G['success.700'] },
          { step: 'border.warning', hex: G['warning.700'] },
          { step: 'border.info', hex: G['informative.700'] },
        ],
      },
      {
        title: 'Focus',
        swatches: [
          { step: 'focus.primary', hex: G['focus.primary'] },
          { step: 'focus.inverse', hex: G['focus.inverse'] },
        ],
      },
    ];

    return (
      <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {groups.map((group) => (
          <div key={group.title}>
            <div style={{
              fontSize: '12px', fontWeight: 700, color: '#6B7280',
              textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px',
            }}>
              {group.title}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {group.swatches.map((s) => (
                <ColorSwatch key={s.step} step={s.step} hex={s.hex} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// ─── Related components ──────────────────────────────────────

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Button"
        url="/?path=/docs/components-action-button--docs"
        preview={<Button label="Label" variant="primary" />}
      />
      <RelatedComponent
        name="Link"
        url="/?path=/docs/components-navigation-link--docs"
        preview={<Link href="#" label="View invoice" variant="standalone" />}
      />
    </RelatedComponents>
  ),
};
