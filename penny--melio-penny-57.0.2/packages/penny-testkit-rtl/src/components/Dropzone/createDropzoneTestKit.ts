import { screen, within } from '@testing-library/dom';
import { fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

export function createDropzoneTestKit({ dataTestId = DEFAULT_DATA_TEST_ID.DROPZONE }: TestKitProps = {}) {
  const getElement = () => screen.getByTestId(dataTestId);
  const getArea = () => within(getElement()).getByRole('button');
  const getInput = () => getElement().querySelector('input[type="file"]') as HTMLInputElement;

  const getIsDisabled = () => getInput().disabled;
  const getIsReadOnly = () => getArea().getAttribute('data-readonly') !== null;
  const getIsInvalid = () => getArea().getAttribute('aria-invalid') === 'true';

  const dropFiles = (files: File[]) => {
    const area = getArea();
    fireEvent.dragEnter(area, { dataTransfer: { files } });
    fireEvent.dragOver(area, { dataTransfer: { files } });
    fireEvent.drop(area, { dataTransfer: { files } });
  };

  const uploadFiles = async (files: File[]) => {
    const input = getElement().querySelector('input[type="file"]') as HTMLInputElement;
    await userEvent.upload(input, files, { applyAccept: false });
  };

  const openFilePicker = async () => {
    await userEvent.click(getArea());
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
