import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllIngredients } from '@slices';
import { TIngredient } from '@utils-types';
import { Modal } from '../modal';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const params = useParams();
  console.log('IngredientDetails params: ', JSON.stringify(params));
  const allIngredients = useSelector(selectAllIngredients);
  const navigate = useNavigate();
  const ingredientData = allIngredients.filter(
    (ingredient: TIngredient) => ingredient._id === params.id
  )[0];
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
