import { FC, memo, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { useSelector } from '../../services/store';
import { getIngredientsWithSelector } from '../../services/slices/IngredientsSlice';
import { getUserOrdersHistory } from '../../services/slices/UserOrdersHistory'; //
import { TOrder } from '@utils-types'; //

const maxIngredients = 6;

// Компонент отображает информацию о заказе в виде карточки
export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();

  const orders = useSelector(getUserOrdersHistory); // Получаем список заказов из состояния Redux

  //подключаем из стора еще и ингридиенты, так как с сервера получаем только id ингридиентов
  const ingredients: TIngredient[] = useSelector(getIngredientsWithSelector);

  const orderInfo = useMemo(() => {
    if (!ingredients.length) return;

    // Собираем информацию о каждом ингредиенте заказа на основе ID, полученных с сервера
    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) return [...acc, ingredient];
        return acc;
      },
      []
    );

    // Подсчитываем общую стоимость ингредиентов в заказе
    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    // Ограничиваем количество отображаемых ингредиентов до maxIngredients
    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    // Вычисляем, сколько ингредиентов не вошло в отображение (если их больше maxIngredients)
    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    const date = new Date(order.createdAt);
    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  if (!orderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
    />
  );
});
