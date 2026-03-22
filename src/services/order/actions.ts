import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';
import { RootState } from '../../services/store';

export const createOrder = createAsyncThunk<TOrder, void, { state: RootState }>(
  'order/createOrder',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { burgerConstructor } = getState();
      const { bun, ingredients } = burgerConstructor;

      const ingredientsID: string[] = [
        bun?._id!,
        ...ingredients.map((ing) => ing._id),
        bun?._id!
      ].filter(Boolean) as string[];

      const response = await orderBurgerApi(ingredientsID);

      if (!response.success) {
        return rejectWithValue('Ошибка создания заказа' as const);
      }
      return response.order;
    } catch (error) {
      return rejectWithValue('Не удалось создать заказ' as const);
    }
  }
);

export const getOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('order/getOrderByNumber', async (number, { rejectWithValue }) => {
  try {
    const response = await getOrderByNumberApi(number);
    if (!response.success || !response.orders?.length) {
      return rejectWithValue('Заказ не найден');
    }
    return response.orders[0];
  } catch (e) {
    return rejectWithValue('Не удалось получить заказ');
  }
});
