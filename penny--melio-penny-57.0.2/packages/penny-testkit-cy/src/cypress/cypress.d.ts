import type { getByTestId } from './support/commands';

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId: typeof getByTestId;
    }
  }
}
