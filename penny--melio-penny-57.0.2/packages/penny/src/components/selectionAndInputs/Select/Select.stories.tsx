/* eslint-disable @typescript-eslint/no-deprecated */
import { noop } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { screen, userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { Icon } from '@/components/foundations/Icon';
import { commonFormFieldControls, fullScreenChromaticDecorator } from '@/test-utils';

import {
  cities,
  citiesWithAvatars,
  citiesWithLeftIcons,
  citiesWithRightIcons,
  citiesWithSectionsAndAvatars,
  citiesWithSectionsAndDescriptions,
} from './__fixtures__/mock-data';
import { Select } from './Select';
import type { SelectProps } from './Select.types';

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

const args: SelectProps = {
  options: cities,
  placeholder: 'Choose your hometown...',
  viewModePlaceholder: 'No city selected',
  emptyState: { label: 'No options' },
  creatableOption: { label: (value: string) => `Add "${value}" as a city` },
  size: 'large',
  isDisabled: false,
  isReadOnly: false,
  isLoading: false,
  isViewMode: false,
  isInvalid: false,
  onInputChange: noop,
  onSearchTermReset: undefined,
  autoFocus: false,
};

/**
 * This component is **deprecated**. Please use [SelectNew](?path=/docs/selection-inputs-components-select-new--docs).
 */

const meta: Meta<typeof Select> = {
  title: 'Selection & Inputs Components/Select [deprecated]',

  component: Select,
  parameters: {
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
          summary: 'SelectOption[] | SelectSection[]',
          detail: optionsType,
        },
      },
    },
    emptyState: {
      control: 'object',
      description: 'Sets the message and action in the select when there are no options (after typing in the input).',
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
    autoFocus: {
      control: 'boolean',
      description: 'Set the input field to be focused on mount.',
      table: {
        category: 'props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: 'text',
      description: "The display value of the select. **It must exist as one of its options' labels**.",
      table: { category: 'props', type: { summary: 'string' } },
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
    autoComplete: commonFormFieldControls['autoComplete'],
  },
  args,
};
export default meta;

export const Main: StoryObj<typeof Select> = {
  render: (args) => <Select {...args} />,
  decorators: [fullScreenChromaticDecorator],
  play: async () => userEvent.click(screen.getByRole('combobox')),
};

export const EmptyState: StoryObj<typeof Select> = {
  render: () => <Select {...args} options={[]} emptyState={{ label: 'No options' }} creatableOption={undefined} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const EmptyStateClickable: StoryObj<typeof Select> = {
  render: () => (
    <Select
      {...args}
      options={[]}
      creatableOption={undefined}
      emptyState={{ label: "Didn't find what you were looking for?", onClick: () => null }}
    />
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * You can display an element on the right side of the input value by passing it throguh the `valueRightElement` prop. The element will be displayed when the input is out of focus.
 */

export const ValueRightElement: StoryObj<typeof Select> = {
  render: () => <Select {...args} value="Tel Aviv" valueRightElement={<Icon type="repeat" size="small" />} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Sizes: StoryObj<typeof Select> = {
  render: () => {
    const items = [
      { label: 'Small', component: <Select {...args} size="small" /> },
      { label: 'Large', component: <Select {...args} size="large" /> },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" justifyContent="flex-start" />;
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

export const CreatableOption: StoryObj<typeof Select> = {
  render: () => {
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
        <Select
          {...args}
          aria-label="creatable option"
          options={options}
          creatableOption={{
            label: (value: string) => `Add "${value}" as a city`,
            onClick: handleCreate,
          }}
        />
      </Group>
    );
  },
  parameters: {
    chromatic: {
      delay: 1000,
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

export const DecidingWhenToDisplayTheCreateOption: StoryObj<typeof Select> = {
  render: () => {
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
        <Select
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
      </Group>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Invalid: StoryObj<typeof Select> = {
  render: () => <Select {...args} isInvalid />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Disabled: StoryObj<typeof Select> = {
  render: () => {
    const items = [
      { label: 'Without value', component: <Select {...args} isDisabled /> },
      { label: 'With value', component: <Select {...args} value="Netivot" isDisabled /> },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" justifyContent="flex-start" />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const ReadOnly: StoryObj<typeof Select> = {
  render: () => {
    const items = [
      { label: 'Without value', component: <Select {...args} isReadOnly /> },
      { label: 'With value', component: <Select {...args} value="Tiberias" isReadOnly /> },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" justifyContent="flex-start" />;
  },
  parameters: {
    chromatic: { delay: 1000, disableSnapshot: true },
  },
};

export const ViewMode: StoryObj<typeof Select> = {
  render: () => {
    const items = [
      { label: 'Without value', component: <Select {...args} isViewMode /> },
      { label: 'With value', component: <Select {...args} value="Tiberias" isViewMode /> },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Loading: StoryObj<typeof Select> = {
  render: () => {
    const items = [
      { label: 'Without value', component: <Select {...args} isLoading /> },
      { label: 'With value', component: <Select {...args} value="Tiberias" isLoading /> },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const CustomSelectedOptionFormat: StoryObj<typeof Select> = {
  render: () => <Select {...args} formatSelectedValue={(option) => `You have selected - ${option.label}`} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithDescription: StoryObj<typeof Select> = {
  render: () => {
    const [selectedOptionValue, setSelectedOptionValue] = useState<string | null>(null);

    const sectionVerified = !!citiesWithSectionsAndAvatars.find((section) =>
      section.options.find((option) => option.value === selectedOptionValue)
    );

    return (
      <Select
        {...args}
        options={citiesWithSectionsAndDescriptions}
        valueRightElement={sectionVerified ? <Icon size="small" type="verified" color="brand" /> : undefined}
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

export const WithSections: StoryObj<typeof Select> = {
  render: () => {
    const [selectedOptionValue, setSelectedOptionValue] = useState<string | null>(null);

    const sectionVerified = !!citiesWithSectionsAndAvatars.find((section) =>
      section.options.find((option) => option.value === selectedOptionValue)
    );

    return (
      <Select
        {...args}
        options={citiesWithSectionsAndDescriptions}
        valueRightElement={sectionVerified ? <Icon size="small" type="verified" color="brand" /> : undefined}
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

export const WithAvatars: StoryObj<typeof Select> = {
  render: () => {
    const [selectedOptionValue, setSelectedOptionValue] = useState<string | null>(null);

    const sectionVerified = !!citiesWithSectionsAndAvatars.find((section) =>
      section.options.find((option) => option.value === selectedOptionValue)
    );

    const items = [
      {
        label: 'Without sections',
        component: <Select {...args} options={citiesWithAvatars} />,
      },
      {
        label: 'With sections',
        component: (
          <Select
            {...args}
            options={citiesWithSectionsAndAvatars}
            valueRightElement={sectionVerified ? <Icon size="small" type="verified" color="brand" /> : undefined}
            onChange={(e) => setSelectedOptionValue(e.target.value)}
          />
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="stretch" />;
  },
  parameters: { chromatic: { diffThreshold: 0.8, disableSnapshot: true } },
};

export const WithLeftIcons: StoryObj<typeof Select> = {
  render: () => <Select {...args} options={citiesWithLeftIcons} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithRightIcons: StoryObj<typeof Select> = {
  render: () => <Select {...args} options={citiesWithRightIcons} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
