import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '@/components/action/Button';
import { statusIconSolidType } from '@/components/foundations/StatusIconSolid';
import {
  fullScreenChromaticDecorator,
  isUsingVisualTesting,
  setChromaticViewports,
} from '@/test-utils/storybook.utils';
import { useBreakpointValue } from '@/theme/hooks/useBreakpointValue';

import { Group, type GroupProps } from '../../Group';
import { StatusModal } from './StatusModal';
import type { StatusModalProps } from './StatusModal.types';

const solidIconTypes = Object.keys(statusIconSolidType);

const modalButtonProps = `{
  label: string;
  onClick?: VoidFunction;
  isDisabled?: boolean;
  isLoading?: boolean;
  // For accessibility, it is important to add a fallback loading text. This text will be visible only to screen readers.
  loadingText?: string;
} & AriaAttributes`;

const primaryButton: StatusModalProps['primaryButton'] = { label: 'primary', variant: 'primary' };
const secondaryButton: StatusModalProps['secondaryButton'] = { label: 'tertiary', variant: 'tertiary' };

/**
 * The modal is a dialog window that overlays the main content of a page.
 *
 * Basically to render a modal you'll trigger it by using a button. <br />
 * For better accessibility it's required to use `aria-haspopup="dialog"` on the trigger button to associate the button with the modal dialog (related to [MDN's accessibility guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup)).
 */
const meta: Meta<typeof StatusModal> = {
  title: 'Containers/Modals/Status Modal [pattern]',
  component: StatusModal,
  decorators: [fullScreenChromaticDecorator],
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300, viewports: [390, 1200] },
  },
  argTypes: {
    variant: {
      control: 'select',
      description: 'Determines the variant of the modal.',
      options: solidIconTypes,
      table: {
        category: 'props',
        type: {
          summary: solidIconTypes.join(' | '),
        },
      },
    },
    header: {
      control: 'text',
      description: 'The title of the modal.',
      type: { name: 'string' },
      table: {
        category: 'props',
        type: { summary: 'string' },
      },
    },
    headerProps: {
      control: false,
      description: "The header override props (useful for setting additional props to the modal's header).",
      type: { name: 'string' },
      table: {
        category: 'props',
        type: { summary: 'BoxProps' },
      },
    },
    primaryButton: {
      control: 'object',
      description: 'The props for the primary button of the modal.',
      table: {
        category: 'props',
        type: {
          summary: `ModalButtonProps & { variant: 'primary' | 'critical' }`,
          detail: `${modalButtonProps} & { variant: 'primary' | 'critical' }`,
        },
      },
    },
    secondaryButton: {
      control: 'object',
      description: 'The props for the secondary button of the modal.',
      table: {
        category: 'props',
        type: {
          summary: `ModalButtonProps & { variant: 'tertiary' | 'secondary' }`,
          detail: `${modalButtonProps} & { variant: 'tertiary' | 'secondary' }`,
        },
      },
    },
    shouldReturnFocus: {
      control: 'boolean',
      description:
        'Determines if focus should be returned to the reference element (or if that is not available, the previously focused element).',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' }, category: 'props' },
    },
    onClose: {
      control: false,
      action: 'closed',
      type: { name: 'function', required: true },
      description: 'Callback to call when the modal is closed',
      table: {
        type: { summary: 'voidFunction' },
        category: 'events',
      },
    },
    onEsc: {
      control: false,
      action: 'closed',
      type: { name: 'function' },
      description:
        'Callback to call when the status modal is close by typing Esc. Note: onEsc is called first and onClose after',
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
        'Callback to call when the status modal is close by clicking on overlay. Note: onOverlayClick is called first and onClose after',
      table: {
        type: { summary: 'voidFunction' },
        category: 'events',
      },
    },
    isOpen: {
      control: 'boolean',
      description: 'Determines if the modal is open.',
      type: { name: 'boolean', required: true },
      table: {
        category: 'props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    children: {
      control: false,
      description: 'The body of the modal.',
      table: {
        category: 'props',
        type: {
          summary: 'ReactNode',
        },
      },
    },
    isLoading: {
      description: 'Determines if the modal is loading',
      control: 'boolean',
      type: { name: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    bodyTabIndex: {
      control: 'number',
      type: { name: 'number' },
      description: 'Sets the tab index of the modal body',
      table: {
        category: 'props',
      },
    },
    'aria-label': {
      control: 'text',
      description: 'The aria-label of the modal content. The default is the header text.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    'aria-modal': {
      control: 'boolean',
      description:
        'The aria-modal attribute indicates whether an element is modal when displayed. ' +
        'Set as `false` when having a tooltip inside the modal, otherwise SR might not announce the tooltip content',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' }, category: 'accessibility' },
    },
    closeButtonAriaLabel: {
      control: 'text',
      description: "The aria-label of the modal's close button.",
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'status-modal' }, type: { summary: 'string' }, category: 'props' },
    },
  },
  args: {
    variant: 'success',
    header: 'Modal header',
    headerProps: undefined,
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene',
    primaryButton: undefined,
    secondaryButton: undefined,
    isOpen: isUsingVisualTesting(),
    isLoading: false,
    'aria-label': undefined,
    closeButtonAriaLabel: undefined,
    shouldReturnFocus: true,
    'aria-modal': true,
    'data-testid': 'status-modal',
  },
};
export default meta;

