import { combineReducers, configureStore } from '@reduxjs/toolkit';
import builderReducer from '../slices/builderSlice';
import ingredientsReducer from '../slices/ingredientsListSlice';
import orderReducer from '../slices/orderSlice';
import userReducer from '../slices/userSlice';
import { feedReducer } from '../slices/feedSlice';

test('тестирование стора', () => {
  const rootReducer = combineReducers({
    builder: builderReducer,
    feed: feedReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
    user: userReducer
  });

  const store = configureStore({
    reducer: rootReducer
  });

  expect(store.getState()).toEqual(
    rootReducer(undefined, { type: 'UNKNOWN_ACTION' })
  );
});
