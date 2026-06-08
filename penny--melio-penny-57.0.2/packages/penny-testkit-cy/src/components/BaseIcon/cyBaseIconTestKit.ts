import { DEFAULT_DATA_TEST_ID } from '../../constants/defaultDataTestIds';
import type { AriaAttributes, TestKitProps } from '../../testkit.types';

export function createCyBaseIconTestKit({ dataTestId = DEFAULT_DATA_TEST_ID.BASE_ICON }: TestKitProps = {}) {
  const getElement = () => cy.getByTestId(dataTestId);

  return {
    dataTestId,
    getElement,
    getVisible: () => getElement().invoke('is', ':visible'),
    getActive: () =>
      getElement()
        .invoke('attr', 'data-active')
        .then((active: string | undefined) => active === 'true'),
    getDisabled: () =>
      getElement()
        .invoke('attr', 'data-disabled')
        .then((disabled: string | undefined) => disabled === 'true'),
    getReadOnly: () =>
      getElement()
        .invoke('attr', 'data-readonly')
        .then((readonly: string | undefined) => readonly === 'true'),
    getIsBrandColor: () =>
      getElement()
        .invoke('attr', 'data-is-brand-color')
        .then((isBrandColor: string | undefined) => isBrandColor === 'true'),
    getAriaAttribute: (attribute: AriaAttributes): Cypress.Chainable<string | undefined> =>
      getElement()
        .invoke('attr', attribute)
        .then((attr: string | undefined) => attr),
    getDataAttribute: (attribute: string): Cypress.Chainable<string | undefined> =>
      getElement()
        .invoke('attr', attribute)
        .then((attr: string | undefined) => attr),
    getRole: (): Cypress.Chainable<string | undefined> =>
      getElement()
        .invoke('attr', 'role')
        .then((attr: string | undefined) => attr),
  };
}
