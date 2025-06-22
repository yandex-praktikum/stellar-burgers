import { TConstructorState, TOrder } from '@utils-types';

export type TBurgerConstructorUI = {
  constructorItems: TConstructorState;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
