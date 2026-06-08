import { SimpleGrid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ChangeEvent, useState } from 'react';

import { Group } from '@/components/containers/Group';
import { getUnionTypeSummary, isUsingVisualTesting } from '@/test-utils/storybook.utils';
import { type FlagKey, getFlagsMap } from '@/theme';

import { SearchBar } from '../../selectionAndInputs/SearchBar';
import { Text } from '../Text';
import { FlagIcon } from './FlagIcon';
import type { FlagIconProps } from './FlagIcon.types';

const flagIconSizes = ['small', 'medium'];
const flagIconCountryCodes = Object.keys(getFlagsMap('')).sort() as FlagKey[];

const meta: Meta<typeof FlagIcon> = {
  title: 'Data Display Components/Flag Icon',
  component: FlagIcon,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    size: {
      control: 'select',
      options: flagIconSizes,
      description: 'The size of the icon.',
      table: {
        category: 'props',
        type: { summary: getUnionTypeSummary(flagIconSizes) },
        defaultValue: { summary: 'medium' },
      },
    },
    countryCode: {
      control: 'select',
      options: flagIconCountryCodes,
      description:
        'The country code of the icon in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format.',
      type: { required: true, name: 'string' },
      table: {
        type: { summary: getUnionTypeSummary(flagIconCountryCodes) },
        category: 'props',
      },
    },
    isDisabled: {
      description: 'Determines if the icon is disabled.',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: '[COUNTRY_CODE]-flag-icon' },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    countryCode: 'US',
    size: 'medium',
    isDisabled: false,
    'data-testid': 'US-flag-icon',
  },
};
export default meta;

export const Main: StoryObj<FlagIconProps> = {};

export const CountryCodes: StoryObj<FlagIconProps> = {
  render: (args) => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredIcons, setFilteredIcons] = useState(flagIconCountryCodes);

    const onSearch = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(value);
      setFilteredIcons(flagIconCountryCodes.filter((iconType) => iconType.includes(value)));
    };

    return (
      <Group variant="vertical" spacing="l">
        {!isUsingVisualTesting() && (
          <SearchBar value={searchValue} onChange={onSearch} placeholder="Search flag icon" />
        )}
        <SimpleGrid columns={5} gap="s">
          {filteredIcons.map((countryCode) => (
            <Group variant="vertical" key={countryCode} spacing="xxs" alignItems="center">
              <FlagIcon {...args} size="medium" countryCode={countryCode} />
              <Text textStyle="body3">{countryCode}</Text>
            </Group>
          ))}
        </SimpleGrid>
      </Group>
    );
  },
};

export const Sizes: StoryObj<FlagIconProps> = {
  render: (args) => (
    <Group variant="vertical">
      <SimpleGrid columns={2} gap="none">
        <Text textStyle="body2Semi">Small</Text>
        <Text textStyle="body2Semi">Medium</Text>
      </SimpleGrid>
      <SimpleGrid columns={2} gap="none">
        <FlagIcon {...args} size="small" countryCode="US" />
        <FlagIcon {...args} size="medium" countryCode="US" />
      </SimpleGrid>
    </Group>
  ),
};

export const Disabled: StoryObj<FlagIconProps> = {
  render: (args) => <FlagIcon {...args} isDisabled />,
};
