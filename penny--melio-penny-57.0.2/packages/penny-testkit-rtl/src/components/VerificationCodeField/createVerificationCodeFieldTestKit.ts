import { screen, within } from '@testing-library/dom';
import type { Options, UserEvent } from '@testing-library/user-event';
import { userEvent } from '@testing-library/user-event';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

export function createVerificationCodeFieldTestKit({
  dataTestId = DEFAULT_DATA_TEST_ID.VERIFICATION_CODE_FIELD,
}: TestKitProps = {}) {
  const getElement = () => screen.getByTestId(dataTestId);
  const getInputs = () => within(getElement()).getAllByRole<HTMLInputElement>('textbox');

  const getValue = () => {
    const inputs = getInputs();
    return inputs.map((input) => input.value).join('');
  };

  const getIsInvalid = () => {
    const inputs = getInputs();
    return inputs?.every((input) => input.ariaInvalid === 'true');
  };

  const getIsDisabled = () => {
    const inputs = getInputs();
    return inputs?.every((input) => input.disabled);
  };

  const getIsReadOnly = () => {
    const inputs = getInputs();
    return inputs?.every((input) => input.readOnly);
  };

  const getErrorMessage = () => {
    const errorElement = screen.queryByTestId(`${dataTestId}-error-message`);
    return errorElement?.textContent || null;
  };

  const type = async (code: string, options?: Options & Parameters<UserEvent['type']>[2]) => {
    const inputs = getInputs();
    for (let i = 0; i < code.length && i < inputs.length; i++) {
      const input = inputs[i];
      if (input) {
        await userEvent.type(input, code[i] || '', options);
      }
    }
  };

  const clear = async () => {
    const inputs = getInputs();
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (input) {
        await userEvent.clear(input);
      }
    }
  };

  return {
    dataTestId,
    getElement,
    getInputs,
    getValue,
    getIsInvalid,
    getIsDisabled,
    getIsReadOnly,
    getErrorMessage,
    type,
    clear,
  };
}
