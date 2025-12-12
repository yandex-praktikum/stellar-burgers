import { FC, memo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@store';
import {
  clearAllModals,
  clearOrderModalData,
  clearViewOrderData,
  setViewOrderData
} from '@burger-slice';

import styles from './feed.module.css';

import { FeedUIProps } from './type';
import { OrdersList, FeedInfo } from '@components';
import { RefreshButton } from '@zlden/react-developer-burger-ui-components';
import { TOrder } from '@utils-types';

export const FeedUI: FC<FeedUIProps> = memo(({ orders, handleGetFeeds }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleOrderClick = (order: TOrder) => {
    dispatch(setViewOrderData(order));

    navigate(`/feed/${order.number}`, {
      state: { background: location }
    });

    useEffect(() => {
      dispatch(clearOrderModalData());
      return () => {
        dispatch(clearViewOrderData());
      };
    }, [dispatch]);

    useEffect(() => {
      dispatch(clearAllModals());
      return () => {
        dispatch(clearAllModals());
      };
    }, [dispatch]);
  };

  return (
    <main className={styles.containerMain}>
      <div className={`${styles.titleBox} mt-10 mb-5`}>
        <h1 className={`${styles.title} text text_type_main-large`}>
          Лента заказов
        </h1>
        <RefreshButton
          text='Обновить'
          onClick={handleGetFeeds}
          extraClass={'ml-30'}
        />
      </div>
      <div className={styles.main}>
        <div className={styles.columnOrders}>
          <OrdersList orders={orders} onClick={handleOrderClick} />
        </div>
        <div className={styles.columnInfo}>
          <FeedInfo />
        </div>
      </div>
    </main>
  );
});
