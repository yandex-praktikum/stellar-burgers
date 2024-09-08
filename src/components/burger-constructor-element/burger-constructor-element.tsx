import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  constructorSelector,
  removeIngredient,
  updateConstructor
} from '../../services/slices/constructorSlice';
import { TConstructorIngredient } from '@utils-types';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const constructorItems = useSelector(
      constructorSelector.constructorSelector
    );

    function swapElement(
      state: TConstructorIngredient[],
      index: number,
      step: number
    ) {
      const copy = [...state];
      copy[index] = copy.splice(index + step, 1, copy[index])[0];
      return copy;
    }

    const handleMoveDown = () => {
      // dispatch(
      //   updateConstructor(swapElement(constructorItems.ingredients, index, 1))
      // );
      dispatch(
        updateConstructor(swapElement(constructorItems.ingredients, index, 1))
      );
    };

    const handleMoveUp = () => {
      dispatch(
        updateConstructor(swapElement(constructorItems.ingredients, index, -1))
      );
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
