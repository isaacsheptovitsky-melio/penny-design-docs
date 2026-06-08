import { noop, useBoolean } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import {
  fullScreenChromaticDecorator,
  getUnionTypeSummary,
  isUsingVisualTesting,
  setChromaticViewports,
} from '@/test-utils/storybook.utils';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import { BaseModal, BaseModalBody, BaseModalFooter, BaseModalHeader } from '.';
import { BASE_MODAL_DEFAULT_DATA_TEST_ID } from './BaseModal.utils';

const sizes = ['small', 'medium', 'large'];

const children = (
  <>
    <BaseModalHeader>
      <Storybook.ContentPlaceholder flexShrink={1} label="Header" />
    </BaseModalHeader>
    <BaseModalBody>
      <Storybook.ContentPlaceholder label="Body" height="300px" />
    </BaseModalBody>
    <BaseModalFooter>
      <Storybook.ContentPlaceholder label="Footer" />
    </BaseModalFooter>
  </>
);

/**
 * The modal is a dialog window that overlays the main content of a page.
 *
 * Basically to render a modal you'll trigger it by using a button. <br />
 * For better accessibility it's required to use `aria-haspopup="dialog"` on the trigger button to associate the button with the modal dialog (related to [MDN's accessibility guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup)).
 */
const meta: Meta<typeof BaseModal> = {
  title: 'Containers/Modals/Base Modal',
  component: BaseModal,
  decorators: [fullScreenChromaticDecorator],
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
  argTypes: {
    children: {
      control: false,
      description: 'The content of the modal.',
      table: {
        category: 'props',
        type: { summary: 'ReactNode' },
      },
    },
    size: {
      control: 'select',
      options: sizes,
      description: 'The size of the modal.',
      table: { defaultValue: { summary: 'small' }, type: { summary: getUnionTypeSummary(sizes) }, category: 'props' },
    },
    isOpen: {
      description: 'If true, the modal will be open.',
      control: 'boolean',
      type: { name: 'boolean', required: true },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    isLoading: {
      description: 'Determines if the modal is loading.',
      control: 'boolean',
      type: { name: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
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
        'Callback to call when the base modal is close by typing Esc, Note: onEsc is called first and onClose after',
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
        'Callback to call when the base modal is close by clicking on overlay, Note: onOverlayClick is called first and onClose after',
      table: {
        type: { summary: 'voidFunction' },
        category: 'events',
      },
    },
    shouldReturnFocus: {
      control: 'boolean',
      description:
        'Determines if focus should be returned to the reference element (or if that is not available, the previously focused element).',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' }, category: 'props' },
    },
    closeButtonAriaLabel: {
      control: 'text',
      description: "The aria-label of the modal's close button.",
      table: { type: { summary: 'string' }, category: 'accessibility' },
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
    role: {
      description: 'The semantic meaning of the modal.',
      control: 'text',
      table: {
        defaultValue: { summary: 'dialog' },
        type: { summary: 'string' },
        category: 'accessibility',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: `'${BASE_MODAL_DEFAULT_DATA_TEST_ID}'` },
        type: { summary: 'string' },
        category: 'props',
      },
    },
  },
  args: {
    isOpen: isUsingVisualTesting(),
    onClose: noop,
    size: 'small',
    isLoading: false,
    children,
    'aria-label': undefined,
    closeButtonAriaLabel: undefined,
    'aria-modal': true,
    role: 'dialog',
    shouldReturnFocus: true,
    'data-testid': BASE_MODAL_DEFAULT_DATA_TEST_ID,
  },
};
export default meta;

export const Main: StoryObj<typeof BaseModal> = {
  render: ({ isOpen, ...args }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);
    const { isExtraSmallScreen: isMobile } = useBreakpoint();

    return (
      <>
        {!isUsingVisualTesting() && (
          <Button onClick={() => setIsModalOpen(true)} label="Open Modal" aria-haspopup="dialog" />
        )}
        <BaseModal {...args} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <BaseModalHeader>
            <Storybook.ContentPlaceholder height={isMobile ? '32px' : 'undefiend'} flexShrink={1} label="Header" />
          </BaseModalHeader>
          <BaseModalBody>
            <Storybook.ContentPlaceholder label="Body" height="300px" />
          </BaseModalBody>
          <BaseModalFooter>
            <Storybook.ContentPlaceholder label="Footer" />
          </BaseModalFooter>
        </BaseModal>
      </>
    );
  },
};

export const WithoutFooterContent: StoryObj<typeof BaseModal> = {
  render: ({ isOpen, ...args }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);
    const { isExtraSmallScreen: isMobile } = useBreakpoint();

    return (
      <>
        {!isUsingVisualTesting() && (
          <Button onClick={() => setIsModalOpen(true)} label="Open Modal" aria-haspopup="dialog" />
        )}
        <BaseModal {...args} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <BaseModalHeader>
            <Storybook.ContentPlaceholder height={isMobile ? '32px' : 'undefiend'} flexShrink={1} label="Header" />
          </BaseModalHeader>
          <BaseModalBody>
            <Storybook.ContentPlaceholder label="Body" height="300px" />
          </BaseModalBody>
          <BaseModalFooter />
        </BaseModal>
      </>
    );
  },
};

