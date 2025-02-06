import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/services/store';
import { feedThunk, selectLoading, selectOrders } from '../../slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  //const orders: TOrder[] = [];

  const orders: TOrder[] = useSelector(selectOrders);
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(feedThunk());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(feedThunk());
  };

  /*if (!orders.length) {
    return <Preloader />;
  }*/

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />
      )}
    </>
  );
};
