import { combineReducers } from '@reduxjs/toolkit';

import constructorReducer from '../services/slices/constructorSlice';
import feedsReducer from '../services/slices/feedsSlice';
import ingredientsReducer from '../services/slices/ingredientsSlice';
import userOrdersReducer from '../services/slices/userOrdersSlice';
import userReducer from '../services/slices/userSlice';

// TODO: Заменить на настоящий корневой редьюсер
// export const rootReducer = (): Record<string, never> => ({
export const rootReducer = combineReducers({
  // TODO: Собрать здесь редьюсеры слайсов
  ingredients: ingredientsReducer, //это - ingredientsSlice
  user: userReducer,
  feeds: feedsReducer,
  userOrders: userOrdersReducer,
  burgerConstructor: constructorReducer,
});
