const testUrl = 'http://localhost:4000';

const SELECTORS = {
  BUN_INGREDIENTS: '[data-cy=bun-ingredients]',
  MAINS_INGREDIENTS: '[data-cy=mains-ingredients]',
  SAUCES_INGREDIENTS: '[data-cy=sauces-ingredients]',
  CONSTRUCTOR_BUN_1: '[data-cy=constructor-bun-1]',
  CONSTRUCTOR_BUN_2: '[data-cy=constructor-bun-2]',
  CONSTRUCTOR_INGREDIENTS: '[data-cy=constructor-ingredients]',
  CREATE_ORDER: '[data-cy=create-order]',
  MODAL: '#modal',
  MODAL_OVERLAY: '[data-cy=modal-overlay]',
  MODAL_CLOSE_BUTTON: '#modal button[aria-label="Закрыть"]'
};

describe('Булки и ингредиенты добавляются в конструктор', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.viewport(1300, 800);
    cy.visit(testUrl);
  });

  it('Булка добавляется', function () {
    cy.get(SELECTORS.BUN_INGREDIENTS).contains('Добавить').click();
    cy.get(SELECTORS.CONSTRUCTOR_BUN_1).contains('Булка').should('exist');
    cy.get(SELECTORS.CONSTRUCTOR_BUN_2).contains('Булка').should('exist');
  });

  it('Ингредиенты добавляются', function () {
    cy.get(SELECTORS.MAINS_INGREDIENTS).contains('Добавить').click();
    cy.get(SELECTORS.SAUCES_INGREDIENTS).contains('Добавить').click();
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENTS)
      .contains('Котлета')
      .should('exist');
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENTS).contains('Соус').should('exist');
  });
});

describe('Модальное окно ингредиента работает правильно', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.viewport(1300, 800);
    cy.visit(testUrl);
  });

  it('Модальное окно открывается', function () {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Булка').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get(SELECTORS.MODAL).contains('Булка').should('exist');
  });

  it('Модальное окно закрывается по нажатию на крестик', function () {
    cy.contains('Булка').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get(SELECTORS.MODAL_CLOSE_BUTTON).click();
    cy.get(SELECTORS.MODAL).should('not.exist');
  });

  it('Модальное окно закрывается по нажатию на оверлей', function () {
    cy.contains('Булка').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get(SELECTORS.MODAL_OVERLAY).click('left', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Процесс оформления заказа работает правильно', function () {
  beforeEach(function () {
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    });
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.intercept('POST', 'api/orders', {
      fixture: 'newOrder.json'
    });
    cy.viewport(1300, 800);
    cy.visit(testUrl);
  });

  it('Заказ оформляется', function () {
    cy.get(SELECTORS.BUN_INGREDIENTS).contains('Добавить').click();
    cy.get(SELECTORS.CONSTRUCTOR_BUN_1).contains('Булка').should('exist');
    cy.get(SELECTORS.CONSTRUCTOR_BUN_2).contains('Булка').should('exist');
    cy.get(SELECTORS.MAINS_INGREDIENTS).contains('Добавить').click();
    cy.get(SELECTORS.SAUCES_INGREDIENTS).contains('Добавить').click();
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENTS)
      .contains('Котлета')
      .should('exist');
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENTS).contains('Соус').should('exist');
    cy.get(SELECTORS.CREATE_ORDER).contains('Оформить заказ').click();
    cy.get(SELECTORS.MODAL).contains('1234').should('exist');
    cy.get(SELECTORS.MODAL_CLOSE_BUTTON).click();
    cy.get(SELECTORS.MODAL).should('not.exist');

    cy.get(SELECTORS.CONSTRUCTOR_BUN_1).should('not.exist');
    cy.get(SELECTORS.CONSTRUCTOR_BUN_2).should('not.exist');
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENTS)
      .contains('Котлета')
      .should('not.exist');
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENTS)
      .contains('Соус')
      .should('not.exist');
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
