import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import {
  fetchOrders,
  selectOrders,
  selectIsLoading
} from '../../services/slices/ordersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders); // Используем селектор selectOrders
  const isLoading = useSelector(selectIsLoading); // Используем селектор selectIsLoading

  useEffect(() => {
    dispatch(fetchOrders()); // Загружаем заказы при монтировании компонента
  }, [dispatch]);

  // Добавляем условие для отображения загрузки
  if (isLoading) {
    return <div>Loading...</div>; // Компонент загрузки
  }

  return <ProfileOrdersUI orders={orders} />;
};
