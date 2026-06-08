import { SimpleGrid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ChangeEvent, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { getUnionTypeSummary, isUsingVisualTesting } from '@/test-utils/storybook.utils';
import { type BrandKey, getBrandMap } from '@/theme';

import { SearchBar } from '../../selectionAndInputs/SearchBar';
import { Text } from '../Text';
import { Brand } from './Brand';
import type { BrandProps } from './Brand.types';

const iconTypes = Object.keys(getBrandMap('')) as BrandKey[];
const variants = ['default', 'neutral', 'inverse'];

const meta: Meta<typeof Brand> = {
  title: 'Data Display Components/Brand',
  component: Brand,
  argTypes: {
    type: {
      control: 'select',
      options: iconTypes,
      description: 'The type of the icon.',
      type: { required: true, name: 'string' },
      table: {
        category: 'props',
        type: { summary: iconTypes.join(' | ') },
      },
    },
    variant: {
      control: 'select',
      options: variants,
      description: 'Determines the icon variant.',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: getUnionTypeSummary(variants) },
        category: 'props',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: '[TYPE]-brand' }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: { type: 'intuit', variant: 'default', 'data-testid': 'intuit-brand' },
};
export default meta;

export const Main: StoryObj<BrandProps> = {
  render: (args) => (
    <Storybook.Container
      bgColor={args.variant === 'inverse' ? 'semantic.background.brand.primary' : undefined}
      padding="s"
      borderRadius="global.200"
    >
      <Brand {...args} />
    </Storybook.Container>
  ),
};

export const NeutralColor: StoryObj<BrandProps> = {
  render: (args) => <Brand {...args} variant="neutral" />,
};

export const Variations: StoryObj<BrandProps> = {
  render: (args) => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredIcons, setFilteredIcons] = useState(iconTypes);

    const onSearch = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(value);
      setFilteredIcons(iconTypes.filter((iconType) => iconType.includes(value)));
    };

    return (
      <Group variant="vertical" spacing="l">
        {!isUsingVisualTesting() && (
          <SearchBar value={searchValue} onChange={onSearch} placeholder="Search brand icon" />
        )}
        <SimpleGrid columns={4} spacing="m" justifyItems="center">
          <Text textStyle="body2Semi">Type</Text>
          <Text textStyle="body2Semi">Default</Text>
          <Text textStyle="body2Semi">Neutral</Text>
          <Text textStyle="body2Semi">Inverse</Text>
        </SimpleGrid>
        {filteredIcons.map((type: BrandKey) => (
          <SimpleGrid key={`brand-${type}`} columns={4} spacing="m" justifyItems="center" alignItems="center">
            <Text textStyle="body2Semi">{type}</Text>
            <Brand {...args} type={type} variant="default" />
            <Brand {...args} type={type} variant="neutral" />
            <Storybook.Container bgColor="semantic.background.brand.primary" padding="s" borderRadius="global.200">
              <Brand {...args} type={type} variant="inverse" />
            </Storybook.Container>
          </SimpleGrid>
        ))}
      </Group>
    );
  },
};
