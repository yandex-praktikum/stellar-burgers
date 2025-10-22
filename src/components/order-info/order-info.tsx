import { FC, useEffect } from 'react';
import { OrderInfoUI, Preloader } from '@ui';
import { TIsModal } from '@utils-types';
import { useDispatch, useSelector } from '@store';
import { useParams } from 'react-router-dom';
import {
  fetchOrder,
  selectIngredientsIsLoading,
  selectIsOrderLoading
} from '@slices';
import { useOrderInfoData } from '@hooks/useOrderInfoData';

export const OrderInfo: FC<TIsModal> = ({ isModal }) => {
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();

  useEffect(() => {
    dispatch(fetchOrder(Number(number)));
  }, [dispatch, number]);

  const isIngredientsLoading = useSelector(selectIngredientsIsLoading);
  const isOrderLoading = useSelector(selectIsOrderLoading);
  const orderInfo = useOrderInfoData();

  if (isIngredientsLoading || isOrderLoading) {
    return <Preloader />;
  }

  if (!orderInfo) {
    return null;
  }

  const title = `#${orderInfo.number}`;
  return <OrderInfoUI orderInfo={orderInfo} isModal={isModal} title={title} />;
};
