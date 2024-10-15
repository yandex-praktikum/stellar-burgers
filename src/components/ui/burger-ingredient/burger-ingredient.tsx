import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../../orderSlice';
import styles from './burger-ingredient.module.css';
import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';
import { TBurgerIngredientUIProps } from '../burger-ingredient/type';
import { v4 as uuidv4 } from 'uuid';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, locationState }) => {
    const { image, price, name, _id } = ingredient;
    const dispatch = useDispatch();

    const handleAdd = () => {
      const ingredientWithId = { ...ingredient, id: uuidv4() };
      dispatch(addItem(ingredientWithId));
    };

    return (
      <li className={styles.container}>
        <Link
          className={styles.article}
          to={`/ingredients/${_id}`}
          state={locationState}
        >
          {count && <Counter count={count} />}
          <img className={styles.img} src={image} alt='картинка ингредиента.' />
          <div className={`${styles.cost} mt-2 mb-2`}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
          <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
        </Link>
        <AddButton
          text='Добавить'
          onClick={handleAdd}
          extraClass={`${styles.addButton} mt-8`}
        />
      </li>
    );
  }
);
