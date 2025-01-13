import { FC, memo, SyntheticEvent } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { TIngredient } from '@utils-types';
import { useDispatch } from 'react-redux';
import { addBun, addIngredient } from '@slices';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();
    const handleAdd = (ingredient: TIngredient) => {
      if (ingredient.type === 'bun') dispatch(addBun(ingredient));
      else dispatch(addIngredient(ingredient));
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
