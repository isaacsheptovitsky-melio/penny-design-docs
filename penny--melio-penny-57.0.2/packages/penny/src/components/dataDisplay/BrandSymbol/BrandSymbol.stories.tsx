import { SimpleGrid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ChangeEvent, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { getUnionTypeSummary, isUsingVisualTesting } from '@/test-utils/storybook.utils';
import { type BrandSymbolKey, getBrandSymbolsMap } from '@/theme';

import { SearchBar } from '../../selectionAndInputs/SearchBar';
import { Text } from '../Text';
import { BrandSymbol } from './BrandSymbol';
import type { BrandSymbolProps } from './BrandSymbol.types';

const brandSymbolSizes: BrandSymbolProps['size'][] = ['extra-small', 'small', 'medium', 'extra-large'];
const iconTypes = Object.keys(getBrandSymbolsMap('')) as BrandSymbolKey[];

const meta: Meta<typeof BrandSymbol> = {
  title: 'Data Display Components/Brand Symbol',
  component: BrandSymbol,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    size: {
      control: 'select',
      options: brandSymbolSizes,
      description: 'The size of the brand symbol.',
      table: {
        type: { summary: getUnionTypeSummary(brandSymbolSizes as string[]) },
        category: 'props',
        defaultValue: { summary: 'medium' },
      },
    },
    type: {
      control: 'select',
      options: [undefined, ...iconTypes],
      description: 'The type of the brand symbol.',
      type: {
        required: true,
        name: 'string',
      },
      table: {
        type: { summary: getUnionTypeSummary(iconTypes) },
        category: 'props',
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'inverse'],
      description: 'Determines the brand symbol variant.',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | inverse' },
        category: 'props',
      },
    },
    isDisabled: {
      description: 'Determines if the component is disabled.',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    isReadOnly: {
      description: 'Sets the component as read-only.',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    'aria-label': {
      control: 'text',
      description: 'The aria-label for the component.',
      table: {
        defaultValue: { summary: '${type} brand symbol' },
        type: { summary: 'string' },
        category: 'accessibility',
      },
    },
    alt: {
      control: 'text',
      description: 'An alternate text for the brand symbol image. can be removed with empty string',
      table: {
        defaultValue: { summary: '${type} logo' },
        category: 'accessibility',
        type: {
          summary: 'string',
        },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: 'brand-symbol' },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    type: 'google',
    size: 'medium',
    isDisabled: false,
    isReadOnly: false,
    variant: 'default',
  },
};
export default meta;

export const Main: StoryObj<typeof BrandSymbol> = {
  render: (args) => (
    <Storybook.Container
      bgColor={args.variant === 'inverse' ? 'semantic.background.brand.primary' : undefined}
      padding="s"
      borderRadius="global.200"
    >
      <BrandSymbol {...args} />
    </Storybook.Container>
  ),
};

export const ReadOnly: StoryObj<typeof BrandSymbol> = {
  render: (args) => (
    <Group spacing="m" alignItems="center">
      <BrandSymbol {...args} isReadOnly />
      <Storybook.Container bgColor="semantic.background.brand.primary" padding="s" borderRadius="global.200">
        <BrandSymbol {...args} isReadOnly variant="inverse" />
      </Storybook.Container>
    </Group>
  ),
};

export const Disabled: StoryObj<typeof BrandSymbol> = {
  render: (args) => (
    <Group spacing="m" alignItems="center">
      <BrandSymbol {...args} isDisabled />
      <Storybook.Container bgColor="semantic.background.brand.primary" padding="s" borderRadius="global.200">
        <BrandSymbol {...args} isDisabled variant="inverse" />
      </Storybook.Container>
    </Group>
  ),
};

export const Sizes: StoryObj<typeof BrandSymbol> = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredIcons, setFilteredIcons] = useState(iconTypes);

    const onSearch = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(value);
      setFilteredIcons(iconTypes.filter((iconType) => iconType.includes(value)));
    };

    return (
      <Group variant="vertical" spacing="l">
        {!isUsingVisualTesting() && (
          <SearchBar value={searchValue} onChange={onSearch} placeholder="Search brand-symbol icon" />
        )}
        <SimpleGrid columns={5} spacing="m" justifyItems="center">
          <Text textStyle="body2Semi">Type</Text>
          <Text textStyle="body2Semi">Extra Small</Text>
          <Text textStyle="body2Semi">Small</Text>
          <Text textStyle="body2Semi">Medium</Text>
          <Text textStyle="body2Semi">Extra Large</Text>
        </SimpleGrid>
        {filteredIcons.map((type, index) => (
          <SimpleGrid
            columns={5}
            key={`brandSymbol-${type}-${index}`}
            spacing="m"
            justifyItems="center"
            alignItems="center"
          >
            <Text textStyle="body2Semi">{type}</Text>
            {brandSymbolSizes.map((size) => (
              <BrandSymbol key={size} size={size} type={type} />
            ))}
          </SimpleGrid>
        ))}
      </Group>
    );
  },
};

export const Inverse: StoryObj<typeof BrandSymbol> = {
  render: (args) => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredIcons, setFilteredIcons] = useState(iconTypes);

    const onSearch = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(value);
      setFilteredIcons(iconTypes.filter((iconType) => iconType.includes(value)));
    };
    return (
      <Storybook.Container display="flex" flexDirection="column" gap="l">
        {!isUsingVisualTesting() && <SearchBar value={searchValue} onChange={onSearch} placeholder="Search icon" />}
        <Storybook.Gallery labels={filteredIcons} asset={<BrandSymbol {...args} variant="inverse" />} isInverse />
      </Storybook.Container>
    );
  },
};
