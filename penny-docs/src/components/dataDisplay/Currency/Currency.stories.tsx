import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group } from '@/components/containers/Group';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';

import { Currency } from './Currency';

const meta: Meta<typeof Currency> = {
  title: 'Components/Data Display/Currency',
  component: Currency,
  argTypes: {
    value: {
      control: 'number',
      description: 'The monetary value.',
      table: { type: { summary: 'number' }, category: 'props' },
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'large'],
      description: 'Text size.',
      table: { defaultValue: { summary: 'small' }, type: { summary: "'small' | 'large'" }, category: 'props' },
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'inverse'],
      description: 'Color — `inverse` for dark surfaces.',
      table: { defaultValue: { summary: 'default' }, type: { summary: "'default' | 'inverse'" }, category: 'props' },
    },
    currency: {
      control: 'select',
      options: ['USD', 'EUR', 'GBP', 'CAD', 'ILS'],
      description: 'ISO currency code.',
      table: { defaultValue: { summary: 'USD' }, type: { summary: 'Currency' }, category: 'props' },
    },
  },
  args: { value: 1234.5, size: 'small', variant: 'default', currency: 'USD' },
};

export default meta;
type Story = StoryObj<typeof Currency>;

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    layout: 'fullscreen',
    controls: { include: ['value', 'size', 'variant', 'currency'] },
  },
  render: (args) => {
    const inverse = args.variant === 'inverse';
    return (
      <div style={{ padding: '32px', background: inverse ? '#0F0728' : 'transparent', display: 'inline-block' }}>
        <Currency {...args} />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <Group spacing="l" alignItems="baseline">
      <Currency value={1234.5} size="small" />
      <Currency value={1234.5} size="large" />
    </Group>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const Inverse: Story = {
  render: () => (
    <div style={{ background: '#0F0728', borderRadius: '8px', padding: '24px', display: 'inline-block' }}>
      <Currency value={1234.5} size="large" variant="inverse" />
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const Currencies: Story = {
  render: () => (
    <Group variant="vertical" spacing="s" alignItems="flex-start">
      <Currency value={1234.5} currency="USD" />
      <Currency value={1234.5} currency="EUR" />
      <Currency value={1234.5} currency="GBP" />
      <Currency value={1234.5} currency="CAD" />
    </Group>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related components',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Typography"
        url="/?path=/docs/foundations-typography--docs"
        preview={<Currency value={99.99} />}
      />
    </RelatedComponents>
  ),
};
