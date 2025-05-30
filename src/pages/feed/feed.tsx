import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeedData } from '../../services/slices/FeedDataSlice';
import { getFeedOrders, getLoading } from '../../services/slices/FeedDataSlice';
import { useSelector, useDispatch } from '../../services/store';

// компонент для страницы ленты заказов
export const Feed: FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);

  useEffect(() => {
    dispatch(getFeedData()).then((result) => {});
  }, [dispatch]);

  const orders: TOrder[] = useSelector(getFeedOrders);

  if (!orders.length || loading) {
    return <Preloader />;
  }

  const handleGetAllOrders = () => {
    dispatch(getFeedData());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetAllOrders} />;
};
