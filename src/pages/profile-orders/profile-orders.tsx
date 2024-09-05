import { useDispatch, useSelector } from '../../services/store';
import { ProfileOrdersUI } from '@ui-pages';
import { useEffect, FC } from 'react';
import {
  fetchSubmitOrders,
  selectSubmittedOrders
} from '../../services/slices/submittedOrdersSlice';
import { TOrder } from '@utils-types';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectSubmittedOrders); // Используем селектор selectOrders

  useEffect(() => {
    dispatch(fetchSubmitOrders()); // Загружаем заказы при монтировании компонента
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
