describe('Тесты работы бургер-конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.education-services.ru/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', 'https://norma.education-services.ru/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');
    cy.intercept('POST', 'https://norma.education-services.ru/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.visit('http://localhost:4000/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
      }
    });
    cy.setCookie('accessToken', 'test-access-token');
    cy.wait('@getIngredients');
    cy.wait('@getUser'); // можно проверить что юзер отображается в шапке
  });

  describe('Отображение и добавление ингредиентов в конструктор', () => {
    it('Должен отобразить список ингредиентов из мока', () => {
      cy.contains('Краторная булка N-200i').should('exist');
      cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    });

    it('Должен добавить начинку из списка в конструктор и увеличить счетчик ингредиента', () => {
      cy.contains(
        '[data-testid="ingredient-card"]',
        'Биокотлета из марсианской Магнолии'
      ).as('ingredientCard');
      cy.get('@ingredientCard').contains('button', 'Добавить').click();
      cy.get('@ingredientCard').contains(/^1$/).should('exist');
      cy.get('[data-testid="constructor-ingredients"]').should(
        'contain.text',
        'Биокотлета из марсианской Магнолии'
      );
    });

    it('Должен добавить булку, увеличить счетчик на 2, в конструкторе булка появляется сверху и снизу', () => {
      cy.contains(
        '[data-testid="ingredient-card"]',
        'Краторная булка N-200i'
      ).as('bunCard');
      cy.get('@bunCard').contains('button', 'Добавить').click();
      cy.get('@bunCard').contains(/^2$/).should('exist');
      cy.get('[data-testid="constructor-bun-top"]')
        .should('contain.text', 'Краторная булка N-200i')
        .and('contain.text', 'верх');
      cy.get('[data-testid="constructor-bun-bottom"]')
        .should('contain.text', 'Краторная булка N-200i')
        .and('contain.text', 'низ');
    });
  });

  describe('Модальное окно ингредиента', () => {
    beforeEach(() => {
      cy.contains(
        '[data-testid="ingredient-card"]',
        'Биокотлета из марсианской Магнолии'
      ).click();
    });
    it('Должен открыть модальное окно ингредиента и показать калории добавленнного ингредиента из мока', () => {
      cy.get('[data-testid="modal"]').should('be.visible');
      cy.get('[data-testid="ingredient-details"]').should('be.visible');
      cy.get('[data-testid="ingredient-calories"]')
        .should('be.visible')
        .and('have.text', '4242');
    });
    it('Должен закрыть модальное окно по клику на крестик', () => {
      cy.get('[data-testid="modal"]').should('be.visible');
      cy.get('[data-testid="modal-close-button"]').click();
      cy.get('[data-testid="modal"]').should('not.exist');
    });
    it('Должен закрыть модальное окно по клику на оверлей', () => {
      cy.get('[data-testid="modal"]').should('be.visible');
      cy.get('[data-testid="modal-overlay"]').click({ force: true });
      cy.get('[data-testid="modal"]').should('not.exist');
    });
  });

  describe('Оформление заказа', () => {
    beforeEach(() => {
      cy.contains(
        '[data-testid="ingredient-card"]',
        'Краторная булка N-200i'
      ).as('bunCard');
      cy.get('@bunCard').contains('button', 'Добавить').click();
      cy.contains(
        '[data-testid="ingredient-card"]',
        'Биокотлета из марсианской Магнолии'
      ).as('ingredientCard');

      cy.get('@ingredientCard').contains('button', 'Добавить').click();

      cy.contains('button', 'Оформить заказ').click();
      cy.wait('@createOrder');
    });
    it('Открывает модальное окно с номером заказа', () => {
      cy.get('[data-testid="modal"]').should('be.visible');
      cy.get('[data-testid="order-number"]')
        .should('be.visible')
        .and('have.text', '11233');
    });
    it('Закрывает модальное окно заказа по клику на крестик и очищает конструктор', () => {
      cy.get('[data-testid="modal"]').should('be.visible');
      cy.get('[data-testid="modal-close-button"]').click();
      cy.get('[data-testid="modal"]').should('not.exist');
      cy.get('[data-testid="constructor-ingredients"]').should(
        'contain.text',
        'Выберите начинку'
      );
      cy.get('[data-testid="constructor-bun-top"]').should('not.exist');
      cy.get('[data-testid="constructor-bun-bottom"]').should('not.exist');
    });
  });
});
