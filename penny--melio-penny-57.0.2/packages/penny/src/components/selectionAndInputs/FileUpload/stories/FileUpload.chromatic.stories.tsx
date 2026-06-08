import { type Meta, type StoryObj } from '@storybook/react-vite';
import { screen } from '@testing-library/react';
import { useState } from 'react';

import { type FileValue } from '../../FileInput';
import { FileUpload } from '..';

const meta: Meta<typeof FileUpload> = {
  title: 'Chromatic/FileUpload',
  component: FileUpload,
};
export default meta;

export const DeleteInitialValue: StoryObj<typeof FileUpload> = {
  render: (args) => {
    const [file, setFile] = useState<FileValue | null>({
      url: '/assets/invoice.jpeg',
      name: 'invoice.jpeg',
      type: 'image/png',
    });

    function onDeleteFile() {
      setFile(null);
    }

    return <FileUpload {...args} value={file} onChange={onDeleteFile} placeholder="Upload a file" />;
  },
  play: () => {
    screen.getByTestId('delete-file').click();
  },
};
