import { TNewOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: any;
  orderRequest: boolean;
  price: number;
  orderModalData: TNewOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
