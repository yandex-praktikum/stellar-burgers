import * as orderFixture from '../fixtures/order.json';

/// <reference types='cypress' />

const testUrl = Cypress.config('baseUrl');
const ADD_TEXT = 'Добавить';
const BUN_INGREDIENT_TEXT = 'Краторная булка N-200i';
const INGREDIENTS_DETAILS_TEXT = 'Детали ингредиента';
const MODAL_SELECTOR = '[data-cy=modal]';

describe('тест главной страницы сайта', () => {
  beforeEach(() => {
    // Перехват запросов на получение ингредиентов
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.viewport(1300, 800);

    if (testUrl) {
      cy.visit(testUrl);
    } else {
      throw new Error('baseUrl не определен в конфигурации Cypress');
    }
  });

  it('тест добавления булок', () => {
    cy.get('[data-cy=bun-ingredients]').contains(ADD_TEXT).click();
    cy.get('[data-cy=constructor-bun]')
      .contains(BUN_INGREDIENT_TEXT)
      .should('exist');
    cy.get('[data-cy=constructor-bun]')
      .contains(BUN_INGREDIENT_TEXT)
      .should('exist');
  });

  afterEach(() => {
    // очищать после выполнения теста - обязательно
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});

describe('Тестирование модального окна ингредиентов', () => {
  beforeEach(() => {
    // Перехват запросов на получение ингредиентов
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.viewport(1300, 800);

    if (testUrl) {
      cy.visit(testUrl);
    } else {
      throw new Error('baseUrl не определен в конфигурации Cypress');
    }
  });

  describe('Проверка открытия модальных окон', () => {
    it('Тест на открытие по карточке ингредиента', () => {
      cy.contains(INGREDIENTS_DETAILS_TEXT).should('not.exist');
      cy.contains(BUN_INGREDIENT_TEXT).click();
      cy.contains(INGREDIENTS_DETAILS_TEXT).should('exist');
      cy.get(MODAL_SELECTOR).contains(BUN_INGREDIENT_TEXT).should('exist');
    });

    it('Модальное окно с ингредиентом будет открыто после перезагрузки страницы', () => {
      cy.contains(INGREDIENTS_DETAILS_TEXT).should('not.exist');
      cy.contains(BUN_INGREDIENT_TEXT).click();
      cy.contains(INGREDIENTS_DETAILS_TEXT).should('exist');
      cy.reload(true);
      cy.get(MODAL_SELECTOR).children().should('have.length', 2);
    });
  });

  describe('Проверка закрытия модальных окон', () => {
    it('Через нажатие на крестик', () => {
      cy.contains(INGREDIENTS_DETAILS_TEXT).should('not.exist');
      cy.contains(BUN_INGREDIENT_TEXT).click();
      cy.contains(INGREDIENTS_DETAILS_TEXT).should('exist');
      cy.get(MODAL_SELECTOR).children().should('have.length', 2);
    });

    it('Через нажатие на оверлей', () => {
      cy.contains(BUN_INGREDIENT_TEXT).click();
      cy.contains(INGREDIENTS_DETAILS_TEXT).should('exist');
      cy.get('[data-cy=modal-overlay]').click('left', { force: true });
      cy.wait(500);
      cy.contains(INGREDIENTS_DETAILS_TEXT).should('not.exist');
    });

    it('Через нажатие на Escape', () => {
      cy.contains(BUN_INGREDIENT_TEXT).click();
      cy.contains(INGREDIENTS_DETAILS_TEXT).should('exist');
      cy.get('body').type('{esc}');
      cy.wait(500);
      cy.contains(INGREDIENTS_DETAILS_TEXT).should('not.exist');
    });
  });

  afterEach(() => {
    // очищать после выполнения теста - обязательно
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});

describe('тест на оформление заказа', () => {
  beforeEach(() => {
    // Перед выполнением теста создания заказа в localStorage и сookie подставляются фейковые токены авторизации
    cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('EXAMPLE_REFRESH_TOKEN')
    );

    // Перехват запросов на проверку авторизации, оформление заказа и получения ингредиентов
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });

    if (testUrl) {
      cy.visit(testUrl);
    } else {
      throw new Error('baseUrl не определен в конфигурации Cypress');
    }
  });

  it('Тест оформления заказа', () => {
    cy.get('[data-cy=bun-ingredients]').contains(ADD_TEXT).click();
    cy.get('[data-cy=order-sum]').click();

    // Нажатие на саму кнопку оформления заказа
    cy.get('[data-cy=order-button]').click();

    // После успешной отправки данных на сервер должно быть открыто модальное окно с оформлением заказа
    cy.get(MODAL_SELECTOR).children().should('have.length', 2).as('modal');

    // Новое модальное окно должно содержать тестовый номер заказа
    cy.get(MODAL_SELECTOR)
      .find('h2')
      .should('have.text', orderFixture.order.number);

    // Нажатие на кнопку закрытия заказа
    cy.get('[data-cy=modal-close-button]').click();

    // Проверяем, что модальное окно закрылось
    cy.contains('Детали заказа').should('not.exist');

    // После успешной отправки данных на сервер конструктор должен быть очищен
    cy.get('[data-cy=constructor]')
      .contains(BUN_INGREDIENT_TEXT)
      .should('not.exist');
  });

  afterEach(() => {
    // Очистка фейковых токенов
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
