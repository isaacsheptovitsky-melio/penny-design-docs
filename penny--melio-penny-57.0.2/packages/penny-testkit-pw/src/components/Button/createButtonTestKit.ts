import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { getButtonCommands } from './buttonCommands';

export function createButtonTestKit(page: Page, { dataTestId = DEFAULT_DATA_TEST_ID.BUTTON }: TestKitProps) {
  const getElement = () => page.getByTestId(dataTestId);
  const buttonCommands = getButtonCommands(getElement());

  return {
    ...buttonCommands,
    dataTestId,
    getElement,
    getIsLoading: async () => (await getElement().getAttribute('data-loading')) === 'true',
    getLabelText: async () => await getElement().innerText(),
  };
}
