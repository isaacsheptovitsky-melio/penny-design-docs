import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { getButtonCommands } from '../Button/buttonCommands';
import type { ButtonTestKitTagType } from '../Button/types';

export function createIconButtonTestKit<T extends ButtonTestKitTagType = HTMLButtonElement>({
  dataTestId = DEFAULT_DATA_TEST_ID.ICON_BUTTON,
}: TestKitProps = {}) {
  const buttonCommands = getButtonCommands(dataTestId);
  const getElement = buttonCommands.getElement<T>;

  return {
    ...buttonCommands,
    dataTestId,
    getElement,
  };
}
