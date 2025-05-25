import { orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

type IngredientsState = {
  constructor: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  buyBurgerStatus: boolean;
  orderData: TOrder | null;
};

const initialState: IngredientsState = {
  constructor: {
    bun: null,
    ingredients: []
  },
  buyBurgerStatus: false,
  orderData: null
};

export const BuyBurgerThunk = createAsyncThunk(
  'feeds/buyBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const constructorSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructor.bun = action.payload;
        } else {
          state.constructor.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructor.ingredients = state.constructor.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index <= 0 || index >= state.constructor.ingredients.length) return;
      const temp = state.constructor.ingredients[index];
      state.constructor.ingredients[index] =
        state.constructor.ingredients[index - 1];
      state.constructor.ingredients[index - 1] = temp;
    },
    moveDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < 0 || index >= state.constructor.ingredients.length - 1)
        return;
      const temp = state.constructor.ingredients[index];
      state.constructor.ingredients[index] =
        state.constructor.ingredients[index + 1];
      state.constructor.ingredients[index + 1] = temp;
    },
    clearConstructor: (state) => {
      state.orderData = null;
      state.constructor.bun = null;
      state.constructor.ingredients = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(BuyBurgerThunk.pending, (state) => {
        state.buyBurgerStatus = true;
      })
      .addCase(BuyBurgerThunk.fulfilled, (state, action) => {
        state.buyBurgerStatus = false;
        state.orderData = action.payload.order;
      })
      .addCase(BuyBurgerThunk.rejected, (state, action) => {
        state.buyBurgerStatus = false;
        console.error(state, action);
      });
  },
  selectors: {
    getConstructorIngredients: (state) => state.constructor,
    getStatusBuyBurger: (state) => state.buyBurgerStatus,
    getOrderData: (state) => state.orderData
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveUp,
  moveDown,
  clearConstructor
} = constructorSlice.actions;
export const { getConstructorIngredients, getStatusBuyBurger, getOrderData } =
  constructorSlice.selectors;
export { initialState as initialStateConstructor };
