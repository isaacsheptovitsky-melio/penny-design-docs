import { noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Text } from '@/components/dataDisplay/Text';
import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils/constants';
import { getUnionTypeSummary, isUsingVisualTesting, setChromaticViewports } from '@/test-utils/storybook.utils';

import { Container } from '../../Container';
import { Group } from '../../Group';
import { FloatingMenuActionTrigger } from '../FloatingMenu';
import { SortDropdownMenu } from './SortDropdownMenu';
import type { SortDropdownMenuProps } from './SortDropdownMenu.types';
import type { SortItemProps } from './SortItem/SortItem.types';

const isVisualTesting = isUsingVisualTesting();

const sortDrodpownMenuOptionType = `{
  label: string;
  disabled?: boolean;
  tooltipProps?: TooltipProps;
  index?: number;
  dataTestId?: string;
  onClick?: VoidFunction;
  sortDirection?: 'asc' | 'desc' | 'none';
}`;

const sortDirectionOptions = ['asc', 'desc', 'none'];

const meta: Meta<typeof SortDropdownMenu> = {
  title: 'Containers/Menus/Sort Dropdown Menu [pattern]',
  component: SortDropdownMenu,
  decorators: [(Story) => <div style={{ transform: 'scale(1)', width: '100%', height: '100vh' }}>{Story()}</div>],
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
      type: { required: true, value: 'object', name: 'other' },
      table: {
        category: 'props',
        type: {
          summary: 'SortItemProps[]',
          detail: sortDrodpownMenuOptionType,
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
    selectedItemIndex: {
      control: 'number',
      description: 'The index of the item that does the sorting.',
      type: { required: true, value: 'number', name: 'other' },
      table: {
        category: 'props',
      },
    },
    sortDirection: {
      control: 'select',
      options: sortDirectionOptions,
      description: 'Determines the which arrow to show on the selected item.',
      type: { required: true, value: 'number', name: 'other' },
      table: {
        category: 'props',
        type: {
          summary: getUnionTypeSummary(sortDirectionOptions),
        },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: COMPONENTS_DEFAULT_TEST_IDS.SORT_DROPDOWN_MENU },
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
    items: [{ label: 'List item' }, { label: 'List item' }],
    selectedItemIndex: 0,
    sortDirection: 'desc',
    isDisabled: false,
    size: 'small',
    'data-testid': COMPONENTS_DEFAULT_TEST_IDS.SORT_DROPDOWN_MENU,
    placement: 'bottom-start',
  },
};
export default meta;

export const Main: StoryObj<SortDropdownMenuProps> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const listItems = useMemo(() => ['Item 3', 'Item 1', 'Item 4', 'Item 5', 'Item 2'], []);
    const [sortDirection, setSortDirection] = useState<SortItemProps['sortDirection']>('desc');
    const [list, setList] = useState(listItems);

    const sortList = useCallback(
      (sortDirection: SortItemProps['sortDirection']) =>
        sortDirection === 'asc'
          ? setList([...listItems].sort((a, b) => b.localeCompare(a)))
          : sortDirection === 'desc'
            ? setList([...listItems].sort((a, b) => a.localeCompare(b)))
            : setList(listItems),
      [listItems]
    );

    const handleOnClick = (index: number) => {
      const updatedSelectedItemIndex = items.findIndex((_, itemIndex) => itemIndex === index);
      if (selectedItemIndex !== updatedSelectedItemIndex) {
        setSelectedItemIndex(updatedSelectedItemIndex);
        setSortDirection('desc');
      } else {
        setSortDirection((prevDirection) =>
          prevDirection === 'asc'
            ? 'none'
            : prevDirection === 'desc'
              ? 'asc'
              : (prevDirection === 'none' || !prevDirection) && 'desc'
        );
      }
    };

    useEffect(() => {
      sortList(sortDirection);
    }, [sortDirection, sortList]);

    const items: SortDropdownMenuProps['items'] = [
      {
        label: 'A > Z',
        onClick: handleOnClick,
      },
      { label: 'Some other sorting', onClick: handleOnClick },
    ];

    return (
      <Group justifyContent="space-evenly">
        <SortDropdownMenu
          {...args}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          items={items}
          selectedItemIndex={selectedItemIndex}
          sortDirection={sortDirection}
        />
        <Group variant="vertical" alignItems="center">
          <Text textStyle="body2Semi">Sort direction: {sortDirection}</Text>
          {list.map((item, index) => (
            <Container key={index} justifyContent="center">
              {item}
            </Container>
          ))}
        </Group>
      </Group>
    );
  },
};

