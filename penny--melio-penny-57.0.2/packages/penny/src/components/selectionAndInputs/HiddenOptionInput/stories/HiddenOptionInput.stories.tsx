import type { Meta, StoryObj } from '@storybook/react-vite';

import { extractComponentSource } from '@/test-utils/storybook.utils';

import { HIDDEN_OPTION_INPUT_DEFAULT_TEST_ID, HiddenOptionInput } from '..';
import { MultiSelectionExample, SingleSelectionExample } from './examples/HiddenOptionInput.examples';
import ExampleRaw from './examples/HiddenOptionInput.examples?raw';

/**
 * `HiddenOptionInput` is a component that allows you to render an input with a custom style.
 * The main use case is for rendering single / multi select that behaves like a radio / checkbox but with any style.
 * Your custom input should support controlling its hover and active state using props.
 */

const meta: Meta<typeof HiddenOptionInput> = {
  component: HiddenOptionInput,
  title: 'Selection & Inputs Components/Hidden Option Input',
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'The selected state of the hidden option input.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    type: {
      control: 'select',
      description: 'The type of the hidden option input.',
      table: { defaultValue: { summary: 'radio' }, type: { summary: 'radio | checkbox' }, category: 'props' },
      options: ['radio', 'checkbox'],
    },
    children: {
      control: false,
      description: 'The content of the hidden option input.',
      table: { type: { summary: '({ hover: boolean, active: boolean }) => ReactNode' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The data-testid of the hidden option input.',
      table: {
        defaultValue: { summary: HIDDEN_OPTION_INPUT_DEFAULT_TEST_ID },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    selected: false,
    type: 'radio',
  },
};

export default meta;

export const SingleSelection: StoryObj<typeof HiddenOptionInput> = {
  render: () => <SingleSelectionExample />,
  parameters: {
    docs: {
      source: {
        code: extractComponentSource(ExampleRaw, 'SingleSelectionExample'),
      },
    },
  },
};

export const MultiSelection: StoryObj<typeof HiddenOptionInput> = {
  render: () => <MultiSelectionExample />,
  parameters: {
    docs: {
      source: {
        code: extractComponentSource(ExampleRaw, 'MultiSelectionExample'),
      },
    },
  },
};
