const testUrl = 'http://localhost:4000';

describe('Тесты e2e для главной страницы и модального окна', function () {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.visit(testUrl);
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Добавляем ингридиенты в конструктор', function () {
    cy.get(`[data-cy=${'buns'}]`).as('buns');
    cy.get('[data-cy=mains]').as('mains');
    cy.get('[data-cy=sauces]').as('sauces');

    cy.get('@buns').contains('Добавить').click();
    cy.get('@mains').contains('Добавить').click();
    cy.get('@sauces').contains('Добавить').click();

    cy.get('.constructor-element_pos_top').as('constructorUp');
    cy.get('@constructorUp').contains('Краторная булка N-200i (верх)');
    cy.get('.constructor-element').as('constructorMiddle');
    cy.get('@constructorMiddle').contains('Биокотлета из марсианской Магнолии');
    cy.get('.constructor-element_pos_bottom').as('constructorDown');
    cy.get('@constructorDown').contains('Краторная булка N-200i (низ)');

    cy.get('.move_button').as('moveButtons');
    cy.get('@moveButtons').then((buttons) => {
      const moveDownButton = buttons[1];
      moveDownButton.click();
      cy.get('.constructor-element').as('constructorMiddle');
      cy.get('@constructorMiddle').contains('Соус Spicy-X');
    });
  });

  it('Проверка модального окна: отсутствие', function () {
    cy.get('#modals').children().should('have.length', 0);
  });

  it('Проверка модального окна: открытие', function () {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.get('#modals').children().should('have.length', 2);
    cy.get('#modals').contains('Соус фирменный Space Sauce');
  });

  it('Проверка модального окна: закрытие по кнопке', function () {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.get('#modals').find('button').click();
    cy.get('#modals').children().should('have.length', 0);
  });

  it('Проверка модального окна: закрытие по esc', function () {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.get('body').type('{esc}');
    cy.get('#modals').children().should('have.length', 0);
  });

  it('Проверка модального окна: закрытие по overlay click', function () {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.get('#overlay').debug();
    cy.get('#overlay').click({ force: true });
    cy.get('#modals').children().should('have.length', 0);
  });
});

describe('Тесты e2e оформление заказа', function () {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('POST', '/api/auth/login', { fixture: 'user.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' });
    cy.visit(testUrl);
    cy.setCookie('accessToken', 'accessToken');
    window.localStorage.setItem('refreshToken', 'refreshToken');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Тестируем оформление заказа', function () {
    cy.get(`[data-cy=${'buns'}]`).as('buns');
    cy.get('[data-cy=mains]').as('mains');
    cy.get('[data-cy=sauces]').as('sauces');

    cy.get('@buns').contains('Добавить').click();
    cy.get('@mains').contains('Добавить').click();
    cy.get('@sauces').contains('Добавить').click();

    cy.contains('Оформить заказ').click();
    cy.get('#modals').children().should('have.length', 2);
    cy.get('#modals').find('h2').contains(41975);
    cy.get('body').type('{esc}');
    cy.get('#modals').children().should('have.length', 0);

    cy.get('.text_type_main-default').contains('Выберите булки');
    cy.get('.text_type_main-default').contains('Выберите начинку');
  });
});
