const constructorElementTextSelector = 'div.constructor-element span.constructor-element__text'
const ingredientBunSelector = '[data-cy=bun-ingredients]'
const ingredientMainSelector = '[data-cy=main-ingredients]'
const ingredientSauceSelector = '[data-cy=sauce-ingredients]'
const modalInfoSelector = '[data-cy=modal-info]'
const closeX = '[data-cy=closeX]'


describe('Проверка доступности приложения', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as ('getIngredients');
        cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as ('getAuth')
        cy.visit('/')
        cy.get(ingredientBunSelector).as ('bunIngredients');
        cy.get(ingredientMainSelector).as ('mainIngredients');
        cy.get(ingredientSauceSelector).as ('sauceIngredients');
    })

    it('Проверка добавления ингредиентов в конструктор', () => {
        cy.get('@bunIngredients').contains('Добавить').click();
        cy.get(constructorElementTextSelector).contains('Краторная булка N-200i (верх)')
        cy.get(constructorElementTextSelector).contains('Краторная булка N-200i (низ)')
        cy.get('@mainIngredients').contains('Добавить').click()
        cy.get(constructorElementTextSelector).contains('Биокотлета из марсианской Магнолии')
        cy.get('@sauceIngredients').contains('Добавить').click()
        cy.get(constructorElementTextSelector).contains('Соус Spicy-X')
    })
})

describe('Проверка работы модальных окон', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as ('getIngredients')
        cy.visit('/')
    })

    it('Модального окна нет', () => {
        cy.get(modalInfoSelector).should('not.exist');
      });

    it('Модальное окно открывается', () => {
        cy.contains('Соус Spicy-X').click()
        cy.get(modalInfoSelector).should('exist');
      cy.get('li').children('p').contains('Калории, ккал').next('p').contains('30');
      cy.get('li').children('p').contains('Белки, г').next('p').contains('30');
      cy.get('li').children('p').contains('Жиры, г').next('p').contains('20');   
      cy.get('li').children('p').contains('Углеводы, г').next('p').contains('40');
    } )  

    it('Модальное окно закрывается по Х', function() {
        cy.contains('Соус Spicy-X').click();
        cy.get(modalInfoSelector).should('exist'); 
        cy.get(closeX).should('exist');
        cy.get(closeX).click();
        cy.get(modalInfoSelector).should('not.exist'); 
      });

      it('Модальное окно закрывается по клику на оверлее', function() {
        cy.contains('Соус Spicy-X').click();
        cy.get(modalInfoSelector).should('exist'); 
        cy.get('[data-cy=closeOverlay]').click('bottomLeft', {force: true});      
        cy.get(modalInfoSelector).should('not.exist');
      });  
})

describe('Проверка оформления заказа', function() {
    beforeEach(() => {
      cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as ('getIngredients');      
      cy.intercept('POST', '/api/auth/login', { fixture: 'user.json' });
      cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', '/api/orders', { fixture: 'order.json' });


      cy.visit('/'); 

      cy.setCookie('accessToken', 'accessToken');
        window.localStorage.setItem('refreshToken', 'refreshToken');    

      cy.get(ingredientBunSelector).as ('bunIngredients');
      cy.get(ingredientMainSelector).as ('mainIngredients');
      cy.get(ingredientSauceSelector).as ('sauceIngredients');
    });

    afterEach(() => {
      cy.clearLocalStorage();
      cy.clearCookies();
    })

    it('Проверка оформления заказа', function() {
      cy.get('@bunIngredients').contains('Добавить').click();      
      cy.get(constructorElementTextSelector).contains('Краторная булка N-200i (верх)');
      cy.get(constructorElementTextSelector).contains('Краторная булка N-200i (низ)');
      cy.get('@sauceIngredients').contains('Добавить').click();      
      cy.get(constructorElementTextSelector).contains('Соус Spicy-X');
      
      cy.get('[data-cy=onOrder]').click();
      cy.get(modalInfoSelector).should('exist');
      cy.get('#modals').find('h2').contains(77777);
      cy.get(closeX).click();
      cy.get(modalInfoSelector).should('not.exist');
      cy.get('[data-cy=topBun]').contains('Выберите булки');
      cy.get('[data-cy=bottomBun]').contains('Выберите булки');
      cy.get('[data-cy=inside]').contains('Выберите начинку');
    });
  });

  
    
  
