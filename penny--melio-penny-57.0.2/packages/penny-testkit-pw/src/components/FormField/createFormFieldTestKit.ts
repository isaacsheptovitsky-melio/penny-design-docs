import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import { InputType, Props } from './types';
import { formFieldTestKitMap } from './utils';

export function createFormFieldTestKit<T extends InputType>(
  page: Page,
  { dataTestId = DEFAULT_DATA_TEST_ID.FORM_FIELD, inputType }: Props<T>
) {
  const inputTestKit = formFieldTestKitMap[inputType](page, {
    dataTestId: `${dataTestId}-render-field`,
  }) as ReturnType<(typeof formFieldTestKitMap)[T]>;

  const getElement = () => page.getByTestId(dataTestId);
  const getLabelContainerElement = () => page.getByTestId(`${dataTestId}-label-container`);
  const getLabelElement = () => page.getByTestId(`${dataTestId}-label`);
  const getErrorMessageElement = () => page.getByTestId(`${dataTestId}-error-message`);
  const getHelperTextElement = () => page.getByTestId(`${dataTestId}-helper-text`);
  const getMaxCharsCounterElement = () => page.getByTestId(`${dataTestId}-chars-counter`);
  const getLabelText = async () => (await getLabelElement().textContent()) || '';
  const getErrorMessage = async () => (await getErrorMessageElement().textContent()) || '';
  const getHelperText = async () => (await getHelperTextElement().textContent()) || '';
  const getMaxCharsCounter = async () => (await getMaxCharsCounterElement().textContent()) || '';
  const getIsLabelHidden = async () => (await getLabelContainerElement().getAttribute('data-hidden')) === 'true';

  const getIsDisabled = async () => {
    const labelElement = getLabelElement();

    return (
      (await labelElement.getAttribute('data-disabled')) === 'true' &&
      (await labelElement.getAttribute('aria-disabled')) === 'true'
    );
  };

  const getIsReadOnly = async () => (await getLabelElement().getAttribute('data-readonly')) === 'true';

  const getIsViewMode = async () => {
    const labelElement = getLabelElement();

    return (
      (await labelElement.getAttribute('data-view-mode')) === 'true' &&
      (await labelElement.evaluate((el) => el.tagName === 'DIV'))
    );
  };

  const getIsInvalid = async () => (await getLabelElement()?.getAttribute('data-invalid')) === 'true';

  const getIsRequired = async () => (await getLabelText())?.endsWith('*');
  const getIsLabelHasOptionalIndicator = async () => (await getLabelText())?.endsWith('(optional)');

  const clickLabel = async () => {
    const firstChild = getLabelElement().locator(':scope > *').first();

    if (await firstChild.isVisible()) {
      await firstChild.click();
    }
  };

  return {
    dataTestId,
    getElement,
    getLabelText,
    getErrorMessage,
    getHelperText,
    getMaxCharsCounter,
    getIsLabelHidden,
    getIsDisabled,
    getIsReadOnly,
    getIsViewMode,
    getIsInvalid,
    getIsRequired,
    getIsLabelHasOptionalIndicator,
    clickLabel,
    input: inputTestKit,
  };
}
