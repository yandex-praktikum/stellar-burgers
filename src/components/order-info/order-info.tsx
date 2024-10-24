import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { AppDispatch, RootState } from '../../services/store';
import { getOrder } from '../../services/slices/orderSlice';
import { useParams } from 'react-router-dom';
import { getIngredient } from '../../services/slices/ingredientsSlice';

export const OrderInfo: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { number } = useParams();
  /** TODO: взять переменные orderData и ingredients из стора */

  const { isLoading: isIngredientsLoading, data: ingredients } = useSelector(
    (state: RootState) => state.ingredientsReducer
  );

  const { isOrderLoading, orderModalData: orderData } = useSelector(
    (state: RootState) => state.orderReducer
  );
  useEffect(() => {
    dispatch(getOrder(Number(number)));
    dispatch(getIngredient());
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
  if (isIngredientsLoading || isOrderLoading) {
    return <Preloader />;
  }

  if (!orderInfo) {
    return null;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
