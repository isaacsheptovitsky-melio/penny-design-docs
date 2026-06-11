import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { defaultGlobalBorderRadii } from '@/theme/foundations/tokens/radii/defaultGlobalBorderRadii';

const meta: Meta = {
  title: 'Foundations/Border Radius',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

const mono = '"SFMono-Regular", Consolas, monospace';

// ─── Global ──────────────────────────────────────────────────────────────────

const GlobalContent = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '24px',
      padding: '24px 32px',
    }}
  >
    {(Object.keys(defaultGlobalBorderRadii) as (keyof typeof defaultGlobalBorderRadii)[]).map((key) => {
      const value = defaultGlobalBorderRadii[key];
      return (
        <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div
            style={{
              width: '100%',
              height: '64px',
              background: '#f6f2fd',
              border: '1px solid #7849ff',
              borderRadius: value === 'full' ? '9999px' : value,
            }}
          />
          <div>
            <div style={{ fontFamily: mono, fontSize: '12px', color: '#475569' }}>border-radius.{key}</div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>{value}</div>
          </div>
        </div>
      );
    })}
  </div>
);

// ─── Semantic + component token rows ───────────────────────────────────────────

type TokenRow = { token: string; ref: string; value: string; usedBy: string };

const SEMANTIC_ROWS: TokenRow[] = [
  {
    token: 'border-radius.action.default',
    ref: 'border-radius.200',
    value: '8px',
    usedBy: 'Action components — Button, Icon Button, Date picker',
  },
  {
    token: 'border-radius.input.default',
    ref: 'border-radius.200',
    value: '8px',
    usedBy:
      'Input components — Amount field, Combobox, Date field, File upload, Multi select, Phone field, Search bar, Secured text field, Segmented control, Select, Text area, Text field, Verification code field',
  },
];

const COMPONENT_ROWS: TokenRow[] = [
  { token: 'border-radius.pill.default', ref: 'border-radius.full', value: '9999px', usedBy: 'Pill' },
];

const RadiusPreview = ({ value }: { value: string }) => (
  <div style={{ width: '40px', height: '28px', background: '#f6f2fd', border: '1px solid #7849ff', borderRadius: value, flexShrink: 0 }} />
);

const TokenTable = ({ rows }: { rows: TokenRow[] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px 32px' }}>
    {rows.map((r) => (
      <div
        key={r.token}
        style={{
          display: 'grid',
          gridTemplateColumns: '56px 1fr',
          gap: '16px',
          alignItems: 'center',
          padding: '14px 16px',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
        }}
      >
        <RadiusPreview value={r.value === '9999px' ? '9999px' : r.value} />
        <div>
          <div style={{ fontFamily: mono, fontSize: '12px', color: '#475569' }}>
            {r.token} <span style={{ color: '#94A3B8' }}>→ {r.ref} ({r.value})</span>
          </div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px', lineHeight: 1.5 }}>
            <strong>Used by:</strong> {r.usedBy}
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ─── Token explorer ────────────────────────────────────────────────────────────

const LEVELS = [
  { id: 'global', label: 'Global', description: 'The base radius scale. Only referenced when defining a semantic or component token — not used directly in components.' },
  { id: 'semantic', label: 'Semantic', description: 'Default radius per component category. Reach for these in component themes.' },
  { id: 'component', label: 'Component', description: 'A specific component part’s radius, tied to a semantic or global token.' },
] as const;

type LevelId = (typeof LEVELS)[number]['id'];

export const TokenExplorer: Story = {
  name: 'Token explorer',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => {
    const [active, setActive] = React.useState<LevelId>('global');
    return (
      <div style={{ fontFamily: "'Nunito Sans', sans-serif", border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '2px solid #E2E8F0', background: '#fff' }}>
          {LEVELS.map((level) => {
            const isActive = active === level.id;
            return (
              <button
                key={level.id}
                onClick={() => setActive(level.id)}
                style={{
                  padding: '14px 28px',
                  border: 'none',
                  background: 'none',
                  borderBottom: `2px solid ${isActive ? '#7849ff' : 'transparent'}`,
                  marginBottom: '-2px',
                  cursor: 'pointer',
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: '18px',
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? '#111827' : '#6B7280',
                }}
              >
                {level.label}
              </button>
            );
          })}
        </div>
        <div style={{ padding: '10px 24px', background: '#fff', borderBottom: '1px solid #E2E8F0', fontSize: '13px', color: '#4A5568' }}>
          {LEVELS.find((l) => l.id === active)?.description}
        </div>
        {active === 'global' && <GlobalContent />}
        {active === 'semantic' && <TokenTable rows={SEMANTIC_ROWS} />}
        {active === 'component' && <TokenTable rows={COMPONENT_ROWS} />}
      </div>
    );
  },
};
