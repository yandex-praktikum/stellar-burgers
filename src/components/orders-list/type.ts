import { TOrder } from '@utils-types';

export type OrdersListProps = {
  orders: TOrder[];
  onClick: (order: TOrder) => void;
};
