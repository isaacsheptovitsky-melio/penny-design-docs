/* eslint-disable @typescript-eslint/no-deprecated */
import { Box } from '@chakra-ui/react';
import { useBoolean } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { screen, userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';
import type { SchemaOf } from 'yup';
import * as yup from 'yup';

import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import type { TypographyLabelProps } from '@/components/dataDisplay/typography';
import { useMelioForm } from '@/components/form/hooks';
import { Icon } from '@/components/foundations/Icon';
import type { SearchOption, SearchOptions, SearchSection } from '@/components/selectionAndInputs/Search';
import { commonFormFieldArgs, commonFormFieldControls } from '@/test-utils/stories.utils';
import { fullScreenChromaticDecorator, isUsingVisualTesting } from '@/test-utils/storybook.utils';

import { Form, type FormSearchProps } from '../..';
import {
  cities,
  citiesWithAvatars,
  citiesWithLeftIcons,
  citiesWithRightIcons,
  citiesWithSections,
  citiesWithSectionsAndAvatars,
  citiesWithSectionsAvatarsDescription,
} from './__fixtures__/search-mock-data';

const fetchOptions = async (searchTerm: string, options: SearchOption[]): Promise<SearchOptions> =>
  new Promise((resolve) => {
    setTimeout(
      () => resolve(options.filter((city) => city.label.toLowerCase().includes(searchTerm.toLowerCase()))),
      700
    );
  });

const fetchOptionsWithSections = async (
  searchTerm: string,
  optionsList: Extract<SearchOptions, SearchSection[]>
): Promise<SearchOptions> => {
  const options = optionsList.map((section) => ({
    ...section,
    options: section.options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase())),
  }));

  return new Promise((resolve) => {
    setTimeout(() => resolve(options), 700);
  });
};

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

/**
 * This component is **deprecated** Please use [Combobox](?path=/docs/form-combobox-new--docs).<br />
 */
