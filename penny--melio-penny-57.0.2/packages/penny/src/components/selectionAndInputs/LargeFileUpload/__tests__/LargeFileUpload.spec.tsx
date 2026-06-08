/* eslint-disable max-lines */
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import * as utils from '../../FileInput';
import { LargeFileUpload } from '../LargeFileUpload';
import { type LargeFileUploadProps } from '../types';

validateComponent(LargeFileUpload, 'LargeFileUpload');

const setup = (props: Partial<LargeFileUploadProps> = {}) => {
  const defaultFile = new File([''], 'filename.png', { type: 'image/png' });

  const { user, ...rest } = renderComponent(<LargeFileUpload value={defaultFile} {...props} />);

  const uploadFile = async (file?: File) => {
    await act(async () => user.upload(screen.getByTestId('large-file-upload-input'), file ?? defaultFile));
  };

  const deleteFile = async () => {
    await act(async () => user.click(screen.getByTestId('delete-file')));
  };

  const replaceFile = async () => {
    await act(async () => user.click(screen.getByTestId('replace-file')));
  };

  return {
    user,
    defaultFile,
    uploadFile,
    deleteFile,
    replaceFile,
    ...rest,
  };
};

describe('Component - Large File Upload', () => {
  it('invokes `onChange` when selecting a file', async () => {
    const handleChange = vi.fn();

    const { uploadFile, defaultFile } = setup({ onChange: handleChange, value: null });

    await uploadFile(defaultFile);

    expect(handleChange).toHaveBeenCalledWith(defaultFile);
  });

  it('invokes `onChange` with null when removing a file', async () => {
    const handleChange = vi.fn();
    const placeholder = 'file upload placeholder';

    const { deleteFile } = setup({ onChange: handleChange, placeholder });

    await deleteFile();

    expect(handleChange).toHaveBeenCalledWith(null);
  });

  it('invokes `onDelete` when removing a file and does not invoke `onChange`', async () => {
    const handleChange = vi.fn();
    let value: File | null = new File([''], 'filename.png', { type: 'image/png' });

    const handleOnDelete = vi.fn(() => {
      value = null;
    });

    const { getByText, queryByText, deleteFile, rerender } = setup({
      onChange: handleChange,
      value,
      actionProps: { deleteActionProps: { onClick: handleOnDelete } },
      placeholder: 'Browse to upload your invoice image/file',
    });

    expect(queryByText('Browse to upload your invoice image/file')).not.toBeInTheDocument();
    await deleteFile();

    expect(handleChange).not.toHaveBeenCalled();
    expect(handleOnDelete).toHaveBeenCalled();

    rerender(
      <LargeFileUpload
        onChange={handleChange}
        actionProps={{ deleteActionProps: { onClick: handleOnDelete } }}
        value={value}
        placeholder="Browse to upload your invoice image/file"
      />
    );
    expect(getByText('Browse to upload your invoice image/file')).toBeInTheDocument();
  });

  it('invokes `onChange` and `onReplace` when replacing a file', async () => {
    const handleChange = vi.fn();
    const handleOnReplace = vi.fn();
    const fileToReplace = new File([''], 'replaceFileName', { type: 'image/png' });

    const { uploadFile, replaceFile } = setup({
      onChange: handleChange,
      actionProps: { replaceActionProps: { onClick: handleOnReplace } },
    });

    await replaceFile();
    await uploadFile(fileToReplace);

    expect(handleChange).toHaveBeenCalled();
    expect(handleOnReplace).toHaveBeenCalled();
  });

  it('invokes `onPreview` when clicking the image', async () => {
    vi.spyOn(window, 'open').mockImplementation(vi.fn());
    vi.spyOn(utils, 'getPreviewFileMetadata').mockReturnValue({
      url: 'assets/filename.png',
      name: 'filename',
      type: 'png',
    });

    const handlePreviewFile = vi.fn();
    const { getByRole, user } = setup({ onPreview: handlePreviewFile });

    const previewButton = await waitFor(() => getByRole('button', { name: /file preview/i }));

    await act(async () => user.click(previewButton));

    expect(handlePreviewFile).toHaveBeenCalled();
  });

  it('invokes `onPreview` when focusing on the image and pressing the Enter key', async () => {
    vi.spyOn(window, 'open').mockImplementation(vi.fn());
    vi.spyOn(utils, 'getPreviewFileMetadata').mockReturnValue({
      url: 'assets/filename.png',
      name: 'filename',
      type: 'png',
    });

    const handlePreviewFile = vi.fn();
    const { getByRole, user } = setup({ onPreview: handlePreviewFile });

    const previewButton = await waitFor(() => getByRole('button', { name: /file preview/i }));
    previewButton.focus();

    await user.keyboard('[Enter]');

    expect(handlePreviewFile).toHaveBeenCalled();
  });
  it('invalid file upload has descriptive error', () => {
    const { getByTestId } = setup({
      value: null,
      invalid: {
        isInvalid: true,
        errorMessage: 'File exceeds max limit of 10MB.',
      },
    });

    const fileInput = getByTestId('large-file-upload-input');

    expect(fileInput).toHaveAttribute('aria-invalid', 'true');
    expect(fileInput).toHaveAccessibleDescription('File exceeds max limit of 10MB.');
  });

  describe('Focus', () => {
    it('focusable elements receive correct focus order when pressing the Tab key', async () => {
      const file = new File([''], 'filename', { type: 'image/png' });

      vi.spyOn(utils, 'getPreviewFileMetadata').mockReturnValue({
        url: 'assets/filename.png',
        name: 'filename',
        type: 'png',
      });

      const { getByRole, user } = setup({ value: file });

      await waitFor(() => expect(getByRole('button', { name: /file preview/i })).toBeInTheDocument());

      await user.tab();
      expect(getByRole('button', { name: /file preview/i })).toHaveFocus();
      await user.tab();
      expect(getByRole('button', { name: 'Replace file' })).toHaveFocus();

      await user.tab();
      expect(getByRole('button', { name: 'Delete file' })).toHaveFocus();
    });

    it('does not shift focus if previously active element is outside the component', () => {
      const { getByTestId } = setup({ isLoading: true, 'data-testid': 'upload-file-test' });

      expect(getByTestId('upload-file-test')).not.toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('supports custom aria-label for the preview file button', async () => {
      const file = new File([''], 'filename', { type: 'image/png' });

      vi.spyOn(utils, 'getPreviewFileMetadata').mockReturnValue({
        url: 'assets/filename.png',
        name: 'filename',
        type: 'png',
      });

      const { getByLabelText } = renderComponent(
        <LargeFileUpload value={file} previewFileAriaLabel="Preview selected file" />
      );

      await waitFor(() => {
        expect(getByLabelText(/preview selected file/i)).toBeInTheDocument();
      });
    });

    it('supports custom aria-label for the upload file input', () => {
      const label = 'This is the upload file button, you can load pdfs and images files';
      const { getByLabelText } = renderComponent(<LargeFileUpload aria-label={label} />);

      expect(getByLabelText(label)).toBeInTheDocument();
    });

    it('supports custom aria-label for the replace file button', () => {
      const label = 'This is the replace file button';
      const { getByLabelText } = renderComponent(
        <LargeFileUpload
          value={{ url: '/assets/invoice.jpeg', name: 'invoice.jpeg', type: 'jpeg' }}
          actionProps={{ replaceActionProps: { 'aria-label': label } }}
        />
      );

      expect(getByLabelText(label)).toBeInTheDocument();
    });

    it('supports custom aria-label for the delete file button', () => {
      const label = 'This is the delete file button';
      const { getByLabelText } = renderComponent(
        <LargeFileUpload
          value={{ url: '/assets/invoice.jpeg', name: 'invoice.jpeg', type: 'jpeg' }}
          actionProps={{ deleteActionProps: { 'aria-label': label } }}
        />
      );

      expect(getByLabelText(label)).toBeInTheDocument();
    });
  });

  describe('Preview', () => {
    it('renders iframe preview when file type is pdf', async () => {
      vi.spyOn(utils, 'getPreviewFileMetadata').mockReturnValue({
        url: 'assets/invoice.pdf',
        name: 'invoice.pdf',
        type: 'application/pdf',
      });

      const file = new File(['assets/invoice.pdf'], 'invoice.pdf', { type: 'application/pdf' });
      const { getByLabelText } = renderComponent(<LargeFileUpload value={file} onPreview={vi.fn()} />);

      await waitFor(() => expect(getByLabelText('invoice.pdf')).toBeInTheDocument());
      const iframe = getByLabelText('invoice.pdf');
      expect(iframe.tagName).toBe('IFRAME');
      expect(iframe).toHaveAttribute('src', 'assets/invoice.pdf#view=fit');
    });

    it('renders img preview when file type is image', async () => {
      vi.spyOn(utils, 'getPreviewFileMetadata').mockReturnValue({
        url: 'assets/invoice.jpeg',
        name: 'invoice.jpeg',
        type: 'image/png',
      });

      const file = new File(['assets/invoice.jpeg'], 'invoice.jpeg', { type: 'image/png' });
      const { getByTitle } = renderComponent(<LargeFileUpload value={file} onPreview={vi.fn()} />);

      await waitFor(() => expect(getByTitle('invoice.jpeg')).toBeInTheDocument());
      const img = getByTitle('invoice.jpeg');
      expect(img.tagName).toBe('IMG');
      expect(img).toHaveAttribute('src', 'assets/invoice.jpeg');
    });

    it('renders fallback preview when `forceFallbackPreview` is true', async () => {
      vi.spyOn(utils, 'getPreviewFileMetadata').mockReturnValue({
        url: 'assets/invoice.pdf',
        name: 'invoice.pdf',
        type: 'application/pdf',
      });

      const file = new File(['assets/invoice.pdf'], 'invoice.pdf', { type: 'application/pdf' });
      const { getByTestId } = renderComponent(
        <LargeFileUpload forceFallbackPreview value={file} onPreview={vi.fn()} />
      );

      await waitFor(() => expect(getByTestId('large-file-upload-preview')).toBeInTheDocument());
      expect(getByTestId('large-file-upload-preview-name')).toHaveTextContent('invoice.pdf');
      expect(getByTestId('large-file-upload-preview-size')).toHaveTextContent('18 bytes');
    });

    it('renders fallback preview when file type is json', async () => {
      vi.spyOn(utils, 'getPreviewFileMetadata').mockReturnValue({
        url: 'assets/invoice.json',
        name: 'invoice.json',
        type: 'application/json',
      });

      const file = new File(['assets/invoice.json'], 'invoice.json', { type: 'application/json' });
      const { getByTestId } = renderComponent(<LargeFileUpload value={file} onPreview={vi.fn()} />);

      await waitFor(() => expect(getByTestId('large-file-upload-preview')).toBeInTheDocument());
      expect(getByTestId('large-file-upload-preview-name')).toHaveTextContent('invoice.json');
      expect(getByTestId('large-file-upload-preview-size')).toHaveTextContent('19 bytes');
    });

    it('renders fallback preview when file type is woff', async () => {
      vi.spyOn(utils, 'getPreviewFileMetadata').mockReturnValue({
        url: 'assets/invoice.woff',
        name: 'invoice.woff',
        type: '.woff, font/woff',
      });

      const file = new File(['assets/invoice.woff'], 'invoice.woff', { type: '.woff, font/woff' });
      const { getByTestId } = renderComponent(<LargeFileUpload value={file} onPreview={vi.fn()} />);

      await waitFor(() => expect(getByTestId('large-file-upload-preview')).toBeInTheDocument());
      expect(getByTestId('large-file-upload-preview-name')).toHaveTextContent('invoice.woff');
      expect(getByTestId('large-file-upload-preview-size')).toHaveTextContent('19 bytes');
    });

    it('renders fallback preview when file type is csv with a long name', async () => {
      const csvLongName =
        'SGkhIE15IG5hbWUgaXMgUmVuYXRhIEJsaXNzIGFuZCBJJ20geW91ciBmcmVlLXN0eWxlIGRhbmNlIHRJbGlzcyBhbmQgc29tZXRoaW5nLWVsc2Uu.csv';

      vi.spyOn(utils, 'getPreviewFileMetadata').mockReturnValue({
        url: `assets/${csvLongName}`,
        name: csvLongName,
        type: 'application/csv',
      });

      const file = new File([`assets/${csvLongName}`], csvLongName, { type: 'text/csv' });
      const { getByTestId } = renderComponent(<LargeFileUpload value={file} onPreview={vi.fn()} />);

      await waitFor(() => expect(getByTestId('large-file-upload-preview')).toBeInTheDocument());
      expect(getByTestId('large-file-upload-preview-name')).toHaveTextContent(csvLongName);
      expect(getByTestId('large-file-upload-preview-size')).toHaveTextContent('123 bytes');
    });
  });

  describe('Drag and Drop', () => {
    it('invokes `onChange` when dropping a file', async () => {
      const handleChange = vi.fn();
      const file = new File([''], 'filename', { type: 'image/png' });
      const { getByTestId } = renderComponent(
        <LargeFileUpload value={null} onChange={handleChange} data-testid="upload-file" />
      );

      const dropZone = getByTestId('upload-file-container');
      await act(() => fireEvent.dragEnter(dropZone));
      await act(() => fireEvent.dragOver(dropZone));
      await act(() => fireEvent.drop(dropZone, { dataTransfer: { files: [file] } }));

      expect(handleChange).toHaveBeenCalledWith(file);
    });

    it('does not handle file drop in disabled state', async () => {
      const handleChange = vi.fn();
      const file = new File([''], 'filename', { type: 'image/png' });
      const { getByTestId } = renderComponent(
        <LargeFileUpload value={null} onChange={handleChange} isDisabled data-testid="upload-file" />
      );

      const dropZone = getByTestId('upload-file-container');
      await act(() => fireEvent.dragEnter(dropZone));
      await act(() => fireEvent.dragOver(dropZone));
      await act(() => fireEvent.drop(dropZone, { dataTransfer: { files: [file] } }));

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not handle file drop in readonly state', async () => {
      const handleChange = vi.fn();
      const file = new File([''], 'filename', { type: 'image/png' });
      const { getByTestId } = renderComponent(
        <LargeFileUpload value={null} onChange={handleChange} isReadOnly data-testid="upload-file" />
      );

      const dropZone = getByTestId('upload-file-container');
      await act(() => fireEvent.dragEnter(dropZone));
      await act(() => fireEvent.dragOver(dropZone));
      await act(() => fireEvent.drop(dropZone, { dataTransfer: { files: [file] } }));

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not handle file drop in loading state', async () => {
      const handleChange = vi.fn();
      const file = new File([''], 'filename', { type: 'image/png' });
      const { getByTestId } = renderComponent(
        <LargeFileUpload value={null} onChange={handleChange} isLoading data-testid="upload-file" />
      );

      const dropZone = getByTestId('upload-file-container');
      await act(() => fireEvent.dragEnter(dropZone));
      await act(() => fireEvent.dragOver(dropZone));
      await act(() => fireEvent.drop(dropZone, { dataTransfer: { files: [file] } }));

      expect(handleChange).not.toHaveBeenCalled();
    });
  });
});