export const WithTitleInTheDropdown: StoryObj<SortDropdownMenuProps> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(isVisualTesting);
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const listItems = useMemo(() => ['Item 3', 'Item 1', 'Item 4', 'Item 5', 'Item 2'], []);
    const [sortDirection, setSortDirection] = useState<SortItemProps['sortDirection']>('desc');
    const [list, setList] = useState(listItems);

    const sortList = useCallback(
      (sortDirection: SortItemProps['sortDirection']) =>
        sortDirection === 'asc'
          ? setList([...listItems].sort((a, b) => b.localeCompare(a)))
          : sortDirection === 'desc'
            ? setList([...listItems].sort((a, b) => a.localeCompare(b)))
            : setList(listItems),
      [listItems]
    );

    const handleOnClick = (index: number) => {
      const updatedSelectedItemIndex = items.findIndex((_, itemIndex) => itemIndex === index);
      if (selectedItemIndex !== updatedSelectedItemIndex) {
        setSelectedItemIndex(updatedSelectedItemIndex);
        setSortDirection('desc');
      } else {
        setSortDirection((prevDirection) =>
          prevDirection === 'asc'
            ? 'none'
            : prevDirection === 'desc'
              ? 'asc'
              : (prevDirection === 'none' || !prevDirection) && 'desc'
        );
      }
    };

    useEffect(() => {
      sortList(sortDirection);
    }, [sortDirection, sortList]);

    const items: SortDropdownMenuProps['items'] = [
      {
        label: 'A > Z',
        onClick: handleOnClick,
      },
      { label: 'Some other sorting', onClick: handleOnClick },
    ];

    return (
      <Container justifyContent="space-evenly">
        <SortDropdownMenu
          {...args}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          items={items}
          selectedItemIndex={selectedItemIndex}
          sortDirection={sortDirection}
          title="Title"
        />
        <Group variant="vertical" alignItems="center">
          <Text textStyle="body2Semi">Sort direction: {sortDirection}</Text>
          {list.map((item, index) => (
            <Container key={index} justifyContent="center">
              {item}
            </Container>
          ))}
        </Group>
      </Container>
    );
  },
};

export const Sizes: StoryObj<SortDropdownMenuProps> = {
  render: (args) => {
    const [isOpenSmall, setIsOpenSmall] = useState(isVisualTesting);
    const [isOpenLarge, setIsOpenLarge] = useState(isVisualTesting);
    const [sortDirection, setSortDirection] = useState<SortItemProps['sortDirection']>('desc');
    const handleOnClick = () => {
      setSortDirection((prevDirection) =>
        prevDirection === 'asc' ? 'desc' : prevDirection === 'desc' ? 'none' : prevDirection === 'none' ? 'asc' : 'none'
      );
    };

    const items: SortDropdownMenuProps['items'] = [
      {
        label: 'List item A',
        onClick: handleOnClick,
        sortDirection,
      },
      {
        label: 'List item B',
        onClick: handleOnClick,
      },
    ];

    return (
      <Container justifyContent="space-evenly">
        <SortDropdownMenu
          {...args}
          trigger={<FloatingMenuActionTrigger size="small" label="Small" />}
          isOpen={isOpenSmall}
          onOpenChange={setIsOpenSmall}
          size="small"
          items={items}
          selectedItemIndex={0}
          sortDirection="desc"
        />
        <SortDropdownMenu
          {...args}
          trigger={<FloatingMenuActionTrigger label="Large" />}
          isOpen={isOpenLarge}
          onOpenChange={setIsOpenLarge}
          size="large"
          items={items}
          selectedItemIndex={0}
          sortDirection="asc"
        />
      </Container>
    );
  },
};

setChromaticViewports([Main, WithTitleInTheDropdown], ['xs', 'xl']);
