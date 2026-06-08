import { Grid } from '@chakra-ui/react';
import { noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils/constants';
import {
  fullScreenChromaticDecorator,
  isUsingVisualTesting,
  setChromaticViewports,
} from '@/test-utils/storybook.utils';

import { FloatingMenuActionTrigger } from '../FloatingMenu';
import { SelectableDropdownMenu } from './SelectableDropdownMenu';
import { type SelectableDropdownMenuProps } from './SelectableDropdownMenu.types';

const isVisualTesting = isUsingVisualTesting();

const selectableDrodpownMenuOptionType = `{
  label: string;
  value: stirng;
  disabled?: boolean;
  tooltipProps?: TooltipProps;
  dataTestId?: string;
  onClick?: VoidFunction;
  isSelected?: boolean;
} & OneOrNone<{ icon?: IconKey | BrandSymbolKey; image?: ImageIconProps }>`;

const footerType = `{
  label: string;
  dataTestId?: string;
  isDisabled?: boolean;
  onClick: VoidFunction;
  type?: 'button' | 'naked';
  variant?: 'primary' | 'secondary';
}`;

const items: SelectableDropdownMenuProps['items'] = [
  { label: 'List Item #1', value: 'List Item #1' },
  { label: 'List Item #2', value: 'List Item #2' },
  { label: 'List Item #3', value: 'List Item #3' },
];

const meta: Meta<typeof SelectableDropdownMenu> = {
  title: 'Containers/Menus/Selectable Dropdown Menu [pattern]',
  component: SelectableDropdownMenu,
  decorators: [fullScreenChromaticDecorator],
  argTypes: {
    trigger: {
      control: false,
      type: { name: 'other', value: 'ReactElement', required: true },
      description: 'The element that opens the dropdown.',
      table: {
        category: 'props',
        type: {
          summary: 'ReactElement',
        },
      },
    },
    items: {
      control: 'object',
      description: 'The items of the dropdown.',
      table: {
        category: 'props',
        type: {
          summary: 'SelectableDropdownMenuItem[]',
          detail: selectableDrodpownMenuOptionType,
        },
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
    isReadOnly: {
      control: 'boolean',
      description: 'Determines if the menu is in read only mode.',
      table: {
        category: 'props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    title: {
      control: 'text',
      description: 'The title on the menu.',
      table: {
        category: 'props',
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'Determines the size of the dropdown.',
      table: {
        category: 'props',
        defaultValue: { summary: 'small' },
        type: { summary: 'small | large' },
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
    isOpen: {
      control: false,
      description: 'Determines if the dropdown is open, when the menu is controlled outside of the context.',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
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
    selectedItemValue: {
      control: false,
      description: 'The selected item.',
      table: {
        category: 'props',
        type: {
          summary: 'SelectableDropdownMenuItem',
          detail: selectableDrodpownMenuOptionType,
        },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: COMPONENTS_DEFAULT_TEST_IDS.SELECTABLE_DROPDOWN_MENU },
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
    isOpen: isVisualTesting,
    onOpenChange: noop,
    trigger: <FloatingMenuActionTrigger label="Click me" />,
    items,
    selectedItemValue: undefined,
    isDisabled: false,
    isReadOnly: false,
    footer: undefined,
    size: 'small',
    'data-testid': COMPONENTS_DEFAULT_TEST_IDS.SELECTABLE_DROPDOWN_MENU,
    placement: 'bottom-start',
  },
};
export default meta;

export const Main: StoryObj<typeof SelectableDropdownMenu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const [selected, setSelected] = useState<string | null>(null);

    const selectedItem = items.find((_item) => _item.value === selected);

    const trigger = <FloatingMenuActionTrigger label={`Selected item: ${selectedItem?.label ?? 'no item'}`} />;

    return (
      <SelectableDropdownMenu
        {...args}
        trigger={trigger}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        selectedItemValue={selectedItem?.value}
        onSelect={(item) => {
          setSelected(item.value);
          setIsOpen(false);
        }}
      />
    );
  },
};

export const WithTitleInTheDropdown: StoryObj<typeof SelectableDropdownMenu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const [selected, setSelected] = useState<string | null>(null);

    const selectedItem = items.find((_item) => _item.value === selected);

    const trigger = <FloatingMenuActionTrigger label={`Selected item: ${selectedItem?.label ?? 'no item'}`} />;

    return (
      <SelectableDropdownMenu
        {...args}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        trigger={trigger}
        title="Title"
        selectedItemValue={selectedItem?.value}
        onSelect={(item) => {
          setSelected(item.value);
          setIsOpen(false);
        }}
      />
    );
  },
};

export const Sizes: StoryObj<typeof SelectableDropdownMenu> = {
  render: (args) => {
    const [isOpenSmall, setIsOpenSmall] = useState(isVisualTesting);
    const [selectedSmall, setSelectedSmall] = useState<string | null>(null);

    const [isOpenLarge, setIsOpenLarge] = useState(isVisualTesting);
    const [selectedLarge, setSelectedLarge] = useState<string | null>(null);

    const selectedItemSmall = items.find((_item) => _item.value === selectedSmall);
    const selectedItemLarge = items.find((_item) => _item.value === selectedLarge);

    const smallTrigger = (
      <FloatingMenuActionTrigger label={`Selected item: ${selectedItemSmall?.label ?? 'no item'}`} size="small" />
    );
    const largeTrigger = (
      <FloatingMenuActionTrigger label={`Selected item: ${selectedItemLarge?.label ?? 'no item'}`} size="large" />
    );

    return (
      <Grid templateColumns="1fr 1fr" gap="s" justifyItems="center">
        <SelectableDropdownMenu
          {...args}
          isOpen={isOpenSmall}
          onOpenChange={setIsOpenSmall}
          trigger={smallTrigger}
          size="small"
          selectedItemValue={selectedItemSmall?.value}
          onSelect={(item) => {
            setIsOpenSmall(false);
            setSelectedSmall(item.value);
          }}
        />
        <SelectableDropdownMenu
          {...args}
          isOpen={isOpenLarge}
          onOpenChange={setIsOpenLarge}
          size="large"
          trigger={largeTrigger}
          selectedItemValue={selectedItemLarge?.value}
          onSelect={(item) => {
            setIsOpenLarge(false);
            setSelectedLarge(item.value);
          }}
        />
      </Grid>
    );
  },
};

export const WithIconsInTheDropdown: StoryObj<typeof SelectableDropdownMenu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const [selected, setSelected] = useState<string | null>(null);

    const items: SelectableDropdownMenuProps['items'] = [
      {
        label: 'List Item #1',
        value: 'List Item #1',
        icon: 'bank',
      },
      {
        label: 'List Item #2',
        value: 'List Item #2',
        icon: 'wells-fargo',
      },
      {
        label: 'List Item #3',
        value: 'List Item #3',
        image: { src: '/assets/ChaseMini.svg', alt: 'Chase bank' },
      },
    ];

    const selectedItem = items.find((_item) => _item.value === selected);

    const trigger = <FloatingMenuActionTrigger label={`Selected item: ${selectedItem?.label ?? 'no item'}`} />;

    return (
      <SelectableDropdownMenu
        {...args}
        trigger={trigger}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        items={items}
        selectedItemValue={selectedItem?.value}
        onSelect={(item) => {
          setSelected(item.value);
          setIsOpen(false);
        }}
      />
    );
  },
};

export const Disabled: StoryObj<typeof SelectableDropdownMenu> = {
  render: (args) => <SelectableDropdownMenu {...args} items={items} isDisabled />,
};

export const WithButtonInFooter: StoryObj<typeof SelectableDropdownMenu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const [selected, setSelected] = useState<string | null>(null);

    const selectedItem = items.find((_item) => _item.value === selected);

    const trigger = <FloatingMenuActionTrigger label={`Selected item: ${selectedItem?.label ?? 'no item'}`} />;

    return (
      <SelectableDropdownMenu
        {...args}
        trigger={trigger}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onSelect={(item) => {
          setSelected(item.value);
          setIsOpen(false);
        }}
        items={items}
        selectedItemValue={selectedItem?.value}
        footer={{ label: '+ Footer text', onClick: noop, type: 'button' }}
      />
    );
  },
};

export const WithNakedButtonInFooter: StoryObj<typeof SelectableDropdownMenu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const [selected, setSelected] = useState<string | null>(null);

    const selectedItem = items.find((_item) => _item.value === selected);

    const trigger = <FloatingMenuActionTrigger label={`Selected item: ${selectedItem?.label ?? 'no item'}`} />;

    return (
      <SelectableDropdownMenu
        {...args}
        trigger={trigger}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onSelect={(item) => {
          setSelected(item.value);
          setIsOpen(false);
        }}
        items={items}
        selectedItemValue={selectedItem?.value}
        footer={{ label: '+ Footer text', onClick: noop, type: 'naked', variant: 'secondary' }}
      />
    );
  },
};

