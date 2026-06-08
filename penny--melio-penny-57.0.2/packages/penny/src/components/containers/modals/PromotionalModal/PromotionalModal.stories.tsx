import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '@/components/action/Button';
import { Image } from '@/components/media/Image';
import { Video } from '@/components/media/Video';
import { fullScreenChromaticDecorator, getUnionTypeSummary, isUsingVisualTesting } from '@/test-utils/storybook.utils';
import { useBreakpointValue } from '@/theme/hooks/useBreakpointValue';

import { Group, type GroupProps } from '../../Group';
import { PromotionalModal, type PromotionalModalProps } from '.';

const modalButtonProps = `{
  label: string;
  onClick?: VoidFunction;
  isDisabled?: boolean;
  isLoading?: boolean;
  // For accessibility, it is important to add a fallback loading text. This text will be visible only to screen readers.
  loadingText?: string;
} & AriaAttributes`;

const aspectRatios = ['1 / 1', '16 / 9', '4 / 3', '7 / 3'];

/**
 * The modal is a dialog window that overlays the main content of a page.
 *
 * Basically to render a modal you'll trigger it by using a button. <br />
 * For better accessibility it's required to use `aria-haspopup="dialog"` on the trigger button to associate the button with the modal dialog (related to [MDN's accessibility guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup)).
 */
const meta: Meta<typeof PromotionalModal> = {
  title: 'Containers/Modals/Promotional Modal  [pattern]',
  component: PromotionalModal,
  decorators: [fullScreenChromaticDecorator],
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300, viewports: [390, 1200] },
  },
  argTypes: {
    asset: {
      control: false,
      description: 'The asset of the promotional modal - supports img / video / iframe tags',
      type: { name: 'string', required: true },
      table: {
        category: 'props',
        type: { summary: 'ReactNode' },
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
        'Callback to call when the promotional modal is close by typing Esc. Note: onEsc is called first and onClose after',
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
        'Callback to call when the promotional modal is close by clicking on overlay. Note: onOverlayClick is called first and onClose after',
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
    assetAspectRatio: {
      control: 'select',
      description: "Property allows you to define the desired width-to-height ratio of an element's box.",
      options: aspectRatios,
      table: {
        type: {
          summary: getUnionTypeSummary(aspectRatios),
        },
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
      table: { defaultValue: { summary: 'promotional-modal' }, type: { summary: 'string' }, category: 'props' },
    },
  },
  args: {
    isOpen: isUsingVisualTesting(),
    asset: (
      <Image
        src="//www.html.am/images/samples/remarkables_queenstown_new_zealand-300x225.jpg"
        alt="asset"
        width="100%"
      />
    ),
    header: 'Modal header',
    headerProps: undefined,
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene',
    primaryButton: undefined,
    secondaryButton: undefined,
    isLoading: false,
    shouldReturnFocus: true,
    'aria-label': undefined,
    closeButtonAriaLabel: undefined,
    'aria-modal': true,
    assetAspectRatio: '7 / 3',
    'data-testid': 'promotional-modal',
  },
};
export default meta;

const primaryButton: PromotionalModalProps['primaryButton'] = { label: 'primary', variant: 'primary' };
const secondaryButton: PromotionalModalProps['secondaryButton'] = { label: 'tertiary', variant: 'tertiary' };

export const Main: StoryObj<typeof PromotionalModal> = {
  render: ({ isOpen, ...args }) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);

    return (
      <>
        {!isUsingVisualTesting() && (
          <Button onClick={() => setIsModalOpen(true)} label="Open Modal" aria-haspopup="dialog" />
        )}
        <PromotionalModal
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

export const Assets: StoryObj<typeof PromotionalModal> = {
  render: ({ isOpen, ...args }) => {
    const [isModalOpen, setIsModalOpen] = useState<number>(0);
    const triggersVariant = useBreakpointValue<GroupProps['variant']>({
      xs: 'vertical',
      s: 'horizontal',
    });

    return (
      <>
        <Group spacing="s" variant={triggersVariant}>
          {!isUsingVisualTesting() && (
            <Button onClick={() => setIsModalOpen(1)} label="Open Modal With Iframe" aria-haspopup="dialog" />
          )}
          {!isUsingVisualTesting() && (
            <Button onClick={() => setIsModalOpen(2)} label="Open Modal Video" aria-haspopup="dialog" />
          )}
        </Group>
        <PromotionalModal
          {...args}
          isOpen={isModalOpen === 1}
          onClose={() => setIsModalOpen(0)}
          assetAspectRatio="16 / 9"
          asset={
            <iframe
              allow="fullscreen"
              height="100%"
              width="100%"
              src="https://giphy.com/embed/zDv0UrEsTETSe6Mnms/video"
            />
          }
          primaryButton={{
            ...primaryButton,
            onClick: () => setIsModalOpen(0),
          }}
          secondaryButton={{
            ...secondaryButton,
            onClick: () => setIsModalOpen(0),
          }}
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          footer={undefined}
        />
        <PromotionalModal
          {...args}
          isOpen={isModalOpen === 2}
          onClose={() => setIsModalOpen(0)}
          assetAspectRatio="16 / 9"
          asset={
            <Video
              width="100%"
              height="100%"
              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              hideControls
              autoPlay
            />
          }
          primaryButton={{
            ...primaryButton,
            onClick: () => setIsModalOpen(0),
          }}
          secondaryButton={{
            ...secondaryButton,
            onClick: () => setIsModalOpen(0),
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

export const WithScrollbar: StoryObj<typeof PromotionalModal> = {
  render: ({ isOpen, primaryButton, ...args }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

    return (
      <>
        {!isUsingVisualTesting() && (
          <Button onClick={() => setIsModalOpen(true)} label="Open Modal" aria-haspopup="dialog" />
        )}
        <PromotionalModal
          {...args}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          assetAspectRatio="16 / 9"
          primaryButton={{
            label: 'primary',
            variant: 'primary',
            onClick: () => setIsModalOpen(false),
          }}
          secondaryButton={secondaryButton}
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
        </PromotionalModal>
      </>
    );
  },
};
