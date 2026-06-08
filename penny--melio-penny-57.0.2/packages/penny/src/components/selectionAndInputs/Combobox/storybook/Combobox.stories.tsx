import { Box } from '@chakra-ui/react';
import { noop, useDebounceCallback } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ChangeEvent, CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { NakedButton } from '@/components/action/NakedButton';
import { Container } from '@/components/containers/Container';
import { Group } from '@/components/containers/Group';
import { Menu } from '@/components/containers/menus/Menu';
import { MenuItem } from '@/components/containers/menus/Menu';
import { Avatar } from '@/components/dataDisplay/Avatar';
import { BrandSymbol } from '@/components/dataDisplay/BrandSymbol';
import { Text } from '@/components/dataDisplay/Text';
import { Typography } from '@/components/dataDisplay/typography';
import { FormField } from '@/components/form/components/FormField';
import { Icon } from '@/components/foundations/Icon';
import { commonFormFieldControls } from '@/test-utils/stories.utils';

import { TextField } from '../../TextField';
import { Combobox, ComboboxFooter } from '..';
import type { City } from '../__fixtures__/mock-data';
import { cities, citiesByRegion, presetCities } from '../__fixtures__/mock-data';
import type { ComboboxProps } from '../Combobox.types';
import { useControlledCombobox, useFetchOptions } from './useControlledCombobox';

const args: ComboboxProps<string, City> = {
  options: [],
  value: undefined,
  placeholder: undefined,
  viewModePlaceholder: 'No city selected',
  isMenuOpen: false,
  isLoadingOptions: false,
  loadingState: undefined,
  emptyState: undefined,
  footer: undefined,
  menuWidth: 'match-trigger',
  menuMaxWidth: undefined,
  menuStatusMessages: undefined,
  menuAriaLabel: 'Cities',
  size: 'large',
  isDisabled: false,
  isReadOnly: false,
  isLoading: false,
  isViewMode: false,
  isInvalid: false,
  onChange: undefined,
  onKeyDown: undefined,
  onInputChange: undefined,
  autoFocus: false,
  defaultInputValue: undefined,
  inputValue: undefined,
};

const optionsType = `
type ComboboxOption<V> = {
  value: V;
  label: string;
  disabled?: boolean;
  tooltipProps?: TooltipProps;
  testId?: string;
};

type ComboboxSection<V, O extends ComboboxOption<V>> = {
  label: ReactNode;
  options: O[];
  testId?: string;
};
`;

const mobileViewPropsType = `
type MobileViewProps<V, O extends ComboboxOption<V>> = {
  closeButtonProps?: Partial<NakedButtonProps>;
} & HTMLAttributes<HTMLDivElement>;
`;

/**
 * The `Combobox` component allows the developer to handle async options fetching by using these props:
 * - `isLoadingOptions`: Set this prop to `true` to show the loading state in the dropdown menu while fetching options.
 * - `onInputChange`: Use this prop to handle the input value change and fetch options accordingly.
 * - `isMenuOpen`: Set this prop to `true` to open the dropdown menu once a specific condition is met. Note that closing the menu is handled by the component itself on the following conditions:
 *  - The user clicks outside the component.
 *  - The user presses the `Escape` key.
 *  - The user selects an option.
 *  - The user clears the selected value.
 * - `onMenuClose`: Use this prop to reset the `isMenuOpen` state to `false` when the menu is closed by the above conditions.
 */
