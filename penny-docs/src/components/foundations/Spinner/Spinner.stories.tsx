import type { Meta, StoryObj } from '@storybook/react-vite';

import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';
import { VariantGrid, VariantGridItem } from '@/storybook-utils/VariantGrid';

import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Foundations/Spinner',
  component: Spinner,
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['neutral', 'brand', 'inverse'],
      description: 'Color treatment. `inverse` is for dark/colored surfaces.',
      table: { defaultValue: { summary: 'neutral' }, type: { summary: "'neutral' | 'brand' | 'inverse'" }, category: 'props' },
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium'],
      description: 'Width and height of the spinner.',
      table: { defaultValue: { summary: 'medium' }, type: { summary: "'small' | 'medium' | number" }, category: 'props' },
    },
    disabled: {
      control: 'boolean',
      description: 'Mutes the spinner to signal unavailability (animation still runs).',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    screenReaderText: {
      control: 'text',
      description: 'Visually-hidden label for assistive tech.',
      table: { defaultValue: { summary: 'Loading' }, type: { summary: 'string' }, category: 'accessibility' },
    },
  },
  args: { variant: 'neutral', size: 'medium', disabled: false },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'fullscreen', controls: { include: ['variant', 'size', 'disabled'] } },
  render: (args) => {
    const inverse = args.variant === 'inverse';
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
        <Spinner {...args} />
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <VariantGrid minItemWidth={120}>
      <VariantGridItem label="Neutral">
        <Spinner variant="neutral" />
      </VariantGridItem>
      <VariantGridItem label="Brand">
        <Spinner variant="brand" />
      </VariantGridItem>
    </VariantGrid>
  ),
  parameters: { controls: { disable: true } },
};

export const Inverse: Story = {
  render: () => (
    <VariantGrid dark minItemWidth={120}>
      <VariantGridItem label="Inverse">
        <Spinner variant="inverse" />
      </VariantGridItem>
    </VariantGrid>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const Sizes: Story = {
  render: () => (
    <VariantGrid minItemWidth={120}>
      <VariantGridItem label="Small">
        <Spinner size="small" />
      </VariantGridItem>
      <VariantGridItem label="Medium">
        <Spinner size="medium" />
      </VariantGridItem>
    </VariantGrid>
  ),
  parameters: { controls: { disable: true } },
};

export const Disabled: Story = {
  render: () => (
    <VariantGrid minItemWidth={120}>
      <VariantGridItem label="Neutral">
        <Spinner variant="neutral" disabled />
      </VariantGridItem>
      <VariantGridItem label="Brand">
        <Spinner variant="brand" disabled />
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
      <RelatedComponent
        name="Loader"
        url="/?path=/docs/foundations-loader--docs"
        preview={<Spinner variant="brand" />}
      />
    </RelatedComponents>
  ),
};
