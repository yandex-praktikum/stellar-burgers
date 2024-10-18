/// <reference types="cypress" />
describe('Тесты для конструктора бургера без перетаскивания', () => {
  beforeEach(() => {
    // Перехватываем запросы к API ингредиентов и заказов
    cy.fixture('ingredients.json');
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.fixture('post_order.json');
    cy.intercept('POST', '/api/orders', { fixture: 'post_order.json' }).as(
      'postOrder'
    );

    // Устанавливаем фейковые токены в localStorage и cookie
    localStorage.setItem('refreshToken', 'fake-refresh-token');
    cy.setCookie('accessToken', 'fake-access-token');

    // Переходим на главную страницу
    cy.visit('/');
  });

  afterEach(() => {
    // Очищаем localStorage и cookie после каждого теста
    localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('Добавление ингредиента в конструктор через кнопку', () => {
    // Ожидаем загрузки ингредиентов
    cy.wait('@getIngredients');

    // Нажимаем кнопку "Добавить" для булки (например, "Флюоресцентная булка R2-D3")
    cy.get('[data-cy="ingredients-module"]')
      .contains('Флюоресцентная булка R2-D3')
      .parent()
      .find('button')
      .click();

    // Проверяем, что булка добавлена в конструктор
    cy.get('[data-cy="constructor-module"]').should(
      'contain.text',
      'Флюоресцентная булка R2-D3'
    );

    // Нажимаем кнопку "Добавить" для начинки (например, "Хрустящие минеральные кольца")
    cy.get('[data-cy="ingredients-module"]')
      .contains('Хрустящие минеральные кольца')
      .parent()
      .find('button')
      .click();

    // Проверяем, что начинка добавлена в конструктор
    cy.get('[data-cy="constructor-module"]').should(
      'contain.text',
      'Хрустящие минеральные кольца'
    );
  });

  it('Открытие и закрытие модального окна ингредиента', () => {
    // Ожидаем загрузки ингредиентов
    cy.wait('@getIngredients');

    // Открываем модальное окно ингредиента
    cy.contains('Флюоресцентная булка R2-D3').click();
    cy.get('[data-cy="modal"]').should('be.visible'); // Проверяем, что модальное окно открылось

    // Закрываем по крестику
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist'); // Проверяем, что модальное окно закрылось

    // Открываем снова и закрываем по клику на оверлей
    cy.contains('Флюоресцентная булка R2-D3').click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modalOverlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Оформление заказа', () => {
    // Перехват запроса авторизации и получения пользователя
    cy.intercept('POST', '/api/auth/login', {fixture: 'login.json'}).as('login');
    cy.intercept('GET', '/api/auth/user', {fixture: 'user.json'}).as('user');
  
    // // Ожидаем загрузки ингредиентов
    // cy.visit('/login');
    // cy.get('input[name=email]').type('user@mail.com');
    // cy.get('input[name=password]').type('password');
    // cy.get('button[type=submit]').click();
   
  
    // Добавляем булку и начинку
    cy.get('[data-cy="ingredients-module"]')
      .contains('Флюоресцентная булка R2-D3')
      .parent()
      .find('button')
      .click({ force: true });
    cy.get('[data-cy="ingredients-module"]')
      .contains('Хрустящие минеральные кольца')
      .parent()
      .find('button')
      .click({ force: true });
  
    // Кликаем по кнопке "Оформить заказ" внутри секции constructor-module
    cy.get(`[data-cy='constructor-module']`)
      .children()
      .last()
      .find('button')
      .click({ force: true });
  
    // Ожидаем успешного создания заказа
    cy.wait('@postOrder').its('response.statusCode').should('eq', 200);
  
    // Проверяем, что открылось модальное окно с номером заказа
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modal"]').should('contain', '12345'); // Проверяем номер заказа
  
    // Закрываем модальное окно
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  
    // Проверяем, что конструктор пуст после оформления заказа
    cy.get(`[data-cy='constructor-module']`)
      .children()
      .first()
      .should('contain.text', 'Выберите булки');
    cy.get(`[data-cy='constructor-module']`)
      .children()
      .first()
      .next()
      .should('contain.text', 'Выберите начинку');
  });
});
