import '../support/commands'

describe('Тестирование конструктора', () => {
    beforeEach(() => {
        cy.beforeEachInit();
    })
    afterEach(() => {
        cy.afterEachInit();
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
        cy.get('#modals').as('modals');
        cy.get('@modals').then(($modal) => {
            cy.wrap($modal).each(($modalItem) => {
                cy.wrap($modalItem).as('modalItem');
                cy.get('@modalItem').should('be.visible');
                cy.get('@modalItem').within(($modalArea) => {
                    cy.wrap($modalArea).get('button').click();  
                })
            })
        })

        cy.get('@modals').then(($modal: JQuery<HTMLElement>) => {
            cy.wrap($modal).each(($modalItem) => {
                cy.wrap($modalItem).as('modalItem');
                cy.get('@modalItem').should('be.visible');
                cy.get('@modalItem').within(($modalArea) => {
                    cy.wrap($modalArea).get('button').should('not.exist');
                })
            })
        })
    });
    it('Открытие и закрытие модального окна ингредиента по overlay', () => {
        cy.get('#modals').as('modals');
        cy.get('ul').each(($element, index) => {
            if (index === 1)
                cy.wrap($element).get('li').each(($ingredient, ingredientIndex) => {
                    if (ingredientIndex === 0){
                        cy.wrap($ingredient).click();
                    }    
                })
        });

        cy.clickOutside();

        cy.get('@modals').then(($modal: JQuery<HTMLElement>) => {
            cy.wrap($modal).each(($modalItem) => {
                cy.wrap($modalItem).as('modalItem');
                cy.get('@modalItem').should('be.visible');
                cy.get('@modalItem').within(($modalArea) => {
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
        cy.get('button').contains('Оформить заказ').as('orderButton');
        cy.get('@orderButton').click();
        cy.get('#modals').then(($modal) => {
            cy.wrap($modal).each(($modalItem) => {
                cy.wrap($modalItem).as('modalItem');
                cy.get('@modalItem').should('be.visible');
                cy.get('@modalItem').within(($modalArea) => {
                    cy.wrap($modalArea).get('button').click();  
                })
            })
        })
        cy.get('.constructor-element').should('not.exist');
    })

});
