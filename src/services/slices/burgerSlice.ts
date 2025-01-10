import { getFeedsApi, getIngredientsApi } from '@api';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

const initialState: {
  constructorItems: {
    bun: Object;
    ingredients: TIngredient[];
  };
  allIngredients: TIngredient[];
  isLoading: boolean;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isError: boolean;
} = {
  constructorItems: {
    bun: {
      price: 0
    },
    ingredients: []
  },
  allIngredients: [],
  orderRequest: false,
  orderModalData: null,
  isLoading: false,
  isError: false
};

export const fetchIngredients = createAsyncThunk(
  'burger/getIngredients',
  async () => await getIngredientsApi()
);

const burgerSlice = createSlice({
  name: 'burgerSlice',
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.constructorItems.bun = action.payload;
    },
    addIngredient: (state, action) => {
      state.constructorItems.ingredients.push(action.payload);
    },
    deleteIngredient: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient: TIngredient) => ingredient._id !== action.payload._id
        );
    },
    moveDown: (state, action) => {
      let firstIndex = action.payload;
      let secondIndex = firstIndex + 1;
      let firstIngredient = state.constructorItems.ingredients[firstIndex];
      let secondIngredient = state.constructorItems.ingredients[secondIndex];
      state.constructorItems.ingredients[firstIndex] = secondIngredient;
      state.constructorItems.ingredients[secondIndex] = firstIngredient;
    },
    moveUp: (state, action) => {
      let firstIndex = action.payload;
      let secondIndex = firstIndex - 1;
      let firstIngredient = state.constructorItems.ingredients[firstIndex];
      let secondIngredient = state.constructorItems.ingredients[secondIndex];
      state.constructorItems.ingredients[firstIndex] = secondIngredient;
      state.constructorItems.ingredients[secondIndex] = firstIngredient;
    }
  },
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectConstructorItems: (state) => state.constructorItems,
    selectOrderRequest: (state) => state.orderRequest,
    selectModalOrderData: (state) => state.orderModalData,
    selectAllIngredients: (state) => state.allIngredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allIngredients = action.payload;
      });
  }
});

export default burgerSlice.reducer;

export const { addBun, addIngredient, deleteIngredient, moveDown, moveUp } =
  burgerSlice.actions;

export const {
  selectIsLoading,
  selectConstructorItems,
  selectOrderRequest,
  selectModalOrderData,
  selectAllIngredients
} = burgerSlice.selectors;
