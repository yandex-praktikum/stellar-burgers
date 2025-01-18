import { useEffect } from 'react';
import styles from './constructor-page.module.css';
import { BurgerIngredients, IngredientDetails, Modal } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../../src/services/store';
import {
  fetchIngredients,
  selectIsLoading
} from '../../../src/services/slices/burgerSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);
  const isIngredientsLoading = useSelector(selectIsLoading);

  if (isIngredientsLoading) return <Preloader />;
  else if (Object.keys(params).length === 0)
    return (
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
    );
  else if (params && params.id && location.state && location.state.background)
    return (
      <main className={styles.containerMain}>
        <h1
          className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
        >
          Соберите бургер
        </h1>
        <div className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients />
          <BurgerConstructor />
          <Modal title='Ингредиент' onClose={() => navigate('/')}>
            <IngredientDetails />
          </Modal>
        </div>
      </main>
    );
  else if (params && params.id && !location.state) return <IngredientDetails />;
};
