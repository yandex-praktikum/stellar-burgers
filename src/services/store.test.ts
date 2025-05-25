import { rootReducer } from './store';
import {
  ingredientsSlice,
  constructorSlice,
  feedSlice,
  userSlice,
  ordersSlice
} from '@slices';

describe('начальное состояние rootReducer', () => {
  it('начальное состояние', () => {
    const initialState = rootReducer(undefined, { type: 'unknown' });
    expect(initialState.ingredients).toEqual(
      ingredientsSlice.getInitialState()
    );
    expect(initialState.constructorIngredients).toEqual(
      constructorSlice.getInitialState()
    );
    expect(initialState.feeds).toEqual(feedSlice.getInitialState());
    expect(initialState.user).toEqual(userSlice.getInitialState());
    expect(initialState.orders).toEqual(ordersSlice.getInitialState());
  });
});
