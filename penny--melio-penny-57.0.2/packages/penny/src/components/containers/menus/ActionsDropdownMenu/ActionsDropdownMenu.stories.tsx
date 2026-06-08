import { SimpleGrid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { IconButton } from '@/components/action/IconButton';
import { Text } from '@/components/dataDisplay/Text';
import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils/constants';
import {
  fullScreenChromaticDecorator,
  isUsingVisualTesting,
  setChromaticViewports,
} from '@/test-utils/storybook.utils';
import type { IconKey } from '@/theme/icons/icon.types';
import { getDefaultIconsMap } from '@/theme/icons/icons';

import { Group } from '../../Group';
import { ActionsDropdownMenu } from './ActionsDropdownMenu';
import type { ActionsDropdownMenuProps } from './ActionsDropdownMenu.types';

const isVisualTesting = isUsingVisualTesting();

const actionsDropdownMenuOptionType = `{
  label: string;
  aria-label? : string, // Dedicated label for screen-readers (used for accessibility)
  variant?: 'default' | 'critical';
  onClick: VoidFunction;
  dataTestId?: string;
  disabled?: boolean;
  tooltipProps?: TooltipProps;
}`;

const items: ActionsDropdownMenuProps['items'] = [
  {
    label: 'Action #1',
  },
  {
    label: 'Action #2',
  },
  {
    label: 'Action #3',
    variant: 'critical',
  },
];

const iconOptions = Object.keys(getDefaultIconsMap('')).sort() as IconKey[];

const meta: Meta<typeof ActionsDropdownMenu> = {
  title: 'Containers/Menus/Actions Dropdown Menu [pattern]',
  component: ActionsDropdownMenu,
  decorators: [fullScreenChromaticDecorator],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Determines whether the menu is open.',
      table: {
        category: 'props',
        type: { summary: 'boolean' },
      },
    },
    onOpenChange: {
      control: false,
      description: "A function that toggles the menu's `isOpen` state.",
      table: {
        type: { summary: '(isOpen: boolean) => void' },
        category: 'events',
      },
    },
    label: {
      control: 'text',
      description: "The trigger's label.",
      table: {
        category: 'props',
        type: { summary: 'string' },
      },
    },
    items: {
      control: 'object',
      description: 'The items in the dropdown menu.',
      type: { required: true, value: 'object', name: 'other' },
      table: {
        category: 'props',
        type: {
          summary: 'ActionsDropdownMenuItemProps[]',
          detail: actionsDropdownMenuOptionType,
        },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Determines the size of the trigger.',
      table: {
        category: 'props',
        defaultValue: { summary: 'medium' },
        type: { summary: 'small | medium | large' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'inverse'],
      description: 'Determines the variant of the trigger.',
      table: {
        category: 'props',
        defaultValue: { summary: 'default' },
        type: { summary: 'default | inverse' },
      },
    },
    icon: {
      name: 'icon',
      description: 'The type of the icon of the action trigger (supports on `medium` / `large` sizes only)',
      control: 'select',
      options: [undefined, ...iconOptions],
      table: {
        category: 'props',
        type: { summary: iconOptions.join(' | ') },
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Determines if the menu is disabled.',
      table: {
        category: 'props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    title: {
      control: 'text',
      description: 'The title on the dropdown.',
      table: {
        category: 'props',
        type: { summary: 'string' },
      },
    },
    trigger: {
      control: false,
      type: { name: 'other', value: 'ReactNode' },
      description: 'The trigger that opens the dropdown - if not provided, a default trigger will be used.',
      table: {
        category: 'props',
        type: {
          summary: 'ReactElement',
        },
      },
    },
    shouldCloseMenuOnItemClick: {
      control: 'boolean',
      description: 'Determines if the menu should close when an item is clicked.',
      table: {
        category: 'props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    triggerAriaLabel: {
      control: 'text',
      description: 'Sets an aria-label to the default trigger.',
      table: {
        category: 'accessibility',
        type: { summary: 'string' },
      },
    },
    isFullWidthTrigger: {
      control: 'boolean',
      description: 'Determines if the trigger should fill its container.',
      table: {
        category: 'props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: COMPONENTS_DEFAULT_TEST_IDS.ACTIONS_DROPDOWN_MENU },
        type: { summary: 'string' },
        category: 'tests',
      },
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
    isOpen: false,
    onOpenChange: undefined,
    items,
    label: 'Actions',
    size: 'medium',
    variant: 'default',
    icon: undefined,
    isDisabled: false,
    title: undefined,
    trigger: undefined,
    triggerAriaLabel: undefined,
    shouldCloseMenuOnItemClick: undefined,
    isFullWidthTrigger: undefined,
    'data-testid': COMPONENTS_DEFAULT_TEST_IDS.ACTIONS_DROPDOWN_MENU,
    placement: 'bottom-start',
  },
};
export default meta;

export const Main: StoryObj<typeof ActionsDropdownMenu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const isInverse = args.variant === 'inverse';
    const items: ActionsDropdownMenuProps['items'] = [
      {
        label: 'Action #1',
        onClick: () => {
          setSelectedIndex(0);
        },
      },
      {
        label: 'Action #2',
        onClick: () => {
          setSelectedIndex(1);
        },
      },
      {
        label: 'Action #3',
        variant: 'critical',
        onClick: () => {
          setSelectedIndex(2);
        },
      },
    ];

    const selectedItem = items.find((_item, index) => index === selectedIndex);

    return (
      <Group variant="vertical" width="fit-content">
        <Storybook.Container backgroundColor={isInverse ? 'semantic.surface.inverse' : 'transparent'}>
          <ActionsDropdownMenu {...args} items={items} isOpen={isOpen} onOpenChange={setIsOpen} />
        </Storybook.Container>
        <Text as="h2">You clicked on option:</Text>
        <Storybook.Container backgroundColor="semantic.surface.secondary.rest" borderRadius="global.100" padding="xs">
          <Text>{selectedItem?.label}</Text>
        </Storybook.Container>
      </Group>
    );
  },
};

const boxStyles = { display: 'flex', height: '80px', justifyContent: 'center', alignItems: 'center' };

export const Sizes: StoryObj<typeof ActionsDropdownMenu> = {
  render: ({ icon, ...args }) => (
    <>
      <SimpleGrid columns={4} alignItems="center">
        <Text textStyle="body2Semi">variants/sizes</Text>
        <Storybook.Container {...boxStyles}>
          <Text>small</Text>
        </Storybook.Container>
        <Storybook.Container {...boxStyles}>
          <Text>medium</Text>
        </Storybook.Container>
        <Storybook.Container {...boxStyles}>
          <Text>large</Text>
        </Storybook.Container>
      </SimpleGrid>
      <SimpleGrid columns={4} alignItems="center">
        <Text>default</Text>
        <Storybook.Container {...boxStyles}>
          <ActionsDropdownMenu {...args} triggerAriaLabel="small" size="small" />
        </Storybook.Container>
        <Storybook.Container {...boxStyles}>
          <ActionsDropdownMenu {...args} size="medium" />
        </Storybook.Container>
        <Storybook.Container {...boxStyles}>
          <ActionsDropdownMenu {...args} size="large" />
        </Storybook.Container>
        <Text>inverse</Text>
        <Storybook.Container backgroundColor="semantic.surface.inverse" {...boxStyles}>
          <ActionsDropdownMenu {...args} triggerAriaLabel="small inverse" size="small" variant="inverse" />
        </Storybook.Container>
        <Storybook.Container backgroundColor="semantic.surface.inverse" {...boxStyles}>
          <ActionsDropdownMenu {...args} size="medium" variant="inverse" />
        </Storybook.Container>
        <Storybook.Container backgroundColor="semantic.surface.inverse" {...boxStyles}>
          <ActionsDropdownMenu {...args} size="large" variant="inverse" />
        </Storybook.Container>
      </SimpleGrid>
    </>
  ),
};

export const WithIconInTheTrigger: StoryObj<typeof ActionsDropdownMenu> = {
  render: ({ icon, ...args }) => (
    <>
      <SimpleGrid columns={2} gridTemplateColumns="150px 1fr" alignItems="center">
        <Text textStyle="body2Semi">variants/sizes</Text>
        <Storybook.Container
          display="flex"
          padding="s"
          justifyContent="space-around"
          textAlign="center"
          maxWidth="450px"
        >
          <Text>medium</Text>
          <Text>large</Text>
        </Storybook.Container>
      </SimpleGrid>
      <SimpleGrid columns={2} gridTemplateColumns="150px 1fr" alignItems="center">
        <Text>default</Text>
        <Storybook.Container
          display="flex"
          padding="s"
          justifyContent="space-around"
          textAlign="center"
          maxWidth="450px"
        >
          <ActionsDropdownMenu {...args} size="medium" icon="bank" />
          <ActionsDropdownMenu {...args} size="large" icon="bank" />
        </Storybook.Container>
        <Text>inverse</Text>
        <Storybook.Container
          display="flex"
          padding="s"
          backgroundColor="semantic.surface.inverse"
          color="semantic.text.inverse"
          justifyContent="space-around"
          textAlign="center"
          maxWidth="450px"
        >
          <ActionsDropdownMenu {...args} size="medium" icon="bank" variant="inverse" />
          <ActionsDropdownMenu {...args} size="large" icon="bank" variant="inverse" />
        </Storybook.Container>
      </SimpleGrid>
    </>
  ),
};

export const WithIconsInTheDropdown: StoryObj<typeof ActionsDropdownMenu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const isInverse = args.variant === 'inverse';
    const itemsWithIcons: ActionsDropdownMenuProps['items'] = [
      {
        label: 'Action #1',
        icon: 'bank',
        onClick: () => {
          setSelectedIndex(0);
        },
      },
      {
        label: 'Action #2',
        icon: 'debit-card',
        onClick: () => {
          setSelectedIndex(1);
        },
      },
      {
        label: 'Action #3',
        icon: 'wells-fargo',
        onClick: () => {
          setSelectedIndex(2);
        },
      },
    ];
    const selectedItem = itemsWithIcons.find((_item, index) => index === selectedIndex);

    return (
      <Group variant="vertical" width="fit-content">
        <Storybook.Container backgroundColor={isInverse ? 'semantic.surface.inverse' : 'transparent'}>
          <ActionsDropdownMenu {...args} items={itemsWithIcons} isOpen={isOpen} onOpenChange={setIsOpen} />
        </Storybook.Container>
        <Text as="h2">You clicked on option:</Text>
        <Storybook.Container backgroundColor="semantic.surface.secondary.rest" borderRadius="global.100" padding="xs">
          <Text>{selectedItem?.label}</Text>
        </Storybook.Container>
      </Group>
    );
  },
};

export const Disabled: StoryObj<typeof ActionsDropdownMenu> = {
  render: ({ icon, ...args }) => (
    <>
      <SimpleGrid columns={4} alignItems="center">
        <Text textStyle="body2Semi">variants/sizes</Text>
        <Storybook.Container {...boxStyles}>
          <Text>small</Text>
        </Storybook.Container>
        <Storybook.Container {...boxStyles}>
          <Text>medium</Text>
        </Storybook.Container>
        <Storybook.Container {...boxStyles}>
          <Text>large</Text>
        </Storybook.Container>
      </SimpleGrid>
      <SimpleGrid columns={4} alignItems="center">
        <Text>default</Text>
        <Storybook.Container {...boxStyles}>
          <ActionsDropdownMenu {...args} triggerAriaLabel="small" size="small" isDisabled />
        </Storybook.Container>
        <Storybook.Container {...boxStyles}>
          <ActionsDropdownMenu {...args} size="medium" isDisabled />
        </Storybook.Container>
        <Storybook.Container {...boxStyles}>
          <ActionsDropdownMenu {...args} size="large" isDisabled />
        </Storybook.Container>
        <Text>inverse</Text>
        <Storybook.Container backgroundColor="semantic.surface.inverse" {...boxStyles}>
          <ActionsDropdownMenu {...args} triggerAriaLabel="small inverse" size="small" variant="inverse" isDisabled />
        </Storybook.Container>
        <Storybook.Container backgroundColor="semantic.surface.inverse" {...boxStyles}>
          <ActionsDropdownMenu {...args} size="medium" variant="inverse" isDisabled />
        </Storybook.Container>
        <Storybook.Container backgroundColor="semantic.surface.inverse" {...boxStyles}>
          <ActionsDropdownMenu {...args} size="large" variant="inverse" isDisabled />
        </Storybook.Container>
      </SimpleGrid>
    </>
  ),
};

export const WithTitleInTheDropdown: StoryObj<typeof ActionsDropdownMenu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const isInverse = args.variant === 'inverse';
    const items: ActionsDropdownMenuProps['items'] = [
      {
        label: 'Action #1',
        onClick: () => {
          setSelectedIndex(0);
        },
      },
      {
        label: 'Action #2',
        onClick: () => {
          setSelectedIndex(1);
        },
      },
      {
        label: 'Action #3',
        variant: 'critical',
        onClick: () => {
          setSelectedIndex(2);
        },
      },
    ];

    const selectedItem = items.find((_item, index) => index === selectedIndex);
    return (
      <Group variant="vertical" width="fit-content">
        <Storybook.Container backgroundColor={isInverse ? 'semantic.surface.inverse' : 'transparent'}>
          <ActionsDropdownMenu {...args} items={items} isOpen={isOpen} onOpenChange={setIsOpen} title="Title" />
        </Storybook.Container>
        <Text as="h2">You clicked on option:</Text>
        <Storybook.Container
          backgroundColor="semantic.surface.secondary.inverse"
          borderRadius="global.100"
          padding="xs"
        >
          <Text>{selectedItem?.label}</Text>
        </Storybook.Container>
      </Group>
    );
  },
};

