import { screen } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { InputType, Props } from './types';
import { formFieldTestKitMap } from './utils';

export function createFormFieldTestKit<T extends InputType>({
  dataTestId = DEFAULT_DATA_TEST_ID.FORM_FIELD,
  inputType,
}: Props<T>) {
  const inputTestKit = formFieldTestKitMap[inputType]({
    dataTestId: `${dataTestId}-render-field`,
  }) as ReturnType<(typeof formFieldTestKitMap)[T]>;

  const getElement = () => screen.getByTestId<HTMLDivElement | HTMLLIElement>(dataTestId);
  const getLabelContainerElement = () => screen.queryByTestId<HTMLDivElement>(`${dataTestId}-label-container`);
  const getLabelElement = () => screen.queryByTestId<HTMLDivElement | HTMLLabelElement>(`${dataTestId}-label`);
  const getErrorMessageElement = () => screen.queryByTestId<HTMLSpanElement>(`${dataTestId}-error-message`);
  const getHelperTextElement = () => screen.queryByTestId<HTMLSpanElement>(`${dataTestId}-helper-text`);
  const getMaxCharsCounterElement = () => screen.queryByTestId<HTMLSpanElement>(`${dataTestId}-chars-counter`);
  const getLabelText = () => getLabelElement()?.textContent || '';
  const getErrorMessage = () => getErrorMessageElement()?.textContent || '';
  const getHelperText = () => getHelperTextElement()?.textContent || '';
  const getMaxCharsCounter = () => getMaxCharsCounterElement()?.textContent || '';
  const getIsLabelHidden = () => getLabelContainerElement()?.getAttribute('data-hidden') === 'true';

  const getIsDisabled = () => {
    const labelElement = getLabelElement();

    return (
      labelElement?.getAttribute('data-disabled') === 'true' && labelElement?.getAttribute('aria-disabled') === 'true'
    );
  };

  const getIsReadOnly = () => getLabelElement()?.getAttribute('data-readonly') === 'true';

  const getIsViewMode = () => {
    const labelElement = getLabelElement();

    return labelElement?.getAttribute('data-view-mode') === 'true' && labelElement.tagName === 'DIV';
  };

  const getIsInvalid = () => getLabelElement()?.getAttribute('data-invalid') === 'true';

  const getIsRequired = () => getLabelText()?.endsWith('*');
  const getIsLabelHasOptionalIndicator = () => getLabelText()?.endsWith('(optional)');

  const clickLabel = async () => {
    const labelFirstChildElement = getLabelElement()?.firstElementChild;
    return labelFirstChildElement ? userEvent.click(labelFirstChildElement) : null;
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
