import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { createBaseIconTestKit } from '../BaseIcon/createBaseIconTestKit';

export const createStatusIconSolidTestKit = (
  page: Page,
  { dataTestId = DEFAULT_DATA_TEST_ID.STATUS_ICON_SOLID }: TestKitProps
) => createBaseIconTestKit(page, { dataTestId });
