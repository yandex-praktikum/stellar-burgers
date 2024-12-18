import styles from './constructor-page.module.css';
import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '@slices';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  /** TODO: взять переменную из стора */
  const isIngredientsLoading = isLoading;

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
