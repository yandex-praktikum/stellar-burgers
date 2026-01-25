describe('проверяем доступность приложения', function () {
  it('добавляет ингредиент в конструктор', () => {
    cy.visit('http://localhost:4000');

    // проверка конструктора на ингридиенты

    cy.get("[data-cy='constructor'] li").should('have.length', 0);

    cy.get("[data-cy='643d69a5c3f7b9001cfa093e']").find('button').click();
    cy.get("[data-cy='643d69a5c3f7b9001cfa0941']").find('button').click();

    cy.get("[data-cy='constructor'] li").should('have.length', 2);
    // --------------------------------------

    // Проверка контркутора на булки

    cy.get("[data-cy='643d69a5c3f7b9001cfa093d']").find('button').click();
    cy.get("[data-cy='bun']").should('have.length', 2);
  });
});

describe('проверяем модалку', function () {
  it('закрытие модалки на крестик', () => {
    cy.visit('http://localhost:4000');
    cy.get("[data-cy='643d69a5c3f7b9001cfa093e']").click();
    cy.get("[data-cy='modal']").should('be.visible');
    cy.get("[data-cy='modal']").find('button').click();
    cy.get("[data-cy='modal']").should('not.exist');
  });
});

describe('проверка создания заказа', () => {
  it('создаем заказ с моковыми данными', () => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('user');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('order');

    cy.visit('http://localhost:4000', {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
        win.document.cookie = 'accessToken=test-access-token; path=/';
      }
    });

    cy.wait('@ingredients');
    cy.wait('@user');

    cy.get("[data-cy='01']").find('button').click();
    cy.get("[data-cy='02']").find('button').click();

    cy.contains('Оформить заказ').click();
    cy.wait('@order');

    cy.get("[data-cy='modal']").should('be.visible');
    cy.get("[data-cy='modal']").contains('12345');

    cy.get("[data-cy='modal']").find('button').click();
    cy.get("[data-cy='modal']").should('not.exist');

    cy.get("[data-cy='constructor'] li").should('have.length', 0);
    cy.get("[data-cy='bun']").should('not.exist');
  });
});
