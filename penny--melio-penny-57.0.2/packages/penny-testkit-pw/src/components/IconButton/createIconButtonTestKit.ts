import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { getButtonCommands } from '../Button/buttonCommands';

export function createIconButtonTestKit(page: Page, { dataTestId = DEFAULT_DATA_TEST_ID.ICON_BUTTON }: TestKitProps) {
  const getElement = () => page.getByTestId(dataTestId);
  const pwCommands = getButtonCommands(getElement());

  return {
    ...pwCommands,
    dataTestId,
    getElement,
  };
}
