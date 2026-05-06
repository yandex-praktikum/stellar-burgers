describe('Тесты страницы бургер-конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.education-services.ru/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', 'https://norma.education-services.ru/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.visit('http://localhost:4000/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
      }
    });
    cy.setCookie('accessToken', 'test-access-token');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  it('Должен отобразить список ингредиентов из мока', () => {
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
  });

  it('Должен добавить начинку из списка в конструктор', () => {
    cy.contains('Биокотлета из марсианской Магнолии')
      .closest('li')
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });
    cy.get('ul[class*="elements"]')
      .should('not.contain.text', 'Выберите начинку')
      .and('contain.text', 'Биокотлета из марсианской Магнолия');
    cy.contains('Биокотлета из марсианской Магнолия')
      .closest('li')
      .within(() => {
        cy.contains('1').should('exist');
      });
  });
});
