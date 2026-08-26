import {
  Counter,
  CurrencyIcon,
  AddButton,
} from '@krgaa/react-developer-burger-ui-components';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import type { TBurgerIngredientUIProps } from './type';

import styles from './burger-ingredient.module.css';

export const BurgerIngredientUI = memo(function BurgerIngredientUI({
  ingredient,
  count,
  handleAdd,
  locationState,
}: TBurgerIngredientUIProps): React.JSX.Element {
  const { image, price, name, _id } = ingredient;

  return (
    <li className={styles.container}>
      <Link className={styles.article} to={`/ingredients/${_id}`} state={locationState}>
        {count && <Counter count={count} />}
        <img src={image} alt="картинка ингредиента." />
        <div className={`${styles.cost} mt-2 mb-2`}>
          <p className="text text_type_digits-default mr-2">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
      </Link>
      <AddButton
        text="Добавить"
        onClick={handleAdd}
        extraClass={`${styles.addButton} mt-8`}
      />
    </li>
  );
});
