import { expect, test } from '@jest/globals';
import { rootReducer } from './store';
import store from './store';

describe('rootReducer test', () => {
  test('init state test', () => {
    //действие не известно ни одному из редьюсеров, поэтому они должны его проигнорировать и вернуть состояние без изменений
    const testAction = { type: 'UNKNOWN_ACTION' };

    //вызываем рут редьюсер, но инициализируем его undefined и неизвестным экшеном
    const initialState = rootReducer(undefined, testAction);
    //при этих условиях он должен вернуть начальное состояние, то есть не измениться
    expect(initialState).toEqual(store.getState());
  });
});
