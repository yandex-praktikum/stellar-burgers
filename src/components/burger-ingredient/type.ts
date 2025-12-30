import { TIngredient } from '@utils-types';

export type TBurgerIngredientProps = {
  ingredient: TIngredient;
  count?: number;
  onIngredientClick?: (ingredient: TIngredient) => void;
};
