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
      // Находим модальное окно
      cy.get('[data-testid="modal"]').within(() => {
        // Проверяем содержимое модального окна
        cy.contains('Детали ингредиента').should('exist')
        cy.contains('Краторная булка N-200i').should('exist')
        cy.contains('Калории').should('exist')
        cy.contains('420').should('exist')
      })
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
    
    // Шаг 1: Проверяем наличие элементов в конструкторе
    cy.get('[class*="constructor-element"]').should(($elements) => {
      // Если элементы есть, проверяем что среди них нет нашей булки
      if ($elements.length > 0) {
        expect($elements.text()).to.not.include('Краторная булка N-200i')
      }
    })
    
    // Шаг 2: Добавляем булку
    cy.contains('Краторная булка N-200i')
      .parent()
      .find('button')
      .click()

    // Шаг 3: Проверяем, что булка добавилась в конструктор
    cy.get('[class*="constructor-element"]')
      .contains('Краторная булка N-200i')
      .should('exist')
  })

  it('должен добавлять начинку в конструктор', () => {
    // Шаг 1: Проверяем наличие элементов в конструкторе
    cy.get('[class*="constructor-element"]').should(($elements) => {
      // Если элементы есть, проверяем что среди них нет нашей начинки
      if ($elements.length > 0) {
        expect($elements.text()).to.not.include('Биокотлета из марсианской говядины')
      }
    })

    // Шаг 2: Добавляем начинку
    cy.contains('Биокотлета из марсианской говядины')
      .parent()
      .find('button')
      .click()

    // Шаг 3: Проверяем, что начинка добавилась в конструктор
    cy.get('[class*="constructor-element"]')
      .contains('Биокотлета из марсианской говядины')
      .should('exist')
  })

  it('должен добавлять соус в конструктор', () => {
    // Шаг 1: Проверяем наличие элементов в конструкторе
    cy.get('[class*="constructor-element"]').should(($elements) => {
      // Если элементы есть, проверяем что среди них нет нашего соуса
      if ($elements.length > 0) {
        expect($elements.text()).to.not.include('Соус фирменный Space Sauce')
      }
    })

    // Шаг 2: Добавляем соус
    cy.contains('Соус фирменный Space Sauce')
      .parent()
      .find('button')
      .click()

    // Шаг 3: Проверяем, что соус добавился в конструктор
    cy.get('[class*="constructor-element"]')
      .contains('Соус фирменный Space Sauce')
      .should('exist')
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

  afterEach(() => {
    // Очищаем localStorage
    window.localStorage.clear()
    
    // Очищаем куки
    cy.clearCookies()
    cy.clearLocalStorage()
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