export const WithCustomTrigger: StoryObj<typeof ActionsDropdownMenu> = {
  render: (args) => {
    const customTrigger = <IconButton variant="primary" aria-label="custom-trigger" icon="add" />;
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const items: ActionsDropdownMenuProps['items'] = [
      {
        label: 'Action #1',
        onClick: () => {
          setSelectedIndex(0);
        },
      },
      {
        label: 'Action #2',
        onClick: () => {
          setSelectedIndex(1);
        },
      },
      {
        label: 'Action #3',
        variant: 'critical',
        onClick: () => {
          setSelectedIndex(2);
        },
      },
    ];

    const selectedItem = items.find((_item, index) => index === selectedIndex);

    return (
      <Group variant="vertical" width="fit-content">
        <ActionsDropdownMenu
          {...args}
          items={items}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          label={undefined}
          trigger={customTrigger}
        />
        <Text as="h2">You clicked on option:</Text>
        <Storybook.Container backgroundColor="semantic.surface.secondary.rest" borderRadius="global.100" padding="xs">
          <Text>{selectedItem?.label}</Text>
        </Storybook.Container>
      </Group>
    );
  },
};

export const WithDisabledItem: StoryObj<typeof ActionsDropdownMenu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const isInverse = args.variant === 'inverse';
    const items: ActionsDropdownMenuProps['items'] = [
      {
        label: 'Action #1',
        onClick: () => {
          setSelectedIndex(0);
        },
      },
      {
        label: 'Action #2',
        onClick: () => {
          setSelectedIndex(1);
        },
        disabled: true,
      },
      {
        label: 'Action #3',
        variant: 'critical',
        onClick: () => {
          setSelectedIndex(2);
        },
        disabled: true,
        tooltipProps: { content: 'Tooltip content' },
      },
    ];

    const selectedItem = items.find((_item, index) => index === selectedIndex);

    return (
      <Group variant="vertical" width="fit-content">
        <Storybook.Container backgroundColor={isInverse ? 'semantic.surface.inverse' : 'transparent'}>
          <ActionsDropdownMenu {...args} items={items} isOpen={isOpen} onOpenChange={setIsOpen} />
        </Storybook.Container>
        <Text as="h2">You clicked on option:</Text>
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

export const ItemWithTooltip: StoryObj<typeof ActionsDropdownMenu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const isInverse = args.variant === 'inverse';
    const items: ActionsDropdownMenuProps['items'] = [
      {
        label: 'Action #1',
        onClick: () => {
          setSelectedIndex(0);
        },
      },
      {
        label: 'Action #2',
        onClick: () => {
          setSelectedIndex(1);
        },
        tooltipProps: { content: 'Tooltip content' },
      },
      {
        label: 'Action #3',
        variant: 'critical',
        onClick: () => {
          setSelectedIndex(2);
        },
      },
    ];

    const selectedItem = items.find((_item, index) => index === selectedIndex);

    return (
      <Group variant="vertical" width="fit-content">
        <Storybook.Container backgroundColor={isInverse ? 'semantic.surface.inverse' : 'transparent'}>
          <ActionsDropdownMenu {...args} items={items} isOpen={isOpen} onOpenChange={setIsOpen} />
        </Storybook.Container>
        <Text as="h2">You clicked on option:</Text>
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

setChromaticViewports(
  [Main, Disabled, WithTitleInTheDropdown, WithIconsInTheDropdown, WithCustomTrigger],
  ['xs', 'xl']
);
setChromaticViewports([Sizes, WithIconInTheTrigger, Disabled], ['xl']);
