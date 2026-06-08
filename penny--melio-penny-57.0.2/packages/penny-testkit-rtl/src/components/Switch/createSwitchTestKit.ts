import { screen } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

export function createSwitchTestKit({ dataTestId = DEFAULT_DATA_TEST_ID.SWITCH }: TestKitProps = {}) {
  const getElement = () => screen.getByTestId<HTMLDivElement>(dataTestId);
  const getInputElement = () => screen.getByTestId<HTMLInputElement>(`${dataTestId}-input`);
  const getIsDisabled = () => getInputElement().disabled;
  const getIsRequired = () => getInputElement().getAttribute('aria-required') === 'true';
  const getIsChecked = () => getInputElement().checked;

  const getIsReadOnly = () => {
    const inputElement = getInputElement();

    return (
      inputElement.getAttribute('aria-readonly') === 'true' && inputElement.getAttribute('data-readonly') === 'true'
    );
  };

  const getLabelElement = () => screen.queryByTestId(`${dataTestId}-label`);
  const getLabelText = () => getLabelElement()?.textContent || '';
  const click = async () => await userEvent.click(getInputElement());

  const toggle = async (isChecked?: boolean) => {
    const isCurrentlyChecked = getIsChecked();

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
