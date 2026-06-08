import { Box, SimpleGrid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { Pill } from '@/components/dataDisplay/Pill';
import { fullScreenChromaticDecorator, getUnionTypeSummary, isUsingVisualTesting } from '@/test-utils/storybook.utils';

import type { Placement as PlacementOption } from '.';
import { BasePopover, BasePopoverBody, BasePopoverFooter, BasePopoverHeader } from '.';

const isVisualTesting = isUsingVisualTesting();
const triggerEvents = ['hover', 'click'];
const placements: PlacementOption[] = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
];
const closeButtonSizes = ['extra-small', 'small', 'medium'];

/**
 * The `BasePopover` is a floating container that displays content relative to a trigger element.
 * It can be triggered by hover or click events and supports various placements and configurations.
 *
 * For better accessibility, use `BasePopoverHeader` and `BasePopoverBody` that associate the trigger with aria-labelledby and aria-describedby.
 *
 * For details about each part of the popover (`BasePopoverHeader`, `BasePopoverBody`, and `BasePopoverFooter`), see the <a href="?path=/docs/containers-base-popover-popover-parts-documentation--docs#api-reference-basepopover-parts" target="_self">Popover Parts Documentation</a>.
 */
const meta: Meta<typeof BasePopover> = {
  title: 'Containers/Base Popover',
  component: BasePopover,
  decorators: [
    fullScreenChromaticDecorator,
    (Story) => (
      <Storybook.Container display="flex" justifyContent="center" paddingX="xxxl" paddingY="xxxl">
        <Story />
      </Storybook.Container>
    ),
  ],
  argTypes: {
    children: {
      control: false,
      description: 'The content of the popover.',
      table: {
        category: 'props',
        type: { summary: 'ReactNode' },
      },
    },
    trigger: {
      control: false,
      description: 'The trigger element that opens the popover.',
      table: {
        category: 'props',
        type: { summary: 'ReactNode' },
      },
    },
    triggerEvent: {
      control: 'select',
      options: triggerEvents,
      description: 'The event that triggers the popover.',
      table: {
        defaultValue: { summary: 'hover' },
        type: { summary: getUnionTypeSummary(triggerEvents) },
        category: 'props',
      },
    },
    placement: {
      control: 'select',
      options: placements,
      description: 'The placement of the popover relative to the trigger.',
      table: {
        defaultValue: { summary: 'top' },
        type: { summary: getUnionTypeSummary(placements) },
        category: 'props',
      },
    },
    isOpen: {
      description: 'If true, the popover will be open (controlled mode).',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    defaultIsOpen: {
      description: 'The default open state of the popover (uncontrolled mode).',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    onOpenChange: {
      control: false,
      action: 'openChange',
      description: 'Callback fired when the popover open state changes.',
      table: {
        type: { summary: '(isOpen: boolean, triggerEvent?: OpenChangeTriggerEvent) => void' },
        category: 'events',
      },
    },
    showArrow: {
      description: 'If true, the popover will show an arrow pointing to the trigger.',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    hideCloseButton: {
      description: 'If true, the close button will be hidden.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    closeButtonSize: {
      control: 'select',
      options: closeButtonSizes,
      description: 'The size of the close button.',
      table: {
        defaultValue: { summary: 'extra-small' },
        type: { summary: getUnionTypeSummary(closeButtonSizes) },
        category: 'props',
      },
    },
    shouldTrapFocus: {
      control: 'boolean',
      description: 'If true, focus will be trapped within the popover.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    enableAnimationFrame: {
      control: 'boolean',
      description: 'Enables animation frame for better performance during scrolling.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    'aria-label': {
      control: 'text',
      description: 'The aria-label of the popover content.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'base-popover' }, type: { summary: 'string' }, category: 'props' },
    },
  },
  args: {
    triggerEvent: 'hover',
    placement: 'top',
    showArrow: true,
    hideCloseButton: false,
    closeButtonSize: 'extra-small',
    shouldTrapFocus: false,
    enableAnimationFrame: false,
    defaultIsOpen: isVisualTesting,
    isOpen: undefined,
    'aria-label': undefined,
    'data-testid': 'base-popover',
    children: (
      <>
        <BasePopoverHeader>
          <Storybook.ContentPlaceholder flexShrink={1} label="Header" />
        </BasePopoverHeader>
        <BasePopoverBody>
          <Storybook.ContentPlaceholder label="Body" />
        </BasePopoverBody>
        <BasePopoverFooter>
          <Storybook.ContentPlaceholder label="Footer" />
        </BasePopoverFooter>
      </>
    ),
  },
};
export default meta;

export const Main: StoryObj<typeof BasePopover> = {
  render: (args) => (
    <Storybook.Container display="flex" alignItems="center" justifyContent="center" height="180px">
      <BasePopover {...args} trigger={<Button label="Hover me!" />} />
    </Storybook.Container>
  ),
};

/**
 * BasePopover has two trigger options: `hover` or `click`. <br/>
 * Triggering the BasePopover via keyboard has the same behavior for both options: focus on the trigger and then hit `Space` or `Enter`.
 */
export const TriggerEvents: StoryObj<typeof BasePopover> = {
  render: (args) => (
    <SimpleGrid alignItems="center" columns={2} textAlign="center" maxWidth="600px" margin="auto" spacing="l">
      <BasePopover {...args} trigger={<Button label="Hover me!" />} />
      <BasePopover {...args} triggerEvent="click" trigger={<Button label="Click me!" />} />
    </SimpleGrid>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Controlled: StoryObj<typeof BasePopover> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Storybook.Container
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        height="200px"
      >
        <Button aria-label="Toggle Popover" label="Open Popover" variant="tertiary" onClick={() => setIsOpen(true)} />
        <BasePopover
          {...args}
          isOpen={isOpen}
          triggerEvent="click"
          onOpenChange={setIsOpen}
          trigger={<Button label="Controlled" />}
        >
          <BasePopoverHeader>Controlled Popover</BasePopoverHeader>
          <BasePopoverBody>This popover&apos;s state is controlled externally.</BasePopoverBody>
        </BasePopover>
      </Storybook.Container>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Placement: StoryObj<typeof BasePopover> = {
  render: (args) => {
    // Create a wrapper component that adapts children to trigger prop
    const BasePopoverWrapper = ({ children, ...wrapperProps }: PropsWithChildren) => (
      <BasePopover {...args} {...wrapperProps} trigger={children} />
    );

    return <Storybook.Placement wrapper={<BasePopoverWrapper />} placements={placements} />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithoutArrow: StoryObj<typeof BasePopover> = {
  render: (args) => (
    <Storybook.Container display="flex" alignItems="center" justifyContent="center" height="180px">
      <BasePopover {...args} showArrow={false} trigger={<Button label="No arrow" />} />
    </Storybook.Container>
  ),
};

export const WithoutCloseButton: StoryObj<typeof BasePopover> = {
  render: (args) => (
    <Storybook.Container display="flex" alignItems="center" justifyContent="center" height="180px">
      <BasePopover {...args} triggerEvent="hover" trigger={<Button label="Hover me" />} hideCloseButton />
    </Storybook.Container>
  ),
};

/**
 * BasePopover with focus trap enabled. Focus will be contained within the popover.
 */
export const WithFocusTrap: StoryObj<typeof BasePopover> = {
  render: (args) => (
    <Storybook.Container display="flex" alignItems="center" justifyContent="center" height="180px">
      <BasePopover {...args} triggerEvent="hover" shouldTrapFocus trigger={<Button label="Hover for focus trap" />}>
        <BasePopoverHeader>Focus Trap</BasePopoverHeader>
        <BasePopoverBody>
          Focus is trapped within this popover. Tab to navigate between focusable elements.
        </BasePopoverBody>
        <BasePopoverFooter>
          <Button label="Focusable button" size="small" variant="secondary-inverse" />
        </BasePopoverFooter>
      </BasePopover>
    </Storybook.Container>
  ),
  parameters: { chromatic: { disableSnapshot: true } },
};

/**
 * To comply with ADA, popovers need to be triggered by interactive elements so they would be accessible by keyboard and screen-readers.<br />
 * If the trigger is a plain text, we will wrap it with an interactive parent. In other cases, you will have to make sure the trigger is interactive.
 */
export const InteractiveTrigger: StoryObj<typeof BasePopover> = {
  render: (args) => (
    <SimpleGrid alignItems="center" columns={3} textAlign="center" maxWidth="600px" margin="auto" spacing="l">
      <BasePopover {...args} trigger="Text trigger">
        <BasePopoverHeader>Text Trigger</BasePopoverHeader>
        <BasePopoverBody>This trigger is plain text that gets wrapped with an interactive element.</BasePopoverBody>
      </BasePopover>
      <BasePopover {...args} trigger={<Button label="Interactive" />}>
        <BasePopoverHeader>Button Trigger</BasePopoverHeader>
        <BasePopoverBody>This trigger is already interactive (button).</BasePopoverBody>
      </BasePopover>
      <BasePopover
        {...args}
        trigger={
          <Box as="button">
            <Pill status="informative" label="Non interactive" />
          </Box>
        }
      >
        <BasePopoverHeader>Custom Trigger</BasePopoverHeader>
        <BasePopoverBody>This trigger is made interactive by wrapping with a button element</BasePopoverBody>
      </BasePopover>
    </SimpleGrid>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
