import { test, expect } from '@playwright/test';

test.describe('Конструктор бургеров', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false
    });

    await page.routeFromHAR('./tests/hars/user.har', {
      url: '**/api/auth/user',
      update: false
    });

    await page.goto('/');

    await expect(page.getByTestId('ingredient-card').first()).toBeVisible();
  });

  test('открытие модального окна ингредиента', async ({ page }) => {
    await page.getByTestId('ingredient-card').first().locator('a').click();
    const modal = page.getByRole('dialog');

    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Краторная булка N-200i');
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
      .filter({ hasText: 'Биокотлета из марсианской Магнолии' })
      .getByRole('button', { name: 'Добавить' })
      .click();

    const constructor = page.getByTestId('constructor-ingredients');

    await expect(constructor.locator('li')).toHaveCount(1);
    await expect(constructor).toContainText(
      'Биокотлета из марсианской Магнолии'
    );
  });
});

test.describe('Оформление заказа', () => {
  test.beforeEach(async ({ page, context }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false
    });

    await page.routeFromHAR('./tests/hars/user.har', {
      url: '**/api/auth/user',
      update: false
    });

    await page.routeFromHAR('./tests/hars/order.har', {
      url: '**/api/orders',
      update: false
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
    // булка
    await page
      .getByTestId('ingredient-card')
      .filter({ hasText: 'Краторная булка N-200i' })
      .getByRole('button', { name: 'Добавить' })
      .click();

    // начинка
    await page
      .getByTestId('ingredient-card')
      .filter({ hasText: 'Биокотлета из марсианской Магнолии' })
      .getByRole('button', { name: 'Добавить' })
      .click();

    // соус
    await page
      .getByTestId('ingredient-card')
      .filter({ hasText: 'Соус фирменный Space Sauce' })
      .getByRole('button', { name: 'Добавить' })
      .click();

    const orderButton = page.getByRole('button', {
      name: 'Оформить заказ'
    });

    await expect(orderButton).toBeEnabled();
    await orderButton.click();

    const modal = page.getByRole('dialog');

    await expect(modal).toBeVisible();

    await expect(page.getByTestId('order-number')).toHaveText('109091'); // или тот номер, который записан в твоем HAR

    await modal.getByTestId('modal-close').click();
    await expect(modal).toBeHidden();

    await expect(
      page.getByTestId('constructor-ingredients').locator('li')
    ).toHaveCount(0);

    // Дополнительно проверить, что булка тоже очищена
    await expect(page.getByText('Выберите булки')).toHaveCount(2);
  });
});
