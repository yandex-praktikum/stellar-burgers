import { useSelector } from '@/services/store';
import { Preloader, IngredientDetailsUI } from '@ui';
import { useParams } from 'react-router-dom';

export const IngredientDetails = (): React.JSX.Element => {
  const { id } = useParams<{ id: string }>();

  // TODO: Взять переменную из стора
  const { ingredients } = useSelector((state) => state.ingredients);

  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
