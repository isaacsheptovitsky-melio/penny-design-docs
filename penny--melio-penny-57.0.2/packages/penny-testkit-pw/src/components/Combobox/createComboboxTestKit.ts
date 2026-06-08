import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

export function createComboboxTestKit(page: Page, { dataTestId = DEFAULT_DATA_TEST_ID.COMBOBOX }: TestKitProps = {}) {
  const getElement = () => page.getByTestId(dataTestId);
  const getMenuElement = () => page.getByTestId(`${dataTestId}-menu`);
  const getTriggerElement = () => page.getByTestId(`${dataTestId}-trigger`);
  const getTriggerInputElement = () => page.getByTestId(`${dataTestId}-trigger-input`);
  const getTriggerValueElement = () => page.getByTestId(`${dataTestId}-trigger-value`);
  const getMobileEditModeTriggerInputElement = () =>
    page.getByTestId(`${dataTestId}-mobile-edit-mode-trigger-container-trigger-input`);

  const getIsMobileEditView = async () => page.getByTestId(`${dataTestId}-mobile-edit-mode`).isVisible();

  const getIsDisabled = async () => (await getTriggerElement().getAttribute('data-disabled')) === 'true';
  const getIsReadOnly = async () => (await getTriggerInputElement().getAttribute('readonly')) !== null;
  const getIsRequired = async () => (await getTriggerInputElement().getAttribute('required')) !== null;
  const getIsInvalid = async () => (await getTriggerElement().getAttribute('data-invalid')) === 'true';
  const getIsViewMode = async () => (await getTriggerElement().getAttribute('data-view-mode')) === 'true';

  const getIsMenuOpen = async () => {
    if (await getIsMobileEditView()) {
      return (await getTriggerInputElement().getAttribute('aria-expanded')) === 'true';
    }
    return (
      (await getTriggerInputElement().getAttribute('aria-expanded')) === 'true' && (await getMenuElement().count()) > 0
    );
  };

  const getValue = async () => {
    const triggerValueLocator = getTriggerValueElement().getByTestId(`${dataTestId}-trigger-value-label`);
    if (await triggerValueLocator.isVisible()) {
      return (await triggerValueLocator.textContent()) ?? '';
    }

    return '';
  };

  const getInputValue = async () => {
    const mobileInputLocator = getMobileEditModeTriggerInputElement();
    if (await mobileInputLocator.isVisible()) {
      return await mobileInputLocator.inputValue();
    }

    const triggerInputLocator = getTriggerInputElement();
    if (await triggerInputLocator.isVisible()) {
      return await triggerInputLocator.evaluate((element) =>
        element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement ? element.value : ''
      );
    }

    return '';
  };

  const getPlaceholder = async () => {
    const placeholderLocator = getTriggerValueElement().getByTestId(`${dataTestId}-trigger-value-placeholder`);
    if (await placeholderLocator.isVisible()) {
      return await placeholderLocator.textContent();
    }
    return '';
  };

  const clickTrigger = async () => await getTriggerInputElement().click();

  const type = async (text: string) => {
    if (await getIsMobileEditView()) {
      await getMobileEditModeTriggerInputElement().fill(text);
    } else {
      await getTriggerInputElement().fill(text);
    }
  };

  const clear = async () => {
    if (await getIsMobileEditView()) {
      await getMobileEditModeTriggerInputElement().clear();
    } else {
      await getTriggerInputElement().clear();
    }
  };

  const clickClearButton = async () => {
    if (await getIsMobileEditView()) {
      await page.getByTestId(`${dataTestId}-mobile-edit-mode-trigger-container-clear-button`).click();
    } else {
      await page.getByTestId(`${dataTestId}-clear-button`).click();
    }
  };

  const clickOptionByText = async (text: string) => await getMenuElement().getByRole('option', { name: text }).click();

  const clickOptionByIndex = async (index: number) => {
    const options = getMenuElement().getByRole('option');
    await options.nth(index).click();
  };

  const clickOptionByTestId = async (optionTestId: string) =>
    await page.getByTestId(`${dataTestId}-option-${optionTestId}`).click();

  const clickOutside = async () => await page.locator('body').click({ position: { x: 0, y: 0 } });

  return {
    dataTestId,
    getElement,
    getIsDisabled,
    getIsReadOnly,
    getIsRequired,
    getIsInvalid,
    getIsViewMode,
    getIsMenuOpen,
    getValue,
    getInputValue,
    getPlaceholder,
    clickTrigger,
    type,
    clear,
    clickOutside,
    clickClearButton,
    clickOptionByText,
    clickOptionByIndex,
    clickOptionByTestId,
  };
}
