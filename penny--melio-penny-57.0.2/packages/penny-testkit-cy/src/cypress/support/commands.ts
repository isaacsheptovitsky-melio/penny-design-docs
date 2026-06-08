export const getByTestId = <Key extends keyof HTMLElementTagNameMap>(
  selector: string,
  options?: Parameters<typeof cy.get>[1]
) => cy.get<Key>(`[data-testid="${selector}"]`, options);

Cypress.Commands.add('getByTestId', getByTestId);
