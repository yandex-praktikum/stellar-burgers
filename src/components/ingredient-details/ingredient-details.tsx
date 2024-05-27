import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../../src/services/store';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const ingredientData = useSelector((state) =>
    state.burgerIngredients.ingredients.find(
      (ingredient) => ingredient._id === params.id
    )
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