export const Main: StoryObj<typeof StatusModal> = {
  render: ({ isOpen, ...args }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

    return (
      <>
        {!isUsingVisualTesting() && (
          <Button onClick={() => setIsModalOpen(true)} label="Open Modal" aria-haspopup="dialog" />
        )}
        <StatusModal
          {...args}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          primaryButton={{
            ...primaryButton,
            onClick: () => setIsModalOpen(false),
          }}
          secondaryButton={{
            ...secondaryButton,
            onClick: () => setIsModalOpen(false),
          }}
        />
      </>
    );
  },
};

export const Variants: StoryObj<typeof StatusModal> = {
  render: ({ isOpen, ...args }) => {
    const [isModalOpen, setIsModalOpen] = useState<number>(0);
    const triggersVariant = useBreakpointValue<GroupProps['variant']>({
      xs: 'vertical',
      s: 'horizontal',
    });

    return (
      <Group variant={triggersVariant}>
        <>
          {!isUsingVisualTesting() && (
            <Button onClick={() => setIsModalOpen(1)} label="warning" aria-haspopup="dialog" />
          )}
          <StatusModal
            {...args}
            variant="warning"
            isOpen={isModalOpen === 1}
            onClose={() => setIsModalOpen(0)}
            primaryButton={{ label: 'primary', onClick: () => setIsModalOpen(1), variant: 'primary' }}
            secondaryButton={{ label: 'tertiary', onClick: () => setIsModalOpen(1), variant: 'tertiary' }}
          />
        </>
        <>
          {!isUsingVisualTesting() && (
            <Button onClick={() => setIsModalOpen(2)} label="pending" aria-haspopup="dialog" />
          )}
          <StatusModal
            {...args}
            variant="pending"
            isOpen={isModalOpen === 2}
            onClose={() => setIsModalOpen(0)}
            primaryButton={{ label: 'primary', onClick: () => setIsModalOpen(2), variant: 'primary' }}
            secondaryButton={{ label: 'tertiary', onClick: () => setIsModalOpen(2), variant: 'tertiary' }}
          />
        </>
        <>
          {!isUsingVisualTesting() && (
            <Button onClick={() => setIsModalOpen(3)} label="success" aria-haspopup="dialog" />
          )}
          <StatusModal
            {...args}
            variant="success"
            isOpen={isModalOpen === 3}
            onClose={() => setIsModalOpen(0)}
            primaryButton={{ label: 'primary', onClick: () => setIsModalOpen(3), variant: 'primary' }}
            secondaryButton={{ label: 'tertiary', onClick: () => setIsModalOpen(3), variant: 'tertiary' }}
          />
        </>
        <>
          {!isUsingVisualTesting() && (
            <Button onClick={() => setIsModalOpen(4)} label="scheduled" aria-haspopup="dialog" />
          )}
          <StatusModal
            {...args}
            variant="scheduled"
            isOpen={isModalOpen === 4}
            onClose={() => setIsModalOpen(0)}
            primaryButton={{ label: 'primary', onClick: () => setIsModalOpen(4), variant: 'primary' }}
            secondaryButton={{ label: 'tertiary', onClick: () => setIsModalOpen(4), variant: 'tertiary' }}
          />
        </>
        <>
          {!isUsingVisualTesting() && (
            <Button onClick={() => setIsModalOpen(5)} label="cancel" aria-haspopup="dialog" />
          )}
          <StatusModal
            {...args}
            variant="cancel"
            isOpen={isModalOpen === 5}
            onClose={() => setIsModalOpen(0)}
            primaryButton={{ label: 'primary', onClick: () => setIsModalOpen(5), variant: 'primary' }}
            secondaryButton={{ label: 'tertiary', onClick: () => setIsModalOpen(5), variant: 'tertiary' }}
          />
        </>
        <>
          {!isUsingVisualTesting() && <Button onClick={() => setIsModalOpen(6)} label="alert" aria-haspopup="dialog" />}
          <StatusModal
            {...args}
            variant="alert"
            isOpen={isModalOpen === 6}
            onClose={() => setIsModalOpen(0)}
            primaryButton={{ label: 'primary', onClick: () => setIsModalOpen(6), variant: 'primary' }}
            secondaryButton={{ label: 'tertiary', onClick: () => setIsModalOpen(6), variant: 'tertiary' }}
          />
        </>
        <>
          {!isUsingVisualTesting() && (
            <Button onClick={() => setIsModalOpen(7)} label="decline" aria-haspopup="dialog" />
          )}
          <StatusModal
            {...args}
            variant="decline"
            isOpen={isModalOpen === 7}
            onClose={() => setIsModalOpen(0)}
            primaryButton={{ label: 'primary', onClick: () => setIsModalOpen(7), variant: 'primary' }}
            secondaryButton={{ label: 'tertiary', onClick: () => setIsModalOpen(7), variant: 'tertiary' }}
          />
        </>
      </Group>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithScrollbar: StoryObj<typeof StatusModal> = {
  render: ({ isOpen, ...args }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

    return (
      <>
        {!isUsingVisualTesting() && (
          <Button onClick={() => setIsModalOpen(true)} label="Open Modal" aria-haspopup="dialog" />
        )}
        <StatusModal
          {...args}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          primaryButton={{
            ...primaryButton,
            onClick: () => setIsModalOpen(false),
          }}
          secondaryButton={{
            ...secondaryButton,
            onClick: () => setIsModalOpen(false),
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim vene
        </StatusModal>
      </>
    );
  },
};

setChromaticViewports([Main, WithScrollbar], ['xs', 'xl']);
