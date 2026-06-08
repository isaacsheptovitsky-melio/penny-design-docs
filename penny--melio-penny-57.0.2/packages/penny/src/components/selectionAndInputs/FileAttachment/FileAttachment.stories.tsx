import { SimpleGrid } from '@chakra-ui/react';
import { noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Text } from '@/components/dataDisplay/Text';
import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils/constants';
import { getDefaultIconsMap, type IconKey } from '@/theme/icons';

import { FileAttachment } from './FileAttachment';

const iconOptions = Object.keys(getDefaultIconsMap('')).sort() as IconKey[];
const FileUrl = '/assets/invoice.jpeg';
const errorFileUrl =
  'https://static-cert.getbills.com/static_imp/billdetail/bill8.html?CFIDREL=E6-10p5nsnp-76905-5555555858556-rmKbplritko2kE7Z52LLf9ERP-G06lTCr%2By85EQqPxStIsIff7%2F6zDaR%2FZh6YZIIFEGfW0L1HcrrIuoYpE8KZY7YifcmHsNCk2a1k7byK%2BT2dtCNZbaG%2FKakXQ7Q12j6Qa6dxnlw2rjDMRWS9dYYuQYD9R6sqzsXuMfskmK5ej6rxGaHb04GL6S7yZJx8AHR%2FzOq%2BI6JRK6yIqOqdXgBIwPOcugFObcd9E48zJz1xoXFWMkpEhrqLL4dVWYkhxYD%2FBSXDVX9YrbCiUvxHty5oT2aDYSsQGAoimzRMPRE0wtJ%2BOEIOCKe8dOVL%2BTDa8mygRREa2ami5Peyd5x%2B272CmDrUXCGHXRzGF1xS0BsYU7rXmij%3D%3D&CFVOUCHER=I6-10p5nsnp-F-76905-rmKbplritko2kE7Z52LLf9ERP-T-Bt9RU8tsCB4n9FmrhWPCJD%3D%3D-Wi0dRTW7PZwTFmIyrNbg1OFi7d30I6nk5byxuQwtrqk7z0WJTw%2B3JgyfmN%2FvfrY5sZRWfg5XhpajxMbFklcabO0phRosC5u5BZibMd8kaRkj6YUz4vMoGicOgZcwGJdl3uLY86B3YvBevGYRG4EW9wyqC3Ccx97ykcwdAv7QvEP3UpBctNYhJ3l7Hac2Da%2BRzj0QKsLekC49SXM0jGhiY8k09iwDgPpCFpGsjvyXAMK9QJgVNFXchdWa%2BFCnbTfKNJQoIDHaDTNV5IGATgbY9M4%2BZDJTxt5FkbX8%2FKZZixUKejtXh3%2BjQfnZ%2B2ZWTP8hyUg64un3wadSsFcU6V0vcj%3D%3D';

const meta: Meta<typeof FileAttachment> = {
  title: 'Selection & Inputs Components/File Attachment',
  component: FileAttachment,
  argTypes: {
    isReadOnly: {
      control: 'boolean',
      description: 'Sets the field as read-only.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isViewMode: {
      control: 'boolean',
      description: 'Sets the field as view-mode.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isLoading: {
      control: 'boolean',
      description: 'Is the component in loading mode',
      table: {
        defaultValue: { summary: 'false' },
        category: 'props',
        type: {
          summary: 'boolean',
        },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'The aria-label for the file attachment',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'file attachment' }, category: 'accessibility' },
    },
    acceptTypes: {
      control: 'object',
      description: 'File types to accept',
      table: {
        type: { summary: 'Extract<FileType, `jpg` | `png` | `pdf`>[]' },
        category: 'props',
      },
    },
    onChange: {
      action: 'changed',
      description: 'The callback invoked when the file is changed',
      table: {
        category: 'Events',
        type: {
          summary: "(fileId?: FileInfo['id'], fileBlob?: File) => void;",
        },
      },
    },
    onViewModeClick: {
      action: 'clicked in view-mode',
      description:
        'The callback invoked when the file image is clicked in view-mode state. Can be used to download the file.',
      table: {
        category: 'Events',
        type: {
          summary: '(fileUrl: string) => void',
        },
      },
    },
    deleteButtonText: {
      control: 'text',
      description: 'The text of the delete button',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Delete file' }, category: 'props' },
    },
    deleteButtonAriaLabel: {
      control: 'text',
      description: 'The aria-label for the delete button',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Delete file' }, category: 'accessibility' },
    },
    fileAltText: {
      control: 'text',
      description: 'The text of the image alt',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    fileInputAriaLabel: {
      control: 'text',
      description: 'The aria-label for the file input',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'upload file' }, category: 'accessibility' },
    },
    overrideFileName: {
      control: 'text',
      description: "The text that overrides the default file name when there's no preview available.",
      table: { type: { summary: 'string' }, category: 'props' },
    },
    width: {
      control: 'number',
      description: 'The width of the file attachment. The height is automatically calculated based on the width.',
      table: { type: { summary: 'number' }, defaultValue: { summary: '176' }, category: 'props' },
    },
    'aria-hidden': {
      control: 'boolean',
      description:
        "Determines if the component is hidden from the accessibility tree. When the file attachment is not clickable it's set to true by default, but it can be overridden.",
      table: { type: { summary: 'boolean' }, category: 'accessibility' },
    },
    'data-testid': {
      control: 'text',
      description: 'The data-testid for the component',
      table: {
        type: { summary: 'string' },
        category: 'props',
        defaultValue: { summary: COMPONENTS_DEFAULT_TEST_IDS.FILE_ATTACHMENT },
      },
    },
    viewModeIcon: {
      control: 'select',
      options: iconOptions,
      description: 'The type of the icon in the header.',
      table: {
        category: 'props',
        type: { summary: iconOptions.join(' | ') },
      },
    },
  },
  args: {
    isReadOnly: false,
    isViewMode: false,
    isLoading: false,
    'aria-label': undefined,
    onViewModeClick: undefined,
    deleteButtonText: undefined,
    deleteButtonAriaLabel: undefined,
    fileAltText: 'Text Alt',
    overrideFileName: undefined,
    width: undefined,
    fileInputAriaLabel: undefined,
    acceptTypes: ['jpg', 'pdf', 'png'],
    viewModeIcon: 'attachment',
    'data-testid': COMPONENTS_DEFAULT_TEST_IDS.FILE_ATTACHMENT,
  },
};
export default meta;

