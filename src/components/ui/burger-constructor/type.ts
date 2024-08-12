import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export type TConstructorItem = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export type BurgerConstructorUIProps = {
  constructorItems: TConstructorItem;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
