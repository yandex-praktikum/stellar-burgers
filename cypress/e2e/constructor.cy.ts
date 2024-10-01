const ingredient = '[data-cy="ingredient-link-item"]';
const modal = '[data-cy="modal"]';
const modalOverlay = '[data-cy="modal-overlay"';
const constructor = '[data-cy="constructor"]';

describe('burger constructor, create order', () => {
  beforeEach(() => {
    cy.intercept('GET', `api/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', `api/auth/user`, { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', `api/orders`, { fixture: 'order.json' }).as(
      'createOrder'
    );

    window.localStorage.setItem('refreshToken', JSON.stringify('123456'));
    cy.setCookie('accessToken', JSON.stringify('654321'));

    cy.visit('');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearCookie('refreshToken');
    cy.clearCookie('accessToken');
  });

  describe('constructor', () => {
    it('get ingredients', () => {
      cy.get(ingredient).first().next().click();
      cy.get(constructor).as('constructor');
      cy.get('@constructor').should('contain', 'Краторная булка N-200i');
    });

    it('open and close ingredient modal', () => {
      cy.get(ingredient).first().click();
      cy.get(modal).as('modal');
      cy.get('@modal').should('exist');
      cy.get('[data-cy="close-button"]').click();
      cy.get('@modal').should('not.exist');
    });

    it('open and close ingredient modal by overlay', () => {
      cy.get(ingredient).first().click();
      cy.get(modal).as('modal');
      cy.get('@modal').should('exist');
      cy.get(modalOverlay).click('top', { force: true });
      cy.get('@modal').should('not.exist');
    });

    it('create order', () => {
      cy.get(constructor).as('constructor');
      cy.get(ingredient).first().next().click();
      cy.get(ingredient).eq(2).next().click();
      cy.get('[data-cy="getOrder-button"]').click();
      cy.wait('@createOrder');
      cy.get(modal).as('modal');
      cy.get('@modal').should('exist');
      cy.get('@modal').should('contain', '555');

      cy.get('@modal').should('exist');
      cy.get(modalOverlay).click('top', { force: true });
      cy.get('@modal').should('not.exist');

      cy.get('@constructor').should('contain', '');
    });
  });
});
