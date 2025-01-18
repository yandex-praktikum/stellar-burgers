import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAllIngredients } from '@slices';
import { TIngredient } from '@utils-types';
import { Modal } from '../modal';
import { useSelector } from '../../../src/services/store';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const params = useParams();
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
