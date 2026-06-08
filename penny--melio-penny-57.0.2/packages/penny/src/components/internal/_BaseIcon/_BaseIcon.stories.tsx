import { startCase } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';

import { fullScreenChromaticDecorator } from '../../../test-utils';
import { getUnionTypeSummary } from '../../../test-utils/storybook.utils';
import { getDefaultIconsMap, iconSizes } from '../../../theme';
import { getBaseIconColors } from '../../../theme/icons/utils';
import { _BaseIcon as BaseIcon } from './_BaseIcon';
import { type _BaseIconProps as BaseIconProps } from './_BaseIcon.types';

const iconOptions = Object.keys(getDefaultIconsMap(''));

const meta: Meta<typeof BaseIcon> = {
  title: 'Internal Components/Base Icon',
  component: BaseIcon,
  decorators: [fullScreenChromaticDecorator],
  argTypes: {
    type: {
      description: 'The type of the icon.',
      control: 'select',
      options: iconOptions,
      type: { required: true, name: 'string' },
      table: {
        defaultValue: { summary: 'false' },
        category: 'props',
        type: {
          summary: getUnionTypeSummary(iconOptions),
        },
      },
    },
    size: {
      control: 'select',
      description: 'The size of the icon.',
      options: iconSizes,
      type: { required: true, name: 'string' },
      table: {
        defaultValue: { summary: 'false' },
        category: 'props',
        type: {
          summary: getUnionTypeSummary(iconSizes.map((size) => size)),
        },
      },
    },
    color: {
      control: 'select',
      description: 'The color of the icon.',
      options: Object.keys(getBaseIconColors()),
      type: { required: true, name: 'string' },
      table: {
        defaultValue: { summary: 'false' },
        category: 'props',
        type: {
          summary: getUnionTypeSummary(Object.keys(getBaseIconColors())),
        },
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
  },
  args: {
    type: 'notification',
    size: 'small',
    color: 'semantic.icon.primary',
    isDisabled: false,
    isReadOnly: false,
  },
};
export default meta;

export const Main: StoryObj<BaseIconProps> = {};

const getSizeTitle = (size: string) => startCase(size.replace('-', ' '));

export const Sizes: StoryObj<BaseIconProps> = {
  render: (args) => (
    <Group spacing="m">
      {iconSizes.map((size) => (
        <Group key={size} variant="vertical" alignItems="center">
          <Text as="h2" textStyle="heading4">
            {getSizeTitle(size)}
          </Text>
          <BaseIcon {...args} size={size} />
        </Group>
      ))}
    </Group>
  ),
};

export const ColorInherit: StoryObj<BaseIconProps> = {
  render: (args) => (
    <Group variant="vertical">
      <Text>Parent color is red</Text>
      <Storybook.Container color="red">
        <BaseIcon {...args} color="inherit" />
      </Storybook.Container>
    </Group>
  ),
};

export const ReadOnly: StoryObj<BaseIconProps> = {
  render: (args) => <BaseIcon {...args} isReadOnly />,
};

export const Disabled: StoryObj<BaseIconProps> = {
  render: (args) => <BaseIcon {...args} isDisabled />,
};
