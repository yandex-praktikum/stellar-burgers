import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count, onIngredientClick }) => {
    const location = useLocation();

    const handleAdd = () => {
      onIngredientClick?.(ingredient);
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count ?? 0}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
