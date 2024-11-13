import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useAppDispatch } from '@store';
import { setBun, setIngredient } from '@slices';
import { TConstructorIngredient } from '@utils-types';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useAppDispatch();
    const location = useLocation();

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
