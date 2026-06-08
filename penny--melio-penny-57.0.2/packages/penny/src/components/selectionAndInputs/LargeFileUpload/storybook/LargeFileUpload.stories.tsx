import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Modal } from '@/components/containers/modals/Modal';
import { Text } from '@/components/dataDisplay/Text';
import { isUsingVisualTesting } from '@/test-utils';

import { type FileValue } from '../../FileInput';
import { FILE_UPLOAD_DEFAULT_PLACEHOLDER } from '../../FileUpload/constants';
import { LargeFileUpload } from '../LargeFileUpload';

const meta: Meta<typeof LargeFileUpload> = {
  title: 'Selection & Inputs Components/Large File Upload',
  component: LargeFileUpload,
  parameters: { docs: { source: { type: 'code' } } },
  decorators: [(Story) => <Storybook.Container height="700px">{Story()}</Storybook.Container>],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'The placeholder text for when there is no file.',
      table: {
        type: { summary: 'ReactNode' },
        category: 'props',
        defaultValue: { summary: FILE_UPLOAD_DEFAULT_PLACEHOLDER },
      },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Sets the field as read-only. Hides control buttons.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the component and hides control buttons.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isLoading: {
      control: 'boolean',
      description: 'Determines if the file upload is loading.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
    },
    autoFocus: {
      control: 'boolean',
      description: 'Focus the field on mount.',
      table: { category: 'props', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
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
    value: {
      control: 'object',
      description: 'The current file value object (name, size, metadata).',
      table: { type: { summary: 'FileValue | null' }, category: 'props' },
    },
    invalid: {
      control: 'object',
      description: 'Mark the field as invalid and optionally show an error message.',
      table: {
        category: 'props',
        type: { summary: '{ isInvalid: boolean; errorMessage?: string }' },
      },
    },
    forceFallbackPreview: {
      control: 'boolean',
      description: 'Force fallback preview (plain file name).',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    pdfPreviewProps: {
      control: 'object',
      description: 'Props forwarded to the PDF preview iframe',
      table: {
        type: {
          summary: 'HTMLAttributes<HTMLIFrameElement> & { inert?: boolean }',
        },
        category: 'props',
      },
    },
    previewFileAriaLabel: {
      control: 'text',
      description: 'The aria-label for the preview file.',
      table: { type: { summary: 'string' }, category: 'accessibility', defaultValue: { summary: 'File preview' } },
    },
    actionProps: {
      control: 'object',
      description: 'Action buttons customization (delete, replace, upload)',
      table: {
        type: {
          summary: `{
  deleteActionProps?: ButtonActionProps;\n
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
    onChange: {
      action: 'changed',
      description: 'Callback fired when file is selected or removed.',
      table: { category: 'events', type: { summary: '(file: File | null) => void' } },
    },
    onPreview: {
      description: 'Callback to handle file preview (e.g. clicking file name).',
      table: { type: { summary: '(meta: FileMetadata) => void' }, category: 'events' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` for testing.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'large-upload-file' }, category: 'tests' },
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
    invalidFileTypeErrorMessage: {
      control: 'text',
      description: 'Custom message shown when the user selects a file whose type is not included in `acceptTypes`.',
      table: {
        type: { summary: 'string' },
        category: 'props',
        defaultValue: { summary: 'Invalid file type' },
      },
    },
    assetPlaceholder: {
      control: false,
      description:
        'A custom visual element to display in the placeholder area when no file is selected. Replaces the default `file-add` icon.',
      table: {
        type: { summary: 'ReactNode' },
        category: 'props',
        defaultValue: { summary: '<Icon type="file-add" />' },
      },
    },
    renderLoader: {
      control: false,
      description:
        'A function that renders a custom loader element when the component is in a loading state. Receives props with an `id` (the `id` value used for `aria-labelledby` accessibility) and should return a ReactElement. Replaces the default loader.',
      table: {
        type: { summary: '(props: { id: string }) => ReactElement' },
        category: 'props',
        defaultValue: { summary: '<Loader />' },
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
    value: null,
    placeholder: undefined,
    autoFocus: false,
    isDisabled: false,
    isReadOnly: false,
    invalid: undefined,
    isLoading: false,
    acceptTypes: ['jpg', 'pdf', 'png', 'svg', 'woff', 'json', 'csv', 'xls', 'xlsx'],
    actionProps: {
      deleteActionProps: { label: 'Delete', 'aria-label': 'Delete file' },
      replaceActionProps: { label: 'Replace', 'aria-label': 'Replace file' },
    },
    validator: undefined,
    forceFallbackPreview: false,
    onChange: undefined,
    onPreview: undefined,
    'data-testid': 'large-upload-file',
    assetPlaceholder: undefined,
    renderLoader: undefined,
  },
};

export default meta;

export const Main: StoryObj<typeof LargeFileUpload> = {};

export const WithInitialValue: StoryObj<typeof LargeFileUpload> = {
  render: (args) => {
    const [file, setFile] = useState<FileValue | null>({
      url: '/assets/invoice.jpeg',
      name: 'invoice.jpeg',
      type: 'jpeg',
    });

    function onDelete() {
      setFile(null);
    }

    return (
      <Storybook.Container height="700px" {...(!isUsingVisualTesting() && { maxHeight: '700px', overflow: 'auto' })}>
        <LargeFileUpload {...args} value={file} onChange={onDelete} />
      </Storybook.Container>
    );
  },
};

export const Loading: StoryObj<typeof LargeFileUpload> = {
  render: (args) => <LargeFileUpload {...args} isLoading />,
};

export const Disabled: StoryObj<typeof LargeFileUpload> = {
  render: (args) => (
    <Group>
      <Storybook.Container height="700px" width="100%">
        <LargeFileUpload
          {...args}
          value={{ url: '/assets/invoice.jpeg', name: 'invoice.jpeg', type: 'jpeg' }}
          isDisabled
        />
      </Storybook.Container>
      <Storybook.Container height="700px" width="100%">
        <LargeFileUpload {...args} isDisabled />
      </Storybook.Container>
    </Group>
  ),
};

export const ReadOnly: StoryObj<typeof LargeFileUpload> = {
  render: (args) => (
    <Group>
      <Storybook.Container height="700px" width="100%">
        <LargeFileUpload
          {...args}
          isReadOnly
          value={{ url: '/assets/invoice.jpeg', name: 'invoice.jpeg', type: 'jpeg' }}
        />
      </Storybook.Container>
      <Storybook.Container height="700px" width="100%">
        <LargeFileUpload {...args} isReadOnly />
      </Storybook.Container>
    </Group>
  ),
};

export const Invalid: StoryObj<typeof LargeFileUpload> = {
  render: (args) => (
    <LargeFileUpload {...args} invalid={{ isInvalid: true, errorMessage: 'File exceeds max limit of 10MB.' }} />
  ),
};
export const WithCustomActions: StoryObj<typeof LargeFileUpload> = {
  render: (args) => (
    <LargeFileUpload
      {...args}
      value={{ url: '/assets/invoice.jpeg', name: 'invoice.jpeg', type: 'jpeg' }}
      actionProps={{
        deleteActionProps: {
          label: 'Remove',
          'aria-label': 'Remove File',
        },
        replaceActionProps: {
          label: 'Upload new',
          'aria-label': 'Replace File',
        },
      }}
    />
  ),
};

export const ForceFallbackPreview: StoryObj<typeof LargeFileUpload> = {
  render: (args) => {
    const [pdfFile, setPdfFile] = useState<File | null>(null);

    useEffect(() => {
      // Fetch and create a File for the pdf file
      fetch(`/assets/invoice.pdf`)
        .then(async (res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'invoice.pdf', { type: blob.type });
          setPdfFile(file);
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.error('Error fetching PDF file:', error));
    }, []);

    return (
      <Group>
        <Storybook.Container height="700px" width="100%">
          <LargeFileUpload {...args} forceFallbackPreview value={pdfFile} />
        </Storybook.Container>
        <Storybook.Container height="700px" width="100%">
          <LargeFileUpload {...args} forceFallbackPreview={false} value={pdfFile} />
        </Storybook.Container>
      </Group>
    );
  },
  parameters: {
    chromatic: { delay: 1000 },
  },
};
/**
 * Here's an example of FileUpload in fallback preview mode for image and pdf files.
 */
export const FileTypePreview: StoryObj<typeof LargeFileUpload> = {
  render: (args) => (
    <Group>
      <Storybook.Container height="700px" width="100%">
        <Group variant="vertical" height="full" width="full">
          <Text>Image</Text>
          <LargeFileUpload {...args} value={{ url: '/assets/invoice.jpeg', name: 'invoice.jpeg', type: 'jpeg' }} />
        </Group>
      </Storybook.Container>
      <Storybook.Container height="700px" width="100%">
        <Group variant="vertical" height="full" width="full">
          <Text>PDF</Text>
          <LargeFileUpload
            {...args}
            value={{ url: '/assets/invoice.pdf', name: 'invoice.pdf', type: 'application/pdf' }}
          />
        </Group>
      </Storybook.Container>
    </Group>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * Here's an example of FileUpload for CSV, WOFF, JSON, XSL and XLSX files.
 * This story demonstrates the file preview with a long file name.
 * Also in this example a FileUpload with a forced fallback preview prop.
 */
export const FileTypeFallbackPreview: StoryObj<typeof LargeFileUpload> = {
  render: (args) => {
    const CSV_FILE_NAME =
      'SGkhIE15IG5hbWUgaXMgUmVuYXRhIEJsaXNzIGFuZCBJJ20geW91ciBmcmVlLXN0eWxlIGRhbmNlIHRJsaXNzIGFuZCIG5hbWUgaXMgUmVuYXRhBJJ20geW91VlLXN0eWxlIGRhbmNlIHRJsaXNzIGFuZCIcilYWNoZXIuM23Mc.csv';
    const [jsonFile, setJsonFile] = useState<File | null>(null);
    const [csvFile, setCsvFile] = useState<File | null>(null);

    useEffect(() => {
      // Fetch and create a File for the json file
      fetch('/assets/filename.json')
        .then(async (res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'filename.json', { type: blob.type });
          setJsonFile(file);
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.error('Error fetching JSON file:', error));

      // Fetch and create a File for the csv file
      fetch(`/assets/${CSV_FILE_NAME}`)
        .then(async (res) => res.blob())
        .then((blob) => {
          const file = new File([blob], CSV_FILE_NAME, { type: blob.type });
          setCsvFile(file);
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.error('Error fetching CSV file:', error));
    }, []);

    return (
      <Group>
        <Storybook.Container height="700px" width="100%">
          <LargeFileUpload {...args} value={jsonFile} />
        </Storybook.Container>
        <Storybook.Container height="700px" width="100%">
          <LargeFileUpload {...args} value={csvFile} />
        </Storybook.Container>
      </Group>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const ControlledDeletion: StoryObj<typeof LargeFileUpload> = {
  render: (args) => {
    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState<FileValue | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onDeleteFile = useCallback(() => {
      setShowModal(false);
      setFile(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }, [setFile, inputRef]);

    return (
      <>
        <LargeFileUpload
          {...args}
          value={file}
          onChange={(file) => setFile(file)}
          actionProps={{ deleteActionProps: { onClick: () => setShowModal(true) } }}
          inputRef={inputRef}
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

export const CustomPlaceholder: StoryObj<typeof LargeFileUpload> = {
  render: (args) => (
    <LargeFileUpload
      {...args}
      placeholder={<Storybook.ContentPlaceholder width="400px" label="Custom Placeholder Text" />}
      assetPlaceholder={<Storybook.ContentPlaceholder width="250px" label="Custom Placeholder Asset" />}
    />
  ),
};

export const CustomLoader: StoryObj<typeof LargeFileUpload> = {
  render: (args) => (
    <LargeFileUpload
      {...args}
      isLoading
      renderLoader={(props) => (
        <Storybook.ContentPlaceholder {...props} width="200px" height="200px" label="Custom Loader" />
      )}
    />
  ),
};
