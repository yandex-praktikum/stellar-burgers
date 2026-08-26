import type { TIngredient, TTabMode } from '@utils-types';
import type { RefObject } from 'react';

export type BurgerIngredientsUIProps = {
  currentTab: TTabMode;
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  titleBunRef: RefObject<HTMLHeadingElement | null>;
  titleMainRef: RefObject<HTMLHeadingElement | null>;
  titleSaucesRef: RefObject<HTMLHeadingElement | null>;
  bunsRef: (node?: Element | null) => void;
  mainsRef: (node?: Element | null) => void;
  saucesRef: (node?: Element | null) => void;
  onTabClick: (val: string) => void;
};
