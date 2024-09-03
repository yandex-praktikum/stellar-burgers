import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredientsSlice';
import profileReducer from '../slices/profileSlice';
import ordersReducer from '../slices/ordersSlice';
import burgerConstructorReducer from '../slices/burgerConstructorSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer, // Редьюсер для управления ингредиентами
  profile: profileReducer, // Редьюсер для управления профилем пользователя
  orders: ordersReducer, // Редьюсер для управления заказами
  burgerConstructor: burgerConstructorReducer // Редьюсер для управления конструктором бургера
});

export default rootReducer;
