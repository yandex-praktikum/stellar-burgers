import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  ordersHistory,
  getUserOrdersLoading,
  getUserOrdersHistory
} from '../../services/slices/UserOrdersHistory';
import { Preloader } from '@ui';

//компонент страницы истории заказов
export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const isLoad = useSelector(getUserOrdersLoading);
  const orders: TOrder[] = useSelector(getUserOrdersHistory);

  useEffect(() => {
    dispatch(ordersHistory());
  }, []);

  if (isLoad) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
