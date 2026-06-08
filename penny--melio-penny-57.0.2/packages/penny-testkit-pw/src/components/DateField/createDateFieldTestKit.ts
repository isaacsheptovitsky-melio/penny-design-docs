import type { Page } from '@playwright/test';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { createIconButtonTestKit } from '../IconButton/createIconButtonTestKit';
import { createTextFieldTestKit } from '../TextField/createTextFieldTestKit';

export function createDateFieldTestKit(
  page: Page,
  { dataTestId = DEFAULT_DATA_TEST_ID.DATE_FIELD }: TestKitProps = {}
) {
  const getElement = () => page.getByTestId(dataTestId);
  const getCalendarElement = () => page.getByTestId(`${dataTestId}-calendar`);
  const getDayElement = (day: number) => getCalendarElement().getByTestId(`${dataTestId}-calendar-day-${day}`);

  const getClearButtonTestKit = () => createIconButtonTestKit(page, { dataTestId: `${dataTestId}-toggle-clear` });
  const getCalendarButtonTestKit = () => createIconButtonTestKit(page, { dataTestId: `${dataTestId}-toggle` });
  const getPreviousMonthButtonTestKit = () =>
    createIconButtonTestKit(page, { dataTestId: `${dataTestId}-calendar-header-previous-month-button` });
  const getNextMonthButtonTestKit = () =>
    createIconButtonTestKit(page, { dataTestId: `${dataTestId}-calendar-header-next-month-button` });

  const textFieldTestKit = createTextFieldTestKit(page, { dataTestId });

  const getIsRequired = async () =>
    ((await getElement().getAttribute('aria-required')) === 'true' || (await textFieldTestKit.getIsRequired())) ??
    false;
  const getIsDisabled = async () =>
    ((await getElement().getAttribute('aria-disabled')) === 'true' || (await textFieldTestKit.getIsDisabled())) ??
    false;
  const getIsInvalid = async () =>
    ((await getElement().getAttribute('aria-invalid')) === 'true' || (await textFieldTestKit.getIsInvalid())) ?? false;
  const getIsReadOnly = async () =>
    ((await getElement().getAttribute('aria-readonly')) === 'true' || (await textFieldTestKit.getIsReadOnly())) ??
    false;
  const getIsLoading = async () =>
    ((await getElement().getAttribute('data-loading')) === 'true' || (await textFieldTestKit.getIsLoading())) ?? false;

  const getIsNonTypable = async () => {
    const tagName = await getElement().evaluate((el) => el.tagName);
    return tagName !== 'INPUT';
  };

  const getValue = async () => {
    if (await getIsNonTypable()) {
      const valueElement = page.getByTestId(`${dataTestId}-value`);
      if (!(await valueElement.isVisible())) {
        return '';
      }
      return await valueElement.textContent();
    }
    return textFieldTestKit.getValue();
  };

  const getPlaceholder = async () => {
    if (await getIsNonTypable()) {
      const placeholderElement = page.getByTestId(`${dataTestId}-placeholder`);
      if (!(await placeholderElement.isVisible())) {
        return '';
      }
      return await placeholderElement.textContent();
    }
    return await textFieldTestKit.getPlaceholder();
  };

  const click = async () => {
    await getElement().click();
  };

  const type = async (text: string) => {
    if (await getIsNonTypable()) {
      throw new Error('locator.type: Error: Element is not an <input>, <textarea> or [contenteditable] element');
    }
    return await textFieldTestKit.type(text);
  };

  const clickClearButton = async () => {
    await getClearButtonTestKit().click();
  };

  const clickCalendarButton = async () => {
    await getCalendarButtonTestKit().click();
  };

  const isCalendarOpen = async () => {
    const calendar = getCalendarElement();
    return await calendar.isVisible();
  };

  const clickOutside = async () => {
    await page.locator('body').click({ position: { x: 0, y: 0 } });
  };

  const selectDay = async (day: number) => {
    await getDayElement(day).click();
  };

  const isDaySelected = async (day: number) => {
    const dayElement = getDayElement(day);
    return (await dayElement.getAttribute('aria-selected')) === 'true';
  };

  const isDayDisabled = async (day: number) => {
    const dayElement = getDayElement(day);
    return (await dayElement.getAttribute('aria-disabled')) === 'true';
  };

  const clickPreviousMonth = async () => {
    await getPreviousMonthButtonTestKit().click();
  };

  const clickNextMonth = async () => {
    await getNextMonthButtonTestKit().click();
  };

  const isPreviousMonthDisabled = async () => {
    return await getPreviousMonthButtonTestKit().getDisabled();
  };

  const isNextMonthDisabled = async () => {
    return await getNextMonthButtonTestKit().getDisabled();
  };

  return {
    dataTestId,
    getElement,
    click,
    type,
    clear: textFieldTestKit.clear,
    getValue,
    getPlaceholder,
    clickClearButton,
    clickCalendarButton,
    getIsRequired,
    getIsDisabled,
    getIsInvalid,
    getIsReadOnly,
    getIsLoading,
    isCalendarOpen,
    clickOutside,
    selectDay,
    isDaySelected,
    isDayDisabled,
    clickPreviousMonth,
    clickNextMonth,
    isPreviousMonthDisabled,
    isNextMonthDisabled,
  };
}
