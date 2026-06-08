import { screen } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

/**
 * Creates a test kit for the Radio component.
 * @param props - Test kit configuration options
 * @param props.dataTestId - The data-testid attribute used to identify the radio component. Defaults to 'radio'.
 */
export function createRadioTestKit({ dataTestId = DEFAULT_DATA_TEST_ID.RADIO }: TestKitProps = {}) {
  /** Gets the container element of the radio. */
  const getElement = () => screen.getByTestId<HTMLDivElement>(dataTestId);

  /** Gets the input element of the radio. */
  const getInputElement = () => screen.getByTestId<HTMLInputElement>(`${dataTestId}-input`);

  /** Checks if the radio is disabled. */
  const getIsDisabled = () => getInputElement().getAttribute('aria-disabled') === 'true';

  /** Checks if the radio is checked. */
  const getIsChecked = () => getInputElement().checked;

  /** Checks if the radio is read-only. */
  const getIsReadOnly = () => getInputElement().getAttribute('data-readonly') === 'true';

  /** Checks if the radio is invalid. */
  const getIsInvalid = () => getInputElement().getAttribute('aria-invalid') === 'true';

  /** Gets the value of the radio. */
  const getValue = () => getInputElement().value;

  /** Clicks on the radio input element. */
  const click = async () => await userEvent.click(getInputElement());

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
