import { createFileUploadTestKit } from '@melio/penny-testkit-rtl';
import { waitFor } from '@testing-library/react';
import { expect, vi } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import * as utils from '../../FileInput/helpers';
import { FileUpload } from '../FileUpload';

const defaultFile = new File([''], 'filename.png', { type: 'image/png' });
validateComponent(FileUpload, 'FileUpload');

describe('Component - File Upload', () => {
  let testKit: ReturnType<typeof createFileUploadTestKit>;

  beforeEach(() => {
    testKit = createFileUploadTestKit();
  });

  describe('Upload File', () => {
    it('invokes `onChange` when selecting a file', async () => {
      const handleChange = vi.fn();
      renderComponent(<FileUpload onChange={handleChange} />);

      await testKit.uploadFile(defaultFile);

      expect(handleChange).toHaveBeenCalledWith(defaultFile);
    });

    it('invokes `onChange` with null when removing a file', async () => {
      const handleChange = vi.fn();
      renderComponent(<FileUpload onChange={handleChange} value={defaultFile} />);

      await testKit.clickDeleteButton();

      expect(handleChange).toHaveBeenCalledWith(null);
    });

    it('invokes `onDelete` when removing a file and does not invoke `onChange`', async () => {
      const handleChange = vi.fn();
      const placeholder = 'Upload a file attachment';
      const file = new File([''], 'filename.png', { type: 'image/png' });

      let value: File | null = file;

      const handleOnDelete = vi.fn(() => {
        value = null;
      });
      const { rerender } = renderComponent(
        <FileUpload
          onChange={handleChange}
          value={value}
          actionProps={{ deleteActionProps: { onClick: handleOnDelete } }}
          placeholder={placeholder}
        />
      );

      await waitFor(() => expect(testKit.getValue()).toBe(file.name));
      await testKit.clickDeleteButton();
      expect(handleChange).not.toHaveBeenCalled();
      expect(handleOnDelete).toHaveBeenCalled();

      rerender(
        <FileUpload
          onChange={handleChange}
          actionProps={{ deleteActionProps: { onClick: handleOnDelete } }}
          value={value}
          placeholder={placeholder}
        />
      );

      expect(testKit.getPlaceholder()).toBe(placeholder);
    });

    it('invokes `onChange` and `onReplace` when replacing a file', async () => {
      const fileToReplace = new File([''], 'replace.png', { type: 'image/png' });
      const handleChange = vi.fn();
      const handleOnReplace = vi.fn();
      renderComponent(
        <FileUpload
          value={defaultFile}
          onChange={handleChange}
          actionProps={{ replaceActionProps: { onClick: handleOnReplace } }}
        />
      );

      await testKit.clickReplaceButton();
      await testKit.uploadFile(fileToReplace);

      expect(handleChange).toHaveBeenCalled();
      expect(handleOnReplace).toHaveBeenCalled();
    });

    it('invokes `onPreview` when clicking the image', async () => {
      const fileMeta = {
        url: 'assets/filename.png',
        name: 'filename',
        type: 'png',
      };

      vi.spyOn(utils, 'readFileDataURL').mockResolvedValue('data:image/png;base64,abc123');
      vi.spyOn(utils, 'getPreviewFileMetadata').mockReturnValue(fileMeta);

      const handlePreviewFile = vi.fn();

      const { user, getByRole } = renderComponent(<FileUpload onPreview={handlePreviewFile} value={defaultFile} />);

      await waitFor(async () => await user.click(getByRole('button', { name: 'filename' })));

      expect(handlePreviewFile).toHaveBeenCalledWith(fileMeta);
    });
  });

  describe('Drag and Drop', () => {
    it('invokes `onChange` when dropping a file', async () => {
      const handleChange = vi.fn();
      renderComponent(<FileUpload onChange={handleChange} />);

      await waitFor(() => testKit.dropFile(defaultFile));

      expect(handleChange).toHaveBeenCalledWith(defaultFile);
    });

    it('does not handle file drop in disabled state', () => {
      const handleChange = vi.fn();
      renderComponent(<FileUpload onChange={handleChange} isDisabled />);

      testKit.dropFile(defaultFile);

      expect(testKit.getIsDisabled()).toBe(true);
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not handle file drop in readonly state', () => {
      const handleChange = vi.fn();

      renderComponent(<FileUpload onChange={handleChange} isReadOnly />);
      testKit.dropFile(defaultFile);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not handle file drop in loading state', () => {
      const handleChange = vi.fn();
      renderComponent(<FileUpload onChange={handleChange} isLoading />);

      testKit.dropFile(defaultFile);

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Focus', () => {
    it('focuses the file upload input when auto focus is true', () => {
      const { getByTestId } = renderComponent(<FileUpload autoFocus />);

      const inputElement = getByTestId('file-upload-input');
      expect(inputElement).toBe(document.activeElement);
    });

    it('does not focus upload input if autoFocus is false', () => {
      const { getByTestId } = renderComponent(<FileUpload autoFocus={false} />);
      const inputElement = getByTestId('file-upload-input');

      expect(inputElement).not.toBe(document.activeElement);
    });

    it('restores focus to input after uploading', async () => {
      const { user, rerender, getByTestId } = renderComponent(<FileUpload isLoading={false} />);
      const inputElement = getByTestId('file-upload-input');

      await user.tab();

      rerender(<FileUpload isLoading />);
      rerender(<FileUpload value={defaultFile} isLoading={false} />);
      expect(inputElement).toBe(document.activeElement);
    });
  });
});
