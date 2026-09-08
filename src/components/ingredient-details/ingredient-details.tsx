import { Preloader, IngredientDetailsUI } from '@ui';

export const IngredientDetails = (): React.JSX.Element => {
  // TODO: Взять переменную из стора
  const ingredientData = null;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
