import { screen } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

/**
 * Creates a test kit for the Checkbox component.
 * @param props - Test kit configuration options
 * @param props.dataTestId - The data-testid attribute used to identify the checkbox component. Defaults to 'checkbox'.
 * @returns An object containing utility methods for testing the Checkbox component
 * @example
 * ```tsx
 * const testKit = createCheckboxTestKit({ dataTestId: 'my-checkbox' });
 * render(<Checkbox isChecked onChange={vi.fn()} data-testid="my-checkbox" />);
 * expect(testKit.getIsChecked()).toBe(true);
 * ```
 */
export function createCheckboxTestKit({ dataTestId = DEFAULT_DATA_TEST_ID.CHECKBOX }: TestKitProps = {}) {
  /**
   * Gets the container element of the checkbox.
   * @example
   * ```tsx
   * const container = testKit.getElement();
   * expect(container).toBeInTheDocument();
   * ```
   */
  const getElement = () => screen.getByTestId<HTMLDivElement>(dataTestId);

  /**
   * Gets the input element of the checkbox.
   * @example
   * ```tsx
   * const input = testKit.getInputElement();
   * expect(input).toHaveAttribute('role', 'checkbox');
   * ```
   */
  const getInputElement = () => screen.getByTestId<HTMLDivElement>(`${dataTestId}-input`);

  /**
   * Checks if the checkbox is disabled.
   * @example
   * ```tsx
   * render(<Checkbox isDisabled />);
   * expect(testKit.getIsDisabled()).toBe(true);
   * ```
   */
  const getIsDisabled = () => getInputElement().getAttribute('aria-disabled') === 'true';

  /**
   * Checks if the checkbox is required.
   * @example
   * ```tsx
   * render(<Checkbox aria-required="true" />);
   * expect(testKit.getIsRequired()).toBe(true);
   * ```
   */
  const getIsRequired = () => getInputElement().getAttribute('aria-required') === 'true';

  /**
   * Checks if the checkbox is checked.
   * @example
   * ```tsx
   * render(<Checkbox isChecked onChange={vi.fn()} />);
   * expect(testKit.getIsChecked()).toBe(true);
   * ```
   */
  const getIsChecked = () => getInputElement().getAttribute('aria-checked') === 'true';

  /**
   * Checks if the checkbox is in indeterminate state.
   * @example
   * ```tsx
   * render(<Checkbox isIndeterminate onChange={vi.fn()} />);
   * expect(testKit.getIsIndeterminate()).toBe(true);
   * ```
   */
  const getIsIndeterminate = () => getInputElement().getAttribute('aria-checked') === 'mixed';

  /**
   * Checks if the checkbox is read-only.
   * @example
   * ```tsx
   * render(<Checkbox isReadOnly />);
   * expect(testKit.getIsReadOnly()).toBe(true);
   * ```
   */
  const getIsReadOnly = () => getInputElement().getAttribute('aria-readonly') === 'true';

  /**
   * Checks if the checkbox is invalid.
   * @example
   * ```tsx
   * render(<Checkbox isInvalid />);
   * expect(testKit.getIsInvalid()).toBe(true);
   * ```
   */
  const getIsInvalid = () => getInputElement().getAttribute('aria-invalid') === 'true';

  /**
   * Gets the label element of the checkbox.
   * @example
   * ```tsx
   * render(<Checkbox label="Accept terms" />);
   * expect(testKit.getLabelElement()).toBeInTheDocument();
   * ```
   */
  const getLabelElement = () => screen.queryByTestId(`${dataTestId}-label`);

  /**
   * Gets the text content of the checkbox label.
   * @example
   * ```tsx
   * render(<Checkbox label="Accept terms" />);
   * expect(testKit.getLabelText()).toBe('Accept terms');
   * ```
   */
  const getLabelText = () => getLabelElement()?.textContent || '';

  /**
   * Clicks on the checkbox input element.
   * @example
   * ```tsx
   * const onChange = vi.fn();
   * render(<Checkbox onChange={onChange} />);
   * await testKit.click();
   * expect(onChange).toHaveBeenCalledTimes(1);
   * ```
   */
  const click = async () => await userEvent.click(getInputElement());

  /**
   * Toggles the checkbox state.
   * @param isChecked - Optional. Pass true to check, false to uncheck. If undefined, toggles the current state.
   * @example
   * ```tsx
   * // Toggle to checked state
   * await testKit.toggle(true);
   * expect(testKit.getIsChecked()).toBe(true);
   *
   * // Toggle to unchecked state
   * await testKit.toggle(false);
   * expect(testKit.getIsChecked()).toBe(false);
   *
   * // Simply toggle the current state
   * await testKit.toggle();
   * ```
   */
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
    getIsDisabled,
    getIsRequired,
    getIsChecked,
    getIsIndeterminate,
    getIsReadOnly,
    getIsInvalid,
    getLabelText,
    click,
    toggle,
  };
}
