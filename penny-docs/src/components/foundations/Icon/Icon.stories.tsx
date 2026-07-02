import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { getDefaultIconsMap } from '@/theme/icons/icons.generated';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';
import { VariantGrid, VariantGridItem } from '@/storybook-utils/VariantGrid';
import { Illustration } from '@/components/foundations/Illustration/Illustration';
import { Icon, type IconColor, type IconProps, type IconSize } from './Icon';

import iconsHero from '@/assets/icons-hero.png';
import iconsGridSizes from '@/assets/icons-grid-sizes.png';
import iconsLarge24px from '@/assets/icons-large-24px.png';
import iconsSmall16px from '@/assets/icons-small-16px.png';
import iconsGridComparison from '@/assets/icons-grid-comparison.png';
import iconsColors from '@/assets/icons-colors.png';
import iconsFigmaStructure from '@/assets/icons-figma-structure.png';
import iconsLibrary from '@/assets/icons-library.png';

const ICON_KEYS: IconProps['type'][] = [
  'add',
  'caret-down',
  'checked',
  'chevron-left',
  'chevron-right',
  'close',
  'close-mini',
  'delete',
  'edit',
  'filter',
  'info',
  'invoices',
  'more-vertical',
  'search',
  'wallet',
  'warning',
];

const meta: Meta<typeof Icon> = {
  title: 'Foundations/Icons',
  component: Icon,
  argTypes: {
    type: {
      control: 'select',
      options: ICON_KEYS,
      description: 'Which icon to render.',
      table: { type: { summary: 'IconKey' }, category: 'props' },
    },
    size: {
      control: 'inline-radio',
      options: ['extra-small', 'small', 'large'],
      description: 'Icon size — extra-small (12), small (16), large (24).',
      table: { defaultValue: { summary: 'small' }, type: { summary: "'extra-small' | 'small' | 'large'" }, category: 'props' },
    },
    color: {
      control: 'select',
      options: ['default', 'inherit', 'inverse', 'brand', 'critical', 'success', 'informative'] satisfies IconColor[],
      description: 'Semantic color of the icon.',
      table: { defaultValue: { summary: 'default' }, type: { summary: 'IconColor' }, category: 'props' },
    },
  },
  args: { type: 'search', size: 'large', color: 'default' },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'fullscreen', controls: { include: ['type', 'size', 'color'] } },
  render: (args) => {
    const inverse = args.color === 'inverse';
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          background: inverse ? '#0F0728' : 'transparent',
        }}
      >
        <Icon {...args} />
      </div>
    );
  },
};

const CDN_URL = (import.meta.env.VITE_ASSETS_CDN as string) || '';
const ALL_ICON_KEYS = Object.keys(getDefaultIconsMap(CDN_URL)).sort();

export const Gallery: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    const filtered = query
      ? ALL_ICON_KEYS.filter((k) => k.includes(query.toLowerCase()))
      : ALL_ICON_KEYS;

    return (
      <div style={{ background: '#fff', padding: '20px 16px', fontFamily: 'Poppins, sans-serif' }}>
        <input
          type="text"
          placeholder="Search icons…"
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
            No icons match &ldquo;{query}&rdquo;
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
              gap: '12px',
            }}
          >
            {filtered.map((key) => {
              const mediumUrl = `${CDN_URL}/assets/1.0.0/icons/medium/${key}.svg`;
              return (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '18px 8px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    background: '#fff',
                  }}
                >
                  <img src={mediumUrl} alt={key} width={24} height={24} style={{ display: 'block' }} />
                  <span style={{ fontFamily: '"SFMono-Regular", Consolas, monospace', fontSize: '11px', color: '#64748B', textAlign: 'center', wordBreak: 'break-all' }}>
                    {key}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } }, layout: 'fullscreen' },
};

export const Sizes: Story = {
  render: () => (
    <VariantGrid minItemWidth={100}>
      {(['extra-small', 'small', 'large'] as IconSize[]).map((size) => (
        <VariantGridItem key={size} label={size}>
          <Icon type="wallet" size={size} />
        </VariantGridItem>
      ))}
    </VariantGrid>
  ),
  parameters: { controls: { disable: true } },
};

export const Colors: Story = {
  render: () => (
    <VariantGrid minItemWidth={100}>
      {(['default', 'brand', 'critical', 'success', 'informative'] as IconColor[]).map((color) => (
        <VariantGridItem key={color} label={color}>
          <Icon type="info" size="large" color={color} />
        </VariantGridItem>
      ))}
      <VariantGridItem label="inverse">
        <div style={{ background: '#0F0728', padding: '10px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon type="info" size="large" color="inverse" />
        </div>
      </VariantGridItem>
    </VariantGrid>
  ),
  parameters: { controls: { disable: true } },
};

const IMG_STORY_PARAMS = {
  controls: { disable: true },
  docs: { canvas: { sourceState: 'none' } },
};

const ZhImage = ({ src, alt }: { src: string; alt: string }) => (
  <div style={{ padding: '16px 8px', fontFamily: 'Poppins, sans-serif' }}>
    <img src={src} alt={alt} style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'block' }} />
  </div>
);

export const HeroImage: Story = {
  name: 'Icon bank',
  render: () => <ZhImage src={iconsHero} alt="Sample of Melio's custom icon bank" />,
  parameters: IMG_STORY_PARAMS,
};

export const GridSizes: Story = {
  name: 'Grid sizes',
  render: () => <ZhImage src={iconsGridSizes} alt="24px and 16px pixel grids side by side" />,
  parameters: IMG_STORY_PARAMS,
};

export const LargeGrid: Story = {
  name: 'Large 24px grid',
  render: () => <ZhImage src={iconsLarge24px} alt="Large 24px grid anatomy: 2px stroke, 2px corners, 1px frame" />,
  parameters: IMG_STORY_PARAMS,
};

export const SmallGrid: Story = {
  name: 'Small 16px grid',
  render: () => <ZhImage src={iconsSmall16px} alt="Small 16px grid anatomy: 1.5px stroke, 1.5px corners, 1px frame" />,
  parameters: IMG_STORY_PARAMS,
};

export const GridComparison: Story = {
  name: 'Grid comparison',
  render: () => <ZhImage src={iconsGridComparison} alt="Large 24px vs Small 16px grid side-by-side comparison" />,
  parameters: IMG_STORY_PARAMS,
};

export const ColorImage: Story = {
  name: 'Icon colors',
  render: () => <ZhImage src={iconsColors} alt="The same icon rendered in brand, primary and inverse colors" />,
  parameters: IMG_STORY_PARAMS,
};

export const FigmaStructure: Story = {
  name: 'Figma structure',
  render: () => <ZhImage src={iconsFigmaStructure} alt="Figma layer structure for an icon: outer frame, wrapper, Vector" />,
  parameters: IMG_STORY_PARAMS,
};

export const Library: Story = {
  name: 'Full library',
  render: () => <ZhImage src={iconsLibrary} alt="Overview of the full Melio icon library (~300 icons)" />,
  parameters: IMG_STORY_PARAMS,
};

export const RelatedComponentsBlock: Story = {
  name: 'Related',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Illustrations"
        url="/?path=/docs/foundations-illustrations--docs"
        preview={<Illustration type="celebration" size="small" />}
      />
    </RelatedComponents>
  ),
};
