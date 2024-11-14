import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from 'react-redux';
import {
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from '../../services/slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    // Обработчик для перемещения ингредиента вниз
    const handleMoveDown = () => {
      if (index < totalItems - 1) {
        dispatch(moveIngredientDown(index));
      }
    };

    // Обработчик для перемещения ингредиента вверх
    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(moveIngredientUp(index));
      }
    };

    // Обработчик для удаления ингредиента
    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
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
