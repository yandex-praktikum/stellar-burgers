/// <reference types="cypress" />

describe('Конструктор бургера', () => {
  beforeEach(() => {
    // Перехватываем запрос к API и возвращаем моковые данные
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' })
    cy.visit('/')
  })

  describe('Модальное окно ингредиента', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' })
      cy.visit('/')
      
      // Открываем модальное окно перед каждым тестом
      cy.contains('Краторная булка N-200i')
        .scrollIntoView()
        .parent()
        .find('a')
        .click({ force: true })
    })

    it('должно открываться при клике на ингредиент', () => {
      // Проверяем содержимое модального окна
      cy.contains('Детали ингредиента').should('exist')
      cy.contains('Краторная булка N-200i').should('exist')
      cy.contains('Калории').should('exist')
      cy.contains('420').should('exist')
    })

    it('должно закрываться при клике на крестик', () => {
      // Находим и кликаем по иконке закрытия в модальном окне
      cy.get('#modals')
        .find('button')
        .first()
        .click()

      // Проверяем, что модальное окно закрылось
      cy.contains('Детали ингредиента').should('not.exist')
    })

    it('должно закрываться при клике на оверлей', () => {
      // Находим оверлей как последний div в модальном окне
      cy.get('#modals')
        .children()
        .last()
        .click({ force: true })

      // Проверяем, что модальное окно закрылось
      cy.contains('Детали ингредиента').should('not.exist')
    })
  })

  it('должен добавлять булку в конструктор', () => {
    // Сначала проверим, что ингредиенты загрузились
    cy.contains('Краторная булка N-200i').should('exist')
    
    // Добавляем булку
    cy.contains('Краторная булка N-200i')
      .parent()
      .find('button')
      .click()

    // Проверяем, что булка добавилась в конструктор
    cy.get('[class*="constructor-element"]')
      .should('contain', 'Краторная булка N-200i')
  })

  it('должен добавлять начинку в конструктор', () => {
    // Добавляем начинку
    cy.contains('Биокотлета из марсианской говядины')
      .parent()
      .find('button')
      .click()

    // Проверяем, что начинка добавилась
    cy.get('[class*="constructor-element"]')
      .should('contain', 'Биокотлета из марсианской говядины')
  })

  it('должен добавлять соус в конструктор', () => {
    // Добавляем соус
    cy.contains('Соус фирменный Space Sauce')
      .parent()
      .find('button')
      .click()

    // Проверяем, что соус добавился
    cy.get('[class*="constructor-element"]')
      .should('contain', 'Соус фирменный Space Sauce')
  })
})

describe('Создание заказа', () => {
  beforeEach(() => {
    // Мокаем запрос ингредиентов
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' })

    // Мокаем данные пользователя
    cy.intercept('GET', '**/api/auth/user', {
      success: true,
      user: {
        email: 'test@test.com',
        name: 'Test User'
      }
    })

    // Подставляем токены авторизации
    window.localStorage.setItem('accessToken', 'test_token')
    window.localStorage.setItem('refreshToken', 'test_refresh_token')

    // Мокаем запрос создания заказа
    cy.intercept('POST', '**/api/orders', {
      success: true,
      name: 'Test Burger',
      order: {
        number: '12345'
      }
    })

    cy.visit('/')
  })

  it('должен создавать и очищать заказ', () => {
    // Собираем бургер
    // Добавляем булку
    cy.contains('Краторная булка N-200i')
      .parent()
      .find('button')
      .click()

    // Добавляем начинку
    cy.contains('Биокотлета из марсианской говядины')
      .parent()
      .find('button')
      .click()

    // Нажимаем "Оформить заказ"
    cy.get('button').contains('Оформить заказ').click()

    // Проверяем модальное окно с номером заказа
    cy.get('#modals')
      .contains('12345')
      .should('exist')

    // Закрываем модальное окно
    cy.get('#modals')
      .find('button')
      .first()
      .click()

    // Проверяем, что модальное окно закрылось
    cy.get('#modals')
      .contains('12345')
      .should('not.exist')

    // Проверяем, что конструктор пуст
    cy.get('[class*="constructor-element"]')
      .should('not.exist')
  })
})