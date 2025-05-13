import { URL, SELECTORS } from '../support/selectors';

describe('Проверяем доступность приложения', () => {
    it('сервис должен быть доступен по адресу localhost:4000', () => {
        cy.visit(URL);
    });
});

beforeEach(() => {
    window.localStorage.setItem('refreshToken', 'testRefreshToken');
    cy.setCookie('accessToken', 'testAccessToken');

    cy.intercept('GET', 'api/ingredients', {
        fixture: 'ingredients'
    }).as('getIngredients');

    cy.intercept('GET', 'api/auth/user', {
        fixture: 'user'
    }).as('getUser');

    cy.visit(URL);
    cy.wait('@getIngredients');
    cy.wait('@getUser');
});

afterEach('Очистка localStorege и Cookies', () => {
    cy.clearAllLocalStorage();
    cy.clearAllCookies();
});

describe('Проверка работоспособности страницы - ConstructorPage', () => {
    it('Проверка добавления ингредиентов в конструктор', () => {
        cy.get(SELECTORS.BUN_CONSTRUCTOR_UP_CLEAR).should('exist');
        cy.get(SELECTORS.BUN_CONSTRUCTOR_DOWN_CLEAR).should('exist');
        cy.get(SELECTORS.INGREDIENT_CONSTRUCTOR_ITEM).should('not.exist');

        cy.get(SELECTORS.BUN_0).should('exist');
        cy.get(`${SELECTORS.BUN_0} > .common_button`).should('exist').click();

        cy.get(SELECTORS.INGREDIENT_0).should('exist');
        cy.get(`:nth-child(4) > ${SELECTORS.INGREDIENT_0} > .common_button`)
            .should('exist')
            .click();
        cy.get(SELECTORS.BUN_CONSTRUCTOR_UP_CLEAR.replace('_clear', '')).should('exist');
        cy.get(SELECTORS.BUN_CONSTRUCTOR_DOWN_CLEAR.replace('_clear', '')).should('exist');
        cy.get(SELECTORS.INGREDIENT_CONSTRUCTOR_ITEM).should('exist');
    });


    it('Проверка открытия и закрытия модального окна одного ингредиента - через оверлей', () => {
        const ingredientName = 'Краторная булка N-200i';

        cy.get(SELECTORS.MODAL_INGREDIENT).should('not.exist');
        cy.get(SELECTORS.BUN_0).should('exist').click();
        cy.get(SELECTORS.MODAL_INGREDIENT).should('be.visible');
        cy.get(`${SELECTORS.MODAL_INGREDIENT} .text_type_main-medium`).should(
            'contain.text',
            ingredientName
        );
        cy.get(SELECTORS.MODAL_OVERLAY).should('exist');
        cy.get(SELECTORS.MODAL_OVERLAY).click({ force: true });
        cy.get(SELECTORS.MODAL_INGREDIENT).should('not.exist');
        cy.get(SELECTORS.MODAL_OVERLAY).should('not.exist');
    });

    it('Проверка открытия и закрытия модального окна одного ингредиента - через кнопку закрытия', () => {
        const ingredientName = 'Краторная булка N-200i';

        cy.get(SELECTORS.MODAL_INGREDIENT).should('not.exist');
        cy.get(SELECTORS.BUN_0).should('exist').click();
        cy.get(SELECTORS.MODAL_INGREDIENT).should('be.visible');
        cy.get(`${SELECTORS.MODAL_INGREDIENT} .text_type_main-medium`).should(
            'contain.text',
            ingredientName
        );
        cy.get(SELECTORS.BTN_CLOSE_MODAL).click();
        cy.get(SELECTORS.MODAL_INGREDIENT).should('not.exist');
    });

    it('Проверка полного цикла заказа товара', () => {
        cy.get(SELECTORS.BUN_CONSTRUCTOR_UP_CLEAR).should('exist');
        cy.get(SELECTORS.BUN_CONSTRUCTOR_DOWN_CLEAR).should('exist');
        cy.get(SELECTORS.INGREDIENT_CONSTRUCTOR_ITEM).should('not.exist');

        cy.get(SELECTORS.BUN_0).should('exist');
        cy.get(`${SELECTORS.BUN_0} > .common_button`).should('exist').click();
        cy.get(SELECTORS.INGREDIENT_0).should('exist');
        cy.get(`:nth-child(4) > ${SELECTORS.INGREDIENT_0} > .common_button`)
            .should('exist')
            .click();

        cy.intercept('POST', 'api/orders', {
            fixture: 'newOrder'
        }).as('newOrder');

        cy.get(SELECTORS.NEW_ORDER_BTN).click();
        cy.wait('@newOrder');
        cy.fixture('newOrder').then((newOrder) => {
            cy.get(SELECTORS.NEW_ORDER_NUMBER).contains(newOrder.order.number);
        });

        cy.wait(1000);

        cy.get(SELECTORS.BUN_CONSTRUCTOR_UP_CLEAR).should('exist');
        cy.get(SELECTORS.BUN_CONSTRUCTOR_DOWN_CLEAR).should('exist');
        cy.get(SELECTORS.INGREDIENT_CONSTRUCTOR_ITEM).should('not.exist');
        cy.get(SELECTORS.BTN_CLOSE_MODAL).should('exist').click();
    });
});
