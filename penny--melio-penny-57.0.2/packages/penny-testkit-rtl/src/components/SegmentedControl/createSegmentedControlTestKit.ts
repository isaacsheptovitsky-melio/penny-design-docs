import { screen } from '@testing-library/dom';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { createSegmentItemTestKit } from './createSegmentItemTestKit';

/**
 * Creates a testkit for the SegmentedControl component.
 * Provides methods to interact with and query the state of the segmented control.
 * @param props - Optional configuration including custom dataTestId
 * @example
 * ```typescript
 * const testKit = createSegmentedControlTestKit({ dataTestId: 'my-segmented-control' });
 * const segment = testKit.getSegment('my-segmented-control.segment-1');
 * await segment.click();
 * expect(segment.getIsChecked()).toBe(true);
 * ```
 */
export function createSegmentedControlTestKit({
  dataTestId = DEFAULT_DATA_TEST_ID.SEGMENTED_CONTROL,
}: TestKitProps = {}) {
  /**
   * Returns the container element of the segmented control.
   */
  const getElement = () => screen.getByTestId<HTMLDivElement>(dataTestId);

  /**
   * Returns the ARIA role of the segmented control.
   * Returns 'radiogroup' for single select or 'group' for multi-select.
   */
  const getRole = () => getElement().getAttribute('role') || '';

  /**
   * Checks if the segmented control is in multi-select mode.
   */
  const getIsMulti = () => getRole() === 'group';

  /**
   * Creates a testkit for a specific segment item within the segmented control.
   * @param segmentDataTestId - The data-testid of the segment item
   */
  const getSegment = (segmentDataTestId: string) => createSegmentItemTestKit(segmentDataTestId);

  /**
   * Returns the testkit for the currently selected segment.
   * For multi-select mode, returns the first selected segment.
   * Returns null if no segment is selected.
   */
  const getSelectedSegment = () => {
    const container = getElement();
    const selectedInput = container.querySelector<HTMLInputElement>('input:checked');

    if (!selectedInput) {
      return null;
    }

    const segmentDataTestId = selectedInput.getAttribute('data-testid')?.replace(/-input$/, '');

    if (!segmentDataTestId) {
      return null;
    }

    return createSegmentItemTestKit(segmentDataTestId);
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
