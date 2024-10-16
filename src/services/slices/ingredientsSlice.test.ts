// // ingredientsSlice.test.ts
// import { ingredientsSlice, fetchIngredients } from './ingredientsSlice';

// describe('ingredientsSlice', () => {
//   const initialState = {
//     ingredients: [],
//     isLoading: false,
//     error: null
//   };

//   it('изменяет состояние на isLoading при запросе ингредиентов', () => {
//     const action = { type: fetchIngredients.pending.type };
//     const state = ingredientsSlice.reducer(initialState, action);
//     expect(state.isLoading).toBe(true);
//     expect(state.error).toBeNull();
//   });

//   it('сохраняет ингредиенты при успешном запросе', () => {
//     const action = { type: fetchIngredients.fulfilled.type, payload: [{ id: '1', name: 'Булка' }] };
//     const state = ingredientsSlice.reducer(initialState, action);
//     expect(state.isLoading).toBe(false);
//     expect(state.ingredients).toEqual([{ id: '1', name: 'Булка' }]);
//   });

//   it('обрабатывает ошибку при неудачном запросе', () => {
//     const action = { type: fetchIngredients.rejected.type, error: { message: 'Ошибка' } };
//     const state = ingredientsSlice.reducer(initialState, action);
//     expect(state.isLoading).toBe(false);
//     expect(state.error).toBe('Ошибка');
//   });
// });
