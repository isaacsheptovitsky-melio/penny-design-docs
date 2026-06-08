import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { createSegmentItemTestKit } from './createSegmentItemTestKit';

/**
 * Creates a testkit for the SegmentedControl component.
 * Provides methods to interact with and query the state of the segmented control.
 * @param page - The Playwright page object
 * @param props - Optional configuration including custom dataTestId
 * @example
 * ```typescript
 * const testKit = createSegmentedControlTestKit(page, { dataTestId: 'my-segmented-control' });
 * const segment = testKit.getSegment('my-segmented-control.segment-1');
 * await segment.click();
 * expect(await segment.getIsChecked()).toBe(true);
 * ```
 */
export function createSegmentedControlTestKit(
  page: Page,
  { dataTestId = DEFAULT_DATA_TEST_ID.SEGMENTED_CONTROL }: TestKitProps = {}
) {
  /**
   * Returns the container element locator of the segmented control.
   */
  const getElement = () => page.getByTestId(dataTestId);

  /**
   * Returns the ARIA role of the segmented control.
   * Returns 'radiogroup' for single select or 'group' for multi-select.
   */
  const getRole = async () => (await getElement().getAttribute('role')) || '';

  /**
   * Checks if the segmented control is in multi-select mode.
   */
  const getIsMulti = async () => (await getRole()) === 'group';

  /**
   * Creates a testkit for a specific segment item within the segmented control.
   * @param segmentDataTestId - The data-testid of the segment item
   */
  const getSegment = (segmentDataTestId: string) => createSegmentItemTestKit(page, segmentDataTestId);

  /**
   * Returns the testkit for the currently selected segment.
   * For multi-select mode, returns the first selected segment.
   * Returns null if no segment is selected.
   */
  const getSelectedSegment = async () => {
    const container = getElement();
    const selectedInput = container.locator('input:checked').first();

    if ((await selectedInput.count()) === 0) {
      return null;
    }

    const inputTestId = await selectedInput.getAttribute('data-testid');
    const segmentDataTestId = inputTestId?.replace(/-input$/, '');

    if (!segmentDataTestId) {
      return null;
    }

    return createSegmentItemTestKit(page, segmentDataTestId);
  };

  /**
   * Selects a segment by its data-testid.
   * @param segmentDataTestId - The data-testid of the segment to select
   */
  const select = async (segmentDataTestId: string) => {
    const segment = getSegment(segmentDataTestId);
    await segment.click();
  };

  return {
    dataTestId,
    getElement,
    getRole,
    getIsMulti,
    getSegment,
    getSelectedSegment,
    select,
  };
}
