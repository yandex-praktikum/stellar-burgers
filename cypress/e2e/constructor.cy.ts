describe('Burger Constructor E2E Tests', () => {
  beforeEach(() => {
    // Intercept ingredients API call
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', 'https://norma.education-services.ru/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredientsAlt');
  });

  describe('Ingredients Loading', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.wait('@getIngredients', { timeout: 10000 }).then(() => {}, () => {});
    });

    it('should load and display ingredients', () => {
      cy.contains('Краторная булка N-200i').should('exist');
      cy.contains('Биокотлета из марсианской Магнолии').should('exist');
      cy.contains('Соус Spicy-X').should('exist');
    });

    it('should display ingredients by categories', () => {
      cy.contains('Булки').should('be.visible');
      cy.contains('Начинки').should('be.visible');
    });
  });

  describe('Adding Ingredients via Click', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.wait('@getIngredients', { timeout: 10000 }).then(() => {}, () => {});
    });

    it('should add bun to constructor by clicking', () => {
      // Click on bun's add button with force to bypass overlays
      cy.contains('Краторная булка N-200i')
        .parents('[data-testid="ingredient-item"]')
        .find('button')
        .click({ force: true });

      // Verify bun added to constructor
      cy.get('[data-testid="burger-constructor"]')
        .should('contain', 'Краторная булка N-200i');
    });

    it('should add filling to constructor by clicking', () => {
      cy.contains('Биокотлета из марсианской Магнолии')
        .parents('[data-testid="ingredient-item"]')
        .find('button')
        .click({ force: true });

      cy.get('[data-testid="burger-constructor"]')
        .should('contain', 'Биокотлета из марсианской Магнолии');
    });

    it('should add sauce to constructor by clicking', () => {
      cy.contains('Соус Spicy-X')
        .parents('[data-testid="ingredient-item"]')
        .find('button')
        .click({ force: true });

      cy.get('[data-testid="burger-constructor"]')
        .should('contain', 'Соус Spicy-X');
    });

    it('should replace bun when clicking second bun', () => {
      // Add first bun
      cy.contains('Краторная булка N-200i')
        .parents('[data-testid="ingredient-item"]')
        .find('button')
        .click({ force: true });

      // Add second bun
      cy.contains('Флюоресцентная булка R2-D3')
        .parents('[data-testid="ingredient-item"]')
        .find('button')
        .click({ force: true });

      // Verify only second bun is present
      cy.get('[data-testid="burger-constructor"]')
        .should('contain', 'Флюоресцентная булка R2-D3')
        .should('not.contain', 'Краторная булка N-200i');
    });

    it('should add multiple fillings by clicking', () => {
      cy.contains('Биокотлета из марсианской Магнолии')
        .parents('[data-testid="ingredient-item"]')
        .find('button')
        .click({ force: true });

      cy.contains('Соус Spicy-X')
        .parents('[data-testid="ingredient-item"]')
        .find('button')
        .click({ force: true });

      const constructor = cy.get('[data-testid="burger-constructor"]');
      constructor.should('contain', 'Биокотлета из марсианской Магнолии');
      constructor.should('contain', 'Соус Spicy-X');
    });
  });

  describe('Ingredient Modal', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.wait('@getIngredients', { timeout: 10000 }).then(() => {}, () => {});
    });

    it('should open ingredient modal on ingredient link click', () => {
      cy.get('[data-testid="ingredient-link"]').first().click({ force: true });

      // Verify URL changed to ingredient details
      cy.url().should('include', '/ingredients/');

      // Verify modal exists
      cy.get('[data-testid="modal"]').should('exist');
      cy.get('[data-testid="modal"]')
        .should('contain', 'Детали ингредиента');
    });

    it('should close modal on close button click', () => {
      cy.get('[data-testid="ingredient-link"]').first().click({ force: true });

      // Verify modal opened
      cy.url().should('include', '/ingredients/');
      cy.get('[data-testid="modal"]').should('exist');

      // Close modal
      cy.get('[data-testid="modal-close-button"]').click({ force: true });

      // Verify navigation back to main page
      cy.url().should('not.include', '/ingredients/');
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it('should close modal on overlay click', () => {
      cy.get('[data-testid="ingredient-link"]').first().click({ force: true });

      // Verify modal opened
      cy.url().should('include', '/ingredients/');
      cy.get('[data-testid="modal"]').should('exist');

      // Close modal by clicking overlay
      cy.get('[data-testid="modal-overlay"]').click({ force: true });

      // Verify navigation back to main page
      cy.url().should('not.include', '/ingredients/');
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });

  describe('Order Creation', () => {
    beforeEach(() => {
      // Set auth tokens BEFORE page load
      cy.setCookie('accessToken', 'Bearer mock-access-token');
      localStorage.setItem('refreshToken', 'mock-refresh-token');

      // Mock auth user check
      cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
        fixture: 'user.json'
      }).as('getUser');

      cy.intercept('GET', 'https://norma.education-services.ru/api/auth/user', {
        fixture: 'user.json'
      }).as('getUserAlt');

      // Mock order creation
      cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
        fixture: 'order.json'
      }).as('createOrder');

      cy.intercept('POST', 'https://norma.education-services.ru/api/orders', {
        fixture: 'order.json'
      }).as('createOrderAlt');

      // Visit page AFTER setting up everything
      cy.visit('/');

      // Wait for user auth to complete
      cy.wait('@getUser', { timeout: 10000 }).then(() => {}, () => {});
    });

    it('should create order with full burger', () => {
      // Add bun
      cy.contains('Краторная булка N-200i')
        .parents('[data-testid="ingredient-item"]')
        .find('button')
        .click({ force: true });

      // Add filling
      cy.contains('Биокотлета из марсианской Магнолии')
        .parents('[data-testid="ingredient-item"]')
        .find('button')
        .click({ force: true });

      // Add sauce
      cy.contains('Соус Spicy-X')
        .parents('[data-testid="ingredient-item"]')
        .find('button')
        .click({ force: true });

      // Click order button
      cy.contains('Оформить заказ').click({ force: true });

      // Wait for order creation
      cy.wait('@createOrder', { timeout: 10000 }).then(() => {}, () => {});

      // Verify order modal opens
      cy.get('[data-testid="order-details"]', { timeout: 10000 }).should('exist');
    });

    it('should display order number 12345 in modal', () => {
      // Assemble burger
      cy.contains('Краторная булка N-200i')
        .parents('[data-testid="ingredient-item"]')
        .find('button')
        .click({ force: true });

      cy.contains('Биокотлета из марсианской Магнолии')
        .parents('[data-testid="ingredient-item"]')
        .find('button')
        .click({ force: true });

      // Create order
      cy.contains('Оформить заказ').click({ force: true });
      cy.wait('@createOrder', { timeout: 10000 }).then(() => {}, () => {});

      // Verify order number
      cy.get('[data-testid="order-details"]', { timeout: 10000 })
        .should('contain', '12345');
    });

    it('should clear constructor after closing order modal', () => {
      // Assemble burger
      cy.contains('Краторная булка N-200i')
        .parents('[data-testid="ingredient-item"]')
        .find('button')
        .click({ force: true });

      cy.contains('Биокотлета из марсианской Магнолии')
        .parents('[data-testid="ingredient-item"]')
        .find('button')
        .click({ force: true });

      // Create order
      cy.contains('Оформить заказ').click({ force: true });
      cy.wait('@createOrder', { timeout: 10000 }).then(() => {}, () => {});

      // Close order modal
      cy.get('[data-testid="modal-close-button"]').click({ force: true });

      // Verify constructor is empty
      cy.get('[data-testid="burger-constructor"]')
        .should('not.contain', 'Краторная булка N-200i')
        .should('not.contain', 'Биокотлета из марсианской Магнолии');
    });

    it('should redirect to login when not authenticated', () => {
      // Clear auth and reload to reset Redux state
      cy.clearCookies();
      cy.clearLocalStorage();

      // Mock failed auth check
      cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
        statusCode: 401,
        body: { success: false, message: 'Unauthorized' }
      }).as('getUser401');

      cy.intercept('GET', 'https://norma.education-services.ru/api/auth/user', {
        statusCode: 401,
        body: { success: false, message: 'Unauthorized' }
      }).as('getUser401Alt');

      // Reload page to trigger auth check with cleared auth
      cy.reload();
      cy.wait('@getIngredients', { timeout: 10000 });

      // Try to create order - add bun first
      cy.contains('Краторная булка N-200i')
        .parents('[data-testid="ingredient-item"]')
        .find('button')
        .click({ force: true });

      cy.contains('Оформить заказ').click({ force: true });

      // Verify redirect to login
      cy.url().should('include', '/login');
    });

    it('should disable order button without bun', () => {
      // Add only filling (no bun)
      cy.contains('Биокотлета из марсианской Магнолии')
        .parents('[data-testid="ingredient-item"]')
        .find('button')
        .click({ force: true });

      // Verify order button is disabled
      cy.contains('Оформить заказ').should('be.disabled');
    });
  });
});
