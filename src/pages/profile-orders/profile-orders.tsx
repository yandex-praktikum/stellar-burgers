import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { gerOrdersThunk } from '../../services/ordersSlice/thunk';
import { fetchIngredients } from '../../services/burgerConstructorSlice/thunk';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const ordersData = useSelector((state) => state.orders.orders.items);
  useEffect(() => {
    dispatch(gerOrdersThunk());
    dispatch(fetchIngredients());
  }, []);

  return <ProfileOrdersUI orders={ordersData} />;
};
