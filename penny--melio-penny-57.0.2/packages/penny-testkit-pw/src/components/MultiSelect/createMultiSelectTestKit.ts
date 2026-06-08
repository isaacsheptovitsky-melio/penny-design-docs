import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

export function createMultiSelectTestKit(
  page: Page,
  { dataTestId = DEFAULT_DATA_TEST_ID.MULTI_SELECT }: TestKitProps = {}
) {
  const getElement = () => page.getByTestId(dataTestId);
  const getTriggerElement = () => page.getByTestId(`${dataTestId}-trigger`);
  const getTriggerInputElement = () => getElement().getByTestId(`${dataTestId}-trigger-input`);
  const getTriggerValueElement = () => getElement().getByTestId(`${dataTestId}-trigger-value`);
  const getContentElement = () => page.getByTestId(`${dataTestId}-content`);
  const getOptionElementByIndex = (index: number) => {
    return getContentElement().locator('li[role="option"]').nth(index);
  };
  const getOptionElementByTestId = (testId: string) => page.getByTestId(`${dataTestId}-option-${testId}`);

  const click = async () => await getTriggerInputElement().click();

  const clickOptionByText = async (text: string) => await page.getByRole('option', { name: text }).click();

  const clickOptionByTestId = async (testId: string) => await getOptionElementByTestId(testId).click();

  const clickOptionByIndex = async (index: number) => getOptionElementByIndex(index).click();

  const clickOutside = async () => await page.click('body');

  const getValue = async () => {
    if (await getIsViewMode()) {
      return (await getTriggerElement().textContent()) || '';
    }
    return (await getTriggerValueElement().getAttribute('data-value')) || '';
  };

  const getPlaceholder = async () => {
    if (await getIsViewMode()) {
      return (await getTriggerElement().textContent()) || '';
    }
    return (await getTriggerValueElement().getAttribute('data-placeholder')) || '';
  };

  const getIsDisabled = async () => (await getTriggerInputElement().getAttribute('aria-disabled')) === 'true';
  const getIsInvalid = async () => (await getTriggerElement().getAttribute('data-invalid')) === 'true';
  const getIsReadOnly = async () => (await getTriggerInputElement().getAttribute('data-readonly')) === 'true';
  const getIsRequired = async () => (await getTriggerInputElement().getAttribute('aria-required')) === 'true';
  const getIsLoading = async () => {
    const triggerElement = getTriggerElement();
    const loadingElement = await triggerElement.getAttribute('data-loading');
    return loadingElement === 'true';
  };
  const getIsViewMode = async () => (await getTriggerElement().getAttribute('data-view-mode')) === 'true';

  const getIsMenuOpen = async () => (await getTriggerInputElement().getAttribute('aria-expanded')) === 'true';

  return {
    dataTestId,
    getElement,
    click,
    clickOutside,
    getValue,
    getPlaceholder,
    getIsDisabled,
    getIsInvalid,
    getIsReadOnly,
    getIsRequired,
    getIsViewMode,
    getIsLoading,
    getIsMenuOpen,
    clickOptionByText,
    clickOptionByIndex,
    clickOptionByTestId,
  };
}
