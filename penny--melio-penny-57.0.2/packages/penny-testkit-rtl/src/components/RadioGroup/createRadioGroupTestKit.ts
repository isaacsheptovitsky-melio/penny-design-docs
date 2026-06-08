import { screen } from '@testing-library/dom';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { createRadioTestKit } from '../Radio/createRadioTestKit';

/**
 * Creates a test kit for the RadioGroup component.
 * @param props.dataTestId - The data-testid attribute used to identify the radio group. Defaults to 'radio-group'.
 */
export function createRadioGroupTestKit({ dataTestId = DEFAULT_DATA_TEST_ID.RADIO_GROUP }: TestKitProps = {}) {
  /** Gets the radio group container element */
  const getElement = () => screen.getByTestId<HTMLDivElement>(dataTestId);

  /** Checks if the radio group is disabled */
  const getIsDisabled = () => getElement().getAttribute('aria-disabled') === 'true';

  /** Checks if the radio group is invalid */
  const getIsInvalid = () => getElement().getAttribute('data-invalid') === 'true';

  /** Checks if the radio group is in view mode */
  const getIsViewMode = () => getElement().hasAttribute('data-view-mode');

  /** Gets all radios as an array of radioTestKits */
  const getAllRadios = () => {
    const container = getElement();
    const radioElements = Array.from(container.querySelectorAll<HTMLInputElement>('input[type="radio"]'));
    return radioElements.map((element) => {
      const inputTestId = element.getAttribute('data-testid') ?? '';
      const radioDataTestId = inputTestId.replace(/-input$/, '');
      return createRadioTestKit({ dataTestId: radioDataTestId });
    });
  };

  /** Gets a specific radio option testkit by its value */
  const radio = (value: string) => createRadioTestKit({ dataTestId: `${dataTestId}-${value}` });

  /** Gets the currently selected option value */
  const getSelectedOption = () => {
    const radios = getAllRadios();
    const checkedRadio = radios.find((r) => r.getIsChecked());
    return checkedRadio?.getValue();
  };

  /** Selects a radio option by its value */
  const selectOption = async (value: string) => {
    await radio(value).click();
  };

  /** Gets all option values in the group */
  const getAllValues = () => getAllRadios().map((r) => r.getValue());

  return {
    dataTestId,
    getElement,
    getIsDisabled,
    getIsInvalid,
    getIsViewMode,
    getAllRadios,
    radio,
    getSelectedOption,
    selectOption,
    getAllValues,
  };
}
