import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { clearAllModals } from '../../services/slices/BurgerSlice';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';

const ConstructorPage: FC = () => {
  const dispatch = useAppDispatch();
  const isIngredientsLoading = useAppSelector(
    (state) => state.burger.ingredientsLoading
  );

  useEffect(() => {
    dispatch(clearAllModals());
  }, [dispatch]);

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

export default ConstructorPage;
