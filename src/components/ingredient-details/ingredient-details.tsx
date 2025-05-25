import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@app-store';
import { getIngredients } from '@slices';

export const IngredientDetails: FC = () => {
  const ingredients = useAppSelector(getIngredients);
  const idParams = useParams();
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === idParams.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
