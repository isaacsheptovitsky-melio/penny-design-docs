import { type Meta, type StoryObj } from '@storybook/react-vite';
import { screen } from '@testing-library/dom';
import { useState } from 'react';

import { type FileValue } from '../../FileInput';
import { LargeFileUpload } from '..';

const meta: Meta<typeof LargeFileUpload> = {
  title: 'Chromatic/LargeFileUpload',
  component: LargeFileUpload,
};
export default meta;

export const DeleteInitialValue: StoryObj<typeof LargeFileUpload> = {
  render: (args) => {
    const [file, setFile] = useState<FileValue | null>({
      url: '/assets/invoice.jpeg',
      name: 'invoice.jpeg',
      type: 'image/png',
    });

    function onDeleteFile() {
      setFile(null);
    }

    return (
      <LargeFileUpload
        {...args}
        value={file}
        onChange={onDeleteFile}
        placeholder="Upload a file"
        actionProps={{
          replaceActionProps: { label: 'Replace' },
          deleteActionProps: { label: 'Delete', 'aria-label': 'Delete file' },
        }}
      />
    );
  },
  play: () => {
    screen.getByTestId('delete-file').click();
  },
};
