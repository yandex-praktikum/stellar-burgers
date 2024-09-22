import { rootReducer } from './store';
import { RootState } from './store';
import { initialState as ingredientInitialState } from './ingredientSlice/ingredientsSlice';
import { initialState as userInitialState } from './userSlice/userSlice';
import { initialState as orderInitialState } from './orderSlice/orderSlice';
import { initialState as constructorInitialState } from './constructoSlice/constructorSlice';

const initialStates = {
  ingredientData: ingredientInitialState,
  constructorBurger: constructorInitialState,
  userData: userInitialState,
  feedsData: orderInitialState
};

describe('rootReducer', () => {
  it('Тест rootReducer - инициализация с данными по умолчанию', () => {
    const action = { type: '@@INIT' };
    const state: RootState = rootReducer(undefined, action);
    expect(state).toEqual(initialStates);
  });
});
