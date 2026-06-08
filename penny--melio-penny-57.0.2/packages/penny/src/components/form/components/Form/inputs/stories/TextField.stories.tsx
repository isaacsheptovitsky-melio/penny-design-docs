/* eslint-disable @typescript-eslint/no-deprecated */
import { Box } from '@chakra-ui/react';
import { useBoolean } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';
import { screen, userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';
import type { SchemaOf } from 'yup';
import * as yup from 'yup';

import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import { useMelioForm } from '@/components/form/hooks';
import { commonFormFieldArgs, commonFormFieldControls } from '@/test-utils/stories.utils';
import { createNumberMask } from '@/utils/create-number-mask-utils';

import { Form, type FormTextFieldProps } from '../..';

const maskPropsType = `
type Mask = Array<string | RegExp> | false;

type MaskProps = {
  mask: Mask | ((value: string) => Mask);
  guide?: boolean;
  placeholderChar?: string;
  keepCharPositions?: boolean;
  showMask?: boolean;
}`;

const meta: Meta<typeof Form.TextField> = {
  title: 'Internal Components/Form Fields/Text Field',
  component: Form.TextField,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    ...commonFormFieldControls,
    'aria-label': {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The aria-label for the text field.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
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
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: {
    labelProps: { label: 'Full name' },
    helperTextProps: { label: 'Will be used as the name on checks.' },
    placeholder: 'John Smith',
    ...commonFormFieldArgs,
    size: 'large',
  },
};
export default meta;

export const Main: StoryObj<typeof Form.TextField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { main: 'Nina Tomeii' }, onSubmit: () => null });

    return (
      <Form>
        <Form.TextField {...registerField('main')} {...args} />
      </Form>
    );
  },
};

/**
 * To ensure accessibility, you must provide an aria label for the input.
 */
export const WithoutLabel: StoryObj<typeof Form.TextField> = {
  render: () => {
    const { registerField } = useMelioForm({ defaultValues: { main: 'Nina Tomeii' }, onSubmit: () => null });

    return (
      <Form>
        <Form.TextField {...registerField('main')} aria-label="Full Name" />
      </Form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Sizes: StoryObj<typeof Form.TextField> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { small: 'Nina Tomeii', large: 'Nina Tomeii' },
      onSubmit: () => null,
    });
    const items = [
      {
        label: 'Small',
        component: (
          <Form>
            <Form.TextField {...registerField('small')} {...args} size="small" />
          </Form>
        ),
      },
      {
        label: 'Large',
        component: (
          <Form>
            <Form.TextField {...registerField('large')} {...args} size="large" />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignItems="stretch" alignCompLabel="vertical" />;
  },
};

export const Invalid: StoryObj<typeof Form.TextField> = {
  render: (args) => {
    const { registerField, setError } = useMelioForm({
      defaultValues: { invalid: 'Robin The Dog' },
      onSubmit: () => null,
    });

    useEffect(() => {
      setError('invalid', { message: 'Please use a human name.' });
    }, [setError]);

    return (
      <Form>
        <Form.TextField {...registerField('invalid')} {...args} />
      </Form>
    );
  },
};

export const Disabled: StoryObj<typeof Form.TextField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { disabled: 'Nina Tomeii' }, onSubmit: () => null });

    return (
      <Form>
        <Form.TextField {...registerField('disabled')} {...args} isDisabled />
      </Form>
    );
  },
};

export const Loading: StoryObj<typeof Form.TextField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { loading: 'Nina Tomeii' }, onSubmit: () => null });

    return (
      <Form>
        <Form.TextField {...registerField('loading')} {...args} isLoading />
      </Form>
    );
  },
};

export const ViewMode: StoryObj<typeof Form.TextField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { viewMode: 'Nina Tomeii' }, onSubmit: () => null });

    return (
      <Form isViewMode>
        <Form.TextField {...registerField('viewMode')} {...args} />
      </Form>
    );
  },
};

export const ReadOnly: StoryObj<typeof Form.TextField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { readOnly: 'Nina Tomeii' }, onSubmit: () => null });

    return (
      <Form>
        <Form.TextField {...registerField('readOnly')} {...args} isReadOnly />
      </Form>
    );
  },
};

/**
 `FormField` with `isRequired` will have `*` next to the required field label.
 */
