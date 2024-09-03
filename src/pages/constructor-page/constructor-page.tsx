import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getIngredients,
  selectBuns,
  selectMains,
  selectSauces,
  selectIsLoading
} from '../../services/slices/ingredientsSlice';
import styles from './constructor-page.module.css';
import { BurgerIngredients, BurgerConstructor } from '../../components';
import { Preloader } from '@ui';
export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();

  // Используем селекторы для получения данных из состояния
  const buns = useSelector(selectBuns);
  const mains = useSelector(selectMains);
  const sauces = useSelector(selectSauces);
  const isLoading = useSelector(selectIsLoading);

  // Загружаем ингредиенты при монтировании компонента
  useEffect(() => {
    dispatch(getIngredients()); // Используем getIngredients, как определено в вашем слайсе
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Preloader /> // Показываем индикатор загрузки, пока данные не будут загружены
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
