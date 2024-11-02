import { FC, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector, useDispatch } from '../../services/store';
import { Modal } from '../modal';
import { fetchIngredients } from '../../services/burgerConstructorSlice/thunk';
import styles from '../ui/modal/modal.module.css';

export const IngredientDetails: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const ingredientData = useSelector((store) =>
    store.ingredients.ingredients.find((item) => item._id === id)
  );

  useEffect(() => {
    if (!ingredientData) {
      dispatch(fetchIngredients());
    }
  }, []);

  if (!ingredientData) {
    return <Preloader />;
  }
  if (!location.state) {
    return (
      <>
        <div className={styles.pageView}>
          <h1 className='text text_type_main-large mt-2 mb-4'>
            Детали ингредиента
          </h1>
          <IngredientDetailsUI ingredientData={ingredientData} />
        </div>
      </>
    );
  }

  return (
    <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </Modal>
  );
};
