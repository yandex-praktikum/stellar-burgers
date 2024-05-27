import { combineReducers } from 'redux';
import ingredientsReducer from '../slices/ingredientsSlice';
import constructorReducer from '../slices/constructorSlice';
import userReducer from '../slices/userSlice';
import feedsReducer from '../slices/feedsSlice';
import orderReducer from '../slices/orderSlice';
import orderDetails from '../slices/orderDetailsSlice';

export const rootReducer = combineReducers({
  burgerIngredients: ingredientsReducer,
  constructorItems: constructorReducer,
  user: userReducer,
  feeds: feedsReducer,
  order: orderReducer,
  orderDetails: orderDetails
});
