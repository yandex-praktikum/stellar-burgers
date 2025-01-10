import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllIngredients } from '@slices';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const params = useParams();
  console.log('IngredientDetails params: ', JSON.stringify(params));
  const allIngredients = useSelector(selectAllIngredients);
  const ingredientData = allIngredients.filter(
    (ingredient: TIngredient) => ingredient._id === params.id
  )[0];
  console.log(
    'IngredientDetails allIngredients: ',
    JSON.stringify(allIngredients)
  );
  console.log(
    'IngredientDetails ingredientData: ',
    JSON.stringify(ingredientData)
  );
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
