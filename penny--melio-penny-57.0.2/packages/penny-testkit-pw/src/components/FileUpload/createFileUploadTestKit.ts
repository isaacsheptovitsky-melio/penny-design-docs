import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

export function createFileUploadTestKit(
  page: Page,
  { dataTestId = DEFAULT_DATA_TEST_ID.FILE_UPLOAD }: TestKitProps = {}
) {
  const getElement = () => page.getByTestId(dataTestId);
  const getInputElement = () => page.getByTestId(`${dataTestId}-input`);
  const getPlaceholderElement = () => page.getByTestId(`${dataTestId}-placeholder`);
  const getPreviewElement = () => page.getByTestId(`${dataTestId}-preview`);
  const getPlaceholder = async () => await getPlaceholderElement().textContent();
  const getValue = async () => await getPreviewElement().textContent();

  const getIsDisabled = async () => (await getElement().getAttribute('data-disabled')) !== null;
  const getIsLoading = async () => (await getElement().getAttribute('data-loading')) === 'true';
  const getIsReadOnly = async () => (await getElement().getAttribute('data-readonly')) !== null;
  const getIsInvalid = async () => (await getElement().getAttribute('data-invalid')) !== null;
  const getIsSelected = async () => (await getElement().getAttribute('data-selected')) !== null;

  const uploadFile = async (file: string) => await getInputElement().setInputFiles(file);
  const dropFile = async (file: string) => {
    const element = getElement();
    const fileName = file.split(/[/\\]/).pop() ?? 'file';
    const mimeType = fileName.endsWith('.png') ? 'image/png' : 'application/octet-stream';
    await element.evaluate(
      (el, { name, type }) => {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(new File([''], name, { type }));
        el.dispatchEvent(new DragEvent('dragenter', { dataTransfer, bubbles: true }));
        el.dispatchEvent(new DragEvent('dragover', { dataTransfer, bubbles: true }));
        el.dispatchEvent(new DragEvent('drop', { dataTransfer, bubbles: true }));
      },
      { name: fileName, type: mimeType }
    );
  };
  const clickDropZone = async () => await getElement().click();

  const getDeleteButtonElement = () => getElement().getByTestId('delete-file');
  const getReplaceButtonElement = () => getElement().getByTestId('replace-file');
  const clickDeleteButton = async () => await getDeleteButtonElement().click();
  const clickReplaceButton = async () => await getReplaceButtonElement().click();
  const getIsDeleteButtonDisabled = async () => await getDeleteButtonElement().isDisabled();
  const getIsReplaceButtonDisabled = async () => await getReplaceButtonElement().isDisabled();

  return {
    dataTestId,
    getElement,
    getPlaceholder,
    getValue,
    getIsDisabled,
    getIsLoading,
    getIsReadOnly,
    getIsInvalid,
    getIsSelected,
    uploadFile,
    dropFile,
    clickDropZone,
    clickDeleteButton,
    clickReplaceButton,
    getIsDeleteButtonDisabled,
    getIsReplaceButtonDisabled,
  };
}
