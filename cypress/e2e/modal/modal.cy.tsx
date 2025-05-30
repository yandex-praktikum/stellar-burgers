///<reference types="cypress"/>

describe('Modal window test', function() {
    this.beforeEach(function() {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.viewport(1300, 800);
        cy.visit('/');
    })

    //открытие модального окна при клике на ингредиент в списке 
    it('Ingredient modal window is opened', function () {
        cy.get('[data-cy=modal]').should('not.exist');
        cy.get('[data-cy=bun_ingredients]').contains('Ингредиент_1').click();
        cy.get('[data-cy=modal]').contains('Ингредиент_1').should('exist');
    })

    //закрытие модального окна при клике на крестик
    it('Ingredient modal window is closed', function() {
        cy.get('[data-cy=bun_ingredients]').contains('Ингредиент_1').click();
        cy.get('[data-cy=close_icon]').click();
        cy.get('[data-cy=modal]').should('not.exist');
    })

    //закрытие модального окна при клике на оверлей
    it('Ingredient modal window is closed by overlay cloick', function () {
        cy.get('[data-cy=bun_ingredients]').contains('Ингредиент_1').click();
        cy.get('[data-cy=modal]').should('exist');
        cy.get('[data-cy=overlay]').should('exist').click('topRight', {force : true});
        cy.get('[data-cy=modal]').should('not.exist');
    })
})
