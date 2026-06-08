import type { AriaAttributes } from '../../testkit.types';
import type { CyButtonTestKitTagType } from './types';

export function getCyButtonCommands(dataTestId: string) {
  const getElement = <T extends CyButtonTestKitTagType = 'button'>() => cy.getByTestId<T>(dataTestId);

  return {
    getElement,
    click: () => getElement().click(),
    getDisabled: () =>
      getElement()
        .invoke('attr', 'disabled')
        .then((disabled: string | undefined) => disabled === 'disabled'),
    getAriaAttribute: (attribute: AriaAttributes): Cypress.Chainable<string | undefined> =>
      getElement()
        .invoke('attr', attribute)
        .then((attr: string | undefined) => attr),
    getIsLink: () =>
      getElement()
        .invoke('prop', 'tagName')
        .then((tag: string) => tag === 'A'),
    getHref: (): Cypress.Chainable<string | undefined> =>
      getElement<'a'>()
        .invoke('attr', 'href')
        .then((attr: string | undefined) => attr),
  };
}
