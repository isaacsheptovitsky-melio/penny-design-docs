import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { screen, userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { fullScreenChromaticDecorator, getUnionTypeSummary } from '@/test-utils';
import { getDefaultIconsMap } from '@/theme';

import { Blanket as Blanket, type BlanketProps as BlanketProps } from './Blanket';

const variants = ['light', 'dark', 'darker'];
const iconOptions = Object.keys(getDefaultIconsMap(''));

const meta: Meta<typeof Blanket> = {
  title: 'Internal Components/Blanket',
  component: Blanket,
  decorators: [fullScreenChromaticDecorator],
  argTypes: {
    isOpen: {
      description: 'Determinate if the blanket is open.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    variant: {
      description: 'The type of the blanket.',
      control: 'select',
      options: variants,
      table: {
        defaultValue: { summary: "'dark'" },
        category: 'props',
        type: {
          summary: getUnionTypeSummary(variants),
        },
      },
    },
    icon: {
      description: 'The type of the icon inside the blanket.',
      control: 'select',
      options: [undefined, ...iconOptions],
      table: {
        category: 'props',
        type: {
          summary: getUnionTypeSummary(iconOptions),
        },
      },
    },
    isFullScreen: {
      control: false,
      description: 'Sets the blanket to full screen.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isLoading: {
      control: 'boolean',
      description: 'Determines if the blanket is in loading state.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    onClick: {
      control: false,
      action: 'closed',
      description: "Callback to call when the blanket is clicked to control the blanket's state.",
      table: {
        type: { summary: 'VoidFunction' },
        category: 'events',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: "'blanket'" }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: {
    isOpen: true,
    variant: 'dark',
    icon: undefined,
    isFullScreen: false,
    isLoading: false,
    'data-testid': 'blanket',
  },
};
export default meta;

export const Main: StoryObj<BlanketProps> = {
  render: (args) => (
    <Storybook.Container width="100%" height="300px" position="relative">
      <Blanket {...args} />
    </Storybook.Container>
  ),
};

/**
 * Usages in component overlay
 */
export const Variations: StoryObj<BlanketProps> = {
  render: (args) => (
    <Group variant="vertical">
      <Group variant="vertical">
        <Text textStyle="body3" as="p">
          Usage example of <Storybook.Code label="TableRow" /> in loading state
        </Text>
        <Storybook.Container
          width="100%"
          height="50px"
          position="relative"
          padding="s"
          border="global.25"
          borderColor="global.neutral.300"
        >
          <Text textStyle="body3" as="p">
            Row is loading
          </Text>
          <Blanket {...args} variant="light" />
        </Storybook.Container>
      </Group>
      <Group variant="vertical">
        <Text textStyle="body3" as="p">
          Usage example of <Storybook.Code label="AvatarImageControl" /> / <Storybook.Code label="FileAttachment" />
        </Text>
        <Storybook.Container width="100%" height="150px" position="relative" padding="s">
          <Blanket {...args} icon="image-add" />
        </Storybook.Container>
      </Group>
    </Group>
  ),
};

export const IsLoading: StoryObj<BlanketProps> = {
  render: () => {
    const items = [
      {
        label: (
          <>
            Usage example in <Storybook.Code label="AvatarImageControl" />
          </>
        ),
        component: (
          <Storybook.Container width="100%" height="150px" position="relative" padding="s">
            <Blanket variant="dark" isOpen isLoading />
          </Storybook.Container>
        ),
      },
      {
        label: (
          <>
            Usage example of <Storybook.Code label="Table" /> in initial loading state
          </>
        ),
        component: (
          <Storybook.Container width="100%" height="150px" position="relative" border="surface.empty" padding="s">
            <Blanket variant="light" isOpen isLoading />
          </Storybook.Container>
        ),
      },
    ];
    return <Storybook.Row items={items} alignCompLabel="vertical" />;
  },
};

/**
 * Using the blanket as full screen overlay (like in the `Modal` / `Drawer`)
 */
export const IsFullScreen: StoryObj<BlanketProps> = {
  render: () => {
    const [isBlanketVisible, setIsBlanketVisible] = useState(false);

    return (
      <Group variant="vertical" spacing="m" alignItems="center">
        <Button label="Show Blanket" onClick={() => setIsBlanketVisible(!isBlanketVisible)} />
        <Blanket isOpen={isBlanketVisible} onClick={() => setIsBlanketVisible(false)} isFullScreen />
      </Group>
    );
  },
  play: async () => userEvent.click(screen.getByRole('button', { name: 'Show Blanket' })),
};
