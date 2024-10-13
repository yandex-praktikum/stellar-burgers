import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../../orderSlice'; // Используйте новое действие из orderSlice
import styles from './burger-ingredient.module.css';
import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';
import { TBurgerIngredientUIProps } from '../burger-ingredient/type';
import { v4 as uuidv4 } from 'uuid'; // Импортируйте uuid

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, locationState }) => {
    const { image, price, name, _id } = ingredient;
    const dispatch = useDispatch();

    // Обработчик добавления ингредиента в конструктор бургера
    const handleAdd = () => {
      const ingredientWithId = { ...ingredient, id: uuidv4() }; // Добавьте id к ингредиенту
      dispatch(addItem(ingredientWithId)); // Передайте добавленный ингредиент в действие
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
          onClick={handleAdd} // Привязываем обработчик добавления
          extraClass={`${styles.addButton} mt-8`}
        />
      </li>
    );
  }
);
