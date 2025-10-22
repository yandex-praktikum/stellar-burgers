import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder, TOrdersData } from '@utils-types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { useParams } from 'react-router-dom';
import { fetchOrderByNumber } from '../../services/slices/orderSlice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */

  const dispatch: AppDispatch = useDispatch();

  // const orderData: TOrder = {
  //   createdAt: '',
  //   ingredients: [],
  //   _id: '',
  //   status: '',
  //   name: '',
  //   updatedAt: 'string',
  //   number: 0
  // };

  const orderNumber = Number(useParams().number);

  console.log('номер заказа', orderNumber);

  const ingredients: TIngredient[] = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );

  useEffect(() => {
    dispatch(fetchOrderByNumber(orderNumber));
  }, [dispatch, orderNumber]);

  const orderData: TOrder | null = useSelector(
    (state: RootState) => state.order.currentOrder
  );

  // getOrderbyNumber -это поставит в теории ордер из парамс в currentOrder что позволит взять orderData из currentData

  // const orderData: TOrder | null = useSelector(
  //   (state: RootState) => state.order.currentOrder
  // );

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
