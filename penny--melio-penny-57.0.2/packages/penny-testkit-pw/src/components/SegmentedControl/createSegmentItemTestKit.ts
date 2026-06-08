import type { Page } from '@playwright/test';

/**
 * Creates a testkit for interacting with a single segment item within a SegmentedControl.
 * @param page - The Playwright page object
 * @param segmentDataTestId - The data-testid of the segment item
 */
export function createSegmentItemTestKit(page: Page, segmentDataTestId: string) {
  /**
   * Returns the input element locator of the segment.
   */
  const getInputElement = () => page.getByTestId(`${segmentDataTestId}-input`);

  /**
   * Returns the label element locator of the segment.
   */
  const getLabelElement = () => page.getByTestId(`${segmentDataTestId}-label`);

  /**
   * Checks if the segment is currently selected.
   */
  const getIsChecked = async () => await getInputElement().isChecked();

  /**
   * Checks if the segment is disabled.
   */
  const getIsDisabled = async () => await getInputElement().isDisabled();

  /**
   * Checks if the segment is read-only.
   */
  const getIsReadOnly = async () => (await getInputElement().getAttribute('data-readonly')) === 'true';

  /**
   * Gets the value of the segment.
   */
  const getValue = async () => (await getInputElement().getAttribute('value')) || '';

  /**
   * Clicks the segment input to select/deselect it.
   */
  const click = async () => await getInputElement().click();

  return {
    getInputElement,
    getLabelElement,
    getIsChecked,
    getIsDisabled,
    getIsReadOnly,
    getValue,
    click,
  };
}

export type SegmentItemTestKit = ReturnType<typeof createSegmentItemTestKit>;
