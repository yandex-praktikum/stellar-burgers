import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { fetchProfileOrders } from '../../services/slices/slice-profile-orders';
import { fetchIngredients } from '../../services/slices/slice-Ingridients';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.profileOrders);
  const { items } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, items.length]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return (
    <>
      <ProfileOrdersUI orders={orders} />
    </>
  );
};
