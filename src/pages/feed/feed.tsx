import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getFeeds } from '../../services/slices/feed';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Получаем состояние orders, loading и error из Redux
  const { orders, isLoading, error } = useSelector(
    (state: RootState) => state.feed
  );

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  if (!orders.length || isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