export const Required: StoryObj<typeof Form.TextField> = {
  render: ({ isRequired, ...args }) => {
    type FormFields = { optional: string; required: string };

    const schema = yup.object().shape({
      optional: yup.string(),
      required: yup.string().required(),
    }) as SchemaOf<FormFields>;

    const { registerField } = useMelioForm<FormFields>({
      schema,
      defaultValues: { required: 'Nina Tomeii', optional: 'Nina Tomeii' },
      onSubmit: () => null,
    });
    const items = [
      {
        label: 'Required',
        component: (
          <Form>
            <Form.TextField {...registerField('required')} {...args} />
          </Form>
        ),
      },
      {
        label: 'Optional',
        component: (
          <Form>
            <Form.TextField {...registerField('optional')} {...args} />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignItems="stretch" alignCompLabel="vertical" />;
  },
};

/**
 `FormField` with `showOptionalIndicator` will have `(optional)` next to the optional field label.
 */
export const ShowOptionalIndicator: StoryObj<typeof Form.TextField> = {
  render: ({ showOptionalIndicator, ...args }) => {
    type FormFields = { optional: string };

    const schema = yup.object().shape({
      optional: yup.string(),
    }) as SchemaOf<FormFields>;

    const { registerField } = useMelioForm<FormFields>({
      schema,
      showOptionalIndicator,
      defaultValues: { optional: 'Nina Tomeii' },
      onSubmit: () => null,
    });

    return (
      <Form>
        <Form.TextField {...registerField('optional')} {...args} />
      </Form>
    );
  },
  args: { showOptionalIndicator: true },
};
export const WithLabelTooltip: StoryObj<typeof Form.TextField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { main: 'Nina Tomeii' }, onSubmit: () => null });

    const labelWithTooltip: FormTextFieldProps['labelProps'] = {
      label: 'Full name',
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
        <Form.TextField {...registerField('main')} {...args} aria-label={undefined} labelProps={labelWithTooltip} />
      </Form>
    );
  },
  play: async () => userEvent.hover(screen.getByTestId('label-tooltip-trigger')),
};

export const Placeholder: StoryObj<typeof Form.TextField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });
    const items = [
      {
        label: 'Placeholder',
        component: (
          <Form>
            <Form.TextField {...registerField('none')} {...args} />
          </Form>
        ),
      },
      {
        label: 'View-mode Placeholder',
        component: (
          <Form>
            <Form.TextField
              {...registerField('view-mode-none')}
              {...args}
              viewModePlaceholder="No name provided"
              isViewMode
            />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignItems="stretch" justifyContent="flex-start" alignCompLabel="vertical" />;
  },
};

export const Masked: StoryObj<typeof Form.TextField> = {
  render: (_) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <Form.TextField
          {...registerField('masked')}
          labelProps={{ label: 'Deduction date' }}
          helperTextProps={{ label: 'Will be used as the date on checks.' }}
          placeholder="MM/DD/YYYY"
          maskProps={{
            mask: [/[0-1]/, /[0-2]/, '/', /[0-3]/, /[0-9]/, '/', /[1-2]/, /\d/, /\d/, /\d/],
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

export const DynamicMask: StoryObj<typeof Form.TextField> = {
  render: (_) => {
    const { registerField } = useMelioForm({ onSubmit: () => null, defaultValues: { percentage: 1000 } });
    const mask = createNumberMask({
      suffix: '%',
      prefix: '',
      thousandsSeparatorSymbol: '',
    });

    return (
      <Form>
        <Form.TextField
          {...registerField('percentage')}
          labelProps={{ label: 'Percentage' }}
          placeholder="100%"
          maskProps={{ mask }}
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
 * This example demonstrates how to visually hide a field from the UI while keeping it present in the DOM.<br />
 * Use the `isHidden` prop to hide the field, and inspect the DOM using developer tools to see the `data-hidden` attribute.<br />
 *
 * **Note:** To prevent the field from rendering entirely, use the React pattern: `{condition && <Form.TextField ... />}`.<br />
 */
export const IsHidden: StoryObj<typeof Form.TextField> = {
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
          <Form.TextField {...registerField('field1')} {...args} isHidden={isFieldHidden} />
          {/* Field conditionally rendered based on `isFieldHidden` */}
          {!isFieldHidden && <Form.TextField {...registerField('field2')} {...args} />}
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
