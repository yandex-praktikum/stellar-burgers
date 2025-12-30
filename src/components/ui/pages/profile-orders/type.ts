import { TOrder } from '@utils-types';

export type ProfileOrdersUIProps = {
  orders: TOrder[];
  onOrderClick: (order: TOrder) => void;
  onLogout: () => void;
};
