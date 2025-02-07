import { setCookie } from '../../src/utils/cookie';
import '../support/commands'

describe('Тестирование конструктора', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.intercept('GET', 'api/auth/user', {fixture:'login.json'});
        cy.intercept('POST', 'api/orders', {fixture:'order.json'});
        cy.visit('http://localhost:4000');
        setCookie('accessToken', 'accessToken');
        localStorage.setItem('refreshToken', 'refreshToken');
        
    })
    it('Получение списка интегредиентов', () => {
        cy.get('button').contains('Добавить').should('exist');
    });
    it('Открытие и закрытие модального окна ингредиента по кнопкке', () => {
        cy.get('ul').each(($element, index) => {
            if (index === 1)
                cy.wrap($element).get('li').each(($ingredient, ingredientIndex) => {
                    if (ingredientIndex === 0)
                        cy.wrap($ingredient).click();
                })
        });
        cy.get('#modals').then(($modal) => {
            cy.wrap($modal).each(($modalItem) => {
                cy.wrap($modalItem).should('be.visible');
                cy.wrap($modalItem).within(($modalArea) => {
                    cy.wrap($modalArea).get('button').click();  
                })
            })
        })

        cy.get('#modals').then(($modal: JQuery<HTMLElement>) => {
            cy.wrap($modal).each(($modalItem) => {
                cy.wrap($modalItem).should('be.visible');
                cy.wrap($modalItem).within(($modalArea) => {
                    cy.wrap($modalArea).get('button').should('not.exist');
                })
            })
        })
    });
    it('Открытие и закрытие модального окна ингредиента по overlay', () => {
        cy.get('ul').each(($element, index) => {
            if (index === 1)
                cy.wrap($element).get('li').each(($ingredient, ingredientIndex) => {
                    
                    if (ingredientIndex === 0){
                        cy.wrap($ingredient).click();
                    }
                        
                })
        });

        cy.clickOutside();

        cy.get('#modals').then(($modal: JQuery<HTMLElement>) => {
            cy.wrap($modal).each(($modalItem) => {
                cy.wrap($modalItem).should('be.visible');
                cy.wrap($modalItem).within(($modalArea) => {
                    cy.wrap($modalArea).get('button').should('not.exist');
                })
            })
        })
    });
    it('Добавление ингредиентов', () => {
        cy.get('button').each(($btn, index) => {
            if ($btn.text().includes('Добавить') && (index === 0 || index === 2)){
                cy.wrap($btn).click();
            }
        })
        cy.get('.constructor-element').each(($element) => {
            cy.wrap($element).get('img').should('exist');
        })
    });
    it('Создание заказа', () => {
        cy.get('button').each(($btn, index) => {
            if ($btn.text().includes('Добавить') && (index === 0 || index === 2)){
                cy.wrap($btn).click();
            }
        });
        cy.get('button').contains('Оформить заказ').click();
        cy.get('#modals').then(($modal) => {
            cy.wrap($modal).each(($modalItem) => {
                cy.wrap($modalItem).should('be.visible');
                cy.wrap($modalItem).within(($modalArea) => {
                    cy.wrap($modalArea).get('button').click();  
                })
            })
        })
        cy.get('.constructor-element').should('not.exist');
    })

});
