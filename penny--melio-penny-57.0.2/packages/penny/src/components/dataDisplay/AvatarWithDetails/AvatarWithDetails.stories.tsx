import { noop } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { screen, userEvent } from 'storybook/test';

import { Group } from '@/components/containers/Group';
import { Icon } from '@/components/foundations/Icon';

import { Text } from '../Text';
import { AvatarWithDetails } from './AvatarWithDetails';
import { DEFAULT_DATA_TEST_ID } from './AvatarWithDetails.utils';

const avatarPropsType = `{
  name: string;
  src?: string;
  badge?:  'xero' | 'freshbooks' | 'quickbooks' | 'credit-key' | 'verified';
  bgColor?: 'default' | 'avatar1' | 'avatar2' | 'avatar3' | 'avatar4' | 'avatar5' | 'avatar6';
  size?: 'small' | 'medium';
}`;

const descriptionPropsType = `{
  label: string;
} & {
  link?: { label: string; href: string };
  action?: {
    label: string;
    isDisabled?: boolean;
    onClick: MouseEventHandler;
    leftElement?: ReactNode;
    rightElement?: ReactNode;
    'data-testid'?: string;
  };
} & HTMLAttributes<HTMLButtonElement> & ButtonLinkProps`;

const selectionPropsType = `{
  onSelect: (selected: boolean) => void;
  isSelected: boolean;
}`;

const mainLabelPropsType = `{
  label: string;
  data-testid?: string;
  pillProps?: {
    status: 'warning' | 'critical' | 'success' | 'neutral' | 'brand' | 'informative';
    label: string;
    type?: 'primary' | 'secondary' | 'status';
  } | {
    status: 'warning' | 'critical' | 'success' | 'neutral' | 'brand' | 'informative';
    label: string;
    type?: 'primary' | 'secondary' | 'status';
  }[]];
}`;

const meta: Meta<typeof AvatarWithDetails> = {
  title: 'Data Display Components/Avatar With Details [pattern]',
  component: AvatarWithDetails,
  argTypes: {
    mainLabelProps: {
      control: 'object',
      type: { required: true, value: 'object', name: 'other' },
      description: 'The properties passed to the main label.',
      table: {
        type: { summary: 'TypographyMainLabelProps', detail: mainLabelPropsType },
        category: 'props',
      },
    },
    descriptionProps: {
      control: 'object',
      description: 'The properties passed to the description.',
      table: {
        type: {
          summary: "Pick<TypographyDescriptionProps, 'action' | 'label'>",
          detail: descriptionPropsType,
        },
        category: 'props',
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Determines if the component is disabled.',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    avatarProps: {
      description: 'Props passed to the `Avatar` component.',
      control: 'object',
      table: {
        type: { summary: 'AvatarProps', detail: avatarPropsType },
        category: 'props',
      },
    },
    selectionProps: {
      description: 'Props passed to show checkbox when hovering on the avatar',
      control: 'object',
      table: {
        type: { summary: 'SelectionProps', detail: selectionPropsType },
        category: 'props',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: DEFAULT_DATA_TEST_ID },
        category: 'tests',
      },
    },
  },
  args: {
    mainLabelProps: { label: 'Chief Dog at Melio' },
    isDisabled: false,
    avatarProps: { name: 'Gustav the Dog' },
    selectionProps: undefined,
    'data-testid': 'avatar-with-details',
  },
};
export default meta;

export const Main: StoryObj<typeof AvatarWithDetails> = {};

const description = 'gustav@email.com';

export const Description: StoryObj<typeof AvatarWithDetails> = {
  render: (args) => <AvatarWithDetails {...args} descriptionProps={{ label: description }} />,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

const actionProps = { label: 'See my profile', onClick: noop };

export const WithAction: StoryObj<typeof AvatarWithDetails> = {
  render: (args) => <AvatarWithDetails {...args} descriptionProps={{ label: description, action: actionProps }} />,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const WithBadge: StoryObj<typeof AvatarWithDetails> = {
  render: (args) => (
    <AvatarWithDetails
      {...args}
      mainLabelProps={{ label: 'Chief Dog at Melio', pillProps: { label: 'Admin', status: 'neutral' } }}
    />
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

const verifiedBadgeIcon = <Icon type="verified" size="small" color="brand" />;

export const WithAvatarProps: StoryObj<typeof AvatarWithDetails> = {
  render: ({ avatarProps, ...args }) => (
    <Group variant="vertical" spacing="s">
      <AvatarWithDetails {...args} avatarProps={{ ...avatarProps, src: '/assets/Gustav.png' }} />
      <AvatarWithDetails
        {...args}
        avatarProps={{
          ...avatarProps,
          src: '/assets/Gustav.png',
          badge: verifiedBadgeIcon,
        }}
      />
      <AvatarWithDetails {...args} avatarProps={{ ...avatarProps, bgColor: 'avatar5' }} />
      <AvatarWithDetails
        {...args}
        avatarProps={{
          ...avatarProps,
          bgColor: 'avatar5',
          badge: verifiedBadgeIcon,
        }}
      />
    </Group>
  ),
};

export const Disabled: StoryObj<typeof AvatarWithDetails> = {
  render: (args) => (
    <AvatarWithDetails
      {...args}
      descriptionProps={{ label: description, action: actionProps }}
      mainLabelProps={{ label: 'Chief Dog at Melio', pillProps: { label: 'Admin', status: 'neutral' } }}
      isDisabled
    />
  ),
};

export const Selectable: StoryObj<typeof AvatarWithDetails> = {
  render: (args) => {
    const [isSelected, setIsSelected] = useState(false);

    return (
      <Group spacing="xxxl">
        <Group variant="vertical" justifyContent="center" alignItems="center">
          <Text textStyle="body2Semi">Unchecked</Text>
          <AvatarWithDetails
            {...args}
            data-testid="avatar-with-details-unchecked"
            descriptionProps={{ label: description }}
            selectionProps={{
              onSelect: (selected: boolean) => {
                setIsSelected(!selected);
              },
              isSelected,
            }}
          />
          <AvatarWithDetails
            {...args}
            avatarProps={{ ...args.avatarProps, size: 'small' }}
            selectionProps={{
              onSelect: noop,
              isSelected: false,
            }}
          />
        </Group>
        <Group variant="vertical" alignItems="center">
          <Text textStyle="body2Semi">Checked</Text>
          <AvatarWithDetails
            {...args}
            selectionProps={{
              onSelect: noop,
              isSelected: true,
            }}
          />
        </Group>
      </Group>
    );
  },
  play: async () => userEvent.hover(screen.getByTestId('avatar-with-details-unchecked-avatar-container')),
};
