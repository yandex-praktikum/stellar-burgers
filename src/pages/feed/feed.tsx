import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import {
  clearOrders,
  fetchFeeds,
  selectFeedOrders
} from '../../services/feedSlice';

import { useEffect } from 'react';

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