const meta: Meta<typeof Form.Search> = {
  title: 'Internal Components/Form Fields/Search [deprecated]',
  component: Form.Search,
  parameters: {
    docs: { source: { type: 'code' } },
    chromatic: { delay: 300 },
    a11y: {
      // deprecated component
      test: 'off',
    },
  },
  argTypes: {
    ...commonFormFieldControls,
    options: {
      description: 'The options in the dropdown menu.',
      type: { required: true, value: 'array', name: 'other' },
      table: {
        category: 'props',
        type: {
          summary: 'SearchOption[] | SearchSection[]',
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
      description: 'Sets the message and action when there are no options (after typing in the input).',
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
    isLoadingField: {
      control: 'boolean',
      description: 'Determines if the field is loading.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    shouldShowPresetOptions: {
      control: 'boolean',
      description: 'Opens the dropdown when the input is clicked and shows the preset options.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    filterOptions: {
      description:
        'Overrides the internal filtering mechanism. Use this in case you want to handle filtering the options yourself.',
      table: {
        type: {
          summary: '<O extends Option<T> | OptionWithSection<T>>(options: O[], searchTerm?: string | null) => O[]',
        },
        category: 'props',
      },
    },
    onInputChange: {
      action: 'changed',
      description: 'A callback function that is invoked when the input value changes.',
      table: { type: { summary: '(value?: string) => void' }, category: 'events' },
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
    formatSelectedValue: {
      control: false,
      description: "Format how the selected option's value is displayed.",
      table: {
        defaultValue: { summary: '(option) => option.label' },
        type: { summary: '(option: SearchOption) => string', detail: `(option: ${optionType}) => string` },
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
    debounce: {
      control: 'number',
      description: 'Decides the debounce time until the `onInputChange` event is triggered after a key press.',
      table: {
        type: { summary: 'number' },
        category: 'props',
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
    onClear: {
      control: false,
      description: 'An event for when the clear button is clicked',
      table: {
        category: 'events',
        type: {
          summary: 'VoidFunction',
        },
      },
    },
    clearButtonAriaLabel: {
      control: 'text',
      description: 'The aria-label for the clear button.',
      table: {
        category: 'accessibility',
        defaultValue: { summary: 'Clear search input' },
        type: { summary: 'string' },
      },
    },
    'aria-label': {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The aria-label for the search component.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
  },
  args: {
    options: cities,
    placeholder: 'Choose your home town...',
    emptyState: { label: 'No options' },
    creatableOption: undefined,
    labelProps: { label: 'City' },
    helperTextProps: { label: 'Choose wisely' },
    ...commonFormFieldArgs,
    isLoadingField: false,
    isLoading: false,
    shouldShowPresetOptions: false,
    viewModePlaceholder: 'No address selected',
    formatSelectedValue: (option) => option.label,
    onSearchTermReset: undefined,
    onClear: undefined,
    size: undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });
    const [options, setOptions] = useState<SearchOptions>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = (inputValue: string) => {
      setIsLoading(true);
      void fetchOptions(inputValue, cities)
        .then((results) => setOptions(results))
        .finally(() => setIsLoading(false));
    };

    return (
      <Form>
        <Form.Search
          {...registerField('main')}
          {...args}
          options={options}
          onInputChange={handleInputChange}
          isLoading={isLoading}
        />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  play: async () => userEvent.type(screen.getByRole('combobox'), 'a'),
};

export const DefaultValue: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { defaultValue: 'Haifa' }, onSubmit: () => null });
    const [options, setOptions] = useState<SearchOptions>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = (inputValue: string) => {
      setIsLoading(true);
      void fetchOptions(inputValue, cities)
        .then((results) => setOptions(results))
        .finally(() => setIsLoading(false));
    };

    return (
      <Form>
        <Form.Search
          {...registerField('defaultValue')}
          {...args}
          options={options}
          isLoading={isLoading}
          onInputChange={handleInputChange}
        />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * You can display an element on the right side of the input value by passing it throguh the `valueRightElement` prop. The element will be displayed when there input isn't in focus.
 */
export const ValueRightElement: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { valueRightElement: 'Haifa' }, onSubmit: () => null });
    const [options, setOptions] = useState<SearchOptions>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = (inputValue: string) => {
      setIsLoading(true);
      void fetchOptions(inputValue, cities)
        .then((results) => setOptions(results))
        .finally(() => setIsLoading(false));
    };

    return (
      <Form>
        <Form.Search
          {...registerField('valueRightElement')}
          {...args}
          options={options}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          valueRightElement={<Icon type="repeat" size="small" />}
        />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Sizes: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      onSubmit: () => null,
    });
    const [options, setOptions] = useState<SearchOptions>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = (inputValue: string) => {
      setIsLoading(true);
      void fetchOptions(inputValue, cities)
        .then((results) => setOptions(results))
        .finally(() => setIsLoading(false));
    };

    const items = [
      {
        label: 'Small',
        component: (
          <Form>
            <Form.Search
              {...registerField('small')}
              {...args}
              options={options}
              isLoading={isLoading}
              onInputChange={handleInputChange}
              size="small"
            />
          </Form>
        ),
      },
      {
        label: 'Large',
        component: (
          <Form>
            <Form.Search
              {...registerField('large')}
              {...args}
              options={options}
              isLoading={isLoading}
              onInputChange={handleInputChange}
              size="large"
            />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" justifyContent="flex-start" />;
  },
};

export const ClickableEmptyState: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    return (
      <Form>
        <Form.Search
          {...registerField('emptyState')}
          {...args}
          isLoading={isLoading}
          options={[]}
          onInputChange={handleInputChange}
          emptyState={{ label: "I can't find my address", onClick: () => null }}
        />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const EmptyState: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    return (
      <Form>
        <Form.Search
          {...registerField('emptyState')}
          {...args}
          isLoading={isLoading}
          options={[]}
          onInputChange={handleInputChange}
          emptyState={{ label: 'No options' }}
        />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Invalid: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField, setError } = useMelioForm({ defaultValues: { invalid: 'Mars City' }, onSubmit: () => null });
    const [options, setOptions] = useState<SearchOptions>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = (inputValue: string) => {
      setIsLoading(true);
      void fetchOptions(inputValue, cities)
        .then((results) => setOptions(results))
        .finally(() => setIsLoading(false));
    };

    useEffect(() => {
      setError('invalid', { message: 'Selecting a city beyond Earth is not an option!' });
    }, [setError]);

    return (
      <Form>
        <Form.Search
          {...registerField('invalid')}
          {...args}
          options={options}
          isLoading={isLoading}
          onInputChange={handleInputChange}
        />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      delay: 1000,
    },
  },
};

/**
 `FormField` with `isRequired` will have `*` next to the required field label.
 */
export const Required: StoryObj<typeof Form.Search> = {
  render: (args) => {
    type FormFields = { optional: string; requiredField: string };

    const schema = yup.object().shape({
      optional: yup.string(),
      requiredField: yup.string().required(),
    }) as SchemaOf<FormFields>;

    const { registerField } = useMelioForm<FormFields>({
      schema,
      defaultValues: { requiredField: 'Tel Aviv', optional: 'Tel Aviv' },
      onSubmit: () => null,
    });
    const [options, setOptions] = useState<SearchOptions>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = (inputValue: string) => {
      setIsLoading(true);
      void fetchOptions(inputValue, cities)
        .then((results) => setOptions(results))
        .finally(() => setIsLoading(false));
    };

    const items = [
      {
        label: 'Required',
        component: (
          <Form>
            <Form.Search
              {...args}
              {...registerField('requiredField')}
              options={options}
              isLoading={isLoading}
              onInputChange={handleInputChange}
            />
          </Form>
        ),
      },
      {
        label: 'Optional',
        component: (
          <Form>
            <Form.Search
              {...args}
              {...registerField('optional')}
              options={options}
              isLoading={isLoading}
              onInputChange={handleInputChange}
            />
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
export const ShowOptionalIndicator: StoryObj<typeof Form.Search> = {
  render: ({ showOptionalIndicator, ...args }) => {
    type FormFields = { optional: string };

    const schema = yup.object().shape({
      optional: yup.string(),
    }) as SchemaOf<FormFields>;

    const { registerField } = useMelioForm<FormFields>({
      schema,
      showOptionalIndicator,
      defaultValues: { optional: 'Tel Aviv' },
      onSubmit: () => null,
    });
    const [options, setOptions] = useState<SearchOptions>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = (inputValue: string) => {
      setIsLoading(true);
      void fetchOptions(inputValue, cities)
        .then((results) => setOptions(results))
        .finally(() => setIsLoading(false));
    };

    return (
      <Form>
        <Form.Search
          {...args}
          {...registerField('optional')}
          options={options}
          isLoading={isLoading}
          onInputChange={handleInputChange}
        />
      </Form>
    );
  },
  args: { showOptionalIndicator: true },
};

export const Disabled: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { disabled: null, disabledWithValue: 'Tel Aviv' },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Without default value',
        component: (
          <Form>
            <Form.Search {...registerField('disabled')} {...args} isDisabled />
          </Form>
        ),
      },
      {
        label: 'With default value',
        component: (
          <Form>
            <Form.Search {...registerField('disabledWithValue')} {...args} isDisabled />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" justifyContent="flex-start" />;
  },
};

export const ReadOnly: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { readOnly: null, readOnlyWithValue: 'Tel Aviv' },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Without default value',
        component: (
          <Form>
            <Form.Search {...registerField('readOnly')} {...args} isReadOnly />
          </Form>
        ),
      },
      {
        label: 'With default value',
        component: (
          <Form>
            <Form.Search {...registerField('readOnlyWithValue')} {...args} isReadOnly />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" justifyContent="flex-start" />;
  },
};

export const LoadingField: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { loading: null },
      onSubmit: () => null,
    });

    return (
      <Form>
        <Form.Search {...args} {...registerField('loading')} isLoadingField />
      </Form>
    );
  },
};

export const WithLabelTooltip: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });
    const [options, setOptions] = useState<SearchOptions>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = (inputValue: string) => {
      setIsLoading(true);
      void fetchOptions(inputValue, cities)
        .then((results) => setOptions(results))
        .finally(() => setIsLoading(false));
    };

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
        <Form.Search
          {...registerField('withLabelTooltip')}
          {...args}
          options={options}
          onInputChange={handleInputChange}
          isLoading={isLoading}
          labelProps={labelWithTooltip as TypographyLabelProps}
          aria-label={undefined}
        />
      </Form>
    );
  },
  play: async () => userEvent.hover(screen.getByTestId('label-tooltip-trigger')),
};

