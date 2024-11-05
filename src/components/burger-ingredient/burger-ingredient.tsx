import { FC, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import { showIngredientDetails } from '../../services/slices/ingredients/ingredients';
import { TConstructorIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';
import {
  addBurgerBun,
  addIngredient
} from '../../services/slices/burger-cart/burger-cart';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = () => {
      dispatch(showIngredientDetails(ingredient));
      navigate(`/ingredients/${ingredient._id}`, {
        state: { background: location }
      });
    };

    const handleAdd = () => {
      const ingredientWithId: TConstructorIngredient = {
        ...ingredient,
        id: nanoid()
      };
      if (ingredientWithId.type === 'bun') {
        dispatch(addBurgerBun(ingredientWithId));
      } else {
        dispatch(addIngredient(ingredientWithId));
      }
    };

    return (
      <div onClick={handleClick}>
        <BurgerIngredientUI
          ingredient={ingredient}
          count={count}
          locationState={{ background: location }}
          handleAdd={handleAdd}
        />
      </div>
    );
  }
);
