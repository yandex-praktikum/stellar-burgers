describe('Site accessibility', function () {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients' });
        cy.visit('/');
    });

    describe('Modal windows', function () {
        beforeEach(() => {
            cy.get('[data-cy=sauce2]').click();
            cy.get('[data-cy=modal]').as('modal');
        });

        it('should open the modal window', function () {
            cy.get('@modal')
                .contains('Соус барбекю')
                .should('exist');
        });

        it('should close the modal by clicking the close button', function () {
            cy.get('[data-cy=modal] button').click();
            cy.get('@modal').should('not.exist');
        });

        it('should close the modal by clicking on the overlay', function () {
            cy.get('body').click(0, 0);
            cy.get('@modal').should('not.exist');
        });
    });

    describe('Adding ingredients', function () {
        it('should add a bun to the constructor', function () {
            cy.get('[data-cy=bun1]').contains('Добавить').click();
            cy.get('[data-cy=constuctor-bun-up]')
                .contains('Булка небесная')
                .should('exist');
            cy.get('[data-cy=constuctor-bun-down]')
                .contains('Булка небесная')
                .should('exist');
        });

        it('should add meat to the constructor', function () {
            cy.get('[data-cy=main1]').contains('Добавить').click();
            cy.get('[data-cy=constructor-ingredient-main1]')
                .contains('Котлета классическая')
                .should('exist');
        });

        it('should add sauce to the constructor', function () {
            cy.get('[data-cy=sauce1]').contains('Добавить').click();
            cy.get('[data-cy=constructor-ingredient-sauce1]')
                .contains('Соус сырный')
                .should('exist');
        });
    });

    describe('Placing an order', function () {
        beforeEach(() => {
            cy.intercept("GET", "api/auth/user", { fixture: "user" });
            cy.intercept("POST", "api/orders", { fixture: "order-response" });
            window.localStorage.setItem('refreshToken', JSON.stringify('testRefreshToken'));
            cy.setCookie('accessToken', 'testAccessToken');
        });

        afterEach(() => {
            cy.clearCookies();
            cy.clearLocalStorage();
        });

        it('should fill the constructor and place the order', function () {
            cy.get('[data-cy=bun1]').contains('Добавить').click();
            cy.get('[data-cy=main1]').contains('Добавить').click();
            cy.get('[data-cy=sauce1]').contains('Добавить').click();
            cy.contains('Оформить заказ').click();
        });
    });
});