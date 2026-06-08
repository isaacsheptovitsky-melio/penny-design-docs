import { offset, useDismiss, useFloating, useInteractions } from '@floating-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { IconButton } from '@/components/action/IconButton';
import { FloatingContainer } from '@/components/containers/Floating';
import { Group } from '@/components/containers/Group';
import { Blanket } from '@/components/internal/Blanket';

import { fullScreenChromaticDecorator, isUsingVisualTesting } from '../../../test-utils';
import { Floater } from './Floater';

/**
 * The Floater component is a wrapper that provides a floating UI element with advanced focus management, position handling, and optional overlay support.
 * It uses FloatingFocusManager to control focus behavior for modal and non-modal use cases.
 * Basically, Floater can replace any component that combines Portal, Overlay, and FocusManager, appearing or not appearing based on a condition.
 *
 * @private
 * This component is intended for internal use only.
 *
 **/

const meta: Meta<typeof Floater> = {
  title: 'Internal Components/Floater',
  component: Floater,
  parameters: { docs: { source: { type: 'code' } } },
  decorators: [fullScreenChromaticDecorator],
  argTypes: {
    children: {
      control: false,
      description: 'The floater content.',
      table: {
        category: 'props',
        type: { summary: 'ReactNode' },
      },
    },
    isOpen: {
      control: 'boolean',
      type: { name: 'boolean', required: true },
      description: 'Determines if the floater is open.',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    focusManagerProps: {
      control: 'object',
      description:
        'Props to configure the behavior of the `FloatingFocusManager`. Supports all options except `children`. [More info...](https://floating-ui.com/docs/FloatingFocusManager)',
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'Omit<FloatingFocusManagerProps, "children">' },
        category: 'props',
      },
    },
    overlay: {
      control: false,
      description:
        'An optional overlay element that can be rendered alongside the floating element, typically used for background dimming or modal effects.',
      table: {
        type: { summary: 'ReactNode' },
        category: 'props',
      },
    },
    styles: {
      control: 'object',
      description: 'Custom inline styles to apply to the floating element, allowing for precise styling adjustments.',
      table: {
        type: { summary: 'CSSProperties' },
        category: 'props',
      },
    },
    as: {
      control: 'text',
      description: 'Determines which type of element the floater should be rendered as.',
      table: {
        defaultValue: { summary: "'div'" },
        type: { summary: 'ElementType' },
        category: 'props',
      },
    },
    role: {
      control: 'text',
      description: 'The semantic meaning of the floating element.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    tabIndex: {
      control: 'number',
      type: { name: 'number' },
      description: 'Sets the tab index of the floater.',
      table: {
        category: 'props',
      },
    },
    onClick: {
      control: false,
      description: 'An event called when the floater is clicked.',
      table: { type: { summary: 'MouseEventHandler<HTMLDivElement>' }, category: 'events' },
    },
    onKeyDown: {
      control: false,
      description: 'An event called when a key is pressed while the floater is focused.',
      table: { type: { summary: 'KeyboardEventHandler<HTMLDivElement>' }, category: 'events' },
    },
  },
  args: {
    children: <Storybook.ContentPlaceholder />,
    role: undefined,
    isOpen: false,
  },
};
export default meta;

export const Main: StoryObj<typeof Floater> = {
  render: ({ isOpen: defaultIsOpen, ...args }) => {
    const [isOpen, setIsOpen] = useState(defaultIsOpen || isUsingVisualTesting());
    const { floatingStyles, refs, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: 'bottom-start',
    });

    const dismiss = useDismiss(context);
    const { getFloatingProps } = useInteractions([dismiss]);

    return (
      <Storybook.Container width="500px" height="300px">
        <Button label="referance element" ref={refs.setReference} onClick={() => setIsOpen(!isOpen)} />
        <Floater
          {...args}
          focusManagerProps={{ context }}
          ref={refs.setFloating}
          isOpen={isOpen}
          styles={floatingStyles}
          {...getFloatingProps}
        >
          <Storybook.Container width="300px" height="200px" padding="s" gap="xs" display="flex" flexDirection="column">
            <Storybook.ContentPlaceholder flexShrink={1} />
            <Storybook.ContentPlaceholder height="full" flexShrink={1} />
          </Storybook.Container>
        </Floater>
      </Storybook.Container>
    );
  },
};

export const WithOverly: StoryObj<typeof Floater> = {
  render: ({ isOpen: defaultIsOpen, ...args }) => {
    const [isOpen, setIsOpen] = useState(defaultIsOpen || isUsingVisualTesting());
    const { floatingStyles, refs, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: 'bottom-start',
      middleware: [
        offset({
          mainAxis: 8,
          alignmentAxis: 0,
        }),
      ],
    });

    return (
      <Storybook.Container width="500px" height="300px">
        <Button label="referance element" ref={refs.setReference} onClick={() => setIsOpen(!isOpen)} />
        <Floater
          {...args}
          focusManagerProps={{ context }}
          ref={refs.setFloating}
          isOpen={isOpen}
          styles={floatingStyles}
          overlay={<Blanket isOpen={isOpen} isFullScreen />}
        >
          <Storybook.Container width="300px" height="200px" padding="s" gap="xs" display="flex" flexDirection="column">
            <Group>
              <Storybook.ContentPlaceholder flexShrink={1} />
              <IconButton icon="close" variant="tertiary" onClick={() => setIsOpen(false)} />
            </Group>
            <Storybook.ContentPlaceholder height="full" flexShrink={1} />
          </Storybook.Container>
        </Floater>
      </Storybook.Container>
    );
  },
};

/**
 * The `as` prop allows you to render the `Floater` component as a custom React element or HTML element.
 * This is particularly useful when you need to customize the rendering element of the component
 * while maintaining all other functionality and behavior. For example, you can pass a custom component
 * like `FloatingContainer` that has style, to replace the default container.
 * **/

export const RenderAsCustomComponent: StoryObj<typeof Floater> = {
  render: ({ isOpen: defaultIsOpen, ...args }) => {
    const [isOpen, setIsOpen] = useState(defaultIsOpen || isUsingVisualTesting());
    const { floatingStyles, refs, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: 'bottom-start',
      middleware: [
        offset({
          mainAxis: 8,
          alignmentAxis: 0,
        }),
      ],
    });

    return (
      <Storybook.Container width="500px" height="300px">
        <Button label="referance element" ref={refs.setReference} onClick={() => setIsOpen(!isOpen)} />
        <Floater
          as={FloatingContainer}
          {...args}
          focusManagerProps={{ context }}
          ref={refs.setFloating}
          isOpen={isOpen}
          styles={floatingStyles}
        >
          <Storybook.Container width="300px" height="200px" padding="s" gap="xs" display="flex" flexDirection="column">
            <Storybook.ContentPlaceholder height="full" flexShrink={1} />
          </Storybook.Container>
        </Floater>
      </Storybook.Container>
    );
  },
};
