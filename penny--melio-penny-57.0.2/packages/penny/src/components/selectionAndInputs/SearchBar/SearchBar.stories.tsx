import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type ChangeEvent, useState } from 'react';

import { Group } from '@/components/containers/Group';
import { extractComponentSource } from '@/test-utils/storybook.utils';

import { SearchBar } from './SearchBar';
import { OnSearchExample, UsingDebounceExample, WithEventsExample } from './SearchBar.examples';
import SearchBarExamples from './SearchBar.examples?raw';
import { type SearchBarProps } from './SearchBar.types';

/**
 * Please have a look at [OnSearch](/docs/selection-inputs-components-search-bar--on-search)  story, it contains the updated example that matches the latest design guidelines.
 **/

const meta: Meta<typeof SearchBar> = {
  title: 'Selection & Inputs Components/Search Bar',
  component: SearchBar,
  parameters: { chromatic: { viewports: [375, 1920] } },
  argTypes: {
    value: {
      control: 'text',
      description: 'The search term',
      table: { category: 'props', type: { summary: 'string' } },
    },
    placeholder: {
      control: 'text',
      description: 'Input placeholder',
      table: { category: 'props', type: { summary: 'string' } },
    },
    isDisabled: {
      control: 'boolean',
      description: 'If set to true, the search bar is disabled',
      table: { category: 'props', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    isFullWidth: {
      control: 'boolean',
      description:
        'If set to true, the search bar will take the full width of its parent and will not expand / collapse.',
      table: { category: 'props', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    autoFocus: {
      control: 'boolean',
      description: 'If set to true, the search bar will focus when mounted',
      table: { category: 'props', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    'aria-label': {
      control: 'text',
      description: 'An aria-label for the search bar. It is necessary for accessibility.',
      table: { category: 'accessibility', type: { summary: 'string' }, defaultValue: { summary: 'Search' } },
    },
    label: {
      control: 'text',
      description: 'The label of the SearchBar component.',
      table: { category: 'props', type: { summary: 'string' } },
    },
    onChange: {
      control: { disable: true },
      action: 'input value changed',
      description: "Captures and handles changes to the input's value as the user types or modifies the search text.",
      table: {
        category: 'event',
        summary: 'event',
        type: { summary: 'ChangeEventHandler<HTMLInputElement>' },
      },
    },
    onBlur: {
      control: { disable: true },
      action: 'input blur',
      description:
        'Triggers an action when the input loses focus, such as when the user clicks outside of the input or tabs away from it.',
      table: {
        category: 'event',
        summary: 'event',
        type: { summary: 'FocusEventHandler<HTMLInputElement>' },
      },
    },
    onFocus: {
      control: { disable: true },
      action: 'input focus',
      description:
        'Triggers an action when the input gains focus, such as when the user clicks inside the input or tabs to it.',
      table: {
        category: 'event',
        summary: 'event',
        type: { summary: 'FocusEventHandler<HTMLInputElement>' },
      },
    },
    onClear: {
      control: { disable: true },
      description: 'Performs an action when the clear button or icon is clicked to remove the search text.',
      table: { category: 'event', summary: 'event', type: { summary: '() => void' } },
    },
    onSearch: {
      control: { disable: true },
      description:
        'Triggers an action when the search button clicked or when pressing Enter using the key board. <br /> When using the `onSearch` event, the search icon will be displayed on the right side of the search bar as button.',
      table: {
        category: 'event',
        summary: 'event',
        type: { summary: "(value?: InputHTMLAttributes<HTMLInputElement>['value']) => void" },
      },
    },
    onKeyDown: {
      control: { disable: true },
      description: 'Triggers an action when a key is initially pressed down while the input is in focus.',
      table: {
        category: 'event',
        summary: 'event',
        type: { summary: 'KeyboardEventHandler<HTMLInputElement>' },
      },
    },
    onKeyUp: {
      control: { disable: true },
      description: 'Triggers an action when a key is released after being pressed down while the input is in focus.',
      table: {
        category: 'event',
        summary: 'event',
        type: { summary: 'KeyboardEventHandler<HTMLInputElement>' },
      },
    },
    inputProps: {
      description: 'The props to be passed to the input element.',
      control: 'object',
      table: {
        type: { summary: 'InputHTMLAttributes<HTMLInputElement>' },
        category: 'props',
      },
    },
    instructionsText: {
      description:
        'The instructions the screen-reader will read, when the search field focus (used for accessibility).',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'accessibility',
      },
    },
    valueClearedMessage: {
      description:
        'The message the screen-reader will read, when the search field value cleared (used for accessibility).',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Value cleared' },
        category: 'accessibility',
      },
    },
    searchButtonAriaLabel: {
      description: 'The aria-label of the search button',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Search' },
        category: 'accessibility',
      },
    },
    clearButtonAriaLabel: {
      description: 'The aria-label of the clear button',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'clear search' },
        category: 'accessibility',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'search-bar' }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: {
    value: '',
    placeholder: 'Search...',
    autoFocus: false,
    isDisabled: false,
    isFullWidth: false,
    onChange: undefined,
    onBlur: undefined,
    onFocus: undefined,
    onClear: undefined,
    onKeyUp: undefined,
    onKeyDown: undefined,
    onSearch: undefined,
    searchButtonAriaLabel: undefined,
    instructionsText: undefined,
    'data-testid': 'search-bar',
  },
};
export default meta;

export const Main: StoryObj<SearchBarProps> = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return <SearchBar {...args} onChange={handleInputChange} value={value} />;
  },
};

export const UsingDebounce: StoryObj<SearchBarProps> = {
  render: (args) => <UsingDebounceExample {...args} />,
  parameters: {
    docs: { source: { code: extractComponentSource(SearchBarExamples, 'UsingDebounceExample') } },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithDefaultValue: StoryObj<SearchBarProps> = {
  render: (args) => {
    const [value, setValue] = useState('default value');
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return <SearchBar {...args} onChange={onChange} value={value} />;
  },
};

export const WithEvents: StoryObj<SearchBarProps> = {
  render: (args) => <WithEventsExample {...args} />,
  parameters: {
    docs: { source: { code: extractComponentSource(SearchBarExamples, 'WithEventsExample') } },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * This story demonstrates how to use the `onSearch` event to simulate a search behavior when the user click the search button or presses the Enter key.
 * When using the `onSearch` event, the search icon will be displayed on the right side of the search bar as button.
 */
export const OnSearch: StoryObj<SearchBarProps> = {
  render: (args) => <OnSearchExample {...args} />,
  parameters: { docs: { source: { code: extractComponentSource(SearchBarExamples, 'OnSearchExample') } } },
};

export const Disabled: StoryObj<SearchBarProps> = {
  render: (args) => (
    <Group>
      <SearchBar {...args} isDisabled />
      <SearchBar {...args} value="Default value" isDisabled />
    </Group>
  ),
};

export const FullWidth: StoryObj<SearchBarProps> = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return <SearchBar {...args} onChange={handleInputChange} value={value} isFullWidth />;
  },
};

export const WithLabel: StoryObj<SearchBarProps> = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return <SearchBar {...args} onChange={handleInputChange} value={value} label="Search bills" />;
  },
};
