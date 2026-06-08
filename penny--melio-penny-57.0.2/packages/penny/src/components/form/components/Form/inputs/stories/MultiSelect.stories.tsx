/* eslint-disable @typescript-eslint/no-deprecated */
import { Box } from '@chakra-ui/react';
import { useBoolean } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
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
import { useMelioForm } from '@/components/form/hooks/useMelioForm';
import { Icon } from '@/components/foundations/Icon';
import { MultiSelectFooter } from '@/components/selectionAndInputs/MultiSelect';
import { commonFormFieldArgs, commonFormFieldControls } from '@/test-utils/stories.utils';
import { fullScreenChromaticDecorator, isUsingVisualTesting } from '@/test-utils/storybook.utils';

import { Form } from '../..';
import { cities, citiesByRegion, type City } from './__fixtures__/multi-select-mock-data';

const play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  if (!isUsingVisualTesting()) return;

  await userEvent.click(within(canvasElement).getByRole('combobox'));
};

const showDisabledOption = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  if (!isUsingVisualTesting()) return;

  await userEvent.click(within(canvasElement).getByRole('combobox'));
  // Helps us snapshot a disabled option in the menu.
  await userEvent.keyboard('sss');
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

/**
 * We recommend using `FormField` component to wrap the `MultiSelect` component:
 * ```
 * <FormField
 *  {...registerField('standalone-multi-select')}
 *  helperText="This indicates what type of person you are."
 *  labelProps={{ label: 'City' }}
 *  render={(props) => <MultiSelect {...props} options={options} />}
 * />
 * ```
 */
const meta: Meta<typeof Form.MultiSelect> = {
  title: 'Internal Components/Form Fields/Multi Select',
  component: Form.MultiSelect,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    ...commonFormFieldControls,
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
    value: {
      control: 'text',
      description: "The selected values of the multi-select.<br />**They must exist in its options' values**.",
      table: { type: { summary: 'V[] | undefined' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'multi-select' },
        category: 'tests',
      },
    },
    'aria-label': {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The aria-label for the multi-select component.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
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
    isLoading: false,
    isInvalid: false,
    'data-testid': 'multi-select',
    ...commonFormFieldArgs,
    size: 'large',
  },
};
export default meta;

export const Main: StoryObj<typeof Form.MultiSelect> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <Form.MultiSelect {...registerField('main')} {...args} />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: showDisabledOption,
};

