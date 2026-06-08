import { createDate } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';
import { expect, screen, userEvent, waitFor } from 'storybook/test';

import { Button } from '@/components/action/Button';
import { Group, GroupItem } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { Form } from '@/components/form/components/Form';
import { useMelioForm } from '@/components/form/hooks';
import { Icon } from '@/components/foundations/Icon';
import { DateField } from '@/components/selectionAndInputs/DateField';
import {
  fullScreenChromaticDecorator,
  isUsingVisualTesting,
  setChromaticViewports,
} from '@/test-utils/storybook.utils';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import { Container } from '../../Container';
import { Modal } from './Modal';
import type { ModalProps } from './Modal.types';

const modalButtonProps = `{
  label: string;
  onClick?: VoidFunction;
  isDisabled?: boolean;
  isLoading?: boolean;
  // For accessibility, it is important to add a fallback loading text. This text will be visible only to screen readers.
  loadingText?: string;
} & AriaAttributes`;

const primaryButton: ModalProps['primaryButton'] = { label: 'primary', variant: 'primary' };
const secondaryButton: ModalProps['secondaryButton'] = { label: 'tertiary', variant: 'tertiary' };

/**
 * The modal is a dialog window that overlays the main content of a page.
 *
 * Basically to render a modal you'll trigger it by using a button. <br />
 * For better accessibility it's required to use `aria-haspopup="dialog"` on the trigger button to associate the button with the modal dialog (related to [MDN's accessibility guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup)).
 */
