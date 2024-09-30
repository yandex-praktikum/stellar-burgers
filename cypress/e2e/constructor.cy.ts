// import { URL } from '../../src/utils/burger-api';
// const firstBun = '[data-cy="ingredient-link-643d69a5c3f7b9001cfa093c"]';
const firstBun = '[data-cy="ingredient-link-item"] button[type=button]';
const firstFilling = '[data-cy="ingredient-link-643d69a5c3f7b9001cfa0941"]';

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

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearCookie('refreshToken');
    cy.clearCookie('accessToken');
  });

  describe('constructor', () => {
    it('get ingredients', () => {
      // cy.getCookie('accessToken').should('exist');
      cy.get('[data-cy="ingredient-link-item"]')
        .should('exist')
        .and('be.visible');
      cy.get('[data-cy="constructor"]').as('constructor');
      cy.get(firstBun).should('exist');
      // Кликнуть по кнопке "Добавить" первого ингредиента
      cy.get(firstBun).click();

      cy.get('@constructor').should('contain', 'Краторная булка N-200i');
    });

    it('open and close ingredient modal', () => {
      cy.get(firstBun).click();
      cy.get('[data-cy="modal"]').as('modal');
      cy.get('@modal').should('exist');
      cy.get('[data-cy="close-button"]').click();
      cy.get('@modal').should('not.exist');
    });

    it('open and close ingredient modal by overlay', () => {
      cy.get(firstBun).click();
      cy.get('[data-cy="modal"]').as('modal');
      cy.get('@modal').should('exist');
      cy.get('[data-cy="modal-overlay"').click('top', { force: true });
      cy.get('@modal').should('not.exist');
    });
  });

  describe('order', () => {
    it('create order', () => {
      // cy.getCookie('accessToken').should('exist');
      cy.get('[data-cy="constructor"]').as('constructor');
      cy.get(firstBun).next('button').click();
      cy.get(firstFilling).next('button').click();
      cy.get('[data-cy="getOrder-button"]').click();
      cy.wait('@createOrder');
      cy.get('[data-cy="modal"]').as('modal');
      cy.get('@modal').should('exist');
      cy.get('@modal').should('contain', '555');
    });
  });
});
