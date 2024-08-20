import { FC, useMemo, useState, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { getOrderByNumberApi } from '@api';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredientsState } from '../../services/slices/ingredientsSlice';

export const OrderInfo: FC = () => {
  const [orderData, setOrderData] = useState({
    _id: '',
    status: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 0,
    ingredients: ['']
  });
  const dispatch = useDispatch();
  const { number } = useParams();

  useEffect(() => {
    getOrderByNumberApi(Number(number)).then((data) =>
      setOrderData(data.orders[0])
    );
  }, []);

  const ingredients = useSelector(getIngredientsState);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);
    const numberOrder = orderData.number;

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
      total,
      numberOrder
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
