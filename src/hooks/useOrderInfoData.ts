import { useMemo } from 'react';
import { useSelector } from '@store';
import { selectIngredients, selectOrderModalData } from '@slices';
import { TIngredient } from '@utils-types';

export const useOrderInfoData = () => {
  const orderModalData = useSelector(selectOrderModalData);
  const ingredients = useSelector(selectIngredients);

  return useMemo(() => {
    if (!orderModalData || !ingredients.length) return null;

    const date = new Date(orderModalData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderModalData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = { ...ingredient, count: 1 };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {} as TIngredientsWithCount
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderModalData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderModalData, ingredients]);
};
