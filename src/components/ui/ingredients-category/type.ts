import type { TIngredient } from '@utils-types';

export type TIngredientsCategoryUIProps = {
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  ingredients: TIngredient[];
  ingredientsCounters: Record<string, number>;
  ref?: React.Ref<HTMLUListElement>;
};
