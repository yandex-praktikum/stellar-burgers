const MODAL_SELECTOR = '[data-testid="modal"]';

describe('Тестирование конструктора бургера', () => {
    beforeEach(() => {
        // Устанавливаем куки и токены для имитации авторизации
        cy.setCookie('accessToken', 'test-access-token');
        localStorage.setItem('refreshToken', 'test-refresh-token');

        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder');

        cy.visit('/');
        cy.wait('@getIngredients');
    });

    context('Работа с ингредиентами', () => {
        it('должен добавлять булку и ингредиенты в конструктор', () => {
            cy.get('[data-testid="ingredient-bun"]').contains('Добавить').click();
            cy.get('[data-testid="ingredient-sauce"]').contains('Добавить').click();
            cy.get('[data-testid="ingredient-main"]').contains('Добавить').click();
            
            // Проверка, что в списке появилась начинка
            cy.get('[data-testid="constructor-list"]').should('not.contain', 'Выберите начинку');
        });
    });

    context('Модальные окна', () => {
        beforeEach(() => {
            cy.get('[data-testid="ingredient-main"]').first().click();
        });

        it('должно открываться и содержать заголовок "Детали ингредиента"', () => {
            cy.get(MODAL_SELECTOR).should('be.visible').and('contain', 'Детали ингредиента');
        });

        it('должно закрываться при клике на крестик', () => {
            cy.get('[data-testid="modal-close-button"]').click();
            cy.get(MODAL_SELECTOR).should('not.exist');
        });

        it('должно закрываться при клике на оверлей', () => {
            cy.get('[data-testid="modal-overlay"]').click({ force: true });
            cy.get(MODAL_SELECTOR).should('not.exist');
        });
    });

    context('Оформление заказа', () => {
        it('должен проходить полный цикл оформления заказа', () => {
            // Собираем бургер
            cy.get('[data-testid="ingredient-bun"]').contains('Добавить').click();
            cy.get('[data-testid="ingredient-main"]').contains('Добавить').click();

            // Кликаем оформить
            cy.get('button').contains('Оформить заказ').click();

            // Ждем ответа и проверяем номер
            cy.wait('@postOrder');
            cy.get(MODAL_SELECTOR).should('be.visible');
            cy.get('[data-testid="order-number"]').should('contain', '12345');

            // Закрываем и проверяем очистку
            cy.get('[data-testid="modal-close-button"]').click();
            cy.get(MODAL_SELECTOR).should('not.exist');
            cy.get('[data-testid="constructor-list"]').should('contain', 'Выберите начинку');
        });
    });
});