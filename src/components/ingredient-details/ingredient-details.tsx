import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { ingredientsSelector } from '../../services/slices/ingredientsSlice';

type IngredientDetailsProps = {
  title?: string;
  isModal?: boolean;
};

export const IngredientDetails: FC<IngredientDetailsProps> = ({
  title,
  isModal
}) => {
  /** TODO: взять переменную из стора */
  const { id } = useParams();
  const ingredients = useSelector(ingredientsSelector);
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <div>
      <IngredientDetailsUI
        title={title}
        ingredientData={ingredientData}
        isModal={isModal}
      />
    </div>
  );
};
