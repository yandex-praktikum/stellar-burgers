import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import {
  addIngredient,
  toggleBun
} from '../../services/burgerConstructorSlice/slice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(toggleBun(ingredient));
      } else {
        dispatch(addIngredient({ id: ingredient._id, ...ingredient }));
      }
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
