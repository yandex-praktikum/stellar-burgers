import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, RootState, useDispatch } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { getOrderByNumber } from '../../services/order/actions';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();

  const feedOrders = useSelector((state: RootState) => state.feed.orders);
  const userOrders = useSelector((state: RootState) => state.userOrders.orders);
  const currentOrder = useSelector(
    (state: RootState) => state.order.currentOrder
  );
  const ingredients: TIngredient[] = useSelector(
    (state: RootState) => state.ingredients.data
  );

  const orderData = useMemo(() => {
    if (!number) return null;
    const num = Number(number);
    return (
      feedOrders.find((o) => o.number === num) ||
      userOrders.find((o) => o.number === num) ||
      currentOrder ||
      null
    );
  }, [number, feedOrders, userOrders, currentOrder]);

  useEffect(() => {
    if (!orderData && number) {
      dispatch(getOrderByNumber(Number(number)));
    }
  }, [dispatch, orderData, number]);

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
