Cypress.Commands.add('loginByApi', () => {
  cy.request('POST', 'https://norma.nomoreparties.space/api/auth/login', {
    email: 'test_user@example.com',

    password: '12345678'
  }).then((res) => {
    const accessToken = res.body.accessToken.split('Bearer ')[1];
    const refreshToken = res.body.refreshToken;

    cy.setCookie('accessToken', accessToken);
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', refreshToken);
    });

    // Мокаем ответ /auth/user перед переходом на страницу профиля
    cy.intercept('GET', '**/api/auth/user', {
      statusCode: 200,
      body: {
        success: true,
        user: {
          email: 'test_user@example.com',
          name: 'Test User'
        }
      }
    }).as('getUser');
  });
});

Cypress.on('window:before:load', (win) => {
  cy.spy(win, 'fetch').as('fetchSpy');
});
