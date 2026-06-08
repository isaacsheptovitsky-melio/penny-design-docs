import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

export type DropzoneFilePayload = { name: string; mimeType: string; buffer: Buffer };

export function createDropzoneTestKit(page: Page, { dataTestId = DEFAULT_DATA_TEST_ID.DROPZONE }: TestKitProps = {}) {
  const getElement = () => page.getByTestId(dataTestId);
  const getArea = () => getElement().locator('[role="button"]');
  const getInput = () => getElement().locator('input[type="file"]');

  const getIsDisabled = async () => getInput().isDisabled();
  const getIsReadOnly = async () => (await getArea().getAttribute('data-readonly')) !== null;
  const getIsInvalid = async () => (await getArea().getAttribute('aria-invalid')) === 'true';

  const dropFiles = async (files: DropzoneFilePayload[]) => {
    const serializable = files.map(({ name, mimeType, buffer }) => ({
      name,
      mimeType,
      content: buffer.toString('base64'),
    }));
    await getArea().evaluate((el, fileDescriptors) => {
      const dt = new DataTransfer();
      for (const { name, mimeType, content } of fileDescriptors) {
        const bytes = Uint8Array.from(atob(content), (c) => c.charCodeAt(0));
        dt.items.add(new File([bytes], name, { type: mimeType }));
      }
      el.dispatchEvent(new DragEvent('dragenter', { dataTransfer: dt, bubbles: true }));
      el.dispatchEvent(new DragEvent('dragover', { dataTransfer: dt, bubbles: true }));
      el.dispatchEvent(new DragEvent('drop', { dataTransfer: dt, bubbles: true }));
    }, serializable);
  };

  const uploadFiles = async (files: DropzoneFilePayload[]) => {
    await getElement().locator('input[type="file"]').setInputFiles(files);
  };

  const openFilePicker = async () => {
    await getArea().click();
  };

  return {
    dataTestId,
    getElement,
    getIsDisabled,
    getIsReadOnly,
    getIsInvalid,
    dropFiles,
    uploadFiles,
    openFilePicker,
  };
}
