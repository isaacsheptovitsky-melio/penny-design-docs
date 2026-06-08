import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { getCyButtonCommands } from '../Button/cyButtonCommands';
import type { CyButtonTestKitTagType } from '../Button/types';

export function createCyIconButtonTestKit<T extends CyButtonTestKitTagType = 'button'>({
  dataTestId = DEFAULT_DATA_TEST_ID.ICON_BUTTON,
}: TestKitProps = {}) {
  const cyCommands = getCyButtonCommands(dataTestId);
  const getElement = cyCommands.getElement<T>;

  return {
    ...cyCommands,
    dataTestId,
    getElement,
  };
}
