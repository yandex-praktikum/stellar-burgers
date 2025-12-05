import { TOrder } from '@utils-types';

export const mockOrder: TOrder = {
  _id: '64a1234567890abcdef12345',
  status: 'done',
  name: 'Space бургер',
  createdAt: '2024-12-03T10:00:00.000Z',
  updatedAt: '2024-12-03T10:00:00.000Z',
  number: 12345,
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa0942',
    '643d69a5c3f7b9001cfa093c'
  ]
};

export const mockOrderResponse = {
  success: true,
  order: mockOrder,
  name: 'Space бургер'
};
