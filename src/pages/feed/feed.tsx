import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFeeds } from '../../services/orderSlice/orderSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders, isLoading } = useSelector((store) => store.feedsData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch(getFeeds());
    }
  }, [dispatch, orders]);

  if (isLoading || orders.length === 0) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
