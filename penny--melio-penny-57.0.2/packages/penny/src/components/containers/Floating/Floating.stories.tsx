import { Box } from '@chakra-ui/react';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { fullScreenChromaticDecorator, getUnionTypeSummary, isUsingVisualTesting } from '@/test-utils/storybook.utils';

import { Group } from '../Group';
import { Floating } from './Floating';

const placementOptions = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
];
/**
 * The `Floating` component connects a trigger element with a floating element,
 * allowing you to create any accessible and interactive UI elements you need.
 *
 * ### Features:
 * - **Trigger**: Supports any `ReactElement` for trigger element..
 * - **Floating Content**: Supports any `ReactElement` for content.
 * - **Focus Management**: Includes a built-in focus trap for navigating within the floating element content.
 * - **Keyboard Accessibility**: Closes the floating element with the `ESC` key.
 * - **Focus Return**: Automatically returns focus to the trigger after the floating element is closed.
 * - **Dynamic Placement**: Supports customizable offsets and adjusts positioning based on viewport constraints.
 */
const meta: Meta<typeof Floating> = {
  title: 'Containers/Floating [new]',
  component: Floating,
  parameters: { docs: { source: { type: 'code' } } },
  decorators: [fullScreenChromaticDecorator],
  argTypes: {
    children: {
      control: false,
      description: 'The floating content.',
      table: {
        category: 'props',
        type: { summary: 'ReactNode' },
      },
    },
    trigger: {
      control: false,
      type: { name: 'other', value: 'ReactElement', required: true },
      description: 'The trigger that opens the floating element.',
      table: {
        category: 'props',
        type: {
          summary: 'ReactElement',
        },
      },
    },
    isOpen: {
      control: 'boolean',
      type: { name: 'boolean', required: true },
      description: 'Determines if the floating element is open.',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    onOpenChange: {
      control: false,
      type: {
        name: 'other',
        value: '(isOpen: boolean, triggerEvent?: OpenChangeTriggerEvent) => void',
        required: true,
      },
      description: 'The callback event is invoked when the floating element is opened or closed',
      table: {
        type: {
          summary: '(isOpen: boolean, triggerEvent?: OpenChangeTriggerEvent) => void',
        },
        category: 'events',
      },
    },
    placement: {
      control: 'select',
      options: placementOptions,
      description: 'The vertical and horizontal offsets of the mark from the edge of the children.',
      table: {
        defaultValue: { summary: 'bottom-start' },
        type: {
          summary: 'Placement',
          detail: getUnionTypeSummary(placementOptions),
        },
        category: 'props',
      },
    },
    triggerDropdownGap: {
      control: 'number',
      description: 'Determines the gap between the trigger element to the floating element (in pixels).',
      table: {
        defaultValue: { summary: '8' },
        type: {
          summary: 'number',
        },
        category: 'props',
      },
    },
    shouldFitAvailableHeight: {
      control: 'boolean',
      description: 'If set, the floating element will get the maximum available height.',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    shouldTrapFocus: {
      control: 'boolean',
      description: 'If set, the focus will be trapped within the floating element.',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    initialFocus: {
      control: false,
      description:
        'Which focusable element inside the floating element will be focused on open. See [this](https://floating-ui.com/docs/FloatingFocusManager#initialfocus) for more info.',
      table: {
        type: { summary: 'number | MutableRefObject<HTMLElement | null>' },
        category: 'accessibility',
      },
    },
    returnFocus: {
      control: 'boolean',
      description:
        'Determines if focus should be returned to the trigger element (or if that is not available, the previously focused element). [more info...](https://floating-ui.com/docs/floatingfocusmanager#returnfocus)',
      type: { required: false, value: 'boolean', name: 'other' },
      table: { defaultValue: { summary: 'true' }, type: { summary: 'boolean' }, category: 'accessibility' },
    },
    closeOnFocusOut: {
      control: 'boolean',
      description:
        'Determines if the floating element should be closed if the focus moves outside of it. [more info...](https://floating-ui.com/docs/floatingfocusmanager#closeonfocusout)',
      type: { required: false, value: 'boolean', name: 'other' },
      table: { defaultValue: { summary: 'true' }, type: { summary: 'boolean' }, category: 'accessibility' },
    },
    role: {
      control: 'text',
      description: 'The semantic meaning of the floating element.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'dialog' }, category: 'accessibility' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Determines if the floating element is disabled.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'floating' }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: {
    trigger: <Button label="Click Me!" />,
    role: 'dialog',
    isOpen: false,
    isDisabled: false,
    placement: 'bottom-start',
    shouldTrapFocus: true,
    initialFocus: undefined,
    returnFocus: true,
    closeOnFocusOut: true,
    onOpenChange: undefined,
    'data-testid': 'floating',
    shouldFitAvailableHeight: undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof Floating> = {
  render: ({ isOpen, ...args }) => {
    const [open, setIsOpen] = useState(isOpen || isUsingVisualTesting());
    const trigger = <Button label="click trigger" onClick={() => setIsOpen(!isOpen)} />;
    return (
      <Floating {...args} isOpen={open} onOpenChange={setIsOpen} trigger={trigger} aria-label="floating element">
        <Storybook.ContentPlaceholder />
      </Floating>
    );
  },
};

export const FocusTrap: StoryObj<typeof Floating> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isUsingVisualTesting());
    const trigger = <Button label="click trigger" onClick={() => setIsOpen(!isOpen)} />;
    return (
      <Floating {...args} isOpen={isOpen} onOpenChange={setIsOpen} trigger={trigger} aria-label="floating placeholder">
        <Storybook.Container width="300px" height="200px" padding="s" gap="xs" display="flex" flexDirection="column">
          <Storybook.ContentPlaceholder flexShrink={1} />
          <Storybook.ContentPlaceholder height="full" flexShrink={1} />
          <Group width="full" justifyContent="space-between">
            <Button label="Save" onClick={() => setIsOpen(false)} />
            <Button variant="secondary" label="Cancel" onClick={() => setIsOpen(false)} />
          </Group>
        </Storybook.Container>
      </Floating>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/** If you're using a non-interactive element as a trigger,
 * it's your responsibility to provide the correct role, tabindex,
 * and any necessary ARIA attributes (e.g., aria-disabled).
 *
 * We handle only the following trigger-specific ARIA attributes:
 * - aria-expanded
 * - aria-haspopup
 * - aria-controls
 * - disabled
 **/

export const CustomNonButtonTrigger: StoryObj<typeof Floating> = {
  render: ({ isDisabled, ...args }) => {
    const [isOpen, setIsOpen] = useState(isUsingVisualTesting());

    const trigger = (
      <Box onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={isDisabled ? -1 : 0} aria-disabled={isDisabled}>
        click custom button
      </Box>
    );
    return (
      <Floating {...args} isOpen={isOpen} onOpenChange={setIsOpen} trigger={trigger}>
        <Storybook.Container width="300px" height="200px" padding="s" gap="xs" display="flex" flexDirection="column">
          <Storybook.ContentPlaceholder flexShrink={1} />
          <Storybook.ContentPlaceholder height="full" flexShrink={1} />
          <Group width="full" justifyContent="space-between">
            <Button label="Save" onClick={() => setIsOpen(false)} />
            <Button variant="secondary" label="Cancel" onClick={() => setIsOpen(false)} />
          </Group>
        </Storybook.Container>
      </Floating>
    );
  },
};

export const Disabled: StoryObj<typeof Floating> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isUsingVisualTesting());
    const trigger = <Button label="click trigger" onClick={() => setIsOpen(!isOpen)} />;
    return (
      <Floating
        {...args}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        trigger={trigger}
        aria-label="floating placeholder"
        isDisabled
      >
        <Storybook.Container width="300px" height="200px" padding="s" gap="xs" display="flex" flexDirection="column">
          <Storybook.ContentPlaceholder flexShrink={1} />
          <Storybook.ContentPlaceholder height="full" flexShrink={1} />
          <Group width="full" justifyContent="space-between">
            <Button label="Save" onClick={() => setIsOpen(false)} />
            <Button variant="secondary" label="Cancel" onClick={() => setIsOpen(false)} />
          </Group>
        </Storybook.Container>
      </Floating>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
