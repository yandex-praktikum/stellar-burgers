// import { Preloader } from '@ui';
// import { FeedUI } from '@ui-pages';
// import { TOrder } from '@utils-types';
// import { FC, useEffect, useCallback } from 'react';
// import {
//   fetchFeeds,
//   getLoadingFeed,
//   getOrders
// } from '../../services/feedSlice';
// import { useDispatch, useSelector } from '../../services/store';

// export const Feed: FC = () => {
//   const dispatch = useDispatch();
//   const orders: TOrder[] = useSelector(getOrders);
//   const isLoading = useSelector(getLoadingFeed);

//   useEffect(() => {
//     dispatch(fetchFeeds());
//   }, [dispatch]);

//   const handleGetFeed = useCallback(() => {
//     dispatch(fetchFeeds());
//   }, [dispatch]);

//   if (isLoading) {
//     return <Preloader />;
//   }

//   return (
//     <>
//       <FeedUI orders={orders} handleGetFeeds={handleGetFeed} />
//     </>
//   );
// };

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useCallback } from 'react';
import {
  fetchFeeds,
  getLoadingFeed,
  getOrders
} from '../../services/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrders);
  const isLoading = useSelector(getLoadingFeed);

  const loadFeeds = useCallback(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  useEffect(() => {
    loadFeeds();
  }, [loadFeeds]);

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={loadFeeds} />;
};
