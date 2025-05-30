import { FC, memo } from 'react';
import { OrdersListProps } from './type';
import { OrdersListUI } from '@ui';

// Компонент списка заказов
export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  // Создаем копию массива заказов и сортируем по дате создания в порядке убывания
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return <OrdersListUI orderByDate={orderByDate} />;
});
