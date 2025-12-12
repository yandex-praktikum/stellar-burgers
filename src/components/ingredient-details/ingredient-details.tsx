import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { setSelectedIngredient } from '../../services/slices/BurgerSlice';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { selectedIngredient, ingredients } = useAppSelector((state) => ({
    selectedIngredient: state.burger.selectedIngredient,
    ingredients: state.burger.ingredients
  }));

  useEffect(() => {
    if (id && ingredients.length > 0) {
      const ingredientFromUrl = ingredients.find((item) => item._id === id);
      if (
        ingredientFromUrl &&
        (!selectedIngredient || selectedIngredient._id !== id)
      ) {
        dispatch(setSelectedIngredient(ingredientFromUrl));
      }
    }
  }, [id, ingredients, selectedIngredient, dispatch]);

  const ingredientData = selectedIngredient;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
