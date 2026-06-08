/* eslint-disable @typescript-eslint/no-deprecated */
import { Box } from '@chakra-ui/react';
import { useBoolean } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ChangeEvent, CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { userEvent, within } from 'storybook/test';
import { Storybook } from 'storybook-utils';
import type { SchemaOf } from 'yup';
import * as yup from 'yup';

import { Button } from '@/components/action/Button';
import { NakedButton } from '@/components/action/NakedButton';
import { Container } from '@/components/containers/Container';
import { Group } from '@/components/containers/Group';
import { Menu, MenuItem } from '@/components/containers/menus/Menu';
import { Avatar } from '@/components/dataDisplay/Avatar';
import { BrandSymbol } from '@/components/dataDisplay/BrandSymbol';
import { Text } from '@/components/dataDisplay/Text';
import { Typography } from '@/components/dataDisplay/typography';
import { useMelioForm } from '@/components/form/hooks';
import { Icon } from '@/components/foundations/Icon';
import { SelectNewFooter } from '@/components/selectionAndInputs/SelectNew/components/Footer';
import { commonFormFieldArgs, commonFormFieldControls } from '@/test-utils/stories.utils';
import { fullScreenChromaticDecorator, isUsingVisualTesting } from '@/test-utils/storybook.utils';

import { Form } from '../..';
import { cities, citiesByRegion, type City } from './__fixtures__/select-new-mock-data';

const play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  if (!isUsingVisualTesting()) return;

  await userEvent.click(within(canvasElement).getByRole('combobox'));
};

const optionsType = `
type SelectNewOption<V> = {
  value: V;
  label: string;
  disabled?: {
    isDisabled: boolean;
    /**
     * Message to show in a tooltip when hovering over a disabled option.
     */
    message?: string;
  };
  testId?: string;
};

type SelectNewSection<V, O extends SelectNewOption<V>> = {
  label: ReactNode;
  options: O[];
  testId?: string;
};
`;

const searchBarPropsType = `SearchBarProps & Pick<SelectNewProps<V, O>, 'options'>`;

/**
 * We recommend using `FormField` component to wrap the `SelectNew` component:
 * ```
 * <FormField
 *  {...registerField('standalone-select')}
 *  helperText="This indicates what type of person you are."
 *  labelProps={{ label: 'City' }}
 *  render={(props) => (<SelectNew {...props} options={options} />)}
 * />
 * ```
 */
