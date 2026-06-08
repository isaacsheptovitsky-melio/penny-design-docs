import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { NakedButton } from '@/components/action/NakedButton';
import { Icon } from '@/components/foundations/Icon';
import { TextField } from '@/components/selectionAndInputs/TextField';
import {
  fullScreenChromaticDecorator,
  isUsingVisualTesting,
  setChromaticViewports,
} from '@/test-utils/storybook.utils';

import { Drawer } from '../../Drawer';
import { FlatMenu, FlatMenuDropdownList, FlatMenuFooter, FlatMenuHeader, FlatMenuItem, FlatMenuSelectionItem } from '.';

const header = (
  <FlatMenuHeader>
    <Storybook.ContentPlaceholder label="Header (optional)" />
  </FlatMenuHeader>
);
const footer = (
  <FlatMenuFooter>
    <Storybook.ContentPlaceholder label="Footer (optional)" />
  </FlatMenuFooter>
);

/**
 * The **Flat Menu** component is a static menu that opens directly below its trigger element, fully integrated with the surrounding layout.<br />
 * It is ideal for inline dropdowns, comboboxes, and other embedded menu interactions.<br />
 * The component supports **Header**, **Footer**, **DropdownList** and customizable items, such as [FlatMenuItem](/docs/containers-menus-flat-menu-items-item--docs) and [FlatMenuSelectionItem](/docs/containers-menus-flat-menu-items-selection-item--docs).<br />
 * The component is fully accessible, offering seamless keyboard navigation and an optimal experience for screen reader users.
 */

const meta: Meta<typeof FlatMenu> = {
  title: 'Containers/Menus/Flat Menu/Flat Menu [new]',
  component: FlatMenu,
  parameters: { docs: { source: { type: 'code' } }, layout: 'fullscreen' },
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
      table: { type: { summary: '(isOpen: boolean) => void' }, category: 'events' },
    },
    header: {
      control: false,
      description:
        'The header of the menu.<br />This is an optional section.<br />You can use `FlatMenuHeader` component to get the conventional paddings for the header.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    footer: {
      control: false,
      description:
        'The footer of the menu.<br />This is an optional section.<br />You can use `FlatMenuFooter` component to get the conventional paddings for the footer.',
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
    role: {
      control: 'select',
      options: ['menu', 'listbox'],
      description: 'The semantic meaning of the component.',
      table: {
        type: { summary: 'menu | listbox' },
        defaultValue: { summary: 'menu' },
        category: 'accessibility',
      },
    },
    'data-component': {
      control: 'text',
      description: 'Gives a name to the component in HTML dom.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    triggerDropdownGap: {
      control: 'number',
      description: 'Determines the gap between the trigger and the dropdown (in pixels).',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '16' },
        category: 'props',
      },
    },
    shouldTrapFocus: {
      control: 'boolean',
      description: 'If set, the focus will be trapped within the dropdown.',
      table: {
        category: 'props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    getInsideElements: {
      control: false,
      description:
        "Determines which elements are considered inside the floating element when it's rendered. Such elements will avoid being marked with `aria-hidden` and `data-floating-ui-inert` attributes. See [here](https://floating-ui.com/docs/floatingfocusmanager#getinsideelements) for more details.",
      table: { type: { summary: '() => Element[]' }, category: 'props' },
    },
  },
  args: {
    trigger: undefined,
    content: undefined,
    isOpen: false,
    onOpenChange: undefined,
    header: undefined,
    footer: undefined,
    isDisabled: false,
    isReadOnly: false,
    shouldTrapFocus: false,
  },
};
export default meta;