export const Sizes: StoryObj<typeof BaseModal> = {
  render: (args) => {
    const [isSmallModalOpen, modalSmallOpen] = useBoolean(false);
    const [isMediumModalOpen, modalMediumlOpen] = useBoolean(false);
    const [isLargeModalOpen, modalsLargeOpen] = useBoolean(false);

    return (
      <Storybook.Container padding="s" display="inline-flex" flexDirection="column" gap="xs">
        {!isUsingVisualTesting() && (
          <Button onClick={modalSmallOpen.on} label="Open Small Modal" aria-haspopup="dialog" />
        )}

        <BaseModal {...args} isOpen={isSmallModalOpen} onClose={modalSmallOpen.off} size="small" />

        {!isUsingVisualTesting() && (
          <Button onClick={modalMediumlOpen.on} label="Open Medium Modal" aria-haspopup="dialog" />
        )}

        <BaseModal {...args} isOpen={isMediumModalOpen} onClose={modalMediumlOpen.off} size="medium" />

        {!isUsingVisualTesting() && (
          <Button onClick={modalsLargeOpen.on} label="Open Large Modal" aria-haspopup="dialog" />
        )}

        <BaseModal {...args} isOpen={isLargeModalOpen} onClose={modalsLargeOpen.off} size="large" />
      </Storybook.Container>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Loading: StoryObj<typeof BaseModal> = {
  render: ({ isOpen, ...args }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);
    const { isExtraSmallScreen: isMobile } = useBreakpoint();

    return (
      <>
        {!isUsingVisualTesting() && (
          <Button onClick={() => setIsModalOpen(true)} label="Open Modal" aria-haspopup="dialog" />
        )}
        <BaseModal {...args} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isLoading>
          <BaseModalHeader>
            <Storybook.ContentPlaceholder height={isMobile ? '32px' : 'undefiend'} flexShrink={1} label="Header" />
          </BaseModalHeader>
          <BaseModalBody>
            <Storybook.ContentPlaceholder label="Body" />
          </BaseModalBody>
          <BaseModalFooter>
            <Storybook.ContentPlaceholder label="Footer" />
          </BaseModalFooter>
        </BaseModal>
      </>
    );
  },
};

export const LongBody: StoryObj<typeof BaseModal> = {
  render: ({ isOpen, ...args }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);
    const { isExtraSmallScreen: isMobile } = useBreakpoint();

    return (
      <>
        {!isUsingVisualTesting() && (
          <Button onClick={() => setIsModalOpen(true)} label="Open Modal" aria-haspopup="dialog" />
        )}
        <BaseModal {...args} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <BaseModalHeader>
            <Storybook.ContentPlaceholder height={isMobile ? '32px' : 'undefiend'} flexShrink={1} label="Header" />
          </BaseModalHeader>
          <BaseModalBody>
            <Storybook.ContentPlaceholder label="Body" height="1300px" />
          </BaseModalBody>
          <BaseModalFooter>
            <Storybook.ContentPlaceholder label="Footer" />
          </BaseModalFooter>
        </BaseModal>
      </>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const LongBodyWithoutFooterContent: StoryObj<typeof BaseModal> = {
  render: ({ isOpen, ...args }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);
    const { isExtraSmallScreen: isMobile } = useBreakpoint();

    return (
      <>
        {!isUsingVisualTesting() && (
          <Button onClick={() => setIsModalOpen(true)} label="Open Modal" aria-haspopup="dialog" />
        )}
        <BaseModal {...args} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <BaseModalHeader>
            <Storybook.ContentPlaceholder height={isMobile ? '32px' : 'undefiend'} flexShrink={1} label="Header" />
          </BaseModalHeader>
          <BaseModalBody>
            <Storybook.ContentPlaceholder label="Body" height="1300px" />
          </BaseModalBody>
          <BaseModalFooter />
        </BaseModal>
      </>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * In case you want to change the focused element when the modal is closed - use the `shouldReturnFocus` prop to disable the default behavior (focusing the element that triggered the opening of the modal).
 */
export const FocusSpecificElementOnClose: StoryObj<typeof BaseModal> = {
  render: ({ isOpen, ...args }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

    return (
      <>
        <Button onClick={() => setIsModalOpen(true)} label="Open Modal" aria-haspopup="dialog" />
        <BaseModal {...args} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <BaseModalHeader>
            <Storybook.ContentPlaceholder flexShrink={1} label="Header" />
          </BaseModalHeader>
          <BaseModalBody>
            <Storybook.ContentPlaceholder label="Body" height="1300px" />
          </BaseModalBody>
          <BaseModalFooter />
        </BaseModal>
      </>
    );
  },
  args: {
    ...Main.args,
    shouldReturnFocus: false,
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

setChromaticViewports([Main, Loading, WithoutFooterContent], ['xs', 'xl']);
