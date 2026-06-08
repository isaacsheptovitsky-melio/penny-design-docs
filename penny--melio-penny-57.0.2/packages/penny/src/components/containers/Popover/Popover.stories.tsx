import { Box, SimpleGrid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { Pill } from '@/components/dataDisplay/Pill';
import { Text } from '@/components/dataDisplay/Text';
import { fullScreenChromaticDecorator, isUsingVisualTesting } from '@/test-utils/storybook.utils';
import { type IconKey } from '@/theme/icons/icon.types';
import { getDefaultIconsMap } from '@/theme/icons/icons.generated';

import type { PopoverProps } from '.';
import { Popover } from '.';

const isVisualTesting = isUsingVisualTesting();
const iconOptions = Object.keys(getDefaultIconsMap('')).sort() as IconKey[];

const actionRenderer: PopoverProps['actionRenderer'] = ({ onClose, ...props }) => (
  <Button {...props} onClick={onClose} variant="secondary-inverse" size="small" label="Got it" />
);

const actionRendererPropsType = `{
  onClose: VoidFunction;
  'data-testid'?: string;
}`;

const backButtonRendererPropsType = `{
  'data-testid'?: string;
}`;

const meta: Meta<typeof Popover> = {
  title: 'Containers/Popover [pattern]',
  component: Popover,
  decorators: [
    fullScreenChromaticDecorator,
    (Story) => (
      <Storybook.Container display="flex" justifyContent="center" paddingX="xxxl" paddingY="xxxl">
        {Story()}
      </Storybook.Container>
    ),
  ],
  argTypes: {
    children: {
      control: false,
      description: 'The DOM node that will trigger the popover on either click or hover.',
      type: { required: true, name: 'string' },
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    triggerEvent: {
      control: 'select',
      description:
        'Determines if the popover should be triggered by either click or hover.\n\nNote that controlled popover is only available while this is set to `click`.',
      options: ['click', 'hover'],
      table: {
        defaultValue: { summary: 'hover' },
        type: { summary: 'click | hover' },
        category: 'props',
      },
    },
    hideCloseButton: {
      control: 'boolean',
      description: 'Determines if hiding the close button (controlled by click only).',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    title: {
      control: 'text',
      description: 'The popover title.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    icon: {
      description: 'The popover icon next to the title.',
      control: 'select',
      options: iconOptions,
      table: {
        category: 'props',
        type: { summary: iconOptions.join(' | ') },
      },
    },
    description: {
      control: 'text',
      description: 'The popover description.',
      type: { required: true, name: 'string' },
      table: { type: { summary: 'string' }, category: 'props' },
    },
    isOpen: {
      control: 'boolean',
      description: 'Determines if the popover is open (controlled by click only).',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    onOpenChange: {
      control: false,
      description: 'Function to toggle the popover `isOpen` state (controlled by click only).',
      table: {
        type: { summary: `(isOpen: boolean, triggerEvent: 'close' | 'outside' | 'cta' | 'children') => void` },
        category: 'events',
      },
    },
    actionRenderer: {
      control: false,
      description: 'A function to render the action element in the footer.',
      type: { required: true, name: 'string' },
      table: {
        category: 'props',
        type: {
          summary: '(props: PopoverActionProps) => ReactNode',
          detail: actionRendererPropsType,
        },
      },
    },
    backButtonRenderer: {
      control: false,
      description: 'A function to render the back button in the footer.',
      type: { required: true, name: 'string' },
      table: {
        category: 'props',
        type: { summary: '(props: PopoverBackButtonProps) => ReactNode', detail: backButtonRendererPropsType },
      },
    },
    defaultIsOpen: {
      control: false,
      description: 'Determines if the popover is open by default (uncontrolled only).',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    shouldTrapFocus: {
      control: 'boolean',
      description: 'If set, the focus will be trapped within the popover.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    'aria-label': {
      control: 'text',
      description:
        'Dedicated label for the popover dialog to improve screen reader accessibility — use an aria-label if there is no visible heading to reference within the popover.',
      table: {
        type: { summary: 'string' },
        category: 'accessibility',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'popover' }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: {
    children: 'Hover me!',
    description: 'Hello! 👋',
    actionRenderer,
    backButtonRenderer: undefined,
    title: undefined,
    icon: undefined,
    hideCloseButton: false,
    isOpen: undefined,
    triggerEvent: 'hover',
    defaultIsOpen: isVisualTesting,
    onOpenChange: undefined,
    shouldTrapFocus: false,
    'data-testid': 'popover',
  },
};
export default meta;

export const Main: StoryObj<typeof Popover> = {
  render: (args) => (
    <Storybook.Container display="flex" alignItems="center" justifyContent="center" height="180px">
      <Popover {...args} aria-label="greeting popover" />
    </Storybook.Container>
  ),
};

/**
 * Popover has two trigger options: `hover` or `click`. <br/>
 * Triggering the Popover via keyboard has the same behavior for both options: focus on the trigger and then hit `Space` or `Enter`.
 */
export const TriggerEvents: StoryObj<typeof Popover> = {
  render: (args) => (
    <SimpleGrid alignItems="center" columns={2} textAlign="center" maxWidth="600px" margin="auto" spacing="l">
      <Popover {...args} title="title">
        Hover me!
      </Popover>
      <Popover {...args} triggerEvent="click" title="title" icon="duplicate">
        Click me!
      </Popover>
    </SimpleGrid>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Controlled: StoryObj<typeof Popover> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Storybook.Container display="flex" justifyContent="space-between" width="full" maxWidth="600px" margin="auto">
        <Storybook.Container
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          height="200px"
        >
          <Button
            aria-label="Toggle Popover"
            label="Open Popover"
            onClick={() => {
              setIsOpen(true);
            }}
          />
          <Popover
            {...args}
            isOpen={isOpen}
            title="Controlled popover"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat."
            triggerEvent="click"
            onOpenChange={setIsOpen}
          >
            Popover
          </Popover>
        </Storybook.Container>
        <Storybook.Container
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          height="200px"
        >
          <Text textStyle="body2Semi" as="h2">
            Uncontrolled
          </Text>
          <Popover
            {...args}
            title="Uncontrolled popover"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat."
          >
            Popover
          </Popover>
        </Storybook.Container>
      </Storybook.Container>
    );
  },
  parameters: {
    docs: { source: { type: 'code' } },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Placement: StoryObj<typeof Popover> = {
  render: (args) => {
    const placements = [
      'top-start',
      'top',
      'top-end',
      'right-start',
      'right',
      'right-end',
      'bottom-start',
      'bottom',
      'bottom-end',
      'left-start',
      'left',
      'left-end',
    ];

    return (
      <Storybook.Placement wrapper={<Popover {...args} aria-label="Placement popover" />} placements={placements} />
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * To comply with ADA, popovers need to be triggered by interactive elements so they would be accessible by keyboard and screen-readers.<br />
 * If the trigger is a plain text, we will wrap it with an interactive parent. In other cases, you will have to make sure the trigger is interactive.
 */
export const InteractiveTrigger: StoryObj<typeof Popover> = {
  render: (args) => (
    <Storybook.Container
      display="flex"
      justifyContent="space-between"
      alignItems="baseline"
      width="full"
      maxWidth="600px"
    >
      <Popover {...args} title="title">
        Text trigger
      </Popover>
      <Popover {...args} title="title">
        <Button label="Interactive" />
      </Popover>
      <Popover {...args} title="title">
        <Box as="button">
          <Pill status="informative" label="Non interactive" />
        </Box>
      </Popover>
    </Storybook.Container>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
