import { getFeedsApi, getIngredientsApi, orderBurgerApi } from '@api';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';
import { create } from 'domain';

type TBurgerState = {
  constructorItems: {
    bun: Object;
    ingredients: TIngredient[];
  };
  allIngredients: TIngredient[];
  isLoading: boolean;
  orderModalData: TOrder | null;
  isError: boolean;
  errorText: string | undefined;
  orderResponse: TOrder | null;
  modalIsClosed: boolean;
};

const initialState: TBurgerState = {
  constructorItems: {
    bun: {
      price: 0
    },
    ingredients: []
  },
  allIngredients: [],
  orderModalData: null,
  isLoading: false,
  isError: false,
  errorText: '',
  orderResponse: null,
  modalIsClosed: true
};

export const fetchIngredients = createAsyncThunk(
  'burger/getIngredients',
  async () => await getIngredientsApi()
);

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addBun: (state: TBurgerState, action) => {
      state.constructorItems.bun = action.payload;
    },
    addIngredient: (state: TBurgerState, action) => {
      state.constructorItems.ingredients.push(action.payload);
    },
    deleteIngredient: (state: TBurgerState, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient: TIngredient) => ingredient._id !== action.payload._id
        );
    },
    moveDown: (state: TBurgerState, action) => {
      let firstIndex = action.payload;
      let secondIndex = firstIndex + 1;
      let firstIngredient = state.constructorItems.ingredients[firstIndex];
      let secondIngredient = state.constructorItems.ingredients[secondIndex];
      state.constructorItems.ingredients[firstIndex] = secondIngredient;
      state.constructorItems.ingredients[secondIndex] = firstIngredient;
    },
    moveUp: (state: TBurgerState, action) => {
      let firstIndex = action.payload;
      let secondIndex = firstIndex - 1;
      let firstIngredient = state.constructorItems.ingredients[firstIndex];
      let secondIngredient = state.constructorItems.ingredients[secondIndex];
      state.constructorItems.ingredients[firstIndex] = secondIngredient;
      state.constructorItems.ingredients[secondIndex] = firstIngredient;
    },
    closeModal: (state: TBurgerState) => {
      state.modalIsClosed = true;
    },
    openModal: (state: TBurgerState) => {
      state.modalIsClosed = false;
    }
  },
  selectors: {
    selectIsLoading: (state: TBurgerState) => state.isLoading,
    selectConstructorItems: (state: TBurgerState) => state.constructorItems,
    selectAllIngredients: (state: TBurgerState) => state.allIngredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state: TBurgerState) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state: TBurgerState) => {
        state.isLoading = false;
      })
      .addCase(fetchIngredients.fulfilled, (state: TBurgerState, action) => {
        state.isLoading = false;
        state.allIngredients = action.payload;
      });
  }
});

export default burgerSlice;

export const {
  addBun,
  addIngredient,
  deleteIngredient,
  moveDown,
  moveUp,
  closeModal,
  openModal
} = burgerSlice.actions;

export const { selectIsLoading, selectConstructorItems, selectAllIngredients } =
  burgerSlice.selectors;
