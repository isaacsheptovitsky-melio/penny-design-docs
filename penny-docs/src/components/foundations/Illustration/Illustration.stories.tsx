import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { getDefaultIllustrations } from '@/theme/defaultIllustrations/defaultIllustrations.generated';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';
import { VariantGrid, VariantGridItem } from '@/storybook-utils/VariantGrid';
import { Icon } from '@/components/foundations/Icon/Icon';
import { Illustration, type IllustrationType } from './Illustration';

const TYPES: IllustrationType[] = ['new-email', 'announce', 'celebration', 'error', 'approve', 'bank-success'];

const meta: Meta<typeof Illustration> = {
  title: 'Foundations/Illustrations',
  component: Illustration,
  argTypes: {
    type: {
      control: 'select',
      options: TYPES,
      description: 'Which illustration to render.',
      table: { type: { summary: TYPES.join(' | ') }, category: 'props' },
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
      description: 'Illustration size — small (96), medium (120), large (144).',
      table: { defaultValue: { summary: 'medium' }, type: { summary: "'small' | 'medium' | 'large'" }, category: 'props' },
    },
  },
  args: { type: 'new-email', size: 'medium' },
};

export default meta;
type Story = StoryObj<typeof Illustration>;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'fullscreen', controls: { include: ['type', 'size'] } },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
      <Illustration {...args} />
    </div>
  ),
};

const CDN_URL = (import.meta.env.VITE_ASSETS_CDN as string) || '';
const ALL_ILLUSTRATION_KEYS = Object.keys(getDefaultIllustrations(CDN_URL)).sort();

// Fetches an SVG from the CDN and renders it inline so penny-illustration-* CSS classes apply.
const CdnIllustration = ({ name }: { name: string }) => {
  const [html, setHtml] = useState('');
  useEffect(() => {
    fetch(`${CDN_URL}/assets/1.0.0/illustrations/${name}.svg`)
      .then((r) => r.text())
      .then(setHtml)
      .catch(() => {});
  }, [name]);
  return (
    <span
      style={{ display: 'inline-flex', width: 96, height: 96, flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const Gallery: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    const filtered = query
      ? ALL_ILLUSTRATION_KEYS.filter((k) => k.includes(query.toLowerCase()))
      : ALL_ILLUSTRATION_KEYS;
    return (
      <div style={{ background: '#fff', padding: '20px 16px', fontFamily: 'Poppins, sans-serif' }}>
        {/* Apply penny-illustration-* token fills so inlined CDN SVGs are themed correctly */}
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
        <input
          type="text"
          placeholder="Search illustrations…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '8px 12px',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif',
            outline: 'none',
            marginBottom: '16px',
            color: '#18191b',
          }}
        />
        {filtered.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#94A3B8', fontSize: '14px' }}>
            No illustrations match &ldquo;{query}&rdquo;
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
            {filtered.map((key) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '20px 8px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  background: '#fff',
                }}
              >
                <CdnIllustration name={key} />
                <span style={{ fontFamily: '"SFMono-Regular", Consolas, monospace', fontSize: '11px', color: '#64748B', textAlign: 'center', wordBreak: 'break-all' }}>
                  {key}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } }, layout: 'fullscreen' },
};

export const Sizes: Story = {
  render: () => (
    <VariantGrid minItemWidth={120}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <VariantGridItem key={size} label={size}>
          <Illustration type="celebration" size={size} />
        </VariantGridItem>
      ))}
    </VariantGrid>
  ),
  parameters: { controls: { disable: true } },
};

export const RelatedComponentsBlock: StoryObj<typeof Illustration> = {
  name: 'Related',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Icons"
        url="/?path=/docs/foundations-icons--docs"
        preview={<Icon type="search" size="large" />}
      />
    </RelatedComponents>
  ),
};
