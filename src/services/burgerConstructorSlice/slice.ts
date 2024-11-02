import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchIngredients, orderBurgerApiThunk } from './thunk';
import { TIngredient, TConstructorIngredient, TOrder } from '@utils-types';

export interface IngredientsState {
  isIngredientsLoading: boolean;
  ingredients: TIngredient[];
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: {
    isRequesting: boolean;
    order: TOrder[];
    orderModalData: TOrder | null;
  };
}

const initialState: IngredientsState = {
  isIngredientsLoading: false,
  ingredients: [],
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: {
    isRequesting: false,
    order: [],
    orderModalData: null
  }
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    toggleBun(state, action: PayloadAction<TIngredient | null>) {
      state.constructorItems.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.constructorItems.ingredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<number>) {
      state.constructorItems.ingredients.splice(action.payload, 1);
    },
    resetOrder(state) {
      state.orderRequest.order = [];
      state.orderRequest.orderModalData = null;
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
        state.ingredients = payload;
        state.isIngredientsLoading = false;
      })
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.ingredients = [];
        state.isIngredientsLoading = false;
      })
      .addCase(orderBurgerApiThunk.fulfilled, (state, { payload }) => {
        state.orderRequest.isRequesting = false;
        state.orderRequest.order = [];
        state.orderRequest.orderModalData = payload.order;
      })
      .addCase(orderBurgerApiThunk.pending, (state) => {
        state.orderRequest.isRequesting = true;
      })
      .addCase(orderBurgerApiThunk.rejected, (state) => {
        state.orderRequest.isRequesting = false;
        state.orderRequest.order = [];
      });
  }
});

export const { toggleBun, addIngredient, removeIngredient, resetOrder } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
