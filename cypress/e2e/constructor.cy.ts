import * as orderFixture from '../fixtures/order.json';

describe('Тест бургерной', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('http://localhost:4000');
  });
  it('test', () => {
    cy.visit('http://localhost:4000');
  });

  it('Проверка ингридиентов', () => {
    cy.get('[data-cy="bun"]').should('have.length.at.least', 1);
    cy.get('[data-cy="main"], [dara-cy="souce"]').should(
      'have.length.at.least',
      1
    );
  });

  describe('Тест модальных окон', () => {
    describe('Открытие модального окна', () => {
      it('Открытие карточки ингредиента', () => {
        cy.get('[data-cy="bun"]:first-of-type').click();
        cy.get('#modals').children().should('have.length', 2);
      });

      it('Открытие модального окна после перезагрузки', () => {
        cy.get('[data-cy="bun"]:first-of-type').click();
        cy.reload(true);
        cy.get('#modals').children().should('have.length', 2);
      });
    });

    describe('Тест закрытия модального окна', () => {
      it('Нажимаем крест', () => {
        cy.get('[data-cy="bun"]:first-of-type').click();
        cy.get('#modals button:first-of-type').click();
        cy.wait(1000);
        cy.get('#modals').children().should('have.length', 0);
      });

      it('Нажимаем оверлэй', () => {
        cy.get('[data-cy="bun"]:first-of-type').click();
        cy.get('#modals>div:nth-of-type(2)').click({ force: true });
        cy.wait(1000);
        cy.get('#modals').children().should('have.length', 0);
      });
    });
  });

  describe('Оформления заказа', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'EXAMPLE_REFRESH_TOKEN');
      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'order' });
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
      cy.visit('http://localhost:4000');
    });

    it('Оформление', () => {
      cy.get('[data-cy-order]').should('be.disabled');
      cy.get('[data-cy="bun"]:first-of-type button').click();
      cy.get('[data-cy-order]').should('be.disabled');
      cy.get('[data-cy="main"]:first-of-type button').click();
      cy.get('[data-cy-order]').should('be.enabled');
      cy.get('[data-cy-order]').click();
      cy.get('#modals').children().should('have.length', 2);
      cy.get('#modals h2:first-of-type').should(
        'have.text',
        orderFixture.order.number
      );
      cy.get('[data-cy-order]').should('be.disabled');
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});
