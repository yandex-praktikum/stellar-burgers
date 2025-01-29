import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/services/store';
import { addBunBuilder, addItemBuilder } from '../../slices/builderSlice';
import { v4 as uuidv4 } from 'uuid';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(addBunBuilder(ingredient));
      } else {
        const newIngredient = {
          ...ingredient,
          id: uuidv4()
        };
        dispatch(addItemBuilder(newIngredient));
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
