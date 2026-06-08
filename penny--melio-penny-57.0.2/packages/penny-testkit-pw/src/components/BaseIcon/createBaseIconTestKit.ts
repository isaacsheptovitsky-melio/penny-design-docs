import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

export function createBaseIconTestKit(page: Page, { dataTestId = DEFAULT_DATA_TEST_ID.BASE_ICON }: TestKitProps) {
  const getElement = () => page.getByTestId(dataTestId);

  return {
    dataTestId,
    getElement,
    getVisible: async () => await getElement().isVisible(),
    getActive: async () => (await getElement().getAttribute('data-active')) === 'true',
    getDisabled: async () => (await getElement().getAttribute('data-disabled')) === 'true',
    getReadOnly: async () => (await getElement().getAttribute('data-readonly')) === 'true',
    getIsBrandColor: async () => (await getElement().getAttribute('data-is-brand-color')) === 'true',
    getRole: async () => await getElement().getAttribute('role'),
  };
}
