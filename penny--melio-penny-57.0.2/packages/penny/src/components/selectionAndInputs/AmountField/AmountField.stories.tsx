import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { commonFormFieldControls, fullScreenChromaticDecorator } from '@/test-utils';
import { extractComponentSource } from '@/test-utils/storybook.utils';

import { AmountField, FormField } from '../../..';
import { EndElementDisabledExample, EndElementExample, EndElementReadOnlyExample } from './AmountField.examples';
import AmountFieldExamples from './AmountField.examples?raw';

const maskPropsType = `
type Mask = Array<string | RegExp> | false;

type MaskProps = {
  mask: Mask | ((value: string) => Mask);
  guide?: boolean;
  placeholderChar?: string;
  keepCharPositions?: boolean;
  showMask?: boolean;
}`;

const meta: Meta<typeof AmountField> = {
  title: 'Selection & Inputs Components/Amount Field',
  component: AmountField,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    value: {
      control: 'number',
      description: 'The field value.',
      table: { type: { summary: 'string' }, category: 'props' },
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
    maskProps: {
      control: 'object',
      description:
        'Options for input masking.\n\nSee [text-mask](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme) for more information.',
      table: {
        type: {
          summary: 'options',
          detail: maskPropsType,
        },
        category: 'props',
      },
    },
    integerLimit: {
      control: 'number',
      description: 'Sets the number of digits to allow before the decimal point.',
      table: { defaultValue: { summary: 'Number.MAX_SAFE_INTEGER' }, type: { summary: 'number' }, category: 'props' },
    },
    decimalLimit: {
      control: 'number',
      description: 'Sets the number of digits to allow after the decimal point.',
      table: { defaultValue: { summary: '2' }, type: { summary: 'number' }, category: 'props' },
    },
    currency: {
      control: 'text',
      description: 'Sets the currency type of the input.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    currencySign: {
      control: 'text',
      description: 'Sets the currency sign (e.g., "$", "€", "฿").',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    locale: {
      control: 'text',
      description: 'Sets the locale for currency formatting (e.g., "en-US", "th-TH").',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    allowNegativeValue: {
      control: 'boolean',
      description: 'Determines if negative values are allowed.',
      table: {
        category: 'props',
        type: {
          summary: 'boolean',
        },
        defaultValue: { summary: 'true' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'end'],
      description: 'value and placeholder alignment.',
      table: { defaultValue: { summary: 'start' }, type: { summary: 'start | end' }, category: 'props' },
    },
    endElement: {
      control: 'text',
      description: 'An element that appears as a suffix of the input.',
      table: {
        category: 'props',
        type: {
          summary: 'ReactElement',
        },
      },
    },
    decimalScale: {
      control: 'number',
      description: 'Format the decimals onBlur to the specified length, padding or trimming as necessary.',
      table: { type: { summary: 'number' }, category: 'props' },
    },
    autoComplete: commonFormFieldControls['autoComplete'],
    autoFocus: commonFormFieldControls['autoFocus'],
    formatValueOnBlur: {
      control: 'boolean',
      description:
        'If true (default), `onValueChange` is triggered when the input loses focus. Set to false to prevent `onValueChange` on blur.',
      table: {
        category: 'props',
        type: {
          summary: 'boolean',
        },
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    value: undefined,
    align: 'start',
    placeholder: '$0.00',
    integerLimit: undefined,
    decimalLimit: undefined,
    currency: 'USD',
    currencySign: '$',
    locale: 'en-US',
    allowNegativeValue: true,
    size: 'large',
    isDisabled: false,
    isReadOnly: false,
    isLoading: false,
    isViewMode: false,
    isInvalid: false,
    viewModePlaceholder: undefined,
    decimalScale: undefined,
    autoComplete: 'off',
    autoFocus: false,
    formatValueOnBlur: true,
  },
};
export default meta;

export const Main: StoryObj<typeof AmountField> = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return <AmountField {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

export const EndElement: StoryObj<typeof AmountField> = {
  args: {
    ...Main.args,
    placeholder: undefined,
  },
  render: (args) => <EndElementExample {...args} />,
  decorators: [fullScreenChromaticDecorator],
  parameters: { docs: { source: { code: extractComponentSource(AmountFieldExamples, 'EndElementExample') } } },
};

export const EndElementDisabled: StoryObj<typeof AmountField> = {
  args: {
    ...Main.args,
    placeholder: undefined,
  },
  render: (args) => <EndElementDisabledExample {...args} />,
  decorators: [fullScreenChromaticDecorator],
  parameters: { docs: { source: { code: extractComponentSource(AmountFieldExamples, 'EndElementDisabledExample') } } },
};

export const EndElementReadOnly: StoryObj<typeof AmountField> = {
  args: {
    ...Main.args,
    placeholder: undefined,
  },
  render: (args) => <EndElementReadOnlyExample {...args} />,
  decorators: [fullScreenChromaticDecorator],
  parameters: { docs: { source: { code: extractComponentSource(AmountFieldExamples, 'EndElementReadOnlyExample') } } },
};

export const Sizes: StoryObj<typeof AmountField> = {
  render: (args) => {
    const items = [
      { label: 'Small', component: <AmountField {...args} size="small" /> },
      { label: 'Large', component: <AmountField {...args} size="large" /> },
    ];

    return <Storybook.Row items={items} alignItems="stretch" alignCompLabel="vertical" />;
  },
};

export const Invalid: StoryObj<typeof AmountField> = {
  render: (args) => <AmountField {...args} isInvalid />,
};

export const Disabled: StoryObj<typeof AmountField> = {
  render: (args) => <AmountField {...args} isDisabled />,
};

export const ViewMode: StoryObj<typeof AmountField> = {
  render: (args) => {
    const items = [
      {
        label: 'Without value',
        component: <AmountField {...args} viewModePlaceholder="No amount provided" isViewMode />,
      },
      { label: 'With value', component: <AmountField {...args} isViewMode value={3} /> },
      {
        label: 'With value and decimal scale',
        component: <AmountField {...args} isViewMode value={3} decimalScale={2} />,
      },
    ];
    return <Storybook.Row items={items} alignItems="stretch" alignCompLabel="vertical" />;
  },
};

export const ReadOnly: StoryObj<typeof AmountField> = {
  render: (args) => <AmountField {...args} isReadOnly />,
};

export const Loading: StoryObj<typeof AmountField> = {
  render: (args) => <AmountField {...args} isLoading />,
};

export const Placeholder: StoryObj<typeof AmountField> = {
  render: (args) => {
    const items = [
      { label: 'Placeholder', component: <AmountField {...args} /> },
      {
        label: 'View-mode Placeholder',
        component: <AmountField {...args} isViewMode viewModePlaceholder="No currency provided" />,
      },
    ];

    return <Storybook.Row items={items} alignItems="stretch" alignCompLabel="vertical" />;
  },
};
/**
 * This story demonstrates how the AmountField component behaves when applying an integer limit.
 * The initial value **123456** is adjusted due to integerLimit={4}, resulting in **1234**.
 */
export const WithIntegerLimit: StoryObj<typeof AmountField> = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>('123456');

    return <AmountField {...args} onChange={(e) => setValue(e.target.value)} integerLimit={4} value={value} />;
  },
};

/**
 * This story demonstrates how the AmountField component behaves when applying both integer and decimal limits.
 * The initial value **123.456** is adjusted due to integerLimit={2} and decimalLimit={2}, resulting in **12.34**.
 */
export const WithDecimalLimit: StoryObj<typeof AmountField> = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>('123.456');

    return (
      <AmountField
        {...args}
        onChange={(e) => setValue(e.target.value)}
        integerLimit={2}
        decimalLimit={2}
        value={value}
      />
    );
  },
};

/**
 * This story demonstrates how the AmountField component behaves when applying a decimal scale.
 * With `decimalScale={3}`, the initial value **123** is formatted to **123.000**, ensuring it always displays three decimal places by padding with zeros if necessary.
 */
export const WithDecimalScale: StoryObj<typeof AmountField> = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>('123');
    return (
      <AmountField
        {...args}
        onChange={(e) => setValue(e.target.value)}
        decimalScale={3}
        decimalLimit={4}
        value={value}
      />
    );
  },
};

