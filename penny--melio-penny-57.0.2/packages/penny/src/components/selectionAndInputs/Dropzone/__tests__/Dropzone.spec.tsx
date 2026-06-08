import { createDropzoneTestKit } from '@melio/penny-testkit-rtl';
import { act, fireEvent } from '@testing-library/react';
import { expect, vi } from 'vitest';

import { renderComponent } from '@/test-utils';

import type { FileError, FileRejection } from '../Dropzone.types';
import { DropzoneArea } from '../DropzoneArea';
import { DropzoneContent } from '../DropzoneContent';
import { DropzoneHiddenInput } from '../DropzoneHiddenInput';
import { DropzoneRoot } from '../DropzoneRoot';

const pdfFile = new File(['content'], 'test.pdf', { type: 'application/pdf' });
const pngFile = new File(['content'], 'test.png', { type: 'image/png' });
const largeFile = new File([new ArrayBuffer(1024 * 1024 * 10)], 'large.pdf', { type: 'application/pdf' });

type TestDropzoneProps = Partial<React.ComponentProps<typeof DropzoneRoot>>;

const TestDropzone = (props: TestDropzoneProps) => (
  <DropzoneRoot data-testid="dropzone" {...props}>
    <DropzoneHiddenInput />
    <DropzoneArea>
      <DropzoneContent>
        <span>Upload</span>
      </DropzoneContent>
    </DropzoneArea>
  </DropzoneRoot>
);

