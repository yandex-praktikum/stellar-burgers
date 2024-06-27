import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrderData } from '../../Slices/orderBurgerSlice';
import {
  selectAddedBunDetails,
  selectAddedIngredients
} from '../../Slices/constructorIngredientsSlice';
import { gerOrderByNumber, selectOrder } from '../../Slices/orderSlice';
import { useParams } from 'react-router-dom';
import { AppDispatch } from 'src/services/store';
import { selectIngredients } from '../../Slices/IngrediensSlice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const dispatch = useDispatch<AppDispatch>();

  const orderData = useSelector(selectOrder);

  const ingredients: TIngredient[] = useSelector(selectIngredients);

  const orderId = Number(useParams().number);

  useEffect(() => {
    dispatch(gerOrderByNumber(orderId));
  }, []);

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
