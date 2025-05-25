export const testBun = {
  _id: 'bun2',
  name: 'Булка 2',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

export const testIngredient = {
  _id: 'main1',
  name: 'Мясо 1',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

export const testSouce = {
  _id: 'sauce1',
  name: 'Соус 1',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

export const testOrder1 = {
  _id: 'feedId2',
  ingredients: ['bun2', 'sauce1', 'bun2'],
  status: 'done',
  name: 'Тестовый бургер 1',
  createdAt: '2025-04-29T16:32:54.807Z',
  updatedAt: '2025-04-29T16:32:55.674Z',
  number: 75877
};

export const testOrder2 = {
  _id: 'feedId1',
  ingredients: ['bun2', 'sauce1', 'bun2'],
  status: 'done',
  name: 'Тестовый бургер 2',
  createdAt: '2025-04-29T16:33:54.807Z',
  updatedAt: '2025-04-29T16:33:55.674Z',
  number: 75877
};
