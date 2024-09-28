import { rootReducer } from './store';
import { initialState as burgerConstructorInitialState } from './slices/constructorSlice';
import { initialState as ingredientsInitialState } from './slices/ingredientsSlice';
import { initialState as userInitialState } from './slices/userSlice';
import { initialState as feedsInitialState } from './slices/feedsSlice';
import { initialState as userOrdersInitialState } from './slices/userOrdersSlice';
import { initialState as newOrderInitialState } from './slices/newOrderSlice';

describe('rootReducer', () => {
  test('initialState', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState.burgerConstructor).toEqual(
      burgerConstructorInitialState
    );
    expect(initialState.ingredients).toEqual(ingredientsInitialState);
    expect(initialState.user).toEqual(userInitialState);
    expect(initialState.feeds).toEqual(feedsInitialState);
    expect(initialState.userOrders).toEqual(userOrdersInitialState);
    expect(initialState.newOrder).toEqual(newOrderInitialState);
  });
});
