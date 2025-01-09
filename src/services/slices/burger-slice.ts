import {
  getFeedsApi,
  getIngredientsApi,
  getOrderByNumberApi,
  orderBurgerApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export const getIngredientsApiThunk = createAsyncThunk(
  'burger/getIngredients',
  async () => getIngredientsApi()
);

export const getFeedsApiThunk = createAsyncThunk('orders/getFeeds', () =>
  getFeedsApi()
);

export const orderBurgerApiThunk = createAsyncThunk(
  'order/create',
  async (ingridientIds: string[]) => {
    console.log(ingridientIds);
    const result = await orderBurgerApi(ingridientIds);
    console.log(result);
    return result;
  }
);

export const getOrderByNumberApiThunk = createAsyncThunk(
  'order/get',
  (id: number) => getOrderByNumberApi(id)
);

export interface BurgerState {
  ingredients: TIngredient[];
  isLoading: boolean;
  feed: {
    orders: TOrder[];
    total: number;
    totalToday: number;
  };
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: BurgerState = {
  ingredients: [],
  isLoading: false,
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,

  selectors: {
    getIngredients: (state) => state.ingredients,
    getConstructorItems: (state) => state.constructorItems,
    getFeed: (state) => state.feed,
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  reducers: {
    addIngridient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.constructorItems.ingredients.push(action.payload);
    },
    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.constructorItems.bun = action.payload;
    },
    moveUp: (state, action: PayloadAction<TConstructorIngredient>) => {
      const ingridients = state.constructorItems.ingredients;
      const ingridient = action.payload;

      const index = ingridients.findIndex((x) => x.id === ingridient.id);
      if (index <= 0) {
        return;
      }
      const prevItem = ingridients[index - 1];
      ingridients[index - 1] = ingridient;
      ingridients[index] = prevItem;
    },

    moveDown: (state, action: PayloadAction<TConstructorIngredient>) => {
      const ingridients = state.constructorItems.ingredients;
      const ingridient = action.payload;
      const feed = state.feed;

      const index = ingridients.findIndex((x) => x.id === ingridient.id);
      if (index < 0 || index >= ingridients.length - 1) {
        return;
      }
      const nextItem = ingridients[index + 1];
      ingridients[index + 1] = ingridient;
      ingridients[index] = nextItem;
    },

    deleteIngridient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingridients = state.constructorItems.ingredients;
      const ingridient = action.payload;
      const index = ingridients.findIndex((x) => x.id === ingridient.id);
      ingridients.splice(index, 1);
    },

    closeOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    // getIngredients
    builder.addCase(getIngredientsApiThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIngredientsApiThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getIngredientsApiThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
    });
    //getOrders
    builder.addCase(getFeedsApiThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFeedsApiThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getFeedsApiThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.feed = action.payload;
    });
    // orderBurgerApiThunk
    builder.addCase(orderBurgerApiThunk.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(orderBurgerApiThunk.rejected, (state) => {
      state.orderRequest = false;
    });
    builder.addCase(orderBurgerApiThunk.fulfilled, (state, action) => {
      state.orderRequest = false;
      state.orderModalData = action.payload.order;
      state.constructorItems.bun = null;
      state.constructorItems.ingredients.splice(
        0,
        state.constructorItems.ingredients.length
      );
    });
    //getOrderByNumberApiThunk
    builder.addCase(getOrderByNumberApiThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderByNumberApiThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getOrderByNumberApiThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderModalData = action.payload.orders[0];
    });
  }
});

export const {
  addIngridient,
  setBun,
  moveUp,
  moveDown,
  deleteIngridient,
  closeOrderModal
} = burgerSlice.actions;
export const burgerReducer = burgerSlice.reducer;
