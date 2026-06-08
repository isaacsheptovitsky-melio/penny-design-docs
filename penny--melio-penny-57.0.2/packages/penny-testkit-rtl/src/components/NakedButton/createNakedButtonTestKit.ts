import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { getButtonCommands } from '../Button/buttonCommands';

export function createNakedButtonTestKit({ dataTestId = DEFAULT_DATA_TEST_ID.NAKED_BUTTON }: TestKitProps = {}) {
  const buttonCommands = getButtonCommands(dataTestId);
  const getElement = buttonCommands.getElement;

  return {
    ...buttonCommands,
    dataTestId,
    getLabelText: () => getElement().textContent,
  };
}
