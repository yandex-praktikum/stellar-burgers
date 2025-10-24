import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { getOrderByNumberThunk } from '../../services/slices/feedSlice';
import { orderSelector } from '../../services/slices/feedSlice';
import { ingredientsSelector } from '../../services/slices/ingredientsSlice';
import style from './order-info.module.css';

type TOrderInfoProps = {
  style?: React.CSSProperties;
  isModal?: boolean;
};

export const OrderInfo: FC<TOrderInfoProps> = ({ style, isModal }) => {
  const dispatch = useDispatch();
  const { number } = useParams();

  useEffect(() => {
    dispatch(getOrderByNumberThunk(Number(number)));
  }, []);
  /** TODO: взять переменные orderData и ingredients из стора */
  const orderData = useSelector(orderSelector);
  const ingredients: TIngredient[] = useSelector(ingredientsSelector);

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

  return (
    <div style={style}>
      <OrderInfoUI orderInfo={orderInfo} isModal={isModal} />
    </div>
  );
};
