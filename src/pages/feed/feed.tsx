import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedsInfo, getOrdersInfo } from '../../services/slices/feed';
import { AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleGetFeeds = () => {
    dispatch(getFeedsInfo());
  };

  useEffect(() => handleGetFeeds, []);

  const orders: TOrder[] = useSelector(getOrdersInfo);

  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        handleGetFeeds;
      }}
    />
  );
};
