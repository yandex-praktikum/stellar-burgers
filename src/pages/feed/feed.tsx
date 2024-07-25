import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { ordersSelector } from '../../services/order/slice';
import { getFeeds } from '../../services/order/action';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(ordersSelector);

  if (!orders.length) {
    return <Preloader />;
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  const handleGetFeeds = useCallback(() => {
    dispatch(getFeeds());
  }, []);

  <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
