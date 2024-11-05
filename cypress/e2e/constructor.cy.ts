import * as orderFixture from '../fixtures/order.json';

const testURL = 'http://localhost:4000';
const dataCyBun = '[data-cy="bun"]';
const dataCyBunFirst = '[data-cy="bun"]:first-of-type';
const dataCyOrder = '[data-cy-order]';
const modals = '#modals';

describe('Тест бургерной', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit(testURL);
  });
  it('test', () => {
    cy.visit(testURL);
  });

  it('Проверка ингридиентов', () => {
    cy.get(dataCyBun).should('have.length.at.least', 1);
    cy.get('[data-cy="main"], [dara-cy="souce"]').should(
      'have.length.at.least',
      1
    );
  });

  describe('Тест модальных окон', () => {
    describe('Открытие модального окна', () => {
      it('Открытие карточки ингредиента', () => {
        cy.get(dataCyBunFirst).click();
        cy.get(modals).children().should('have.length', 2);
      });

      it('Открытие модального окна после перезагрузки', () => {
        cy.get(dataCyBunFirst).click();
        cy.reload(true);
        cy.get(modals).children().should('have.length', 2);
      });
    });

    describe('Тест закрытия модального окна', () => {
      it('Нажимаем крест', () => {
        cy.get(dataCyBunFirst).click();
        cy.get(`${modals} button:first-of-type`).click();
        cy.wait(1000);
        cy.get(modals).children().should('have.length', 0);
      });

      it('Нажимаем оверлэй', () => {
        cy.get(dataCyBunFirst).click();
        cy.get(`${modals}>div:nth-of-type(2)`).click({ force: true });
        cy.wait(1000);
        cy.get(modals).children().should('have.length', 0);
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
      cy.visit(testURL);
    });

    it('Оформление', () => {
      cy.get(dataCyOrder).should('be.disabled');
      cy.get(`${dataCyBunFirst} button`).click();
      cy.get(dataCyOrder).should('be.disabled');
      cy.get('[data-cy="main"]:first-of-type button').click();
      cy.get(dataCyOrder).should('be.enabled');
      cy.get(dataCyOrder).click();
      cy.get(modals).children().should('have.length', 2);
      cy.get(`${modals} h2:first-of-type`).should(
        'have.text',
        orderFixture.order.number
      );
      cy.get(dataCyOrder).should('be.disabled');
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});
