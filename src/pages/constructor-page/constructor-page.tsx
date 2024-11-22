import { useSelector, useDispatch } from '../../services/store';
import { FC, useEffect } from 'react';
import styles from './constructor-page.module.css';
import { BurgerIngredients, BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import {
  fetchIngredients,
  getIngredients,
  isLoadState
} from '../../services/slices/ingridientsSlice';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();
  const isIngredientsLoading = useSelector(isLoadState);
  const ingredients = useSelector(getIngredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  const isLoad = useSelector(isLoadState);

  return (
    <>
      {isLoad ? (
        <Preloader />
      ) : ingredients.length === 0 ? (
        <div className={`${styles.error} text text_type_main-default`}>
          Не удалось загрузить ингредиенты
        </div>
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
