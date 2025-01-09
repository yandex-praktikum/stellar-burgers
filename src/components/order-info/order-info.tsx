import { FC, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '@store';
import { TIngredient } from '@utils-types';
import { Preloader, OrderInfoUI } from '@ui';
import { getIngredientsApiThunk, getOrderByNumberApiThunk } from '@slices';
import { getIngredients, getOrderModalData } from '@selectors';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const dispatch = useAppDispatch();

  const ingredients = useSelector(getIngredients);
  const orderData = useSelector(getOrderModalData);

  useEffect(() => {
    if (ingredients.length > 0) {
      return;
    }
    dispatch(getIngredientsApiThunk());
  }, [ingredients]);

  if (number === undefined || number.trim().length === 0) {
    return <div>number не определен</div>;
  }

  const orderId = Number.parseInt(number);

  useEffect(() => {
    if (orderData === null || orderData.number !== orderId) {
      dispatch(getOrderByNumberApiThunk(orderId));
    }

    dispatch(getIngredientsApiThunk());
  }, [orderId, orderData]);

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