export const WithDisabledItem: StoryObj<typeof SelectableDropdownMenu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const [selected, setSelected] = useState<string | null>(null);

    const items: SelectableDropdownMenuProps['items'] = [
      { label: 'Item #1', value: '1' },
      { label: 'Item #2', value: '2', disabled: true },
      { label: 'Item #3', value: '3', tooltipProps: { content: 'Tooltip content' }, disabled: true },
    ];

    const selectedItem = items.find((_item) => _item.value === selected);
    const trigger = <FloatingMenuActionTrigger label={`Selected item: ${selectedItem?.label ?? 'no item'}`} />;

    return (
      <SelectableDropdownMenu
        {...args}
        items={items}
        trigger={trigger}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        selectedItemValue={selectedItem?.value}
        onSelect={(item) => {
          setSelected(item.value);
          setIsOpen(false);
        }}
      />
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const ItemWithTooltip: StoryObj<typeof SelectableDropdownMenu> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const [selected, setSelected] = useState<string | null>(null);

    const items: SelectableDropdownMenuProps['items'] = [
      { label: 'Item #1', value: '1' },
      { label: 'Item #2', value: '2', tooltipProps: { content: 'Tooltip content' } },
      { label: 'Item #3', value: '3' },
    ];

    const selectedItem = items.find((_item) => _item.value === selected);
    const trigger = <FloatingMenuActionTrigger label={`Selected item: ${selectedItem?.label ?? 'no item'}`} />;

    return (
      <SelectableDropdownMenu
        {...args}
        items={items}
        trigger={trigger}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        selectedItemValue={selectedItem?.value}
        onSelect={(item) => {
          setSelected(item.value);
          setIsOpen(false);
        }}
      />
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

setChromaticViewports(
  [Main, Disabled, WithTitleInTheDropdown, WithIconsInTheDropdown, WithButtonInFooter, WithNakedButtonInFooter],
  ['xs', 'xl']
);
setChromaticViewports([Sizes, Disabled], ['xl']);
