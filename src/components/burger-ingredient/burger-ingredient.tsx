import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import {
  addIngredient,
  constructorIngredientsReducer,
  selectAddedIngredients
} from '../../Slices/constructorIngredientsSlice';
import store from 'src/services/store';
import { useDispatch, useSelector } from 'react-redux';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();

    const dispatch = useDispatch();
    const addedIngredients = useSelector(selectAddedIngredients);

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
      console.log(addedIngredients);
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
