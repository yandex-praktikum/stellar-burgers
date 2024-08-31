import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getBurger,
  IConstructorState,
  getAllIngredients,
  clearIngredients
} from '../../services/constructorSlice';
import { getIngredients } from '../../services/ingredientsSlice';
import {
  clearOrder,
  createOrder,
  getLoading,
  getOrder
} from '../../services/ordersSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getBurger);

  const orderRequest = useSelector(getLoading);

  const orderModalData = useSelector(getOrder);

  // const burgerIngredients = (state: IConstructorState): string[] => {
  //   const ingredients: string[] = [];
  //   if (state.bun) {
  //     ingredients.push(state.bun.id);
  //   }
  //   state.ingredients.forEach((ingredient) => {
  //     ingredients.push(ingredient.id);
  //   });

  //   return ingredients;
  // };

  const burgerIngredients: string[] = useSelector(getAllIngredients);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    dispatch(createOrder(burgerIngredients));
    console.log(burgerIngredients);
  };

  const closeOrderModal = () => {
    dispatch(clearIngredients());
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
