import { FC } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

const statusText: { [key: string]: string } = {
  pending: 'Готовится',
  done: 'Выполнен',
  created: 'Создан'
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  let textStyle = '';
  switch (status) {
    case 'pending':
      textStyle = '#E52B1A'; // Красный
      break;
    case 'done':
      textStyle = '#00CCCC'; // Голубой
      break;
    default:
      textStyle = '#F2F2F3'; // Серый
  }

  return (
    <OrderStatusUI
      textStyle={textStyle}
      text={statusText[status] || 'Неизвестно'}
    />
  );
};
