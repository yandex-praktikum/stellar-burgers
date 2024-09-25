import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import {
  getIngredientsList,
  getIngredientsState
} from '../../services/slices/ingredients';
import { useParams } from 'react-router-dom';
import { useDispatch } from '../../services/store';

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
