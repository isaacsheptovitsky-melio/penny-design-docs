import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

/**
 * Creates a test kit for the Checkbox component.
 * @param page - The Playwright page object
 * @param props - Test kit configuration options
 * @param props.dataTestId - The data-testid attribute used to identify the checkbox component. Defaults to 'checkbox'.
 * @returns An object containing utility methods for testing the Checkbox component
 * @example
 * ```ts
 * const testKit = createCheckboxTestKit(page, { dataTestId: 'my-checkbox' });
 * await page.goto('/some-page');
 * expect(await testKit.getIsChecked()).toBe(true);
 * ```
 */
export function createCheckboxTestKit(page: Page, { dataTestId = DEFAULT_DATA_TEST_ID.CHECKBOX }: TestKitProps = {}) {
  /**
   * Gets the container element of the checkbox.
   * @example
   * ```ts
   * const container = testKit.getElement();
   * await expect(container).toBeVisible();
   * ```
   */
  const getElement = () => page.getByTestId(dataTestId);

  /**
   * Gets the input element of the checkbox.
   * @example
   * ```ts
   * const input = testKit.getInputElement();
   * await expect(input).toHaveAttribute('role', 'checkbox');
   * ```
   */
  const getInputElement = () => page.getByTestId(`${dataTestId}-input`);

  /**
   * Checks if the checkbox is disabled.
   * @example
   * ```ts
   * expect(await testKit.getIsDisabled()).toBe(true);
   * ```
   */
  const getIsDisabled = async () => (await getInputElement().getAttribute('aria-disabled')) === 'true';

  /**
   * Checks if the checkbox is required.
   * @returns A promise that resolves to true if the checkbox is required, false otherwise
   * @example
   * ```ts
   * expect(await testKit.getIsRequired()).toBe(true);
   * ```
   */
  const getIsRequired = async () => (await getInputElement().getAttribute('aria-required')) === 'true';

  /**
   * Checks if the checkbox is checked.
   * @example
   * ```ts
   * expect(await testKit.getIsChecked()).toBe(true);
   * ```
   */
  const getIsChecked = async () => (await getInputElement().getAttribute('aria-checked')) === 'true';

  /**
   * Checks if the checkbox is in indeterminate state.
   * @example
   * ```ts
   * expect(await testKit.getIsIndeterminate()).toBe(true);
   * ```
   */
  const getIsIndeterminate = async () => (await getInputElement().getAttribute('aria-checked')) === 'mixed';

  /**
   * Checks if the checkbox is read-only.
   * @example
   * ```ts
   * expect(await testKit.getIsReadOnly()).toBe(true);
   * ```
   */
  const getIsReadOnly = async () => (await getInputElement().getAttribute('aria-readonly')) === 'true';

  /**
   * Checks if the checkbox is invalid.
   * @example
   * ```ts
   * expect(await testKit.getIsInvalid()).toBe(true);
   * ```
   */
  const getIsInvalid = async () => (await getInputElement().getAttribute('aria-invalid')) === 'true';

  /**
   * Gets the label element of the checkbox.
   * @example
   * ```ts
   * const label = testKit.getLabelElement();
   * await expect(label).toBeVisible();
   * ```
   */
  const getLabelElement = () => page.getByTestId(`${dataTestId}-label`);

  /**
   * Gets the text content of the checkbox label.
   * @example
   * ```ts
   * expect(await testKit.getLabelText()).toBe('Accept terms');
   * ```
   */
  const getLabelText = async () => (await getLabelElement().textContent()) || '';

  /**
   * Clicks on the checkbox input element.
   * @example
   * ```ts
   * await testKit.click();
   * expect(await testKit.getIsChecked()).toBe(true);
   * ```
   */
  const click = async () => await getInputElement().click();

  /**
   * Toggles the checkbox state.
   * @param isChecked - Optional. Pass true to check, false to uncheck. If undefined, toggles the current state.
   * @example
   * ```ts
   * // Toggle to checked state
   * await testKit.toggle(true);
   * expect(await testKit.getIsChecked()).toBe(true);
   *
   * // Toggle to unchecked state
   * await testKit.toggle(false);
   * expect(await testKit.getIsChecked()).toBe(false);
   *
   * // Simply toggle the current state
   * await testKit.toggle();
   * ```
   */
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