export const Main: StoryObj<typeof FlatMenu> = {
  render: (args) => {
    const [isMenuOpen, setIsMenuOpen] = useState(isUsingVisualTesting());
    const [isDrawerOpen, setIsDrawerOpen] = useState(isUsingVisualTesting());
    const [selectedItem, setSelectedItem] = useState<{ label: string } | null>(null);

    const items = useMemo(
      () => [{ label: 'Buenos Aires' }, { label: 'Chicago' }, { label: 'New-York' }, { label: 'San Diego' }],
      []
    );

    const handleItemClick = (item: { label: string }) => {
      setSelectedItem(item);
      setIsMenuOpen(false);
    };

    const trigger = <Button variant="tertiary" label={`Selected item: ${selectedItem?.label ?? 'no item'}`} />;
    const content = (
      <FlatMenuDropdownList paddingY="xs">
        {items.map((item, index) => (
          <FlatMenuSelectionItem
            key={index}
            onClick={() => handleItemClick(item)}
            isSelected={item.label === selectedItem?.label}
          >
            {item.label}
          </FlatMenuSelectionItem>
        ))}
      </FlatMenuDropdownList>
    );

    return (
      <Storybook.Container padding="s">
        <TextField
          onClick={() => setIsDrawerOpen(true)}
          placeholder="Click to open menu"
          leftElement={
            <Storybook.Container
              display="flex"
              alignItems="center"
              justifyContent="center"
              paddingRight="xs"
              paddingLeft="s"
            >
              <Icon size="small" type="search" color="inherit" aria-hidden />
            </Storybook.Container>
          }
        />
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          body={
            <Storybook.Container position="relative" height="100%">
              <FlatMenu
                {...args}
                isOpen={isMenuOpen}
                onOpenChange={setIsMenuOpen}
                header={header}
                content={content}
                footer={footer}
                trigger={trigger}
              />
            </Storybook.Container>
          }
        />
      </Storybook.Container>
    );
  },
};

export const Disabled: StoryObj<typeof FlatMenu> = {
  render: (props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Storybook.Container height="300px" padding="s">
        <FlatMenu
          {...props}
          trigger={<Button variant="tertiary" label="Click me" />}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          isDisabled
          content={
            <FlatMenuDropdownList paddingY="xs">
              <FlatMenuItem>Item #1</FlatMenuItem>
              <FlatMenuItem>Item #2</FlatMenuItem>
              <FlatMenuItem>Item #3</FlatMenuItem>
              <FlatMenuItem>Item #4</FlatMenuItem>
            </FlatMenuDropdownList>
          }
        />
      </Storybook.Container>
    );
  },
};

export const ReadOnly: StoryObj<typeof FlatMenu> = {
  render: (props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Storybook.Container height="300px" padding="s">
        <FlatMenu
          {...props}
          trigger={<Button variant="tertiary" label="Click me" />}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          isReadOnly
          content={
            <FlatMenuDropdownList paddingY="xs">
              <FlatMenuItem>Item #1</FlatMenuItem>
              <FlatMenuItem>Item #2</FlatMenuItem>
              <FlatMenuItem>Item #3</FlatMenuItem>
              <FlatMenuItem>Item #4</FlatMenuItem>
            </FlatMenuDropdownList>
          }
        />
      </Storybook.Container>
    );
  },
};
export const WithHeader: StoryObj<typeof FlatMenu> = {
  render: (props) => {
    const [isOpen, setIsOpen] = useState(isUsingVisualTesting());

    const trigger = <Button variant="tertiary" label="Click me" />;

    return (
      <Storybook.Container height="300px" padding="s">
        <FlatMenu
          {...props}
          trigger={trigger}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          content={
            <FlatMenuDropdownList paddingY="xs">
              <FlatMenuItem>Item #1</FlatMenuItem>
              <FlatMenuItem>Item #2</FlatMenuItem>
              <FlatMenuItem>Item #3</FlatMenuItem>
              <FlatMenuItem>Item #4</FlatMenuItem>
            </FlatMenuDropdownList>
          }
          header={<FlatMenuHeader>Title</FlatMenuHeader>}
        />
      </Storybook.Container>
    );
  },
};

export const WithFooter: StoryObj<typeof FlatMenu> = {
  render: (props) => {
    const [isOpen, setIsOpen] = useState(isUsingVisualTesting());

    const trigger = <Button variant="tertiary" label="Click me" />;

    return (
      <Storybook.Container height="300px" padding="s">
        <FlatMenu
          {...props}
          trigger={trigger}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          content={
            <FlatMenuDropdownList paddingY="xs">
              <FlatMenuItem>Item #1</FlatMenuItem>
              <FlatMenuItem>Item #2</FlatMenuItem>
              <FlatMenuItem>Item #3</FlatMenuItem>
              <FlatMenuItem>Item #4</FlatMenuItem>
            </FlatMenuDropdownList>
          }
          footer={
            <FlatMenuFooter>
              <NakedButton label="+ Footer action" variant="secondary" />
            </FlatMenuFooter>
          }
        />
      </Storybook.Container>
    );
  },
};

setChromaticViewports([Main], ['xs']);
