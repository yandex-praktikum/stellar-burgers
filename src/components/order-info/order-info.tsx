import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';

import { RootState, useDispatch, useSelector } from '../../services/store';

import { getOrderByNumber } from '../../services/slices/feedSlice';

import { TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();

  useEffect(() => {
    if (number) {
      dispatch(getOrderByNumber(Number(number)));
    }
  }, [dispatch, number]);

  const orderData = useSelector((state: RootState) => state.feed.currentOrder);

  const ingredients = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );

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
      {} as TIngredientsWithCount
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