const meta: Meta<typeof Form.SelectNew> = {
  title: 'Internal Components/Form Fields/Select New',
  component: Form.SelectNew,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    ...commonFormFieldControls,
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
    'aria-label': {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The aria-label for the select component.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text for when there is no value.',
      table: { defaultValue: { summary: 'Select' }, type: { summary: 'string' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { type: { summary: 'string' }, category: 'tests' },
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
    autoComplete: commonFormFieldControls['autoComplete'],
  },
  args: {
    options: cities,
    labelProps: { label: 'City' },
    helperTextProps: { label: 'This indicates what type of person you are.' },
    placeholder: undefined,
    viewModePlaceholder: 'No city selected',
    emptyState: undefined,
    footer: undefined,
    menuWidth: 'match-trigger',
    menuMaxWidth: undefined,
    menuAriaLabel: 'Cities',
    shouldHideClearButton: false,
    isLoading: false,
    isInvalid: false,
    ...commonFormFieldArgs,
    size: 'large',
  },
};
export default meta;

export const Main: StoryObj<typeof Form.SelectNew> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <Form.SelectNew {...registerField('main')} {...args} />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: async ({ canvasElement }) => {
    if (!isUsingVisualTesting()) return;

    await userEvent.click(within(canvasElement).getByRole('combobox'));
    await userEvent.keyboard('[KeyS][KeyS][KeyS]');
    // https://github.com/storybookjs/storybook/issues/16971#issuecomment-1186028103
    await userEvent.hover(within(canvasElement.ownerDocument.body).getByRole('option', { name: /San An/ }));
  },
};

export const Placeholder: StoryObj<typeof Form.SelectNew> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    const items = [
      {
        label: 'Default',
        component: (
          <Form>
            <Form.SelectNew {...registerField('defaultPlaceholder')} {...args} />
          </Form>
        ),
      },
      {
        label: 'Custom',
        component: (
          <Form>
            <Form.SelectNew {...registerField('customPlaceholder')} {...args} placeholder="Select a city" />
          </Form>
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
  parameters: { chromatic: { delay: 1000 } },
};

/**
 * This story demonstrates the empty state of the `SelectNew` menu.<br />
 * **Note that the** `emptyState` **content should always correspond to the empty message to meet a11y requirements.**
 */
export const EmptyState: StoryObj<typeof Form.SelectNew> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    const items = [
      {
        label: 'Default',
        component: (
          <Form>
            <Form.SelectNew {...registerField('defaultEmptyState')} {...args} options={[]} />
          </Form>
        ),
      },
      {
        label: 'Custom',
        component: (
          <Form>
            <Form.SelectNew
              {...registerField('customEmptyState')}
              {...args}
              options={[]}
              emptyState="No cities"
              menuEmptyStateMessage="No cities"
            />
          </Form>
        ),
      },
      {
        label: 'With CTA',
        component: (
          <Form>
            <Form.SelectNew
              {...registerField('emptyStateWithCta')}
              {...args}
              options={[]}
              emptyState={
                <Container justifyContent="flex-start" overflow="visible">
                  <NakedButton variant="secondary" size="large" label="Add a city" />
                </Container>
              }
              menuEmptyStateMessage="No cities available, press the button to add a city"
            />
          </Form>
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
  decorators: [fullScreenChromaticDecorator],
  parameters: { chromatic: { delay: 1000 } },
  play: async ({ canvasElement }) => {
    if (!isUsingVisualTesting()) return;

    await userEvent.click(within(canvasElement).getByTestId('form-input-defaultEmptyState-trigger-input'));
  },
};

export const WithInitialValue: StoryObj<typeof Form.SelectNew> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { withInitialValue: 'atlanta' }, onSubmit: () => null });

    return (
      <Form>
        <Form.SelectNew {...registerField('withInitialValue')} {...args} />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],

  play,
};

export const Sizes: StoryObj<typeof Form.SelectNew> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    const items = [
      {
        label: 'Small',
        component: (
          <Form>
            <Form.SelectNew {...registerField('small')} {...args} size="small" />
          </Form>
        ),
      },
      {
        label: 'Large',
        component: (
          <Form>
            <Form.SelectNew {...registerField('large')} {...args} size="large" />
          </Form>
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

/**
 * Use `shouldHideClearButton` prop if you want enforce the user to select an option without the ability to clear it.
 */
export const HideClearButton: StoryObj<typeof Form.SelectNew> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { noClear: 'atlanta' }, onSubmit: () => null });

    return (
      <Form>
        <Form.SelectNew {...registerField('noClear')} {...args} shouldHideClearButton />
      </Form>
    );
  },
};

export const Invalid: StoryObj<typeof Form.SelectNew> = {
  render: (args) => {
    const { registerField, setError } = useMelioForm({ onSubmit: () => null });

    useEffect(() => {
      setError('invalid', { message: 'You must select a city' });
    }, [setError]);

    return (
      <Form>
        <Form.SelectNew {...registerField('invalid')} {...args} isInvalid />
      </Form>
    );
  },
};

/**
 `FormField` with `isRequired` will have `*` next to the required field label.
 */
export const Required: StoryObj<typeof Form.SelectNew> = {
  render: (args) => {
    type FormFields = { optional: string; required: string };

    const schema = yup.object().shape({
      optional: yup.string(),
      required: yup.string().required(),
    }) as SchemaOf<FormFields>;

    const { registerField } = useMelioForm<FormFields>({
      schema,
      defaultValues: { required: 'new_york', optional: 'new_york' },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Required',
        component: (
          <Form>
            <Form.SelectNew {...args} {...registerField('required')} />
          </Form>
        ),
      },
      {
        label: 'Optional',
        component: (
          <Form>
            <Form.SelectNew {...args} {...registerField('optional')} />
          </Form>
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

/**
 `FormField` with `showOptionalIndicator` will have `(optional)` next to the optional field label.
 */
export const ShowOptionalIndicator: StoryObj<typeof Form.SelectNew> = {
  render: ({ showOptionalIndicator, ...args }) => {
    type FormFields = { optionalIndicator: string };

    const schema = yup.object().shape({
      optionalIndicator: yup.string(),
    }) as SchemaOf<FormFields>;

    const { registerField } = useMelioForm<FormFields>({
      schema,
      showOptionalIndicator,
      defaultValues: { optionalIndicator: 'new_york' },
      onSubmit: () => null,
    });

    return (
      <Form>
        <Form.SelectNew {...args} {...registerField('optionalIndicator')} />
      </Form>
    );
  },
  args: { showOptionalIndicator: true },
};

export const Disabled: StoryObj<typeof Form.SelectNew> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { disabledWithValue: 'new_york', disabled: null },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Without default value',
        component: (
          <Form>
            <Form.SelectNew {...registerField('disabled')} {...args} isDisabled />
          </Form>
        ),
      },
      {
        label: 'With default value',
        component: (
          <Form>
            <Form.SelectNew {...registerField('disabledWithValue')} {...args} isDisabled />
          </Form>
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

export const ReadOnly: StoryObj<typeof Form.SelectNew> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { readOnlyWithValue: 'new_york', readOnly: null },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Without default value',
        component: (
          <Form>
            <Form.SelectNew {...registerField('readOnly')} {...args} isReadOnly />
          </Form>
        ),
      },
      {
        label: 'With default value',
        component: (
          <Form>
            <Form.SelectNew {...registerField('readOnlyWithValue')} {...args} isReadOnly />
          </Form>
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
    chromatic: { delay: 1000 },
  },
};

export const ViewMode: StoryObj<typeof Form.SelectNew> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { viewModeWithValue: 'new_york', viewMode: null },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Without default value',
        component: (
          <Form isViewMode>
            <Form.SelectNew {...registerField('viewMode')} {...args} />
          </Form>
        ),
      },
      {
        label: 'With default value',
        component: (
          <Form isViewMode>
            <Form.SelectNew {...registerField('viewModeWithValue')} {...args} />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" flexBasis={0} />;
  },
};

export const Loading: StoryObj<typeof Form.SelectNew> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { loadingWithValue: 'new_york', loading: null },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Without default value',
        component: (
          <Form>
            <Form.SelectNew {...registerField('loading')} {...args} isLoading />
          </Form>
        ),
      },
      {
        label: 'With default value',
        component: (
          <Form>
            <Form.SelectNew {...registerField('loadingWithValue')} {...args} isLoading />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" flexBasis={0} />;
  },
};

export const WithLabelTooltip: StoryObj<typeof Form.SelectNew> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <Form.SelectNew
          {...registerField('tooltip')}
          {...args}
          aria-label={undefined}
          labelProps={{
            label: 'City',
            tooltipProps: {
              content: (
                <>
                  <Box as="span" display="inline-flex" textStyle="body4Semi">
                    Title
                  </Box>
                  Label
                </>
              ),
            },
          }}
        />
      </Form>
    );
  },
  play: async ({ canvasElement }) => {
    if (!isUsingVisualTesting()) return;

    await userEvent.hover(within(canvasElement).getByTestId('label-tooltip-trigger'));
  },
};

export const WithSearchBar: StoryObj<typeof Form.SelectNew> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { searchBar: 'new_york' }, onSubmit: () => null });

    const [filteredOptions, setFilteredOptions] = useState<City[]>(cities);
    const [query, setQuery] = useState<string>('');

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setFilteredOptions(cities.filter((city) => city.label.toLowerCase().includes(e.target.value.toLowerCase())));
    };

    return (
      <Form>
        <Form.SelectNew
          {...registerField('searchBar')}
          {...args}
          searchBarProps={{
            value: query,
            onChange: onSearchChange,
            options: filteredOptions,
          }}
        />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: async ({ canvasElement }) => {
    if (!isUsingVisualTesting()) return;

    await userEvent.click(within(canvasElement).getByRole('button', { name: /city/i }));
    // https://github.com/storybookjs/storybook/issues/16971#issuecomment-1186028103
    await userEvent.type(within(canvasElement.ownerDocument.body).getByRole('combobox'), 'new');
  },
};

