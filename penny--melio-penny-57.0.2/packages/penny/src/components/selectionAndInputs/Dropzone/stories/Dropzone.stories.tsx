import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { Icon } from '@/components/foundations/Icon';

import { DropzoneArea } from '../DropzoneArea';
import { DropzoneContent } from '../DropzoneContent';
import { DropzoneHiddenInput } from '../DropzoneHiddenInput';
import { DropzoneRoot } from '../DropzoneRoot';

const meta: Meta<typeof DropzoneRoot> = {
  title: 'Selection & Inputs Components/Dropzone [composable]',
  component: DropzoneRoot,
  subcomponents: {
    DropzoneArea,
    DropzoneHiddenInput,
    DropzoneContent,
  },
  argTypes: {
    children: {
      table: {
        type: {
          summary: 'ReactNode | ((context: DropzoneContextValue) => ReactNode)',
        },
      },
    },
  },
  args: {
    disabled: false,
    readOnly: false,
    invalid: false,
    multiple: false,
    preventDocumentDrop: true,
    'data-testid': 'dropzone',
  },
};

export default meta;
type Story = StoryObj<typeof DropzoneRoot>;

export const Main: Story = {
  render: (args) => {
    const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
    const [rejectedFiles, setRejectedFiles] = useState<Array<{ file: File; errors: string[] }>>([]);

    return (
      <Group variant="vertical" spacing="s">
        <DropzoneRoot
          {...args}
          acceptedFiles={acceptedFiles}
          onFileAccept={setAcceptedFiles}
          rejectedFiles={rejectedFiles}
          onFileReject={setRejectedFiles}
        >
          <DropzoneHiddenInput />
          <DropzoneArea>
            <DropzoneContent>
              <Group variant="vertical" alignItems="center" spacing="s">
                <Icon type="file-add" size="large" aria-hidden isDisabled={args.disabled} />
                <Group variant="vertical" alignItems="center" spacing="xxs">
                  <Text textStyle="body3" color={args.disabled ? 'semantic.text.disabled' : 'semantic.text.secondary'}>
                    Select or drop a file
                  </Text>
                </Group>
              </Group>
            </DropzoneContent>
          </DropzoneArea>
        </DropzoneRoot>
        {acceptedFiles.length > 0 && (
          <Text textStyle="body3">
            <strong>Accepted:</strong> {acceptedFiles.map((f) => f.name).join(', ')}
          </Text>
        )}
        {rejectedFiles.length > 0 && (
          <Text textStyle="body3" color="semantic.text.critical.rest">
            <strong>Rejected:</strong> {rejectedFiles.map((r) => `${r.file.name} (${r.errors.join(', ')})`).join('; ')}
          </Text>
        )}
      </Group>
    );
  },
};

export const MultipleFiles: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  render: () => {
    const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

    return (
      <Group variant="vertical" spacing="s">
        <DropzoneRoot multiple maxFiles={5} acceptedFiles={acceptedFiles} onFileAccept={setAcceptedFiles}>
          <DropzoneHiddenInput />
          <DropzoneArea>
            <DropzoneContent>
              <Group variant="vertical" alignItems="center" spacing="s">
                <Icon type="file-add" size="large" aria-hidden />
                <Group variant="vertical" alignItems="center" spacing="xxs">
                  <Text textStyle="body3" color="semantic.text.secondary">
                    Select or drop files
                  </Text>
                </Group>
              </Group>
            </DropzoneContent>
          </DropzoneArea>
        </DropzoneRoot>
        {acceptedFiles.length > 0 && (
          <Group variant="vertical" spacing="xs">
            {acceptedFiles.map((f) => (
              <Text key={f.name} textStyle="body3">
                {f.name}
              </Text>
            ))}
          </Group>
        )}
      </Group>
    );
  },
};

/**
 * More information about [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types#important_mime_types_for_web_developers)
 */
export const WithAcceptTypes: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  render: () => {
    const [rejectedFiles, setRejectedFiles] = useState<Array<{ file: File; errors: string[] }>>([]);

    return (
      <Group variant="vertical" spacing="s">
        <DropzoneRoot accept={{ 'application/pdf': ['.pdf'], 'image/png': ['.png'] }} onFileReject={setRejectedFiles}>
          <DropzoneHiddenInput />
          <DropzoneArea>
            <DropzoneContent>
              <Group variant="vertical" alignItems="center" spacing="s">
                <Icon type="file-add" size="large" aria-hidden />
                <Group variant="vertical" alignItems="center" spacing="xxs">
                  <Text textStyle="body3" color="semantic.text.primary">
                    Select or drop a file
                  </Text>
                  <Text textStyle="body3" color="semantic.text.secondary">
                    PDF and PNG only
                  </Text>
                </Group>
              </Group>
            </DropzoneContent>
          </DropzoneArea>
        </DropzoneRoot>
        {rejectedFiles.length > 0 && (
          <Group variant="vertical" spacing="xs">
            {rejectedFiles.map((r) => (
              <Text key={r.file.name} textStyle="body3" color="semantic.text.critical.rest">
                {r.file.name}: {r.errors.join(', ')}
              </Text>
            ))}
          </Group>
        )}
      </Group>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <DropzoneRoot disabled>
      <DropzoneHiddenInput />
      <DropzoneArea>
        <DropzoneContent>
          <Group variant="vertical" alignItems="center" spacing="s">
            <Icon type="file-add" size="large" aria-hidden isDisabled />
            <Group variant="vertical" alignItems="center" spacing="xxs">
              <Text textStyle="body3" color="semantic.text.disabled">
                Select or drop a file
              </Text>
            </Group>
          </Group>
        </DropzoneContent>
      </DropzoneArea>
    </DropzoneRoot>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <DropzoneRoot readOnly>
      <DropzoneHiddenInput />
      <DropzoneArea>
        <DropzoneContent>
          <Group variant="vertical" alignItems="center" spacing="s">
            <Icon type="file-add" size="large" aria-hidden />
            <Group variant="vertical" alignItems="center" spacing="xxs">
              <Text textStyle="body3" color="semantic.text.secondary">
                Select or drop a file
              </Text>
            </Group>
          </Group>
        </DropzoneContent>
      </DropzoneArea>
    </DropzoneRoot>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Group variant="vertical" spacing="s">
      <DropzoneRoot invalid>
        <DropzoneHiddenInput />
        <DropzoneArea>
          <DropzoneContent>
            <Group variant="vertical" alignItems="center" spacing="s">
              <Icon type="file-add" size="large" aria-hidden />
              <Group variant="vertical" alignItems="center" spacing="xxs">
                <Text textStyle="body3" color="semantic.text.secondary">
                  Select or drop a file
                </Text>
              </Group>
            </Group>
          </DropzoneContent>
        </DropzoneArea>
      </DropzoneRoot>
      <Group justifyContent="center">
        <Text textStyle="body3" color="semantic.text.critical.rest">
          Please upload a valid file.
        </Text>
      </Group>
    </Group>
  ),
};
