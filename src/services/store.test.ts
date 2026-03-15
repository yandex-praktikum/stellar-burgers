import { rootReducer } from './store';
import { initialState as constructorInitialState } from './slices/constructorSlice/constructorSlice';
import { initialState as feedInitialState } from './slices/feedSlice/feedSlice';
import { initialState as ingredientsInitialState } from './slices/ingredientsSlice/ingredientsSlice';
import { initialState as orderInitialState } from './slices/orderSlice/orderSlice';
import { initialState as userInitialState } from './slices/userSlice/userSlice';

describe('rootReducer', () => {
  it('должен инициализировать начальное состояние всех слайсов', () => {
    // Инициализируем стейт через вызов корневого редьюсера
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    // Сверяем объект целиком с импортированными начальными значениями
    expect(state).toEqual({
      burgerConstructor: constructorInitialState,
      feed: feedInitialState,
      ingredients: ingredientsInitialState,
      order: orderInitialState,
      user: userInitialState
    });
  });
});