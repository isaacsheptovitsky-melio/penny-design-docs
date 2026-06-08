import { noop } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ChangeEvent, CSSProperties } from 'react';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { NakedButton } from '@/components/action/NakedButton';
import { Container } from '@/components/containers/Container';
import { Group } from '@/components/containers/Group';
import { Menu, MenuItem } from '@/components/containers/menus/Menu';
import { Avatar } from '@/components/dataDisplay/Avatar';
import { BrandSymbol } from '@/components/dataDisplay/BrandSymbol';
import { Text } from '@/components/dataDisplay/Text';
import { Typography } from '@/components/dataDisplay/typography';
import { FormField } from '@/components/form/components/FormField';
import { Icon } from '@/components/foundations/Icon';
import { SelectNewFooter } from '@/components/selectionAndInputs/SelectNew/components/Footer';
import { commonFormFieldControls } from '@/test-utils/stories.utils';

import { SelectNew } from '..';
import type { City } from '../__fixtures__/mock-data';
import { cities, citiesByRegion } from '../__fixtures__/mock-data';
import type { SelectNewProps } from '../SelectNew.types';

const args: SelectNewProps<string, City> = {
  options: cities,
  value: undefined,
  placeholder: undefined,
  viewModePlaceholder: 'No city selected',
  emptyState: undefined,
  footer: undefined,
  menuWidth: 'match-trigger',
  menuMaxWidth: undefined,
  menuAriaLabel: 'Cities',
  size: 'large',
  isDisabled: false,
  isReadOnly: false,
  isLoading: false,
  isViewMode: false,
  isInvalid: false,
  shouldHideClearButton: false,
  onChange: undefined,
  autoFocus: false,
};

const optionsType = `
type SelectNewOption<V> = {
  value: V;
  label: string;
  disabled?: boolean;
  tooltipProps?: TooltipProps;
  testId?: string;
};

type SelectNewSection<V, O extends SelectNewOption<V>> = {
  label: ReactNode;
  options: O[];
  testId?: string;
};
`;

const searchBarPropsType = `SearchBarProps & Pick<SelectNewProps<V, O>, 'options'>`;

