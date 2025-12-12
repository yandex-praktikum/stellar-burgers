import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getIngredientsApi,
  getFeedsApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import {
  TIngredient,
  TConstructorIngredient,
  TOrder,
  TOrdersData
} from '@utils-types';

export type TBurgerState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  selectedIngredient: TIngredient | null;
  selectedOrderData: TOrder | null;
  viewOrderData: TOrder | null;
};

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

export const fetchIngredients = createAsyncThunk<
  TIngredient[],
  void, 
  { rejectValue: string }
>('burger/fetchIngredients', async (_, thunkAPI) => {
  try {
    const response = await getIngredientsApi();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch ingredients');
  }
});

export const createOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('burger/createOrder', async (ingredientIds, thunkAPI) => {
  try {
    const response = await orderBurgerApi(ingredientIds);
    return response.order;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to create order');
  }
});

export const fetchFeeds = createAsyncThunk<
  TOrdersData,
  void,
  { rejectValue: string }
>('feed/fetchFeeds', async (_, thunkAPI) => {
  try {
    const response = await getFeedsApi();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch feeds');
  }
});

export const fetchOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('feed/fetchOrders', async (_, thunkAPI) => {
  try {
    const response = await getOrdersApi();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch orders');
  }
});

const burgerInitialState: TBurgerState = {
  ingredients: [],
  loading: false,
  error: null,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  selectedIngredient: null,
  selectedOrderData: null,
  viewOrderData: null
};

const feedInitialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState: burgerInitialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.constructorItems.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TIngredient>) {
      const constructorIngredient: TConstructorIngredient = {
        ...action.payload,
        id: `${action.payload._id}_${Date.now()}_${Math.random()}`
      };
      state.constructorItems.ingredients.push(constructorIngredient);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item: TConstructorIngredient) => item.id !== action.payload
        );
    },
    clearConstructor(state) {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    },
    setOrderRequest(state, action: PayloadAction<boolean>) {
      state.orderRequest = action.payload;
    },
    setOrderModalData(state, action: PayloadAction<TOrder | null>) {
      state.orderModalData = action.payload;
    },
    clearOrderModalData: (state) => {
      state.orderModalData = null;
    },
    setSelectedIngredient(state, action: PayloadAction<TIngredient | null>) {
      state.selectedIngredient = action.payload;
    },
    moveIngredient(
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedIngredient = state.constructorItems.ingredients[dragIndex];

      state.constructorItems.ingredients.splice(dragIndex, 1);
      state.constructorItems.ingredients.splice(
        hoverIndex,
        0,
        draggedIngredient
      );
    },
    setSelectedOrderData(state, action: PayloadAction<TOrder | null>) {
      state.selectedOrderData = action.payload;
    },
    clearSelectedOrderData: (state) => {
      state.selectedOrderData = null;
    },
    setViewOrderData(state, action: PayloadAction<TOrder | null>) {
      state.viewOrderData = action.payload;
    },
    clearViewOrderData: (state) => {
      state.viewOrderData = null;
    },
    clearAllModals: (state) => {
      state.orderModalData = null;
      state.viewOrderData = null;
      state.selectedOrderData = null;
      state.selectedIngredient = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.payload || 'Failed to create order';
      });
  }
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState: feedInitialState,
  reducers: {
    setOrders(state, action: PayloadAction<TOrder[]>) {
      state.orders = action.payload;
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    setTotalToday(state, action: PayloadAction<number>) {
      state.totalToday = action.payload;
    },
    clearFeed(state) {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    },
    updateOrderStatus(
      state,
      action: PayloadAction<{ orderId: string; status: string }>
    ) {
      const { orderId, status } = action.payload;
      const orderIndex = state.orders.findIndex(
        (order: TOrder) => order._id === orderId
      );
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = status;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  clearConstructor,
  setOrderRequest,
  setOrderModalData,
  setSelectedIngredient,
  moveIngredient,
  clearOrderModalData,
  setSelectedOrderData,
  clearSelectedOrderData,
  setViewOrderData,
  clearViewOrderData,
  clearAllModals
} = burgerSlice.actions;

export const {
  setOrders,
  setTotal,
  setTotalToday,
  clearFeed,
  updateOrderStatus
} = feedSlice.actions;

export const burgerReducer = burgerSlice.reducer;
export const feedReducer = feedSlice.reducer;
