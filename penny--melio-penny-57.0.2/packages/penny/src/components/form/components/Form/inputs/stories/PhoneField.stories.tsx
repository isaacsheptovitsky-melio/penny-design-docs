/* eslint-disable @typescript-eslint/no-deprecated */
import { Box, SimpleGrid } from '@chakra-ui/react';
import { useBoolean } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';
import { screen, userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';
import type { SchemaOf } from 'yup';
import * as yup from 'yup';

import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import type { TypographyLabelProps } from '@/components/dataDisplay/typography';
import { useMelioForm } from '@/components/form/hooks';
import { commonFormFieldArgs, commonFormFieldControls } from '@/test-utils/stories.utils';

import { Form } from '../..';

const meta: Meta<typeof Form.PhoneField> = {
  title: 'Internal Components/Form Fields/Phone Field',
  component: Form.PhoneField,
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
  argTypes: {
    ...commonFormFieldControls,
    'aria-label': {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The aria-label for the component.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    autoComplete: {
      ...commonFormFieldControls['autoComplete'],
      table: { type: { summary: 'string' }, category: 'props', defaultValue: { summary: 'tel' } },
    },
  },
  args: {
    labelProps: { label: 'Phone number' },
    helperTextProps: { label: 'Will be used for spam messages.' },
    placeholder: '(555) 123-4567',
    ...commonFormFieldArgs,
    size: 'large',
  },
};
export default meta;

export const Main: StoryObj<typeof Form.PhoneField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { main: '5551231234' }, onSubmit: () => null });

    return (
      <Form>
        <Form.PhoneField {...registerField('main')} {...args} />
      </Form>
    );
  },
};

export const Sizes: StoryObj<typeof Form.PhoneField> = {
  render: (args) => {
    const { registerField } = useMelioForm({
      defaultValues: { small: '5551231234', large: '5551231234' },
      onSubmit: () => null,
    });

    return (
      <Form>
        <SimpleGrid columns={2} gridGap="s">
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Small
            </Text>
            <Form.PhoneField {...registerField('small')} {...args} size="small" />
          </Group>
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Large
            </Text>
            <Form.PhoneField {...registerField('large')} {...args} size="large" />
          </Group>
        </SimpleGrid>
      </Form>
    );
  },
};

export const Invalid: StoryObj<typeof Form.PhoneField> = {
  render: (args) => {
    const { registerField, setError } = useMelioForm({
      defaultValues: { invalid: '5555555555' },
      onSubmit: () => null,
    });

    useEffect(() => {
      setError('invalid', { message: 'Wait, how do you know my number?' });
    }, [setError]);

    return (
      <Form>
        <Form.PhoneField {...registerField('invalid')} {...args} />
      </Form>
    );
  },
};

export const Disabled: StoryObj<typeof Form.PhoneField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { disabled: '5551231234' }, onSubmit: () => null });

    return (
      <Form>
        <Form.PhoneField {...registerField('disabled')} {...args} isDisabled />
      </Form>
    );
  },
};

export const ViewMode: StoryObj<typeof Form.PhoneField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { viewMode: '5551231234' }, onSubmit: () => null });

    return (
      <Form isViewMode>
        <Form.PhoneField {...registerField('viewMode')} {...args} />
      </Form>
    );
  },
};

export const ReadOnly: StoryObj<typeof Form.PhoneField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { readOnly: '5551231234' }, onSubmit: () => null });

    return (
      <Form>
        <Form.PhoneField {...registerField('readOnly')} {...args} isReadOnly />
      </Form>
    );
  },
};

export const Loading: StoryObj<typeof Form.PhoneField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { loading: '5551231234' }, onSubmit: () => null });

    return (
      <Form>
        <Form.PhoneField {...registerField('loading')} {...args} isLoading />
      </Form>
    );
  },
};

export const WithLabelTooltip: StoryObj<typeof Form.PhoneField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ defaultValues: { main: '5551231234' }, onSubmit: () => null });

    const labelWithTooltip = {
      label: 'Phone number',
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
        <Form.PhoneField
          {...registerField('main')}
          {...args}
          aria-label={undefined}
          labelProps={labelWithTooltip as TypographyLabelProps}
        />
      </Form>
    );
  },
  play: async () => userEvent.hover(screen.getByTestId('label-tooltip-trigger')),
};

/**
 `FormField` with `isRequired` will have `*` next to the required field label.
 */
export const Required: StoryObj<typeof Form.PhoneField> = {
  render: ({ isRequired, ...args }) => {
    type FormFields = { optional: string; required: string };

    const schema = yup.object().shape({
      optional: yup.string(),
      required: yup.string().required(),
    }) as SchemaOf<FormFields>;

    const { registerField } = useMelioForm<FormFields>({
      schema,
      defaultValues: { required: '5551231234', optional: '5551231234' },
      onSubmit: () => null,
    });

    return (
      <Form>
        <SimpleGrid columns={2} gridGap="s">
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Required
            </Text>
            <Form.PhoneField {...registerField('required')} {...args} />
          </Group>
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Optional
            </Text>
            <Form.PhoneField {...registerField('optional')} {...args} />
          </Group>
        </SimpleGrid>
      </Form>
    );
  },
};

/**
 `FormField` with `showOptionalIndicator` will have `(optional)` next to the optional field label.
 */
export const ShowOptionalIndicator: StoryObj<typeof Form.PhoneField> = {
  render: ({ showOptionalIndicator, ...args }) => {
    type FormFields = { optional: string };

    const schema = yup.object().shape({
      optional: yup.string(),
    }) as SchemaOf<FormFields>;

    const { registerField } = useMelioForm<FormFields>({
      schema,
      showOptionalIndicator,
      defaultValues: { optional: '5551231234' },
      onSubmit: () => null,
    });

    return (
      <Form>
        <Form.PhoneField {...registerField('optional')} {...args} />
      </Form>
    );
  },
  args: { showOptionalIndicator: true },
};

export const Placeholder: StoryObj<typeof Form.PhoneField> = {
  render: (args) => {
    const { registerField } = useMelioForm({ onSubmit: () => null });

    return (
      <Form>
        <SimpleGrid columns={2} gridGap="s">
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Placeholder
            </Text>
            <Form.PhoneField {...registerField('none')} {...args} />
          </Group>
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              View-mode Placeholder
            </Text>
            <Form.PhoneField {...registerField('none')} {...args} viewModePlaceholder="No name provided" isViewMode />
          </Group>
        </SimpleGrid>
      </Form>
    );
  },
};

/**
 * This example demonstrates how to visually hide a field from the UI while keeping it present in the DOM.<br />
 * Use the `isHidden` prop to hide the field, and inspect the DOM using developer tools to see the `data-hidden` attribute.<br />
 *
 * **Note:** To prevent the field from rendering entirely, use the React pattern: `{condition && <Form.PhoneField ... />}`.<br />
 */
export const IsHidden: StoryObj<typeof Form.PhoneField> = {
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
          <Form.PhoneField {...registerField('field1')} {...args} isHidden={isFieldHidden} />
          {/* Field conditionally rendered based on `isFieldHidden` */}
          {!isFieldHidden && <Form.PhoneField {...registerField('field2')} {...args} />}
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
