import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

export function createSwitchTestKit(page: Page, { dataTestId = DEFAULT_DATA_TEST_ID.SWITCH }: TestKitProps = {}) {
  const getElement = () => page.getByTestId(dataTestId);
  const getInputElement = () => page.getByTestId(`${dataTestId}-input`);
  const getIsDisabled = async () => await getInputElement().isDisabled();
  const getIsRequired = async () => (await getInputElement().getAttribute('aria-required')) === 'true';
  const getIsChecked = async () => await getInputElement().isChecked();

  const getIsReadOnly = async () => {
    const inputElement = getInputElement();

    return (
      (await inputElement.getAttribute('aria-readonly')) === 'true' &&
      (await inputElement.getAttribute('data-readonly')) === 'true'
    );
  };

  const getLabelElement = () => page.getByTestId(`${dataTestId}-label`);
  const getLabelText = async () => (await getLabelElement().textContent()) || '';
  const click = async () => await getInputElement().click();

  const toggle = async (isChecked?: boolean) => {
    const isCurrentlyChecked = await getIsChecked();

    if (isChecked === undefined) {
      await click();
    } else if (isChecked && !isCurrentlyChecked) {
      await click();
    } else if (!isChecked && isCurrentlyChecked) {
      await click();
    }
  };

  return {
    dataTestId,
    getElement,
    getInputElement,
    getIsReadOnly,
    getIsDisabled,
    getIsRequired,
    getIsChecked,
    getLabelText,
    toggle,
  };
}
