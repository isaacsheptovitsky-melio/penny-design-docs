import { Grid, SimpleGrid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { getUnionTypeSummary } from '@/test-utils/storybook.utils';

import { StatusIconSolid } from './StatusIconSolid';
import { type StatusIconSolidProps, statusIconSolidType } from './StatusIconSolid.types';
import { DEFAULT_DATA_TEST_ID } from './StatusIconSolid.utils';

const solidIconTypes = Object.keys(statusIconSolidType);
const solidIconSizes = ['small', 'medium', 'large', 'extra-large'] as StatusIconSolidProps['size'][];

const meta: Meta<typeof StatusIconSolid> = {
  title: 'Foundations/Status Icon Solid',
  component: StatusIconSolid,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    size: {
      control: 'select',
      options: solidIconSizes,
      description: 'The size of the icon.',
      type: { required: true, name: 'string' },
      table: {
        type: { summary: getUnionTypeSummary(solidIconSizes) },
        category: 'props',
      },
    },
    variant: {
      control: 'select',
      options: solidIconTypes,
      description: 'Sets the color of the icon according to the variant.',
      type: {
        required: true,
        name: 'string',
      },
      table: {
        type: { summary: getUnionTypeSummary(solidIconTypes) },
        category: 'props',
      },
    },
    isDisabled: {
      description: 'Determines if the icon is disabled.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    isReadOnly: {
      description: 'Sets the icon as read-only.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: `${DEFAULT_DATA_TEST_ID}` },
        category: 'tests',
      },
    },
  },
  args: {
    size: 'large',
    variant: 'success',
    isDisabled: false,
    isReadOnly: false,
    'data-testid': 'success-status-icon-solid',
  },
};
export default meta;

export const Main: StoryObj<StatusIconSolidProps> = {};

export const ReadOnly: StoryObj<StatusIconSolidProps> = {
  render: (args) => <StatusIconSolid {...args} isReadOnly />,
};

export const Disabled: StoryObj<StatusIconSolidProps> = {
  render: (args) => <StatusIconSolid {...args} isDisabled />,
};

export const Sizes: StoryObj<StatusIconSolidProps> = {
  render: (args) => (
    <Grid templateColumns="repeat(4, max-content)" gap="s" alignItems="center" justifyItems="center">
      <Text textStyle="body2Semi">Small</Text>
      <Text textStyle="body2Semi">Medium</Text>
      <Text textStyle="body2Semi">Large</Text>
      <Text textStyle="body2Semi">Extra Large</Text>
      <StatusIconSolid {...args} size="small" />
      <StatusIconSolid {...args} size="medium" />
      <StatusIconSolid {...args} size="large" />
      <StatusIconSolid {...args} size="extra-large" />
    </Grid>
  ),
};

export const Variations: StoryObj<StatusIconSolidProps> = {
  render: (args) => (
    <Group variant="vertical">
      {solidIconTypes.map((variant, idx) => (
        <SimpleGrid
          key={idx}
          maxWidth={700}
          columns={5}
          gridTemplateColumns="2fr 1fr 1fr 1fr 1fr"
          gap="s"
          justifyItems="center"
          alignItems="center"
        >
          {variant === 'neutral' ? (
            <Group key={`${variant}-${idx}`} variant="vertical" alignItems="center" textAlign="center" spacing="none">
              <Text textStyle="body2Semi">{variant}</Text>
              <Text textStyle="body4Semi">(container is semantic.text.secondary)</Text>
            </Group>
          ) : (
            <Text key={`${variant}-${idx}`} textStyle="body2Semi">
              {variant}
            </Text>
          )}
          {solidIconSizes.map((size) => (
            <Storybook.Container
              key={`${size}-small`}
              w="max-content"
              padding="s-m"
              display="flex"
              alignItems="center"
              color="semantic.text.secondary"
            >
              <StatusIconSolid {...args} size={size} variant={variant as StatusIconSolidProps['variant']} />
            </Storybook.Container>
          ))}
        </SimpleGrid>
      ))}
    </Group>
  ),
};
