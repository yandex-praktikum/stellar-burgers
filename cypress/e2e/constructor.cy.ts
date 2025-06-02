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
    cy.get('[data-cy="main"], [data-cy="sauce"]').should(
      'have.length.at.least',
      1
    );
  });


  describe('Тест добавление ингредиентов в конструктор', () => {
    it('Проверка совпадения названий ингредиентов после добавления', () => {
      cy.get('[data-cy="bun"]:first-of-type')
        .find('p.text_type_main-default')
        .invoke('text')
        .then((bunName) => {
          cy.get('[data-cy="bun"]:first-of-type button').click();

          cy.get('div.constructor-element_pos_top')
            .find('.constructor-element__text')
            .should('contain.text', bunName.trim());
        });

      // Начинка (первый элемент с классом constructor-element__row)
      cy.get('[data-cy="main"]:first-of-type')
        .find('p.text_type_main-default')
        .invoke('text')
        .then((mainName) => {
          cy.get('[data-cy="main"]:first-of-type button').click();

          // Проверяем, что в списке конструктора первый .constructor-element__row содержит добавленную начинку
          cy.get('span.constructor-element__row')
            .eq(1)
            .find('.constructor-element__text')
            .should('contain.text', mainName.trim());
        });

      // Соус (второй элемент с классом constructor-element__row)
      cy.get('[data-cy="sauce"]:first-of-type')
        .find('p.text_type_main-default')
        .invoke('text')
        .then((sauceName) => {
          cy.get('[data-cy="sauce"]:first-of-type button').click();

          
          cy.get('span.constructor-element__row')
            .eq(2)
            .find('.constructor-element__text')
            .should('contain.text', sauceName.trim());
        });
    });
  });


  describe('Тест модальных окон', () => {
    describe('Открытие модального окна', () => {

      it('Соответствие ингредиента', () => {
        cy.get(dataCyBunFirst)
          .find('p.text_type_main-default')
          .first()
          .invoke('text')
          .then((ingredientName) => {
            cy.get(dataCyBunFirst).click();
            cy.get(modals).children().should('have.length', 2);
            cy.get(`${modals} h3`)
              .eq(1)
              .invoke('text')
              .then((modalIngredientName) => {
                expect(modalIngredientName.trim()).to.contain(ingredientName.trim());
              });
          });
      });

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
      cy.get(`${modals} button:first-of-type`).click();
      cy.get(dataCyOrder).children().should('have.length', 0);
      cy.get(dataCyOrder).should('be.disabled');
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});


