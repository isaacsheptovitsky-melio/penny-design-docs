import { screen } from '@testing-library/dom';
import { fireEvent, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

export function createFileUploadTestKit({ dataTestId = DEFAULT_DATA_TEST_ID.FILE_UPLOAD }: TestKitProps = {}) {
  const getElement = () => screen.getByTestId(dataTestId);
  const getInputElement = () => screen.getByTestId<HTMLInputElement>(`${dataTestId}-input`);
  const getPlaceholderElement = () => screen.getByTestId<HTMLDivElement>(`${dataTestId}-placeholder`);
  const getPreviewElement = () => screen.getByTestId<HTMLDivElement>(`${dataTestId}-preview`);
  const getPlaceholder = () => getPlaceholderElement().textContent;
  const getValue = () => getPreviewElement().textContent;

  const getIsDisabled = () => getElement().getAttribute('data-disabled') !== null;
  const getIsLoading = () => getElement().getAttribute('data-loading') === 'true';
  const getIsReadOnly = () => getElement().getAttribute('data-readonly') !== null;
  const getIsInvalid = () => getElement().getAttribute('data-invalid') !== null;
  const getIsSelected = () => getElement().getAttribute('data-selected') !== null;
  const uploadFile = async (file: File) => await userEvent.upload(getInputElement(), file);
  const dropFile = (file: File) => {
    fireEvent.dragEnter(getElement());
    fireEvent.dragOver(getElement());
    fireEvent.drop(getElement(), { dataTransfer: { files: [file] } });
  };
  const clickDropZone = async () => await userEvent.click(getElement());

  const getDeleteButtonElement = () => within(getElement()).getByTestId('delete-file');
  const getReplaceButtonElement = () => within(getElement()).getByTestId('replace-file');
  const clickDeleteButton = async () => await userEvent.click(getDeleteButtonElement());
  const clickReplaceButton = async () => await userEvent.click(getReplaceButtonElement());
  const getIsDeleteButtonDisabled = () => getDeleteButtonElement().hasAttribute('disabled');
  const getIsReplaceButtonDisabled = () => getReplaceButtonElement().hasAttribute('disabled');

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
