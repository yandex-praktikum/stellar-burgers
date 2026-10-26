import { test, expect } from '@playwright/test';

test.describe('add ingredients to constructor works correctly', function () {

  test.beforeEach(async ({ page }) => {
    //Берем ингредиенты из моковых данных
    await page.routeFromHAR('./e2e/hars/ingredients.har', {
      url: '**/ingredients',
      update: false, // Режим записи отключен
    });

    // Главная страница
    await page.goto('/');
  })


  test('Ингредиенты успешно загружаются из моковых данных', async ({ page }) => {
     // Проверяем, что лоадер исчез
    await expect(page.getByTestId('loading')).not.toBeVisible();

    // Проверяем, что ингредиенты загрузились
    const list = page.getByTestId('ingredients-list');
    await expect(list).toBeVisible();
  });

  test('Добавление булки в конструктор', async ({ page }) => {
    await expect(page.getByTestId('loading')).not.toBeVisible();

    // Карточка булки (Первая)
    const bunCard = page.locator('[data-testid^="ingredient-bun"]').first();

    // Название булки
    const bunName = await bunCard.getByTestId('ingredient-name').innerText();

    // Клик по кнопке Добавить
    await bunCard.getByRole('button', { name: 'Добавить' }).click();

    // Проверяем, что в конструкторе появилась эта булка
    const constructor = page.getByTestId('constructor-container');
    await expect(constructor).toContainText(bunName);
  });

  test('Добавление начинки в конструктор', async ({ page }) => {
    await expect(page.getByTestId('loading')).not.toBeVisible();

    // Карточка начинки
    const mainCard = page.locator('[data-testid^="ingredient-main"]').first();

    // Название начинки
    const mainName = await mainCard.getByTestId('ingredient-name').innerText();

    // Клик по кнопке Добавить
    await mainCard.getByRole('button', { name: 'Добавить' }).click();

    // Проверяем, что в конструкторе появилась эта начинка
    const constructor = page.getByTestId('constructor-container');
    await expect(constructor).toContainText(mainName);
  });


  //Модалка

  test('Модалка должна открываться и закрываться по клику на крестик', async ({ page }) => {
    // Карточка булки (Первая)
    const bunCard = page.locator('[data-testid^="ingredient-bun"]').first();

    //Берем имя булки до клика
    const bunName = await bunCard.getByTestId('ingredient-name').innerText();

    // Клик по карточке
    await bunCard.click();

    // Модалка открылась
    const modalTitle = page.getByTestId('modal-title');
    await expect(modalTitle).toBeVisible();

    const bunNameInModal = page.getByTestId('modal-ingredient-name');
    await expect(bunNameInModal).toBeVisible();
    await expect(bunNameInModal).toHaveText(bunName);

    // Клика на крестик
    await page.getByTestId('modal-close-button').click();

    // Модалка исчезает
    await expect(modalTitle).not.toBeVisible();
  });

  test('Модалка должна открываться и закрываться по клику на оверлэй', async ({ page }) => {
    // Карточка начинки (Первая)
    const mainCard = page.locator('[data-testid^="ingredient-main"]').first();
    //Берем имя начинки
    const mainName = await mainCard.getByTestId('ingredient-name').innerText();

    // Клик по карточке
    await mainCard.getByTestId('ingredient-name').click();

    // Модалка открылась
    const modalTitle = page.getByTestId('modal-title');
    await expect(modalTitle).toBeVisible();

    const mainNameInModal = page.getByTestId('modal-ingredient-name');
    await expect(mainNameInModal).toBeVisible();
    await expect(mainNameInModal).toHaveText(mainName);

    // Клика на крестик
    const modalOverlay = page.getByTestId('modal-overlay');
    await modalOverlay.click({ position: { x: 10, y: 10 } });

    // Модалка исчезает
    await expect(modalTitle).not.toBeVisible();
  });


  //Создание заказа

  test('Создания заказа авторизованным пользователем', async ({ page, context }) => {
    // Как будто есть авторизованный пользователь
    await context.addCookies([{
      name: 'accessToken',
      value: 'mock-test-access-token',
      domain: 'localhost',
      path: '/',
    }]);

    await page.evaluate(() => {
      localStorage.setItem('refreshToken', 'mock-test-refresh-token');
    });

    // // Перехват запроса на получение данных пользователя
    // await page.route('**/auth/user', async (route) => {
    //   await route.fulfill({
    //     status: 200,
    //     contentType: 'application/json',
    //     body: JSON.stringify({
    //       success: true,
    //       user: { email: 'test-user@mail.ru', name: 'Test Test' }
    //     }),
    //   });
    // });

    // // Перехват запроса на создание заказа
    // await page.route('**/orders', async (route) => {
    //   await route.fulfill({
    //     status: 200,
    //     contentType: 'application/json',
    //     body: JSON.stringify({
    //       success: true,
    //       order: { number: 9999 } // номер заказа для проверки
    //     }),
    //   });
    // });

    //Запрос на получение данных пользователя из моковых данных поль-ля user.har
    await page.routeFromHAR('./e2e/hars/user.har', {
      url: '**/auth/user',
      update: false, // Режим записи отключен
    });

    //Запрос на создание заказа из моковых данных order.har
    await page.routeFromHAR('./e2e/hars/order.har', {
      url: '**/orders',
      update: false, // Режим записи отключен
    });



    // Перезагружаем страницу, чтобы применились куки и сработали наши моковые роуты
    await page.reload();
    await expect(page.getByTestId('loading')).not.toBeVisible();

    // Конструктор бургера
    const bunCard = page.locator('[data-testid^="ingredient-bun"]').first();
    await bunCard.getByRole('button', { name: 'Добавить' }).click();

    const mainCard = page.locator('[data-testid^="ingredient-main"]').first();
    await mainCard.getByRole('button', { name: 'Добавить' }).click();

    // Клик по кнопке «Оформить заказ»
    const constructorContainer = page.getByTestId('constructor-container');
    await constructorContainer.getByRole('button', { name: 'Оформить заказ' }).click();

    // Проверка оформленного заказа и номер заказа верный
    const orderNumberLocator = page.getByTestId('order-number');
    await expect(orderNumberLocator).toBeVisible();
    await expect(orderNumberLocator).toHaveText('9999'); // Проверка номера заказа

    // Закрыть модальное окно через крестик
    await page.getByTestId('modal-close-button').click();
    await expect(orderNumberLocator).not.toBeVisible();

    // Проверка, что конструктор пуст (вернулись стандартные заглушки)
    await expect(constructorContainer).toContainText('Выберите булки');
    await expect(constructorContainer).toContainText('Выберите начинку');
  });



});
