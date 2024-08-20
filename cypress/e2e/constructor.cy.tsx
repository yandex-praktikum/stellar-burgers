

describe('Проверка доступности приложения', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as ('getIngredients');
        cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as ('getAuth')
        cy.visit('http://localhost:4000')
        cy.get('[data-cy=bun-ingredients]').as ('bunIngredients');
        cy.get('[data-cy=main-ingredients]').as ('mainIngredients');
        cy.get('[data-cy=sauce-ingredients]').as ('sauceIngredients');
    })

    it('Проверка добавления ингредиентов в конструктор', () => {
        cy.get('@bunIngredients').contains('Добавить').click();
        cy.get('div.constructor-element span.constructor-element__text').contains('Краторная булка N-200i (верх)')
        cy.get('div.constructor-element span.constructor-element__text').contains('Краторная булка N-200i (низ)')
        cy.get('@mainIngredients').contains('Добавить').click()
        cy.get('div.constructor-element span.constructor-element__text').contains('Биокотлета из марсианской Магнолии')
        cy.get('@sauceIngredients').contains('Добавить').click()
        cy.get('div.constructor-element span.constructor-element__text').contains('Соус Spicy-X')
    })
})

describe('Проверка работы модальных окон', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as ('getIngredients')
        cy.visit('http://localhost:4000')
    })

    it('Модального окна нет', () => {
        cy.get('[data-cy=modal-info]').should('not.exist');
      });

    it('Модальное окно открывается', () => {
        cy.contains('Соус Spicy-X').click()
        cy.get('[data-cy=modal-info]').should('exist');
      cy.get('li').children('p').contains('Калории, ккал').next('p').contains('30');
      cy.get('li').children('p').contains('Белки, г').next('p').contains('30');
      cy.get('li').children('p').contains('Жиры, г').next('p').contains('20');   
      cy.get('li').children('p').contains('Углеводы, г').next('p').contains('40');
    } )  

    it('Модальное окно закрывается по Х', function() {
        cy.contains('Соус Spicy-X').click();
        cy.get('[data-cy=modal-info]').should('exist'); 
        cy.get('[data-cy=closeX]').should('exist');
        cy.get('[data-cy=closeX]').click();
        cy.get('[data-cy=modal-info]').should('not.exist'); 
      });

      it('Модальное окно закрывается по клику на оверлее', function() {
        cy.contains('Соус Spicy-X').click();
        cy.get('[data-cy=modal-info]').should('exist'); 
        cy.get('[data-cy=closeOverlay]').click('bottomLeft', {force: true});      
        cy.get('[data-cy=modal-info]').should('not.exist');
      });  
})

describe('Проверка оформления заказа', function() {
    beforeEach(() => {
      cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as ('getIngredients');      
      cy.intercept('POST', '/api/auth/login', { fixture: 'user.json' });
      cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', '/api/orders', { fixture: 'order.json' });


      cy.visit('http://localhost:4000'); 

      cy.setCookie('accessToken', 'accessToken');
        window.localStorage.setItem('refreshToken', 'refreshToken');    

      cy.get('[data-cy=bun-ingredients]').as ('bunIngredients');
      cy.get('[data-cy=main-ingredients]').as ('mainIngredients');
      cy.get('[data-cy=sauce-ingredients]').as ('sauceIngredients');
    });

    afterEach(() => {
      cy.clearLocalStorage();
      cy.clearCookies();
    })

    it('Проверка оформления заказа', function() {
      cy.get('@bunIngredients').contains('Добавить').click();      
      cy.get('div.constructor-element span.constructor-element__text').contains('Краторная булка N-200i (верх)');
      cy.get('div.constructor-element span.constructor-element__text').contains('Краторная булка N-200i (низ)');
      cy.get('@sauceIngredients').contains('Добавить').click();      
      cy.get('div.constructor-element span.constructor-element__text').contains('Соус Spicy-X');
      
      cy.get('[data-cy=onOrder]').click();
      cy.get('[data-cy=modal-info]').should('exist');
      cy.get('#modals').find('h2').contains(77777);
      cy.get('[data-cy=closeX]').click();
      cy.get('[data-cy=modal-info]').should('not.exist');
      cy.get('[data-cy=topBun]').contains('Выберите булки');
      cy.get('[data-cy=bottomBun]').contains('Выберите булки');
      cy.get('[data-cy=inside]').contains('Выберите начинку');
    });
  });

  
    
  
