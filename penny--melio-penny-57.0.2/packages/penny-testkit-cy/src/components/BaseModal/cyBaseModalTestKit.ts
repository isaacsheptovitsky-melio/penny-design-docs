import { themeBreakpoints } from '../../constants/breakpoints';
import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import { KEYBOARD_KEY } from '../../constants/keyboardsKeys';
import type { AriaAttributes, TestKitProps } from '../../testkit.types';
import { createCyIconButtonTestKit } from '../IconButton/cyIconButtonTestKit';

export function createCyBaseModalTestKit({ dataTestId = DEFAULT_DATA_TEST_ID.BASE_MODAL }: TestKitProps = {}) {
  const isMobile = Cypress.config('viewportWidth') < Number(themeBreakpoints.s.slice(0, -2));

  const getElement = () => cy.getByTestId(dataTestId);
  const getOverlay = () => (isMobile ? cy.getByTestId('base-sheet-overlay') : getElement().parent());

  const closeButtonDataTestId = isMobile ? 'sheet-close-button' : 'modal-close-button';

  return {
    dataTestId,
    getElement,
    getVisible: () => getElement().invoke('is', ':visible'),
    getIsLoading: () => getElement().find('[data-testid="loading-container"]').invoke('is', ':visible'),
    getRole: (): Cypress.Chainable<string | undefined> =>
      getElement()
        .invoke('attr', 'role')
        .then((attr: string | undefined) => attr),
    getAriaAttribute: (attribute: AriaAttributes): Cypress.Chainable<string | undefined> =>
      getElement()
        .invoke('attr', attribute)
        .then((attr: string | undefined) => attr),
    clickOverlay: () => getOverlay().click(),
    pressEscape: () => getElement().type(KEYBOARD_KEY.ESCAPE),
    closeButton: createCyIconButtonTestKit({
      dataTestId: closeButtonDataTestId,
    }),
  };
}
