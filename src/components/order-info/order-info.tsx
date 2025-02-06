import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder, TOrdersData } from '@utils-types';
import { useSelector, useDispatch } from 'react-redux';
import { selectIngredients } from '../../slices/ingredientsListSlice';
import { selectOrders } from '../../slices/feedSlice';
import { useParams } from 'react-router-dom';
import { AppDispatch } from 'src/services/store';
import { fetchOrderNumber } from '../../slices/orderSlice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  /*const orderData = {
    createdAt: '',
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  };*/

  /*const { id } = useParams<{ id: string }>();
  const orders: TOrder[] = useSelector(selectOrders);
  const ingredients: TIngredient[] = useSelector(selectIngredients);

  // Находим заказ по его ID
  const orderData = useMemo(
    () => orders.find((order) => order._id === id) || null,
    [orders, id]
  );*/
  const { number } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const feed = useSelector(selectOrders);
  const orders = feed.filter((item) => item.status === 'done');
  const orderData = orders.find((item) => item.number === Number(number));

  useEffect(() => {
    dispatch(fetchOrderNumber(Number(number)));
  }, [dispatch]);

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
