import { screen } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';

/**
 * Creates a testkit for interacting with a single segment item within a SegmentedControl.
 * @param segmentDataTestId - The data-testid of the segment item
 */
export function createSegmentItemTestKit(segmentDataTestId: string) {
  /**
   * Returns the input element of the segment.
   */
  const getInputElement = () => screen.getByTestId<HTMLInputElement>(`${segmentDataTestId}-input`);

  /**
   * Returns the label element of the segment.
   */
  const getLabelElement = () => screen.getByTestId<HTMLLabelElement>(`${segmentDataTestId}-label`);

  /**
   * Checks if the segment is currently selected.
   */
  const getIsChecked = () => getInputElement().checked;

  /**
   * Checks if the segment is disabled.
   */
  const getIsDisabled = () => getInputElement().disabled;

  /**
   * Checks if the segment is read-only.
   */
  const getIsReadOnly = () => getInputElement().getAttribute('data-readonly') === 'true';

  /**
   * Gets the value of the segment.
   */
  const getValue = () => getInputElement().value;

  /**
   * Clicks the segment input to select/deselect it.
   */
  const click = async () => await userEvent.click(getInputElement());

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
