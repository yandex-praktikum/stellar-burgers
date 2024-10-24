import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { AppDispatch, RootState } from '../../services/store';
import { getIngredient } from '../../services/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredient());
  }, []);
  const ingredientStore: TIngredient[] = useSelector(
    (state: RootState) => state.ingredientsReducer.data
  );
  const ingredientData = ingredientStore.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