export const WithFooter: StoryObj<typeof Form.SelectNew> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    const items = [
      {
        label: 'Custom content',
        component: (
          <Form>
            <Form.SelectNew
              {...registerField('footer')}
              {...args}
              footer={
                <SelectNewFooter>
                  <Storybook.ContentPlaceholder />
                </SelectNewFooter>
              }
            />
          </Form>
        ),
      },
      {
        label: 'With CTA',
        component: (
          <Form>
            <Form.SelectNew
              {...registerField('footerWithCta')}
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
          </Form>
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
  decorators: [fullScreenChromaticDecorator],
  play: async ({ canvasElement }) => {
    if (!isUsingVisualTesting()) return;

    await userEvent.click(within(canvasElement).getByTestId('form-input-footer-trigger-input'));
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
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

export const WithCustomMenuWidth: StoryObj<typeof Form.SelectNew> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

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
        <Form>
          <Form.SelectNew
            {...registerField('customMenuWidth')}
            {...args}
            menuWidth={menuWidthProps.width}
            menuMaxWidth={menuWidthProps.maxWidth}
          />
        </Form>
      </Group>
    );
  },
  parameters: { chromatic: { disableSnapshot: true } },
};

export const WithSections: StoryObj<typeof Form.SelectNew> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <Form.SelectNew {...registerField('sections')} {...args} options={citiesByRegion} />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: async ({ canvasElement }) => {
    if (!isUsingVisualTesting()) return;

    await userEvent.click(within(canvasElement).getByRole('combobox'));
    await userEvent.keyboard('[KeyD]');
  },
};

