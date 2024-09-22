beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
    'ingredients'
  );
  cy.intercept('POST', 'api/auth/login', { fixture: 'userDataLogin.json' }).as(
    'login'
  );
  cy.intercept('GET', 'api/auth/user', { fixture: 'userData.json' }).as('user');

  cy.setCookie('accessToken', 'mocAccessToken');
  window.localStorage.setItem('refreshToken', 'mockRefreshToken');
  
  cy.visit('http://localhost:4000/');
});

afterEach(() => {
  cy.window().then((win) => {
    win.localStorage.removeItem('refreshToken');
  });

  cy.clearCookie('accessToken');
});

describe('should check constructor work', () => {
  it('should add a bun in constructor', () => {
    cy.get('h3')
      .contains('Булки')
      .next('ul')
      .children()
      .first()
      .contains('Добавить')
      .click();

    cy.get('[data-cy="burger-constructor-section"]')
      .contains('Краторная булка N-200i')
      .should('exist');
  });

  it('should add a filling in constructor', () => {
    cy.get('h3')
      .contains('Начинки')
      .next('ul')
      .children()
      .first()
      .contains('Добавить')
      .click();

    cy.get('[data-cy="burger-constructor-section"]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
  });
});

describe('should check modal for ingredients', () => {
  // Проверяем, что модалка не была открыта изначально + подменяем запрос для заказа
  beforeEach(() => {
    cy.get('#modal').should('not.exist');
  });

  it('should open modal with ingredient data', () => {
    // клик на карточку
    cy.get('h3').contains('Начинки').next('ul').children().first().click();
    // Данные, которые ожидаем
    const expectedData = {
      name: 'Биокотлета из марсианской Магнолии',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242
    };
    // Сверились
    cy.get('#modal').within(() => {
      cy.contains(expectedData.name);
      cy.contains(expectedData.calories);
      cy.contains(expectedData.proteins);
      cy.contains(expectedData.fat);
      cy.contains(expectedData.carbohydrates);
    });
  });

  it('should close modal by click to the button', function () {
    cy.get('h3').contains('Начинки').next('ul').children().first().click();
    cy.get('#modal').find('button').click();
    cy.get('#modal').should('not.exist');
    cy.get('div').contains('Ингредиент подробно').should('not.exist');
  });

  it('should close modal by click to esc', function () {
    cy.get('h3').contains('Начинки').next('ul').children().first().click();
    cy.get('body').type('{esc}');
    cy.get('#modal').should('not.exist');
    cy.get('div').contains('Ингредиент подробно').should('not.exist');
  });
});

describe('should check order', () => {
  beforeEach(() => {
    cy.intercept('POST', 'api/orders', { fixture: 'orderRequest.json' }).as(
      'order'
    );
  });

  it('should open modal with orderData after sending', () => {
    // Накликали ингредиент
    cy.get('h3')
      .contains('Булки')
      .next('ul')
      .children()
      .first()
      .contains('Добавить')
      .click();
    // Нашли и кликнули кнопку оформления
    cy.get('[data-cy="make-an-order"]')
      .contains('button', 'Оформить заказ')
      .click();
    // проверили модальное окно
    cy.get('#modal').contains('47214');
  });

  it('should close modal with orderData by click to the button + check constructor is empty', () => {
    // Накликали ингредиент
    cy.get('h3')
      .contains('Булки')
      .next('ul')
      .children()
      .first()
      .contains('Добавить')
      .click();

    cy.get('[data-cy="make-an-order"]')
      .contains('button', 'Оформить заказ')
      .click();

    // проверили модальное окно
    cy.get('#modal').contains('47214');
    // Нашли кнопку и кликнули
    cy.get('#modal').find('button').click();

    // Проверка на отсутствие
    cy.get('#modal').should('not.exist');
    cy.get('div').contains('47214').should('not.exist');

    // Проверка на пустой конструктор

    cy.get('div').contains('Выберите булки')
    cy.get('div').contains('Выберите начинку')
  });
});