const meta: Meta<typeof Combobox> = {
  title: 'Selection & Inputs Components/Combobox [new]',
  component: Combobox,

  // Ignoring helper.
  excludeStories: ['useControlledCombobox'],
  parameters: {
    docs: { source: { type: 'code' } },
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'The options in the dropdown menu.',
      type: { required: true, value: 'array', name: 'other' },
      table: {
        type: { summary: 'ComboboxOption<V>[] | ComboboxSection<V, O>[]', detail: optionsType },
        category: 'props',
      },
    },
    emptyState: {
      control: false,
      description: 'The combobox menu content when there are no options.',
      table: { defaultValue: { summary: 'No options' }, type: { summary: 'ReactNode' }, category: 'props' },
    },
    loadingState: {
      control: false,
      description: 'The combobox menu content when `isLoadingOptions` is true.',
      table: { defaultValue: { summary: 'Loading...' }, type: { summary: 'ReactNode' }, category: 'props' },
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'The size of the field.',
      table: { defaultValue: { summary: 'large' }, type: { summary: 'small | large' }, category: 'props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Sets the field as disabled.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isViewMode: {
      control: 'boolean',
      description: 'Sets the field as view-mode.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Sets the field as read-only.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isLoading: {
      control: 'boolean',
      description: 'Sets the field in loading state.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isInvalid: {
      control: 'boolean',
      description: 'Sets the field in invalid state.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isMenuOpen: {
      control: 'boolean',
      description: 'Sets the menu to be open.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isLoadingOptions: {
      control: 'boolean',
      description: 'Sets the combobox **menu** to be in loading state.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    clearButtonAriaLabel: {
      control: 'text',
      description: 'The `aria-label` attribute for the clear button.',
      table: {
        defaultValue: { summary: 'Clear selected option' },
        type: { summary: 'string' },
        category: 'accessibility',
      },
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text for when there is no value.',
      table: { defaultValue: { summary: 'Search' }, type: { summary: 'string' }, category: 'props' },
    },
    viewModePlaceholder: {
      control: 'text',
      description: 'The placeholder text for when there is no value and the field is in view-mode.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    value: {
      control: 'text',
      description: "The value of the combobox.<br />**It must exist as one of its options' values**.",
      table: { type: { summary: 'V | undefined' }, category: 'props' },
    },
    defaultInputValue: {
      control: 'text',
      description: 'The default value of the combobox input (uncontrolled).',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    inputValue: {
      control: 'text',
      description: 'The value of the combobox input (controlled).',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'combobox' }, type: { summary: 'string' }, category: 'tests' },
    },
    autoFocus: {
      control: 'boolean',
      description: 'Set the trigger to be focused on mount.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    footer: {
      control: false,
      description:
        'The footer of the combobox.<br />You can use `ComboboxFooter` component to get the conventional paddings for the content.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    header: {
      control: false,
      description: 'The header of the combobox.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    menuWidth: {
      control: 'text',
      description:
        "The width of the menu.<br />If `'match-trigger'` is set (default), the width will be the trigger's width.",
      table: {
        defaultValue: { summary: 'match-trigger' },
        type: { summary: "CSSProperties['width'] | 'match-trigger'" },
        category: 'props',
      },
    },
    menuMaxWidth: {
      control: 'text',
      description:
        "The max-width of the menu.<br />If the width of the menu takes the trigger's width then you shouldn't define a max-width.",
      table: { type: { summary: "CSSProperties['maxWidth']" }, category: 'props' },
    },
    menuAriaLabel: {
      control: 'text',
      description: 'The `aria-label` attribute for the menu.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    menuStatusMessages: {
      control: 'object',
      description:
        'The status messages for the menu when it is empty or loading that will be announced by screen readers.<br />If no empty state or loading state is provided, these messages will be shown inside the menu.<br />**Note that the** `loadingState` **and** `emptyState` **content should always correspond to their parallel status messages to meet a11y requirements.**',
      table: {
        defaultValue: { summary: '{ empty: "No options", loading: "Loading..." }' },
        type: { summary: '{ empty?: string; loading?: string }' },
        category: 'accessibility',
      },
    },
    mobileViewProps: {
      control: false,
      description: 'Props for the mobile view of the combobox.',
      table: { type: { summary: 'MobileViewProps<V, O>', detail: mobileViewPropsType }, category: 'props' },
    },
    optionRenderer: {
      control: false,
      description: "A function to render the options' content.",
      table: {
        type: { summary: '(option: ComboboxOption<V>, isSelected: boolean) => ReactNode' },
        category: 'props',
      },
    },
    valueRenderer: {
      control: false,
      description: "A function to render the trigger's content using the selected value.",
      table: { type: { summary: '(selectedOption: ComboboxOption<V>) => ReactNode' }, category: 'props' },
    },
    onChange: {
      control: false,
      description: "An event called when the combobox's value changes.",
      table: { type: { summary: 'ChangeEventHandler<HTMLInputElement>' }, category: 'events' },
    },
    onInputChange: {
      control: false,
      description: 'An event called when the input value changes.',
      table: { type: { summary: '(inputValue: string) => void' }, category: 'events' },
    },
    onFocus: {
      control: false,
      description: 'An event called when the combobox is focused.',
      table: { type: { summary: 'FocusEventHandler<HTMLInputElement>' }, category: 'events' },
    },
    onBlur: {
      control: false,
      description: 'An event called when the combobox is blurred.',
      table: { type: { summary: 'FocusEventHandler<HTMLInputElement>' }, category: 'events' },
    },
    onClick: {
      control: false,
      description: 'An event called when the combobox is clicked.',
      table: { type: { summary: 'MouseEventHandler<HTMLInputElement>' }, category: 'events' },
    },
    onKeyDown: {
      control: false,
      description: 'An event called when a key is pressed while the combobox is focused.',
      table: { type: { summary: 'KeyboardEventHandler<HTMLInputElement>' }, category: 'events' },
    },
    onClear: {
      control: false,
      description: 'An event called when the clear button is clicked.',
      table: { type: { summary: 'VoidFunction' }, category: 'events' },
    },
    onMenuClose: {
      control: false,
      description: 'An event called when the menu is closed.',
      table: { type: { summary: 'VoidFunction' }, category: 'events' },
    },
    isRequired: { table: { disable: true } },
    id: { table: { disable: true } },
    autoComplete: commonFormFieldControls['autoComplete'],
    inputLeftElement: {
      control: false,
      description:
        'Element displayed inside the input, aligned to the left. Defaults to a search icon if not provided.',
      table: {
        defaultValue: { summary: "<Icon type='search' size='small' color='inherit' />" },
        type: { summary: 'ReactNode' },
        category: 'props',
      },
    },
  },
  args: args as Meta<typeof Combobox>['args'],
};
export default meta;

