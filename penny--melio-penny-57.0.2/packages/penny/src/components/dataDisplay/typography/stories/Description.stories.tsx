import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';

import { Text } from '../../Text';
import { Typography } from '..';

const label = 'We only make healthy, good looking food.';

const actionType = `{
  label: string;
  onClick: MouseEventHandler;
  'data-testid'?: string;
} & AriaAttributes`;

const linkType = `{
  label: string;
  href: string;
  newTab?: boolean;
} & AriaAttributes`;

const meta: Meta<typeof Typography.Description> = {
  title: 'Data Display Components/Typography/Description [pattern]',
  component: Typography.Description,
  argTypes: {
    label: {
      control: 'text',
      type: { required: true, name: 'string' },
      description: 'The text of the description.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Determines if the component is in a disabled state.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Determines if the component is in a read-only state.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
    },
    isInvalid: {
      control: 'boolean',
      description: 'Determines if the component is in an invalid state.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
    },
    action: {
      control: 'object',
      description: 'An action that accompanies the description text. **Only one of "action" or "link" can be active**.',
      table: {
        type: { summary: 'TypographyDescriptionProps["action"]', detail: actionType },
        category: 'props',
      },
    },
    link: {
      control: 'object',
      description: 'An action that accompanies the description text. **Only one of "action" or "link" can be active**.',
      table: { type: { summary: 'Type', detail: linkType }, category: 'props' },
    },
  },
  args: {
    label,
    isDisabled: false,
    isReadOnly: false,
    isInvalid: false,
  },
};
export default meta;

export const Main: StoryObj<typeof Typography.Description> = {};

export const WithCTA: StoryObj<typeof Typography.Description> = {
  render: () => <Typography.Description label={label} action={{ label: 'Show me', onClick: () => null }} />,
};

export const WithLink: StoryObj<typeof Typography.Description> = {
  render: () => (
    <Typography.Description label={label} link={{ label: 'Learn more', href: 'http://www.google.com', newTab: true }} />
  ),
};

export const Invalid: StoryObj<typeof Typography.Description> = {
  render: () => <Typography.Description label="Oh no! Seems like you filled this field incorrectly :(" isInvalid />,
};

export const ReadOnly: StoryObj<typeof Typography.Description> = {
  render: () => (
    <Group variant="vertical">
      <Typography.Description label={label} link={{ label: 'Learn more', href: 'www.google.com' }} isReadOnly />
      <Typography.Description label={label} action={{ label: 'Show me', onClick: () => null }} isReadOnly />
    </Group>
  ),
};

export const Disabled: StoryObj<typeof Typography.Description> = {
  render: () => (
    <Group variant="vertical">
      <Typography.Description label={label} link={{ label: 'Learn more', href: 'www.google.com' }} isDisabled />
      <Typography.Description label={label} action={{ label: 'Show me', onClick: () => null }} isDisabled />
    </Group>
  ),
};

export const WithSeveralLines: StoryObj<typeof Typography.Description> = {
  render: () => {
    const longLabel = 'Ea nulla occaecat duis aliquip ullamco pariatur dolor velit et mollit aute.';

    return (
      <Storybook.Container width="400px">
        <Group variant="vertical">
          <Text textStyle="body3Semi">With Link</Text>
          <Typography.Description label={longLabel} link={{ label: 'Learn more', href: 'www.google.com' }} />
          <Text textStyle="body3Semi">With Action</Text>
          <Typography.Description label={longLabel} action={{ label: 'Show me', onClick: () => null }} />
        </Group>
      </Storybook.Container>
    );
  },
};
