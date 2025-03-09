import * as orderFixture from '../fixtures/order.json';

/// <reference types='cypress' />

describe('тест главной страницы сайта', () => {
  beforeEach(() => {
    // Перехват запросов на получение ингредиентов
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('тест добавления булок', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy=constructor-bun]')
      .contains('Краторная булка N-200i')
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
    cy.visit('http://localhost:4000');
  });

  describe('Проверка открытия модальных окон', () => {
    it('Тест на открытие по карточке ингредиента', () => {
      cy.contains('Детали ингредиента').should('not.exist');
      cy.contains('Краторная булка N-200i').click();
      cy.contains('Детали ингредиента').should('exist');
      cy.get('[data-cy=modal]')
        .contains('Краторная булка N-200i')
        .should('exist');
    });

    it('Модальное окно с ингредиентом будет открыто после перезагрузки страницы', () => {
      cy.contains('Детали ингредиента').should('not.exist');
      cy.contains('Краторная булка N-200i').click();
      cy.contains('Детали ингредиента').should('exist');
      cy.reload(true);
      cy.get('[data-cy=modal]').children().should('have.length', 2);
    });
  });

  describe('Проверка закрытия модальных окон', () => {
    it('Через нажатие на крестик', () => {
      cy.contains('Детали ингредиента').should('not.exist');
      cy.contains('Краторная булка N-200i').click();
      cy.contains('Детали ингредиента').should('exist');
      cy.get('[data-cy=modal]').children().should('have.length', 2);
    });

    it('Через нажатие на оверлей', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.contains('Детали ингредиента').should('exist');
      cy.get('[data-cy=modal-overlay]').click('left', { force: true });
      cy.wait(500);
      cy.contains('Детали ингредиента').should('not.exist');
    });

    it('Через нажатие на Escape', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.contains('Детали ингредиента').should('exist');
      cy.get('body').type('{esc}');
      cy.wait(500);
      cy.contains('Детали ингредиента').should('not.exist');
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

    cy.visit('http://localhost:4000');
  });

  it('Тест оформления заказа', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=order-sum]').click();

    // Нажатие на саму кнопку оформления заказа
    cy.get('[data-cy=order-button]').click();

    // После успешной отправки данных на сервер должно быть открыто модальное окно с оформлением заказа
    cy.get('[data-cy=modal]').children().should('have.length', 2).as('modal');

    // Новое модальное окно должно содержать тестовый номер заказа
    cy.get('[data-cy=modal]')
      .find('h2')
      .should('have.text', orderFixture.order.number);

    // После успешной отправки данных на сервер конструктор должен быть очищен
    cy.get('[data-cy=constructor]')
      .contains('Краторная булка N-200i')
      .should('not.exist');
  });

  afterEach(() => {
    // Очистка фейковых токенов
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
