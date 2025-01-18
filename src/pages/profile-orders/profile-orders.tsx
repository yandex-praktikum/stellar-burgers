import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../src/services/store';
import {
  closeOrderModalAction,
  fetchOrders,
  openOrderModalAction
} from '../../../src/services/slices/orderSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, OrderInfo } from '@components';
import { OrderDetailsUI } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  const orders: TOrder[] = useSelector(
    (state: any) => state.orderReducer.profileOrders
  );
  const closeModal = () => {
    navigate('/profile/orders');
  };

  if (!params.number) return <ProfileOrdersUI orders={orders} />;
  else if (
    params.number &&
    location &&
    location.state &&
    location.state.background
  )
    return (
      <>
        <ProfileOrdersUI orders={orders} />
        <Modal title={`Заказ #0${params.number}`} onClose={closeModal}>
          <OrderInfo />
        </Modal>
      </>
    );
  else if (params.number && location && !location.state) return <OrderInfo />;
};
