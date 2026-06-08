import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Modal } from '@/components/containers/modals/Modal';
import { Text } from '@/components/dataDisplay/Text';
import { Form } from '@/components/form/components/Form';
import { FormField } from '@/components/form/components/FormField';

import { type FileMetadata, type FileValue } from '../../FileInput';
import { FileUpload } from '..';
import { FILE_UPLOAD_DEFAULT_PLACEHOLDER } from '../constants';

const file = new File(['invoice'], 'invoice.jpeg', { type: 'image/jpeg' });

/**
 * The FileUpload component is designed to be used as part of a [FormField](?path=/docs/form-form-field--docs) component.
 *
 * Using FileUpload [with FormField](?path=/story/selection-inputs-components-file-upload--with-form-field) provides:
 * - Automatic error message display and validation feedback
 * - Proper invalid state styling and visual indicators
 * - Complete accessibility support with labels and descriptions
 * - Required field indicators and form integration
 *
 * While the component can be used standalone, using it without FormField will limit
 * functionality to basic invalid styling without error message display.
 */
const meta: Meta<typeof FileUpload> = {
  title: 'Selection & Inputs Components/File Upload',
  component: FileUpload,
  parameters: {
    docs: { source: { type: 'code' } },
  },
  argTypes: {
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'file-upload' }, type: { summary: 'string' }, category: 'tests' },
    },
    value: {
      control: false,
      description: 'The value of the field.',
      table: { category: 'props', type: { summary: 'FileValue | null' }, defaultValue: { summary: 'null' } },
    },
    placeholder: {
      control: 'text',
      description: 'The text to display when there is no value.',
      table: {
        type: { summary: 'string' },
        category: 'props',
        defaultValue: { summary: FILE_UPLOAD_DEFAULT_PLACEHOLDER },
      },
    },
    autoFocus: {
      control: 'boolean',
      description: 'If set to true, the field will focus when mounted.',
      table: { category: 'props', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Sets the field as disabled.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Sets the field as read-only.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isLoading: {
      control: 'boolean',
      description: 'Sets the field as loading.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
    },
    isInvalid: {
      control: 'boolean',
      description: 'Sets the field as invalid.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
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
    onChange: {
      description: 'The callback invoked when the file is changed.',
      table: { type: { summary: '(file: File | null) => void' }, category: 'events' },
      control: false,
    },
    onPreview: {
      description: 'A callback to handle the preview of the file. It is invoked when clicking the file name.',
      table: { type: { summary: '(meta: FileMetadata) => void' }, category: 'events' },
      control: false,
    },
    actionProps: {
      control: 'object',
      description: 'Action buttons customization (delete, replace, upload)',
      table: {
        type: {
          summary: `{
  deleteActionProps?: ButtonActionProps;
  replaceActionProps?: ButtonActionProps;
}`,
          detail: `type ButtonActionProps = {
  onClick?: VoidFunction;
  isDisabled?: boolean;
  label?: string;
} & AriaAttributes;`,
        },
        category: 'props',
      },
    },
    validator: {
      control: false,
      description: 'A function used to validate the selected file. Returns a string error message or void.',
      table: {
        type: {
          summary: '(file: File) => string | void | Promise<string | void>',
        },
        category: 'props',
      },
    },
    'aria-label': {
      control: 'text',
      description: 'Dedicated label of the file input for screen-readers (used for accessibility).',
      table: {
        type: { summary: 'string' },
        category: 'accessibility',
      },
    },
  },
  args: {
    value: undefined,
    placeholder: undefined,
    autoFocus: false,
    isDisabled: false,
    isReadOnly: false,
    isInvalid: false,
    isLoading: false,
    acceptTypes: ['jpg', 'pdf', 'png', 'svg', 'woff', 'json', 'csv', 'xls', 'xlsx'],
    'data-testid': 'file-upload',
  },
};
export default meta;

export const Main: StoryObj<typeof FileUpload> = {};
export const WithInitialValue: StoryObj<typeof FileUpload> = {
  render: (args) => {
    const [file, setFile] = useState<FileValue | null>({
      url: '/assets/invoice.jpeg',
      name: 'invoice.jpeg',
      type: 'image/png',
    });
    const [longNamedFile, setLongNamedFile] = useState<FileValue | null>({
      url: '/assets/invoice.jpeg',
      name: 'SGkhIE15IG5hbWUgaXMgUmVuYXRhIEJsaXNzIGFuZCBJJ20geW91ciBmcmVlLXN0eWxlIGRhbmNlIHRJsaXNzIGFuZCIG5hbWUgaXMgUmVuYXRhBJJ20geW91VlLXN0eWxlIGRhbmNlIHRJsaXNzIGFuZCIcilYWNoZXIuM23Mc.jpeg',
      type: 'image/png',
    });

    function onDeleteFile() {
      setFile(null);
    }

    function onDeleteLongNamedFile() {
      setLongNamedFile(null);
    }

    return (
      <Group variant="vertical">
        <FileUpload {...args} value={file} onChange={onDeleteFile} />
        <FileUpload {...args} value={longNamedFile} onChange={onDeleteLongNamedFile} />
      </Group>
    );
  },
};

export const Disabled: StoryObj<typeof FileUpload> = {
  render: (args) => {
    const items = [
      { label: 'Without file', component: <FileUpload {...args} isDisabled /> },
      {
        label: 'With file',
        component: <FileUpload {...args} value={file} isDisabled />,
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" justifyContent="flex-start" flexBasis={0} />;
  },
};

export const ReadOnly: StoryObj<typeof FileUpload> = {
  render: (args) => {
    const items = [
      { label: 'Without file', component: <FileUpload {...args} isReadOnly /> },
      {
        label: 'With file',
        component: <FileUpload {...args} value={file} isReadOnly />,
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" justifyContent="flex-start" flexBasis={0} />;
  },
};

export const Loading: StoryObj<typeof FileUpload> = {
  render: (args) => <FileUpload {...args} isLoading />,
};

export const CustomButtonLabels: StoryObj<typeof FileUpload> = {
  args: {
    ...Main.args,
    value: file,
    actionProps: {
      deleteActionProps: { label: 'Remove Bill', 'aria-label': 'Remove Bill' },
      replaceActionProps: { label: 'Replace Bill', 'aria-label': 'Replace bill' },
    },
  },
  render: (args) => <FileUpload {...args} />,
};

export const OnPreview: StoryObj<typeof FileUpload> = {
  render: (args) => {
    const onPreview = (meta: FileMetadata) => window.open(meta.url, '_blank');
    return <FileUpload {...args} value={file} onPreview={onPreview} />;
  },
};

export const ControlledDeletion: StoryObj<typeof FileUpload> = {
  render: (args) => {
    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const onDeleteFile = useCallback(() => {
      setShowModal(false);
      setFile(null);
    }, [setFile]);

    return (
      <>
        <FileUpload
          {...args}
          value={file}
          onChange={(file) => setFile(file as File)}
          actionProps={{ deleteActionProps: { onClick: () => setShowModal(true) } }}
        />
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

export const WithFormField: StoryObj<typeof FileUpload> = {
  render: (args) => (
    <Form>
      <FormField
        labelProps={{
          label: 'Bill attachment',
        }}
        id="bill-attachment-1"
        isRequired
        helperText="This will help us approve your payments faster."
        render={(props) => <FileUpload {...args} {...props} id="bill-attachment-1" />}
      />
      <FormField
        labelProps={{
          label: 'Bill attachment',
        }}
        id="bill-attachment-2"
        error={{ message: 'Please use a file.' }}
        helperText="This will help us approve your payments faster."
        render={(props) => <FileUpload isInvalid {...args} {...props} id="bill-attachment-2" />}
      />
    </Form>
  ),
};
