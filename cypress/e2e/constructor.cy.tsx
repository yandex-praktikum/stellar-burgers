describe('Проверка функциональности конструктора бургера', () => {
  const url = 'http://localhost:4000';

  it('Сервер должен быть доступен по адресу: localhost:4000', () => {
    cy.visit(url);
  });

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', (req) => {
      req.reply({
        fixture: 'ingredients.json'
      });
    }).as('getIngredients');

    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.setCookie('accessToken', 'mockAccessToken');
    localStorage.setItem('refreshToken', 'mockRefreshToken');

    cy.visit(url);
  });

  afterEach(() => {
    cy.setCookie('accessToken', '');
    localStorage.setItem('refreshToken', '');
  });

  describe('Тестирование работы модальных окон', () => {
    beforeEach(() => {
      cy.get('[data-cy=ingredients-category]')
        .find('li')
        .first()
        .as('ingredient');
    });

    it('открытие модального окна ингредиента', () => {
      cy.get('[data-cy=modal]').should('not.exist');
      cy.get('@ingredient').click();
      cy.get('[data-cy=modal]').should('be.visible');
      cy.contains('Детали ингридиента').should('exist');
    });
    it('закрытие по клику на крестик', () => {
      cy.get('@ingredient').click();
      cy.get('[data-cy=modal]').should('be.visible');
      cy.get('[data-cy=close-button]').click();
      cy.get('[data-cy=modal]').should('not.exist');
    });
    it('закрытие по клику на оверлей', () => {
      cy.get('@ingredient').click();
      cy.get('[data-cy=modal]').should('be.visible');
      cy.get('[data-cy=overlay]').click({ force: true });
      cy.get('[data-cy=modal]').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    describe('Добавление ингредиентов в конструктор бургера', () => {
      it('Добавление булки', () => {
        cy.get('div').contains('Выберите булки').should('exist');
        const buttonAddBun = cy
          .get('h3')
          .contains('Булки')
          .next('ul')
          .contains('Добавить');
        buttonAddBun.click();
        cy.get('div').contains('Выберите булки').should('not.exist');
      });

      it('Добавление начинки', () => {
        cy.get('div').contains('Выберите начинку').should('exist');
        const buttonAddMain = cy
          .get('h3')
          .contains('Начинки')
          .next('ul')
          .contains('Добавить');
        buttonAddMain.click();
        cy.get('div').contains('Выберите начинку').should('not.exist');
      });
      it('Добавление соусов', () => {
        cy.get('div').contains('Выберите начинку').should('exist');
        const buttonAddSauce = cy
          .get('h3')
          .contains('Соусы')
          .next('ul')
          .contains('Добавить');
        buttonAddSauce.click();
        cy.get('div').contains('Выберите начинку').should('not.exist');
      });
    });

    it('Оформление заказа', () => {
      cy.intercept('POST', 'api/orders', {
        fixture: 'order.json'
      }).as('postOrders');

      cy.get('[data-cy=modal]').should('not.exist');

      const buttonAddBun = cy
        .get('h3')
        .contains('Булки')
        .next('ul')
        .contains('Добавить');
      const buttonAddMain = cy
        .get('h3')
        .contains('Начинки')
        .next('ul')
        .contains('Добавить');
      const buttonAddSauce = cy
        .get('h3')
        .contains('Соусы')
        .next('ul')
        .contains('Добавить');
      buttonAddBun.click();
      buttonAddMain.click();
      buttonAddSauce.click();
      const buttonMakeOrder = cy.contains('Оформить заказ');
      buttonMakeOrder.click();

      cy.get('[data-cy=modal]').should('be.visible');
      cy.contains('60185').should('exist');

      cy.get('[data-cy=close-button]').click();
      cy.get('[data-cy=modal]').should('not.exist');
      cy.contains('60185').should('not.exist');

      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });
  });
});