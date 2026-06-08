import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { fullScreenChromaticDecorator, isUsingVisualTesting } from '@/test-utils/storybook.utils';

import { BottomSheetMenu, BottomSheetMenuDropdownList, BottomSheetMenuFooter } from '.';

/**
 * The **Bottom Sheet Menu** component is an overlay menu that slides up from the bottom of the screen, making it ideal for mobile and compact layouts.<br />
 * The component supports **DropdownList**, **Footer**, and customizable items, such as [`BottomSheetMenuItem`](/docs/containers-bottom-sheet-menu-item--docs) and [`BottomSheetMenuSelectionItem`](/docs/containers-bottom-sheet-menu-selection-item--docs).<br />
 * The component is fully accessible, offering seamless keyboard navigation and an optimal experience for screen reader users.
 */
const meta: Meta<typeof BottomSheetMenu> = {
  title: 'Containers/Menus/Bottom Sheet Menu/Bottom Sheet Menu [new]',
  component: BottomSheetMenu,
  parameters: { docs: { source: { type: 'code' } } },
  decorators: [fullScreenChromaticDecorator],
  argTypes: {
    trigger: {
      control: false,
      description: 'The trigger element that opens and closes the menu.',
      type: { name: 'other', value: 'ReactNode', required: true },
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    content: {
      control: false,
      description: 'The content of the menu.',
      type: { name: 'other', value: 'ReactNode', required: true },
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    isOpen: {
      control: false,
      type: { name: 'other', value: 'boolean', required: true },
      description: 'Determines if the menu is open.',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    onOpenChange: {
      control: false,
      description: "A function that toggles the menu's `isOpen` state.",
      type: { name: 'other', value: 'boolean', required: true },
      table: { type: { summary: '(isOpen: boolean) => void' }, category: 'events' },
    },
    title: {
      control: false,
      description: 'The title of the menu.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    footer: {
      control: false,
      description: 'The footer of the menu.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Determines if the menu is disabled.<br /> Will also disable the trigger.',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Determines if the trigger is read-only.',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    hasItems: {
      control: 'boolean',
      description:
        'A property that marks that the menu has items inside.<br />This is important since it will allow the menu to act accordingly, like structuring the HTML in an accessible manner.<br /><br />Setting this prop to `false` will also remove the `role` attribute from the dropdown to allow screen-readers announce the dropdown content correctly.',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    focusItemOnOpen: {
      control: 'boolean',
      description: 'If set to true, focuses the first item in the list when the menu is opened.',
      table: { type: { summary: 'boolean' }, category: 'props', defaultValue: { summary: 'false' } },
    },
    'data-component': {
      control: 'text',
      description: 'Gives a name to the component in HTML dom.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'bottom-sheet-menu' }, type: { summary: 'string' }, category: 'tests' },
    },
    closeButtonAriaLabel: {
      control: 'text',
      description: 'The aria-label for the close button.',
      table: { type: { summary: 'string' }, category: 'accessibility', defaultValue: { summary: 'Close dialog' } },
    },
  },
  args: {
    trigger: undefined,
    content: undefined,
    isOpen: false,
    onOpenChange: undefined,
    title: undefined,
    footer: undefined,
    isDisabled: false,
    isReadOnly: false,
    hasItems: undefined,
    focusItemOnOpen: undefined,
    'data-testid': 'bottom-sheet-menu',
    closeButtonAriaLabel: undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof BottomSheetMenu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isUsingVisualTesting());

    const trigger = <Button label="Click me" />;

    const content = (
      <BottomSheetMenuDropdownList paddingY="xs">
        <Storybook.ContentPlaceholder label="Body" height="175px" borderRadius="global.none" />
      </BottomSheetMenuDropdownList>
    );

    const footer = (
      <BottomSheetMenuFooter>
        <Storybook.ContentPlaceholder label="Footer (optional)" />
      </BottomSheetMenuFooter>
    );

    return (
      <BottomSheetMenu
        {...args}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Title"
        content={content}
        footer={footer}
        hasItems={false}
        trigger={trigger}
      />
    );
  },
};

export const WithScroll: StoryObj<typeof BottomSheetMenu> = {
  render: (props) => {
    const [isOpen, setIsOpen] = useState(isUsingVisualTesting());

    const trigger = <Button label="Click me" />;

    const content = (
      <BottomSheetMenuDropdownList paddingY="xs">
        <Storybook.ContentPlaceholder label="Body" borderRadius="global.none" height="2000px" />
      </BottomSheetMenuDropdownList>
    );

    const footer = (
      <BottomSheetMenuFooter>
        <Storybook.ContentPlaceholder label="Footer (optional)" />
      </BottomSheetMenuFooter>
    );

    return (
      <BottomSheetMenu
        {...props}
        trigger={trigger}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Title"
        content={content}
        footer={footer}
        hasItems={false}
      />
    );
  },
};

export const Disabled: StoryObj<typeof BottomSheetMenu> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(isUsingVisualTesting());

    const trigger = <Button label="Click me" />;

    const content = (
      <BottomSheetMenuDropdownList paddingY="xs">
        <Storybook.ContentPlaceholder label="item" borderRadius="global.none" height="2000px" />
        <Storybook.ContentPlaceholder label="item" borderRadius="global.none" height="2000px" />
        <Storybook.ContentPlaceholder label="item" borderRadius="global.none" height="2000px" />
      </BottomSheetMenuDropdownList>
    );

    return (
      <BottomSheetMenu
        trigger={trigger}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Title"
        content={content}
        isDisabled
      />
    );
  },
};

export const ReadOnly: StoryObj<typeof BottomSheetMenu> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(isUsingVisualTesting());

    const trigger = <Button label="Click me" />;

    const content = (
      <BottomSheetMenuDropdownList paddingY="xs">
        <Storybook.ContentPlaceholder label="Body" borderRadius="global.none" height="2000px" />
      </BottomSheetMenuDropdownList>
    );

    return (
      <BottomSheetMenu
        trigger={trigger}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Title"
        content={content}
        isReadOnly
      />
    );
  },
};