const meta: Meta<typeof SelectNew> = {
  title: 'Selection & Inputs Components/Select New',
  component: SelectNew,
  parameters: {
    docs: { source: { type: 'code' } },
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'The options in the dropdown menu.',
      type: { required: true, value: 'array', name: 'other' },
      table: {
        type: { summary: 'SelectNewOption<V>[] | SelectNewSection<V, O>[]', detail: optionsType },
        category: 'props',
      },
    },
    emptyState: {
      control: false,
      description: 'Sets the message in select menu when there are no options.',
      table: { defaultValue: { summary: 'No options' }, type: { summary: 'ReactNode' }, category: 'props' },
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
    shouldHideClearButton: {
      control: 'boolean',
      description: 'Hides the clear button when the field has a value.',
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
      table: { defaultValue: { summary: 'Select' }, type: { summary: 'string' }, category: 'props' },
    },
    viewModePlaceholder: {
      control: 'text',
      description: 'The placeholder text for when there is no value and the field is in view-mode.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    value: {
      control: 'text',
      description: "The value of the select.<br />**It must exist as one of its options' values**.",
      table: { type: { summary: 'V | undefined' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'select-new' }, type: { summary: 'string' }, category: 'tests' },
    },
    autoFocus: {
      control: 'boolean',
      description: 'Set the trigger to be focused on mount.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    searchBarProps: {
      control: false,
      description: 'Props to pass to the search bar.',
      table: {
        type: { summary: 'SelectSearchBarProps<V, O extends SelectNewOption<V>>', detail: searchBarPropsType },
        category: 'props',
      },
    },
    footer: {
      control: false,
      description:
        'The footer of the select.<br />You can use `SelectNew.Footer` component to get the conventional paddings for the content.',
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
    menuEmptyStateMessage: {
      control: 'text',
      description:
        'The status message that will be announced by screen readers when the menu is empty.<br />If no empty state is provided, this message will be shown inside the menu.<br />**Note that the** `emptyState` **content should always correspond to its parallel status message to meet a11y requirements.**',
      table: {
        defaultValue: { summary: 'No options' },
        type: { summary: 'string' },
        category: 'accessibility',
      },
    },
    optionRenderer: {
      control: false,
      description: "A function to render the options' content.",
      table: {
        type: { summary: '(option: SelectNewOption<V>, isSelected: boolean) => ReactNode' },
        category: 'props',
      },
    },
    valueRenderer: {
      control: false,
      description: "A function to render the trigger's content using the selected value.",
      table: { type: { summary: '(selectedOption: SelectNewOption<V>) => ReactNode' }, category: 'props' },
    },
    onChange: {
      control: false,
      description: "An event called when the select's value changes.",
      table: { type: { summary: 'ChangeEventHandler<HTMLInputElement>' }, category: 'events' },
    },
    onFocus: {
      control: false,
      description: 'An event called when the select is focused.',
      table: { type: { summary: 'FocusEventHandler<HTMLInputElement>' }, category: 'events' },
    },
    onBlur: {
      control: false,
      description: 'An event called when the select is blurred.',
      table: { type: { summary: 'FocusEventHandler<HTMLInputElement>' }, category: 'events' },
    },
    onClick: {
      control: false,
      description: 'An event called when the select is clicked.',
      table: { type: { summary: 'MouseEventHandler<HTMLInputElement>' }, category: 'events' },
    },
    onClear: {
      control: false,
      description: 'An event called when the clear button is clicked.',
      table: { type: { summary: 'VoidFunction' }, category: 'events' },
    },
    onMenuOpen: {
      control: false,
      description: 'An event called when the menu is opened.',
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
  },
  args: args as Meta<typeof SelectNew>['args'],
};
export default meta;

export const Main: StoryObj<typeof SelectNew> = {
  render: (args) => {
    const [value, setValue] = useState<string>();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return <SelectNew {...args} onChange={onChange} value={value} />;
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Placeholder: StoryObj<typeof SelectNew> = {
  render: (args) => {
    const items = [
      { label: 'Default', component: <SelectNew {...args} /> },
      { label: 'Custom', component: <SelectNew {...args} placeholder="Select a city" /> },
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
 * This story demonstrates the empty state of the `SelectNew` menu.<br />
 * **Note that the** `emptyState` **content should always correspond to the empty message to meet a11y requirements.**
 */
export const EmptyState: StoryObj<typeof SelectNew> = {
  render: (args) => {
    const items = [
      { label: 'Default', component: <SelectNew {...args} options={[]} /> },
      {
        label: 'Custom',
        component: <SelectNew {...args} options={[]} emptyState="No cities" menuEmptyStateMessage="No cities" />,
      },
      {
        label: 'With CTA',
        component: (
          <SelectNew
            {...args}
            options={[]}
            emptyState={
              <Container justifyContent="flex-start" overflow="visible">
                <NakedButton variant="secondary" size="large" label="Add a city" />
              </Container>
            }
            menuEmptyStateMessage="No cities available, press the button to add a city"
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

export const WithInitialValue: StoryObj<typeof SelectNew> = {
  render: (args) => {
    const [value, setValue] = useState<string>('atlanta');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return <SelectNew {...args} onChange={onChange} value={value} />;
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Sizes: StoryObj<typeof SelectNew> = {
  render: (args) => {
    const items = [
      { label: 'Small', component: <SelectNew {...args} size="small" /> },
      { label: 'Large', component: <SelectNew {...args} size="large" /> },
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
 * Use `shouldHideClearButton` prop if you want enforce the user to select an option without the ability to clear it.
 */
export const HideClearButton: StoryObj<typeof SelectNew> = {
  render: () => {
    const [value, setValue] = useState<string>('atlanta');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return <SelectNew {...args} value={value} onChange={onChange} shouldHideClearButton />;
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Invalid: StoryObj<typeof SelectNew> = {
  render: (args) => <SelectNew {...args} isInvalid />,
};

export const Disabled: StoryObj<typeof SelectNew> = {
  render: () => {
    const items = [
      { label: 'Without value', component: <SelectNew {...args} isDisabled /> },
      { label: 'With value', component: <SelectNew {...args} value="new_york" onChange={noop} isDisabled /> },
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

export const ReadOnly: StoryObj<typeof SelectNew> = {
  render: () => {
    const items = [
      { label: 'Without value', component: <SelectNew {...args} isReadOnly /> },
      { label: 'With value', component: <SelectNew {...args} value="new_york" onChange={noop} isReadOnly /> },
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
    chromatic: { delay: 1000, disableSnapshot: true },
  },
};

export const ViewMode: StoryObj<typeof SelectNew> = {
  render: () => {
    const items = [
      { label: 'Without value', component: <SelectNew {...args} isViewMode /> },
      { label: 'With value', component: <SelectNew {...args} value="new_york" onChange={noop} isViewMode /> },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" flexBasis={0} />;
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Loading: StoryObj<typeof SelectNew> = {
  render: () => {
    const items = [
      { label: 'Without value', component: <SelectNew {...args} isLoading /> },
      { label: 'With value', component: <SelectNew {...args} value="new_york" onChange={noop} isLoading /> },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" flexBasis={0} />;
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const WithSearchBar: StoryObj<typeof SelectNew> = {
  render: (args) => {
    const [filteredOptions, setFilteredOptions] = useState<City[]>(cities);
    const [query, setQuery] = useState<string>('');
    const [value, setValue] = useState<string>();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setQuery('');
      setFilteredOptions(cities);
      setValue(e.target.value);
    };

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setFilteredOptions(cities.filter((city) => city.label.toLowerCase().includes(e.target.value.toLowerCase())));
    };

    return (
      <SelectNew
        {...args}
        onChange={onChange}
        value={value}
        searchBarProps={{
          value: query,
          onChange: onSearchChange,
          options: filteredOptions,
        }}
      />
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const WithFooter: StoryObj<typeof SelectNew> = {
  render: (args) => {
    const items = [
      {
        label: 'Custom content',
        component: (
          <SelectNew
            {...args}
            footer={
              <SelectNewFooter>
                <Storybook.ContentPlaceholder />
              </SelectNewFooter>
            }
          />
        ),
      },
      {
        label: 'With CTA',
        component: (
          <SelectNew
            {...args}
            footer={
              <SelectNewFooter>
                <Button
                  label="Add new city"
                  variant="secondary"
                  size="small"
                  isFullWidth
                  leftElement={<Icon type="add" size="small" color="inherit" aria-hidden />}
                />
              </SelectNewFooter>
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

export const WithCustomMenuWidth: StoryObj<typeof SelectNew> = {
  render: (args) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [menuWidthProps, setMenuWidthProps] = useState<MenuWidthOptions>(menuWidthOptions[0]);

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
            {menuWidthProps.maxWidth && (
              <Text textStyle="body3">Current menu max-width: &quot;{menuWidthProps.maxWidth}&quot;</Text>
            )}
          </Group>
        </Group>
        <SelectNew {...args} menuWidth={menuWidthProps.width} menuMaxWidth={menuWidthProps.maxWidth} />
      </Group>
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const WithSections: StoryObj<typeof SelectNew> = {
  render: (args) => <SelectNew {...args} options={citiesByRegion} />,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * Use `valueRenderer` prop to render anything you'd like in the trigger as the selected value.<br />
 * Use `optionRenderer` prop to render anything you'd like in each option.
 */
export const CustomTriggerAndOptionContent: StoryObj<typeof SelectNew> = {
  render: () => {
    const [value, setValue] = useState<string>('atlanta');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

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
      <SelectNew
        {...args}
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
 * To get type safety and intellisense for the `description` property in this example, we extend `SelectNewOption` like so:<br />
 * `type City = SelectNewOption<string> & { description: string }`
 */
export const MultiLineCustomTriggerAndOptionContent: StoryObj<typeof SelectNew> = {
  render: () => {
    const [value, setValue] = useState<string>('atlanta');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

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
      <SelectNew
        {...args}
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

export const WithFormField: StoryObj<typeof SelectNew> = {
  render: (args) => (
    <FormField
      labelProps={{
        label: 'City',
        id: 'city',
      }}
      helperText="This indicates what type of person you are."
      render={(props) => <SelectNew {...args} {...props} />}
    />
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const WithDisabledOption: StoryObj<typeof SelectNew> = {
  render: (args) => {
    const [value, setValue] = useState<string>();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

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

    return <SelectNew {...args} onChange={onChange} value={value} options={options} />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const OptionWithTooltip: StoryObj<typeof SelectNew> = {
  render: (args) => {
    const [value, setValue] = useState<string>();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

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

    return <SelectNew {...args} onChange={onChange} value={value} options={options} />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const ControlledMenu: StoryObj<typeof SelectNew> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [options, setOptions] = useState<City[]>(cities);
    const [filteredOptions, setFilteredOptions] = useState<City[]>(cities);

    const handleCreateNew = () => {
      if (searchValue) {
        const newOption: City = {
          label: searchValue,
          value: searchValue,
          description: `${searchValue} description`,
        };
        setOptions((prevCities: City[]) => [...prevCities, newOption]);
        setFilteredOptions((prevOptions: City[]) => [...prevOptions, newOption]);
      }

      setSearchValue('');
      setIsOpen(false);
    };

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
      setFilteredOptions(options.filter((city) => city.label.toLowerCase().includes(e.target.value.toLowerCase())));
    };

    return (
      <SelectNew
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placeholder="Select an option"
        viewModePlaceholder="view mode placeholder"
        footer={
          <SelectNewFooter>
            <Button
              variant="secondary"
              data-testid="accounting-platform-select-create-new"
              isFullWidth
              onClick={handleCreateNew}
              label="Create new"
            />
          </SelectNewFooter>
        }
        emptyState="emptyState"
        isViewMode={false}
        isReadOnly={false}
        searchBarProps={{
          value: searchValue,
          onChange: onSearchChange,
          options: filteredOptions,
        }}
        options={filteredOptions}
      />
    );
  },
};
