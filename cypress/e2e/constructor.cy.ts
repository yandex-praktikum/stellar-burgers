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

describe('проверяем модалку', function () {
  it('закрытие модалки на крестик', () => {
    cy.visit('http://localhost:4000');
    cy.get("[data-cy='643d69a5c3f7b9001cfa093e']").click();
    cy.get("[data-cy='modal']").should('be.visible');
    cy.get("[data-cy='modal']").find('button').click();
    cy.get("[data-cy='modal']").should('not.exist');
  });
});
