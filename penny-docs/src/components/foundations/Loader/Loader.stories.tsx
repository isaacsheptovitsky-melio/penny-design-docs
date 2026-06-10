import type { Meta, StoryObj } from '@storybook/react-vite';

import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';
import { VariantGrid, VariantGridItem } from '@/storybook-utils/VariantGrid';

import { Loader } from './Loader';

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

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related components',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent name="Spinner" url="/?path=/docs/foundations-spinner--docs" preview={<Loader />} />
    </RelatedComponents>
  ),
};