export const Placeholder: StoryObj<typeof Form.MultiSelect> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    const items = [
      {
        label: 'Default',
        component: (
          <Form>
            <Form.MultiSelect {...registerField('default')} {...args} />
          </Form>
        ),
      },
      {
        label: 'Custom',
        component: (
          <Form>
            <Form.MultiSelect {...registerField('custom')} {...args} placeholder="Select cities" />
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
 * This story demonstrates the empty state of the `MultiSelect` menu.<br />
 * **Note that the** `emptyState` **content should always correspond to the empty message to meet a11y requirements.**
 */
export const EmptyState: StoryObj<typeof Form.MultiSelect> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    const items = [
      {
        label: 'Default',
        component: (
          <Form>
            <Form.MultiSelect {...registerField('default')} {...args} data-testid="multi-select-default" options={[]} />
          </Form>
        ),
      },
      {
        label: 'Custom',
        component: (
          <Form>
            <Form.MultiSelect
              {...registerField('custom')}
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
            <Form.MultiSelect
              {...registerField('withCta')}
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
  play: async ({ canvasElement }) => {
    if (!isUsingVisualTesting()) return;

    await userEvent.click(within(canvasElement).getByTestId('multi-select-default-trigger-input'));
  },
};

export const WithInitialValue: StoryObj<typeof Form.MultiSelect> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { defaultValue: ['atlanta', 'baltimore'] },
      onSubmit: () => null,
    });

    return (
      <Form>
        <Form.MultiSelect {...registerField('defaultValue')} {...args} />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],

  play,
};

export const Sizes: StoryObj<typeof Form.MultiSelect> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    const items = [
      {
        label: 'Small',
        component: (
          <Form>
            <Form.MultiSelect {...registerField('small')} {...args} size="small" />
          </Form>
        ),
      },
      {
        label: 'Large',
        component: (
          <Form>
            <Form.MultiSelect {...registerField('large')} {...args} size="large" />
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
    chromatic: { disableSnapshot: true },
  },
};

export const Invalid: StoryObj<typeof Form.MultiSelect> = {
  render: (args) => {
    const { registerField, setError } = useMelioForm({ onSubmit: () => null });

    useEffect(() => {
      setError('invalid', { message: 'You must select at least one city' });
    }, [setError]);

    return (
      <Form>
        <Form.MultiSelect {...registerField('invalid')} {...args} isInvalid />
      </Form>
    );
  },
};

/**
 `FormField` with `isRequired` will have `*` next to the required field label.
 */
export const Required: StoryObj<typeof Form.MultiSelect> = {
  render: (args) => {
    type FormFields = { optional: string[]; required: string[] };

    const schema = yup.object().shape({
      optional: yup.array().of(yup.string()),
      required: yup.array().of(yup.string()).required(),
    }) as SchemaOf<FormFields>;

    const { registerField } = useMelioForm<FormFields>({
      schema,
      defaultValues: { required: ['new_york', 'chicago'], optional: ['new_york', 'chicago'] },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Required',
        component: (
          <Form>
            <Form.MultiSelect {...args} {...registerField('required')} />
          </Form>
        ),
      },
      {
        label: 'Optional',
        component: (
          <Form>
            <Form.MultiSelect {...args} {...registerField('optional')} />
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
export const ShowOptionalIndicator: StoryObj<typeof Form.MultiSelect> = {
  render: ({ showOptionalIndicator, ...args }) => {
    type FormFields = { optional: string[] };

    const schema = yup.object().shape({
      optional: yup.array().of(yup.string()),
    }) as SchemaOf<FormFields>;

    const { registerField } = useMelioForm<FormFields>({
      schema,
      showOptionalIndicator,
      defaultValues: { optional: ['new_york', 'chicago'] },
      onSubmit: () => null,
    });

    return (
      <Form>
        <Form.MultiSelect {...args} {...registerField('optional')} />
      </Form>
    );
  },
  args: { showOptionalIndicator: true },
};

export const Disabled: StoryObj<typeof Form.MultiSelect> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { disabledWithValue: ['new_york', 'chicago'], disabled: null },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Without value',
        component: (
          <Form>
            <Form.MultiSelect {...registerField('disabled')} {...args} isDisabled />
          </Form>
        ),
      },
      {
        label: 'With value',
        component: (
          <Form>
            <Form.MultiSelect {...registerField('disabledWithValue')} {...args} isDisabled />
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

export const ReadOnly: StoryObj<typeof Form.MultiSelect> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { readOnlyWithValue: ['new_york', 'chicago'], readOnly: null },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Without value',
        component: (
          <Form>
            <Form.MultiSelect {...registerField('readOnly')} {...args} isReadOnly />
          </Form>
        ),
      },
      {
        label: 'With value',
        component: (
          <Form>
            <Form.MultiSelect {...registerField('readOnlyWithValue')} {...args} isReadOnly />
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
    chromatic: { disableSnapshot: true },
  },
};

export const Loading: StoryObj<typeof Form.MultiSelect> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { loadingWithValue: ['new_york', 'chicago'], loading: null },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Without value',
        component: (
          <Form>
            <Form.MultiSelect {...registerField('loading')} {...args} isLoading />
          </Form>
        ),
      },
      {
        label: 'With value',
        component: (
          <Form>
            <Form.MultiSelect {...registerField('loadingWithValue')} {...args} isLoading />
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

export const ViewMode: StoryObj<typeof Form.MultiSelect> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { viewModeWithValue: ['new_york', 'chicago'], viewMode: null },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Without value',
        component: (
          <Form isViewMode>
            <Form.MultiSelect {...registerField('viewMode')} {...args} />
          </Form>
        ),
      },
      {
        label: 'With value',
        component: (
          <Form isViewMode>
            <Form.MultiSelect {...registerField('viewModeWithValue')} {...args} />
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

export const WithLabelTooltip: StoryObj<typeof Form.MultiSelect> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <Form.MultiSelect
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

export const WithFooter: StoryObj<typeof Form.MultiSelect> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    const items = [
      {
        label: 'Custom content',
        component: (
          <Form>
            <Form.MultiSelect
              {...registerField('footer')}
              {...args}
              data-testid="multi-select-footer"
              footer={
                <MultiSelectFooter>
                  <Storybook.ContentPlaceholder />
                </MultiSelectFooter>
              }
            />
          </Form>
        ),
      },
      {
        label: 'With CTA',
        component: (
          <Form>
            <Form.MultiSelect
              {...registerField('footerWithCta')}
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
    await userEvent.click(within(canvasElement).getByTestId('multi-select-footer-trigger-input'));
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
 * This story demonstrates usage of the `Form.MultiSelect` component with custom menu width and max-width.<br />
 * Click the "Width options" button to change the menu width.
 */
export const WithCustomMenuWidth: StoryObj<typeof Form.MultiSelect> = {
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
            <Text textStyle="body3">Current menu max-width: &quot;{menuWidthProps.maxWidth ?? 'none'}&quot;</Text>
          </Group>
        </Group>
        <Form>
          <Form.MultiSelect
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

export const WithSections: StoryObj<typeof Form.MultiSelect> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <Form.MultiSelect {...registerField('sections')} {...args} options={citiesByRegion} />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],

  play,
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
export const CustomTriggerAndOptionContent: StoryObj<typeof Form.MultiSelect> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { custom: ['new_york', 'sacramento'] },
      onSubmit: () => null,
    });

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
      <Form>
        <Form.MultiSelect
          {...registerField('custom')}
          {...args}
          valueRenderer={valueRenderer as never}
          optionRenderer={optionRenderer as never}
        />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: showDisabledOption,
};

/**
 * To get type safety and intellisense for the `description` property in this example, we extend `FormMultiSelectOption` like so:<br />
 * `type City = FormMultiSelectOption<string> & { description: string }`
 */
export const MultiLineCustomTriggerAndOptionContent: StoryObj<typeof Form.MultiSelect> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { multiLine: ['new_york', 'sacramento'] },
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
      <Form>
        <Form.MultiSelect
          {...registerField('multiLine')}
          {...args}
          valueRenderer={valueRenderer as never}
          optionRenderer={optionRenderer as never}
        />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: showDisabledOption,
};

/**
 * This example demonstrates how to visually hide a field from the UI while keeping it present in the DOM.<br />
 * Use the `isHidden` prop to hide the field, and inspect the DOM using developer tools to see the `data-hidden` attribute.<br />
 *
 * **Note:** To prevent the field from rendering entirely, use the React pattern: `{condition && <Form.MultiSelect ... />}`.<br />
 */
export const IsHidden: StoryObj<typeof Form.MultiSelect> = {
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
          <Form.MultiSelect {...registerField('field1')} {...args} isHidden={isFieldHidden} />
          {/* Field conditionally rendered based on `isFieldHidden` */}
          {!isFieldHidden && <Form.MultiSelect {...registerField('field2')} {...args} />}
        </Form>
      </Group>
    );
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
