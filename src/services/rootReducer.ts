import { combineReducers } from '@reduxjs/toolkit';

import { feedsSlice } from './slices/feeds';
import { newOrderSlice } from './slices/newOrder';
import { constructorSlice } from './slices/constructor';
import { userSlice } from './slices/user';
import { userOrdersSlice } from './slices/userOrders';
import { ingredientsSlice } from './slices/ingredients';

export const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer,
  [newOrderSlice.name]: newOrderSlice.reducer,
  [userOrdersSlice.name]: userOrdersSlice.reducer
});