const meta: Meta<typeof Modal> = {
  title: 'Containers/Modals/Modal [pattern]',
  component: Modal,
  decorators: [fullScreenChromaticDecorator],
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300, viewports: [390, 1200] },
    docs: { source: { type: 'code' } },
    a11y: {
      // TODO: https://meliorisk.atlassian.net/browse/ME-109855 (aria-dialog-name)
      test: 'todo',
    },
  },
  argTypes: {
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
    isOpen: {
      control: 'boolean',
      description: 'Determines if the modal is open.',
      type: { name: 'boolean' },
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
    shouldReturnFocus: {
      control: 'boolean',
      description:
        'Determines if focus should be returned to the reference element (or if that is not available, the previously focused element).',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' }, category: 'props' },
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
      table: { defaultValue: { summary: 'modal' }, type: { summary: 'string' }, category: 'props' },
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
  },
  args: {
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
    'data-testid': 'modal',
    'aria-modal': true,
  },
};
export default meta;

/**
 * Example: Refocusing the trigger programmatically after closing the modal.
 *
 * This example demonstrates how to ensure the trigger button regains focus
 * after the modal is closed. It uses `requestAnimationFrame` to refocus the button,
 * ensuring that the DOM is fully updated before applying focus.
 *
 * For troubleshooting, `setTimeout` can be used as an alternative approach if timing issues occur.
 */
export const Main: StoryObj<typeof Modal> = {
  render: ({ isOpen, ...args }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const onCloseModal = () => {
      setIsModalOpen(false);

      // Refocus the button after the DOM updates
      requestAnimationFrame(() => buttonRef.current?.focus());
    };

    return (
      <>
        {!isUsingVisualTesting() && (
          <Button ref={buttonRef} onClick={() => setIsModalOpen(true)} label="Open Modal" aria-haspopup="dialog" />
        )}
        <Modal
          {...args}
          isOpen={isModalOpen}
          onClose={onCloseModal}
          primaryButton={{
            label: primaryButton.label,
            onClick: onCloseModal,
            variant: primaryButton.variant,
          }}
          secondaryButton={{
            label: secondaryButton.label,
            onClick: onCloseModal,
            variant: secondaryButton?.variant,
          }}
        />
      </>
    );
  },
};

/**
 * Putting a form inside a modal is rather straight-forward.<br />
 * Keep in mind that the submit loading state is by passing the `submitButtonProps` and `cancelButtonProps` from the `useMelioForm`,
 * and not by the `isLoading` of the modal.
 */
export const WithForm: StoryObj<typeof Modal> = {
  render: ({ isOpen, ...args }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { registerField, formProps, cancelButtonProps, submitButtonProps } = useMelioForm({
      defaultValues: { field1: 'Field 1', field2: 'Field 2', field3: 'Field 3' },
      onSubmit: () => setIsSubmitting(true),
      isSaving: isSubmitting,
    });

    useEffect(() => {
      if (!isSubmitting) {
        return;
      }

      setTimeout(() => {
        setIsSubmitting(false);
        setIsModalOpen(false);
      }, 2000);
    }, [isSubmitting]);

    return (
      <>
        {!isUsingVisualTesting() && (
          <Button onClick={() => setIsModalOpen(true)} label="Open Modal" aria-haspopup="dialog" />
        )}
        <Modal
          {...args}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          primaryButton={{
            label: 'Submit',
            variant: 'primary',
            ...submitButtonProps,
          }}
          secondaryButton={{
            label: 'Close',
            onClick: () => setIsModalOpen(false),
            variant: 'tertiary',
            ...cancelButtonProps,
          }}
        >
          <Form size="small" columns={2} {...formProps}>
            {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
            <Form.TextField
              {...registerField('field1')}
              labelProps={{ label: 'Field 1' }}
              helperTextProps={{ label: 'helper text' }}
              placeholder="Field 1"
            />
            {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
            <Form.TextField
              {...registerField('field2')}
              labelProps={{ label: 'Field 2' }}
              helperTextProps={{ label: 'helper text' }}
              placeholder="Field 2"
            />
            {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
            <Form.TextField
              {...registerField('field3')}
              labelProps={{ label: 'Field 3' }}
              helperTextProps={{ label: 'helper text' }}
              colSpan={2}
            />
          </Form>
        </Modal>
      </>
    );
  },
};

export const WithoutBottomPanel: StoryObj<typeof Modal> = {
  render: ({ isOpen, ...args }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

    return (
      <>
        {!isUsingVisualTesting() && (
          <Button onClick={() => setIsModalOpen(true)} label="Open Modal" aria-haspopup="dialog" />
        )}
        <Modal {...args} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    );
  },
};

export const WithPopover: StoryObj<typeof Modal> = {
  render: ({ isOpen, ...args }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

    return (
      <>
        {!isUsingVisualTesting() && (
          <Button onClick={() => setIsModalOpen(true)} label="Open Modal" aria-haspopup="dialog" />
        )}
        <Modal
          {...args}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          primaryButton={{ label: 'primary', onClick: () => setIsModalOpen(false), variant: 'primary' }}
        >
          <DateField value={createDate('2021-12-12')} />
        </Modal>
      </>
    );
  },
  play: async () => {
    if (!isUsingVisualTesting()) return;

    // Match the close button's test ID across viewports.
    // In mobile (e.g., xs), the close button belongs to a sheet and uses `data-testid="sheet-close-button"`.
    // In larger viewports, it's a modal and uses `data-testid="modal-close-button"`.
    // This regex matches both by targeting the common `-close-button` suffix.
    const closeButton = await screen.findByTestId(/close-button$/);
    await waitFor(async () => expect(closeButton).toHaveFocus());
    await waitFor(async () => userEvent.click(screen.getByTestId('date-field')));
  },
};

export const WithScrollbar: StoryObj<typeof Modal> = {
  render: ({ isOpen, ...args }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

    return (
      <>
        {!isUsingVisualTesting() && (
          <Button onClick={() => setIsModalOpen(true)} label="Open Modal" aria-haspopup="dialog" />
        )}
        <Modal
          {...args}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          primaryButton={{
            label: primaryButton.label,
            onClick: () => setIsModalOpen(false),
            variant: primaryButton.variant,
          }}
          secondaryButton={{
            label: secondaryButton.label,
            onClick: () => setIsModalOpen(false),
            variant: secondaryButton?.variant,
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
        </Modal>
      </>
    );
  },
};

export const Loading: StoryObj<typeof Modal> = {
  render: ({ isOpen, ...args }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

    return (
      <>
        {!isUsingVisualTesting() && (
          <Button onClick={() => setIsModalOpen(true)} label="Open Modal" aria-haspopup="dialog" />
        )}
        <Modal
          {...args}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          primaryButton={{
            label: primaryButton.label,
            onClick: () => setIsModalOpen(false),
            variant: primaryButton.variant,
          }}
          secondaryButton={{
            label: secondaryButton.label,
            onClick: () => setIsModalOpen(false),
            variant: secondaryButton?.variant,
          }}
          isLoading
        />
      </>
    );
  },
};

/**
 * For more advanced header design, you will need to handle it and pass a jsx to `header` prop.<br />
 * See following implementation for header with icon:
 */
export const WithCustomHeader: StoryObj<typeof Modal> = {
  render: ({ isOpen, ...args }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);
    const { isExtraSmallScreen: isMobile } = useBreakpoint();

    return (
      <>
        {!isUsingVisualTesting() && (
          <Button onClick={() => setIsModalOpen(true)} label="Open Modal" aria-haspopup="dialog" />
        )}
        <Modal
          {...args}
          header={
            <Container paddingTop="xxs">
              <Group spacing="s" alignItems="flex-start">
                {!isMobile && (
                  <GroupItem grow={0}>
                    <Container paddingTop="xxs" width="fit-content">
                      <Icon type="installments" />
                    </Container>
                  </GroupItem>
                )}
                <Text as="h2" textStyle="heading2Semi" data-testid="modal-header-text">
                  Modal header
                </Text>
              </Group>
            </Container>
          }
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          primaryButton={{
            label: primaryButton.label,
            onClick: () => setIsModalOpen(false),
            variant: primaryButton.variant,
          }}
          secondaryButton={{
            label: secondaryButton.label,
            onClick: () => setIsModalOpen(false),
            variant: secondaryButton?.variant,
          }}
        />
      </>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

setChromaticViewports([Main, WithoutBottomPanel, WithForm, WithoutBottomPanel, WithScrollbar, Loading], ['xs', 'xl']);