export const Main: StoryObj<typeof Combobox> = {
  render: (args) => {
    const props = useControlledCombobox();
    const [value, setValue] = useState<string>();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

    return <Combobox {...args} {...props} onChange={onChange} value={value} />;
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Placeholder: StoryObj<typeof Combobox> = {
  render: (args) => {
    const items = [
      { label: 'Default', component: <Combobox {...args} /> },
      { label: 'Custom', component: <Combobox {...args} placeholder="Search for a city" /> },
    ];

    return (
      <Storybook.Row
        items={items}
        alignCompLabel="vertical"
        alignItems="stretch"
        justifyContent="flex-start"
        flexBasis={0}
      />
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * This story demonstrates the empty state of the `Combobox` menu.<br />
 * Start typing in the input field to see the empty state.<br />
 * **Note that the** `emptyState` **content should always correspond to the empty message to meet a11y requirements.**
 */
export const EmptyState: StoryObj<typeof Combobox> = {
  render: (args) => {
    const props1 = useControlledCombobox();
    const props2 = useControlledCombobox();
    const props3 = useControlledCombobox();

    const items = [
      { label: 'Default', component: <Combobox {...args} {...props1} options={[]} /> },
      {
        label: 'Custom',
        component: (
          <Combobox
            {...args}
            {...props2}
            options={[]}
            emptyState="No cities"
            menuStatusMessages={{ empty: 'No cities' }}
          />
        ),
      },
      {
        label: 'With CTA',
        component: (
          <Combobox
            {...args}
            {...props3}
            options={[]}
            emptyState={
              <Container justifyContent="flex-start" overflow="visible">
                <NakedButton variant="secondary" size="large" label="Add a city" />
              </Container>
            }
            menuStatusMessages={{ empty: 'No cities available, press the button to add a city' }}
          />
        ),
      },
    ];

    return (
      <Storybook.Row
        items={items}
        alignCompLabel="vertical"
        alignItems="stretch"
        justifyContent="flex-start"
        flexBasis={0}
      />
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * This story demonstrates the loading state of the `Combobox` menu.<br />
 * Start typing in the input field to see the loading state.<br />
 * **Note that the** `loadingState` **content should always correspond to the loading message to meet a11y requirements.**
 */
export const MenuLoadingState: StoryObj<typeof Combobox> = {
  render: (args) => {
    const props1 = useControlledCombobox();
    const props2 = useControlledCombobox();

    const items = [
      { label: 'Default', component: <Combobox {...args} {...props1} isLoadingOptions /> },
      {
        label: 'Custom',
        component: (
          <Combobox
            {...args}
            {...props2}
            isLoadingOptions
            loadingState="Loading cities"
            menuStatusMessages={{ loading: 'Loading cities' }}
          />
        ),
      },
    ];

    return (
      <Storybook.Row
        items={items}
        alignCompLabel="vertical"
        alignItems="stretch"
        justifyContent="flex-start"
        flexBasis={0}
      />
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Sizes: StoryObj<typeof Combobox> = {
  render: (args) => {
    const items = [
      { label: 'Small', component: <Combobox {...args} size="small" /> },
      { label: 'Large', component: <Combobox {...args} size="large" /> },
    ];

    return (
      <Storybook.Row
        items={items}
        alignCompLabel="vertical"
        alignItems="stretch"
        justifyContent="flex-start"
        flexBasis={0}
      />
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Invalid: StoryObj<typeof Combobox> = {
  render: (args) => <Combobox {...args} isInvalid />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Disabled: StoryObj<typeof Combobox> = {
  render: () => {
    const items = [
      { label: 'Without value', component: <Combobox {...args} isDisabled /> },
      {
        label: 'With value',
        component: <Combobox {...args} options={cities} value="new_york" onChange={noop} isDisabled />,
      },
    ];

    return (
      <Storybook.Row
        items={items}
        alignCompLabel="vertical"
        alignItems="stretch"
        justifyContent="flex-start"
        flexBasis={0}
      />
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const ReadOnly: StoryObj<typeof Combobox> = {
  render: () => {
    const items = [
      { label: 'Without value', component: <Combobox {...args} isReadOnly /> },
      {
        label: 'With value',
        component: <Combobox {...args} options={cities} value="new_york" onChange={noop} isReadOnly />,
      },
    ];

    return (
      <Storybook.Row
        items={items}
        alignCompLabel="vertical"
        alignItems="stretch"
        justifyContent="flex-start"
        flexBasis={0}
      />
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Loading: StoryObj<typeof Combobox> = {
  render: () => {
    const items = [
      { label: 'Without value', component: <Combobox {...args} isLoading /> },
      {
        label: 'With value',
        component: <Combobox {...args} options={cities} value="new_york" onChange={noop} isLoading />,
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" flexBasis={0} />;
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const ViewMode: StoryObj<typeof Combobox> = {
  render: () => {
    const items = [
      { label: 'Without value', component: <Combobox {...args} isViewMode /> },
      {
        label: 'With value',
        component: <Combobox {...args} options={cities} value="new_york" onChange={noop} isViewMode />,
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" flexBasis={0} />;
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const WithHeader: StoryObj<typeof Combobox> = {
  render: (args) => {
    const props1 = useControlledCombobox();
    const props2 = useControlledCombobox();

    const items = [
      {
        label: 'Custom content',
        component: (
          <Combobox
            {...args}
            {...props1}
            header={
              <Box>
                <Storybook.ContentPlaceholder />
              </Box>
            }
          />
        ),
      },
      {
        label: 'With CTA',
        component: (
          <Combobox
            {...args}
            {...props2}
            header={
              <Box>
                <Button
                  label="Add new city"
                  variant="secondary"
                  size="small"
                  isFullWidth
                  leftElement={<Icon type="add" size="small" color="inherit" aria-hidden />}
                />
              </Box>
            }
          />
        ),
      },
    ];

    return (
      <Storybook.Row
        items={items}
        alignCompLabel="vertical"
        alignItems="stretch"
        justifyContent="flex-start"
        flexBasis={0}
      />
    );
  },
};

export const WithFooter: StoryObj<typeof Combobox> = {
  render: (args) => {
    const withCustomContentProps = useControlledCombobox();
    const withCtaProps = useControlledCombobox();

    const items = [
      {
        label: 'Custom content',
        component: (
          <Combobox
            {...args}
            {...withCustomContentProps}
            footer={
              <ComboboxFooter>
                <Storybook.ContentPlaceholder />
              </ComboboxFooter>
            }
          />
        ),
      },
      {
        label: 'With CTA',
        component: (
          <Combobox
            {...args}
            {...withCtaProps}
            footer={
              <ComboboxFooter>
                <Button
                  label="Add new city"
                  variant="secondary"
                  size="small"
                  isFullWidth
                  leftElement={<Icon type="add" size="small" color="inherit" aria-hidden />}
                />
              </ComboboxFooter>
            }
          />
        ),
      },
    ];

    return (
      <Storybook.Row
        items={items}
        alignCompLabel="vertical"
        alignItems="stretch"
        justifyContent="flex-start"
        flexBasis={0}
      />
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

type MenuWidthOptions = {
  width: CSSProperties['width'];
  maxWidth: CSSProperties['maxWidth'];
  label: string;
};

const menuWidthOptions = [
  { width: 'match-trigger', maxWidth: undefined, label: 'Match trigger (default)' },
  { width: '200px', maxWidth: undefined, label: 'Fixed width (200px)' },
  { width: '100%', maxWidth: '400px', label: 'Max width (400px)' },
] as const;

/**
 * This story demonstrates usage of the `Combobox` component with custom menu width and max-width.<br />
 * Click the "Width options" button to change the menu width.
 */
export const WithCustomMenuWidth: StoryObj<typeof Combobox> = {
  render: (args) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [menuWidthProps, setMenuWidthProps] = useState<MenuWidthOptions>(menuWidthOptions[0]);
    const props = useControlledCombobox();

    return (
      <Group variant="vertical" width="full">
        <Group>
          <Menu
            isOpen={menuIsOpen}
            onOpenChange={setMenuIsOpen}
            trigger={<Button variant="tertiary" label="Width options" />}
          >
            {menuWidthOptions.map((item) => (
              <MenuItem
                key={item.label}
                isSelected={item.label === menuWidthProps.label}
                onClick={() => {
                  setMenuWidthProps(item);
                  setMenuIsOpen(false);
                }}
                label={item.label}
              />
            ))}
          </Menu>
          <Group variant="vertical" spacing="none">
            <Text textStyle="body3">Current menu width: &quot;{menuWidthProps.width}&quot;</Text>
            <Text textStyle="body3">Current menu max-width: &quot;{menuWidthProps.maxWidth ?? 'none'}&quot;</Text>
          </Group>
        </Group>
        <Combobox {...args} {...props} menuWidth={menuWidthProps.width} menuMaxWidth={menuWidthProps.maxWidth} />
      </Group>
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * This story demonstrates usage of the `Combobox` component with preset options and controlled menu open/close.
 */
export const ControlledMenuAndPresetOptions: StoryObj<typeof Combobox> = {
  render: (args) => {
    const [inputValue, setInputValue] = useState('');
    const { options, isFetching } = useFetchOptions({ searchTerm: inputValue, presetOptions: presetCities });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [value, setValue] = useState<string>();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
    const debouncedSetInputValue = useDebounceCallback(setInputValue, 250);

    return (
      <Combobox
        {...args}
        options={options}
        onChange={onChange}
        value={value}
        onInputChange={debouncedSetInputValue}
        isLoadingOptions={isFetching}
        isMenuOpen={inputValue.length > 0 || isMenuOpen}
        onClick={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const WithSections: StoryObj<typeof Combobox> = {
  render: (args) => {
    const props = useControlledCombobox({ defaultOptions: citiesByRegion });
    const [value, setValue] = useState<string>();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

    return <Combobox {...args} {...props} onChange={onChange} value={value} />;
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * Use `valueRenderer` prop to render anything you'd like in the trigger as the selected value.<br />
 * Use `optionRenderer` prop to render anything you'd like in each option.
 */
export const CustomTriggerAndOptionContent: StoryObj<typeof Combobox> = {
  render: () => {
    const props = useControlledCombobox({ presetOptions: presetCities });
    const [value, setValue] = useState('montreal');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

    const valueRenderer = (selectedOption: City) => (
      <Group alignItems="center" spacing="xs">
        <BrandSymbol type="melio" size="small" aria-hidden />
        <Text textStyle="inline" shouldSupportEllipsis>
          {selectedOption.label}
        </Text>
      </Group>
    );

    const optionRenderer = (option: City) => (
      <Group alignItems="center" spacing="xs-s">
        <BrandSymbol type="melio" size="small" isDisabled={option.disabled} aria-hidden />
        <Text textStyle="inline" shouldSupportEllipsis color="inherit">
          {option.label}
        </Text>
      </Group>
    );

    return (
      <Combobox
        {...args}
        {...props}
        value={value}
        onChange={onChange}
        valueRenderer={valueRenderer}
        optionRenderer={optionRenderer}
      />
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * This story demonstrates how to override the default input left element of the `Combobox`.
 *
 * **Note:** When providing a custom icon, use `color="inherit"` so the icon automatically adapts.
 * If you provide a fully custom left element, you need to also handle states like
 * read-only, disabled & loading yourself.
 */
export const CustomInputLeftElement: StoryObj<typeof Combobox> = {
  render: (args) => {
    const [withoutInputLeftElementValue, setWithoutInputLeftElementValue] = useState<string>();
    const [withCustomInputLeftElementValue, setWithCustomInputLeftElementValue] = useState<string>();
    const withoutInputLeftElementProps = useControlledCombobox();
    const withCustomInputLeftElementProps = useControlledCombobox();

    const items = [
      {
        label: 'Without Input Left Element',
        component: (
          <Combobox
            {...args}
            {...withoutInputLeftElementProps}
            value={withoutInputLeftElementValue}
            onChange={(event) => setWithoutInputLeftElementValue(event.target.value)}
            inputLeftElement={null}
          />
        ),
      },
      {
        label: 'Custom',
        component: (
          <Combobox
            {...args}
            {...withCustomInputLeftElementProps}
            value={withCustomInputLeftElementValue}
            onChange={(event) => setWithCustomInputLeftElementValue(event.target.value)}
            inputLeftElement={<Icon type="tablet-search" size="small" color="inherit" />}
          />
        ),
      },
    ];

    return (
      <Storybook.Row
        items={items}
        alignCompLabel="vertical"
        alignItems="stretch"
        justifyContent="flex-start"
        flexBasis={0}
      />
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * To get type safety and intellisense for the `description` property in this example, we extend `ComboboxOption` like so:<br />
 * `type City = ComboboxOption<string> & { description: string }`
 */
export const MultiLineCustomTriggerAndOptionContent: StoryObj<typeof Combobox> = {
  render: () => {
    const props = useControlledCombobox({ presetOptions: presetCities });
    const [value, setValue] = useState('montreal');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

    const CustomContent = ({ option, isSelected }: { option: City; isSelected?: boolean }) => (
      <Group alignItems="center" spacing="s">
        <Avatar name={option.label} size="small" isDisabled={option.disabled} isSelected={isSelected} aria-hidden />
        <Group variant="vertical" alignItems="flex-start" spacing="xxxs">
          <Text textStyle="body3" shouldSupportEllipsis color="inherit">
            {option.label}
          </Text>
          <Typography.Description label={option.description} isDisabled={option.disabled} />
        </Group>
      </Group>
    );

    const valueRenderer = (selectedOption: City) => (
      <Container paddingY="xs-s">
        <CustomContent option={selectedOption} />
      </Container>
    );

    const optionRenderer = (option: City, isSelected: boolean) => (
      <CustomContent option={option} isSelected={isSelected} />
    );

    return (
      <Combobox
        {...args}
        {...props}
        value={value}
        onChange={onChange}
        valueRenderer={valueRenderer}
        optionRenderer={optionRenderer}
      />
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * This story showcases the `Combobox` component in mobile view. Note that the behavior in this story is incomplete as this is just an example of how the combobox should be displayed.<br />
 * Please refer to the [canvas](/story/selection-inputs-components-combobox-new--mobile-view) and change the viewport to `xs` to see the actual view.
 */
export const MobileView: StoryObj<typeof Combobox> = {
  render: (args) => {
    const DEBOUNCE_TIME = 1200;
    const [optionsFromServer, setOptionsFromServer] = useState(cities);
    const [options, setOptions] = useState<City[]>([]);
    const [isUpdatingOptions, setIsUpdatingOptions] = useState(false);
    const [isFetchingOptions, setIsFetchingOptions] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState('');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
    const debouncedSetInputValue = useDebounceCallback(setInputValue, 250);

    // Simulate fetching options from the server.
    useEffect(() => {
      if (inputValue) {
        setIsFetchingOptions(true);
        const filteredOptions = optionsFromServer.filter((city) =>
          city.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        setOptions(filteredOptions);
        setTimeout(() => setIsFetchingOptions(false), DEBOUNCE_TIME);
      } else {
        setOptions([]);
      }
    }, [inputValue, optionsFromServer]);

    useEffect(() => {
      setIsMenuOpen(inputValue.length > 0);
    }, [inputValue.length]);

    return (
      <Group variant="vertical">
        <Text>Change the viewport to &quot;xs&quot; to see the actual mobile view.</Text>
        <TextField placeholder="Input before" />
        <Combobox
          {...args}
          options={options}
          onInputChange={debouncedSetInputValue}
          isLoadingOptions={isFetchingOptions}
          isMenuOpen={isMenuOpen && !isUpdatingOptions}
          isLoading={isUpdatingOptions}
          value={value}
          onChange={onChange}
          footer={
            <ComboboxFooter>
              <Button
                label="Add new city"
                variant="secondary"
                size="small"
                isFullWidth
                leftElement={<Icon type="add" size="small" color="inherit" aria-hidden />}
                onClick={() => {
                  const newCityOption = {
                    value: inputValue.replaceAll(' ', '_').toLowerCase(),
                    label: inputValue,
                    description: 'N/A',
                  };

                  setIsUpdatingOptions(true);

                  setTimeout(() => {
                    setValue(newCityOption.value);
                    setOptions([newCityOption]);
                    setOptionsFromServer((prev) => [...prev, newCityOption]);
                    setIsUpdatingOptions(false);
                  }, DEBOUNCE_TIME);
                }}
              />
            </ComboboxFooter>
          }
        />
        <TextField placeholder="Input after" />
      </Group>
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * You **must** use `FormField` component to wrap the `Combobox` component:
 * ```
 * <FormField
 *  labelProps={{ label: 'City' }}
 *  helperText="This indicates what type of person you are."
 *  {...registerField('standalone-combobox')}
 *  render={(props, fieldContext) => (<Combobox {...props} {...fieldContext} options={options} />)}
 * />
 * ```
 * *It is important to spread `fieldContext` as well as `props` so the component would render correctly in mobile view.*
 */
export const WithFormField: StoryObj<typeof Combobox> = {
  render: (args) => {
    const controlledProps = useControlledCombobox();
    const [value, setValue] = useState<string>();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

    return (
      <FormField
        labelProps={{
          label: 'City',
          id: 'city',
        }}
        helperText="This indicates what type of person you are"
        render={(props, fieldContext) => (
          <Combobox {...args} {...controlledProps} {...props} {...fieldContext} onChange={onChange} value={value} />
        )}
      />
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const WithDisabledOption: StoryObj<typeof Combobox> = {
  render: (args) => {
    const props = useControlledCombobox();
    const [value, setValue] = useState<string>();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

    const options: City[] = [
      { label: 'Albuquerque', value: 'albuquerque', description: 'Population: 560,513' },
      { label: 'Arlington', value: 'arlington', description: 'Population: 398,112', disabled: true },
      {
        label: 'Atlanta',
        value: 'atlanta',
        description: 'Population: 488,800',
        disabled: true,
        tooltipProps: { content: 'Tooltip content' },
      },
    ];

    return <Combobox {...args} {...props} onChange={onChange} value={value} options={options} />;
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const OptionWithTooltip: StoryObj<typeof Combobox> = {
  render: (args) => {
    const props = useControlledCombobox();
    const [value, setValue] = useState<string>();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

    const options: City[] = [
      { label: 'Albuquerque', value: 'albuquerque', description: 'Population: 560,513' },
      {
        label: 'Arlington',
        value: 'arlington',
        description: 'Population: 398,112',
        tooltipProps: { content: 'Tooltip content' },
      },
      { label: 'Atlanta', value: 'atlanta', description: 'Population: 488,800' },
    ];

    return <Combobox {...args} {...props} onChange={onChange} value={value} options={options} />;
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
