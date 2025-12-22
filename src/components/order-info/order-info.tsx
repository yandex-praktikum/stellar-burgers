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

  const viewOrderData = useAppSelector((state) => state.burger.viewOrderData);
  const ingredients = useAppSelector((state) => state.burger.ingredients);
  const feedOrders = useAppSelector((state) => state.feed.orders);

  useEffect(() => {
    if (!number) return;

    if (viewOrderData && viewOrderData.number.toString() === number) {
      return;
    }

    if (feedOrders.length > 0) {
      const orderFromUrl = feedOrders.find(
        (order) => order.number.toString() === number
      );

      if (orderFromUrl) {
        dispatch(setViewOrderData(orderFromUrl));
        return;
      }
    }

    dispatch(fetchOrderByNumber(Number(number)));
  }, [number, feedOrders, viewOrderData, dispatch]);

  useEffect(
    () => () => {
      dispatch(clearViewOrderData());
      return undefined;
    },
    [dispatch]
  );

  const orderData = viewOrderData;

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

  if (!viewOrderData || !ingredients.length) {
    return <Preloader />;
  }

  if (!orderInfo) {
    return (
      <div>
        <p>Не удалось отобразить заказ</p>
      </div>
    );
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
