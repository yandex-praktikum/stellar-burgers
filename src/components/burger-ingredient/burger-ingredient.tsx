import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useAppDispatch, useAppSelector } from '@store';
import { setBun, setIngredient } from '@slices';
import { TConstructorIngredient } from '@utils-types';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    // Достаем состояние конструктора из store
    const constructorItems = useAppSelector(
      (state) => state.burgerConstructorState.constructorItems
    );

    // Считаем количество повторений ингредиента в конструкторе
    useMemo(() => {
      const matchedIngredients = constructorItems.ingredients.filter(
        (item) => item._id === ingredient._id
      );
      if (matchedIngredients.length > 0) {
        count = matchedIngredients.length;
      }
    }, [constructorItems, ingredient._id]);

    const handleAdd = () => {
      // Преобразуем ингредиент в конструкторский ингредиент
      const constructorIngredient: TConstructorIngredient = {
        ...ingredient,
        id: crypto.randomUUID()
      };
      ingredient.type === 'bun'
        ? dispatch(setBun(constructorIngredient))
        : dispatch(setIngredient(constructorIngredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
