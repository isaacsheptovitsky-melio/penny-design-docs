import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { createBaseModalTestKit } from '../BaseModal/createBaseModalTestKit';
import { createButtonTestKit } from '../Button/createButtonTestKit';

export function createModalTestKit(page: Page, { dataTestId = DEFAULT_DATA_TEST_ID.MODAL }: TestKitProps) {
  const baseModalTestKit = createBaseModalTestKit(page, { dataTestId });
  const primaryButtonTestKit = createButtonTestKit(page, { dataTestId: DEFAULT_DATA_TEST_ID.MODAL_PRIMARY_BUTTON });
  const secondaryButtonTestKit = createButtonTestKit(page, {
    dataTestId: DEFAULT_DATA_TEST_ID.MODAL_SECONDARY_BUTTON,
  });

  return {
    ...baseModalTestKit,
    primaryButton: primaryButtonTestKit,
    secondaryButton: secondaryButtonTestKit,
  };
}