export const ViewMode: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { viewMode: null, viewModeWithValue: 'Tel Aviv' },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Without default value',
        component: (
          <Form isViewMode>
            <Form.Search {...registerField('viewMode')} {...args} />
          </Form>
        ),
      },
      {
        label: 'With default value',
        component: (
          <Form isViewMode>
            <Form.Search {...registerField('viewModeWithValue')} {...args} />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" justifyContent="flex-start" />;
  },
};

export const CustomSelectedOptionFormat: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });
    const [options, setOptions] = useState<SearchOptions>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = (inputValue: string) => {
      setIsLoading(true);
      void fetchOptions(inputValue, cities)
        .then((results) => setOptions(results))
        .finally(() => setIsLoading(false));
    };
    return (
      <Form>
        <Form.Search
          {...registerField('custom-format')}
          {...args}
          options={options}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          formatSelectedValue={(option) => `You have selected - ${option.label}`}
        />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithSections: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });
    const [options, setOptions] = useState<SearchOptions>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = (inputValue: string) => {
      setIsLoading(true);
      void fetchOptionsWithSections(inputValue, citiesWithSections)
        .then((results) => setOptions(results))
        .finally(() => setIsLoading(false));
    };

    const [selectedOptionValue, setSelectedOptionValue] = useState<string | null>(null);

    const optionSectionVerified = !!citiesWithSectionsAndAvatars.find((section) =>
      section.options.find((option) => option.value === selectedOptionValue || option.value === selectedOptionValue)
    );

    return (
      <Form>
        <Form.Search
          {...registerField('withSections')}
          {...args}
          options={options}
          onInputChange={handleInputChange}
          isLoading={isLoading}
          valueRightElement={optionSectionVerified ? <Icon type="verified" size="small" color="brand" /> : undefined}
          onChange={(e) => setSelectedOptionValue(e.target.value)}
        />
      </Form>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  parameters: {
    chromatic: { diffThreshold: 0.8 },
  },
  play: async () => userEvent.type(screen.getByRole('combobox'), 'n'),
};

