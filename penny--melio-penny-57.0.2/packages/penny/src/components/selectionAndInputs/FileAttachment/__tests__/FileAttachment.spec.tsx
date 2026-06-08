import { faker } from '@faker-js/faker';
import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils/constants';
import { renderComponent } from '@/test-utils/render.utils';

import { FileAttachment } from '../FileAttachment';

validateComponent(FileAttachment, 'FileAttachment', {
  defaultDataTestId: COMPONENTS_DEFAULT_TEST_IDS.FILE_ATTACHMENT,
});

describe('Component - File Attachment', () => {
  const props = {
    isReadOnly: false,
    deleteButtonText: 'delete file',
    fileAltText: 'File image',
  };

  it('shows loader when loading', () => {
    const { queryByTestId } = renderComponent(<FileAttachment {...props} isLoading />);
    expect(queryByTestId('file-attachment-blanket-loader')).toBeInTheDocument();
  });

  it('invokes `onChange` when selecting an image', async () => {
    const handleChange = vi.fn();
    const mockCreateObjectURL = faker.datatype.string();
    window.URL.createObjectURL = () => mockCreateObjectURL;

    const file = new File([''], 'filename', { type: 'image/png' });

    const { getByTestId, user } = renderComponent(<FileAttachment {...props} onChange={handleChange} />);

    await user.upload(getByTestId('file-attachment-input'), file);

    expect(handleChange).toHaveBeenCalledWith(mockCreateObjectURL, file);
  });

  it('invokes `onChange` when selecting a PDF', async () => {
    const handleChange = vi.fn();
    const mockCreateObjectURL = faker.datatype.string();
    window.URL.createObjectURL = () => mockCreateObjectURL;

    const file = new File([''], 'filename', { type: 'image/pdf' });

    const { getByTestId, user } = renderComponent(<FileAttachment {...props} onChange={handleChange} />);

    await user.upload(getByTestId('file-attachment-input'), file);

    expect(handleChange).toHaveBeenCalledWith(mockCreateObjectURL, file);
  });

  it('invokes `onChange` with undefined when deleting a file', async () => {
    const handleChange = vi.fn();
    const file = new File([''], 'filename', { type: 'image/png' });
    const fileUrl = faker.datatype.string();

    const { getByTestId, user } = renderComponent(
      <FileAttachment {...props} onChange={handleChange} value={fileUrl} />
    );

    await user.upload(getByTestId('file-attachment-input'), file);

    await user.click(getByTestId(`file-attachment-delete-file`));
    expect(handleChange).toHaveBeenCalledWith(null);
  });

  it('invokes `onViewModeClick` when clicking a file in view-mode state', async () => {
    const handleClick = vi.fn();
    const value = faker.datatype.string();

    const { getByTestId, user } = renderComponent(
      <FileAttachment {...props} value={value} onViewModeClick={handleClick} isViewMode />
    );

    await user.click(getByTestId('file-attachment-container'));
    expect(handleClick).toHaveBeenCalledWith(value);
  });

  it('does not invoke `onViewModeClick` when clicking a file if not in view-mode state', async () => {
    const handleClick = vi.fn();

    const { getByTestId, user } = renderComponent(
      <FileAttachment {...props} value={faker.datatype.string()} onViewModeClick={handleClick} />
    );

    await user.click(getByTestId('file-attachment-container'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not invoke onChange when value changes', () => {
    const handleChange = vi.fn();

    const fileUrl1 = faker.datatype.string();
    const fileUrl2 = faker.datatype.string();

    const { rerender } = renderComponent(<FileAttachment {...props} onChange={handleChange} value={fileUrl1} />);

    expect(handleChange).not.toHaveBeenCalled();
    // this is necessary in order to assert the value change does not invoke onChange within useUpdateEffect
    rerender(<FileAttachment {...props} onChange={handleChange} value={fileUrl2} />);
    expect(handleChange).not.toHaveBeenCalled();
  });
  it('has default aria attributes to elements', () => {
    const handleChange = vi.fn();
    const fileUrl1 = faker.datatype.string();
    const { getByLabelText } = renderComponent(
      <FileAttachment fileAltText="File image" onChange={handleChange} value={fileUrl1} />
    );

    const fileAttachment = getByLabelText('file attachment');
    expect(fileAttachment).toBeInTheDocument();
    expect(fileAttachment).toHaveAttribute('aria-hidden', 'false');

    const deleteFileButton = getByLabelText('Delete file');
    expect(deleteFileButton).toBeInTheDocument();
    expect(deleteFileButton).toHaveTextContent('Delete File');

    const fileInput = getByLabelText('upload file');
    expect(fileInput).toBeInTheDocument();
  });

  it('supports custom aria attributes for preview file button', () => {
    const handleChange = vi.fn();
    const fileUrl1 = faker.datatype.string();
    const { getByLabelText } = renderComponent(
      <FileAttachment
        fileAltText="File image"
        value={fileUrl1}
        onChange={handleChange}
        aria-hidden
        aria-label="Custom file attachment label"
        deleteButtonText="Custom delete file text"
        deleteButtonAriaLabel="Custom delete file label"
        fileInputAriaLabel="Custom upload file label"
      />
    );

    const fileAttachment = getByLabelText('Custom file attachment label');
    expect(fileAttachment).toBeInTheDocument();
    expect(fileAttachment).toHaveAttribute('aria-hidden', 'true');

    const deleteFileButton = getByLabelText('Custom delete file label');
    expect(deleteFileButton).toBeInTheDocument();
    expect(deleteFileButton).toHaveTextContent('Custom delete file text');

    const fileInput = getByLabelText('Custom upload file label');
    expect(fileInput).toBeInTheDocument();
  });
});
