import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

/**
 * Creates a test kit for the Radio component.
 * @param page - The Playwright page object
 * @param props - Test kit configuration options
 * @param props.dataTestId - The data-testid attribute used to identify the radio component. Defaults to 'radio'.
 */
export function createRadioTestKit(page: Page, { dataTestId = DEFAULT_DATA_TEST_ID.RADIO }: TestKitProps = {}) {
  /** Gets the container element of the radio. */
  const getElement = () => page.getByTestId(dataTestId);

  /** Gets the input element of the radio. */
  const getInputElement = () => page.getByTestId(`${dataTestId}-input`);

  /** Checks if the radio is disabled. */
  const getIsDisabled = async () => (await getInputElement().getAttribute('aria-disabled')) === 'true';

  /** Checks if the radio is checked. */
  const getIsChecked = async () => await getInputElement().isChecked();

  /** Checks if the radio is read-only. */
  const getIsReadOnly = async () => (await getInputElement().getAttribute('data-readonly')) === 'true';

  /** Checks if the radio is invalid. */
  const getIsInvalid = async () => (await getInputElement().getAttribute('aria-invalid')) === 'true';

  /** Gets the value of the radio. */
  const getValue = async () => await getInputElement().getAttribute('value');

  /** Clicks on the radio input element. */
  const click = async () => await getInputElement().click();

  return {
    dataTestId,
    getElement,
    getInputElement,
    getIsDisabled,
    getIsChecked,
    getIsReadOnly,
    getIsInvalid,
    getValue,
    click,
  };
}
