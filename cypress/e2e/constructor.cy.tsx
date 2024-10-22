/// <reference types="cypress" />
const selectorIngredientsModule = '[data-cy="ingredients-module"]';
const selectorConstructorModule = '[data-cy="constructor-module"]';
const selectorModal = '[data-cy="modal"]';
const selectorButtonCloseModal = '[data-cy="modal-close"]';
const selectorOverlayModal = '[data-cy="modalOverlay"]';
const ingredientBun = 'Флюоресцентная булка R2-D3';

describe('Тесты для конструктора бургера без перетаскивания', () => {
  beforeEach(() => {
    cy.fixture('ingredients.json').as('ingredientsData');
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.fixture('post_order.json').as('orderData');
    cy.intercept('POST', '/api/orders', { fixture: 'post_order.json' }).as(
      'postOrder'
    );

    localStorage.setItem('refreshToken', 'fake-refresh-token');
    cy.setCookie('accessToken', 'fake-access-token');
    cy.visit('/');
  });

  afterEach(() => {
    localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('Добавление ингредиента в конструктор через кнопку', () => {
    cy.wait('@getIngredients');

    cy.get(selectorIngredientsModule)
      .contains(ingredientBun)
      .parent()
      .find('button')
      .click();

    cy.get(selectorConstructorModule).should(
      'contain.text',
      ingredientBun
    );

    cy.get(selectorIngredientsModule)
      .contains('Хрустящие минеральные кольца')
      .parent()
      .find('button')
      .click();

    cy.get(selectorConstructorModule).should(
      'contain.text',
      'Хрустящие минеральные кольца'
    );
  });

  it('Открытие и закрытие модального окна ингредиента', () => {
    cy.wait('@getIngredients');

    cy.contains(ingredientBun).click();
    cy.get(selectorModal).should('be.visible');

    cy.get(selectorButtonCloseModal).click();
    cy.get(selectorModal).should('not.exist');

    cy.contains(ingredientBun).click();
    cy.get(selectorModal).should('exist');
    cy.get(selectorOverlayModal).click({ force: true });
    cy.get(selectorModal).should('not.exist');
  });

  it('Оформление заказа', () => {
    cy.intercept('POST', '/api/auth/login', { fixture: 'login.json' }).as(
      'login'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('user');

    cy.wait('@getIngredients');

    cy.get(selectorIngredientsModule)
      .contains(ingredientBun)
      .parent()
      .find('button')
      .click({ force: true });
    cy.get(selectorIngredientsModule)
      .contains('Хрустящие минеральные кольца')
      .parent()
      .find('button')
      .click({ force: true });

    cy.get(selectorConstructorModule)
      .children()
      .last()
      .find('button')
      .click({ force: true });

    cy.wait('@postOrder').its('response.statusCode').should('eq', 200);

    cy.get(selectorModal).should('exist');
    cy.get(selectorModal).should('contain', '12345');

    cy.get(selectorButtonCloseModal).click();
    cy.get(selectorModal).should('not.exist');

    cy.get(selectorConstructorModule)
      .children()
      .first()
      .should('contain.text', 'Выберите булки');
    cy.get(selectorConstructorModule)
      .children()
      .first()
      .next()
      .should('contain.text', 'Выберите начинку');
  });
});