describe('Component - Dropzone', () => {
  let testKit: ReturnType<typeof createDropzoneTestKit>;

  beforeEach(() => {
    testKit = createDropzoneTestKit();
  });

  describe('file picker', () => {
    it('calls onFileAccept with valid file', async () => {
      const onFileAccept = vi.fn();
      renderComponent(<TestDropzone onFileAccept={onFileAccept} />);
      await testKit.uploadFiles([pdfFile]);
      expect(onFileAccept).toHaveBeenCalledWith([pdfFile]);
    });

    it('calls onFileReject with code file-invalid-type', async () => {
      const onFileReject = vi.fn();
      renderComponent(<TestDropzone onFileReject={onFileReject} accept={{ 'application/pdf': ['.pdf'] }} />);
      await testKit.uploadFiles([pngFile]);
      expect(onFileReject).toHaveBeenCalledWith([
        expect.objectContaining({
          file: pngFile,
          errors: expect.arrayContaining(['file-invalid-type']) as FileError[],
        }),
      ]);
    });

    it('calls onFileReject with code file-too-large', async () => {
      const onFileReject = vi.fn();
      renderComponent(<TestDropzone onFileReject={onFileReject} maxFileSize={1024} />);
      await testKit.uploadFiles([largeFile]);
      expect(onFileReject).toHaveBeenCalledWith([
        expect.objectContaining({
          errors: expect.arrayContaining(['file-too-large']) as FileError[],
        }),
      ]);
    });

    it('calls onFileReject with code too-many-files', async () => {
      const onFileReject = vi.fn();
      renderComponent(<TestDropzone onFileReject={onFileReject} maxFiles={1} multiple />);
      await testKit.uploadFiles([pdfFile, pngFile]);
      expect(onFileReject).toHaveBeenCalled();

      const [[rejections]] = onFileReject.mock.calls as [[FileRejection[]]];
      expect(rejections.some((r) => r.errors.includes('too-many-files'))).toBe(true);
    });

    it('collects multiple errors for a single file', async () => {
      const onFileReject = vi.fn();
      renderComponent(
        <TestDropzone onFileReject={onFileReject} accept={{ 'application/pdf': ['.pdf'] }} maxFileSize={1} />
      );
      await testKit.uploadFiles([pngFile]);

      const [[rejections]] = onFileReject.mock.calls as [[FileRejection[]]];
      const errors = rejections[0]?.errors ?? [];
      expect(errors.length).toBeGreaterThanOrEqual(2);
      expect(errors).toContain('file-invalid-type');
      expect(errors).toContain('file-too-large');
    });

    it('calls onFileChange with both buckets', async () => {
      const onFileChange = vi.fn();
      renderComponent(<TestDropzone onFileChange={onFileChange} />);
      await testKit.uploadFiles([pdfFile]);
      expect(onFileChange).toHaveBeenCalledWith(
        expect.objectContaining({ acceptedFiles: [pdfFile], rejectedFiles: [] })
      );
    });

    it('replaces existing file when multiple is false', async () => {
      const onFileAccept = vi.fn();
      renderComponent(<TestDropzone acceptedFiles={[pdfFile]} onFileAccept={onFileAccept} />);
      await testKit.uploadFiles([pngFile]);
      expect(onFileAccept).toHaveBeenCalledWith([pngFile]);
    });

    it('sends accumulated file list in controlled mode when multiple is true', async () => {
      const onFileAccept = vi.fn();
      renderComponent(<TestDropzone acceptedFiles={[pdfFile]} onFileAccept={onFileAccept} multiple />);
      await testKit.uploadFiles([pngFile]);
      expect(onFileAccept).toHaveBeenCalledWith([pdfFile, pngFile]);
    });
  });

  describe('drag and drop', () => {
    const getArea = () => testKit.getElement().querySelector('[role="button"]') as HTMLElement;
    const getIsDragging = () => getArea().getAttribute('data-dragging') !== null;

    it('sets data-dragging on dragenter and clears on drop', () => {
      renderComponent(<TestDropzone />);
      const area = getArea();
      fireEvent.dragEnter(area);
      expect(getIsDragging()).toBe(true);
      fireEvent.drop(area, { dataTransfer: { files: [] } });
      expect(getIsDragging()).toBe(false);
    });

    it('keeps dragging state when leaving to a child element', () => {
      renderComponent(<TestDropzone />);
      const area = getArea();
      const child = area.querySelector('[data-component="DropzoneContent"]') as HTMLElement;

      fireEvent.dragEnter(area);
      expect(getIsDragging()).toBe(true);

      // dragleave to a child — relatedTarget is inside the drop zone, should stay dragging
      void act(() => area.dispatchEvent(new MouseEvent('dragleave', { bubbles: true, relatedTarget: child })));
      expect(getIsDragging()).toBe(true);

      // dragleave to outside — relatedTarget is outside the drop zone, should clear
      void act(() => area.dispatchEvent(new MouseEvent('dragleave', { bubbles: true, relatedTarget: document.body })));
      expect(getIsDragging()).toBe(false);
    });

    it('calls onFileAccept on valid drop', () => {
      const onFileAccept = vi.fn();
      renderComponent(<TestDropzone onFileAccept={onFileAccept} />);
      fireEvent.drop(getArea(), { dataTransfer: { files: [pdfFile] } });
      expect(onFileAccept).toHaveBeenCalledWith([pdfFile]);
    });

    it('calls onFileReject with code file-invalid-type on drop', () => {
      const onFileReject = vi.fn();
      renderComponent(<TestDropzone onFileReject={onFileReject} accept={{ 'application/pdf': ['.pdf'] }} />);
      fireEvent.drop(getArea(), { dataTransfer: { files: [pngFile] } });
      expect(onFileReject).toHaveBeenCalledWith([
        expect.objectContaining({
          file: pngFile,
          errors: expect.arrayContaining(['file-invalid-type']) as FileError[],
        }),
      ]);
    });

    it('calls onFileReject with code file-too-large on drop', () => {
      const onFileReject = vi.fn();
      renderComponent(<TestDropzone onFileReject={onFileReject} maxFileSize={1024} />);
      fireEvent.drop(getArea(), { dataTransfer: { files: [largeFile] } });
      expect(onFileReject).toHaveBeenCalledWith([
        expect.objectContaining({
          errors: expect.arrayContaining(['file-too-large']) as FileError[],
        }),
      ]);
    });

    it('calls onFileReject with code too-many-files when multiple files are dropped and multiple is false', () => {
      const onFileReject = vi.fn();
      renderComponent(<TestDropzone onFileReject={onFileReject} />);
      fireEvent.drop(getArea(), { dataTransfer: { files: [pdfFile, pngFile] } });
      expect(onFileReject).toHaveBeenCalled();
      const [[rejections]] = onFileReject.mock.calls as [[FileRejection[]]];
      expect(rejections.every((r) => r.errors.includes('too-many-files'))).toBe(true);
    });

    it('replaces existing file when multiple is false', () => {
      const onFileAccept = vi.fn();
      renderComponent(<TestDropzone acceptedFiles={[pdfFile]} onFileAccept={onFileAccept} />);
      fireEvent.drop(getArea(), { dataTransfer: { files: [pngFile] } });
      expect(onFileAccept).toHaveBeenCalledWith([pngFile]);
    });

    it('sends accumulated file list in controlled mode when multiple is true', () => {
      const onFileAccept = vi.fn();
      renderComponent(<TestDropzone acceptedFiles={[pdfFile]} onFileAccept={onFileAccept} multiple />);
      fireEvent.drop(getArea(), { dataTransfer: { files: [pngFile] } });
      expect(onFileAccept).toHaveBeenCalledWith([pdfFile, pngFile]);
    });
  });

  describe('uncontrolled', () => {
    it('defaultAcceptedFiles seeds initial state', async () => {
      const onFileChange = vi.fn();
      renderComponent(<TestDropzone defaultAcceptedFiles={[pdfFile]} onFileChange={onFileChange} />);
      await testKit.uploadFiles([pngFile]);
      expect(onFileChange).toHaveBeenCalledWith(expect.objectContaining({ acceptedFiles: [pngFile] }));
    });

    it('defaultRejectedFiles seeds initial state', async () => {
      const rejection: FileRejection = { file: pngFile, errors: ['file-invalid-type'] };
      const onFileChange = vi.fn();
      renderComponent(<TestDropzone defaultRejectedFiles={[rejection]} onFileChange={onFileChange} />);
      await testKit.uploadFiles([pdfFile]);
      expect(onFileChange).toHaveBeenCalledWith(expect.objectContaining({ rejectedFiles: [] }));
    });
  });

  describe('a11y', () => {
    const renderWithAreaProps = (areaProps: React.ComponentProps<typeof DropzoneArea>) =>
      renderComponent(
        <DropzoneRoot data-testid="dropzone">
          <DropzoneHiddenInput />
          <DropzoneArea {...areaProps}>
            <DropzoneContent>
              <span>Upload</span>
            </DropzoneContent>
          </DropzoneArea>
        </DropzoneRoot>
      );

    it('aria-label on DropzoneArea is applied to the interactive element', () => {
      renderWithAreaProps({ 'aria-label': 'Upload invoice' });
      expect(testKit.getElement().querySelector('[role="button"]')).toHaveAccessibleName('Upload invoice');
    });

    it('aria-labelledby on DropzoneArea is applied to the interactive element', () => {
      renderComponent(
        <>
          <span id="label-id">Invoice label</span>
          <DropzoneRoot data-testid="dropzone">
            <DropzoneHiddenInput />
            <DropzoneArea aria-labelledby="label-id">
              <DropzoneContent>
                <span>Upload</span>
              </DropzoneContent>
            </DropzoneArea>
          </DropzoneRoot>
        </>
      );
      expect(testKit.getElement().querySelector('[role="button"]')).toHaveAccessibleName('Invoice label');
    });

    it('aria-describedby on DropzoneArea is applied to the interactive element', () => {
      renderComponent(
        <>
          <span id="desc-id">PDF only, up to 10MB</span>
          <DropzoneRoot data-testid="dropzone">
            <DropzoneHiddenInput />
            <DropzoneArea aria-describedby="desc-id">
              <DropzoneContent>
                <span>Upload</span>
              </DropzoneContent>
            </DropzoneArea>
          </DropzoneRoot>
        </>
      );
      expect(testKit.getElement().querySelector('[role="button"]')).toHaveAccessibleDescription('PDF only, up to 10MB');
    });
  });
});
