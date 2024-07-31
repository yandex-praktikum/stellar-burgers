import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { ingredientsSelector } from '../../services/ingredients/slice';
import { getOrderByNum } from '../../services/order/action';
import { useParams } from 'react-router-dom';
import { orderModalSelector, ordersSelector } from '../../services/order/slice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const dispatch = useDispatch();
  const param = useParams();
  const number = Number(param.number);
  const [orderData, setOrderData] = useState<TOrder | null>(null);
  const ingredients: TIngredient[] = useSelector(ingredientsSelector);
  const modalData = useSelector(orderModalSelector);
  const data = useSelector(ordersSelector);
  useEffect(() => {
    if (number) {
      const order: TOrder | undefined = data.find(
        (item) => item.number === number
      );

      if (order) {
        setOrderData(order);
      } else {
        dispatch(getOrderByNum(number));
      }
    }
  }, [dispatch, number]);
  useEffect(() => {
    if (modalData && modalData.number === number) {
      setOrderData(modalData);
    }
  }, [modalData, number]);
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
    return;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
