import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch, RootState } from '../../services/store';
import { getUserOrders } from '../../services/users-orders/action';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(
    (state: RootState) => state.userOrders.orders
  );
  const isLoading = useSelector(
    (state: RootState) => state.userOrders.ordersRequest
  );
  const error = useSelector((state: RootState) => state.userOrders.ordersError);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <p className='text text_type_main-default'>
        Ошибка загрузки заказов: {error}
      </p>
    );
  }

  return <ProfileOrdersUI orders={orders} />;
};
