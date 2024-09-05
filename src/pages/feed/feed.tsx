import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { TOrder } from '@utils-types';
import { fetchFeeds, selectOrders } from 'src/services/slices/feedInfoSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchFeeds()), [];
  });

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeeds);
      }}
    />
  );
};
