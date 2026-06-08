import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { getUnionTypeSummary } from '@/test-utils/storybook.utils';
import { themeSpaceKeys } from '@/theme/foundations/spaces';

import { BaseSheet, BaseSheetBody, BaseSheetFooter, BaseSheetHeader } from '.';

const themeSpaceKeysOptions = Object.keys(themeSpaceKeys);

/**
 * The base sheet is a dialog window that overlays the main content of the page.
 *
 * To open the dialog, use a trigger button. <br />
 * For better accessibility, apply `aria-haspopup="dialog"` to the trigger button to associate it with the dialog ([MDN accessibility guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup)).
 */
const meta: Meta<typeof BaseSheet> = {
  title: 'Containers/Base Sheet',
  component: BaseSheet,
  parameters: {
    docs: { source: { type: 'code' } },
  },
  argTypes: {
    children: {
      control: false,
      description: 'The sheet content.',
      table: {
        category: 'props',
        type: { summary: 'ReactNode' },
      },
    },
    isOpen: {
      control: false,
      description: 'Determines whether the sheet is open.',
      type: { name: 'boolean', required: true },
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    placement: {
      control: 'select',
      options: ['left', 'bottom'],
      description: 'Determines from which direction the sheet would open.',
      table: {
        defaultValue: { summary: 'left' },
        type: { summary: 'left | bottom' },
        category: 'props',
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback to call when the modal is closed',
      type: { name: 'function', required: true },
      table: {
        type: { summary: 'VoidFunction' },
        category: 'events',
      },
    },
    onEsc: {
      control: false,
      action: 'closed',
      type: { name: 'function' },
      description:
        'Callback to call when the modal is close by typing Esc. Note: onEsc is called first and onClose after',
      table: {
        type: { summary: 'voidFunction' },
        category: 'events',
      },
    },
    onOverlayClick: {
      control: false,
      action: 'closed',
      type: { name: 'function' },
      description:
        'Callback to call when the modal is close by clicking on overlay. Note: onOverlayClick is called first and onClose after',
      table: {
        type: { summary: 'voidFunction' },
        category: 'events',
      },
    },
    onCloseComplete: {
      action: 'closed',
      description: 'Fires when the sheet has completed animating out.',
      table: {
        type: { summary: 'VoidFunction' },
        category: 'events',
      },
    },
    isLoading: {
      description: 'Determines if the sheet is loading.',
      control: 'boolean',
      type: { name: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    paddingX: {
      control: 'select',
      options: themeSpaceKeysOptions,
      description: "The content's x-axis padding.",
      table: {
        type: { summary: getUnionTypeSummary(themeSpaceKeysOptions) },
        defaultValue: { summary: `'${themeSpaceKeys.s}'` },
        category: 'props',
      },
    },
    paddingY: {
      control: 'select',
      options: themeSpaceKeysOptions,
      description: "The content's y-axis padding.",
      table: {
        type: { summary: getUnionTypeSummary(themeSpaceKeysOptions) },
        defaultValue: { summary: `'${themeSpaceKeys.s}'` },
        category: 'props',
      },
    },
    closeButtonAriaLabel: {
      control: 'text',
      description: 'The aria label for the close button.',
      table: {
        category: 'accessibility',
        type: { summary: 'string' },
        defaultValue: { summary: 'Close dialog' },
      },
    },
    isModal: {
      control: 'boolean',
      description: 'If true, this keeps the portal mounted even when the sheet is closed.',
      type: { name: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'base-sheet' }, category: 'tests' },
    },
  },
  args: {
    isOpen: false,
    children: <Storybook.ContentPlaceholder height="100%" borderRadius="global.600" />,
    placement: 'left',
    isLoading: false,
    paddingX: 's',
    paddingY: 's',
    closeButtonAriaLabel: 'Close dialog',
    initialFocus: 0,
    returnFocus: true,
    isModal: false,
    'data-testid': 'base-sheet',
  },
};
export default meta;

export const Main: StoryObj<typeof BaseSheet> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);

    return (
      <>
        <Button onClick={() => setIsOpen(true)} label="Open" aria-haspopup="dialog" />
        <BaseSheet {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <BaseSheetHeader>Header</BaseSheetHeader>
          <BaseSheetBody>
            <Storybook.Container paddingX={args.paddingX} height="100%">
              <Storybook.ContentPlaceholder label="Body" height="100%" />
            </Storybook.Container>
          </BaseSheetBody>
          <BaseSheetFooter>
            <Storybook.ContentPlaceholder label="Footer" />
          </BaseSheetFooter>
        </BaseSheet>
      </>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Bottom: StoryObj<typeof BaseSheet> = {
  args: {
    placement: 'bottom',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);

    return (
      <>
        <Button onClick={() => setIsOpen(true)} label="Open" aria-haspopup="dialog" />
        <BaseSheet {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <BaseSheetHeader>Header</BaseSheetHeader>
          <BaseSheetBody>
            <Storybook.Container paddingX={args.paddingX} height="400px" display="flex">
              <Storybook.ContentPlaceholder label="Body" />
            </Storybook.Container>
          </BaseSheetBody>
          <BaseSheetFooter>
            <Storybook.ContentPlaceholder label="Footer" />
          </BaseSheetFooter>
        </BaseSheet>
      </>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Side: StoryObj<typeof BaseSheet> = {
  args: {
    placement: 'left',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);

    return (
      <>
        <Button onClick={() => setIsOpen(true)} label="Open" aria-haspopup="dialog" />
        <BaseSheet {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <BaseSheetHeader>Header</BaseSheetHeader>
          <BaseSheetBody>
            <Storybook.Container paddingX={args.paddingX} height="100%" display="flex">
              <Storybook.ContentPlaceholder label="Body" />
            </Storybook.Container>
          </BaseSheetBody>
          <BaseSheetFooter>
            <Storybook.ContentPlaceholder label="Footer" />
          </BaseSheetFooter>
        </BaseSheet>
      </>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Loading: StoryObj<typeof BaseSheet> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);

    return (
      <>
        <Button onClick={() => setIsOpen(true)} label="Open" aria-haspopup="dialog" />
        <BaseSheet {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} isLoading />
      </>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
