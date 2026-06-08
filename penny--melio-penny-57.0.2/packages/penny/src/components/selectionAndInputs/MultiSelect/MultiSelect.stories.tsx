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
import { commonFormFieldControls } from '@/test-utils/stories.utils';

import { MultiSelect, MultiSelectFooter } from '.';
import type { City } from './__fixtures__/mock-data';
import { cities, citiesByRegion } from './__fixtures__/mock-data';
import type { MultiSelectProps } from './MultiSelect.types';

const args: MultiSelectProps<string, City> = {
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
  onChange: undefined,
  autoFocus: false,
  'data-testid': 'multi-select',
};

const optionsType = `
type MultiSelectOption<V> = {
  value: V;
  label: string;
  disabled?: boolean;
  tooltipProps?: TooltipProps;
  testId?: string;
};

type MultiSelectSection<V, O extends MultiSelectOption<V>> = {
  label: ReactNode;
  options: O[];
  testId?: string;
};
`;

const meta: Meta<typeof MultiSelect> = {
  title: 'Selection & Inputs Components/Multi Select',
  component: MultiSelect,
  parameters: {
    docs: { source: { type: 'code' } },
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'The options in the dropdown menu.',
      type: { required: true, value: 'array', name: 'other' },
      table: {
        type: { summary: 'MultiSelectOption<V>[] | MultiSelectSection<V, O>[]', detail: optionsType },
        category: 'props',
      },
    },
    emptyState: {
      control: false,
      description: 'The multi-select menu content when there are no options.',
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
      description: "The selected values of the multi-select.<br />**They must exist in its options' values**.",
      table: { type: { summary: 'V[] | undefined' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'multi-select' }, type: { summary: 'string' }, category: 'tests' },
    },
    autoFocus: {
      control: 'boolean',
      description: 'Set the trigger to be focused on mount.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    footer: {
      control: false,
      description:
        'The footer of the multi-select.<br />You can use `MultiSelectFooter` component to get the conventional paddings for the content.',
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
        type: { summary: '(option: MultiSelectOption<V>, isSelected: boolean) => ReactNode' },
        category: 'props',
      },
    },
    valueRenderer: {
      control: false,
      description: "A function to render the trigger's content using the selected values.",
      table: {
        type: { summary: '(selectedOptions: MultiSelectOption<V>[]) => ReactNode' },
        category: 'props',
      },
    },
    onChange: {
      control: false,
      description: "An event called when the multi-select's value changes.",
      table: { type: { summary: 'ChangeEventHandler<HTMLInputElement>' }, category: 'events' },
    },
    onFocus: {
      control: false,
      description: 'An event called when the multi-select is focused.',
      table: { type: { summary: 'FocusEventHandler<HTMLInputElement>' }, category: 'events' },
    },
    onBlur: {
      control: false,
      description: 'An event called when the multi-select is blurred.',
      table: { type: { summary: 'FocusEventHandler<HTMLInputElement>' }, category: 'events' },
    },
    onClick: {
      control: false,
      description: 'An event called when the multi-select is clicked.',
      table: { type: { summary: 'MouseEventHandler<HTMLInputElement>' }, category: 'events' },
    },
    isRequired: { table: { disable: true } },
    id: { table: { disable: true } },
    autoComplete: commonFormFieldControls['autoComplete'],
  },
  args: args as Meta<typeof MultiSelect>['args'],
};
export default meta;

