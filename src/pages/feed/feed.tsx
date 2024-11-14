import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '@store';
import { getFeedState, getFeeds } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const { orders, loading } = useSelector(getFeedState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
