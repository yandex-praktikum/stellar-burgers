import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

interface TIngredientProps {
  title?: string;
}

export const IngredientDetails: FC<TIngredientProps> = (props) => {
  const { id } = useParams();
  const ingredients = useSelector((state) => state.ingredientData.ingredients);
  const ingredientData = ingredients.find((i) => i._id === id) || null;

  /** TODO: взять переменную из стора */

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI {...props} ingredientData={ingredientData} />;
};
