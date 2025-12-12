import { TOrder } from '@utils-types';

export type OrdersListUIProps = {
  orderByDate: TOrder[];
  onOrderClick?: (order: TOrder) => void;
};
