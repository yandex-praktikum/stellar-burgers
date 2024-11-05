import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/slices/feedSlice';
import { AppDispatch, RootState } from 'src/services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  const feedState = useSelector((state: RootState) => state.feedsReducer);
  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };
  return (
    <>
      {feedState.isLoading ? (
        <Preloader />
      ) : (
        <FeedUI
          orders={feedState.data.orders}
          handleGetFeeds={handleGetFeeds}
        />
      )}
    </>
  );
};
