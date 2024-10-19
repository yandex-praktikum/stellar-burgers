import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeeds } from '../../services/slices/feedSlice';
import { AppDispatch, RootState } from 'src/services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch<AppDispatch>();
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
