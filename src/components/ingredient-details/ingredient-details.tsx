import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { TIngredient } from '@utils-types';
import { useSelector } from 'react-redux';
import { selectIngredients } from '../../Slices/IngrediensSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  // const ingredientData = null;
  const { id } = useParams();
  const ingredientData = useSelector(selectIngredients).find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
