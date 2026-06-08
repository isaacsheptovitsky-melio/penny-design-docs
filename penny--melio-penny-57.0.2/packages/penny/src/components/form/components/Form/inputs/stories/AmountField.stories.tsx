/* eslint-disable @typescript-eslint/no-deprecated */
import { SimpleGrid } from '@chakra-ui/react';
import { noop, useBoolean } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';
import { screen, userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';
import type { SchemaOf } from 'yup';
import * as yup from 'yup';

import { type TypographyLabelProps } from '@/components';
import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { useMelioForm } from '@/components/form/hooks';
import { commonFormFieldArgs, commonFormFieldControls } from '@/test-utils/stories.utils';

import { Form } from '../..';

const meta: Meta<typeof Form.AmountField> = {
  title: 'Internal Components/Form Fields/Amount Field',
  component: Form.AmountField,
  argTypes: {
    ...commonFormFieldControls,
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
  },
  args: {
    labelProps: { label: 'Bill amount' },
    helperTextProps: { label: 'You should use the number in the "total amount" field of the bill.' },
    placeholder: '$0.00',
    integerLimit: 4,
    decimalLimit: 2,
    currency: 'USD',
    currencySign: '$',
    locale: 'en-US',
    allowNegativeValue: true,
    endElement: undefined,
    ...commonFormFieldArgs,
    size: 'large',
  },
};
export default meta;

export const Main: StoryObj<typeof Form.AmountField> = {
  render: (props) => {
    const { formProps, registerField } = useMelioForm({ onSubmit: noop, defaultValues: { input: 1337.42 } });

    return (
      <Form {...formProps}>
        <Form.AmountField {...registerField('input')} {...props} />
      </Form>
    );
  },
};

export const Sizes: StoryObj<typeof Form.AmountField> = {
  render: (props) => {
    const { formProps, registerField } = useMelioForm({
      onSubmit: noop,
      defaultValues: { small: 1337.42, large: 1337.42 },
    });

    return (
      <Form {...formProps}>
        <SimpleGrid columns={2} gridGap="s">
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Small
            </Text>
            <Form.AmountField {...registerField('small')} {...props} size="small" />
          </Group>
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Large
            </Text>
            <Form.AmountField {...registerField('large')} {...props} size="large" />
          </Group>
        </SimpleGrid>
      </Form>
    );
  },
};

export const Invalid: StoryObj<typeof Form.AmountField> = {
  render: (props) => {
    const { formProps, registerField, setError } = useMelioForm({ onSubmit: noop, defaultValues: { input: 1337.42 } });

    useEffect(() => {
      setError('input', { message: 'NO! You used the number in the "sub-total" field!' });
    }, [setError]);

    return (
      <Form {...formProps}>
        <Form.AmountField {...registerField('input')} {...props} />
      </Form>
    );
  },
};

export const Disabled: StoryObj<typeof Form.AmountField> = {
  render: (props) => {
    const { formProps, registerField } = useMelioForm({ onSubmit: noop, defaultValues: { input: 1337.42 } });

    return (
      <Form {...formProps}>
        <Form.AmountField {...registerField('input')} {...props} isDisabled />
      </Form>
    );
  },
  parameters: {
    chromatic: { delay: 1000 },
  },
};

export const ViewMode: StoryObj<typeof Form.AmountField> = {
  render: (props) => {
    const { formProps, registerField } = useMelioForm({ onSubmit: noop, defaultValues: { input: 1337.42 } });

    return (
      <Form {...formProps} isViewMode>
        <Form.AmountField {...registerField('input')} {...props} />
      </Form>
    );
  },
};

export const ReadOnly: StoryObj<typeof Form.AmountField> = {
  render: (props) => {
    const { formProps, registerField } = useMelioForm({ onSubmit: noop, defaultValues: { input: 1337.42 } });

    return (
      <Form {...formProps}>
        <Form.AmountField {...registerField('input')} {...props} isReadOnly />
      </Form>
    );
  },
};

export const Loading: StoryObj<typeof Form.AmountField> = {
  render: (props) => {
    const { formProps, registerField } = useMelioForm({ onSubmit: noop, defaultValues: { input: 1337.42 } });

    return (
      <Form {...formProps}>
        <Form.AmountField {...registerField('input')} {...props} isLoading />
      </Form>
    );
  },
};

/**
 `FormField` with `isRequired` will have `*` next to the required field label.
 */
export const Required: StoryObj<typeof Form.AmountField> = {
  render: ({ isRequired, ...args }) => {
    type FormFields = { optional: number; required: number };

    const schema = yup.object().shape({
      optional: yup.number(),
      required: yup.number().required(),
    }) as SchemaOf<FormFields>;

    const { formProps, registerField } = useMelioForm<FormFields>({
      schema,
      defaultValues: { required: 1337.42, optional: 1337.42 },
      onSubmit: () => null,
    });

    return (
      <Form {...formProps}>
        <SimpleGrid columns={2} gridGap="s">
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Required
            </Text>
            <Form.AmountField {...registerField('required')} {...args} />
          </Group>
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Optional
            </Text>
            <Form.AmountField {...registerField('optional')} {...args} />
          </Group>
        </SimpleGrid>
      </Form>
    );
  },
};

/**
 `FormField` with `showOptionalIndicator` will have `(optional)` next to the optional field label.
 */
export const ShowOptionalIndicator: StoryObj<typeof Form.AmountField> = {
  render: ({ showOptionalIndicator, ...args }) => {
    type FormFields = { optional: number };

    const schema = yup.object().shape({
      optional: yup.number(),
    }) as SchemaOf<FormFields>;

    const { formProps, registerField } = useMelioForm<FormFields>({
      schema,
      showOptionalIndicator,
      defaultValues: { optional: 1337.42 },
      onSubmit: () => null,
    });

    return (
      <Form {...formProps}>
        <Form.AmountField {...registerField('optional')} {...args} />
      </Form>
    );
  },
  args: { showOptionalIndicator: true },
};

export const WithLabelTooltip: StoryObj<typeof Form.AmountField> = {
  render: (args) => {
    const { formProps, registerField } = useMelioForm({ onSubmit: noop, defaultValues: { input: 1337.42 } });

    const labelWithTooltip = {
      label: 'Bill amount',
      tooltipProps: {
        content: 'Something',
      },
    };

    return (
      <Form {...formProps}>
        <Form.AmountField
          {...registerField('input')}
          {...args}
          aria-label={undefined}
          labelProps={labelWithTooltip as TypographyLabelProps}
        />
      </Form>
    );
  },
  play: async () => userEvent.hover(screen.getByTestId('label-tooltip-trigger')),
  parameters: {
    chromatic: { delay: 1000 },
  },
};

export const Placeholder: StoryObj<typeof Form.AmountField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <SimpleGrid columns={2} gridGap="s">
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Placeholder
            </Text>
            <Form.AmountField {...registerField('none')} {...args} />
          </Group>
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              View-mode Placeholder
            </Text>
            <Form.AmountField
              {...registerField('none')}
              {...args}
              isViewMode
              viewModePlaceholder="No currency provided"
            />
          </Group>
        </SimpleGrid>
      </Form>
    );
  },
};

