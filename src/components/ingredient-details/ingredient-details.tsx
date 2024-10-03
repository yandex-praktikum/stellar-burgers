import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import {
  getIngredientsState,
  getIngredientsList
} from '../../services/slices/ingredients';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(getIngredientsState);
  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getIngredientsList());
    }
  }, []);
  const { id } = useParams<{ id: string }>();
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