export const WithDescription: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { noAvatars: null, avatars: null },
      onSubmit: () => null,
    });
    const [optionsWithoutAvatars, setOptionsWithoutAvatars] = useState<SearchOptions>([]);
    const [isLoadingWithoutAvatars, setIsLoadingWithoutAvatars] = useState<boolean>(false);

    const [optionsWithAvatars, setOptionsWithAvatars] = useState<SearchOptions>([]);
    const [isLoadingWithAvatars, setIsLoadingWithAvatars] = useState<boolean>(false);

    const handleInputChangeWithAvatars = (inputValue: string) => {
      setIsLoadingWithAvatars(true);
      void fetchOptionsWithSections(inputValue, citiesWithSectionsAvatarsDescription)
        .then((results) => setOptionsWithAvatars(results))
        .finally(() => setIsLoadingWithAvatars(false));
    };

    const handleInputChangeWithoutAvatars = (inputValue: string) => {
      setIsLoadingWithoutAvatars(true);
      void fetchOptionsWithSections(inputValue, citiesWithSections)
        .then((results) => setOptionsWithoutAvatars(results))
        .finally(() => setIsLoadingWithoutAvatars(false));
    };

    const [selectedOptionValueWithAvatars, setSelectedOptionValueWithAvatars] = useState<string | null>(null);
    const [selectedOptionValueWithoutAvatars, setSelectedOptionValueWithoutAvatars] = useState<string | null>(null);

    const sectionBrandSymbol = citiesWithSectionsAvatarsDescription.find((section) =>
      section.options.find((option) => option.value === selectedOptionValueWithAvatars)
    )?.metadata?.icon;

    const sectionBrandSymbolWithoutAvatars = citiesWithSections.find((section) =>
      section.options.find((option) => option.value === selectedOptionValueWithoutAvatars)
    )?.metadata?.icon;

    const valueRightElement = sectionBrandSymbol && <Icon size="small" type={sectionBrandSymbol} color="brand" />;

    const inputValueIconWithoutAvatars = sectionBrandSymbolWithoutAvatars && (
      <Icon size="small" type={sectionBrandSymbolWithoutAvatars} color="brand" />
    );

    const items = [
      {
        label: 'Without avatars',
        component: (
          <Form>
            <Form.Search
              {...registerField('noAvatars')}
              {...args}
              options={optionsWithoutAvatars}
              onInputChange={handleInputChangeWithoutAvatars}
              isLoading={isLoadingWithoutAvatars}
              onChange={(e) => setSelectedOptionValueWithoutAvatars(e.target.value)}
              valueRightElement={inputValueIconWithoutAvatars}
            />
          </Form>
        ),
      },
      {
        label: 'With avatars',
        component: (
          <Form>
            <Form.Search
              {...registerField('avatars')}
              {...args}
              options={optionsWithAvatars}
              onInputChange={handleInputChangeWithAvatars}
              isLoading={isLoadingWithAvatars}
              onChange={(e) => setSelectedOptionValueWithAvatars(e.target.value)}
              valueRightElement={valueRightElement}
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
    const withAvatars = inputs[1] as HTMLElement;
    await userEvent.type(withAvatars, 'i');
  },
};

export const WithAvatars: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { noSections: null, sections: null },
      onSubmit: () => null,
    });
    const [optionsWithoutSections, setOptionsWithoutSections] = useState<SearchOptions>([]);
    const [isLoadingWithoutSections, setIsLoadingWithoutSections] = useState<boolean>(false);

    const [optionsWithSections, setOptionsWithSections] = useState<SearchOptions>([]);
    const [isLoadingWithSections, setIsLoadingWithSections] = useState<boolean>(false);

    const handleInputChangeWithSections = (inputValue: string) => {
      setIsLoadingWithSections(true);
      void fetchOptionsWithSections(inputValue, citiesWithSectionsAndAvatars)
        .then((results) => setOptionsWithSections(results))
        .finally(() => setIsLoadingWithSections(false));
    };

    const handleInputChangeWithoutSections = (inputValue: string) => {
      setIsLoadingWithoutSections(true);
      void fetchOptions(inputValue, citiesWithAvatars)
        .then((results) => setOptionsWithoutSections(results))
        .finally(() => setIsLoadingWithoutSections(false));
    };

    const [selectedOptionValueWithSections, setSelectedOptionValueWithSections] = useState<string | null>(null);
    const [selectedOptionValueWithoutSections, setSelectedOptionValueWithoutSections] = useState<string | null>(null);

    const optionSectionVerified = !!citiesWithSectionsAndAvatars.find((section) =>
      section.options.find(
        (option) =>
          option.value === selectedOptionValueWithSections || option.value === selectedOptionValueWithoutSections
      )
    );

    const optionWithoutSectionVerified = !!citiesWithAvatars.find(
      (option) => option.value === selectedOptionValueWithoutSections
    );

    const items = [
      {
        label: 'Without sections',
        component: (
          <Form>
            <Form.Search
              {...registerField('noSections')}
              {...args}
              options={optionsWithoutSections}
              onInputChange={handleInputChangeWithoutSections}
              isLoading={isLoadingWithoutSections}
              onChange={(e) => setSelectedOptionValueWithoutSections(e.target.value)}
              valueRightElement={
                optionWithoutSectionVerified ? <Icon type="verified" color="brand" size="small" /> : undefined
              }
            />
          </Form>
        ),
      },
      {
        label: 'With sections',
        component: (
          <Form>
            <Form.Search
              {...registerField('sections')}
              {...args}
              options={optionsWithSections}
              onInputChange={handleInputChangeWithSections}
              isLoading={isLoadingWithSections}
              onChange={(e) => setSelectedOptionValueWithSections(e.target.value)}
              valueRightElement={
                optionSectionVerified ? <Icon type="verified" color="brand" size="small" /> : undefined
              }
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

/**
 * In case the option is not in the options list, we supply a way for the user to add their own option using a special "creatable option".
 * This special option can be adjusted by the developers.
 */
export const WithCreatableOption: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { registerField } = useMelioForm({
      onSubmit: () => null,
    });

    const handleInputChange = () => {
      setIsLoading(true);

      setTimeout(() => setIsLoading(false), 1000);
    };

    return (
      <Form>
        <Form.Search
          {...registerField('creatable')}
          {...args}
          onInputChange={handleInputChange}
          options={[]}
          isLoading={isLoading}
          creatableOption={{
            label: (inputValue) => `Create ${inputValue}`,
          }}
        />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * In case you want to show the creatable option under your own custom condition you can use `creatableOption.shouldDisplay` prop.<br />
 * This prop accepts a function that gets the current input value and returns a boolean to whether or not display the creatable option:<br />
 * `(inputValue: string) => boolean`<br />
 * In the example below, we display the creatable option only when the input value is 'New Amsterdam'.
 *
 * The default behavior of this prop is to display the creatable option when the input value is not empty and there are no matched options.
 */
export const DecidingWhenToDisplayTheCreateOption: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { registerField } = useMelioForm({
      onSubmit: () => null,
    });

    const handleInputChange = () => {
      setIsLoading(true);

      setTimeout(() => setIsLoading(false), 1000);
    };

    return (
      <Form>
        <Form.Search
          {...registerField('creatable')}
          {...args}
          onInputChange={handleInputChange}
          options={[]}
          isLoading={isLoading}
          creatableOption={{
            label: (inputValue) => `Create ${inputValue}`,
            shouldDisplay: (inputValue) => inputValue === 'New Amsterdam',
          }}
        />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const ShowPresetOptions: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { registerField } = useMelioForm({
      onSubmit: () => null,
    });

    const handleInputChange = () => {
      setIsLoading(true);

      setTimeout(() => setIsLoading(false), 1000);
    };

    return (
      <Form>
        <Form.Search
          {...registerField('openDropdownOnClick')}
          {...args}
          onInputChange={handleInputChange}
          options={citiesWithSections}
          isLoading={isLoading}
          shouldShowPresetOptions
        />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * Important to note that <i>you must turn off</i> `isLoading` <i>only **after** the options are set</i>.
 */
export const AsyncOptions: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [options, setOptions] = useState<SearchOptions>([]);
    const { registerField } = useMelioForm({
      defaultValues: { asyncOptions: 'kefar_sava' },
      onSubmit: () => null,
    });

    useEffect(() => {
      setIsLoading(true);

      setTimeout(() => {
        // The order here is important!
        // Doing this:
        // ```
        // setIsLoading(false);
        // setOptions(citiesWithSections);
        // ```
        // Won't work!
        setOptions(citiesWithSections);
        setIsLoading(false);
      }, 2000);
    }, []);

    const handleInputChange = () => {
      setIsLoading(true);

      setTimeout(() => setIsLoading(false), 1000);
    };

    return (
      <Form>
        <Form.Search
          {...registerField('asyncOptions')}
          {...args}
          onInputChange={handleInputChange}
          options={options}
          isLoading={isLoading}
        />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const ExternalFilterOptions: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { registerField } = useMelioForm({ onSubmit: () => null });

    const handleInputChange = () => {
      setIsLoading(true);

      setTimeout(() => setIsLoading(false), 1000);
    };

    const filterOptions: FormSearchProps['filterOptions'] = (options, searchTerm) =>
      searchTerm ? options.filter((option) => option.label.toLowerCase().startsWith(searchTerm.toLowerCase())) : [];

    return (
      <Form>
        <Form.Search
          {...registerField('externalFilterOptions')}
          {...args}
          onInputChange={handleInputChange}
          options={citiesWithSections}
          isLoading={isLoading}
          filterOptions={filterOptions}
        />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithLeftIcons: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <Form.Search {...registerField('withLeftIcon')} {...args} options={citiesWithLeftIcons} />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithRightIcons: StoryObj<typeof Form.Search> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <Form.Search {...registerField('withRightIcon')} {...args} options={citiesWithRightIcons} />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * This example demonstrates how to visually hide a field from the UI while keeping it present in the DOM.<br />
 * Use the `isHidden` prop to hide the field, and inspect the DOM using developer tools to see the `data-hidden` attribute.<br />
 *
 * **Note:** To prevent the field from rendering entirely, use the React pattern: `{condition && <Form.Search ... />}`.<br />
 */
export const IsHidden: StoryObj<typeof Form.Search> = {
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
          <Form.Search {...registerField('field1')} {...args} isHidden={isFieldHidden} />
          {/* Field conditionally rendered based on `isFieldHidden` */}
          {!isFieldHidden && <Form.Search {...registerField('field2')} {...args} />}
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
