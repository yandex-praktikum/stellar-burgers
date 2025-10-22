import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import { fetchFeeds, selectFeeds, selectFeedsIsLoading } from '@slices';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectFeedsIsLoading);
  const data = useSelector(selectFeeds);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <FeedUI orders={data.orders} handleGetFeeds={handleGetFeeds} />
      )}
    </>
  );
};
