import { FC, useEffect } from 'react';

import { Preloader } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  getAllFeedsThunk,
  ordersSelector
} from '../../services/slices/feedSlice';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(ordersSelector);

  useEffect(() => {
    dispatch(getAllFeedsThunk());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getAllFeedsThunk());
      }}
    />
  );
};
