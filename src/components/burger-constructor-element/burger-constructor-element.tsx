import { FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import { moveItem } from '../orderSlice';
import { BurgerConstructorElementProps } from './type';
import { BurgerConstructorElementUI } from '@ui';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      if (index < totalItems - 1) {
        dispatch(moveItem({ fromIndex: index, toIndex: index + 1 }));
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(moveItem({ fromIndex: index, toIndex: index - 1 }));
      }
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
  }
);
