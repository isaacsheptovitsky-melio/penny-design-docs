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
import type { TypographyLabelProps } from '@/components/dataDisplay/typography';
import { useMelioForm } from '@/components/form/hooks';
import { commonFormFieldArgs, commonFormFieldControls } from '@/test-utils/stories.utils';

import { Form } from '../..';

const meta: Meta<typeof Form.SecuredTextField> = {
  title: 'Internal Components/Form Fields/Secured Text Field',
  component: Form.SecuredTextField,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    ...commonFormFieldControls,
    isTextVisible: {
      control: 'boolean',
      description: 'Decides if the value in the input is visible or masked.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    disableToggle: {
      control: 'boolean',
      description: 'Hides the toggle button that toggles the visibility of the input value.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    type: {
      control: 'text',
      description:
        "The input type. For optimal security, and to prompt the 'save password' dialog, use the 'password' type.",
      table: { defaultValue: { summary: 'text' }, type: { summary: 'string' }, category: 'props' },
    },
    getToggleVisibilityAriaLabel: {
      control: false,
      description: 'A function that returns the aria-label for the toggle visibility button.',
      table: { category: 'accessibility', type: { summary: '(isTextVisible: boolean) => string' } },
    },
    'aria-label': {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The aria-label for the text field.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'secured-text-field' }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: {
    labelProps: { label: 'Password' },
    helperTextProps: { label: 'Must have at least 6 characters.' },
    placeholder: 'e.g, ••••••••',
    disableToggle: false,
    isTextVisible: false,
    type: undefined,
    ...commonFormFieldArgs,
    size: 'large',
  },
};
export default meta;

export const Main: StoryObj<typeof Form.SecuredTextField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { main: '3sR2FRx!mn3KzQVz' }, onSubmit: () => null });

    return (
      <Form>
        <Form.SecuredTextField {...registerField('main')} {...args} />
      </Form>
    );
  },
};

export const Sizes: StoryObj<typeof Form.SecuredTextField> = {
  render: () => {
    const { registerField } = useMelioForm({
      defaultValues: { small: '3sR2FRx!mn3KzQVz', large: '3sR2FRx!mn3KzQVz' },
      onSubmit: () => null,
    });
    const items = [
      {
        label: 'Small',
        component: (
          <Form>
            <Form.SecuredTextField
              {...registerField('small')}
              size="small"
              labelProps={{ label: 'Password' }}
              helperTextProps={{ label: 'Must have at least 6 characters.' }}
              placeholder="e.g, ••••••••"
            />
          </Form>
        ),
      },
      {
        label: 'Large',
        component: (
          <Form>
            <Form.SecuredTextField
              {...registerField('large')}
              size="large"
              labelProps={{ label: 'Password' }}
              helperTextProps={{ label: 'Must have at least 6 characters.' }}
              placeholder="e.g, ••••••••"
            />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignItems="stretch" alignCompLabel="vertical" justifyContent="flex-start" />;
  },
};

export const Invalid: StoryObj<typeof Form.SecuredTextField> = {
  render: (args) => {
    const { registerField, setError } = useMelioForm({
      defaultValues: { invalid: '3sR2FRx!mn3KzQVz' },
      onSubmit: () => null,
    });

    useEffect(() => {
      setError('invalid', { message: 'Please use a stronger password.' });
    }, [setError]);

    return (
      <Form>
        <Form.SecuredTextField {...registerField('invalid')} {...args} />
      </Form>
    );
  },
};

export const Disabled: StoryObj<typeof Form.SecuredTextField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { disabled: '3sR2FRx!mn3KzQVz' }, onSubmit: () => null });

    return (
      <Form>
        <Form.SecuredTextField {...registerField('disabled')} {...args} isDisabled />
      </Form>
    );
  },
};

export const ViewMode: StoryObj<typeof Form.SecuredTextField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { viewMode: '3sR2FRx!mn3KzQVz' }, onSubmit: () => null });

    return (
      <Form isViewMode>
        <Form.SecuredTextField {...registerField('viewMode')} {...args} />
      </Form>
    );
  },
};

export const ReadOnly: StoryObj<typeof Form.SecuredTextField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { readOnly: '3sR2FRx!mn3KzQVz' }, onSubmit: () => null });

    return (
      <Form>
        <Form.SecuredTextField {...registerField('readOnly')} {...args} isReadOnly />
      </Form>
    );
  },
};

export const Loading: StoryObj<typeof Form.SecuredTextField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { loading: '3sR2FRx!mn3KzQVz' }, onSubmit: () => null });

    return (
      <Form>
        <Form.SecuredTextField {...registerField('loading')} {...args} isLoading />
      </Form>
    );
  },
};

/**
 `FormField` with `isRequired` will have `*` next to the required field label.
 */
