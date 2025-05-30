import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient
} from '../../services/slices/BurgerConstructorSlice';

//компонент-обертка для элемента конструктора бургера с логикой, которая передается в компонент UI для рендера
export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    //переменные содержат функции слайса конструктора бургера для перемещения в списке ингридиента и его удаления
    const handleMoveDown = () => {
      dispatch(moveDownIngredient(index));
    };

    const handleMoveUp = () => {
      dispatch(moveUpIngredient(index));
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
