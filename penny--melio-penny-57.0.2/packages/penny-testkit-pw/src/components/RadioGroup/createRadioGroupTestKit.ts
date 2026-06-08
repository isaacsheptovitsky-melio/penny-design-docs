import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { createRadioTestKit } from '../Radio/createRadioTestKit';

/**
 * Creates a test kit for the RadioGroup component.
 * @param page - The Playwright page object
 * @param props.dataTestId - The data-testid attribute used to identify the radio group. Defaults to 'radio-group'.
 */
export function createRadioGroupTestKit(
  page: Page,
  { dataTestId = DEFAULT_DATA_TEST_ID.RADIO_GROUP }: TestKitProps = {}
) {
  /** Gets the radio group container element */
  const getElement = () => page.getByTestId(dataTestId);

  /** Checks if the radio group is disabled */
  const getIsDisabled = async () => (await getElement().getAttribute('aria-disabled')) === 'true';

  /** Checks if the radio group is invalid */
  const getIsInvalid = async () => (await getElement().getAttribute('data-invalid')) === 'true';

  /** Checks if the radio group is in view mode */
  const getIsViewMode = async () => (await getElement().getAttribute('data-view-mode')) !== null;

  /** Gets all radios as an array of radioTestKits */
  const getAllRadios = async () => {
    const radioElements = getElement().locator('input[type="radio"]');
    const count = await radioElements.count();
    const radios = [];
    for (let i = 0; i < count; i++) {
      const inputTestId = (await radioElements.nth(i).getAttribute('data-testid')) ?? '';
      const radioDataTestId = inputTestId.replace(/-input$/, '');
      radios.push(createRadioTestKit(page, { dataTestId: radioDataTestId }));
    }
    return radios;
  };

  /** Gets a specific radio option testkit by its value */
  const radio = (value: string) => createRadioTestKit(page, { dataTestId: `${dataTestId}-${value}` });

  /** Gets the currently selected option value */
  const getSelectedOption = async () => {
    const checkedRadio = getElement().locator('input[type="radio"]:checked');
    const count = await checkedRadio.count();
    if (count === 0) return undefined;
    return await checkedRadio.getAttribute('value');
  };

  /** Selects a radio option by its value */
  const selectOption = async (value: string) => {
    await radio(value).click();
  };

  /** Gets all option values in the group */
  const getAllValues = async () => {
    const radios = await getAllRadios();
    const values: string[] = [];
    for (const r of radios) {
      const value = await r.getValue();
      values.push(value ?? 'on');
    }
    return values;
  };

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
