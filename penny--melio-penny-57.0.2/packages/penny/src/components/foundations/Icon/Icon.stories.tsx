import { Box, Grid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ChangeEvent, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Divider } from '@/components/dataDisplay/Divider';
import { Text } from '@/components/dataDisplay/Text';
import type { IconColor } from '@/components/internal';
import { iconColorMapping } from '@/components/internal';
import { SearchBar } from '@/components/selectionAndInputs/SearchBar';
import { getUnionTypeSummary, isUsingVisualTesting } from '@/test-utils/storybook.utils';

import type { IconKey } from '../../../theme/icons';
import { getDefaultIconsMap } from '../../../theme/icons';
import { Icon } from './Icon';
import type { IconProps } from './Icon.types';

const iconTypes = Object.keys(getDefaultIconsMap('')).sort() as IconKey[];

/**
 * ** Pay attention: **<br />
 * The icons displayed here per partner may not reflect the most up-to-date or accurate versions.
 *
 * The design system provides the **default** set of icon package, which partners can override as needed.
 *
 * For more details, please refer to the [theme documentation](?path=/docs/theme--docs).
 */
const meta: Meta<typeof Icon> = {
  title: 'Foundations/Icon',
  component: Icon,
  argTypes: {
    type: {
      description: 'The type of the icon.',
      control: 'select',
      options: iconTypes,
      type: { required: true, name: 'string' },
      table: {
        category: 'props',
        type: { summary: iconTypes.join(' | ') },
      },
    },
    size: {
      control: 'select',
      description: 'The size of the icon.',
      options: ['extra-small', 'small', 'large'],
      table: {
        category: 'props',
        defaultValue: { summary: 'large' },
        type: { summary: 'extra-small | small | large' },
      },
    },
    color: {
      control: 'select',
      description: 'The color of the icon.',
      options: Object.keys(iconColorMapping),
      table: {
        category: 'props',
        defaultValue: { summary: 'default' },
        type: { summary: getUnionTypeSummary(Object.keys(iconColorMapping)) },
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
    isReadOnly: {
      description: 'Sets the icon as read-only.',
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
        defaultValue: { summary: '[TYPE]-icon' },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    type: 'truck',
    isDisabled: false,
    isReadOnly: false,
    size: 'large',
    color: 'default',
    'data-testid': 'truck-icon',
  },
};
export default meta;

export const Main: StoryObj<IconProps> = {
  render: (args) => (
    <Storybook.Container
      padding="s"
      backgroundColor={args.color === 'inverse' ? '#333' : 'unset'}
      display="flex"
      alignItems="center"
    >
      <Icon {...args} />
    </Storybook.Container>
  ),
};

export const Sizes: StoryObj<IconProps> = {
  render: (args) => (
    <Grid templateColumns="repeat(3, max-content)" gap="xxl" alignItems="center" justifyItems="center">
      <Text textStyle="body2Semi">Extra Small</Text>
      <Text textStyle="body2Semi">Small</Text>
      <Text textStyle="body2Semi">Large</Text>
      <Icon {...args} size="extra-small" />
      <Icon {...args} size="small" />
      <Icon {...args} size="large" />
    </Grid>
  ),
};

export const Colors: StoryObj<IconProps> = {
  render: (args) => (
    <Grid templateColumns="repeat(4, 1fr)" gap="s" alignItems="center" justifyItems="center">
      {(Object.keys(iconColorMapping) as IconColor[]).map((color: IconColor) => {
        const text = (
          <Box height={30} alignContent="center" width={300} textAlign="center">
            <Text textStyle="body2Semi">{color}</Text>
          </Box>
        );
        if (color === 'inverse')
          return (
            <Group key={color} variant="vertical" alignItems="center" spacing="m">
              {text}
              <Storybook.Container padding="s" backgroundColor="#333" display="flex" alignItems="center">
                <Icon {...args} color="inverse" />
              </Storybook.Container>
              <Divider />
            </Group>
          );
        if (color === 'inherit')
          return (
            <Group key={color} variant="vertical" alignItems="center" spacing="m">
              <Box height={30} alignContent="center">
                <Group variant="vertical" alignItems="center" spacing="none">
                  <Text textStyle="body2Semi">{color}</Text>
                  <Text textStyle="body4Semi">
                    (container is container is <Storybook.Code label="semantic.text.secondary" />)
                  </Text>
                </Group>
              </Box>
              <Storybook.Container padding="s" display="flex" alignItems="center" color="semantic.icon.primary">
                <Icon {...args} color="inherit" />
              </Storybook.Container>
              <Divider />
            </Group>
          );
        return (
          <Group key={color} variant="vertical" alignItems="center" spacing="m">
            {text}
            <Storybook.Container padding="s" display="flex" alignItems="center">
              <Icon {...args} color={color} />
            </Storybook.Container>
            <Divider />
          </Group>
        );
      })}
    </Grid>
  ),
};

export const ReadOnly: StoryObj<IconProps> = {
  render: (args) => (
    <Group>
      <Icon {...args} isReadOnly />
      <Icon {...args} isReadOnly color="brand" />
    </Group>
  ),
};

export const Disabled: StoryObj<IconProps> = {
  render: (args) => (
    <Group>
      <Icon {...args} isDisabled />
      <Icon {...args} isDisabled color="brand" />
    </Group>
  ),
};

export const Types: StoryObj<IconProps> = {
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
        <Storybook.Gallery asset={<Icon {...args} />} labels={filteredIcons} />
      </Storybook.Container>
    );
  },
};
