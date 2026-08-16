import { test, expect } from '@playwright/test';

test.describe('Конструктор бургеров', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('открытие модального окна ингредиента', async ({ page }) => {
    await page.getByTestId('ingredient-card').first().locator('a').click();

    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('закрытие модального окна по крестику', async ({ page }) => {
    await page.getByTestId('ingredient-card').first().locator('a').click();

    await expect(page.getByRole('dialog')).toBeVisible();

    await page.getByTestId('modal-close').click();

    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('закрытие модального окна по оверлею', async ({ page }) => {
    await page.getByTestId('ingredient-card').first().locator('a').click();

    await expect(page.getByRole('dialog')).toBeVisible();

    await page.mouse.click(10, 10);

    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('добавление ингредиента в конструктор', async ({ page }) => {
    await page
      .getByTestId('ingredient-card')
      .nth(2)
      .getByRole('button', { name: 'Добавить' })
      .click();

    await expect(
      page.getByTestId('constructor-ingredients').locator('li')
    ).toHaveCount(1);
  });
});

test.describe('Оформление заказа', () => {
  test.beforeEach(async ({ page, context }) => {
    // Ингредиенты из HAR
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false
    });

    // Авторизованный пользователь
    await page.route('**/api/auth/user', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          user: {
            email: 'test@test.ru',
            name: 'Test User'
          }
        })
      });
    });

    // Создание заказа
    await page.route('**/api/orders', async (route) => {
      if (route.request().method() !== 'POST') {
        return route.fallback();
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          name: 'Test Burger',
          order: {
            _id: '1',
            status: 'done',
            name: 'Test Burger',
            number: 12345,
            price: 1000,
            createdAt: '',
            updatedAt: '',
            owner: {
              name: 'Test User',
              email: 'test@test.ru',
              createdAt: '',
              updatedAt: ''
            }
          }
        })
      });
    });

    await context.addCookies([
      {
        name: 'accessToken',
        value: 'Bearer test-access-token',
        url: 'http://localhost:4000'
      }
    ]);

    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    await page.goto('/');

    await expect(page.getByTestId('ingredient-card').first()).toBeVisible();
  });

  test('создание заказа', async ({ page }) => {
    await page
      .getByTestId('ingredient-card')
      .first()
      .getByRole('button', { name: 'Добавить' })
      .click();

    await page
      .getByTestId('ingredient-card')
      .nth(2)
      .getByRole('button', { name: 'Добавить' })
      .click();

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    await expect(page.getByRole('dialog')).toBeVisible();

    await expect(page.getByTestId('order-number')).toHaveText('12345');

    await page.getByTestId('modal-close').click();

    await expect(page.getByRole('dialog')).toHaveCount(0);

    await expect(
      page.getByTestId('constructor-ingredients').locator('li')
    ).toHaveCount(0);
  });
});
