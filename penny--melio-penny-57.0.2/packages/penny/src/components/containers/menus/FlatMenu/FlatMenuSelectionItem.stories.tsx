import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { Tooltip } from '@/components/dataDisplay/Tooltip';
import { fullScreenChromaticDecorator, isUsingVisualTesting } from '@/test-utils/storybook.utils';

import { FlatMenu, FlatMenuDropdownList, FlatMenuSelectionItem } from '.';
import ItemStory from './FlatMenuItem.stories';

const meta: Meta<typeof FlatMenuSelectionItem> = {
  title: 'Containers/Menus/Flat Menu/Items/Selection Item',
  component: FlatMenuSelectionItem,
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

export const Main: StoryObj<typeof FlatMenuSelectionItem> = {
  render: (args) => {
    const [isMenuOpen, setIsMenuOpen] = useState(isUsingVisualTesting());

    const content = (
      <FlatMenuDropdownList paddingY="xs">
        <FlatMenuSelectionItem key={0} {...args} />
        <FlatMenuSelectionItem key={1} {...args} />
        <FlatMenuSelectionItem key={2} {...args} />
        <FlatMenuSelectionItem key={3} {...args} />
      </FlatMenuDropdownList>
    );

    return (
      <Storybook.Container height="300px">
        <FlatMenu
          isOpen={isMenuOpen}
          onOpenChange={setIsMenuOpen}
          content={content}
          trigger={<Button label="Click me" />}
        />
      </Storybook.Container>
    );
  },
};

export const SingleSelection: StoryObj<typeof FlatMenuSelectionItem> = {
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
      <Storybook.Container position="relative" height="400px">
        <FlatMenu
          trigger={<Button label="Click me" />}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          content={
            <FlatMenuDropdownList paddingY="xs">
              {items.map((item, index) => (
                <Tooltip key={index} content={item.tooltipProps?.content} isEnabled={!!item.tooltipProps?.content}>
                  <FlatMenuSelectionItem
                    isSelected={selectedIndex === index}
                    onClick={() => {
                      setSelectedIndex(index);
                      setIsOpen(false);
                    }}
                    disabled={item.disabled}
                  >
                    {item.label}
                  </FlatMenuSelectionItem>
                </Tooltip>
              ))}
            </FlatMenuDropdownList>
          }
        />
      </Storybook.Container>
    );
  },
};

export const MultiSelection: StoryObj<typeof FlatMenuSelectionItem> = {
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
      <Storybook.Container position="relative" height="400px">
        <FlatMenu
          trigger={<Button label="Click me" />}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          content={
            <FlatMenuDropdownList paddingY="xs">
              {items.map((item, index) => (
                <Tooltip key={index} content={item.tooltipProps?.content} isEnabled={!!item.tooltipProps?.content}>
                  <FlatMenuSelectionItem
                    onClick={() => handleMultiSelectionItemClick(index)}
                    isSelected={multiSelectedItems[index]}
                    isMulti
                    disabled={item.disabled}
                  >
                    {item.label}
                  </FlatMenuSelectionItem>
                </Tooltip>
              ))}
            </FlatMenuDropdownList>
          }
        />
      </Storybook.Container>
    );
  },
};
