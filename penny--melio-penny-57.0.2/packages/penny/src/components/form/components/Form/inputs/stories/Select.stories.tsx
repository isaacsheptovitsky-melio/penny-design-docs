/* eslint-disable @typescript-eslint/no-deprecated */
import { Box } from '@chakra-ui/react';
import { noop, useBoolean } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { screen, userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';
import type { SchemaOf } from 'yup';
import * as yup from 'yup';

import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import type { TypographyLabelProps } from '@/components/dataDisplay/typography';
import { useMelioForm } from '@/components/form/hooks';
import { Icon } from '@/components/foundations/Icon';
import { commonFormFieldArgs, commonFormFieldControls } from '@/test-utils/stories.utils';
import { fullScreenChromaticDecorator, isUsingVisualTesting } from '@/test-utils/storybook.utils';

import type { FormSelectProps } from '../..';
import { Form } from '../..';
import {
  cities,
  citiesWithAvatars,
  citiesWithLeftIcons,
  citiesWithRightIcons,
  citiesWithSectionsAndAvatars,
  citiesWithSectionsAndDescriptions,
} from './__fixtures__/select-mock-data';

const optionType = `{
  value: string | Record<string, unknown>;
  label: string;
  description?: string;
  rightIcon?: IconKey;
  pillProps?: {
    status: 'warning' | 'critical' | 'success' | 'neutral' | 'brand' | 'informative';
    label: string;
  } | {
    status: 'warning' | 'critical' | 'success' | 'neutral' | 'brand' | 'informative';
    label: string;
  }[]];
  testId?: string;
} & OneOrNone<{
  avatarProps: Partial<Pick<AvatarProps, 'name' | 'data-testid' | 'bgColor' | 'src' | 'badge' | 'badgeColor'>>;
  leftIcon: BrandSymbolKey;
}>`;

const sectionType = `{
  metadata: {
    label: string;
    icon?: 'verified';
  };
  options: ${optionType}[];
}`;

const optionsType = `${optionType}[] | ${sectionType}[]`;

const creatableOptionType = `{
  label: string | ((value: string) => string);
  onClick?: (inputValue: string) => void;
  shouldDisplay?: (inputValue: string) => boolean;
}`;

const baseArgs = {
  options: cities,
  placeholder: 'Choose your hometown...',
  emptyState: undefined,
  creatableOption: { label: (value: string) => `Add "${value}" as a city` },
  labelProps: { label: 'City' },
  helperTextProps: { label: 'This indicates what type of person you are.' },
  viewModePlaceholder: 'No city selected',
  isLoading: false,
  isRequired: false,
  showOptionalIndicator: false,
  onInputChange: noop,
  onSearchTermReset: undefined,
};

const args = {
  ...baseArgs,
  ...commonFormFieldArgs,
} as FormSelectProps;

/**
 * This component is **deprecated**. Please use [Form.SelectNew](?path=/docs/form-select-new--docs).
 */
const meta: Meta<typeof Form.Select> = {
  title: 'Internal Components/Form Fields/Select [deprecated]',
  component: Form.Select,
  parameters: {
    docs: { source: { type: 'code' } },
    a11y: {
      // deprecated component
      test: 'off',
    },
  },
  argTypes: {
    ...commonFormFieldControls,
    options: {
      control: 'object',
      description: 'The options in the dropdown menu.',
      type: { required: true, value: 'array', name: 'other' },
      table: {
        category: 'props',
        type: {
          summary: 'SelectOption[] | SelectSection[]',
          detail: optionsType,
        },
      },
    },
    placeholder: {
      description: 'Placeholder text.',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
    },
    emptyState: {
      control: 'object',
      description: 'Sets the message and action in the select when there are no options (after typing in the input)',
      table: {
        type: {
          summary: 'EmptyStateProps',
          detail: '{ label: string; onClick?: VoidFunction }',
        },
        category: 'props',
      },
    },
    creatableOption: {
      control: 'object',
      description: "Decide when and how to display the 'create new option'.",
      table: {
        type: {
          summary: 'CreatableOptionProps',
          detail: creatableOptionType,
        },
        category: 'props',
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Determines if the field is loading.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    onInputChange: {
      action: 'changed',
      description: 'A callback function that is invoked when the input value changes.',
      table: { type: { summary: '(value: string | undefined) => void' }, category: 'events' },
    },
    onFocus: {
      description: 'An event called when the input is focused.',
      table: {
        category: 'events',
        type: {
          summary: 'FocusEventHandler<HTMLInputElement>',
        },
      },
    },
    onBlur: {
      description: 'An event called when the input is blurred.',
      table: {
        category: 'events',
        type: {
          summary: 'FocusEventHandler<HTMLInputElement>',
        },
      },
    },
    onSearchTermReset: {
      control: false,
      description: 'An event for when the search term is reset.',
      table: {
        category: 'events',
        type: {
          summary: 'VoidFunction',
        },
      },
    },
    formatSelectedValue: {
      control: false,
      description: "Format how the selected option's value is displayed.",
      table: {
        defaultValue: { summary: '(option) => option.label' },
        type: { summary: '(option: SelectOption) => string', detail: `(option: ${optionType}) => string` },
        category: 'props',
      },
    },
    valueRightElement: {
      description: 'Displays an element on the right side of the input value when the input is not in focus.',
      table: {
        type: { summary: 'JSX.Element' },
        category: 'props',
      },
    },
  },
  args,
};
export default meta;

export const Main: StoryObj<typeof Form.Select> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <Form.Select {...registerField('main')} {...args} />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: async () => userEvent.click(screen.getByRole('combobox')),
};

export const EmptyState: StoryObj<typeof Form.Select> = {
  render: () => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <Form.Select
          {...registerField('no options')}
          {...args}
          options={[]}
          emptyState={{ label: 'No options' }}
          creatableOption={undefined}
        />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: async () => userEvent.click(screen.getByRole('combobox')),
};

export const EmptyStateClickable: StoryObj<typeof Form.Select> = {
  render: () => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <Form.Select
          {...registerField('no options')}
          {...args}
          options={[]}
          creatableOption={undefined}
          emptyState={{ label: "Didn't find what you were looking for?", onClick: () => null }}
        />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  parameters: {
    chromatic: { diffThreshold: 0.8 },
  },
  play: async () => userEvent.click(screen.getByRole('combobox')),
};

/**
 * You can display an element on the right side of the input value by passing it throguh the `valueRightElement` props. The element will be displayed when there input isn't in focus.
 */
export const ValueRightElement: StoryObj<typeof Form.Select> = {
  render: () => {
    const { registerField } = useMelioForm({ defaultValues: { valueRightElement: 'Eilat' }, onSubmit: () => null });

    return (
      <Form>
        <Form.Select
          {...registerField('valueRightElement')}
          {...args}
          valueRightElement={<Icon type="repeat" size="small" />}
        />
      </Form>
    );
  },
};

export const DefaultValue: StoryObj<typeof Form.Select> = {
  render: () => {
    const { registerField } = useMelioForm({ defaultValues: { defaultValue: 'Eilat' }, onSubmit: () => null });

    return (
      <Form>
        <Form.Select {...registerField('defaultValue')} {...args} />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: async () => userEvent.click(screen.getByRole('combobox')),
};

export const Sizes: StoryObj<typeof Form.Select> = {
  render: () => {
    const { registerField } = useMelioForm({
      onSubmit: () => null,
    });
    const items = [
      {
        label: 'Small',
        component: (
          <Form>
            <Form.Select {...registerField('small')} {...baseArgs} size="small" />
          </Form>
        ),
      },
      {
        label: 'Large',
        component: (
          <Form>
            <Form.Select {...registerField('large')} {...baseArgs} size="large" />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" justifyContent="flex-start" />;
  },
};

/**
 * In case the option is not in the options list, we supply a way for the user to add their own option using a special "creatable option".
 * This special option can be adjusted by the developers.
 */
export const CreatableOption: StoryObj<typeof Form.Select> = {
  render: ({ children, ...args }) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    const [options, setOptions] = useState(cities);
    const handleCreate = (inputValue: string) => {
      const newOption = { label: inputValue, value: `_${inputValue}` };
      setOptions((prevOptions) => [...prevOptions, newOption]);
    };

    return (
      <Group variant="vertical" spacing="l">
        <Text as="h2" textStyle="heading4">
          Type in a new city to see the creatable option
        </Text>
        <Form>
          <Form.Select
            {...registerField('creatableOption')}
            {...args}
            aria-label="creatable option"
            options={options}
            creatableOption={{
              label: (value: string) => `Add "${value}" as a city`,
              onClick: handleCreate,
            }}
          />
        </Form>
      </Group>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  parameters: {
    chromatic: {
      delay: 1000,
    },
  },
  play: async () => userEvent.type(screen.getByRole('combobox'), 'Holon'),
};

/**
 * In case you want to show the creatable option under your own custom condition you can use `creatableOption.shouldDisplay` prop.<br />
 * This prop accepts a function that gets the current input value and returns a boolean to whether or not display the creatable option:<br />
 * `(inputValue: string) => boolean`<br />
 * In the example below, we display the creatable option only when the input value is 'New Amsterdam'.
 *
 * The default behavior of this prop is to display the creatable option when the input value is not empty and there are no matched options.
 */
export const DecidingWhenToDisplayTheCreateOption: StoryObj<typeof Form.Select> = {
  render: ({ children, ...args }) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    const [options, setOptions] = useState(cities);
    const handleCreate = (inputValue: string) => {
      const newOption = { label: inputValue, value: `_${inputValue}` };
      setOptions((prevOptions) => [...prevOptions, newOption]);
    };

    return (
      <Group variant="vertical" spacing="l">
        <Text as="h2" textStyle="heading4">
          Type in a new city to see the creatable option
        </Text>
        <Form>
          <Form.Select
            {...registerField('creatableOption')}
            {...args}
            aria-label="creatable option"
            options={options}
            creatableOption={{
              label: (value: string) => `Add "${value}" as a city`,
              onClick: handleCreate,
              shouldDisplay: (inputValue) => inputValue === 'New Amsterdam',
            }}
            emptyState={{
              label: 'No options',
            }}
          />
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

export const Invalid: StoryObj<typeof Form.Select> = {
  render: () => {
    const { registerField, setError } = useMelioForm({ defaultValues: { invalid: 'Mars City' }, onSubmit: () => null });

    useEffect(() => {
      setError('invalid', { message: 'Selecting a city beyond Earth is not an option!' });
    }, [setError]);

    return (
      <Form>
        <Form.Select {...registerField('invalid')} {...args} />
      </Form>
    );
  },
};

/**
 `FormField` with `isRequired` will have `*` next to the required field label.
 */
export const Required: StoryObj<typeof Form.Select> = {
  render: () => {
    type FormFields = { optional: string; required: string };

    const schema = yup.object().shape({
      optional: yup.string(),
      required: yup.string().required(),
    }) as SchemaOf<FormFields>;

    const { registerField } = useMelioForm<FormFields>({
      schema,
      defaultValues: { required: 'Tiberias', optional: 'Tiberias' },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Required',
        component: (
          <Form>
            <Form.Select {...baseArgs} {...registerField('required')} />
          </Form>
        ),
      },
      {
        label: 'Optional',
        component: (
          <Form>
            <Form.Select {...baseArgs} {...registerField('optional')} />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" />;
  },
};

/**
 `FormField` with `showOptionalIndicator` will have `(optional)` next to the optional field label.
 */
export const ShowOptionalIndicator: StoryObj<typeof Form.Select> = {
  render: ({ showOptionalIndicator }) => {
    type FormFields = { optional: string };

    const schema = yup.object().shape({
      optional: yup.string(),
    }) as SchemaOf<FormFields>;

    const { registerField } = useMelioForm<FormFields>({
      schema,
      showOptionalIndicator,
      defaultValues: { optional: 'Tiberias' },
      onSubmit: () => null,
    });

    return (
      <Form>
        <Form.Select {...baseArgs} {...registerField('optional')} />
      </Form>
    );
  },
  args: { showOptionalIndicator: true },
};

export const Disabled: StoryObj<typeof Form.Select> = {
  render: () => {
    const { registerField } = useMelioForm({
      defaultValues: { disabledWithValue: 'Netivot', disabled: null },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Without default value',
        component: (
          <Form>
            <Form.Select {...registerField('disabled')} {...args} isDisabled />
          </Form>
        ),
      },
      {
        label: 'With default value',
        component: (
          <Form>
            <Form.Select {...registerField('disabledWithValue')} {...args} isDisabled />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" justifyContent="flex-start" />;
  },
};

export const ReadOnly: StoryObj<typeof Form.Select> = {
  render: () => {
    const { registerField } = useMelioForm({
      defaultValues: { readOnlyWithValue: 'Tiberias', readOnly: null },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Without default value',
        component: (
          <Form>
            <Form.Select {...registerField('readOnly')} {...args} isReadOnly />
          </Form>
        ),
      },
      {
        label: 'With default value',
        component: (
          <Form>
            <Form.Select {...registerField('readOnlyWithValue')} {...args} isReadOnly />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" justifyContent="flex-start" />;
  },
};

export const WithLabelTooltip: StoryObj<typeof Form.Select> = {
  render: () => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    const labelWithTooltip = {
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
    };

    return (
      <Form>
        <Form.Select
          {...registerField('main')}
          {...args}
          aria-label={undefined}
          labelProps={labelWithTooltip as TypographyLabelProps}
        />
      </Form>
    );
  },
  play: async () => userEvent.hover(screen.getByTestId('label-tooltip-trigger')),
};

export const ViewMode: StoryObj<typeof Form.Select> = {
  render: () => {
    const { registerField } = useMelioForm({
      defaultValues: { viewModeWithValue: 'Tiberias', viewMode: null },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Without default value',
        component: (
          <Form isViewMode>
            <Form.Select {...registerField('viewMode')} {...baseArgs} />
          </Form>
        ),
      },
      {
        label: 'With default value',
        component: (
          <Form isViewMode>
            <Form.Select {...registerField('viewModeWithValue')} {...baseArgs} />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" />;
  },
};

export const Loading: StoryObj<typeof Form.Select> = {
  render: () => {
    const { registerField } = useMelioForm({
      defaultValues: { loadingWithValue: 'Tiberias', loading: null },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Without default value',
        component: (
          <Form>
            <Form.Select {...registerField('loading')} {...args} isLoading />
          </Form>
        ),
      },
      {
        label: 'With default value',
        component: (
          <Form>
            <Form.Select {...registerField('loadingWithValue')} {...args} isLoading />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" />;
  },
};

export const CustomSelectedOptionFormat: StoryObj<typeof Form.Select> = {
  render: () => {
    const { registerField } = useMelioForm({
      defaultValues: { customFormat: 'Tiberias', loading: null },
      onSubmit: () => null,
    });

    return (
      <Form>
        <Form.Select
          {...registerField('customFormat')}
          {...args}
          formatSelectedValue={(option) => `You have selected - ${option.label}`}
        />
      </Form>
    );
  },
};

export const WithDescription: StoryObj<typeof Form.Select> = {
  render: () => {
    const { registerField } = useMelioForm({ onSubmit: () => null });
    const [selectedOptionValue, setSelectedOptionValue] = useState<string | null>(null);

    const sectionVerified = !!citiesWithSectionsAndAvatars.find((section) =>
      section.options.find((option) => option.value === selectedOptionValue)
    );

    return (
      <Form>
        <Form.Select
          {...registerField('main')}
          {...args}
          options={citiesWithSectionsAndDescriptions}
          valueRightElement={sectionVerified ? <Icon size="small" type="verified" color="brand" /> : undefined}
          onChange={(e) => setSelectedOptionValue(e.target.value)}
        />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: async () => {
    if (!isUsingVisualTesting()) return;
    await userEvent.click(screen.getByRole('combobox'));
  },
};

export const WithSections: StoryObj<typeof Form.Select> = {
  render: () => {
    const { registerField } = useMelioForm({ onSubmit: () => null });
    const [selectedOptionValue, setSelectedOptionValue] = useState<string | null>(null);

    const sectionVerified = !!citiesWithSectionsAndAvatars.find((section) =>
      section.options.find((option) => option.value === selectedOptionValue)
    );

    return (
      <Form>
        <Form.Select
          {...registerField('main')}
          {...args}
          options={citiesWithSectionsAndDescriptions}
          valueRightElement={sectionVerified ? <Icon size="small" type="verified" color="brand" /> : undefined}
          onChange={(e) => setSelectedOptionValue(e.target.value)}
        />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: async () => {
    if (!isUsingVisualTesting()) return;
    await userEvent.click(screen.getByRole('combobox'));
  },
};

export const WithAvatars: StoryObj<typeof Form.Select> = {
  render: () => {
    const { registerField } = useMelioForm({
      defaultValues: { noSections: null, sections: null },
      onSubmit: () => null,
    });

    const [selectedOptionValue, setSelectedOptionValue] = useState<string | null>(null);

    const sectionVerified = !!citiesWithSectionsAndAvatars.find((section) =>
      section.options.find((option) => option.value === selectedOptionValue)
    );

    const items = [
      {
        label: 'Without sections',
        component: (
          <Form>
            <Form.Select {...registerField('noSections')} {...baseArgs} options={citiesWithAvatars} />
          </Form>
        ),
      },
      {
        label: 'With sections',
        component: (
          <Form>
            <Form.Select
              {...registerField('sections')}
              {...baseArgs}
              options={citiesWithSectionsAndAvatars}
              valueRightElement={sectionVerified ? <Icon size="small" type="verified" color="brand" /> : undefined}
              onChange={(e) => setSelectedOptionValue(e.target.value)}
            />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" />;
  },
  decorators: [fullScreenChromaticDecorator],
  parameters: { chromatic: { diffThreshold: 0.8 } },
  play: async () => {
    if (!isUsingVisualTesting()) return;
    const inputs = screen.getAllByRole('combobox');
    const withSections = inputs[1] as HTMLElement;
    await userEvent.type(withSections, 'n');
  },
};

export const WithLeftIcons: StoryObj<typeof Form.Select> = {
  render: () => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <Form.Select {...registerField('main')} {...args} options={citiesWithLeftIcons} />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: async () => userEvent.click(screen.getByRole('combobox')),
};

export const WithRightIcons: StoryObj<typeof Form.Select> = {
  render: () => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <Form.Select {...registerField('main')} {...args} options={citiesWithRightIcons} />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: async () => userEvent.click(screen.getByRole('combobox')),
};

/**
 * This example demonstrates how to visually hide a field from the UI while keeping it present in the DOM.<br />
 * Use the `isHidden` prop to hide the field, and inspect the DOM using developer tools to see the `data-hidden` attribute.<br />
 *
 * **Note:** To prevent the field from rendering entirely, use the React pattern: `{condition && <Form.Select ... />}`.<br />
 */
export const IsHidden: StoryObj<typeof Form.Select> = {
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
          <Form.Select {...registerField('field1')} {...args} isHidden={isFieldHidden} />
          {/* Field conditionally rendered based on `isFieldHidden` */}
          {!isFieldHidden && <Form.Select {...registerField('field2')} {...args} />}
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
