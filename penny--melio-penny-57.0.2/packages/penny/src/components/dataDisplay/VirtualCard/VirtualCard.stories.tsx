import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { getUnionTypeSummary, setChromaticViewports } from '@/test-utils/storybook.utils';
import { type BrandKey, getBrandMap } from '@/theme';

import { BaseVirtualCard } from '../../internal/BaseVirtualCard';
import { VirtualCard, type VirtualCardProps } from './VirtualCard';

const variants = ['white', 'black', 'brand'];
const brandTypes = Object.keys(getBrandMap('')) as BrandKey[];

const sharedDetailsProps = `
  label: string;
  onCopy?: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
`;

const cardNumberProps = `{
  cardNumber: number | string;
  ${sharedDetailsProps}
}`;

const cvvNumberProps = `{
  cvv: number | string;
  ${sharedDetailsProps}
}`;

const expirationDateProps = `{
  month: Month;
  year: Year;
  ${sharedDetailsProps}
}`;

const meta: Meta<VirtualCardProps> = {
  title: 'Data Display Components/Virtual Card/Virtual Card [pattern]',
  component: BaseVirtualCard,
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
      description: 'Determines the virtual card variant.',
      type: { required: true, name: 'string' },
      table: {
        type: { summary: getUnionTypeSummary(variants) },
        category: 'props',
      },
    },
    backgroundImageSrc: {
      control: 'text',
      description: 'The source of the background image of the virtual card.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    showDetails: {
      control: 'boolean',
      description: 'Determines if the card details is visible or not.',
      table: { defaultValue: { summary: 'true' }, type: { summary: 'boolean' }, category: 'props' },
    },
    amount: {
      control: 'number',
      description: 'The value of the currency.',
      type: { required: true, name: 'string' },
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    brandSymbolProps: {
      control: 'object',
      type: { required: true, name: 'string' },
      table: {
        type: { summary: `{ type: BrandSymbolKey; variant?: BrandSymbolProps['variant'] }` },
        category: 'props',
      },
      description: 'The card number details to display',
    },
    brandType: {
      control: 'select',
      options: brandTypes,
      description: 'The type of the brand',
      type: { name: 'string', required: true },
      table: {
        type: {
          summary: getUnionTypeSummary(brandTypes),
        },
        category: 'props',
      },
    },
    cardNumberProps: {
      control: 'object',
      type: { required: true, name: 'string' },
      table: {
        type: { summary: `Pick<CardNumberProps, 'cardNumber' | 'label' | 'onCopy'>`, detail: cardNumberProps },
        category: 'props',
      },
      description: 'The card number details to display',
    },
    expirationDateProps: {
      control: 'object',
      type: { required: true, name: 'string' },
      table: {
        type: {
          summary: `Pick<ExpirationDateProps, 'month' | 'year' | 'label' | 'onCopy'>`,
          detail: expirationDateProps,
        },
        category: 'props',
      },
      description: 'The expiration date details to display',
    },
    cvvNumberProps: {
      control: 'object',
      type: { required: true, name: 'string' },
      table: {
        type: {
          summary: `Pick<CvvNumberProps, 'cvv' | 'label' | 'onCopy'>`,
          detail: cvvNumberProps,
        },
        category: 'props',
      },
      description: 'The expiration date details to display',
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'virtual-card' }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: {
    variant: 'white',
    showDetails: true,
    amount: 1500,
    brandSymbolProps: { type: 'mastercard', variant: 'default' },
    brandType: 'jp-morgan',
    cardNumberProps: { label: 'Card Number', cardNumber: '1234567890123456' },
    expirationDateProps: { label: 'Expiry date', month: '02', year: '27' },
    cvvNumberProps: { label: 'CVV', cvv: '123' },
    'data-testid': 'virtual-card',
  },
};
export default meta;

export const Main: StoryObj<VirtualCardProps> = {
  render: (args) => <VirtualCard {...args} />,
};

export const Variants: StoryObj<VirtualCardProps> = {
  render: (args) => (
    <Group variant="vertical" spacing="xl">
      {variants.map((variant) => (
        <VirtualCard key={variant} {...args} variant={variant as VirtualCardProps['variant']} />
      ))}
    </Group>
  ),
};

export const WithBackgroundImage: StoryObj<VirtualCardProps> = {
  render: (args) => (
    <VirtualCard
      {...args}
      variant="black"
      brandSymbolProps={{ ...args.brandSymbolProps, variant: 'inverse' }}
      backgroundImageSrc="/assets/virtual-card-bg.jpeg"
    />
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const HiddenDetails: StoryObj<VirtualCardProps> = {
  render: (args) => <VirtualCard {...args} showDetails={false} />,
};

export const OverrideBrandSymbolVariant: StoryObj<VirtualCardProps> = {
  render: (args) => (
    <VirtualCard {...args} variant="black" brandSymbolProps={{ ...args.brandSymbolProps, variant: 'inverse' }} />
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const CustomizeDetails: StoryObj<VirtualCardProps> = {
  render: () => (
    <VirtualCard
      amount={1500}
      variant="white"
      brandSymbolProps={{ type: 'mastercard', variant: 'default' }}
      brandType="jp-morgan"
      cardNumberProps={{
        label: 'Custom Card Number',
        children: <Storybook.Container backgroundColor="global.brand.200" width="full" height="20px" />,
      }}
      expirationDateProps={{
        label: 'Custom Expiry date',
        children: <Storybook.Container backgroundColor="global.brand.200" width="full" height="20px" />,
      }}
      cvvNumberProps={{
        label: 'Custom',
        children: <Storybook.Container backgroundColor="global.brand.200" width="full" height="20px" />,
      }}
    />
  ),
};

setChromaticViewports([Variants], ['xs', 'xl']);
