import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { AppDispatch, RootState } from '../../services/store';
import { getIngredient } from '../../services/slices/ingredientsSlice';

export const ConstructorPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredient());
  }, [dispatch]);
  /** TODO: взять переменную из стора */
  const isIngredientsLoading = useSelector(
    (state: RootState) => state.ingredientsReducer
  );

  return (
    <>
      {isIngredientsLoading.isLoading ? (
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
