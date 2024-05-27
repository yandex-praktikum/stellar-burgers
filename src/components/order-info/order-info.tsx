import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../../src/services/store';
import { useParams } from 'react-router-dom';
import {
  clearOrderDetails,
  getOrderDetails
} from '../../../src/slices/orderDetailsSlice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const orderData = useSelector((state) => state.orderDetails.order);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.orderDetails);
  const params = useParams<{ number: string }>();

  const orderIngredientsId = useSelector(
    (state) => state.orderDetails.orderIngredients
  );
  const allIngredients: TIngredient[] = JSON.parse(
    localStorage.getItem('ingredients')!
  );
  const ingredients: TIngredient[] = orderIngredientsId.map(
    (id) => allIngredients.find((ing) => ing._id === id)!
  );

  useEffect(() => {
    dispatch(getOrderDetails(parseInt(params.number as string)));
    return () => {
      dispatch(clearOrderDetails());
    };
  }, [dispatch, params.number]);

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
  if (loading) {
    return <Preloader />;
  } else {
    return <OrderInfoUI orderInfo={orderInfo} />;
  }
};
