import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** (DONE) TODO: взять переменную из стора */
  const { id } = useParams();

  const ingredientData = useSelector(
    (state) =>
      state.ingredients.ingredients.filter((item) => item._id === id)[0]
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
