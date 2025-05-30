import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { getIngredientsWithSelector } from '../../services/slices/IngredientsSlice';
import {
  getFeedOrders,
  getOrderByNum
} from '../../services/slices/FeedDataSlice';
import { useSelector, useDispatch } from '../../services/store';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { selectOrderById } from '../../services/selector';

export const OrderInfo: FC = () => {
  // Используем useParams для получения параметра (номер заказа) из URL
  const { number } = useParams();
  const orders = useSelector(getFeedOrders); // Получаем список заказов из состояния Redux
  const dispatch = useDispatch();

  const orderData = useSelector(selectOrderById(Number(number)));
  const ingredients: TIngredient[] = useSelector(getIngredientsWithSelector);

  useEffect(() => {
    if (!orderData) {
      dispatch(getOrderByNum(Number(number)));
    }
  }, [dispatch]);

  /* Готовим данные для отображения. Используем мемоизацию для того, чтобы производить вычисление только если данные изменились */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return; // Если данные о заказе или ингредиенты отсутствуют, ничего не возвращаем

    const date = new Date(orderData.createdAt); // Преобразуем дату создания заказа в объект Date

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    // Собираем информацию об ингредиентах из заказа, включая их количество
    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          // Если ингредиент еще не был добавлен, находим его в общем списке ингредиентов и добавляем
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++; // Если ингредиент уже был добавлен, увеличиваем его количество
        }

        return acc;
      },
      {}
    );

    // Рассчитываем общую стоимость заказа
    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    // Возвращаем собранные данные: информацию о заказе, ингредиенты, дату и общую стоимость
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
