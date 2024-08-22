// import { createSlice } from '@reduxjs/toolkit';
// import { TIngredient } from '@utils-types';
// import type { PayloadAction } from '@reduxjs/toolkit';

// type TIngredientState = {
//   ingredients: Array<TIngredient>;
// };

// const initialState: TIngredientState = {
//   ingredients: []
// };

// const ingredientSlice = createSlice({
//   name: 'ingredient',
//   initialState,
//   reducers: {
//     addIngredient: (state, action: PayloadAction<TIngredient>) => {
//       state.ingredients.push(action.payload);
//       //getIngredients api????
//     },
//     removeIngredient: (state, action: PayloadAction<string>) => {
//       //   state.ingredients = state.ingredients.filter((b) => b._id !== action.id);
//       //здесь отфильтровать надо по айди но чет не хочет
//       //может оно и не надо раз мы апи используем
//     }
//   }
// });

// export const { addIngredient, removeIngredient } = ingredientSlice.actions;
// export const reducer = ingredientSlice.reducer;
