import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { getButtonCommands } from '../Button/buttonCommands';

export function createNakedButtonTestKit(
  page: Page,
  { dataTestId = DEFAULT_DATA_TEST_ID.NAKED_BUTTON }: TestKitProps = {}
) {
  const getElement = () => page.getByTestId(dataTestId);

  return {
    ...getButtonCommands(getElement()),
    dataTestId,
    getElement,
    getLabelText: async () => await getElement().innerText(),
  };
}
