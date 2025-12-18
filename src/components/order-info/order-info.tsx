import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../services/store';
import {
  setViewOrderData,
  clearViewOrderData,
  fetchOrderByNumber
} from '../../services/slices/BurgerSlice';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useAppDispatch();

  const { viewOrderData, ingredients, feedOrders, loading } = useAppSelector(
    (state) => ({
      viewOrderData: state.burger.viewOrderData,
      ingredients: state.burger.ingredients,
      feedOrders: state.feed.orders,
      loading: state.burger.loading
    })
  );

  useEffect(() => {
    if (!number) return;

    if (feedOrders.length > 0) {
      const orderFromUrl = feedOrders.find(
        (order) => order.number.toString() === number
      );

      if (
        orderFromUrl &&
        (!viewOrderData || viewOrderData.number.toString() !== number)
      ) {
        dispatch(setViewOrderData(orderFromUrl));
        return;
      }
    }

    if (!viewOrderData || viewOrderData.number.toString() !== number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
  }, [number, feedOrders, viewOrderData, dispatch]);

  useEffect(
    () => () => {
      dispatch(clearViewOrderData());
      return undefined;
    },
    [dispatch]
  );

  const orderData = viewOrderData;

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

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
      date: new Date(orderData.createdAt),
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo || loading) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
