import { getIngredientsApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'burgerConstructorSlice/getIngredientsApi',
  async () => await getIngredientsApi()
);
export const orderBurgerApiThunk = createAsyncThunk(
  'burgerConstructorSlice/orderBurgerApi',
  async (order: string[]) => await orderBurgerApi(order)
);
