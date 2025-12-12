import { RefObject } from 'react';
import { TIngredient, TTabMode } from '@utils-types';

export type BurgerIngredientsUIProps = {
  currentTab: TTabMode;
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  titleBunRef: RefObject<HTMLHeadingElement>;
  titleMainRef: RefObject<HTMLHeadingElement>;
  titleSaucesRef: RefObject<HTMLHeadingElement>;
  bunsRef: (node?: Element | null) => void;
  mainsRef: (node?: Element | null) => void;
  saucesRef: (node?: Element | null) => void;
  onTabClick: (tab: string) => void;
  onIngredientClick?: (ingredient: TIngredient) => void;
};
