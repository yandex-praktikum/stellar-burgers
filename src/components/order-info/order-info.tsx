import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';
import {
  orderModalDataSelector,
  resetOrder,
  takeNewOrder
} from '../../services/slices/newOrderSlice';
import { ingredientsSelector } from '../../services/slices/ingredientsSlice';
import { getOrderByNumberApi } from '@api';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const orderId = useParams().number || '';
  const [orderData, setOrderData] = useState<TOrder>({
    _id: '',
    createdAt: '',
    ingredients: [],
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  });

  useEffect(() => {
    getOrderByNumberApi(Number(orderId)).then((data) => {
      setOrderData(data.orders[0]);
    });
  });

  const ingredients: TIngredient[] = useSelector(ingredientsSelector);

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
