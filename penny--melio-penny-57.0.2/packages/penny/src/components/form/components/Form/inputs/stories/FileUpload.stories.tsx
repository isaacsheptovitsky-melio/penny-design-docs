/* eslint-disable @typescript-eslint/no-deprecated */
import { Box, SimpleGrid } from '@chakra-ui/react';
import { noop, useBoolean } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useEffect, useState } from 'react';
import { screen, userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';
import type { SchemaOf } from 'yup';
import * as yup from 'yup';

import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import { Modal } from '@/components/containers/modals/Modal';
import { Text } from '@/components/dataDisplay/Text';
import type { TypographyLabelProps } from '@/components/dataDisplay/typography';
import { useMelioForm } from '@/components/form/hooks';
import { commonFormFieldControls } from '@/test-utils/stories.utils';

import { Form, type FormFileUploadProps } from '../..';

const file = new File(['invoice'], 'invoice.jpeg', { type: 'image/jpeg' });

const meta: Meta<typeof Form.FileUpload> = {
  title: 'Internal Components/Form Fields/File Upload',
  component: Form.FileUpload,
  parameters: {
    docs: { source: { type: 'code' } },
  },
  argTypes: {
    acceptTypes: {
      control: 'object',
      description: 'The accepted file types.',
      table: {
        type: {
          summary: 'FileType[]',
          detail: "('jpg' | 'pdf' | 'png' | 'svg' | 'woff' | 'json' | 'csv' | 'xls' | 'xlsx')[]",
        },
        category: 'props',
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Determines if the file upload is loading.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
    },
    'aria-label': {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The aria-label for the file upload.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    onChange: {
      description: 'The callback invoked when the file is changed.',
      table: { type: { summary: '(file: File | null) => void' }, category: 'events' },
    },
    onPreview: {
      description: 'A callback to handle the preview of the file. It is invoked when clicking the file name.',
      table: { type: { summary: '(meta: FileMetadata) => void' }, category: 'events' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'file-upload' }, type: { summary: 'string' }, category: 'tests' },
    },
    isDisabled: commonFormFieldControls['isDisabled'],
    isReadOnly: commonFormFieldControls['isReadOnly'],
    placeholder: commonFormFieldControls['placeholder'],
    isHidden: commonFormFieldControls['isHidden'],
    labelProps: commonFormFieldControls['labelProps'],
    helperTextProps: commonFormFieldControls['helperTextProps'],
    isRequired: commonFormFieldControls['isRequired'],
    showOptionalIndicator: commonFormFieldControls['showOptionalIndicator'],
  },
  args: {
    placeholder: 'Include a file attachment',
    isLoading: false,
    isReadOnly: false,
    isDisabled: false,
    isHidden: false,
    labelProps: { label: 'Bill attachment' },
    helperTextProps: { label: 'This will help us approve your payments faster.' },
    isRequired: false,
    showOptionalIndicator: false,
    acceptTypes: ['jpg', 'pdf', 'png', 'svg', 'woff', 'json', 'csv', 'xls', 'xlsx'],
    'data-testid': 'file-upload',
  },
};
export default meta;

export const Main: StoryObj<typeof Form.FileUpload> = {
  render: (args) => {
    const { formProps, registerField } = useMelioForm({ onSubmit: noop });

    return (
      <Form {...formProps}>
        <Form.FileUpload {...registerField('input')} {...args} />
      </Form>
    );
  },
};

export const WithInitialValue: StoryObj<typeof Form.FileUpload> = {
  render: (args) => {
    const file = { url: '/assets/invoice.jpeg', name: 'invoice.jpeg', type: 'image/png' };
    const longNamedFile = {
      url: '/assets/invoice.jpeg',
      name: 'SGkhIE15IG5hbWUgaXMgUmVuYXRhIEJsaXNzIGFuZCBJJ20geW91ciBmcmVlLXN0eWxlIGRhbmNlIHRJsaXNzIGFuZCIG5hbWUgaXMgUmVuYXRhBJJ20geW91VlLXN0eWxlIGRhbmNlIHRJsaXNzIGFuZCIcilYWNoZXIuM23Mc.jpeg',
      type: 'image/png',
    };
    const { formProps, registerField } = useMelioForm({
      onSubmit: noop,
      values: { field1: file, field2: longNamedFile },
    });

    return (
      <Form {...formProps}>
        <Form.FileUpload {...registerField('field1')} {...args} />
        <Form.FileUpload {...registerField('field2')} {...args} />
      </Form>
    );
  },
};

export const Invalid: StoryObj<typeof Form.FileUpload> = {
  render: (args) => {
    const {
      formProps,
      registerField: registerField1,
      setError,
    } = useMelioForm({
      defaultValues: { invalid: undefined },
      onSubmit: () => null,
    });

    useEffect(() => {
      setError('invalid', { message: 'Please upload a file under 10MB.' });
    }, [setError]);

    return (
      <Form {...formProps}>
        <Form.FileUpload {...args} {...registerField1('invalid')} />
      </Form>
    );
  },
};

export const Disabled: StoryObj<typeof Form.FileUpload> = {
  render: (args) => {
    const { formProps: formProps1, registerField: registerField1 } = useMelioForm({
      defaultValues: { disabled1: undefined },
      onSubmit: () => null,
    });
    const { formProps: formProps2, registerField: registerField2 } = useMelioForm({
      defaultValues: { disabled2: file },
      onSubmit: () => null,
    });

    return (
      <Group>
        <Form {...formProps1}>
          <Form.FileUpload {...args} {...registerField1('disabled1')} isDisabled />
        </Form>
        <Form {...formProps2}>
          <Form.FileUpload {...args} {...registerField2('disabled2')} isDisabled />
        </Form>
      </Group>
    );
  },
  parameters: {
    chromatic: { delay: 1000 },
  },
};

export const ReadOnly: StoryObj<typeof Form.FileUpload> = {
  render: (args) => {
    const { formProps: formProps1, registerField: registerField1 } = useMelioForm({
      defaultValues: { readOnly1: undefined },
      onSubmit: () => null,
    });
    const { formProps: formProps2, registerField: registerField2 } = useMelioForm({
      defaultValues: { readOnly2: file },
      onSubmit: () => null,
    });

    return (
      <Group>
        <Form {...formProps1}>
          <Form.FileUpload {...args} {...registerField1('readOnly1')} isReadOnly />
        </Form>
        <Form {...formProps2}>
          <Form.FileUpload {...args} {...registerField2('readOnly2')} isReadOnly />
        </Form>
      </Group>
    );
  },
};

export const WithLabelTooltip: StoryObj<typeof Form.FileUpload> = {
  render: (args) => {
    const { formProps, registerField } = useMelioForm({ onSubmit: noop });

    const labelWithTooltip = {
      label: 'Bill attachment',
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
      <Form {...formProps}>
        <Form.FileUpload
          {...registerField('input')}
          {...args}
          aria-label={undefined}
          labelProps={labelWithTooltip as TypographyLabelProps}
        />
      </Form>
    );
  },
  play: async () => userEvent.hover(screen.getByTestId('label-tooltip-trigger')),
};

export const Loading: StoryObj<typeof Form.FileUpload> = {
  render: (args) => {
    const { formProps, registerField } = useMelioForm({ onSubmit: noop });

    return (
      <Form {...formProps}>
        <Form.FileUpload {...registerField('input')} {...args} isLoading />
      </Form>
    );
  },
};

/**
 `FormField` with `isRequired` will have `*` next to the required field label.
 */
export const Required: StoryObj<typeof Form.FileUpload> = {
  render: ({ isRequired, ...args }) => {
    type FileValue = FormFileUploadProps['value'];
    type FormFields = { optional: FileValue; required: FileValue };

    const schema = yup.object().shape({
      optional: yup.mixed(),
      required: yup
        .mixed()
        .required('This file is required')
        .test((value: FileValue) => !!value),
    }) as SchemaOf<FormFields>;

    const { formProps, registerField } = useMelioForm<FormFields>({
      schema,
      onSubmit: () => null,
    });

    return (
      <Form {...formProps}>
        <SimpleGrid columns={2} gridGap="s">
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Required
            </Text>
            <Form.FileUpload {...registerField('required')} {...args} />
          </Group>
          <Group variant="vertical">
            <Text as="h2" textStyle="heading4">
              Optional
            </Text>
            <Form.FileUpload {...registerField('optional')} {...args} />
          </Group>
        </SimpleGrid>
      </Form>
    );
  },
};

/**
 `FormField` with `showOptionalIndicator` will have `(optional)` next to the optional field label.
 */
export const ShowOptionalIndicator: StoryObj<typeof Form.FileUpload> = {
  render: ({ showOptionalIndicator, ...args }) => {
    type FileValue = FormFileUploadProps['value'];
    type FormFields = { optional: FileValue };

    const schema = yup.object().shape({
      optional: yup.mixed(),
    }) as SchemaOf<FormFields>;

    const { formProps, registerField } = useMelioForm<FormFields>({
      schema,
      showOptionalIndicator,
      onSubmit: () => null,
    });

    return (
      <Form {...formProps}>
        <Form.FileUpload {...registerField('optional')} {...args} />
      </Form>
    );
  },
  args: { showOptionalIndicator: true },
  parameters: {
    chromatic: { delay: 1000 },
  },
};

export const ControlledDeletion: StoryObj<typeof Form.FileUpload> = {
  render: () => {
    const { formProps, registerField, submitButtonProps, setValue } = useMelioForm({
      onSubmit: noop,
    });
    const [showModal, setShowModal] = useState(false);

    const onDeleteFile = useCallback(() => {
      setShowModal(false);
      setValue('fileUpload', null);
    }, [setValue]);

    return (
      <>
        <Form {...formProps}>
          <Form.FileUpload
            actionProps={{ deleteActionProps: { onClick: () => setShowModal(true) } }}
            {...registerField('fileUpload')}
          />
        </Form>
        <Button {...submitButtonProps} label="Submit" />
        <Modal
          isOpen={showModal}
          header="Delete file"
          onClose={() => setShowModal(false)}
          primaryButton={{
            label: 'Delete',
            variant: 'critical',
            onClick: onDeleteFile,
          }}
          secondaryButton={{
            label: 'Cancel',
            onClick: () => setShowModal(false),
            variant: 'tertiary',
          }}
        >
          <Text>Are you sure you want to delete this file?</Text>
        </Modal>
      </>
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
 * **Note:** To prevent the field from rendering entirely, use the React pattern: `{condition && <Form.FileUpload ... />}`.<br />
 */
export const IsHidden: StoryObj<typeof Form.FileUpload> = {
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
          <Form.FileUpload {...registerField('field1')} {...args} isHidden={isFieldHidden} />
          {/* Field conditionally rendered based on `isFieldHidden` */}
          {!isFieldHidden && <Form.FileUpload {...registerField('field2')} {...args} />}
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
