import { TIngredient } from '@utils-types';
import { FC, useMemo } from 'react';
import { redirect, useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import {
  selectIngredients,
  selectOrders
} from '../../slices/stellarBurgerSlice';
import { OrderInfoUI } from '../ui/order-info';
import { Preloader } from '../ui/preloader';

export const OrderInfo: FC = () => {
  const params = useParams<{ number: string }>();
  if (!params.number) {
    redirect('/feed');
    return null;
  }

  const orders = useAppSelector(selectOrders);

  const orderData = orders.find(
    (item) => item.number === parseInt(params.number!)
  );

  const ingredients: TIngredient[] = useAppSelector(selectIngredients);

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
