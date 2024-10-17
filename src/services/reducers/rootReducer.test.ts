import store from '../store';
import { rootReducer } from './rootReducer';
describe('rootReducer', () => {
  it('правильно инициализирует rootReducer', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });
    
    test('Возращает состояние по умолчанию или нет')
    expect(state).toEqual(store.getState);
  });
});
``