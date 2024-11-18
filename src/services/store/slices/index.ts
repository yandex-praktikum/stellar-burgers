export {
  default as ingredientsReducer,
  fetchIngredients
} from './ingredients-slice';

export {
  default as constructorReducer,
  setIngredient,
  setBun,
  removeIngredient,
  moveIngredient
} from './constructor-slice';

export { default as userReducer, registerUser, loginUser } from './user-slice';
