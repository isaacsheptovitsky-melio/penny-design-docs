import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { getButtonCommands } from './buttonCommands';
import type { ButtonTestKitTagType } from './types';

export function createButtonTestKit<T extends ButtonTestKitTagType = HTMLButtonElement>({
  dataTestId = DEFAULT_DATA_TEST_ID.BUTTON,
}: TestKitProps = {}) {
  const buttonCommands = getButtonCommands(dataTestId);
  const getElement = buttonCommands.getElement<T>;

  return {
    dataTestId,
    ...buttonCommands,
    getElement,
    getIsLoading: () => getElement().getAttribute('data-loading') === 'true',
    getLabelText: () => getElement().textContent,
  };
}
