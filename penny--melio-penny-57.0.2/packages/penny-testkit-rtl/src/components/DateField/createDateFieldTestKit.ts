import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { createIconButtonTestKit } from '../IconButton/createIconButtonTestKit';
import { createTextFieldTestKit } from '../TextField/createTextFieldTestKit';

export function createDateFieldTestKit({ dataTestId = DEFAULT_DATA_TEST_ID.DATE_FIELD }: TestKitProps = {}) {
  const getElement = () => screen.getByTestId(dataTestId);
  const getCalendarElement = () => screen.getByTestId(`${dataTestId}-calendar`);
  const getDayElement = (day: number) => within(getCalendarElement()).getByTestId(`${dataTestId}-calendar-day-${day}`);

  const getClearButtonTestKit = () => createIconButtonTestKit({ dataTestId: `${dataTestId}-toggle-clear` });
  const getCalendarButtonTestKit = () => createIconButtonTestKit({ dataTestId: `${dataTestId}-toggle` });
  const getPreviousMonthButtonTestKit = () =>
    createIconButtonTestKit({ dataTestId: `${dataTestId}-calendar-header-previous-month-button` });
  const getNextMonthButtonTestKit = () =>
    createIconButtonTestKit({ dataTestId: `${dataTestId}-calendar-header-next-month-button` });

  const textFieldTestKit = createTextFieldTestKit({ dataTestId });

  const getIsRequired = () =>
    (getElement().getAttribute('aria-required') === 'true' || textFieldTestKit.getIsRequired()) ?? false;
  const getIsDisabled = () =>
    (getElement().getAttribute('aria-disabled') === 'true' || textFieldTestKit.getIsDisabled()) ?? false;
  const getIsInvalid = () =>
    (getElement().getAttribute('aria-invalid') === 'true' || textFieldTestKit.getIsInvalid()) ?? false;
  const getIsReadOnly = () =>
    (getElement().getAttribute('aria-readonly') === 'true' || textFieldTestKit.getIsReadOnly()) ?? false;
  const getIsLoading = () =>
    (getElement().getAttribute('data-loading') === 'true' || textFieldTestKit.getIsLoading()) ?? false;

  const getIsNonTypable = () => {
    const element = getElement();
    return element?.tagName !== 'INPUT';
  };

  const getValue = () => {
    if (getIsNonTypable()) {
      const valueElement = within(getElement()).queryByTestId(`${dataTestId}-value`);
      if (!valueElement) {
        return '';
      }
      return valueElement.textContent;
    }
    return textFieldTestKit.getValue();
  };

  const getPlaceholder = () => {
    if (getIsNonTypable()) {
      const placeholderElement = within(getElement()).queryByTestId(`${dataTestId}-placeholder`);
      if (!placeholderElement) {
        return '';
      }
      return placeholderElement.textContent;
    }
    return textFieldTestKit.getPlaceholder();
  };

  const click = async () => {
    const element = getElement();
    await userEvent.click(element);
  };

  const type = async (text: string) => {
    if (getIsNonTypable()) {
      throw new Error('type() is only supported on editable elements.');
    }
    return await textFieldTestKit.type(text);
  };

  const clickClearButton = async () => {
    await getClearButtonTestKit().click();
  };

  const clickCalendarButton = async () => {
    await getCalendarButtonTestKit().click();
  };

  const isCalendarOpen = () => {
    return screen.queryByTestId(`${dataTestId}-calendar`) !== null;
  };

  const clickOutside = async () => {
    await userEvent.click(document.body);
  };

  const selectDay = async (day: number) => {
    const dayElement = getDayElement(day);
    await userEvent.click(dayElement);
  };

  const isDaySelected = (day: number) => {
    const dayElement = getDayElement(day);
    return dayElement.getAttribute('aria-selected') === 'true';
  };

  const isDayDisabled = (day: number) => {
    const dayElement = getDayElement(day);
    return dayElement.getAttribute('aria-disabled') === 'true';
  };

  const clickPreviousMonth = async () => {
    await getPreviousMonthButtonTestKit().click();
  };

  const clickNextMonth = async () => {
    await getNextMonthButtonTestKit().click();
  };

  const isPreviousMonthDisabled = () => {
    return getPreviousMonthButtonTestKit().getDisabled();
  };

  const isNextMonthDisabled = () => {
    return getNextMonthButtonTestKit().getDisabled();
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
