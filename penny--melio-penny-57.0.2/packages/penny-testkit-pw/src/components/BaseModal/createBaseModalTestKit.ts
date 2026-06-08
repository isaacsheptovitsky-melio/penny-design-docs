import type { Page } from '@playwright/test';

import { themeBreakpoints } from '../../constants/breakpoints';
import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import { KEYBOARD_KEY } from '../../constants/keyboardsKeys';
import type { TestKitProps } from '../../testkit.types';
import { createIconButtonTestKit } from '../IconButton/createIconButtonTestKit';

export function createBaseModalTestKit(page: Page, { dataTestId = DEFAULT_DATA_TEST_ID.BASE_MODAL }: TestKitProps) {
  const viewportSize = page.viewportSize();
  const isMobile = viewportSize && viewportSize.width < Number(themeBreakpoints.s.slice(0, -2));

  const getElement = () => page.getByTestId(dataTestId);
  const clickOverlay = async () =>
    isMobile
      ? await page.getByTestId(DEFAULT_DATA_TEST_ID.BASE_SHEET_OVERLAY).click()
      : getElement()
          .locator('..')
          .click({ position: { x: 0, y: 0 } });

  const closeButtonDataTestId = isMobile
    ? DEFAULT_DATA_TEST_ID.BASE_SHEET_CLOSE_ICON
    : DEFAULT_DATA_TEST_ID.BASE_MODAL_CLOSE_ICON;

  return {
    dataTestId,
    getElement,
    getVisible: async () => await getElement().isVisible(),
    getIsLoading: async () => await page.getByTestId(DEFAULT_DATA_TEST_ID.LOADING_CONTAINER).isVisible(),
    getRole: async () => await getElement().getAttribute('role'),
    clickOverlay,
    pressEscape: async () => await getElement().press(KEYBOARD_KEY.ESCAPE),
    closeButton: createIconButtonTestKit(page, { dataTestId: closeButtonDataTestId }),
  };
}
