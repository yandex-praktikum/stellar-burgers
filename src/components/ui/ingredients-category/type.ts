import { TIngredient } from '@utils-types';
import { RefObject } from 'react';

export type TIngredientsCategoryUIProps = {
  title: string;
  titleRef: RefObject<HTMLHeadingElement>;
  ingredients: TIngredient[];
  ingredientsCounters: { [key: string]: number };
  onIngredientClick?: (ingredient: TIngredient) => void;
};
