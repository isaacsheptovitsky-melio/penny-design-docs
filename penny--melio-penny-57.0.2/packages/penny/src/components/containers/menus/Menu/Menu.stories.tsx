import { noop } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { NakedButton } from '@/components/action/NakedButton';
import { Text } from '@/components/dataDisplay/Text';
import { Tooltip } from '@/components/dataDisplay/Tooltip';
import { Icon } from '@/components/foundations/Icon';
import { fullScreenChromaticDecorator, isUsingVisualTesting } from '@/test-utils/storybook.utils';

import { Group } from '../../Group';
import { Menu, MenuItem } from '.';

const isVisualTesting = isUsingVisualTesting();

const icon = <Icon type="bank" size="small" color="inherit" />;

const footerType = `{
  label: string;
  variant?: primary | secondary;
  isDisabled?: boolean;
  onClick: VoidFunction;
}`;

/**
 * The Menu component is a combination of the `FloatingMenu` (desktop) and the `BottomSheet` (mobile) components.
 */

const meta: Meta<typeof Menu> = {
  title: 'Containers/Menus/Menu [pattern]',
  component: Menu,
  parameters: { docs: { source: { type: 'code' } } },
  decorators: [fullScreenChromaticDecorator],
  argTypes: {
    trigger: {
      control: false,
      type: { name: 'other', value: 'ReactNode', required: true },
      description: 'Trigger component - this is the component that opens the dropdown',
      table: {
        category: 'props',
        type: {
          summary: 'ReactElement<PropsWithChildren<unknown>>',
        },
      },
    },
    children: {
      control: false,
      description: 'Menu Items components of type Menu.',
      type: { name: 'other', value: 'ReactElement<PropsWithChildren<unknown>>[]', required: true },
      table: {
        category: 'props',
        type: {
          summary: 'ReactNode',
        },
      },
    },
    isOpen: {
      control: false,
      description: 'Determines if the dropdown is open, when the menu is controlled outside of the context.',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    onOpenChange: {
      control: false,
      description:
        'Function to toggle the dropdown `isOpen` state, when the menu is controlled outside of the context.',
      table: {
        type: { summary: '(isOpen: boolean) => void' },
        category: 'events',
      },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Determines if the component is in a read-only state.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Determines if the component is in a disabled state.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
    },
    title: {
      control: 'text',
      description: 'The title on the menu.',
      table: {
        category: 'props',
        type: { summary: 'string' },
      },
    },
    header: {
      control: false,
      description: 'The header item of the menu.',
      table: {
        category: 'props',
        type: {
          summary: 'ReactNode',
        },
      },
    },
    footer: {
      control: 'object',
      description: 'The footer item of the menu.',
      table: {
        category: 'props',
        type: {
          summary: 'MenuFooterProps',
          detail: footerType,
        },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'large', 'fit-content'],
      description: 'Determines the size of the dropdown.',
      table: {
        category: 'props',
        defaultValue: { summary: 'small' },
        type: { summary: 'small | large | fit-content' },
      },
    },
    shouldTrapFocus: {
      control: 'boolean',
      description: 'Determines if the focus should be trapped within the dropdown.',
      table: {
        category: 'props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'menu' }, type: { summary: 'string' }, category: 'tests' },
    },
    hasItems: {
      control: 'boolean',
      description:
        'A property that marks that the menu has items inside.<br />This is important since it will allow the menu to act accordingly, like structuring the HTML in an accessible manner.<br /><br />Setting this prop to `false` will also remove the `role` attribute from the dropdown to allow screen-readers announce the dropdown content correctly.',
      table: { type: { summary: 'boolean' }, category: 'props', defaultValue: { summary: 'true' } },
    },
    hasSections: {
      control: 'boolean',
      description:
        'A property that marks that the menu has item sections inside.<br />This is important since it will allow the menu to act accordingly, like structuring the HTML in an accessible manner.',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
      ],
      description:
        'The placement of the menu relative to the trigger. Uses [Floating UI placement](https://floating-ui.com/docs/tutorial#placements).',
      table: {
        type: { summary: 'Placement' },
        defaultValue: { summary: 'bottom-start' },
        category: 'props',
      },
    },
  },
  args: {
    trigger: <Button label="Select" variant="tertiary" />,
    children: <Group>item</Group>,
    isOpen: isVisualTesting,
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
    placement: 'bottom-start',
  },
};
export default meta;

export const Main: StoryObj<typeof Menu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const trigger = <Button variant="tertiary" label="Select" />;
    const items = [{ label: 'option 1' }, { label: 'option 2' }, { label: 'option 3' }, { label: 'option 4' }];
    const selectedItem = items.find((_item, index) => index === selectedIndex);

    return (
      <Group variant="vertical" width="fit-content">
        <Menu {...args} isOpen={isOpen} onOpenChange={setIsOpen} trigger={trigger}>
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
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const DisabledMenu: StoryObj<typeof Menu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const trigger = <Button variant="tertiary" label="click" />;
    const items = [{ label: 'option 1' }, { label: 'option 2' }, { label: 'option 3' }, { label: 'option 4' }];

    return (
      <Menu {...args} isOpen={isOpen} onOpenChange={setIsOpen} trigger={trigger} isDisabled>
        {items.map((item, index) => (
          <MenuItem
            label={item.label}
            isSelected={false}
            onClick={() => {
              setIsOpen(false);
            }}
            key={`${item.label}-${index}`}
          />
        ))}
      </Menu>
    );
  },
};