export const Main: StoryObj<typeof FileAttachment> = {
  render: (args) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState<string | undefined | null>();

    const onChangeSelectedFile = (fileUrl?: string | null) => {
      setSelectedFileUrl(fileUrl);
    };
    return <FileAttachment {...args} onChange={onChangeSelectedFile} value={selectedFileUrl} />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * The width is 88px
 */
export const OverrideWidth: StoryObj<typeof FileAttachment> = {
  render: (args) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState<string | undefined | null>();

    const onChangeSelectedFile = (fileUrl?: string | null) => {
      setSelectedFileUrl(fileUrl);
    };
    return <FileAttachment {...args} onChange={onChangeSelectedFile} value={selectedFileUrl} width={88} />;
  },
};

export const ErrorLoadingPreview: StoryObj<typeof FileAttachment> = {
  render: () => {
    const [selectedFileUrl, setSelectedFileUrl] = useState<string | undefined | null>(errorFileUrl);

    const onChangeSelectedFile = (fileUrl?: string | null) => {
      setSelectedFileUrl(fileUrl);
    };

    const items = [
      {
        label: 'Edit',
        component: (
          <FileAttachment
            onChange={onChangeSelectedFile}
            value={selectedFileUrl}
            fileAltText="This is the alt text of the file"
          />
        ),
      },
      {
        label: 'View mode',
        component: (
          <FileAttachment
            onChange={noop}
            value={selectedFileUrl}
            fileAltText="This is a long alt text of the file but you can see it all in the tooltip"
            isViewMode
          />
        ),
      },
      {
        label: 'Override file name',
        component: (
          <FileAttachment
            onChange={noop}
            value={selectedFileUrl}
            fileAltText="This file has an error loading the preview"
            overrideFileName="Override file name"
            isViewMode
          />
        ),
      },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="flex-start" />;
  },
};

export const EditState: StoryObj<typeof FileAttachment> = {
  render: (_) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState<string | undefined | null>(FileUrl);

    const onChangeSelectedFile = (fileUrl?: string | null) => {
      setSelectedFileUrl(fileUrl);
    };

    return (
      <SimpleGrid columns={4} gap="s" textAlign="center">
        <Text textStyle="body3">Rest</Text>
        <Text textStyle="body3">Loading</Text>
        <Text textStyle="body3">With File</Text>
        <Text textStyle="body3">Loading With File</Text>
        <FileAttachment isViewMode={false} isReadOnly={false} deleteButtonText="Delete File" />
        <FileAttachment isViewMode={false} isReadOnly={false} isLoading />
        <FileAttachment
          value={selectedFileUrl}
          isViewMode={false}
          isReadOnly={false}
          deleteButtonText="Delete File"
          onChange={onChangeSelectedFile}
        />
        <FileAttachment
          value={FileUrl}
          isViewMode={false}
          isReadOnly={false}
          deleteButtonText="Delete File"
          isLoading
        />
      </SimpleGrid>
    );
  },
};

export const ViewMode: StoryObj<typeof FileAttachment> = {
  render: (_) => (
    <SimpleGrid columns={3} gap="s" textAlign="center">
      <Text textStyle="body3">Rest</Text>
      <Text textStyle="body3">With File</Text>
      <Text textStyle="body3">With File And Read-Only/Without onViewModeClick function</Text>
      <FileAttachment isViewMode />
      <FileAttachment value={FileUrl} isViewMode onViewModeClick={() => window.open(FileUrl)} />
      <FileAttachment value={FileUrl} onChange={noop} onViewModeClick={undefined} isViewMode isReadOnly />
    </SimpleGrid>
  ),
};
