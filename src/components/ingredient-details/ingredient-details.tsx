import { FC } from 'react';
import { useSelector } from '../../services/store';
import { getIngredientDetails } from '../../services/slices/ingredients/ingredients';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, RootState } from '../../services/store';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { showIngredientDetails } from '../../services/slices/ingredients/ingredients';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const itemsList = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );

  let ingredientData = useSelector(
    (state: RootState) => state.ingredients.ingredientData
  );

  useEffect(() => {
    if (id) {
      const searchElement = itemsList.find((element) => element._id === id);
      if (searchElement) {
        dispatch(showIngredientDetails(searchElement));
      } else {
      }
    }
  }, [id, dispatch, itemsList]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
