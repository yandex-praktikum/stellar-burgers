import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  feedThunk,
  selectError,
  selectLoading,
  selectOrders
} from '../../slices/feed-slice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(feedThunk());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(feedThunk());
  };

  if (loading) return <Preloader />;
  if (error) return <div>Ошибка: {error.message}</div>;
  if (!orders.length) return <div>Нет доступных заказов</div>;

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
