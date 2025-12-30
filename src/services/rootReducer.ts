import { combineReducers } from 'redux';
import { burgerSlice } from './slices/BurgerSlice';

export const rootReducer = combineReducers({
  burger: burgerSlice.reducer
});
