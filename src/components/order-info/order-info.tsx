import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { fetchOrderByNumber } from '../../services/slices/slice-order';
import { fetchIngredients } from '../../services/slices/slice-Ingridients';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const { number } = useParams();
  const orderNumber = Number(number);
  const dispatch = useDispatch();
  const { items: ingredients, isLoading: ingredientsLoading } = useSelector(
    (state) => state.ingredients
  );
  const feedOrders = useSelector((state) => state.feeds.orders);
  const profileOrders = useSelector((state) => state.profileOrders.orders);
  const { orderDetails, orderDetailsRequest } = useSelector(
    (state) => state.order
  );
  const allOrders = [...feedOrders, ...profileOrders];
  const listOrder = allOrders.find((order) => order.number === orderNumber);
  const orderData =
    listOrder?.number === orderNumber ? listOrder : orderDetails;

  useEffect(() => {
    if (!ingredients.length && !ingredientsLoading) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length, ingredientsLoading]);

  useEffect(() => {
    if (
      Number.isFinite(orderNumber) &&
      !listOrder &&
      (!orderDetails || orderDetails.number !== orderNumber) &&
      !orderDetailsRequest
    ) {
      dispatch(fetchOrderByNumber(orderNumber));
    }
  }, [dispatch, orderNumber, listOrder, orderDetails, orderDetailsRequest]);

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
