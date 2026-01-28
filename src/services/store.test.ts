import { rootReducer } from './store';
import { constructorReducer } from './slices/slice-constructor/slice-constructor';
import { ingredientsReducer } from './slices/slice-ingridients/slice-Ingridients';
import { feedsReducer } from './slices/slice-feed/slice-feed';
import { authReducer } from './slices/slice-auth/slice-auth';
import { profileOrdersReducer } from './slices/slice-profile-orders/slice-profile-orders';
import { orderReducer } from './slices/slice-order/slice-order';

describe('rootReducer', () => {
  it('handles unknown action correctly', () => {
    const fakeAction = { type: 'UNKNOWN_ACTION' };

    const state = rootReducer(undefined, fakeAction);

    expect(state).toEqual({
      burgerConstructor: constructorReducer(undefined, fakeAction),
      ingredients: ingredientsReducer(undefined, fakeAction),
      feeds: feedsReducer(undefined, fakeAction),
      auth: authReducer(undefined, fakeAction),
      profileOrders: profileOrdersReducer(undefined, fakeAction),
      order: orderReducer(undefined, fakeAction)
    });
  });
});
