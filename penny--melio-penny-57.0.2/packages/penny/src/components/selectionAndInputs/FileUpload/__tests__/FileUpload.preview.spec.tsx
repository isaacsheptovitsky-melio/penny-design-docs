import { act, waitFor } from '@testing-library/react';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils';

import { FileUpload } from '../FileUpload';
import { type FileUploadProps } from '../FileUpload.types';

const setup = (props: Partial<FileUploadProps> = {}) => {
  const defaultFile = new File([''], 'filename.png', { type: 'image/png' });
  return renderComponent(<FileUpload value={defaultFile} {...props} />);
};

describe('Component - File Upload Preview', () => {
  it('shows preview when file is selected and not loading', async () => {
    const { getByTestId, queryByTestId, user } = setup({
      value: null,
      isLoading: false,
    });

    await act(async () =>
      user.upload(getByTestId('file-upload-input'), new File([''], 'filename.png', { type: 'image/png' }))
    );
    await waitFor(() => expect(getByTestId('file-upload-preview')).toBeInTheDocument());
    expect(queryByTestId('file-upload-placeholder')).not.toBeInTheDocument();
  });

  it('give custom data-testid to preview', async () => {
    const { getByTestId, queryByTestId, user } = setup({
      value: null,
      isLoading: false,
      'data-testid': 'custom-upload-file',
    });

    await act(async () =>
      user.upload(getByTestId('custom-upload-file-input'), new File([''], 'filename.png', { type: 'image/png' }))
    );
    await waitFor(() => expect(getByTestId('custom-upload-file-preview')).toBeInTheDocument());
    expect(queryByTestId('custom-upload-file-placeholder')).not.toBeInTheDocument();
  });

  it('hides preview when loading', () => {
    const { queryByTestId } = setup({
      value: new File([''], 'test.png', { type: 'image/png' }),
      isLoading: true,
    });

    expect(queryByTestId('upload-file-preview')).not.toBeInTheDocument();
  });

  it('shows placeholder when no file is selected', () => {
    const placeholder = 'Upload your file here';
    const { getByTestId, queryByTestId } = setup({
      value: null,
      placeholder,
    });

    expect(queryByTestId('upload-file-preview')).not.toBeInTheDocument();
    expect(getByTestId('file-upload-placeholder')).toBeInTheDocument();
    expect(getByTestId('file-upload-placeholder')).toHaveTextContent(placeholder);
  });

  it('hides action buttons when isDisabled is true', () => {
    const { queryByTestId } = setup({
      value: new File([''], 'test.png', { type: 'image/png' }),
      isDisabled: true,
    });

    expect(queryByTestId('upload-file-preview-actions')).not.toBeInTheDocument();
  });

  it('hides action buttons when isReadOnly is true', () => {
    const { queryByTestId } = setup({
      value: new File([''], 'test.png', { type: 'image/png' }),
      isReadOnly: true,
    });

    expect(queryByTestId('upload-file-preview-actions')).not.toBeInTheDocument();
  });
});
