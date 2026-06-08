import { noop } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/action/Button';
import { Container } from '@/components/containers/Container';
import { Group } from '@/components/containers/Group';
import { commonFormFieldControls, getUnionTypeSummary } from '@/test-utils';

import { AmountInput } from './AmountInput';

const meta: Meta<typeof AmountInput> = {
  title: 'Selection & Inputs Components/Amount Input',
  component: AmountInput,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    value: {
      control: 'number',
      type: { required: true, name: 'number' },
      description: 'The value of amount input.',
      table: { type: { summary: 'number' }, category: 'props' },
    },
    currency: {
      control: 'text',
      description: 'Sets the currency type of the input.',
      table: { defaultValue: { summary: 'USD' }, type: { summary: 'string' }, category: 'props' },
    },
    currencySign: {
      control: 'text',
      description:
        'Sets the currency sign. Use this prop together with the `currency` prop to override the default currency sign.',
      table: { defaultValue: { summary: '$' }, type: { summary: 'string' }, category: 'props' },
    },
    helperText: {
      control: 'text',
      description: 'The helper text to let the user know what they should fill in this input.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    errorMessage: {
      control: 'text',
      description: 'An error message to display (this puts the component in edit-mode).',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    editButtonTooltip: {
      control: 'text',
      description: 'Set text for the edit button tooltip.',
      table: {
        category: 'props',
        type: { summary: 'string' },
      },
    },
    integerLimitMask: {
      control: 'number',
      description:
        'Sets the limit of the integer value’s length.<br />**If it’s not defined then the default limit will be equal to the `value`’s integer length.**',
      table: { type: { summary: 'number' }, category: 'props' },
    },
    onChange: {
      description: 'An event called when the input from the edit-mode is changed.',
      table: {
        category: 'Events',
        type: {
          summary: 'ChangeEventHandler<HTMLInputElement>',
        },
      },
    },
    onBlur: {
      description: 'An event called when the input from the edit-mode is blurred.',
      table: {
        category: 'Events',
        type: {
          summary: 'FocusEventHandler<HTMLInputElement>',
        },
      },
    },
    onFocus: {
      description: 'An event called when the input is focused.',
      table: {
        category: 'Events',
        type: {
          summary: 'FocusEventHandler<HTMLInputElement>',
        },
      },
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
    descriptionAlignment: {
      control: 'select',
      description: 'Determines the description alignment to the amount input.',
      options: ['center', 'start'],
      table: {
        defaultValue: { summary: 'center' },
        type: { summary: getUnionTypeSummary(['center', 'start']) },
        category: 'props',
      },
    },
    autoComplete: commonFormFieldControls['autoComplete'],
  },
  args: {
    currency: 'USD',
    currencySign: '$',
    value: 2000,
    helperText: '$2,000.00 remains due for this bill',
    editButtonTooltip: 'Edit the amount to partially pay this bill.',
    errorMessage: '',
    onBlur: noop,
    allowNegativeValue: true,
    descriptionAlignment: 'center',
  },
};
export default meta;

export const Main: StoryObj<typeof AmountInput> = {
  render: ({ value, errorMessage, ...props }) => {
    const [errorText, setErrorText] = useState(errorMessage);
    const error = 'Payment amount can’t exceed the bill amount';
    const helperText = '$2,000.00 remains due for this bill';
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setErrorText(errorMessage);
    }, [errorMessage]);

    const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
      const targetValue = event.target.value;

      if (targetValue && value < +targetValue.slice(1).replace(/,/g, '')) {
        setErrorText(error);
        ref.current?.focus();
      } else {
        setErrorText('');
      }
    };

    return (
      <Container justifyContent="center">
        <AmountInput
          {...props}
          value={value}
          helperText={helperText}
          errorMessage={errorText}
          onBlur={handleBlur}
          onChange={() => setErrorText('')}
          ref={ref}
        />
      </Container>
    );
  },
};

/**
 * The placeholder is controlled by the `currency` prop, and the value is controlled by the `currencySign` prop.<br/>
 * To ensure that both the placeholder and the value display the correct currency, pass both the `currency` and `currencySign` props.
 */
export const Currency: StoryObj<typeof AmountInput> = {
  args: {
    ...Main.args,
    currency: 'ILS',
    currencySign: '₪',
  },
  render: ({ value, errorMessage, ...props }) => {
    const [errorText, setErrorText] = useState(errorMessage);
    const error = 'Payment amount can’t exceed the bill amount';
    const helperText = '₪2,000.00 remains due for this bill';
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setErrorText(errorMessage);
    }, [errorMessage]);

    const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
      const targetValue = event.target.value;

      if (targetValue && value < +targetValue.slice(1).replace(/,/g, '')) {
        setErrorText(error);
        ref.current?.focus();
      } else {
        setErrorText('');
      }
    };

    return (
      <Container justifyContent="center">
        <AmountInput
          {...props}
          value={value}
          helperText={helperText}
          errorMessage={errorText}
          onBlur={handleBlur}
          onChange={() => setErrorText('')}
          ref={ref}
        />
      </Container>
    );
  },
};

export const OverrideIntegerLimitMask: StoryObj<typeof AmountInput> = {
  render: ({ errorMessage, ...props }) => {
    const value = 300;
    const [errorText, setErrorText] = useState(errorMessage);
    const error = 'Payment amount can’t exceed the bill amount';
    const helperText = '$2,000.00 remains due for this bill';
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setErrorText(errorMessage);
    }, [errorMessage]);

    const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
      const targetValue = event.target.value;

      if (targetValue && value < +targetValue.slice(1).replace(/,/g, '')) {
        setErrorText(error);
        ref.current?.focus();
      } else {
        setErrorText('');
      }
    };

    return (
      <Container justifyContent="center">
        <AmountInput
          {...props}
          value={value}
          helperText={helperText}
          errorMessage={errorText}
          onBlur={handleBlur}
          onChange={() => setErrorText('')}
          integerLimitMask={5}
          ref={ref}
        />
      </Container>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Invalid: StoryObj<typeof AmountInput> = {
  render: (props) => {
    const error = 'Payment amount can’t exceed the bill amount';

    return (
      <Container justifyContent="center">
        <AmountInput {...props} value={2001} errorMessage={error} />
      </Container>
    );
  },
};

export const DisabledCTAWhileEditing: StoryObj<typeof AmountInput> = {
  render: ({ value, errorMessage, ...props }) => {
    const [errorText, setErrorText] = useState(errorMessage);
    const error = 'Payment amount can’t exceed the bill amount';
    const helperText = '$2,000.00 remains due for this bill';
    const ref = useRef<HTMLInputElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
      setErrorText(errorMessage);
    }, [errorMessage]);

    const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
      const targetValue = event.target.value;

      if (targetValue && value < +targetValue.slice(1).replace(/,/g, '')) {
        setErrorText(error);
        ref.current?.focus();
      } else {
        setErrorText('');
        setIsEditing(false);
      }
    };

    const handleFocus = () => {
      setIsEditing(true);
    };

    return (
      <Container justifyContent="center">
        <Group variant="vertical" spacing="xxxl" width="full" alignItems="center">
          <AmountInput
            {...props}
            value={value}
            helperText={helperText}
            errorMessage={errorText}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChange={() => setErrorText('')}
            ref={ref}
          />
          <Button label="Continue" isDisabled={isEditing} />
        </Group>
      </Container>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
