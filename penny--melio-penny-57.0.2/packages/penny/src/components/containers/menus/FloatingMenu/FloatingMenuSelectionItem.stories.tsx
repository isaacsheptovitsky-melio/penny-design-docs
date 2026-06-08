import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { Tooltip } from '@/components/dataDisplay/Tooltip';
import { fullScreenChromaticDecorator, isUsingVisualTesting } from '@/test-utils/storybook.utils';

import { FloatingMenu, FloatingMenuDropdownList, FloatingMenuSelectionItem } from '.';
import ItemStory from './FloatingMenuItem.stories';

const meta: Meta<typeof FloatingMenuSelectionItem> = {
  title: 'Containers/Menus/Floating Menu/Items/Selection Item',
  component: FloatingMenuSelectionItem,
  decorators: [fullScreenChromaticDecorator],
  argTypes: {
    ...ItemStory.argTypes,
    isMulti: {
      control: 'boolean',
      description: 'Whether the item is on multi-select mode.',
      table: {
        category: 'props',
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    children: <Storybook.ContentPlaceholder label="Item" />,
    isSelected: false,
    disabled: undefined,
    index: undefined,
    isMulti: false,
  },
};
export default meta;

export const Main: StoryObj<typeof FloatingMenuSelectionItem> = {
  render: (args) => {
    const [isMenuOpen, setIsMenuOpen] = useState(isUsingVisualTesting());

    const content = (
      <FloatingMenuDropdownList paddingY="xs">
        <FloatingMenuSelectionItem key={0} {...args} />
        <FloatingMenuSelectionItem key={1} {...args} />
        <FloatingMenuSelectionItem key={2} {...args} />
        <FloatingMenuSelectionItem key={3} {...args} />
      </FloatingMenuDropdownList>
    );

    return (
      <FloatingMenu
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        content={content}
        trigger={<Button label="Click me" />}
      />
    );
  },
};

export const SingleSelection: StoryObj<typeof FloatingMenuSelectionItem> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(isUsingVisualTesting());
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const items = [
      { label: 'Item 1', disabled: true },
      { label: 'Item 2', tooltipProps: { content: 'Tooltip content' } },
      { label: 'Item 3' },
      { label: 'Item 4', disabled: true, tooltipProps: { content: 'Tooltip content' } },
    ];

    return (
      <FloatingMenu
        trigger={<Button label="Click me" />}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        content={
          <FloatingMenuDropdownList paddingY="xs">
            {items.map((item, index) => (
              <Tooltip key={index} content={item.tooltipProps?.content} isEnabled={!!item.tooltipProps?.content}>
                <FloatingMenuSelectionItem
                  isSelected={selectedIndex === index}
                  onClick={() => {
                    setSelectedIndex(index);
                    setIsOpen(false);
                  }}
                  disabled={item.disabled}
                >
                  {item.label}
                </FloatingMenuSelectionItem>
              </Tooltip>
            ))}
          </FloatingMenuDropdownList>
        }
      />
    );
  },
};

export const MultiSelection: StoryObj<typeof FloatingMenuSelectionItem> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(isUsingVisualTesting());
    const [multiSelectedItems, setMultiSelectedItems] = useState<Record<number, boolean>>({});

    const items = [
      { label: 'Item 1', disabled: true },
      { label: 'Item 2', tooltipProps: { content: 'Tooltip content' } },
      { label: 'Item 3' },
      { label: 'Item 4', disabled: true, tooltipProps: { content: 'Tooltip content' } },
    ];

    const handleMultiSelectionItemClick = (index: number) => {
      setMultiSelectedItems((prev) => {
        prev[index] = !prev[index];

        return { ...prev };
      });
    };

    return (
      <FloatingMenu
        trigger={<Button label="Click me" />}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        content={
          <FloatingMenuDropdownList paddingY="xs">
            {items.map((item, index) => (
              <Tooltip key={index} content={item.tooltipProps?.content} isEnabled={!!item.tooltipProps?.content}>
                <FloatingMenuSelectionItem
                  onClick={() => handleMultiSelectionItemClick(index)}
                  isSelected={multiSelectedItems[index]}
                  isMulti
                  disabled={item.disabled}
                >
                  {item.label}
                </FloatingMenuSelectionItem>
              </Tooltip>
            ))}
          </FloatingMenuDropdownList>
        }
      />
    );
  },
};
