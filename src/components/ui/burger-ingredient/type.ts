import { Location } from 'react-router-dom';
import { TIngredient } from '@utils-types';
import { SyntheticEvent } from 'react';

export type TBurgerIngredientUIProps = {
  ingredient: TIngredient;
  count: number;
  locationState: { background: Location };
  handleAdd: (ingredient: TIngredient) => void;
};
