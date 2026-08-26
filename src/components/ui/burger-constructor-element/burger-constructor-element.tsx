import {
  ConstructorElement,
  MoveButton,
} from '@krgaa/react-developer-burger-ui-components';
import { memo } from 'react';

import type { BurgerConstructorElementUIProps } from './type';

import styles from './burger-constructor-element.module.css';

export const BurgerConstructorElementUI = memo(function BurgerConstructorElementUI({
  ingredient,
  index,
  totalItems,
  handleMoveUp,
  handleMoveDown,
  handleClose,
}: BurgerConstructorElementUIProps): React.JSX.Element {
  return (
    <li className={`${styles.element} mb-4 mr-2`}>
      <MoveButton
        handleMoveDown={handleMoveDown}
        handleMoveUp={handleMoveUp}
        isUpDisabled={index === 0}
        isDownDisabled={index === totalItems - 1}
      />
      <div className={`${styles.element_fullwidth} ml-2`}>
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={handleClose}
        />
      </div>
    </li>
  );
});
