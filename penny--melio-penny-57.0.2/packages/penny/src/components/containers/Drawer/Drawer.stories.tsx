import { useBoolean } from '@melio/penny-utils';
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

import { LoadingContainer } from '../LoadingContainer';
import { ActionsDropdownMenu } from '../menus';
import { Modal } from '../modals/Modal';
import { Drawer } from './Drawer';

/**
 * The drawer is a dialog window that overlays the main content of a page.
 *
 * 🚨 Important to note that when using a nested modal or sheet it **must be a child** of the drawer. See the [`WithModal`](/docs/containers-drawer--docs#with-modal) story for an example.
 *
 * Basically to render a drawer you'll trigger it by using a button. <br />
 * For better accessibility it's required to use `aria-haspopup="dialog"` on the trigger button to associate the button with the drawer dialog (related to [MDN's accessibility guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup)).
 */
const meta: Meta<typeof Drawer> = {
  title: 'Containers/Drawer',
  component: Drawer,
  decorators: [fullScreenChromaticDecorator],
  parameters: {
    docs: { source: { type: 'code' } },
    // Sets a delay for the component's stories.
    chromatic: { delay: 300 },
  },
  argTypes: {
    header: {
      control: false,
      description: "The content of the drawer's header.",
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    headerProps: {
      control: false,
      description: "The header override props (useful for setting additional props to the drawer's header).",
      type: { name: 'string' },
      table: {
        category: 'props',
        type: { summary: 'BoxProps' },
      },
    },
    body: {
      control: false,
      description: "The content of the drawer's body.",
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    footer: {
      control: false,
      description: "The content of the drawer's footer.",
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    footerProps: {
      control: false,
      description: "The footer override props (useful for setting additional props to the drawer's footer).",
      type: { name: 'string' },
      table: {
        category: 'props',
        type: { summary: 'BoxProps' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'drawer' }, type: { summary: 'string' }, category: 'tests' },
    },
    closeButtonAriaLabel: {
      control: 'text',
      description: "The `aria-label` of the drawer's close button.",
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    isLoading: {
      control: 'boolean',
      description: 'Determines whether the drawer is in a loading state.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isOpen: {
      control: 'boolean',
      description: 'Determines whether the drawer is open.',
      type: { required: true, value: 'boolean', name: 'other' },
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    onClose: {
      control: false,
      description: "A callback that is fired when clicking the drawer's backdrop or the close button.",
      type: { required: true, value: 'function', name: 'other' },
      table: { type: { summary: 'VoidFunction' }, category: 'events' },
    },
    onCloseComplete: {
      control: false,
      description: 'Fires when the drawer has completed animating out.',
      table: { type: { summary: 'VoidFunction' }, category: 'events' },
    },
    onEsc: {
      control: false,
      action: 'closed',
      type: { name: 'function' },
      description:
        'Callback to call when the drawer is close by typing Esc. Note: onEsc is called first and onClose after',
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
        'Callback to call when the drawer is close by clicking on overlay. Note: onOverlayClick is called first and onClose after',
      table: {
        type: { summary: 'voidFunction' },
        category: 'events',
      },
    },
    closeButtonAriaLabelledBy: {
      control: 'text',
      description:
        'A space-separated list of element IDs whose associated labels should be read when the button is focused.<br /> This is used to provide a descriptive label while also indicating the loading state.',
      table: {
        category: 'accessibility',
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
      description: "Determines the drawer's width",
      table: {
        category: 'props',
        defaultValue: { summary: 'm' },
        type: {
          summary: `${getUnionTypeSummary(['s', 'm', 'l'])} | number (custom) | ResponsiveValueType<string> (custom)`,
          detail: `ResponsiveValueType<string> = Record<ThemeBreakpointsKey, string>`,
        },
      },
    },
    shouldReturnFocus: {
      control: 'boolean',
      description:
        'Determines if focus should be returned to the reference element (or if that is not available, the previously focused element). [more info...](https://floating-ui.com/docs/floatingfocusmanager#returnfocus)',
      type: { required: false, value: 'boolean', name: 'other' },
      table: { defaultValue: { summary: 'true' }, type: { summary: 'boolean' }, category: 'props' },
    },
    shouldRestoreFocus: {
      control: 'boolean',
      description:
        'Determines if focus should be restored to the nearest tabbable element if the currently focused element inside the floating element was removed from the DOM. [more info...](https://floating-ui.com/docs/FloatingFocusManager#restorefocus)',
      type: { required: false, value: 'boolean', name: 'other' },
      table: { defaultValue: { summary: 'true' }, type: { summary: 'boolean' }, category: 'props' },
    },
    'aria-modal': {
      control: 'boolean',
      description:
        'The aria-modal attribute indicates whether an element is modal when displayed. ' +
        'Set as `false` when having a tooltip inside the drawer, otherwise SR might not announce the tooltip content',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' }, category: 'accessibility' },
    },
    'aria-labelledby': {
      control: 'text',
      description: 'The `id` of the element that serves as the label for the drawer.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
  },
  args: {
    isOpen: isUsingVisualTesting(),
    header: <Storybook.ContentPlaceholder />,
    headerProps: undefined,
    body: <Storybook.ContentPlaceholder height="full" />,
    footer: <Storybook.ContentPlaceholder />,
    footerProps: undefined,
    isLoading: false,
    'aria-modal': true,
    shouldReturnFocus: true,
    shouldRestoreFocus: true,
    size: 'm',
    'data-testid': 'drawer',
  },
};
export default meta;

export const Main: StoryObj<typeof Drawer> = {
  render: ({ isOpen, ...args }) => {
    const [isDrawerOpen, drawerOpen] = useBoolean(isOpen);

    return (
      <>
        {!isUsingVisualTesting() && <Button onClick={drawerOpen.on} label="Open Drawer" aria-haspopup="dialog" />}

        <Drawer {...args} isOpen={isDrawerOpen} onClose={drawerOpen.off} />
      </>
    );
  },
};

/**
 * The width of the `Drawer` component is determined using the `size` prop.
 * The `size` prop supports both predefined sizes and custom values.
 *
 * Predefined sizes: s, m, l:
 *
 * | Size | Extra Small Screen (0-599px) | Small Screen (600px-904px) | Medium Screen (905px-1239px) | Large Screen (1240px-1439px) |
 * | --- | --- | --- | --- | --- |
 * | **s** | 100vw | 320px | 480px | 480px |
 * | **m** | 100vw | 708px | 708px | 708px |
 * | **l** | 100vw | 812px | 1000px | 1216px |
 *
 * The drawer's width adjusts responsively based on the screen size, ensuring an optimal
 * user experience across devices.
 */

export const Sizes: StoryObj<typeof Drawer> = {
  render: (args) => {
    const [isSmallDrawerOpen, drawerSmallOpen] = useBoolean(false);
    const [isMediumDrawerOpen, drawerMediumlOpen] = useBoolean(false);
    const [isLargeDrawerOpen, drawersLargeOpen] = useBoolean(false);

    return (
      <Storybook.Container padding="s" display="inline-flex" flexDirection="column" gap="xs">
        {!isUsingVisualTesting() && (
          <Button onClick={drawerSmallOpen.on} label="Open Small Drawer" aria-haspopup="dialog" />
        )}

        <Drawer {...args} isOpen={isSmallDrawerOpen} onClose={drawerSmallOpen.off} size="s" />

        {!isUsingVisualTesting() && (
          <Button onClick={drawerMediumlOpen.on} label="Open Medium Drawer" aria-haspopup="dialog" />
        )}

        <Drawer {...args} isOpen={isMediumDrawerOpen} onClose={drawerMediumlOpen.off} size="m" />

        {!isUsingVisualTesting() && (
          <Button onClick={drawersLargeOpen.on} label="Open Large Drawer" aria-haspopup="dialog" />
        )}

        <Drawer {...args} isOpen={isLargeDrawerOpen} onClose={drawersLargeOpen.off} size="l" />
      </Storybook.Container>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 *
 * - numeric values (e.g., 100) are treated as pixel values (100px)
 * - Responsive sizes: an object with breakpoints and corresponding values (e.g., { xs: '100vw', m: '50px' })
 *
 * This allows the component to adapt to both fixed and responsive layouts across different screen sizes.
 */
export const CustomSize: StoryObj<typeof Drawer> = {
  render: (args) => {
    const [isCustomSizeDrawerOpen, drawerCustomSizeOpen] = useBoolean(isUsingVisualTesting());
    const [isCustomResponsiveSizeDrawerOpen, drawerCustomResponsiveSizeOpen] = useBoolean(isUsingVisualTesting());

    return (
      <Storybook.Container padding="s" display="inline-flex" flexDirection="column" gap="xs">
        {!isUsingVisualTesting() && (
          <Button onClick={drawerCustomSizeOpen.on} label="Open Drawer size (270)" aria-haspopup="dialog" />
        )}

        <Drawer {...args} isOpen={isCustomSizeDrawerOpen} onClose={drawerCustomSizeOpen.off} size={270} />

        {!isUsingVisualTesting() && (
          <Button
            onClick={drawerCustomResponsiveSizeOpen.on}
            label="Open Drawer (responsive size)"
            aria-haspopup="dialog"
          />
        )}

        <Drawer
          {...args}
          isOpen={isCustomResponsiveSizeDrawerOpen}
          onClose={drawerCustomResponsiveSizeOpen.off}
          size={{ s: '100px', m: '400px', l: '1003px' }}
        />
      </Storybook.Container>
    );
  },
};

/**
 * The drawer can enter a loading state, during which a loading spinner appears in the drawer's body.<br />
 * The close button on the drawer is associated with the loading container, providing a descriptive label and indicating the loading state. <br />
 * To associate the close button with other elements, use the `closeButtonAriaLabelledBy` prop.
 */
export const Loading: StoryObj<typeof Drawer> = {
  render: ({ isOpen, ...args }) => {
    const [isDrawerOpen, drawerOpen] = useBoolean(isOpen);

    return (
      <>
        {!isUsingVisualTesting() && <Button onClick={drawerOpen.on} label="Open Drawer" aria-haspopup="dialog" />}

        <Drawer {...args} isOpen={isDrawerOpen} onClose={drawerOpen.off} isLoading />
      </>
    );
  },
};
/**
 * Here's an example of how to associate the drawer's close button with other elements.
 */
export const AssociateWithDrawerBodyElements: StoryObj<typeof Drawer> = {
  render: ({ isOpen, ...args }) => {
    const [isDrawerOpen, drawerOpen] = useBoolean(isOpen);
    const [isLoading, setIsLoading] = useState(false);

    const onClick = () => {
      drawerOpen.on();
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    };

    return (
      <>
        {!isUsingVisualTesting() && <Button onClick={onClick} label="Open Drawer" aria-haspopup="dialog" />}

        <Drawer
          {...args}
          isOpen={isDrawerOpen}
          onClose={drawerOpen.off}
          closeButtonAriaLabelledBy="loading-container"
          body={
            <LoadingContainer isLoading={isLoading} id="loading-container">
              <Storybook.ContentPlaceholder label="Drawer content" height="200px" />
            </LoadingContainer>
          }
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

setChromaticViewports([Main], ['xs', 'xl']);

export const WithModal: StoryObj<typeof Drawer> = {
  render: (args) => {
    const [isDrawerOpen, drawerOpen] = useBoolean(false);
    const [isModalOpen, modalOpen] = useBoolean(false);
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
      <>
        <Button onClick={drawerOpen.on} label="Open Drawer" aria-haspopup="dialog" />

        <Drawer
          {...args}
          isOpen={isDrawerOpen}
          onClose={drawerOpen.off}
          footer={
            <>
              <ActionsDropdownMenu
                isOpen={isMenuOpen}
                onOpenChange={setMenuOpen}
                items={[{ label: 'Open Modal', onClick: modalOpen.on }]}
                label="More Options"
              />
              <Modal header="header" isOpen={isModalOpen} onClose={modalOpen.off}>
                <Storybook.ContentPlaceholder height="200px" />
              </Modal>
            </>
          }
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
