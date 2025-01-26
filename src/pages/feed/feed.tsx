import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  clearOrders,
  fetchFeeds,
  selectFeedOrders
} from '../../services/feedSlice';
import { useSelector, useDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeeds());
  }, []);

  const orders = useSelector(selectFeedOrders);

  if (!orders.length) {
    return <Preloader />;
  }

  function updateOrders() {
    dispatch(clearOrders());
    dispatch(fetchFeeds());
  }

  return <FeedUI orders={orders} handleGetFeeds={updateOrders} />;
};
