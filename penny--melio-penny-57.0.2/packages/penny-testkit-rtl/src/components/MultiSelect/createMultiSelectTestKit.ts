import { screen, within } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';

export function createMultiSelectTestKit({ dataTestId = DEFAULT_DATA_TEST_ID.MULTI_SELECT }: TestKitProps = {}) {
  const getElement = () => screen.getByTestId(dataTestId);
  const getTriggerElement = () => screen.getByTestId(`${dataTestId}-trigger`);
  const getTriggerInputElement = () => within(getElement()).getByTestId(`${dataTestId}-trigger-input`);
  const getTriggerValueElement = () => within(getElement()).getByTestId(`${dataTestId}-trigger-value`);
  const getContentElement = () => screen.getByTestId(`${dataTestId}-content`);
  const getOptionElementByIndex = (index: number) => {
    return within(getContentElement()).getAllByRole('option')[index];
  };

  const getOptionElementByTestId = (testId: string) => screen.getByTestId(`${dataTestId}-option-${testId}`);

  const click = async () => await userEvent.click(getTriggerInputElement());

  const clickOptionByText = async (text: string) => await userEvent.click(screen.getByRole('option', { name: text }));

  const clickOptionByTestId = async (testId: string) => await userEvent.click(getOptionElementByTestId(testId));

  const clickOptionByIndex = async (index: number) => {
    const option = getOptionElementByIndex(index);
    if (option) {
      await userEvent.click(option);
    }
  };

  const clickOutside = async () => await userEvent.click(document.body);

  const getValue = () => {
    if (getIsViewMode()) {
      return getTriggerElement().textContent || '';
    }
    return getTriggerValueElement().getAttribute('data-value') || '';
  };

  const getPlaceholder = () => {
    if (getIsViewMode()) {
      return getTriggerElement().textContent || '';
    }
    return getTriggerValueElement().getAttribute('data-placeholder') || '';
  };

  const getIsDisabled = () => getTriggerInputElement().getAttribute('aria-disabled') === 'true';
  const getIsInvalid = () => getTriggerElement().getAttribute('data-invalid') === 'true';
  const getIsReadOnly = () => getTriggerInputElement().getAttribute('data-readonly') === 'true';
  const getIsRequired = () => getTriggerInputElement().getAttribute('aria-required') === 'true';
  const getIsLoading = () => getTriggerElement().getAttribute('data-loading') === 'true';
  const getIsViewMode = () => getTriggerElement().getAttribute('data-view-mode') === 'true';

  const getIsMenuOpen = () => getTriggerInputElement().getAttribute('aria-expanded') === 'true';

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
