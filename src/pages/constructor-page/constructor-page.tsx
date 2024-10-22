import styles from './constructor-page.module.css';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { selectIsLoading } from '../../services/slices/ingredientsSlice';
import { BurgerIngredients, BurgerConstructor } from '../../components';
import { Preloader } from '@ui';
export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора - done*/
  const isLoadingIngredients = useSelector(selectIsLoading);
  return (
    <>
      {isLoadingIngredients ? (
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
