import type { Meta, StoryObj } from '@storybook/react-vite';

import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';
import { VariantGrid, VariantGridItem } from '@/storybook-utils/VariantGrid';

import { Loader } from './Loader';
import { Spinner } from '../Spinner';
import loaderImage1 from './loader-image-1.gif';
import loaderImage2 from './loader-image-2.gif';

const colorOptions = [
  'semantic.icon.brand',
  'semantic.icon.primary',
  'semantic.icon.success',
  'semantic.icon.critical',
  'semantic.icon.informative',
];

const meta: Meta<typeof Loader> = {
  title: 'Foundations/Loader',
  component: Loader,
  argTypes: {
    color: {
      control: 'select',
      options: colorOptions,
      description: 'Any Penny color token. Defaults to the brand color.',
      table: { defaultValue: { summary: 'semantic.icon.brand' }, type: { summary: 'ThemeColorKey' }, category: 'props' },
    },
    loadingText: {
      control: 'text',
      description: 'Screen-reader-only loading text.',
      table: { defaultValue: { summary: 'Loading...' }, type: { summary: 'string' }, category: 'accessibility' },
    },
    hideLoadingText: {
      control: 'boolean',
      description: 'Prevents rendering the visually-hidden loading text.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'accessibility' },
    },
  },
  args: { color: 'semantic.icon.brand' },
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'fullscreen', controls: { include: ['color'] } },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
      <Loader {...args} />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <VariantGrid minItemWidth={130}>
      <VariantGridItem label="Brand (default)">
        <Loader color="semantic.icon.brand" />
      </VariantGridItem>
      <VariantGridItem label="Primary">
        <Loader color="semantic.icon.primary" />
      </VariantGridItem>
      <VariantGridItem label="Success">
        <Loader color="semantic.icon.success" />
      </VariantGridItem>
      <VariantGridItem label="Critical">
        <Loader color="semantic.icon.critical" />
      </VariantGridItem>
    </VariantGrid>
  ),
  parameters: { controls: { disable: true } },
};

export const UseCaseScreenLoading: Story = {
  name: 'Use case — Screen data loading',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Poppins, sans-serif', gap: '12px' }}>
      <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#8B95A9', alignSelf: 'flex-start' }}>
        Screen data loading
      </div>
      <img
        src={loaderImage1}
        alt="Loader used while a screen is waiting for data"
        style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid #E2E8F0' }}
      />
    </div>
  ),
};

export const UseCaseAsyncAction: Story = {
  name: 'Use case — Async action',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Poppins, sans-serif', gap: '12px' }}>
      <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#8B95A9', alignSelf: 'flex-start' }}>
        Async action in progress
      </div>
      <img
        src={loaderImage2}
        alt="Loader used while an asynchronous action is in progress"
        style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid #E2E8F0' }}
      />
    </div>
  ),
};

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent name="Spinner" url="/?path=/docs/foundations-spinner--docs" preview={<Spinner />} />
      <RelatedComponent name="Skeleton" url="/?path=/docs/foundations-skeleton--docs" preview={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '4px' }}>
          {[100, 80, 60].map((w) => (
            <div key={w} style={{ width: w, height: 12, borderRadius: 4, background: 'linear-gradient(90deg, #E2E8F0 25%, #EDF2F7 50%, #E2E8F0 75%)', backgroundSize: '200% 100%' }} />
          ))}
        </div>
      } />
    </RelatedComponents>
  ),
};
