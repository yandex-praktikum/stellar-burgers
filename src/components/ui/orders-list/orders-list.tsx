import { OrderCard } from '@components';
import { FC } from 'react';

import styles from './orders-list.module.css';

import { OrdersListUIProps } from './type';

export const OrdersListUI: FC<OrdersListUIProps> = ({ orderByDate }) => (
  <div className={`${styles.content}`}>
    {orderByDate.map((order) => (
      <OrderCard order={order} key={order._id} />
    ))}
  </div>
);
