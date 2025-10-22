import { FC } from 'react';
import { IngredientDetailsUI, Preloader } from '@ui';
import { useSelector } from '@store';
import { useParams } from 'react-router-dom';
import { selectIngredients } from '@slices';
import { TIsModal } from '@utils-types';

export const IngredientDetails: FC<TIsModal> = ({ isModal }) => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(selectIngredients);
  const ingredient = ingredients.find((ingredient) => ingredient._id === id);

  if (!ingredient) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredient} isModal={isModal} />;
};
