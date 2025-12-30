import { FC, useCallback, useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchFeeds } from '../../services/slices/FeedSlice';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.feed.loading);
  const orders = useAppSelector((state) => state.feed.orders);
  const error = useAppSelector((state) => state.feed.error);

  const handleGetFeeds = useCallback(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div>
        <p>Ошибка загрузки ленты заказов: {error}</p>
        <button onClick={handleGetFeeds}>Попробовать еще раз</button>
      </div>
    );
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
