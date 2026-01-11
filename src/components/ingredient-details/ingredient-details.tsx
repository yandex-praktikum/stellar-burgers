import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/slice-Ingridients';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector((state) => state.ingredients);

  useEffect(() => {
    if (!items.length && !isLoading) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, items.length, isLoading]);

  const ingredientData = items.find((item) => item._id === id);

  if (isLoading || (!items.length && !error)) {
    return <Preloader />;
  }

  if (!ingredientData) {
    return null;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