export const Main: StoryObj<typeof MultiSelect> = {
  render: (args) => <MultiSelect {...args} />,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Placeholder: StoryObj<typeof MultiSelect> = {
  render: (args) => {
    const items = [
      { label: 'Default', component: <MultiSelect {...args} /> },
      { label: 'Custom', component: <MultiSelect {...args} placeholder="Select cities" /> },
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
 * This story demonstrates the empty state of the `MultiSelect` menu.<br />
 * **Note that the** `emptyState` **content should always correspond to the empty message to meet a11y requirements.**
 */
export const EmptyState: StoryObj<typeof MultiSelect> = {
  render: (args) => {
    const items = [
      { label: 'Default', component: <MultiSelect {...args} options={[]} /> },
      {
        label: 'Custom',
        component: <MultiSelect {...args} options={[]} emptyState="No cities" menuEmptyStateMessage="No cities" />,
      },
      {
        label: 'With CTA',
        component: (
          <MultiSelect
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

export const WithInitialValue: StoryObj<typeof MultiSelect> = {
  render: () => {
    const [value, setValue] = useState(['new_york', 'sacramento']);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value as unknown as string[]);
    };

    return <MultiSelect {...args} value={value} onChange={onChange} />;
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Sizes: StoryObj<typeof MultiSelect> = {
  render: (args) => {
    const items = [
      { label: 'Small', component: <MultiSelect {...args} size="small" /> },
      { label: 'Large', component: <MultiSelect {...args} size="large" /> },
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

export const Invalid: StoryObj<typeof MultiSelect> = {
  render: (args) => <MultiSelect {...args} isInvalid />,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Disabled: StoryObj<typeof MultiSelect> = {
  render: () => {
    const items = [
      { label: 'Without value', component: <MultiSelect {...args} isDisabled /> },
      {
        label: 'With value',
        component: <MultiSelect {...args} value={['new_york', 'chicago']} onChange={noop} isDisabled />,
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

export const ReadOnly: StoryObj<typeof MultiSelect> = {
  render: () => {
    const items = [
      { label: 'Without value', component: <MultiSelect {...args} isReadOnly /> },
      {
        label: 'With value',
        component: <MultiSelect {...args} value={['new_york', 'chicago']} onChange={noop} isReadOnly />,
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

export const Loading: StoryObj<typeof MultiSelect> = {
  render: () => {
    const items = [
      { label: 'Without value', component: <MultiSelect {...args} isLoading /> },
      {
        label: 'With value',
        component: <MultiSelect {...args} value={['new_york', 'chicago']} onChange={noop} isLoading />,
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

export const ViewMode: StoryObj<typeof MultiSelect> = {
  render: () => {
    const items = [
      { label: 'Without value', component: <MultiSelect {...args} isViewMode /> },
      {
        label: 'With value',
        component: <MultiSelect {...args} value={['new_york', 'chicago']} onChange={noop} isViewMode />,
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

export const WithFooter: StoryObj<typeof MultiSelect> = {
  render: (args) => {
    const items = [
      {
        label: 'Custom content',
        component: (
          <MultiSelect
            {...args}
            footer={
              <MultiSelectFooter>
                <Storybook.ContentPlaceholder />
              </MultiSelectFooter>
            }
          />
        ),
      },
      {
        label: 'With CTA',
        component: (
          <MultiSelect
            {...args}
            footer={
              <MultiSelectFooter>
                <Button
                  label="Add new city"
                  variant="secondary"
                  size="small"
                  isFullWidth
                  leftElement={<Icon type="add" size="small" color="inherit" aria-hidden />}
                />
              </MultiSelectFooter>
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
 * This story demonstrates usage of the `MultiSelect` component with custom menu width and max-width.<br />
 * Click the "Width options" button to change the menu width.
 */
export const WithCustomMenuWidth: StoryObj<typeof MultiSelect> = {
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
            <Text textStyle="body3">Current menu max-width: &quot;{menuWidthProps.maxWidth ?? 'none'}&quot;</Text>
          </Group>
        </Group>
        <MultiSelect {...args} menuWidth={menuWidthProps.width} menuMaxWidth={menuWidthProps.maxWidth} />
      </Group>
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const WithSections: StoryObj<typeof MultiSelect> = {
  render: (args) => <MultiSelect {...args} options={citiesByRegion} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * Use `valueRenderer` prop to render anything you'd like in the trigger as the selected value.<br />
 * Use `optionRenderer` prop to render anything you'd like in each option.
 */
export const CustomTriggerAndOptionContent: StoryObj<typeof MultiSelect> = {
  render: () => {
    const [value, setValue] = useState(['new_york', 'sacramento']);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value as unknown as string[]);
    };

    const valueRenderer = (selectedOptions: City[]) => (
      <Group spacing="xxs">
        {selectedOptions.map((selectedOption, index) => (
          <Container
            key={`${selectedOption.label}-${index}`}
            width="fit-content"
            border="regular"
            paddingX="xs"
            paddingY="xxs"
          >
            <Group alignItems="center" spacing="xs">
              <BrandSymbol type="melio" size="small" aria-hidden />
              <Text textStyle="inline" shouldSupportEllipsis>
                {selectedOption.label}
              </Text>
            </Group>
          </Container>
        ))}
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
      <MultiSelect
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
 * To get type safety and intellisense for the `description` property in this example, we extend `MultiSelectOption` like so:<br />
 * `type City = MultiSelectOption<string> & { description: string }`
 */
export const MultiLineCustomTriggerAndOptionContent: StoryObj<typeof MultiSelect> = {
  render: () => {
    const [value, setValue] = useState(['new_york', 'sacramento']);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value as unknown as string[]);
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

    const valueRenderer = (selectedOptions: City[]) => (
      <Container paddingY="xxs" justifyContent="flex-start">
        <Group spacing="xxs">
          {selectedOptions.map((selectedOption, index) => (
            <Container
              key={`${selectedOption.label}-${index}`}
              width="fit-content"
              border="regular"
              paddingX="xs"
              paddingY="xs-s"
            >
              <CustomContent option={selectedOption} />
            </Container>
          ))}
        </Group>
      </Container>
    );

    const optionRenderer = (option: City, isSelected: boolean) => (
      <CustomContent option={option} isSelected={isSelected} />
    );

    return (
      <MultiSelect
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

export const WithFormField: StoryObj<typeof MultiSelect> = {
  render: (args) => (
    <FormField
      labelProps={{
        label: 'City',
        id: 'city',
      }}
      helperText="This indicates what type of person you are."
      render={(props) => <MultiSelect {...args} {...props} />}
    />
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const WithDisabledOption: StoryObj<typeof MultiSelect> = {
  render: (args) => {
    const [value, setValue] = useState(['new_york', 'sacramento']);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value as unknown as string[]);
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

    return <MultiSelect {...args} onChange={onChange} value={value} options={options} />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
