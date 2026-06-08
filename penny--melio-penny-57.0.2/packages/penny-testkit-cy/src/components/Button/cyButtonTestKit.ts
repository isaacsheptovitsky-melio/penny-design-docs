import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { TestKitProps } from '../../testkit.types';
import { getCyButtonCommands } from './cyButtonCommands';
import type { CyButtonTestKitTagType } from './types';

export function createCyButtonTestKit<T extends CyButtonTestKitTagType = 'button'>({
  dataTestId = DEFAULT_DATA_TEST_ID.BUTTON,
}: TestKitProps = {}) {
  const cyCommands = getCyButtonCommands(dataTestId);
  const getElement = cyCommands.getElement<T>;

  return {
    dataTestId,
    ...cyCommands,
    getIsLoading: () =>
      getElement()
        .invoke('attr', 'data-loading')
        .then((loading: string | undefined) => loading === 'true'),
    getLabelText: (): Cypress.Chainable<string> =>
      getElement()
        .invoke('text')
        .then((text: string) => text),
  };
}
