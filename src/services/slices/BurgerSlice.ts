import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi, orderBurgerApi, getOrderByNumberApi } from '@api';
import { TIngredient, TConstructorIngredient, TOrder } from '@utils-types';

export type TBurgerState = {
  ingredients: TIngredient[];
  loading: boolean;
  ingredientsLoading: boolean;
  orderLoading: boolean;
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

export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('burger/fetchOrderByNumber', async (number, thunkAPI) => {
  try {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch order');
  }
});

const burgerInitialState: TBurgerState = {
  ingredients: [],
  ingredientsLoading: false,
  loading: false,
  orderLoading: false,
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

export const burgerSlice = createSlice({
  name: 'burger',
  initialState: burgerInitialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.constructorItems.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.constructorItems.ingredients.push(action.payload);
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
        state.ingredientsLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredientsLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.ingredientsLoading = false;
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
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.viewOrderData = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.orderLoading = false;
        state.error = action.payload || 'Failed to fetch order';
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

export const burgerReducer = burgerSlice.reducer;