export const WithLimits: StoryObj<typeof Form.AmountField> = {
  render: (props) => {
    const { formProps, registerField } = useMelioForm({
      onSubmit: noop,

      // eslint-disable-next-line no-loss-of-precision
      defaultValues: { input: 123456789.123456789 },
    });

    return (
      <Form {...formProps}>
        <Form.AmountField {...registerField('input')} {...props} integerLimit={4} decimalLimit={4} />
      </Form>
    );
  },
};

export const WithDecimalScale: StoryObj<typeof Form.AmountField> = {
  render: (args) => {
    const { formProps, registerField } = useMelioForm({
      onSubmit: noop,
      defaultValues: { withoutValue: undefined, withValue: 3.2222, withLimit: 1234.5 },
    });

    return (
      <Group variant="horizontal" spacing="s">
        <Form {...formProps}>
          <span>Without Value</span>
          <Form.AmountField {...registerField('withoutValue')} {...args} decimalScale={2} />
        </Form>
        <Form {...formProps}>
          <span>With Value</span>
          <Form.AmountField {...registerField('withValue')} {...args} decimalScale={2} />
        </Form>
      </Group>
    );
  },
};

/**
 * This example demonstrates how to visually hide a field from the UI while keeping it present in the DOM.<br />
 * Use the `isHidden` prop to hide the field, and inspect the DOM using developer tools to see the `data-hidden` attribute.<br />
 *
 * **Note:** To prevent the field from rendering entirely, use the React pattern: `{condition && <Form.AmountField ... />}`.<br />
 */
export const IsHidden: StoryObj<typeof Form.AmountField> = {
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
          <Form.AmountField {...registerField('field1')} {...args} isHidden={isFieldHidden} />
          {/* Field conditionally rendered based on `isFieldHidden` */}
          {!isFieldHidden && <Form.AmountField {...registerField('field2')} {...args} />}
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
