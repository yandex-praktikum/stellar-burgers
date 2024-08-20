import rootReducer from './rootReducer';
import store from './store';

const unknownAction = (something: any): any => ({
  type: 'UNKNOWN_ACTION',
  something
});

test('🟢 тест корневого редьюсера', () => {
  const storeFromTheApp = store.getState();
  const wrongStateForRootReducer = undefined;

  const currentState = rootReducer(
    wrongStateForRootReducer,
    unknownAction('something')
  );

  expect(currentState).toEqual(storeFromTheApp);
});
