import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  // const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector((state) => state.ingredients);

  const ingredientData = items.find((item) => item._id === id);

  if (isLoading || (!items.length && !error)) {
    return <Preloader />;
  }

  if (!ingredientData) {
    return null;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