export const Required: StoryObj<typeof Form.SecuredTextField> = {
  render: () => {
    type FormFields = { optional: string; required: string };

    const schema = yup.object().shape({
      optional: yup.string(),
      required: yup.string().required(),
    }) as SchemaOf<FormFields>;

    const { registerField } = useMelioForm<FormFields>({
      schema,
      defaultValues: { required: '3sR2FRx!mn3KzQVz', optional: '3sR2FRx!mn3KzQVz' },
      onSubmit: () => null,
    });

    const items = [
      {
        label: 'Required',
        component: (
          <Form>
            <Form.SecuredTextField
              {...registerField('required')}
              labelProps={{ label: 'Password' }}
              helperTextProps={{ label: 'Must have at least 6 characters.' }}
              placeholder="e.g, ••••••••"
              isRequired
            />
          </Form>
        ),
      },
      {
        label: 'Optional',
        component: (
          <Form>
            <Form.SecuredTextField
              {...registerField('optional')}
              labelProps={{ label: 'Password' }}
              helperTextProps={{ label: 'Must have at least 6 characters.' }}
              placeholder="e.g, ••••••••"
            />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignItems="stretch" alignCompLabel="vertical" justifyContent="flex-start" />;
  },
};

/**
 `FormField` with `showOptionalIndicator` will have `(optional)` next to the optional field label.
 */
export const ShowOptionalIndicator: StoryObj<typeof Form.SecuredTextField> = {
  render: ({ showOptionalIndicator }) => {
    type FormFields = { optional: string };

    const schema = yup.object().shape({
      optional: yup.string(),
    }) as SchemaOf<FormFields>;

    const { registerField } = useMelioForm<FormFields>({
      schema,
      showOptionalIndicator,
      defaultValues: { optional: '3sR2FRx!mn3KzQVz' },
      onSubmit: () => null,
    });

    return (
      <Form>
        <Form.SecuredTextField
          {...registerField('optional')}
          labelProps={{ label: 'Password' }}
          helperTextProps={{ label: 'Must have at least 6 characters.' }}
          placeholder="e.g, ••••••••"
        />
      </Form>
    );
  },
  args: { showOptionalIndicator: true },
};

export const WithLabelTooltip: StoryObj<typeof Form.SecuredTextField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { main: '3sR2FRx!mn3KzQVz' }, onSubmit: () => null });

    const labelWithTooltip = {
      label: 'Password',
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
        <Form.SecuredTextField
          {...registerField('main')}
          {...args}
          labelProps={labelWithTooltip as TypographyLabelProps}
          aria-label={undefined}
        />
      </Form>
    );
  },
  play: async () => userEvent.hover(screen.getByTestId('label-tooltip-trigger')),
};

export const Placeholder: StoryObj<typeof Form.SecuredTextField> = {
  render: () => {
    const { registerField } = useMelioForm({ onSubmit: () => null });
    const items = [
      {
        label: 'Placeholder',
        component: (
          <Form>
            <Form.SecuredTextField
              {...registerField('none')}
              labelProps={{ label: 'Password' }}
              helperTextProps={{ label: 'Must have at least 6 characters.' }}
              placeholder="e.g, ••••••••"
            />
          </Form>
        ),
      },
      {
        label: 'View-mode Placeholder',
        component: (
          <Form>
            <Form.SecuredTextField
              {...registerField('none-view-mode')}
              labelProps={{ label: 'Password' }}
              helperTextProps={{ label: 'Must have at least 6 characters.' }}
              placeholder="e.g, ••••••••"
              isViewMode
              viewModePlaceholder="No password provided"
            />
          </Form>
        ),
      },
    ];

    return <Storybook.Row items={items} alignItems="stretch" alignCompLabel="vertical" justifyContent="flex-start" />;
  },
};

export const WithoutToggle: StoryObj<typeof Form.SecuredTextField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { password: '3sR2FRx!mn3KzQVz' }, onSubmit: () => null });

    return (
      <Form>
        <Form.SecuredTextField {...registerField('password')} {...args} disableToggle />
      </Form>
    );
  },
};

export const TextVisibleByDefault: StoryObj<typeof Form.SecuredTextField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { password: '3sR2FRx!mn3KzQVz' }, onSubmit: () => null });

    return (
      <Form>
        <Form.SecuredTextField {...registerField('password')} {...args} isTextVisible />
      </Form>
    );
  },
};

export const PasswordTypeField: StoryObj<typeof Form.SecuredTextField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { password: '3sR2FRx!mn3KzQVz' }, onSubmit: () => null });

    return (
      <Form>
        <Form.SecuredTextField {...registerField('password')} {...args} isTextVisible type="password" />
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
 * **Note:** To prevent the field from rendering entirely, use the React pattern: `{condition && <Form.SecuredTextField ... />}`.<br />
 */
export const IsHidden: StoryObj<typeof Form.SecuredTextField> = {
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
          <Form.SecuredTextField {...registerField('field1')} {...args} isHidden={isFieldHidden} />
          {/* Field conditionally rendered based on `isFieldHidden` */}
          {!isFieldHidden && <Form.SecuredTextField {...registerField('field2')} {...args} />}
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