/**
 * Use `valueRenderer` prop to render anything you'd like in the trigger as the selected value.<br />
 * Use `optionRenderer` prop to render anything you'd like in each option.
 */
export const CustomTriggerAndOptionContent: StoryObj<typeof Form.SelectNew> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { customTriggerAndOptionContent: 'atlanta' },
      onSubmit: () => null,
    });

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
      <Form>
        <Form.SelectNew
          {...registerField('customTriggerAndOptionContent')}
          {...args}
          valueRenderer={valueRenderer as never}
          optionRenderer={optionRenderer as never}
        />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],

  play,
};

/**
 * To get type safety and intellisense for the `description` property in this example, we extend `FormSelectNewOption` like so:<br />
 * `type City = FormSelectNewOption<string> & { description: string }`
 */
export const MultiLineCustomTriggerAndOptionContent: StoryObj<typeof Form.SelectNew> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { multiLineCustomTriggerAndOptionContent: 'atlanta' },
      onSubmit: () => null,
    });

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
      <Form>
        <Form.SelectNew
          {...registerField('multiLineCustomTriggerAndOptionContent')}
          {...args}
          valueRenderer={valueRenderer as never}
          optionRenderer={optionRenderer as never}
        />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],

  play,
};

/**
 * This example demonstrates how to visually hide a field from the UI while keeping it present in the DOM.<br />
 * Use the `isHidden` prop to hide the field, and inspect the DOM using developer tools to see the `data-hidden` attribute.<br />
 *
 * **Note:** To prevent the field from rendering entirely, use the React pattern: `{condition && <Form.SelectNew ... />}`.<br />
 */
export const IsHidden: StoryObj<typeof Form.SelectNew> = {
  render: (args) => {
    const [isFieldHidden, setIsFieldHidden] = useBoolean(true);
    const { registerField } = useMelioForm({
      onSubmit: () => null,
    });

    return (
      <Group variant="vertical">
        <Storybook.Container maxWidth="150px">
          <Button label={`${isFieldHidden ? 'Show' : 'Hide'} Field`} onClick={setIsFieldHidden.toggle} />
        </Storybook.Container>
        <Form>
          {/* Field with isHidden prop, hidden from UI but still exists in the DOM */}
          <Form.SelectNew {...registerField('field1')} {...args} isHidden={isFieldHidden} />
          {/* Field conditionally rendered based on `isFieldHidden` */}
          {!isFieldHidden && <Form.SelectNew {...registerField('field2')} {...args} />}
        </Form>
      </Group>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
