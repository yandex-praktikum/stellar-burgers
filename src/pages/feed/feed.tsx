import { OrderDetailsUI, OrderInfoUI, Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../src/services/store';
import {
  closeOrderModalAction,
  fetchFeed,
  fetchOrders,
  openOrderModalAction,
  selectFeedOrders
} from '../../../src/services/slices/orderSlice';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';
import { Modal, OrderInfo, OrdersList } from '@components';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location?.state?.backgroundLocation?.modal;
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  const orders: TOrder[] = useSelector(selectFeedOrders);

  const closeModal = () => {
    navigate('/feed');
  };

  if (!orders.length) {
    return <Preloader />;
  }

  if (params.number && !location.state) return <OrderInfo />;

  return (
    <>
      <FeedUI
        orders={orders}
        handleGetFeeds={() => {
          dispatch(fetchFeed());
        }}
      />
      {params.number && location.state && location.state?.background && (
        <Modal onClose={closeModal} title='Заказ'>
          <OrderInfo />
        </Modal>
      )}
    </>
  );
};
