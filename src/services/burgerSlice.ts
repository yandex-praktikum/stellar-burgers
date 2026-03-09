import {
  getFeedsApi,
  getIngredientsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  TRegisterData
} from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export const getIngredientsThunk = createAsyncThunk(
  'burgers/getIngredientsThunk',
  async () => getIngredientsApi()
);

export const getFeedsThunk = createAsyncThunk(
  'burgers/getFeedsThunk',
  async () => getFeedsApi()
);

export const getOrdersThunk = createAsyncThunk(
  'auth/getOrdersThunk',
  async () => getOrdersApi()
);

// Post запрос отправки заказа, нужна авторизация

export const orderBurgerThunk = createAsyncThunk(
  'auth/orderBurgerThunk',
  async (data: string[]) => orderBurgerApi(data)
);

// Get запрос, авторизация не нужна

export const getOrderByNumberThunk = createAsyncThunk(
  'burgers/getOrderByNumberThunk',
  async (number: number) => getOrderByNumberApi(number) // число тестовое
);

type TInitialState = {
  ingridients: Array<TIngredient>;
  feed: {};
  orders: Array<TOrder>;
  loading: boolean;
  orderRequest: boolean;
  orderData: TOrder | undefined;
  ingredientData: TIngredient | undefined;
  constructorItems: {
    bun: TIngredient;
    ingredients: TConstructorIngredient[];
  };
  myOrders: Array<TOrder>;
  myOrderModalData: TOrder;
};

const initialState: TInitialState = {
  ingridients: [],
  loading: false,
  orderRequest: false,
  feed: {},
  orders: [],
  orderData: {
    createdAt: '',
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  },
  ingredientData: {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_large: '',
    image_mobile: ''
  },
  constructorItems: {
    bun: {
      _id: '',
      name: '',
      type: '',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: '',
      image_large: '',
      image_mobile: ''
    },
    ingredients: []
  },
  myOrders: [],
  myOrderModalData: {
    _id: '',
    status: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 0,
    ingredients: []
  }
};

const burgerSlice = createSlice({
  name: 'burgers',
  initialState,
  reducers: {
    setOrderToModal: (state, action) => {
      state.orderData = state.orders.find(
        (order) => order.number === action.payload
      );
    },
    setIngridientToModal: (state, action) => {
      state.ingredientData = state.ingridients.find(
        (el) => el._id === action.payload
      );
    },
    addIngridientsToOrder: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    moveUpIngridient: (state, action) => {
      state.constructorItems.ingredients.splice(action.payload.index, 1);
      state.constructorItems.ingredients.splice(
        action.payload.index - 1,
        0,
        action.payload.ingredient
      );
    },

    moveDownIngridient: (state, action) => {
      state.constructorItems.ingredients.splice(action.payload.index, 1);
      state.constructorItems.ingredients.splice(
        action.payload.index + 1,
        0,
        action.payload.ingredient
      );
    },

    deleteIngridientInOrder: (state, action) => {
      state.constructorItems.ingredients.splice(action.payload, 1);
    },

    resetOrderData: (state) => {
      state.myOrderModalData = {
        _id: '',
        status: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 0,
        ingredients: []
      };
    },

    resetConstructor: (state) => {
      state.constructorItems = {
        bun: {
          _id: '',
          name: '',
          type: '',
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        ingredients: []
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ingridients = action.payload;
      })
      .addCase(getIngredientsThunk.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
        state.orders = action.payload.orders;
      })
      .addCase(getFeedsThunk.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(getOrdersThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      });
    builder
      .addCase(orderBurgerThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(orderBurgerThunk.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders.push(action.payload.order);
        state.myOrderModalData = action.payload.order;
      });
    builder
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderByNumberThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload.orders[0];
      });
  }
});

export const burgerReducer = burgerSlice.reducer;
export const {
  setOrderToModal,
  setIngridientToModal,
  addIngridientsToOrder,
  moveUpIngridient,
  moveDownIngridient,
  deleteIngridientInOrder,
  resetOrderData,
  resetConstructor
} = burgerSlice.actions;
