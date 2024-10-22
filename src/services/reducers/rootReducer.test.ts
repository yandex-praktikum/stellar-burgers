import { rootReducer } from './rootReducer';
import store from '../store';
import { expect, test } from '@jest/globals';

describe('rootReducer', () => {
  test('правильно инициализирует rootReducer', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(store.getState());
  });

  test('возвращает корректное начальное состояние при неизвестном экшене', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const initialState = store.getState();
    
    const state = rootReducer(undefined, unknownAction);

    expect(state).toEqual(initialState); // Проверка на совпадение с начальным состоянием
  });
});