/**
 * Here's an example of a `AmountField` which `align` to start (default) and end.
 */

export const Align: StoryObj<typeof AmountField> = {
  render: (args) => {
    const items = [
      { label: 'Start', component: <AmountField {...args} align="start" /> },
      { label: 'End', component: <AmountField {...args} align="end" /> },
    ];

    return <Storybook.Row items={items} alignItems="stretch" alignCompLabel="vertical" />;
  },
};

/**
 * Here's an example of a `AmountField` which wrap with `FormField`.
 *
 * By default, FormField gets `align` to start (default) and `AmountField` gets `align` to start as well
 *
 * Both component are allowing `end` alignment - by passing `align` to the end.
 * */

export const WithFormField: StoryObj<typeof AmountField> = {
  render: (args) => {
    const items = [
      {
        label: 'Start',
        component: (
          <FormField
            labelProps={{
              label: 'justify to start',
              id: 'justify-to-start',
            }}
            helperText="Helper text justify to start."
            render={(props) => <AmountField {...args} {...props} />}
          />
        ),
      },
      {
        label: 'End',
        component: (
          <FormField
            labelProps={{
              label: 'align to end',
              id: 'align-to-end',
            }}
            helperText="Helper text align to end."
            align="end"
            render={(props) => <AmountField {...args} {...props} align="end" />}
          />
        ),
      },
    ];

    return <Storybook.Row items={items} alignItems="stretch" alignCompLabel="vertical" />;
  },
};

export const WithForeignExchange: StoryObj<typeof AmountField> = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>('1234.56');

    const items = [
      {
        label: 'Thai Baht (THB)',
        component: (
          <AmountField
            {...args}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            currency="THB"
            currencySign="฿"
            locale="th-TH"
            placeholder="฿0.00"
          />
        ),
      },
      {
        label: 'Romanian Leu (RON)',
        component: (
          <AmountField
            {...args}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            currency="RON"
            currencySign="lei"
            locale="ro-RO"
            placeholder="lei0,00"
          />
        ),
      },
      {
        label: 'Euro (EUR)',
        component: (
          <AmountField
            {...args}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            currency="EUR"
            currencySign="€"
            locale="en-IE"
            placeholder="€0.00"
          />
        ),
      },
      {
        label: 'United States Dollar (USD)',
        component: (
          <AmountField
            {...args}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            currency="USD"
            currencySign="$"
            locale="en-US"
          />
        ),
      },
    ];

    return <Storybook.Row items={items} alignItems="stretch" alignCompLabel="vertical" />;
  },
};
