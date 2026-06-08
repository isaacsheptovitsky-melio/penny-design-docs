import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

export function createVerificationCodeFieldTestKit(
  page: Page,
  { dataTestId = DEFAULT_DATA_TEST_ID.VERIFICATION_CODE_FIELD }: TestKitProps = {}
) {
  const getElement = () => page.getByTestId(dataTestId);
  const getInputs = () => getElement().locator('[role="textbox"]');

  const getValue = async () => {
    const inputs = getInputs();
    const count = await inputs.count();
    const values: string[] = [];

    for (let i = 0; i < count; i++) {
      const value = await inputs.nth(i).inputValue();
      values.push(value);
    }

    return values.join('');
  };

  const getIsInvalid = async (): Promise<boolean> => {
    const inputs = await getInputs().all();

    const areInputsInvalid = await Promise.all(
      inputs?.map(async (input) => (await input.getAttribute('aria-invalid')) === 'true')
    );
    return areInputsInvalid.every(Boolean);
  };

  const getIsDisabled = async (): Promise<boolean> => {
    const inputs = await getInputs().all();

    const areInputsDisabled = await Promise.all(inputs?.map(async (input) => await input.isDisabled()));
    return areInputsDisabled.every(Boolean);
  };

  const getIsReadOnly = async () => {
    const inputs = await getInputs().all();

    const areInputsReadOnly = await Promise.all(
      inputs?.map(async (input) => (await input.getAttribute('readonly')) !== null)
    );
    return areInputsReadOnly.every(Boolean);
  };

  const getErrorMessage = async () => {
    const errorElement = page.getByTestId(`${dataTestId}-error-message`);
    if (!(await errorElement.isVisible())) {
      return null;
    }
    return await errorElement.textContent();
  };

  const type = async (code: string) => {
    const inputs = getInputs();
    const count = await inputs.count();

    for (let i = 0; i < code.length && i < count; i++) {
      await inputs.nth(i).fill(code[i] as string);
    }
  };

  const clear = async () => {
    const inputs = getInputs();
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
      await inputs.nth(i).clear();
    }
  };

  return {
    dataTestId,
    getElement,
    getValue,
    getIsInvalid,
    getIsDisabled,
    getIsReadOnly,
    getErrorMessage,
    type,
    clear,
  };
}
