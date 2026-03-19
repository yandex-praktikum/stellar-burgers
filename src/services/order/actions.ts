import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
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
