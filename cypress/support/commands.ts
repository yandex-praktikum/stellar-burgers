/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to set auth tokens
       * @example cy.setAuthTokens()
       */
      setAuthTokens(): Chainable<void>;

      /**
       * Custom command to get ingredient by name
       * @example cy.getIngredientByName('Краторная булка N-200i')
       */
      getIngredientByName(name: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

// Set authentication tokens
Cypress.Commands.add('setAuthTokens', () => {
  // Set cookie and localStorage first
  cy.setCookie('accessToken', 'Bearer mock-access-token');
  cy.window().then((win) => {
    win.localStorage.setItem('refreshToken', 'mock-refresh-token');
  });
});

// Get ingredient by name
Cypress.Commands.add('getIngredientByName', (name: string) => {
  return cy.contains(name).parent();
});

export {};
