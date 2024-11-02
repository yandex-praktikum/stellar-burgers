import { useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedsThunk } from '../../services/ordersSlice/thunk';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders.feeds.orders);

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeedsThunk())} />
  );
};
