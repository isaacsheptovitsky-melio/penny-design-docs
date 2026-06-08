import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { createTextFieldTestKit } from '../TextField/createTextFieldTestKit';

export function createAmountFieldTestKit(
  page: Page,
  { dataTestId = DEFAULT_DATA_TEST_ID.AMOUNT_FIELD }: TestKitProps = {}
) {
  const { getMaxChars, ...restTextFieldTestKit } = createTextFieldTestKit(page, { dataTestId });

  return {
    ...restTextFieldTestKit,
  };
}
