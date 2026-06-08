import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { createIconButtonTestKit } from '../IconButton/createIconButtonTestKit';

export function createSelectNewTestKit(page: Page, { dataTestId = DEFAULT_DATA_TEST_ID.SELECT }: TestKitProps = {}) {
  const getElement = () => page.getByTestId(dataTestId);

  const clickTrigger = async () => await page.getByTestId(`${dataTestId}-trigger-input`).click();

  const clickOptionByText = async (text: string) => {
    const option = page.getByRole('option', { name: text });
    await option.click();
  };

  const clickOptionByTestId = async (testId: string) => {
    const option = page.getByTestId(`${dataTestId}-option-${testId}`);
    await option.click();
  };

  const clickOptionByIndex = async (index: number) => {
    if (index < 0) {
      return;
    }

    const content = page.getByTestId(`${dataTestId}-content`);
    const options = content.locator('li[role="option"]');
    const count = await options.count();

    if (index < count) {
      const option = options.nth(index);

      await option.click();
    }
  };

  const typeSearch = async (text: string) => {
    await page.getByTestId(`${dataTestId}-search-bar-input`).fill(text);
  };

  const clickSearchButton = async () => {
    const searchIconButtonTestKit = createIconButtonTestKit(page, {
      dataTestId: `${dataTestId}-search-bar-search-button`,
    });
    await searchIconButtonTestKit.click();
  };

  const clickClearButton = async () => {
    const clearIconButtonTestKit = createIconButtonTestKit(page, {
      dataTestId: `${dataTestId}-clear-button`,
    });
    await clearIconButtonTestKit.click();
  };

  const clickClearSearch = async () => {
    const clearIconButtonTestKit = createIconButtonTestKit(page, {
      dataTestId: `${dataTestId}-search-bar-clear-button`,
    });
    await clearIconButtonTestKit.click();
  };

  const clickOutside = async () => await page.click('body');
  const pressEsc = async () => await page.keyboard.press('Escape');

  const getIsDisabled = async () =>
    (await page.getByTestId(`${dataTestId}-trigger-input`).getAttribute('aria-disabled')) === 'true';

  const getIsReadOnly = async () =>
    (await page.getByTestId(`${dataTestId}-trigger-input`).getAttribute('aria-readonly')) === 'true';

  const getIsRequired = async () =>
    (await page.getByTestId(`${dataTestId}-trigger-input`).getAttribute('aria-required')) === 'true';

  const getIsInvalid = async () =>
    (await page.getByTestId(`${dataTestId}-trigger`).getAttribute('data-invalid')) === 'true';

  const getIsViewMode = async () =>
    (await page.getByTestId(`${dataTestId}-trigger`).getAttribute('data-view-mode')) === 'true';

  const getValue = async () => {
    const isViewMode = await getIsViewMode();
    if (isViewMode) {
      return await page.getByTestId(`${dataTestId}-trigger`).getAttribute('data-value');
    }
    return await page.getByTestId(`${dataTestId}-trigger-value`).getAttribute('data-value');
  };

  const getValueLabel = async () => {
    const isViewMode = await getIsViewMode();
    const triggerTestId = isViewMode ? `${dataTestId}-trigger` : `${dataTestId}-trigger-value`;
    return await page.getByTestId(triggerTestId).getByTestId('text').textContent();
  };

  const getIsMenuOpen = async () =>
    (await page.getByTestId(`${dataTestId}-trigger-input`).getAttribute('aria-expanded')) === 'true' &&
    (await page.getByTestId(`${dataTestId}-content`).count()) > 0;

  return {
    dataTestId,
    getElement,
    clickTrigger,
    clickOptionByText,
    clickOptionByTestId,
    clickOptionByIndex,
    typeSearch,
    clickSearchButton,
    clickOutside,
    pressEsc,
    clickClearSearch,
    getValue,
    getValueLabel,
    getIsDisabled,
    getIsInvalid,
    getIsReadOnly,
    getIsRequired,
    getIsViewMode,
    clickClearButton,
    getIsMenuOpen,
  };
}
