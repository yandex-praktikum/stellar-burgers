declare global {
  namespace Cypress {
    interface Chainable {
      clickOutside(): Chainable<JQuery<HTMLElement>>; // Declare your custom command here
    }
  }
}
