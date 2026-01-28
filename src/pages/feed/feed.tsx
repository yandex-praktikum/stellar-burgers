import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/slices/slice-feed/slice-feed';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.feeds);
  // const { items } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  // useEffect(() => {
  //   if (!items.length) {
  //     dispatch(fetchIngredients());
  //   }
  // }, [dispatch, items.length]);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return (
    <>
      <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />
    </>
  );
};
