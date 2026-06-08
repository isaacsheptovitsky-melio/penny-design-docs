import { noop } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { screen, userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { Text } from '@/components/dataDisplay/Text';

import { Group } from '../../Group';
import { Menu, MenuItem } from '.';

const meta: Meta<typeof Menu> = {
  title: 'Chromatic/Menu',
  component: Menu,
  args: {
    trigger: <Button label="Select" variant="tertiary" />,
    children: <Group>item</Group>,
    onOpenChange: noop,
    footer: undefined,
    size: 'small',
    title: '',
    isReadOnly: false,
    isDisabled: false,
    shouldTrapFocus: false,
    hasItems: true,
    hasSections: false,
    'data-testid': 'menu',
  },
};
export default meta;

export const WithLongOptionText: StoryObj<typeof Menu> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const trigger = <Button variant="tertiary" label="Select" />;
    const items = [
      { label: 'option 1' },
      { label: 'option 2 with very long text so we can see it wrap lines' },
      { label: 'option 3' },
      { label: 'option 4' },
    ];
    const selectedItem = items.find((_item, index) => index === selectedIndex);

    return (
      <Group variant="vertical" width="fit-content">
        <Menu size="small" isOpen={isOpen} onOpenChange={setIsOpen} trigger={trigger}>
          {items.map((item, index) => (
            <MenuItem
              isSelected={false}
              onClick={() => {
                setSelectedIndex(index);
                setIsOpen(false);
              }}
              key={`${item.label}-${index}`}
              {...item}
            />
          ))}
        </Menu>
        <Text as="h2">Selected option:</Text>
        <Storybook.Container backgroundColor="semantic.surface.secondary.rest" borderRadius="global.100" padding="xs">
          <Text>{selectedItem?.label}</Text>
        </Storybook.Container>
      </Group>
    );
  },
  play: async () => userEvent.click(screen.getByRole('button')),
  parameters: {
    a11y: {
      // TODO: https://meliorisk.atlassian.net/browse/ME-109462 (aria-required-children, aria-required-parent, list)
      // TODO: https://meliorisk.atlassian.net/browse/ME-109901 (aria-hidden-focus)
      test: 'todo',
    },
  },
};
