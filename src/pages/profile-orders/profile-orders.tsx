import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getOrders } from '@selectors';
import { useAppDispatch } from '@store';
import { ProfileOrdersUI } from '@ui-pages';
import { getIngredientsApiThunk, getOrdersApiThunk } from '@slices';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();

  let orders = useSelector(getOrders);

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(getOrdersApiThunk());
      dispatch(getIngredientsApiThunk());
    }
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
