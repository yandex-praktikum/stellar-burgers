import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getOrderByNumber,
  getOrderState
} from '../../services/slices/orderSlice';
import { getIngredientState } from '../../services/slices/ingredientSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const { ingredients } = useSelector(getIngredientState);
  const { orderByNumberResponse, request } = useSelector(getOrderState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderByNumber(number));
  }, [dispatch, number]); // Добавьте зависимости в useEffect

  const orderInfo = useMemo(() => {
    if (!orderByNumberResponse || !ingredients.length) return null;

    const date = new Date(orderByNumberResponse.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderByNumberResponse.ingredients.reduce(
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
      ...orderByNumberResponse,
      ingredientsInfo,
      date,
      total
    };
  }, [orderByNumberResponse, ingredients]);

  if (!orderInfo || request) {
    return <Preloader />;
  }

  // Предположим, что здесь вы хотите отобразить OrderInfoUI, если orderInfo доступен
  return <OrderInfoUI orderInfo={orderInfo} />;
};
