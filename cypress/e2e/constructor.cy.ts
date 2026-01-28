describe('проверяем доступность приложения', function () {
  beforeEach(function () {
    // Настройка перехвата запросов во всех тестах - обязательное требование
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });
  it('добавляет ингредиент в конструктор', () => {
    // проверка конструктора на ингридиенты
    cy.wait('@ingredients');

    cy.get("[data-cy='constructor'] li").should('have.length', 0);

    cy.get("[data-cy='01']").find('button').click();
    cy.get("[data-cy='02']").find('button').click();

    cy.get("[data-cy='constructor'] li").should('have.length', 1);
    // --------------------------------------

    // Проверка контркутора на булки

    cy.get("[data-cy='01']").find('button').click();
    cy.get("[data-cy='bun']").should('have.length', 2);
  });
});

describe('проверяем модалку', function () {
  beforeEach(function () {
    // Настройка перехвата запросов во всех тестах - обязательное требование
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });
  it('закрытие модалки на крестик', () => {
    cy.wait('@ingredients');
    cy.get("[data-cy='02']").click();

    // вижу ваш комментарий по поводу этого компонента ибо он не открываеться у вас но я не вижу причины почему он не открываеться ибо у меня все работает исправно открываеться модалка карточки и потом закрываеться, в компоненте бургер конструктор указана дата элементам и она береться с ингридиента его айди

    // тут я нажимаю на элемент по содержимому надеюсь оно будет работать ибо у меня работает )

    cy.get("[data-cy='modal']").should('be.visible');
    cy.get("[data-cy='modal']").contains('Начинка для бургера');
    cy.get("[data-cy='modal']").find('button').click();
    cy.get("[data-cy='modal']").should('not.exist');
  });
});

describe('проверка создания заказа', () => {
  beforeEach(function () {
    // Настройка перехвата запросов во всех тестах - обязательное требование
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('user');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('order');
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000', {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
        win.document.cookie = 'accessToken=test-access-token; path=/';
      }
    });
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('создаем заказ с моковыми данными', () => {
    cy.wait('@ingredients');
    cy.wait('@user');

    cy.get("[data-cy='01']").find('button').click();
    cy.get("[data-cy='02']").find('button').click();

    cy.contains('Оформить заказ').click();
    cy.wait('@order');

    cy.get("[data-cy='modal']").should('be.visible');
    cy.get("[data-cy='modal']").contains('12345');

    cy.get("[data-cy='modal']").find('button').click();
    cy.get("[data-cy='modal']").should('not.exist');

    cy.get("[data-cy='constructor'] li").should('have.length', 0);
    cy.get("[data-cy='bun']").should('not.exist');
  });
});