export const PrimaryFooter: StoryObj<typeof Menu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const triggerPrimary = <Button variant="tertiary" label="Primary" />;
    const menuItems = [
      {
        label: 'option 1',
        leftElement: icon,
        isSelected: false,
        onClick: () => {
          setIsOpen(false);
        },
      },
      {
        label: 'option 2',
        leftElement: icon,
        isSelected: false,
        onClick: () => {
          setIsOpen(false);
        },
      },
      {
        label: 'option 3',
        leftElement: icon,
        isSelected: false,
        onClick: () => {
          setIsOpen(false);
        },
      },
    ];

    return (
      <Menu
        {...args}
        trigger={triggerPrimary}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        footer={{
          label: 'Footer goes here',
          onClick: noop,
          children: <NakedButton variant="primary" label="Footer goes here" />,
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </Menu>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
export const SecondaryFooter: StoryObj<typeof Menu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const triggerSecondary = <Button variant="tertiary" label="Secondary" />;
    const menuItems = [
      {
        label: 'option 1',
        leftElement: icon,
        isSelected: false,
        onClick: () => {
          setIsOpen(false);
        },
      },
      {
        label: 'option 2',
        leftElement: icon,
        isSelected: false,
        onClick: () => {
          setIsOpen(false);
        },
      },
      {
        label: 'option 3',
        leftElement: icon,
        isSelected: false,
        onClick: () => {
          setIsOpen(false);
        },
      },
    ];

    return (
      <Menu
        {...args}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        trigger={triggerSecondary}
        footer={{
          label: '+ Add payment method',
          onClick: noop,
          children: <NakedButton variant="secondary" label="+ Add payment method" />,
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </Menu>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const DisabledFooter: StoryObj<typeof Menu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const triggerSecondary = <Button variant="tertiary" label="Secondary" />;
    const menuItems = [
      {
        label: 'option 1',
        leftElement: icon,
        isSelected: false,
        onClick: () => {
          setIsOpen(false);
        },
      },
      {
        label: 'option 2',
        leftElement: icon,
        isSelected: false,
        onClick: () => {
          setIsOpen(false);
        },
      },
      {
        label: 'option 3',
        leftElement: icon,
        isSelected: false,
        onClick: () => {
          setIsOpen(false);
        },
      },
    ];

    return (
      <Menu
        {...args}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        trigger={triggerSecondary}
        footer={{
          isDisabled: true,
          label: '+ Add payment method',
          onClick: noop,
          children: <NakedButton variant="secondary" label="+ Add payment method" />,
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </Menu>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithTitle: StoryObj<typeof Menu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const trigger = <Button variant="tertiary" label="Select" />;

    const menuItems = [
      {
        label: 'option 1',
        leftElement: icon,
        onClick: () => {
          setIsOpen(false);
        },
      },
      {
        label: 'option 2',
        leftElement: icon,
        onClick: () => {
          setIsOpen(false);
        },
      },
      {
        label: 'option 3',
        leftElement: icon,
        onClick: () => {
          setIsOpen(false);
        },
      },
    ];

    return (
      <Menu {...args} isOpen={isOpen} onOpenChange={setIsOpen} trigger={trigger} title="title">
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </Menu>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithHeader: StoryObj<typeof Menu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const trigger = <Button variant="tertiary" label="Select" />;

    const menuItems = [
      {
        label: 'option 1',
        leftElement: icon,
        onClick: () => {
          setIsOpen(false);
        },
      },
      {
        label: 'option 2',
        leftElement: icon,
        onClick: () => {
          setIsOpen(false);
        },
      },
      {
        label: 'option 3',
        leftElement: icon,
        onClick: () => {
          setIsOpen(false);
        },
      },
    ];

    return (
      <Menu
        {...args}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        trigger={trigger}
        header={<Storybook.ContentPlaceholder />}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </Menu>
    );
  },
};

export const WithDisabledItem: StoryObj<typeof Menu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const trigger = <Button variant="tertiary" label="Select" />;
    const items = [
      { label: 'option 1' },
      { label: 'option 2', disabled: true },
      { label: 'option 3' },
      { label: 'option 4' },
    ];
    const selectedItem = items.find((_item, index) => index === selectedIndex);

    return (
      <Group variant="vertical" width="fit-content">
        <Menu {...args} isOpen={isOpen} onOpenChange={setIsOpen} trigger={trigger}>
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
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const ItemWithTooltip: StoryObj<typeof Menu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const trigger = <Button variant="tertiary" label="Select" />;
    const items = [
      { label: 'option 1' },
      { label: 'option 2', tooltipProps: { content: 'Tooltip content' } },
      { label: 'option 3' },
      { label: 'option 4' },
    ];
    const selectedItem = items.find((_item, index) => index === selectedIndex);

    return (
      <Group variant="vertical" width="fit-content">
        <Menu {...args} isOpen={isOpen} onOpenChange={setIsOpen} trigger={trigger}>
          {items.map((item, index) => (
            <Tooltip
              key={`${item.label}-${index}`}
              content={item.tooltipProps?.content}
              isEnabled={!!item.tooltipProps?.content}
            >
              <MenuItem
                isSelected={false}
                onClick={() => {
                  setSelectedIndex(index);
                  setIsOpen(false);
                }}
                {...item}
              />
            </Tooltip>
          ))}
        </Menu>
        <Text as="h2">Selected option:</Text>
        <Storybook.Container backgroundColor="semantic.surface.secondary.rest" borderRadius="global.100" padding="xs">
          <Text>{selectedItem?.label}</Text>
        </Storybook.Container>
      </Group>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
