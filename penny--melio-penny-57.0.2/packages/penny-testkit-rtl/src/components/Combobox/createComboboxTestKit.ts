import { screen, within } from '@testing-library/dom';
import type { Options } from '@testing-library/user-event';
import { userEvent } from '@testing-library/user-event';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

export function createComboboxTestKit({ dataTestId = DEFAULT_DATA_TEST_ID.COMBOBOX }: TestKitProps = {}) {
  const getElement = () => screen.getByTestId(dataTestId);
  const getMenuElement = () => screen.getByTestId(`${dataTestId}-menu`);
  const getTriggerElement = () => screen.getByTestId(`${dataTestId}-trigger`);
  const getTriggerInputElement = () => screen.getByTestId<HTMLInputElement>(`${dataTestId}-trigger-input`);
  const getTriggerValueElement = () => screen.getByTestId(`${dataTestId}-trigger-value`);
  const getMobileEditModeTriggerInputElement = () =>
    screen.getByTestId<HTMLInputElement>(`${dataTestId}-mobile-edit-mode-trigger-container-trigger-input`);

  const getIsMobileEditView = () => Boolean(screen.queryByTestId(`${dataTestId}-mobile-edit-mode`));

  const getIsDisabled = () => getTriggerElement().getAttribute('data-disabled') === 'true';
  const getIsReadOnly = () => getTriggerInputElement().getAttribute('readonly') !== null;
  const getIsRequired = () => getTriggerInputElement().getAttribute('required') !== null;
  const getIsInvalid = () => getTriggerElement().getAttribute('data-invalid') === 'true';
  const getIsViewMode = () => getTriggerElement().getAttribute('data-view-mode') === 'true';

  const getIsMenuOpen = () => {
    if (getIsMobileEditView()) {
      return Boolean(getTriggerInputElement().ariaExpanded);
    }
    return Boolean(getTriggerInputElement().ariaExpanded) && screen.queryByTestId(`${dataTestId}-menu`) !== null;
  };

  const getValue = () => {
    const triggerValueElement = within(getTriggerValueElement()).queryByTestId(`${dataTestId}-trigger-value-label`);
    return triggerValueElement?.textContent ?? '';
  };

  const getInputValue = () => {
    const mobileInputElement = getMobileEditModeTriggerInputElement();
    if (mobileInputElement) {
      return mobileInputElement.value || '';
    }

    const triggerInputElement = screen.queryByTestId<HTMLInputElement>(`${dataTestId}-trigger-input`);
    if (triggerInputElement) {
      return triggerInputElement.value || '';
    }

    return '';
  };

  const getPlaceholder = () => {
    const placeholder = within(getTriggerValueElement()).queryByTestId(`${dataTestId}-trigger-value-placeholder`);
    if (placeholder) {
      return placeholder.textContent;
    }
    return '';
  };

  const clickTrigger = async (options?: Options) => await userEvent.click(getTriggerInputElement(), options);

  const type = async (text: string, options?: Options) => {
    if (getIsMobileEditView()) {
      await userEvent.type(getMobileEditModeTriggerInputElement(), text, options);
    } else {
      await userEvent.type(getTriggerInputElement(), text, options);
    }
  };

  const clear = async () => {
    if (getIsMobileEditView()) {
      await userEvent.clear(getMobileEditModeTriggerInputElement());
    } else {
      await userEvent.clear(getTriggerInputElement());
    }
  };

  const clickClearButton = async (options?: Options) => {
    if (getIsMobileEditView()) {
      await userEvent.click(
        screen.getByTestId(`${dataTestId}-mobile-edit-mode-trigger-container-clear-button`),
        options
      );
    } else {
      await userEvent.click(screen.getByTestId(`${dataTestId}-clear-button`), options);
    }
  };

  const clickOptionByText = async (text: string, options?: Options) => {
    const option = within(getMenuElement()).getByRole('option', { name: text });
    await userEvent.click(option, options);
  };

  const clickOptionByIndex = async (index: number, options?: Options) => {
    const menuOptions = within(getMenuElement()).getAllByRole('option');
    if (menuOptions[index]) {
      await userEvent.click(menuOptions[index], options);
    }
  };

  const clickOptionByTestId = async (optionTestId: string, options?: Options) =>
    await userEvent.click(screen.getByTestId(`${dataTestId}-option-${optionTestId}`), options);

  const clickOutside = async (options?: Options) => await userEvent.click(document.body, options);

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
