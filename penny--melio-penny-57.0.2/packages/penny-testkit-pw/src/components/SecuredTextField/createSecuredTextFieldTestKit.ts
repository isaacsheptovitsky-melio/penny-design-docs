import { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { createIconButtonTestKit } from '../IconButton/createIconButtonTestKit';
import { createTextFieldTestKit } from '../TextField/createTextFieldTestKit';

export function createSecuredTextFieldTestKit(
  page: Page,
  { dataTestId = DEFAULT_DATA_TEST_ID.SECURED_TEXT_FIELD }: TestKitProps = {}
) {
  const textFieldTestKit = createTextFieldTestKit(page, { dataTestId });

  const maskIconButtonTestKit = createIconButtonTestKit(page, {
    dataTestId: `${dataTestId}-input-visibility-icon-button`,
  });

  const getIsTextVisible = async () => (await textFieldTestKit.getElement().getAttribute('type')) === 'text';

  const toggleTextVisibility = async (isVisible?: boolean) => {
    const isCurrentlyVisible = await getIsTextVisible();

    if (isVisible === undefined) {
      await maskIconButtonTestKit.click();
    } else if (isVisible && !isCurrentlyVisible) {
      await maskIconButtonTestKit.click();
    } else if (!isVisible && isCurrentlyVisible) {
      await maskIconButtonTestKit.click();
    }
  };

  return {
    ...textFieldTestKit,
    maskIconButton: maskIconButtonTestKit,
    getIsTextVisible,
    toggleTextVisibility,
  };
}
