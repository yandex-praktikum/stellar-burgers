import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';
import { addBun, addIngredient } from '../../services/slices/constructorSlice';
import { TIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';

/////////////////////////////////////////////////////////////////НАШЁЛ ЭДД ХЭНДЛЕР ОН ЗДЕСЬ

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();

    ///Так, тут надо брать тот ингридиент или булку которую мы добавляем
    // и добавлять ее в конструкторайтемс стор как булку либо как ингридиент
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////// ЗДЕСЬ ВИДИШЬ ТУ ХЕРНЮ КОТОРУЮ Я ВНИЗУ НАПИСАЛ ПОЧИНИ ЕЕ И ПОМЕНЯЙ КЛЮЧ КАКНИБУДЬ ПРОСТО РАНДОМ НЕ ОЧ
    const handleAdd = () => {
      const ingredientfirstson: any = Object.assign({}, ingredient);
      ingredientfirstson.id = nanoid();
      console.log('id', ingredientfirstson);
      ingredient.type == 'bun'
        ? dispatch(addBun(ingredient))
        : dispatch(addIngredient(ingredientfirstson));
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
