/* eslint-disable @typescript-eslint/no-deprecated */
import { useBoolean } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { screen, userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { Drawer } from '@/components/containers/Drawer';
import { Icon } from '@/components/foundations/Icon';
import { commonFormFieldControls, fullScreenChromaticDecorator } from '@/test-utils';

import type { SearchOption, SearchOptions, SearchProps, SearchSection } from '.';
import { Search } from '.';
import {
  cities,
  citiesWithAvatars,
  citiesWithLeftIcons,
  citiesWithRightIcons,
  citiesWithSections,
  citiesWithSectionsAndAvatars,
  citiesWithSectionsAvatarsDescription,
} from './__fixtures__/mock-data';

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
  }[]];  testId?: string;
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
 * This component is **deprecated** Please use [Combobox](?path=/docs/selection-inputs-components-combobox-new--docs).<br />
 *
 * The `Search` component is a versatile tool for searching and selecting options from a list. <br />
 *
 * ** Pay attention: **<br />
 * It's the consumer responsibility when using the `Search` component in different context (e.g `Modal` / `Drawer`), to ensure proper adoption by setting the `statusMessageParentSelector` prop to meet accessibility standards for announcing the search's state. See [Search In Drawer](#search-in-drawer) story for an example.
 */
const meta: Meta<typeof Search> = {
  title: 'Selection & Inputs Components/Search [deprecated]',
  component: Search,
  parameters: {
    docs: { source: { type: 'code' } },
    chromatic: { delay: 300 },
    a11y: {
      // deprecated component
      test: 'off',
    },
  },
  argTypes: {
    options: {
      control: 'object',
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
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'The size of the field.',
      table: { defaultValue: { summary: 'large' }, type: { summary: 'small | large' }, category: 'props' },
    },
    isLoadingField: {
      control: 'boolean',
      description: 'Determines if the field is loading.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
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
      table: { type: { summary: 'string' }, category: 'props' },
    },
    viewModePlaceholder: {
      control: 'text',
      description: 'The placeholder text for when there is no value and the field is in view-only mode.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    value: {
      control: 'text',
      description: "The display value of the search component. **It must exist as one of its options' labels**.",
      table: { category: 'props', type: { summary: 'string' } },
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
    autoFocus: {
      control: 'boolean',
      description: 'Set input field to be focused on mount.',
      table: {
        category: 'props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      description: 'A callback function that is invoked when the select value changes.',
      table: {
        category: 'events',
        type: {
          summary: 'ChangeEventHandler<HTMLInputElement>',
        },
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
      description: 'An event for when the search term is reset',
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
    autoComplete: commonFormFieldControls['autoComplete'],
    statusMessageParentSelector: {
      control: 'text',
      description:
        'Specify the root element selector where the search component renders the `search-a11y-status-message` to announce the search state.',
      table: {
        category: 'accessibility',
        type: { summary: 'string' },
        defaultValue: { summary: 'document.body' },
      },
    },
  },
  args: {
    options: cities,
    placeholder: 'Choose your home town...',
    viewModePlaceholder: 'No address selected',
    emptyState: { label: 'No options' },
    creatableOption: undefined,
    size: 'large',
    isDisabled: false,
    isReadOnly: false,
    isLoading: false,
    isLoadingField: false,
    isViewMode: false,
    isInvalid: false,
    shouldShowPresetOptions: false,
    formatSelectedValue: (option) => option.label,
    onSearchTermReset: undefined,
    onClear: undefined,
    autoFocus: false,
  },
};
export default meta;

export const Main: StoryObj<typeof Search> = {
  render: (args) => {
    const [options, setOptions] = useState<SearchOptions>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = (inputValue: string) => {
      setIsLoading(true);
      void fetchOptions(inputValue, cities)
        .then((results) => setOptions(results))
        .finally(() => setIsLoading(false));
    };

    return <Search {...args} options={options} onInputChange={handleInputChange} isLoading={isLoading} />;
  },
  decorators: [fullScreenChromaticDecorator],
  play: async () => userEvent.type(screen.getByRole('combobox'), 'a'),
};

/**
 * You can display an element on the right side of the input value by passing it throguh the `valueRightElement` prop. The element will be displayed when there input isn't in focus.
 */
export const ValueRightElement: StoryObj<typeof Search> = {
  render: (args) => {
    const [options, setOptions] = useState<SearchOptions>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = (inputValue: string) => {
      setIsLoading(true);
      void fetchOptions(inputValue, cities)
        .then((results) => setOptions(results))
        .finally(() => setIsLoading(false));
    };

    return (
      <Search
        {...args}
        options={options}
        isLoading={isLoading}
        onInputChange={handleInputChange}
        valueRightElement={<Icon type="repeat" size="small" />}
      />
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Sizes: StoryObj<typeof Search> = {
  render: (args) => {
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
          <Search {...args} options={options} isLoading={isLoading} onInputChange={handleInputChange} size="small" />
        ),
      },
      {
        label: 'Large',
        component: (
          <Search {...args} options={options} isLoading={isLoading} onInputChange={handleInputChange} size="large" />
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" justifyContent="flex-start" />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const ClickableEmptyState: StoryObj<typeof Search> = {
  render: (args) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    return (
      <Search
        {...args}
        isLoading={isLoading}
        options={[]}
        onInputChange={handleInputChange}
        emptyState={{ label: "I can't find my address", onClick: () => null }}
      />
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const EmptyState: StoryObj<typeof Search> = {
  render: (args) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    return (
      <Search
        {...args}
        isLoading={isLoading}
        options={[]}
        onInputChange={handleInputChange}
        emptyState={{ label: 'No options' }}
      />
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Invalid: StoryObj<typeof Search> = {
  render: (args) => {
    const [options, setOptions] = useState<SearchOptions>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = (inputValue: string) => {
      setIsLoading(true);
      void fetchOptions(inputValue, cities)
        .then((results) => setOptions(results))
        .finally(() => setIsLoading(false));
    };

    return <Search {...args} options={options} isLoading={isLoading} onInputChange={handleInputChange} isInvalid />;
  },
  parameters: {
    chromatic: {
      delay: 1000,
      disableSnapshot: true,
    },
  },
};

export const Disabled: StoryObj<typeof Search> = {
  render: (args) => {
    const items = [
      { label: 'Without value', component: <Search {...args} isDisabled /> },
      { label: 'With value', component: <Search {...args} value="Netivot" isDisabled /> },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" justifyContent="flex-start" />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const ReadOnly: StoryObj<typeof Search> = {
  render: (args) => {
    const items = [
      { label: 'Without value', component: <Search {...args} isReadOnly /> },
      { label: 'With value', component: <Search {...args} value="Tiberias" isReadOnly /> },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" justifyContent="flex-start" />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const LoadingField: StoryObj<typeof Search> = {
  render: (args) => {
    const items = [
      { label: 'Without value', component: <Search {...args} isLoadingField /> },
      { label: 'With value', component: <Search {...args} value="Tiberias" isLoadingField /> },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const ViewMode: StoryObj<typeof Search> = {
  render: (args) => {
    const items = [
      { label: 'Without value', component: <Search {...args} isViewMode /> },
      { label: 'With value', component: <Search {...args} value="Tiberias" isViewMode /> },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" justifyContent="flex-start" />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const CustomSelectedOptionFormat: StoryObj<typeof Search> = {
  render: (args) => {
    const [options, setOptions] = useState<SearchOptions>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = (inputValue: string) => {
      setIsLoading(true);
      void fetchOptions(inputValue, cities)
        .then((results) => setOptions(results))
        .finally(() => setIsLoading(false));
    };
    return (
      <Search
        {...args}
        options={options}
        isLoading={isLoading}
        onInputChange={handleInputChange}
        formatSelectedValue={(option) => `You have selected - ${option.label}`}
      />
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithSections: StoryObj<typeof Search> = {
  render: (args) => {
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
      <Search
        {...args}
        options={options}
        onInputChange={handleInputChange}
        isLoading={isLoading}
        valueRightElement={optionSectionVerified ? <Icon type="verified" size="small" color="brand" /> : undefined}
        onChange={(e) => setSelectedOptionValue(e.target.value)}
      />
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithDescription: StoryObj<typeof Search> = {
  render: (args) => {
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
          <Search
            {...args}
            options={optionsWithoutAvatars}
            onInputChange={handleInputChangeWithoutAvatars}
            isLoading={isLoadingWithoutAvatars}
            onChange={(e) => setSelectedOptionValueWithoutAvatars(e.target.value)}
            valueRightElement={inputValueIconWithoutAvatars}
          />
        ),
      },
      {
        label: 'With avatars',
        component: (
          <Search
            {...args}
            options={optionsWithAvatars}
            onInputChange={handleInputChangeWithAvatars}
            isLoading={isLoadingWithAvatars}
            onChange={(e) => setSelectedOptionValueWithAvatars(e.target.value)}
            valueRightElement={valueRightElement}
          />
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithAvatars: StoryObj<typeof Search> = {
  render: (args) => {
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
          <Search
            {...args}
            options={optionsWithoutSections}
            onInputChange={handleInputChangeWithoutSections}
            isLoading={isLoadingWithoutSections}
            onChange={(e) => setSelectedOptionValueWithoutSections(e.target.value)}
            valueRightElement={
              optionWithoutSectionVerified ? <Icon type="verified" color="brand" size="small" /> : undefined
            }
          />
        ),
      },
      {
        label: 'With sections',
        component: (
          <Search
            {...args}
            options={optionsWithSections}
            onInputChange={handleInputChangeWithSections}
            isLoading={isLoadingWithSections}
            onChange={(e) => setSelectedOptionValueWithSections(e.target.value)}
            valueRightElement={optionSectionVerified ? <Icon type="verified" color="brand" size="small" /> : undefined}
          />
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * In case the option is not in the options list, we supply a way for the user to add their own option using a special "creatable option".
 * This special option can be adjusted by the developers.
 */
export const WithCreatableOption: StoryObj<typeof Search> = {
  render: (args) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = () => {
      setIsLoading(true);

      setTimeout(() => setIsLoading(false), 1000);
    };

    return (
      <Search
        {...args}
        onInputChange={handleInputChange}
        options={[]}
        isLoading={isLoading}
        creatableOption={{
          label: (inputValue) => `Create ${inputValue}`,
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

/**
 * In case you want to show the creatable option under your own custom condition you can use `creatableOption.shouldDisplay` prop.<br />
 * This prop accepts a function that gets the current input value and returns a boolean to whether or not display the creatable option:<br />
 * `(inputValue: string) => boolean`<br />
 * In the example below, we display the creatable option only when the input value is 'New Amsterdam'.
 *
 * The default behavior of this prop is to display the creatable option when the input value is not empty and there are no matched options.
 */
export const DecidingWhenToDisplayTheCreateOption: StoryObj<typeof Search> = {
  render: (args) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = () => {
      setIsLoading(true);

      setTimeout(() => setIsLoading(false), 1000);
    };

    return (
      <Search
        {...args}
        onInputChange={handleInputChange}
        options={[]}
        isLoading={isLoading}
        creatableOption={{
          label: (inputValue) => `Create ${inputValue}`,
          shouldDisplay: (inputValue) => inputValue === 'New Amsterdam',
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

export const ShowPresetOptions: StoryObj<typeof Search> = {
  render: (args) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = () => {
      setIsLoading(true);

      setTimeout(() => setIsLoading(false), 1000);
    };

    return (
      <Search
        {...args}
        onInputChange={handleInputChange}
        options={citiesWithSections}
        isLoading={isLoading}
        shouldShowPresetOptions
      />
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
export const AsyncOptions: StoryObj<typeof Search> = {
  render: (args) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [options, setOptions] = useState<SearchOptions>([]);

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
      <Search {...args} onInputChange={handleInputChange} options={options} isLoading={isLoading} value="kefar_sava" />
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const ExternalFilterOptions: StoryObj<typeof Search> = {
  render: (args) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = () => {
      setIsLoading(true);

      setTimeout(() => setIsLoading(false), 1000);
    };

    const filterOptions: SearchProps['filterOptions'] = (options, searchTerm) =>
      searchTerm ? options.filter((option) => option.label.toLowerCase().startsWith(searchTerm.toLowerCase())) : [];

    return (
      <Search
        {...args}
        onInputChange={handleInputChange}
        options={citiesWithSections}
        isLoading={isLoading}
        filterOptions={filterOptions}
      />
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithLeftIcons: StoryObj<typeof Search> = {
  render: (args) => <Search {...args} options={citiesWithLeftIcons} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithRightIcons: StoryObj<typeof Search> = {
  render: (args) => <Search {...args} options={citiesWithRightIcons} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * From an accessibility perspective, here's an example of how to use the `Search` component within a `Drawer`:<br />
 * To correctly announce the search state, the `search-a11y-status-message` renders a visually hidden element that is announced by screen readers, and it renders by default in the page's body element.<br />
 * When the search is rendered inside a drawer, the `search-a11y-status-message` should also be rendered inside the drawer element to ensure it is correctly announced by screen readers, as all elements outside the drawer are hidden from the screen reader.<br />
 * Use the `statusMessageParentSelector` prop to specify the root element to insert the `search-a11y-status-message`. (Click on show code for reference)<br />
 */
export const SearchInDrawer: StoryObj<typeof Search> = {
  render: () => {
    const [isDrawerOpen, drawerOpen] = useBoolean(false);
    const [options, setOptions] = useState<SearchOptions>([]);
    const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);

    const handleInputChange = (inputValue: string) => {
      setIsSearchLoading(true);
      void fetchOptions(inputValue, cities)
        .then((results) => setOptions(results))
        .finally(() => setIsSearchLoading(false));
    };

    return (
      <>
        <Button onClick={drawerOpen.on} label="Open Drawer" aria-haspopup="dialog" />
        <Drawer
          isOpen={isDrawerOpen}
          onClose={drawerOpen.off}
          header={<Storybook.ContentPlaceholder label="Header" />}
          footer={<Storybook.ContentPlaceholder label="Footer" />}
          body={
            <Storybook.Container>
              <Search
                emptyState={{ label: 'No options' }}
                options={options}
                isLoading={isSearchLoading}
                onInputChange={handleInputChange}
                // This is a regex to match the drawer's element selector
                statusMessageParentSelector={`[id^="floating-"][aria-modal="true"][role="dialog"]`}
              />
            </Storybook.Container>
          }
        />
      </>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
