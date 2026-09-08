import { OrderStatusUI } from '@ui';

import type { OrderStatusProps } from './type';

const STATUS_TEXT: Record<string, string | undefined> = {
  pending: 'Готовится',
  done: 'Выполнен',
  created: 'Создан',
};

const STATUS_COLOR: Record<string, string | undefined> = {
  pending: '#E52B1A',
  done: '#00CCCC',
  created: '#F2F2F3',
};

const UNKNOWN_STATUS_TEXT = 'Неизвестен';
const UNKNOWN_STATUS_COLOR = '#F2F2F3';

export const OrderStatus = ({ status }: OrderStatusProps): React.JSX.Element => (
  <OrderStatusUI
    textStyle={STATUS_COLOR[status] ?? UNKNOWN_STATUS_COLOR}
    text={STATUS_TEXT[status] ?? UNKNOWN_STATUS_TEXT}
  />
);
