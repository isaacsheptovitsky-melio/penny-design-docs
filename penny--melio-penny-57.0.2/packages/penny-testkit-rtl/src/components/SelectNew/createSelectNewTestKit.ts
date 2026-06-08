import { screen, within } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';

import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { createIconButtonTestKit } from '../IconButton/createIconButtonTestKit';

export function createSelectNewTestKit({ dataTestId = DEFAULT_DATA_TEST_ID.SELECT }: TestKitProps = {}) {
  const getElement = () => screen.getByTestId(dataTestId);

  const clickTrigger = async () => userEvent.click(screen.getByTestId(`${dataTestId}-trigger-input`));

  const clickOptionByText = async (text: string) =>
    await userEvent.click(screen.getByRole<HTMLLIElement>('option', { name: text }));

  const clickOptionByTestId = async (testId: string) =>
    await userEvent.click(screen.getByTestId<HTMLLIElement>(`${dataTestId}-option-${testId}`));

  const clickOptionByIndex = async (index: number) => {
    const option = within(screen.getByTestId<HTMLUListElement>(`${dataTestId}-content`)).getAllByRole<HTMLLIElement>(
      'option'
    )[index];

    if (option) {
      await userEvent.click(option);
    }
  };

  const typeSearch = async (text: string) => {
    await userEvent.type(screen.getByTestId(`${dataTestId}-search-bar-input`), text);
  };

  const clickSearchButton = async () => {
    const searchIconButtonTestKit = createIconButtonTestKit({
      dataTestId: `${dataTestId}-search-bar-search-button`,
    });
    await searchIconButtonTestKit.click();
  };

  const clickClearButton = async () => {
    const clearIconButtonTestKit = createIconButtonTestKit({
      dataTestId: `${dataTestId}-clear-button`,
    });
    await clearIconButtonTestKit.click();
  };

  const clickClearSearch = async () => {
    const clearIconButtonTestKit = createIconButtonTestKit({
      dataTestId: `${dataTestId}-search-bar-clear-button`,
    });
    await clearIconButtonTestKit.click();
  };

  const clickOutside = async () => await userEvent.click(document.body);
  const pressEsc = async () => await userEvent.keyboard('[Escape]');

  const getIsDisabled = () =>
    screen.getByTestId(`${dataTestId}-trigger-input`).getAttribute('aria-disabled') === 'true';

  const getIsReadOnly = () =>
    screen.getByTestId(`${dataTestId}-trigger-input`).getAttribute('aria-readonly') === 'true';

  const getIsRequired = () =>
    screen.getByTestId(`${dataTestId}-trigger-input`).getAttribute('aria-required') === 'true';

  const getIsInvalid = () => screen.getByTestId(`${dataTestId}-trigger`).getAttribute('data-invalid') === 'true';

  const getIsViewMode = () => screen.getByTestId(`${dataTestId}-trigger`).getAttribute('data-view-mode') === 'true';

  const getValue = () => {
    const isViewMode = getIsViewMode();
    if (isViewMode) {
      return screen.getByTestId(`${dataTestId}-trigger`).getAttribute('data-value');
    }
    return screen.getByTestId(`${dataTestId}-trigger-value`).getAttribute('data-value');
  };

  const getValueLabel = () => {
    const isViewMode = getIsViewMode();
    const triggerTestId = isViewMode ? `${dataTestId}-trigger` : `${dataTestId}-trigger-value`;
    return within(screen.getByTestId(triggerTestId)).getByTestId('text').textContent;
  };

  const getIsMenuOpen = () =>
    screen.getByTestId(`${dataTestId}-trigger-input`).getAttribute('aria-expanded') === 'true' &&
    screen.queryByTestId(`${dataTestId}-content`) !== null;

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
