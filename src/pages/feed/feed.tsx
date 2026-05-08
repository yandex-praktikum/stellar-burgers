import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { loadFeed } from '../../services/feed/action';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, feedRequest } = useSelector((state: RootState) => state.feed);

  useEffect(() => {
    dispatch(loadFeed());
  }, [dispatch]);

  if (feedRequest || !orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(loadFeed());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
